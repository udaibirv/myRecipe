require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/api/test', (req, res) => {
  res.status(200).json({ success: 'test was a success' });
});

app.get('/api/recipes', (req, res) => {
  const sql = `
  select *
  from "recipes"
  order by "recipeId" desc
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.post('/api/favorites/', (req, res) => {
  const { recipeId, userId } = req.body;
  const params = [recipeId, userId];
  const sql = `
  insert into "favorites" ("recipeId", "userId")
    values($1, $2)
    returning *
  `;

  db.query(sql, params)
    .then(result => {
      const favorite = result.rows;
      res.json(favorite);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured'
      });
    });
});

app.get('/api/favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  const params = [userId];
  const favoriteSql = `
  select distinct "favorites"."recipeId", "favorites"."userId"
    from "favorites"
    join "recipes" using ("recipeId")
    where "favorites"."userId" = $1

  `;
  db.query(favoriteSql, params)
    .then(result => {
      const favorite = result.rows;
      res.json(favorite);

    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.get('/api/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  if (!Number.isInteger(recipeId) || recipeId < 1) {
    res.status(400).json({
      error: 'recipeId must be a positive integer'
    });
    return;
  }
  const params = [recipeId];

  const sql = `
  with ingreds as (
  select ri."recipeId", array_to_json(array_agg(ri)) as matching
  from (
    select
      "ingredientId",
      "recipeId",
      "name",
      "amount"
    from "ingredients"
  ) as ri
  group by ri."recipeId"
), steps as (
  select steps."recipeId", array_to_json(array_agg(steps)) as matching
  from (
    select
      "directionId",
      "recipeId",
      "instruction",
      "stepNumber"
    from "directions"
  ) as steps
  group by steps."recipeId"
)
select
  r."recipeId",
  r."recipeName",
  r."equipment",
  r."recipeOrigin",
  r."imageUrl",
  coalesce((select matching from "ingreds" where "ingreds"."recipeId" = r."recipeId"), '[]'::json) as "ingredients",
  coalesce((select matching from "steps" where "steps"."recipeId" = r."recipeId"), '[]'::json) as "directions"
from "recipes" as r
where r."recipeId" = $1;
  `;

  db.query(sql, params)
    .then(result => {
      const recipe = result.rows;
      res.json(recipe);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.post('/api/recipe/:userId', (req, res) => {
  const { recipeName, equipment, recipeOrigin, instructions, ingredients, imageUrl, userId } = req.body;
  const recipeSql = `
    insert into "recipes" ("recipeName", "equipment", "recipeOrigin","imageUrl", "userId")
      values ($1, $2, $3, $4, $5)
      returning "recipeId", "userId"
  `;
  const recipeParams = [recipeName, equipment, recipeOrigin, imageUrl, userId];
  const fullRecipe = { recipeName, equipment, recipeOrigin };
  db.query(recipeSql, recipeParams)
    .then(result => {
      const { recipeId } = result.rows[0];
      fullRecipe.recipeId = recipeId;
      const directionParams = [recipeId];
      let paramNumber = 1;
      let instructionsArray;
      if (typeof instructions !== 'object') {
        instructionsArray = [instructions];
      } else {
        instructionsArray = instructions;
      }
      const directionValues = instructionsArray.map((instruction, index) => {
        directionParams.push(instruction, index + 1);
        return `($1, $${++paramNumber}, $${++paramNumber})`;
      });
      const directionSql = `
        insert into "directions" ("recipeId", "instruction", "stepNumber")
        values ${directionValues.join(', ')}
        returning *
      `;
      return db.query(directionSql, directionParams)
        .then(result => {
          const ingredientParams = [recipeId];
          let paramNumber = 1;
          fullRecipe.directions = result.rows;
          let ingredientsArray;
          if (typeof ingredients !== 'object') {
            ingredientsArray = [ingredients];
          } else {
            ingredientsArray = ingredients;
          }
          const ingredientValues = ingredientsArray.map(ingredient => {
            ingredientParams.push(ingredient.name, ingredient.amount);
            return `($1, $${++paramNumber}, $${++paramNumber})`;
          });
          const ingredientsSql = `
            insert into "ingredients" ("recipeId", "name", "amount")
            values ${ingredientValues.join(', ')}
            returning *
          `;
          return db.query(ingredientsSql, ingredientParams);
        })
        .then(result => {

          fullRecipe.ingredients = result.rows;
          res.status(201).json(fullRecipe);
        });
    }).catch(err => {
      console.error(err);
      res.status(400).json({
        error: 'an unexpected error occured'
      });
    });
});

app.post('/api/auth/sign-up', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({
      error: 'username, password, and email are required fields'
    });
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "hashedPassword", "email")
      values ($1, $2, $3)
      returning "userId", "username", "email"
      `;
      const params = [username, hashedPassword, email];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(error => {
      console.error(error);
      res.status(400).json({
        error: 'an unexpected error occured'
      });
    });
});

app.post('/api/auth/sign-in', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: 'invalid login, please enter correct username or password'
    });
  }
  const sql = `
      select "userId", "hashedPassword"
        from "users"
        where "username" = $1

    `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        return res.status(401).json({
          error: 'invalid login'
        });
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            return res.status(401).json({
              error: 'invalid login'
            });
          }

          // console.log('Payload:', payload);
          // console.log('token: ', token);
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          return res.json({ token, user: payload });
        })
        .catch(error => {
          console.error(error);

        });
    });

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

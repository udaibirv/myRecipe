require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

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
  select *
    from "recipes"
    where "recipeId" = $1
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

app.post('/api/recipe/', (req, res) => {
  const { recipeName, equipment, recipeOrigin, instruction, stepNumber, ingredientName, ingredientAmount } = req.body;
  const recipeParams = [recipeName, equipment, recipeOrigin];
  const recipeSql = `
  insert into "recipes" ("recipeName", "equipment", "recipeOrigin")
    values ($1, $2, $3)
    returning "recipeId"
  `;
  db.query(recipeSql, recipeParams)
    .then(result => {
      const directionParams = [instruction, stepNumber];
      const directionSql = `
    insert into "directions" ("instruction", "stepNumber")
      values ($1, $2)
      using "recipeId"
      returning *
    `;
      db.query(directionSql, directionParams);
    })
    .then(result => {
      const ingredientParams = [ingredientName];
      const ingredientsSql = `
    insert into "ingredients" ("name")
      values($1)
      using "recipeId"
      returning *
    `;
      db.query(ingredientsSql, ingredientParams);
    })
    .then(result => {
      const recipeIngredientParams = [ingredientAmount];
      const recipeIngredientsSql = `
      insert into "recipeIngredients" ("amount")
        values($1)
        using "recipeId", "ingredientId"
        returning *
      `;
      db.query(recipeIngredientsSql, recipeIngredientParams);
    })
    .then(result => {
      const [fullRecipe] = result.rows;
      res.status(201).json(fullRecipe);
    })
    .catch(err => {
      console.error(err);
      res.json({
        error: 'an unexpected error occured'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

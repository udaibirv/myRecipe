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
  const userId = 1;
  const { recipeName, equipment, recipeOrigin, instructions, ingredients } = req.body;
  const recipeSql = `
    insert into "recipes" ("recipeName", "equipment", "recipeOrigin", "userId")
      values ($1, $2, $3, $4)
      returning "recipeId"
  `;
  const recipeParams = [recipeName, equipment, recipeOrigin, userId];
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
          console.log(ingredientsArray);
          const ingredientValues = ingredientsArray.map(ingredient => {
            ingredientParams.push(ingredient.name, ingredient.amount);
            return `($1, $${++paramNumber}, $${++paramNumber})`;
          });
          const ingredientsSql = `
            insert into "ingredients" ("recipeId", "name", "amount")
            values ${ingredientValues.join(', ')}
            returning *
          `;
          console.log('ingredientsSql: ', ingredientsSql);
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

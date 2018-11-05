const express = require('express');
const parser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Establish the database connection
const con = mysql.createConnection({
  host: '***.***.***.**',
  user: '***************',
  password: '************',
  database: '************'
});

// Parsers for the Express interface to read the body of POST requests
app.use(parser.json());
app.use(parser.text());
app.use(parser.urlencoded({ extended: false }));

// Connect to the database
con.connect();

// Load the recipe list
app.get('/api/loadRecipes', (req, res) => {
  con.query('SELECT `Recipe` FROM `Recipes`;', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// POST request for Ingredients Return with Query to return data
app.post('/api/getRecipe', async (req, res) => {
  const recipe = req.body.recipe;
  const qty = req.body.qty;
  let returnJSON = [];
  const sql = `SELECT a.Recipe, a.Ingredient, a.Quantity * ${con.escape(qty)} as Quantity, b.Mod, b.QtyCraft, b.Category, b.Image FROM RecipeIngredients a LEFT JOIN Ingredients b ON a.Ingredient=b.Ingredient WHERE a.Recipe = ${con.escape(recipe)}`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    returnJSON = JSON.stringify(result);
    console.log(returnJSON);
    res.json(returnJSON);
  });
});

// POST request for Active Recipe
app.post('/api/getActive', async (req, res) => {
  const recipe = req.body.recipe;
  let returnJSON = [];
  const sql = `SELECT Ingredient, Image FROM Ingredients WHERE Ingredient = ${con.escape(recipe)}`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    returnJSON = JSON.stringify(result);
    console.log(returnJSON);
    res.json(returnJSON);
  });
});

// Opens the express module to listen for requests on Port 3000
app.listen(3000, () => console.log('Listening on port 3000!'));

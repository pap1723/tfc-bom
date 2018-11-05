import React, { Component } from 'react';
import './app.css';
import Recipes from './components/Recipes';
import Materials from './components/Materials';
import logo from './logo.png';

export default class App extends Component {

  // Constructor sets State for the objects we want to affect the DOM
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      recipes: [],
      recipeQty: '1',
      subAssyList: [],
      rawMatList: [],
      activeImage: 'default.png',
      activeRecipe: '',
      renderMat: false
    };

    this.loadRecipes = this.loadRecipes.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.parseRecipe = this.parseRecipe.bind(this);
    this.newQuantity = this.newQuantity.bind(this);
  }

  // Set the global variable for the BOM Array
  componentWillMount() {
    window.compList = [];
  }

  // On loading, get the recipe list from the database
  async componentDidMount() {
    const recipes = this.loadRecipes();
    await recipes;
  }

  // Fetch the Recipe list from the Database
  loadRecipes() {
    const initialRecipes = [];
    fetch('https://dan-nodejs.azurewebsites.net/api/loadRecipes')
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let val = data[i].Recipe;
          let option = {
            value: val,
            label: val
          };
          initialRecipes.push(option);
        }
        this.setState({ recipes: initialRecipes });
        console.log('Recipes are loaded.');
      });
  }

  // Event handler for the Recipe Drop Down List
  handleChange = selected => {
    this.setState({ selectedOption: selected });
  };

  // Gets the quantity of the Recipe when it is changed
  newQuantity(event) {
    this.setState({ recipeQty: event.target.value });
    console.log(event.target.value);
  }

  // Gets the quantity on hand of each individual part
  quantityOnHand(event) {
    this.setState({ recipeQty: event.target.value });
    console.log(event.target.value);
  }
  
  /*  Fetches the database information for the currently selected recipe, and
      as the loop runs, the remaining sub-assembly items as well. Puts all of
      these into an array of objects that is manipulated later.
  */
  async getRecipe(recipe, recQuantity) {
    //const recQuantity = this.state.recipeQty;
    this.setState({ renderMat: false });
    fetch('https://dan-nodejs.azurewebsites.net/api/getRecipe', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: recipe,
        qty: recQuantity
      })
    })
    .then(res => res.json())
    .then(data => JSON.parse(data))
    .then(jsonData => {
      for (let i in jsonData) {
        window.compList.push(jsonData[i]);  
      }
      this.parseRecipe(jsonData);
      window.compList.sort(this.compare);
      //let newArr = this.reduce(window.compList);
      //window.compList = newArr;
      //console.log(window.compList);
    });
  }

  // Fetches the name and the image to be used for the currently active recipe
  getActive(recipe) {
    fetch('https://dan-nodejs.azurewebsites.net/api/getActive', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: recipe
      })
    })
    .then(res => res.json())
    .then(data => JSON.parse(data))
    .then(jsonData => {
      let recipe = jsonData[0].Ingredient;
      let recImage = jsonData[0].Image;
      this.setState({
        activeRecipe: recipe,
        activeImage: recImage
      })
      return recipe;
    });
  }

  // Once the recipe and quantity has been selected, calls the fetches to build the arrays
  async processBOM(recipe) {
    window.compList.length = 0;
    this.setState({ renderMat: true });
    await this.getRecipe(recipe, this.state.recipeQty);
    await this.getActive(recipe);
  }

  // Used by the getRecipe function to determine if a recipe is a sub-assembly and then fetches that as well
  parseRecipe(recipes) {
    for (let i in recipes) {
      const ing = recipes[i].Ingredient;
      const cat = recipes[i].Category;
      const qty = Math.ceil(recipes[i].Quantity / recipes[i].QtyCraft);

      if(cat === 1) {
        this.getRecipe(ing, qty)
      }
    }
  }

  // Sorts the materials array alphabetically
  compare(a,b) {
    const ingA = a.Ingredient.toUpperCase();
    const ingB = b.Ingredient.toUpperCase();

    let comparison = 0;
    if (ingA > ingB) {
      comparison = 1;
    } else if (ingA < ingB) {
      comparison = -1;
    }

    return comparison;
  }
  
  // Iterates through the array of Materials, if duplicated items, combine and sum the quantity
  reduce(input) {
    const map = input.reduce((res, { Ingredient, Quantity, ...rest }) => {
      if (res[Ingredient]) {
        res[Ingredient].Quantity += Quantity
      } else {
        res[Ingredient] = { Ingredient, Quantity, ...rest }
      }
      return res
    }, {})
    
    const res = Object.values(map)
    return res;
  }

  // Processes the array to put the items into the proper categories
  getIngredients() {
    console.log(window.compList);
    let newArr = this.reduce(window.compList);
    window.compList = newArr;
    
    let saList = [];
    let rmList = [];
    for (let i in window.compList) {
      const ing = window.compList[i].Ingredient;
      const qty = window.compList[i].Quantity;
      const craft = window.compList[i].QtyCraft;
      const cat = window.compList[i].Category;
      const img = window.compList[i].Image;
      if (cat === 1) {
        saList.push({ ingredient: ing, quantity: qty, craft: craft, image: img });
      } else {
        rmList.push({ ingredient: ing, quantity: qty, craft: craft, image: img });
      }
    }
    this.setState({ subAssyList: saList });
    this.setState({ rawMatList: rmList });
  }

  // Renders the HTML information
  render() {
    return (
      <div className='container'>
        <header className="header">
          <img src={logo} alt="logo" />
        </header>
        <div className="grid-container">
          <div className='recipe-selection'>
            <h2>Select Recipe</h2>
            <Recipes
              recipe={this.state.recipes}
              handleChange={this.handleChange}
              selectedOption={this.state.selectedOption}
            />
            <div className='recipe-details'>
              <div className='recipe-qty-div'>
                <label className="recipe-label">Recipe Qty</label>
                <input
                  type='text'
                  value={ this.state.recipeQty }
                  onChange={this.newQuantity}
                  className='recipe-quantity'
                />
              </div>
              <div className='recipe-qty-but'>
                <button
                  className='recipe-button'
                  onClick={() => this.processBOM(this.state.selectedOption.label)}>
                    Submit Recipe
                </button>
              </div>
            </div> {/* recipe-details */}
          </div> {/* recipe-selection */}
          <div className='active-recipe'>
            <h2 className='active'>Active Recipe</h2>
            <img className='active-image' src={'./images/' + this.state.activeImage} />
            
          </div>
          <div className='bom-container'>
            <button
                className='bom-button'
                onClick={() => this.getIngredients()}>
                  Build Bill of Materials
            </button>
          </div> {/* bom-container */}
          <div className='active-name-container'>
            <h3 className='active-name'>{this.state.recipeQty + ' x ' + this.state.activeRecipe}</h3>
          </div>
        </div> {/* grid-container */}
        
        <div className="materials-list">
          <h2 className="material-header">Sub-Assembly Components</h2>
          <div className="table">
            <div className="thead">
              <div className="tr">
                <div className="td">{' '}</div>
                <div className="td">Ingredient</div>
                <div className="td">Quantity<br />Per Craft</div>
                <div className="td">Quantity<br />Needed</div>
                <div className="td">Quantity<br />On Hand</div>
                <div className="td">Total #<br /> of Crafts</div>
                <div className="td">Complete</div>
              </div>    {/* tr */}
            </div>      {/* thead */}
            <div className="tbody">
              {
                this.state.subAssyList.map(list => {
                  return (
                    <Materials 
                      key = {list.ingredient + list.quantity}
                      {...list}
                    />
                  );
                })
              }
            </div>      {/* tbody */}
          </div>        {/* table */}
          <h2 className="material-header">Raw Materials</h2>
          <div className="table">
            <div className="thead">
              <div className="tr">
                <div className="td">{' '}</div>
                <div className="td">Ingredient</div>
                <div className="td">Quantity<br />Needed</div>
                <div className="td">Complete</div>
              </div>    {/* tr */}
            </div>      {/* thead */}
            <div className="tbody">
        {
          this.state.rawMatList.map(list => {
            return (
              <Materials
              key = {list.ingredient + list.quantity}
              {...list}
              raw='1'
              />
            );
          })
        }
              </div>      {/* tbody */}
            </div>        {/* table */}
        
        </div>
      </div>

    );
  }
}

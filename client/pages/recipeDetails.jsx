import React from 'react';

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {
    fetch(`/api/recipes/${this.props.recipeId}`)
      .then(response => response.json())
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    if (!this.state.recipe) {
      return null;
    }

    const ingredientsObj = this.state.recipe.ingredients;
    // const {
    //   recipeName, recipeOrigin, ingredients, directions, recipeId
    // } = this.state.recipe;
    console.log('All Info for Recipes: ', this.state.recipe);
    const recipeObject = this.state.recipe[0];

    const ingredientMap = recipeObject.ingredients.map(ingredient =>
      <li key={ingredient.ingredientId} className="list-item">{`${ingredient.amount} ${ingredient.name}  `}</li>
    );

    return (
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <a href='#' className="text-secondary">
              &lt; back to recipe list
            </a>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 col-sm-6 col-md-5">
            <h2>{recipeObject.recipeName}</h2>
            <h4>{`Equipment Needed: ${recipeObject.equipment}`}</h4>
            <p>{recipeObject.recipeOrigin}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-5">
          <ul className="list-group" key={this.state.recipe.recipeId}>
            {ingredientMap}
            {/* <li className="list-item">{`Ingredient Name: ${recipeObject.ingredients}, Ingredient Amount: ${recipeObject.ingredients}`}</li> */}
          </ul>
        </div>
        <div className="col-12 col-sm-6 col-md-5">
          <h4>Recipe Instructions:</h4>
          <p>{recipeObject.directions[0].instruction}</p>
        </div>
      </div>
    );
  }
}

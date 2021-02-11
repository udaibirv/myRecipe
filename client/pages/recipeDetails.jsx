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
    const {
      recipeName, recipeOrigin, equipment, name, amount, instruction, recipeId
    } = this.state.recipe;
    console.log('All Info for Recipes: ', this.state.recipe);
    return (
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <a href='#' className="btn text-secondary">
              &lt; back to recipe list
            </a>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 col-sm-6 col-md-5">
            <h2>{recipeName}</h2>
            <h4>{`Equipment Needed: ${equipment}`}</h4>
            <p>{recipeOrigin}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-5">
          <ul className="list-group" key={recipeId}>
            <li className="list-item">{`Ingredient Name: ${name}, Ingredient Amount: ${amount}`}</li>
          </ul>
        </div>
        <div className="col-12 col-sm-6 col-md-5">
          <h4>Recipe Instructions:</h4>
          <p>{instruction}</p>
        </div>
      </div>
    );
  }
}

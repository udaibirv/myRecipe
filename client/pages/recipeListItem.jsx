import React from 'react';

export default class RecipeListItem extends React.Component {

  render() {
    return (
      <a
        href={`#recipes?recipeId=${this.props.recipe.recipeId}`}
        className ="text-dark card mb-4 shadow-sm text-decoration-none">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.props.recipe.recipeName}</h4>
          <p className="card-text">{this.props.recipe.recipeOrigin}</p>
        </div>
        <ul className="list-group">
          <li className="list-group-item"> {`Equipment Needed: ${this.props.recipe.equipment}`}</li>
        </ul>
      </div>
      </a>
    );
  }

}

{ /* <li>
  {this.props.recipe.recipeName}
</li>; */ }

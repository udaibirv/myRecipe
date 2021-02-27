import React from 'react';

export default class RecipeListItem extends React.Component {

  render() {
    return (
      <a
        href={`#recipes?recipeId=${this.props.recipe.recipeId}`}
        className ="text-dark card mb-4 shadow-sm text-decoration-none list-card ">
              <img className="card-img-top recipeImageList text-center" src={this.props.recipe.imageUrl} alt={this.props.recipe.recipeName} />
                <div className="card-body">
                  <h4 className="card-title">{this.props.recipe.recipeName}</h4>
                  <p className="card-text">{this.props.recipe.recipeOrigin}</p>
                  <p className="card-text"> {`Equipment Needed: ${this.props.recipe.equipment}`}</p>
                </div>

      </a>
    );
  }

}

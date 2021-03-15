import React from 'react';

export default class RecipeListItem extends React.Component {

  // getFavorites() {
  //   const favBody = this.state.recipes.recipeId;
  //   JSON.stringify(favBody);
  //   fetch(`api/favorites/${this.state.recipes.recipeId}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: favBody
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //     });
  // }
  render() {
    return (
      <a
        href={`#recipes?recipeId=${this.props.recipe.recipeId}`}
        className ="text-dark card mb-4 shadow-sm text-decoration-none list-card">
              <img className="card-img-top recipeImageList text-center " src={this.props.recipe.imageUrl} alt={this.props.recipe.recipeName} />
                <div className="card-body">
                  <h4 className="card-title">{this.props.recipe.recipeName}</h4>
                  <p className="card-text">{this.props.recipe.recipeOrigin}</p>
                  <p className="card-text"> {`Equipment Needed: ${this.props.recipe.equipment}`}</p>
                </div>

      </a>

    );
  }

}

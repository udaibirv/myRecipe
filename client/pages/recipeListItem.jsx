import React from 'react';

const styles = {
  recipe: {
    display: 'block',
    cursor: 'pointer'
  }
};

export default class RecipeListItem extends React.Component {

  render() {
    return (
      <a
        href={`#recipes?recipeId=${this.props.recipe.recipeId}`}
        className ="text-dark card mb-4 shadow-sm text-decoration-none">
                <div className="card-body">
                  <h4 className="card-title">{this.props.recipe.recipeName}</h4>
                  <p className="card-text">{this.props.recipe.recipeOrigin}</p>
                  <p className="card-text"> {`Equipment Needed: ${this.props.recipe.equipment}`}</p>
                </div>

    {/* <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{this.props.recipe.recipeName}</h4>
                  <p className="card-text">{this.props.recipe.recipeOrigin}</p>
                </div>
                <ul className="list-group">
                  <li className="list-group-item"> {`Equipment Needed: ${this.props.recipe.equipment}`}</li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div> */}
      {/* <div className="card mb-3" >
        <div className="card-body">
          <h4 className="card-title">{this.props.recipe.recipeName}</h4>
          <p className="card-text">{this.props.recipe.recipeOrigin}</p>
        </div>
        <ul className="list-group">
          <li className="list-group-item"> {`Equipment Needed: ${this.props.recipe.equipment}`}</li>
        </ul>
      </div> */}
      </a>
    );
  }

}

{ /* <li>
  {this.props.recipe.recipeName}
</li>; */ }

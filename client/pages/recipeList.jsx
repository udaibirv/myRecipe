
import React from 'react';
import RecipeListItem from './recipeListItem';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };

  }

  componentDidMount() {
    this.getAllRecipes();
  }

  getAllRecipes() {
    fetch('api/recipes/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ recipes: data });
      });
  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">

              <div className="card-deck">
                <div className="card">

              {
                recipes.map((recipe, index) => {
                  return (
                    <RecipeListItem key={recipe.recipeId} recipe={recipe} index={index} />
                  );
                })
              }

              </div>
                </div>

          </div>
        </div>

      </div>
    );
  }
}

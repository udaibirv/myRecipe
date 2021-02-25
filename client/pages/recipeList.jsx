
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
      <div className="container-fluid">
        <div className="row recipeList">

              {
                recipes.map((recipe, index) => {
                  return (
                    <div key={recipe.recipeId} className="col-12 col-md-6 col-lg-4">
                    <RecipeListItem recipe={recipe} index={index} />
                    </div>
                  );
                })
              }

        </div>

      </div>
    );
  }
}

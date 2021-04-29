import React from 'react';
import RecipeDetails from './recipeDetails';

export default class RecipeFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };

  }

  componentDidMount() {
    this.getFavorites();

  }

  getFavorites() {
    const userId = JSON.parse(window.localStorage.getItem('userId'));
    fetch(`/api/favorites/${userId}`)
      .then(response => response.json())
      .then(favorites => {
        this.setState({ favorites });
        console.log('Data: ', favorites);
        console.log(this.state);
      });

  }

  render() {
    const { favorites } = this.state;
    return (
      // <h1>Hi</h1>
      favorites.map((recipe, index) => {
        return (
          <div key={recipe.recipeId} className="col-12 col-md-6 col-lg-4 ">
            <RecipeDetails recipe={recipe} recipeId={recipe.recipeId} index={index} />
          </div>
        );

      })

    //   favorites.map((recipe, index) => {
    //     return (
    //   <div key={recipe.recipeId}>
    //     <RecipeDetails recipeId={recipe.recipeId} recipe={recipe} index={index}/>

    // </div>
    //     );
    //   })
    );
  }
}

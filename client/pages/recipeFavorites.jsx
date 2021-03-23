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
    fetch('/api/favorites/')
      .then(response => response.json())
      .then(data => this.setState({ favorites: data }));

  }

  render() {
    const { favorites } = this.state;
    return (
      favorites.map((recipe, index) => {
        return (
        <div key={recipe.recipeId}>
          <RecipeDetails recipeId={recipe.recipeId} recipe={recipe} index={index}/>

        </div>
        );
      })
    );
  }
}

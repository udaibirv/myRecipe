import React from 'react';
import RecipeDetails from './recipeDetails';
import RecipeListItem from './recipeListItem';
import RecipeList from './recipeList';

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
    const { recipeId } = this.state;
    fetch('/api/favorites/')
      .then(response => response.json())
      .then(data => this.setState({ favorites: data }));

  }

  render() {
    const { favorites } = this.state;
    console.log(favorites);
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

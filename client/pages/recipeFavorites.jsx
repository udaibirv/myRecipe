import React from 'react';
import RecipeListItem from './recipeListItem';

export default class RecipeFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
    this.getFavorites = this.getFavorites.bind(this);

  }

  componentDidMount() {
    this.getFavorites();

  }

  getFavorites() {
    fetch('/api/favorites/:id')
      .then(response => response.json())
      .then(data => this.setState({ favorites: data }));
    console.log(this.state.favorites);

  }

  render() {
    const favorite = this.state.favorites[0];
    return (
      <div className="container-fluid list-container">
        <div className="row recipeList">

          {
            favorite.map((recipe, index) => {
              return (
              <div key={recipe.recipeId} className="col-12 col-md-6 col-lg-4">
                <RecipeListItem recipeId={recipe.recipeId} index={index} />
              </div>

              );
            })
          }
        </div>
      </div>
    );
  }
}

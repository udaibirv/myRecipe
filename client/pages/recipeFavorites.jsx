import React from 'react';
import RecipeDetails from './recipeDetails';
import RecipeList from './recipeList';
import RecipeListItem from './recipeListItem';
import RecipeForm from './recipeForm';

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
  }

  render() {
    return (
      <a
        href={`#recipes?recipeId=${this.state.favorites.recipeId}`}
        className="text-dark card mb-4 shadow-sm text-decoration-none list-card">
        <img className="card-img-top recipeImageList text-center " src={this.state.favorites.imageUrl} alt={this.state.favorites.recipeName} />
        <div className="card-body">
          <h4 className="card-title">{this.state.favorites.recipeName}</h4>
          <p className="card-text">{this.state.favorites.recipeOrigin}</p>
          <p className="card-text"> {`Equipment Needed: ${this.state.favorites.equipment}`}</p>
        </div>

      </a>
    );
  }
}

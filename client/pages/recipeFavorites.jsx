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
    fetch('/api/favorites/')
      .then(response => response.json())
      .then(data => this.setState({ favorites: data }));
    console.log(this.state.favorites);

  }

  render() {
    return (
    <h1>Hello</h1>
    );
  }
}

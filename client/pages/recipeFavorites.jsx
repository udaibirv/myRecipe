import React from 'react';
import recipeList from './recipeList';

export default class recipeFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

}

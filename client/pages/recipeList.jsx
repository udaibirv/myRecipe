import { response } from 'express';
import React from 'react';
import RecipeForm from './recipeForm';

class RecipeList extends React.Component {
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
        this.setState({ recipes: data });
      });
  }
}

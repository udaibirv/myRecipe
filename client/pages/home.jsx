import React from 'react';
import RecipeForm from './recipeForm';
import RecipeList from './recipeList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.state = { view: 'form' };
  }

  setView(view) {
    this.setState({
      view: view
    });
  }

  render() {
    if (this.state.view === 'form') {
      return (
        <RecipeForm setView={this.setView} />
      );
    }
    if (this.state.view === 'list') {
      return (

        <RecipeList setView={this.setView} />
      );
    }
  }

}

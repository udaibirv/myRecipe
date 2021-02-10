import React from 'react';

export default class RecipeListItem extends React.Component {

  render() {
    return (
    <li>
      {this.props.recipe.recipeName}
    </li>
    );
  }

}

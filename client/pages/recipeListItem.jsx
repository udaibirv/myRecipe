import React from 'react';

export default class RecipeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [{
        userId: '',
        recipeId: ''
      }]
    };
    this.postFavorites = this.postFavorites.bind(this);
  }

  postFavorites() {
    const { userId } = this.state.favorites;
    const recipeId = this.props.recipe.recipeId;
    let body = { recipeId, userId };
    body = JSON.stringify(body);

    fetch('/api/favorites/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ favorites: data });
        console.log(data);
      });
  }

  render() {
    return (
      <div>
      <a
        href={`#recipes?recipeId=${this.props.recipe.recipeId}`}
        className ="text-dark card mb-4 shadow-sm text-decoration-none list-card">
              <img className="card-img-top recipeImageList text-center " src={this.props.recipe.imageUrl} alt={this.props.recipe.recipeName} />
                <div className="card-body">
                  <h4 className="card-title">{this.props.recipe.recipeName}</h4>
                  <p className="card-text">{this.props.recipe.recipeOrigin}</p>
                  <p className="card-text"> {`Equipment Needed: ${this.props.recipe.equipment}`}</p>
                </div>

      </a>

      <button onClick={this.postFavorites}>Hi</button>
      </div>

    );
  }

}

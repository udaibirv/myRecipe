import React from 'react';
import Login from './login';
export default class RecipeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: {
        userId: JSON.parse(window.localStorage.getItem('userId')),
        recipeId: ''
      },
      isActive: false
    };
    this.postFavorites = this.postFavorites.bind(this);
  }

  postFavorites(event) {
    const recipeId = this.props.recipe.recipeId;
    const userId = this.state.favorites.userId;

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
        console.log(data);
        this.setState({ favorites: data });
      })
      .catch(error => {
        console.error('Error: ', error);
      });
    this.setState({ isActive: true });
  }

  render() {
    let heart = '';
    if (this.state.isActive === true) {
      heart = 'fas';
    } else {
      heart = 'far';
    }
    return (
      <div>
        <div className="icon">
          <i className= {`${heart} fa-heart`} onClick={this.postFavorites}></i>
        </div>
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

      </div>

    );
  }

}

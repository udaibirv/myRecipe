import React from 'react';

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {
    fetch(`/api/recipes/${this.props.recipeId}`)
      .then(response => response.json())
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    if (!this.state.recipe) {
      return null;
    }

    const recipeObject = this.state.recipe[0];

    const ingredientMap = recipeObject.ingredients.map(ingredient =>
        <li key={ingredient.ingredientId} className="list-item detail-text text-center">{`${ingredient.amount} ${ingredient.name}  `}</li>
    );

    return (
      <div className="container-fluid">
        <div className="row">
        <a href='#list' className="text-secondary anchor">
          &lt; Back To Recipe List
        </a>
        <div className="card detail-card shadow-sm" style={{ width: '35rem' }}>
          <img className="card-img-top recipeImage" src={recipeObject.imageUrl} />
          <div className="card-body">
        </div>
            <div className="row mb-4">
              <div className="col col-lg-12">
                <h1 className="text-center main-header">{recipeObject.recipeName}</h1>
                <p className="detail-text">{recipeObject.recipeOrigin}</p>
              </div>
            </div>
            <div className="row">
              <div className="col col-lg-12 mb-4">
                <h5 className="detail-head">{`Equipment Needed: ${recipeObject.equipment}`}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col col-lg-12 mb-4 text-center">
                <h5 className="detail-head text-center">Ingredients</h5>

                  {ingredientMap}

              </div>
            </div>
            <div className="row">
              <div className="col col-lg-12 col-sm">
                <h5 className="detail-head">Recipe Instructions</h5>
                <p className="detail-text">{recipeObject.directions[0].instruction}</p>
              </div>
            </div>
      </div>
      </div>
      </div>

    );
  }
}

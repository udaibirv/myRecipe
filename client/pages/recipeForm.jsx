import React from 'react';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeOrigin: '',
      ingredients: [{
        name: '',
        amount: ''
      }],
      equipment: '',
      instructions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleName = this.handleName.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    const { recipeName, recipeOrigin, ingredients, equipment, instructions } = state;
    for (const property in state) {
      if (!state[property]) {
        alert('Please fill out all fields before submitting');
        return;
      }
    }
    let bodyObject = { recipeName, recipeOrigin, ingredients, equipment, instructions };
    bodyObject = JSON.stringify(bodyObject);
    console.log(bodyObject);
    // restructure object names
    // make object
    // stringinfy
    fetch('/api/recipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyObject
    })
      .then(response => console.log(response));
    // .then(data => console.log(data));
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleUpdate(event) {
    const ingredientAmount = { ...this.state.ingredients };
    ingredientAmount[0].amount = event.target.value;
    this.setState({ ingredients: ingredientAmount[0].amount });

    console.log(this.state);
  }

  handleName(event) {
    const ingredientName = { ...this.state.ingredients };
    ingredientName[0].name = event.target.value;
    this.setState({ ingredients: ingredientName[0].name });
  }

  render() {
    return (
    <div className="container">
  <div className="row justify-content-center align-items-center">
    <div className="col">
      <h2 className="text-center">Upload a Recipe!</h2>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input type="text" value={this.state.recipeName} onChange={this.handleChange} className="form-control" id="recipeName"/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeOrigin">Recipe Origin</label>
          <textarea type="text" value={this.state.recipeOrigin} rows="3" onChange={this.handleChange} className="form-control" id="recipeOrigin"/>
        </div>
        <div className="form-group">
          <label htmlFor="ingredientsName">Ingredients</label>
          <input type="text" value={this.state.ingredients} onChange={this.handleName} className="form-control" id="ingredients-name"/>
        </div>
        <div className="form-group">
          <label htmlFor="ingredientsAmount">Ingredient Amount</label>
          <input type="text" value={this.state.ingredients} onChange={this.handleUpdate} className="form-control" id="ingredients-amount" />
        </div>
        <div className="form-group">
          <label htmlFor="equipment">Equipment</label>
          <input type="text" value={this.state.equipment} onChange={this.handleChange} className="form-control" id="equipment" />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <input type="text" rows="4" value={this.state.instructions} onChange={this.handleChange} className="form-control" id="instructions"/>
        </div>
        <div className="text-center">
          <button className="btn btn-primary btn-lg" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
  }
}

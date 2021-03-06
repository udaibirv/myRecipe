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
      instructions: [],
      imageUrl: '',
      userId: window.localStorage.getItem('userId')
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleName = this.handleName.bind(this);
    this.addIngredient = this.addIngredient.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    const { recipeName, recipeOrigin, equipment, ingredients, instructions, imageUrl, userId } = state;
    let bodyObject = { recipeName, recipeOrigin, ingredients, equipment, instructions, imageUrl, userId };
    bodyObject = JSON.stringify(bodyObject);
    fetch(`/api/recipe/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyObject
    })
      .then(response => response.json())
      .then(data => {
        window.location.hash = '#list';
      });

  }

  addIngredient(event) {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, { name: '', amount: '' }]
    }));
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

  }

  handleName(event, index) {
    const ingredientName = { ...this.state.ingredients };
    ingredientName[index].name = event.target.value;
    this.setState({ ingredientName });
  }

  handleAmount(event, index) {
    const ingredientAmount = { ...this.state.ingredients };

    ingredientAmount[index].amount = event.target.value;
    this.setState({ ingredientAmount });

  }

  render() {
    const { ingredients } = this.state;
    return (
    <div className="container-fluid">
  <div className="row form-row justify-content-center align-items-center">
    <div className="col">
      <h2 className="text-center form-header">Upload a Recipe!</h2>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input type="text" value={this.state.recipeName} onChange={this.handleChange} className="form-control" id="recipeName" required/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeOrigin">Recipe Origin</label>
          <textarea type="text" value={this.state.recipeOrigin} rows="3" onChange={this.handleChange} className="form-control" id="recipeOrigin" required/>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <button type="button" className="btn btn-sm ingredientButton" onClick={this.addIngredient}>Add Ingredient</button>
          {
            ingredients.map((value, index) => {

              return (
              <div className="form-group" key={index}>
                <label htmlFor="ingredientName" className="ingredientName">Name</label>
                  <input type="text" className="ingredientForm name" value={ingredients[index].name} onChange={(event => this.handleName(event, index))} required />
                  <div>
                  <label htmlFor="ingredientAmount" className="ingredientAmount">Amount</label>
                  <input type="text" className="ingredientForm amount ingredientAmount" value={ingredients[index].amount} onChange={(event => this.handleAmount(event, index))} required />
                  </div>
              </div>
              );

            })
          }
        </div>
        <div className="form-group">
          <label htmlFor="equipment">Equipment</label>
          <input type="text" value={this.state.equipment} onChange={this.handleChange} className="form-control" id="equipment" required />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
            <textarea type="text" value={this.state.instructions} rows="3" onChange={this.handleChange} className="form-control" id="instructions" required />
        </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Recipe Image</label>
                <input type="text" rows="4" value={this.state.imageUrl} onChange={this.handleChange} className="form-control" id="imageUrl" required />
              </div>
        <div className="text-center">
          <button className="btn btn-lg" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
  }
}

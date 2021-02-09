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
    this.handleAmount = this.handleAmount.bind(this);
    this.handleName = this.handleName.bind(this);
    this.addIngredient = this.addIngredient.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    const { recipeName, recipeOrigin, ingredients, equipment, instructions } = state;
    // for (const property in state) {
    //   if (!state[property]) {
    //     alert('Please fill out all fields before submitting');
    //     return;
    //   }
    // }
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
      .then(response => response.json())
      .then(data => this.setState({ data }));

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

  handleName(event) {
    const ingredientName = { ...this.state.ingredients };
    for (const index in ingredientName) {
      ingredientName[index].name = event.target.value;
    }
    console.log('target: ', event.target);
    this.setState({ ingredientName });
  }

  handleAmount(event) {
    const ingredientAmount = { ...this.state.ingredients };
    ingredientAmount[0].amount = event.target.value;
    this.setState({ ingredientAmount });

    console.log('ingredientAmount: ', ingredientAmount);
  }

  render() {
    const { ingredients } = this.state;
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
          <label htmlFor="ingredients">Ingredients</label>
          {/* <input type="text" value={ingredients.name} onChange={this.handleName} className="form-control" id="ingredients-name"/> */}
          <button onClick={this.addIngredient}>Add Ingredient</button>
          {
            ingredients.map((value, index) => {

              console.log('index: ', index);
              return (
              <div className="form-group" key={index}>
                <label htmlFor="ingredientName">Name</label>
                  <input type="text" value={ingredients[index].name} onChange={this.handleName} />
                <label htmlFor="ingredientAmount">Amount</label>
                  <input type="text" value={ingredients[index].amount} onChange={this.handleAmount} />
              </div>
              );

            })
          }
        </div>
        {/* <div className="form-group">
          <label htmlFor="ingredientsAmount">Ingredient Amount</label>
          <input type="text" value={ingredients.amount} onChange={this.handleUpdate} className="form-control" id="ingredients-amount" />
        </div> */}
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

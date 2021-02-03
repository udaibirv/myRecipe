import React from 'react';

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeOrigin: '',
      recipeIngredients: '',
      recipeEquipment: '',
      recipeDirections: '',
      recipeCategory: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    const { recipeName, recipeOrigin, recipeIngredients, recipeEquipment, recipeDirections, recipeCategory } = this.state;
    event.preventDefault();
  }

  handleChange(event) {
    console.log(event.target);
    // this.setState({
    //   event.target.name: event.target.value;
    // }, ()=> console.log("this.stat", this.state))
  }

  render() {
    return (
    <div className="container">
  <div className="row justify-content-center align-items-center">
    <div className="col">
      <h2>Upload a Recipe!</h2>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input type="text" value={this.state.recipeName} onChange={this.handleChange} className="form-control" id="recipeName"/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeOrigin">Recipe Origin</label>
          <input type="text" value={this.state.recipeOrigin} onChange={this.handleChange} className="form-control "/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeIngredients">Ingredients</label>
          <input type="text" value={this.state.recipeIngredients} onChange={this.handleChange} className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeDirections">Directions</label>
          <input type="text" value={this.state.recipeDirections} onChange={this.handleChange} className="form-control "/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeEquipment">Equipment</label>
          <input type="text" value={this.state.recipeEquipment} onChange={this.handleChange}className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="recipeCategory">Category</label>
          <select value={this.state.recipeCategory} onChange={this.handleChange}>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</div>
    );
  }
}

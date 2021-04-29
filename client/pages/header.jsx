import React from 'react';
import AppContext from '../app-context';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.handleSignOut = this.handleSignOut.bind(this);

  }

  handleSignOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    this.setState({ user: null });
    console.log(window.localStorage);
    window.location.hash = '#sign-up';
  }

  render() {
    const { user, handleSignOut } = <AppContext />;
    return (
  <header className="mb-5">
    <nav className="navbar navbar-dark bg-dark shadow-sm navbar-expand-lg">
      <div className="col px-0">
        <a href='#list' className="list">Recipe List</a>
        <a href='#upload' className="upload">Upload A Recipe</a>
        <a href='#favorites' className="favorites">Favorites</a>
      </div>
      <div>
        {user !== null &&
          <button className="btn btn-dark" onClick={this.handleSignOut}>
            Sign Out
          </button>
        }
        {user === null &&
          <>
          <a href="#sign-in" className="btn btn-primary">
            Sign In
          </a>
          <a href="#sign-up" className="btn btn-dark">
            Sign Up
          </a>
          </>
        }
      </div>
    </nav>
      <h2 className="navHeader text-center">myRecipe</h2>
  </header>
    );
  }
}

Header.contextType = AppContext;

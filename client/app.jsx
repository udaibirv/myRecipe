import React from 'react';
import RecipeList from './pages/recipeList';
import RecipeDetails from './pages/recipeDetails';
import parseRoute from '../lib/parse-route';
import Header from './pages/header';
import RecipeForm from './pages/recipeForm';
import RecipeFavorites from './pages/recipeFavorites';
import decodeToken from '../lib/decode-token';
import Auth from './pages/auth';
import AppContext from './app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('react-context-jwt');

    let user;
    if (token) {
      user = decodeToken(token);
    } else {
      user = null;
    }
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });

  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Auth />;
    }

    if (route.path === 'list') {
      return <RecipeList />;
    }

    if (route.path === 'recipes') {

      const recipeId = route.params.get('recipeId');
      return <RecipeDetails recipeId={recipeId} />;
    }

    if (route.path === 'upload') {
      return <RecipeForm />;
    }

    if (route.path === 'favorites') {
      return <RecipeFavorites/>;
    }

    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }

  }

  render() {
    if (this.state.isAuthorizing) {
      return null;
    }
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
    <>
    <Header />
      { this.renderPage() }
    </>
    </AppContext.Provider>
    );

  }
}

App.contextType = AppContext;

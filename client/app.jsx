import React from 'react';
import RecipeList from './pages/recipeList';
import RecipeDetails from './pages/recipeDetails';
import parseRoute from '../lib/parse-route';
import Header from './pages/header';
import RecipeForm from './pages/recipeForm';
import RecipeFavorites from './pages/recipeFavorites';
import AppContext from './app-context';
import AuthForm from './pages/auth-form';
import Login from './pages/login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true
    };

  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'list') {
      return <RecipeList />;
    }

    if (route.path === '') {
      return <AuthForm />;
    }

    if (route.path === 'sign-in') {
      return <Login />;
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

  }

  render() {

    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
    <>
    <Header />
    { this.renderPage()}
    </>
    </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;

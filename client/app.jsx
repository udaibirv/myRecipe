import React from 'react';
import RecipeList from './pages/recipeList';
import RecipeDetails from './pages/recipeDetails';
import parseRoute from '../lib/parse-route';
import Header from './pages/header';
import RecipeForm from './pages/recipeForm';
import RecipeFavorites from './pages/recipeFavorites';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
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

  }

  render() {
    return (
    <>
    <Header />
      { this.renderPage() }
    </>
    );

  }
}

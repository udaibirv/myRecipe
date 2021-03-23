import React from 'react';

export default function Header(props) {
  return (
  <header className="mb-5">
    <nav className="navbar navbar-dark bg-dark shadow-sm navbar-expand-lg">
      <div className="col px-0">
        <a href='#' className="list">Recipe List</a>
        <a href='#upload' className="upload">Upload A Recipe</a>
        <a href='#favorites' className="favorites">Favorites</a>
      </div>
    </nav>
      <h2 className="navHeader text-center">myRecipe</h2>
  </header>
  );
}

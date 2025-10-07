import React from "react";
import "./RecipeList.css";

export default function RecipeList({ recipes = [] }) {
  if (!recipes.length) return <div>No hay recetas.</div>;
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipe-list-item">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </li>
      ))}
    </ul>
  );
}

import React from "react";
import "./RecipeCard.css";

export default function RecipeCard({ recipes = [] }) {
  if (!recipes.length) return <div>No hay recetas.</div>;
  return (
    <>
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="recipe-description">{recipe.description}</p>
          <div className="recipe-section">
            <strong>Ingredientes:</strong>
            <ul>
              {recipe.ingredientes?.map((ing, idx) => (
                <li key={idx}>{ing} {recipe.cantidades?.[idx] ? `- ${recipe.cantidades[idx]}` : ""}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-section">
            <strong>Pasos:</strong>
            <ol>
              {recipe.pasos?.map((paso, idx) => (
                <li key={idx}>{paso}</li>
              ))}
            </ol>
          </div>
          {recipe.comentarios && (
            <div className="recipe-section">
              <strong>Comentarios:</strong>
              <p>{recipe.comentarios}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

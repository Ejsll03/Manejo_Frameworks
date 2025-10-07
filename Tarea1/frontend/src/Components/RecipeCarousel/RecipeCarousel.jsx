import React, { useState } from "react";
import "./RecipeCarousel.css";

export default function RecipeCarousel({ recipes = [] }) {
  const [current, setCurrent] = useState(0);
  if (!recipes.length) return <div>No hay recetas.</div>;
  const recipe = recipes[current];
  return (
    <div className="recipe-carousel">
      <button onClick={() => setCurrent((current - 1 + recipes.length) % recipes.length)}>&lt;</button>
      <div className="carousel-card">
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
        <div>
          <strong>Ingredientes:</strong>
          <ul>
            {recipe.ingredientes?.map((ing, idx) => (
              <li key={idx}>{ing} {recipe.cantidades?.[idx] ? `- ${recipe.cantidades[idx]}` : ""}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Pasos:</strong>
          <ol>
            {recipe.pasos?.map((paso, idx) => (
              <li key={idx}>{paso}</li>
            ))}
          </ol>
        </div>
        {recipe.comentarios && (
          <div>
            <strong>Comentarios:</strong>
            <p>{recipe.comentarios}</p>
          </div>
        )}
      </div>
      <button onClick={() => setCurrent((current + 1) % recipes.length)}>&gt;</button>
    </div>
  );
}
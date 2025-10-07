import React, { useState } from "react";
import "./RecipeBook.css";

export default function RecipeBook({ recipes = [] }) {
  const [page, setPage] = useState(0);
  if (!recipes.length) return <div>No hay recetas.</div>;
  const recipe = recipes[page];
  return (
    <div className="recipe-book">
      <div className="book-controls">
        <button onClick={() => setPage((page - 1 + recipes.length) % recipes.length)}>&lt; Anterior</button>
        <span>Página {page + 1} de {recipes.length}</span>
        <button onClick={() => setPage((page + 1) % recipes.length)}>Siguiente &gt;</button>
      </div>
      <div className="book-page">
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
    </div>
  );
}
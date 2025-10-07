import React from "react";
import "./RecipeTable.css";

export default function RecipeTable({ recipes = [] }) {
  if (!recipes.length) return <div>No hay recetas.</div>;
  return (
    <table className="recipe-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Ingredientes</th>
          <th>Cantidades</th>
          <th>Pasos</th>
          <th>Comentarios</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe.id}>
            <td>{recipe.title}</td>
            <td>{recipe.description}</td>
            <td>{Array.isArray(recipe.ingredientes) ? recipe.ingredientes.join(", ") : recipe.ingredientes}</td>
            <td>{Array.isArray(recipe.cantidades) ? recipe.cantidades.join(", ") : recipe.cantidades}</td>
            <td>{Array.isArray(recipe.pasos) ? recipe.pasos.join("; ") : recipe.pasos}</td>
            <td>{recipe.comentarios}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
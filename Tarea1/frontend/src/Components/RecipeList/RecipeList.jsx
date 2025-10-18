import React from "react";
import "./RecipeList.css";
import Button from "../Button/Button";

export default function RecipeList({ recipes = [], onView, onEdit, onDelete }) {
  if (!recipes.length) return <div>No hay recetas.</div>;
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe._id || recipe.id} className="recipe-list-item">
          <h3>{recipe.title}</h3>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button icon="pi pi-eye" onClick={() => onView && onView(recipe)} />
            <Button
              icon="pi pi-pencil"
              onClick={() => onEdit && onEdit(recipe)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={() => onDelete && onDelete(recipe)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

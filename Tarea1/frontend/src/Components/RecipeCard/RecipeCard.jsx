import React from "react";
import "./RecipeCard.css";

import Button from "../Button/Button";

export default function RecipeCard({ recipes = [], onView, onEdit, onDelete }) {
  if (!recipes.length) return <div>No hay recetas.</div>;
  // Agrupar recetas en filas de 3
  const rows = [];
  for (let i = 0; i < recipes.length; i += 3) {
    rows.push(recipes.slice(i, i + 3));
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {rows.map((row, idx) => (
        <div
          key={idx}
          style={{ display: "flex", gap: 24, justifyContent: "center" }}
        >
          {row.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe._id || recipe.id}
              style={{ flex: 1, minWidth: 220, maxWidth: 340 }}
            >
              <h2 className="recipe-title">{recipe.title}</h2>
              <div
                className="recipe-section"
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                <Button
                  icon="pi pi-eye"
                  onClick={() => onView && onView(recipe)}
                />
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

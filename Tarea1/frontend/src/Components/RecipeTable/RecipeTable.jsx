import React from "react";
import "./RecipeTable.css";
import Button from "../Button/Button";

export default function RecipeTable({
  recipes = [],
  onView,
  onEdit,
  onDelete,
}) {
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => {
          const key = recipe._id || recipe.id;
          return (
            <tr key={key}>
              <td>{recipe.title}</td>
              <td>{recipe.description}</td>
              <td>
                {Array.isArray(recipe.ingredientes)
                  ? recipe.ingredientes.join(", ")
                  : recipe.ingredientes}
              </td>
              <td>
                {Array.isArray(recipe.cantidades)
                  ? recipe.cantidades.join(", ")
                  : recipe.cantidades}
              </td>
              <td>
                {Array.isArray(recipe.pasos)
                  ? recipe.pasos.join("; ")
                  : recipe.pasos}
              </td>
              <td>{recipe.comentarios}</td>
              <td style={{ minWidth: 160 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

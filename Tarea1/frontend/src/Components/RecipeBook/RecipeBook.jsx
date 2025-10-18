import { useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import "./RecipeBook.css";
import Button from "../Button/Button";

export default function RecipeBook({ recipes = [], onView, onEdit, onDelete }) {
  if (!recipes.length) return <div>No hay recetas.</div>;

  const pages = useMemo(() => {
    // Dos páginas por receta: izquierda -> descripción + ingredientes; derecha -> pasos + comentarios
    const list = [];
    recipes.forEach((recipe) => {
      const key = recipe._id || recipe.id;
      // Página izquierda
      list.push(
        <div className="book-page" key={`${key}-left`}>
          <h2 style={{ marginTop: 0 }}>{recipe.title}</h2>
          {recipe.description && (
            <div
              style={{
                marginBottom: 8,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              <strong>Descripción:</strong> {recipe.description}
            </div>
          )}
          <div style={{ marginBottom: 8, maxHeight: 320, overflowY: "auto" }}>
            <strong>Ingredientes:</strong>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {(recipe.ingredientes || []).map((ing, idx) => (
                <li key={idx}>
                  {ing}
                  {recipe.cantidades?.[idx]
                    ? ` - ${recipe.cantidades[idx]}`
                    : ""}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
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
        </div>
      );
      // Página derecha
      list.push(
        <div className="book-page" key={`${key}-right`}>
          <h3 style={{ marginTop: 0 }}>Pasos</h3>
          <ol
            style={{
              margin: 0,
              paddingLeft: 20,
              maxHeight: 360,
              overflowY: "auto",
            }}
          >
            {(recipe.pasos || []).map((p, idx) => (
              <li
                key={idx}
                style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
              >
                {p}
              </li>
            ))}
          </ol>
          {recipe.comentarios && (
            <div
              style={{
                marginTop: 12,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              <strong>Comentarios:</strong> {recipe.comentarios}
            </div>
          )}
        </div>
      );
    });
    return list;
  }, [recipes, onView, onEdit, onDelete]);

  return (
    <div className="recipe-book">
      <HTMLFlipBook
        width={420}
        height={420}
        size="stretch"
        minWidth={300}
        maxWidth={520}
        minHeight={360}
        maxHeight={640}
        maxShadowOpacity={0.3}
        showCover={true}
        className="recipe-flipbook"
        mobileScrollSupport={true}
      >
        {/* Portada */}
        <div className="book-page cover" key="cover">
          <h2 style={{ textAlign: "center" }}>Recetario</h2>
          <p style={{ textAlign: "center", color: "#666" }}>
            Desliza desde las esquinas o haz clic para pasar de página
          </p>
        </div>
        {pages}
        {/* Contraportada */}
        <div className="book-page cover" key="back-cover">
          <h2 style={{ textAlign: "center" }}>Fin</h2>
        </div>
      </HTMLFlipBook>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./Dashboard.css";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import RecipeCarousel from "../../Components/RecipeCarousel/RecipeCarousel";
import RecipeBook from "../../Components/RecipeBook/RecipeBook";
import RecipeList from "../../Components/RecipeList/RecipeList";
import RecipeTable from "../../Components/RecipeTable/RecipeTable";
import Button from "../../Components/Button/Button";
import { RecipesAPI, AuthAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

const dummyRecipes = [];

const VIEWS = [
  { key: "card", label: "Card" },
  { key: "carousel", label: "Carrusel" },
  { key: "book", label: "Book" },
  { key: "list", label: "Lista" },
  { key: "table", label: "Tabla" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [recipes, setRecipes] = useState(dummyRecipes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    comentarios: "",
    ingredientes: [{ nombre: "", cantidad: "" }],
    pasos: [],
  });
  const [modalMode, setModalMode] = useState(null); // "view" | "edit"

  async function loadRecipes() {
    try {
      setLoading(true);
      await AuthAPI.check(); // valida sesión
      const data = await RecipesAPI.list();
      setRecipes(data);
    } catch (e) {
      // Si el error es de autenticación, redirige al login
      if (
        e.message?.toLowerCase().includes("no autenticado") ||
        e.message?.toLowerCase().includes("401")
      ) {
        navigate("/");
        return;
      }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  async function handleLogout() {
    try {
      await AuthAPI.logout();
      navigate("/");
    } catch (e) {
      alert(e.message || "No se pudo cerrar sesión");
    }
  }

  async function handleCreateDemo() {
    try {
      const created = await RecipesAPI.create({
        title: `Receta ${new Date().toLocaleString()}`,
        description: "Ejemplo rápido creado desde Dashboard",
        ingredientes: ["Ingrediente A", "Ingrediente B"],
        cantidades: ["1 u", "2 u"],
        pasos: ["Paso 1", "Paso 2"],
        comentarios: "Sin comentarios",
      });
      setRecipes((prev) => [created, ...prev]);
    } catch (e) {
      alert(e.message);
    }
  }

  function onView(recipe) {
    setSelected(recipe);
    setModalMode("view");
  }

  function onEdit(recipe) {
    setSelected(recipe);
    setEditData({
      title: recipe.title || "",
      description: recipe.description || "",
      comentarios: recipe.comentarios || "",
      imagen: recipe.imagen || "",
      ingredientes:
        Array.isArray(recipe.ingredientes) && Array.isArray(recipe.cantidades)
          ? recipe.ingredientes.map((ing, idx) => ({
              nombre: ing || "",
              cantidad: recipe.cantidades[idx] || "",
            }))
          : [{ nombre: "", cantidad: "" }],
      pasos: Array.isArray(recipe.pasos) ? recipe.pasos : [],
    });
    setModalMode("edit");
  }

  async function onDelete(recipe) {
    if (!confirm(`¿Borrar la receta "${recipe.title}"?`)) return;
    try {
      await RecipesAPI.remove(recipe._id || recipe.id);
      setRecipes((prev) =>
        prev.filter((r) => (r._id || r.id) !== (recipe._id || recipe.id))
      );
    } catch (e) {
      alert(e.message);
    }
  }

  async function saveEdit(e) {
    e?.preventDefault?.();
    if (!selected) return;
    try {
      const ingredientesArr = editData.ingredientes.map((i) => i.nombre.trim());
      const cantidadesArr = editData.ingredientes.map((i) => i.cantidad.trim());
      const updated = await RecipesAPI.update(selected._id || selected.id, {
        ...editData,
        ingredientes: ingredientesArr,
        cantidades: cantidadesArr,
      });
      setRecipes((prev) =>
        prev.map((r) =>
          (r._id || r.id) === (selected._id || selected.id) ? updated : r
        )
      );
      setSelected(null);
      setModalMode(null);
    } catch (e) {
      alert(e.message);
    }
  }

  const renderRecipes = () => {
    switch (view) {
      case "card":
        return (
          <RecipeCard
            recipes={recipes}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "carousel":
        return (
          <RecipeCarousel
            recipes={recipes}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "book":
        return (
          <RecipeBook
            recipes={recipes}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "list":
        return (
          <RecipeList
            recipes={recipes}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "table":
        return (
          <RecipeTable
            recipes={recipes}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h1 style={{ margin: 0 }}>Recetario</h1>
          <Button
            icon="pi pi-sign-out"
            onClick={handleLogout}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", margin: "12px 0 20px" }}>
          {VIEWS.map((v) => {
            let icon = "";
            if (v.key === "card") icon = "pi pi-th-large";
            if (v.key === "carousel") icon = "pi pi-images";
            if (v.key === "book") icon = "pi pi-book";
            if (v.key === "list") icon = "pi pi-list";
            if (v.key === "table") icon = "pi pi-table";
            return (
              <Button key={v.key} icon={icon} onClick={() => setView(v.key)} />
            );
          })}
          <Button onClick={handleCreateDemo}>Crear receta demo</Button>
          <Button onClick={() => navigate("/Recipes/new")}>Nueva Receta</Button>
        </div>
      </header>
      <main>
        {loading ? (
          <div>Cargando recetas...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          renderRecipes()
        )}
      </main>
      {selected && modalMode === "view" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 500,
              maxWidth: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <h3
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >{`Receta: ${selected.title}`}</h3>
            <div
              style={{
                marginBottom: 8,
                maxWidth: "100%",
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              <strong>Descripción:</strong> {selected.description}
            </div>
            <div style={{ marginBottom: 8, maxHeight: 200, overflowY: "auto" }}>
              <strong>Ingredientes:</strong>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {(selected.ingredientes || []).map((ing, idx) => (
                  <li
                    key={idx}
                    style={{
                      maxWidth: "100%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                    }}
                  >
                    {ing}{" "}
                    {selected.cantidades?.[idx]
                      ? `- ${selected.cantidades[idx]}`
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: 8, maxHeight: 240, overflowY: "auto" }}>
              <strong>Pasos:</strong>
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                {(selected.pasos || []).map((paso, idx) => (
                  <li
                    key={idx}
                    style={{
                      maxWidth: "100%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                    }}
                  >
                    {paso}
                  </li>
                ))}
              </ol>
            </div>
            {selected.comentarios && (
              <div
                style={{ marginBottom: 8, maxHeight: 120, overflowY: "auto" }}
              >
                <strong>Comentarios:</strong>{" "}
                <span
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                >
                  {selected.comentarios}
                </span>
              </div>
            )}
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button
                text="Cerrar"
                type="button"
                onClick={() => {
                  setSelected(null);
                  setModalMode(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {selected && modalMode === "edit" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 500,
              maxWidth: "90%",
            }}
          >
            <h3>{`Editar: ${selected.title}`}</h3>
            <form onSubmit={saveEdit} style={{ display: "grid", gap: 10 }}>
              <label>
                Título
                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </label>
              <label>
                Ingredientes y cantidades
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {editData.ingredientes.map((ing, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8 }}>
                      <input
                        type="text"
                        value={ing.nombre}
                        onChange={(e) => {
                          const newArr = editData.ingredientes.map((item, i) =>
                            i === idx
                              ? { ...item, nombre: e.target.value }
                              : item
                          );
                          setEditData({ ...editData, ingredientes: newArr });
                        }}
                        placeholder="Ingrediente"
                        required
                        style={{ flex: 2, padding: 8 }}
                      />
                      <input
                        type="text"
                        value={ing.cantidad}
                        onChange={(e) => {
                          const newArr = editData.ingredientes.map((item, i) =>
                            i === idx
                              ? { ...item, cantidad: e.target.value }
                              : item
                          );
                          setEditData({ ...editData, ingredientes: newArr });
                        }}
                        placeholder="Cantidad"
                        required
                        style={{ flex: 1, padding: 8 }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (editData.ingredientes.length > 1) {
                            setEditData({
                              ...editData,
                              ingredientes: editData.ingredientes.filter(
                                (_, i) => i !== idx
                              ),
                            });
                          }
                        }}
                        style={{ padding: "0 8px" }}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setEditData({
                        ...editData,
                        ingredientes: [
                          ...editData.ingredientes,
                          { nombre: "", cantidad: "" },
                        ],
                      })
                    }
                    style={{ width: "fit-content", marginTop: 4 }}
                  >
                    + Agregar ingrediente
                  </button>
                </div>
              </label>
              <label>
                Pasos (uno por línea)
                <textarea
                  rows={4}
                  value={
                    Array.isArray(editData.pasos)
                      ? editData.pasos.join("\n")
                      : editData.pasos || ""
                  }
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      pasos: e.target.value
                        .split(/\r?\n/)
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder={
                    "Ej:\nBatir huevos\nAgregar harina y mezclar\nHornear 30 minutos"
                  }
                  style={{ width: "100%", padding: 8, resize: "none" }}
                />
              </label>
              <label>
                Descripción
                <input
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </label>
              <label>
                Comentarios
                <textarea
                  rows={3}
                  value={editData.comentarios}
                  onChange={(e) =>
                    setEditData({ ...editData, comentarios: e.target.value })
                  }
                  style={{ resize: "none" }}
                />
              </label>
              <div
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
              >
                <Button
                  text="Cerrar"
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setModalMode(null);
                  }}
                />
                <Button text="Guardar" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

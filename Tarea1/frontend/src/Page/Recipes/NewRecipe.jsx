import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipesAPI, AuthAPI } from "../../services/api";
import { Card } from "primereact/card";
import Button from "../../Components/Button/Button";
import "../../Components/Form/Form.css";
import "./NewRecipe.css";

export default function NewRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientes, setIngredientes] = useState([
    { nombre: "", cantidad: "" },
  ]);
  const [pasosText, setPasosText] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    AuthAPI.check().catch(() => {
      navigate("/");
    });
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("El título es obligatorio");
    if (ingredientes.some((i) => !i.nombre.trim() || !i.cantidad.trim())) {
      return setError("Completa todos los ingredientes y cantidades");
    }
    setError("");
    setSaving(true);
    try {
      const ingredientesArr = ingredientes.map((i) => i.nombre.trim());
      const cantidadesArr = ingredientes.map((i) => i.cantidad.trim());
      const pasos = pasosText.split(/\r?\n/);

      await RecipesAPI.create({
        title,
        description,
        ingredientes: ingredientesArr,
        cantidades: cantidadesArr,
        pasos,
        comentarios,
      });
      navigate("/Dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  // Render ingredientes dinámicos
  const handleIngredienteChange = (idx, field, value) => {
    setIngredientes((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing))
    );
  };
  const addIngrediente = () => {
    setIngredientes((prev) => [...prev, { nombre: "", cantidad: "" }]);
  };
  const removeIngrediente = (idx) => {
    setIngredientes((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
    );
  };

  return (
    <div className={`form-container login`}>
      <Card className="form-card new-recipe-card">
        <div className="form-header">
          <h2 className="form-title">Nueva Receta</h2>
        </div>

        <form onSubmit={onSubmit} className="form-form">
          <label>
            Título
            <input
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre de la receta"
              required
            />
          </label>
          <label>
            Descripción
            <textarea
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción breve de la receta"
              rows={3}
            />
          </label>
          <label>
            Ingredientes y cantidades
            <div className="ingredients-list">
              {ingredientes.map((ing, idx) => (
                <div key={idx} className="ingredient-row">
                  <input
                    className="ingredient-input"
                    type="text"
                    value={ing.nombre}
                    onChange={(e) =>
                      handleIngredienteChange(idx, "nombre", e.target.value)
                    }
                    placeholder="Ingrediente"
                    required
                  />
                  <input
                    className="ingredient-qty"
                    type="text"
                    value={ing.cantidad}
                    onChange={(e) =>
                      handleIngredienteChange(idx, "cantidad", e.target.value)
                    }
                    placeholder="Cantidad"
                    required
                  />
                  <div className="ingredient-actions">
                    <Button
                      type="button"
                      text="-"
                      onClick={() => removeIngrediente(idx)}
                      className="custom-btn"
                      disabled={ingredientes.length === 1}
                    />
                  </div>
                </div>
              ))}
              <div className="add-ingredient-wrap">
                <Button
                  type="button"
                  text="+ Agregar ingrediente"
                  onClick={addIngrediente}
                  className="custom-btn"
                />
              </div>
            </div>
          </label>
          <label>
            Pasos (uno por línea)
            <textarea
              className="form-input"
              value={pasosText}
              onChange={(e) => setPasosText(e.target.value)}
              placeholder={
                "Ej:\nBatir huevos\nAgregar harina y mezclar\nHornear 30 minutos"
              }
              rows={6}
            />
          </label>
          <label>
            Comentarios
            <textarea
              className="form-input"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Notas adicionales o comentarios"
              rows={3}
            />
          </label>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button
              text="Cancelar"
              type="button"
              onClick={() => navigate(-1)}
              className="custom-btn"
              disabled={saving}
            />
            <Button
              text={saving ? "Guardando..." : "Guardar"}
              type="submit"
              className="custom-btn"
              disabled={saving}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

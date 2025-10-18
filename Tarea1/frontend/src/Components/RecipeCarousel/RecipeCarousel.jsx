import React, { useState, useEffect } from "react";
import "./RecipeCarousel.css";
import Button from "../Button/Button";

export default function RecipeCarousel({
  recipes = [],
  onView,
  onEdit,
  onDelete,
}) {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState("");
  const total = recipes.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => {
      setAnim("slide-out");
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % total);
        setAnim("slide-in");
      }, 250);
      setTimeout(() => setAnim(""), 600);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  if (!recipes.length) return <div>No hay recetas.</div>;
  const recipe = recipes[current];

  function handlePrev() {
    setAnim("slide-out");
    setTimeout(() => {
      setCurrent((current - 1 + total) % total);
      setAnim("slide-in");
    }, 250);
    setTimeout(() => setAnim(""), 600);
  }
  function handleNext() {
    setAnim("slide-out");
    setTimeout(() => {
      setCurrent((current + 1) % total);
      setAnim("slide-in");
    }, 250);
    setTimeout(() => setAnim(""), 600);
  }

  return (
    <div className="recipe-carousel">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={`carousel-card ${anim}`}>
          <h2>{recipe.title}</h2>
          <div className="carousel-actions">
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
      </div>
      <div className="carousel-dots">
        {recipes.map((_, idx) => (
          <span
            key={idx}
            className={"carousel-dot" + (idx === current ? " active" : "")}
          />
        ))}
      </div>
    </div>
  );
}

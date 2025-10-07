import React, { useState } from "react";
import "./Dashboard.css";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import RecipeCarousel from "../../Components/RecipeCarousel/RecipeCarousel";
import RecipeBook from "../../Components/RecipeBook/RecipeBook";
import RecipeList from "../../Components/RecipeList/RecipeList";
import RecipeTable from "../../Components/RecipeTable/RecipeTable";
import Button from "../../Components/Button/Button";

const dummyRecipes = [
  {
    id: 1,
    title: "Tarta de Manzana",
    description: "Deliciosa tarta de manzana casera.",
  },
  {
    id: 2,
    title: "Ensalada César",
    description: "Clásica ensalada con pollo y aderezo César.",
  },
  {
    id: 3,
    title: "Pizza Margarita",
    description: "Pizza italiana con tomate y albahaca.",
  },
  {
    id: 4,
    title: "Brownie",
    description: "Brownie de chocolate húmedo y esponjoso.",
  },
  {
    id: 5,
    title: "Paella",
    description: "Paella tradicional española con mariscos.",
  },
];

const VIEWS = [
  { key: "card", label: "Card/Grid" },
  { key: "carousel", label: "Carrusel" },
  { key: "book", label: "Book" },
  { key: "list", label: "Lista" },
  { key: "table", label: "Tabla" },
];

export default function Dashboard() {
  const [view, setView] = useState("card");

  const renderRecipes = () => {
    switch (view) {
      case "card":
        return <RecipeCard recipes={dummyRecipes} />;
      case "carousel":
        return <RecipeCarousel recipes={dummyRecipes} />;
      case "book":
        return <RecipeBook recipes={dummyRecipes} />;
      case "list":
        return <RecipeList recipes={dummyRecipes} />;
      case "table":
        return <RecipeTable recipes={dummyRecipes} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Recetario</h1>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {VIEWS.map((v) => (
            <Button key={v.key} onClick={() => setView(v.key)}>
              {v.label}
            </Button>
          ))}
        </div>
      </header>
      <main>{renderRecipes()}</main>
    </div>
  );
}

import React from "react";
import { Button } from "primereact/button";
import "./Button.css";

function CustomButton({ text, icon, className, type, ...props }) {
  const isIconOnly = !!icon && !text;
  const baseClass = isIconOnly ? "icon-btn" : "custom-btn";
  const combinedClass = [baseClass, className].filter(Boolean).join(" ");

  return (
    <div className="button-container">
      <Button
        label={text}
        icon={icon}
        className={combinedClass}
        type={type}
        {...props}
      />
    </div>
  );
}

export default CustomButton;

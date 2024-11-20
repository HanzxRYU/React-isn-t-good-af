import React from "react";
import Images from "../Element/Images";
import Detail from "../Element/Detail";
import Button from "../Element/Button";

const Card = ({ racket }) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      margin: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
  >
    <Images src={racket.image} alt={racket.name} />
    <Detail
      name={racket.name}
      price={racket.price}
      description={racket.description}
    />
    <Button
      text="Add to cart"
      onClick={() => alert(`${racket.name} added to cart`)}
    />
  </div>
);

export default Card;

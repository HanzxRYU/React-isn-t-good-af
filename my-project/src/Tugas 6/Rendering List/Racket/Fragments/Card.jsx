import React from "react";
import Images from "../Element/Images";
import Detail from "../Element/Detail";
import Button from "../Element/Button";

const Card = ({ racket }) => (
  <div className="border border-gray-300 rounded-lg p-4 m-2 shadow-lg hover:shadow-xl transition transform hover:scale-105">
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

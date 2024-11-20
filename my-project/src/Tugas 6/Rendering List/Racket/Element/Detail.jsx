import React from "react";

const Detail = ({ name, price, description }) => (
  <div>
    <h2>{name}</h2>
    <p>${price.toFixed(2)}</p>
    <p>{description}</p>
  </div>
);

export default Detail;

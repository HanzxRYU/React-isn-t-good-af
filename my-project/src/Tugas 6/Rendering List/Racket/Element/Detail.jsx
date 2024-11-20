import React from "react";

const Detail = ({ name, price, description }) => (
  <div className="mt-4">
    <h2 className="text-xl font-bold">{name}</h2>
    <p className="text-lg font-semibold text-gray-700">${price.toFixed(2)}</p>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

export default Detail;

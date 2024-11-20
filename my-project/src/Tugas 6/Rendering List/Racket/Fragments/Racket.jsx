import React from "react";
import { racketData } from "../data/data";
import Card from "../Fragments/Card";

const Racket = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
    }}
  >
    {racketData.map((racket) => (
      <Card key={racket.id} racket={racket} />
    ))}
  </div>
);

export default Racket;

import React from "react";

const Images = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: "100%", borderRadius: "8px" }} />
);

export default Images;

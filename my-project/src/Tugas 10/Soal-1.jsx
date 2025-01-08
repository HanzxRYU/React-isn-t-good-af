import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setcount] = useState(0);

  useEffect(() => {
    console.log(`Efek dijalankan: ${count}`);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setcount(count + 1)}>Tambah</button>
    </div>
  );
}

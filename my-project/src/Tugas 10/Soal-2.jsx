import React, { useState, useEffect } from "react";
export default function CountLogger() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      console.log(`Count berubah menjadi ${count}`);
    }, [count]);
  
    return (
      <div>
        <p>Count Saat ini: {count}</p>
        <button onClick={() => setCount(count + 1)}>Tambah</button>
      </div>
    );
}
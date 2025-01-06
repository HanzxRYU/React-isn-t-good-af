import { useState } from "react";

function Calculator() {
    const [count, setCount] = useState(0);

    return (
        <>
       <h1>Counter: {count}</h1>
       <button onClick={() => setCount(count + 1)}>tambah 1</button>
       <button onClick={() => setCount(count - 1)}>kurang 1</button>
       <button onClick={() => setCount(0)}>Reset</button>
        </>
    );
}
export default Calculator;
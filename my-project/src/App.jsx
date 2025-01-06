import { useState } from "react";

function Example() {
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
export default Example;

<>
<h1 className="text-2xl font-bold mt-4 ml-4 ">
  {login ? `Selamat Datang ${name}` : "Silahkan Login"}
</h1>
<button
  onClick={() => setlogin(true)}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
>
  Login
</button>
</>

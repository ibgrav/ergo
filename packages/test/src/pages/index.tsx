import { useState } from "react";

export default function IndexPage() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Hello World change 3</h1>
      <button onClick={() => setCount((c) => c + 1)}>count {count}</button>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";

export function useTest(test: string) {
  const [data, setData] = useState("");
  const a = useMemo(() => data + test, [data, test]);
  const [b, setB] = useState("");
  useEffect(() => {
    setB(a);
  }, [a]);
  return {
    a,
    b,
    setData,
  };
}

export default function App() {
  return <div>this is app</div>;
}

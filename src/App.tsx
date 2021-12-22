import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const TestContext = createContext({
  name: "",
});

export function useTest(test: string) {
  const [data, setData] = useState("");
  const a = useMemo(() => data + test, [data, test]);
  const [b, setB] = useState("");
  useEffect(() => {
    setB(a);
  }, [a]);
  const node = useMemo(() => <div>{b}</div>, [b]);
  const { name } = useContext(TestContext);
  return {
    a,
    b,
    setData,
    node,
    name,
  };
}

export default function App() {
  return <div>this is app</div>;
}

import { renderHook, act } from "@testing-library/react-hooks/dom";
import { useTest, TestContext } from "./App";
import { render } from "@testing-library/react";
import { PropsWithChildren, useState } from "react";

test("初始化，a为空，b为空", () => {
  const { result } = renderHook(() => useTest(""));
  expect(result.current.a).toBe("");
  expect(result.current.b).toBe("");
});

test("设置新的data，保持响应", () => {
  const { result } = renderHook(() => useTest(""));
  act(() => {
    result.current.setData("new data");
  });
  expect(result.current.a).toBe("new data");
  expect(result.current.b).toBe("new data");
});

test("设置新的prop，保持响应", async () => {
  const { result } = renderHook(() =>
    (function useTestHook() {
      const [prop, setProp] = useState("");
      return { ...useTest(prop), setProp };
    })()
  );
  act(() => {
    result.current.setProp("new prop");
  });
  expect(result.current.b).toBe("new prop");
  const currentNode = render(result.current.node);
  const containerB = await currentNode.findByText(result.current.b);
  expect(containerB).toBeTruthy();
});

test("正确响应context", () => {
  const handlers: any = {};
  function Wrapper(props: PropsWithChildren<{}>) {
    const [name, setName] = useState("");
    handlers.setName = setName;
    return (
      <TestContext.Provider value={{ name }}>
        {props.children}
      </TestContext.Provider>
    );
  }
  const { result } = renderHook(() => useTest(""), {
    wrapper: Wrapper,
  });
  expect(result.current.name).toBe("");
  act(() => {
    handlers.setName("new context");
  });
  expect(result.current.name).toBe("new context");
});

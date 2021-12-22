import { renderHook, act } from "@testing-library/react-hooks/dom";
import { useTest } from "./App";

function timeout(n = 1000) {
  return new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, n);
  });
}

const { result } = renderHook(() => useTest(""));
test("初始化，a为空，b为空", async () => {
  expect(result.current.a).toBe("");
  expect(result.current.b).toBe("");
  act(() => {
    result.current.setData("new data");
  });
  expect(result.current.a).toBe("new data");
  expect(result.current.b).toBe("new data");
  result.current.setData("other data");
  await timeout(2000);
  expect(result.current.a).toBe("other data");
  expect(result.current.b).toBe("other data");
});

import { all } from "../src";

const delayedAsync = async (val: any, delay: number) =>
  new Promise((res) => setTimeout(() => res(val), delay));

describe("all", () => {
  it("should return multiple keyed promises as object", async () => {
    const result = await all({
      first: () => Promise.resolve(1),
      second: () => Promise.resolve(2),
    });
    expect(result.first).toBe(1);
    expect(result.second).toBe(2);
  });

  it("should retain object order", async () => {
    const result = await all({
      first: () => delayedAsync(1, 10),
      second: () => Promise.resolve(2),
    });

    expect(Object.keys(result)).toEqual(["first", "second"]);
  });

  it("should fail with error if any promise fails", async () => {
    try {
      await all({
        first: () => Promise.reject("First failed"),
        second: () => Promise.resolve(2),
      });
    } catch (e) {
      expect(e).toBe("First failed");
    }
  });
});

import { getSpinningTheSlot } from "@/utils/spinLogic";

describe("spinLogic", () => {
  it("gives * 2 money", () => {
    const grid = [
      ["A", "B", "C"],
      ["X", "X", "X"],
      ["A", "B", "C"],
    ];
    const result = getSpinningTheSlot(grid, 20, false);
    expect(result.money).toBe(40);
    expect(result.iconWin).toBe(true);
    expect(result.verticalIconWin).toBe(false);
  });
  it("gives * 4 money", () => {
    const grid = [
      ["A", "B", "C"],
      ["A", "A", "A"],
      ["A", "B", "C"],
    ];
    const result = getSpinningTheSlot(grid, 20, false);
    expect(result.money).toBe(80);
    expect(result.iconWin).toBe(true);
    expect(result.verticalIconWin).toBe(true);
  });
});

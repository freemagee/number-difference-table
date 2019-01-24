/* eslint import/no-unresolved: 0 */
import solveSequence from "solveSequence";

const convergentSequence = [1, 4, 9, 16, 25];
const convergentDifferences = [[3, 5, 7, 9], [2, 2, 2]];
const solvedConvergentSequence = {
  isDivergent: false,
  solvedDifferences: [11, 2],
  solvedSequenceValue: 36
};

test("Sequence can be solved", () => {
  expect(
    solveSequence.solve(convergentSequence, convergentDifferences)
  ).toMatchObject(solvedConvergentSequence);
});

const convergentLastValues = [21, 21];
const divergentLastValues = [21];

test("Divergent last values", () => {
  expect(solveSequence.isDivergent(divergentLastValues)).toBe(true);
});

test("Convergent last values", () => {
  expect(solveSequence.isDivergent(convergentLastValues)).toBe(false);
});

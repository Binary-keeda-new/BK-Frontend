export const CHAPTER19_DRAG = [
  {
    instructions: "Order the logical statements to solve 0/1 Knapsack.",
    lines: [
      { id: "1", text: "Iterate over items i from 1 to n" },
      { id: "2", text: "Else, exclude item (dp[i][w] = dp[i-1][w])" },
      { id: "3", text: "Initialize dp[n+1][W+1] with 0s" },
      { id: "4", text: "Iterate over capacities w from 1 to W" },
      { id: "5", text: "If wt[i-1] <= w, take max of including/excluding" }
    ],
    order: ["3", "1", "4", "5", "2"]
  },
  {
    instructions: "Arrange the string backtracking steps to print the LCS.",
    lines: [
      { id: "1", text: "Start at dp[n][m]" },
      { id: "2", text: "Else if dp[i-1][j] > dp[i][j-1], move up" },
      { id: "3", text: "If S1[i-1] == S2[j-1], append char and move diagonally" },
      { id: "4", text: "Else, move left" },
      { id: "5", text: "Reverse the collected characters" }
    ],
    order: ["1", "3", "2", "4", "5"]
  }
];
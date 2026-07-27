export const CHAPTER18_DRAG = [
  {
    instructions: "Order the logic execution for Longest Increasing Subsequence.",
    lines: [
      { id: "1", text: "Initialize dp array with 1s" },
      { id: "2", text: "If arr[i] > arr[j], update dp[i]" },
      { id: "3", text: "Find the maximum value in the entire dp array" },
      { id: "4", text: "Iterate 'i' from 1 to n" },
      { id: "5", text: "Iterate 'j' from 0 to i-1" }
    ],
    order: ["1", "4", "5", "2", "3"]
  },
  {
    instructions: "Arrange the Coin Change (Minimum Coins) algorithm steps.",
    lines: [
      { id: "1", text: "Initialize dp[1..amount] to infinity" },
      { id: "2", text: "Check if dp[amount] is still infinity" },
      { id: "3", text: "Initialize dp[0] = 0" },
      { id: "4", text: "Iterate through each coin value" },
      { id: "5", text: "Update dp[i] = min(dp[i], dp[i-coin] + 1)" }
    ],
    order: ["3", "1", "4", "5", "2"]
  }
];
export const CHAPTER17_MCQ = [
  {
    q: "What is the core principle of a Greedy Algorithm? (GATE 2005)",
    options: ["It makes the locally optimal choice at each stage with the hope of finding a global optimum.", "It breaks the problem into overlapping subproblems and caches their results.", "It explores all possible solutions and picks the best one.", "It works backwards from the destination to the source."],
    ans: 0,
    explanation: "A greedy algorithm always makes the choice that looks best at the current moment, without reconsidering previous choices or looking ahead."
  },
  {
    q: "Which of the following problems can ALWAYS be solved optimally using a Greedy Algorithm? (GATE 2011)",
    options: ["0/1 Knapsack Problem", "Fractional Knapsack Problem", "Traveling Salesman Problem", "Longest Common Subsequence"],
    ans: 1,
    explanation: "The Fractional Knapsack problem can be solved optimally by greedily taking the items with the highest value-to-weight ratio. 0/1 Knapsack requires Dynamic Programming."
  },
  {
    q: "Which graph algorithm uses a greedy approach to find the Minimum Spanning Tree? (GATE 2008)",
    options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm"],
    ans: 2,
    explanation: "Both Kruskal's and Prim's algorithms are greedy algorithms that iteratively pick the lowest-weight edge that doesn't form a cycle (Kruskal) or connects to the tree (Prim)."
  },
  {
    q: "Dijkstra's Algorithm for finding the shortest path from a single source relies on which paradigm?",
    options: ["Dynamic Programming", "Divide and Conquer", "Greedy Algorithm", "Backtracking"],
    ans: 2,
    explanation: "Dijkstra's is a greedy algorithm. At each step, it greedily selects the unvisited node with the smallest known tentative distance from the source."
  },
  {
    q: "Why does the Greedy Approach fail for the 0/1 Knapsack problem? (GATE 2014)",
    options: ["It is too slow (exponential time).", "It may leave empty space in the knapsack, leading to suboptimal total value.", "It requires too much memory.", "It cannot handle negative weights."],
    ans: 1,
    explanation: "Because you cannot take fractions of an item, greedily picking the highest value/weight ratio item might prevent you from taking two slightly less efficient items that together fit perfectly and yield a higher total value."
  },
  {
    q: "In Huffman Coding, how are characters assigned binary codes? (GATE 2007)",
    options: ["Most frequent characters get the longest codes.", "Most frequent characters get the shortest codes.", "All characters get equal length codes.", "Characters are assigned codes in alphabetical order."],
    ans: 1,
    explanation: "Huffman coding is a greedy algorithm that builds a tree where the most frequently occurring characters are placed nearest the root, giving them the shortest binary codes to optimize compression."
  },
  {
    q: "The Activity Selection Problem is a classic greedy problem. How should activities be sorted to find the maximum number of non-overlapping activities?",
    options: ["By start time", "By duration (shortest first)", "By finish time", "By duration (longest first)"],
    ans: 2,
    explanation: "Sorting activities by their finish time and greedily picking the one that finishes earliest maximizes the remaining time for subsequent activities."
  },
  {
    q: "A problem must exhibit which two properties for a Greedy Algorithm to guarantee an optimal solution? (GATE 2015)",
    options: ["Overlapping Subproblems and Optimal Substructure", "Optimal Substructure and Greedy Choice Property", "Greedy Choice Property and Non-overlapping Subproblems", "Optimal Substructure and Memoization"],
    ans: 1,
    explanation: "Optimal Substructure (an optimal solution contains optimal solutions to subproblems) and the Greedy Choice Property (a global optimum can be reached by making a local optimum choice)."
  },
  {
    q: "What is the time complexity of the Fractional Knapsack problem if the items are NOT already sorted? (GATE 2012)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(W) where W is capacity"],
    ans: 1,
    explanation: "The algorithm must first sort the items based on their value/weight ratio, which takes O(n log n) time. The subsequent greedy selection takes O(n) time."
  },
  {
    q: "When a Greedy algorithm fails to find the global optimal solution, what is it usually finding instead?",
    options: ["A compilation error", "An infinite loop", "A local optimum", "A negative cycle"],
    ans: 2,
    explanation: "It gets 'stuck' in a local optimum because it made choices that looked best at the time but painted it into a corner regarding future choices."
  }
];
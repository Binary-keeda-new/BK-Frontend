export const CHAPTER16_CONTENT = {
  title: "Greedy Paradigm",
  description: "Explore the Greedy Programming Paradigm, an approach that builds up a solution piece by piece by always choosing the next piece that offers the most obvious and immediate benefit. You will learn how to identify greedy choice properties and optimal substructures. Enjoy comprehensive walkthroughs of the Fractional Knapsack problem and Huffman Coding.",
  points: [
    {
      heading: "Theory",
      body: "The Greedy Paradigm is an algorithmic strategy that builds up a solution piece by piece, always choosing the next piece that offers the most immediate and obvious benefit. It makes a locally optimal choice in the hope that these local choices will lead to a globally optimal solution for the entire problem. It never reconsiders its past choices."
    },
    {
      heading: "Greedy Choice Property",
      body: "A problem has the **Greedy Choice Property** if a globally optimal solution can be arrived at by making a locally optimal (greedy) choice. This is the first critical requirement for a greedy algorithm to work. When considering the next step, we only look at the current state, without worrying about the future or past consequences. If this short-sighted approach still guarantees the best possible final outcome, the property holds."
    },
    {
      heading: "Optimal Substructure",
      body: "A problem exhibits **Optimal Substructure** if an optimal solution to the entire problem contains within it optimal solutions to the sub-problems. If we make a greedy choice, we are left with one sub-problem to solve. For the greedy algorithm to be correct, the optimal solution to the overall problem must be formed by combining the greedy choice with the optimal solution of the remaining sub-problem."
    },
    {
      heading: "Exchange Argument",
      body: "The **Exchange Argument** is a powerful mathematical technique used to prove that a greedy algorithm produces an optimal solution. The proof strategy assumes there is some hypothetical optimal solution that is *different* from the greedy solution. We then show that we can swap (exchange) elements in the hypothetical optimal solution with the elements chosen by our greedy algorithm without worsening the overall result. By repeatedly doing this, we transform the hypothetical optimal solution into our greedy solution, proving the greedy solution is indeed optimal."
    },
    {
      heading: "Proof of Correctness",
      body: "Unlike Dynamic Programming, greedy algorithms are often very easy to invent and code, but notoriously difficult to prove correct. A greedy algorithm that intuitively looks correct might fail on specific edge cases. Proving correctness requires rigorously verifying both the Greedy Choice Property and Optimal Substructure, usually utilizing techniques like induction or the Exchange Argument."
    },
    {
      heading: "Classic Problems",
      body: "There are several standard problems where the Greedy approach perfectly applies, often reducing $O(2^n)$ brute-force solutions to $O(n \\log n)$ or $O(n)$ time. These serve as fundamental templates for recognizing the greedy choice property."
    },
    {
      heading: "Activity Selection",
      body: "In the Activity Selection Problem, you are given $n$ activities with their start and finish times. You must select the maximum number of non-overlapping activities. \n**Greedy Choice:** Always select the next possible activity that finishes *earliest*. This leaves the maximum possible free time for remaining activities. Sorting by finish time takes $O(n \\log n)$, and the greedy selection takes $O(n)$."
    },
    {
      heading: "Fractional Knapsack",
      body: "Given a knapsack of capacity $W$ and $n$ items, each with a weight and a value, you want to maximize the total value in the knapsack. Unlike the 0/1 variant, you can break items into fractions.\n**Greedy Choice:** Calculate the value-to-weight ratio for each item. Always take as much as possible of the item with the highest ratio. This intuitively guarantees the most value per unit of weight."
    },
    {
      heading: "Job Sequencing with Deadline",
      body: "You are given a set of jobs, each with a deadline and a profit. A job takes 1 unit of time to complete. You want to maximize total profit.\n**Greedy Choice:** Sort jobs in descending order of profit. For each job, try to schedule it in the latest possible available time slot before its deadline. This ensures the highest paying jobs are prioritized while keeping early slots open for other jobs."
    },
    {
      heading: "Huffman Coding",
      body: "Huffman Coding is a lossless data compression algorithm. It assigns variable-length codes to characters based on their frequencies; more frequent characters get shorter codes.\n**Greedy Choice:** At each step, take the two characters (or merged nodes) with the absolute *lowest* frequencies and merge them into a new node. This creates a strictly optimal prefix tree for data compression."
    }
  ],
  code: "// Activity Selection (Greedy) in C\n#include <stdio.h>\n\n// Assuming arrays are already sorted by finish time\nvoid printMaxActivities(int s[], int f[], int n) {\n    int i = 0;\n    printf(\"Selected Activities: %d \", i);\n\n    for (int j = 1; j < n; j++) {\n        // If this activity starts after or when the previous one finished\n        if (s[j] >= f[i]) {\n            printf(\"%d \", j);\n            i = j; // Update current activity\n        }\n    }\n}\n"
};
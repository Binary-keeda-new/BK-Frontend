export const dcIntroContent = [
  {
    title: "1. Introduction",
    content: "Divide and Conquer is an algorithmic paradigm that solves a problem by breaking it down into two or more smaller sub-problems of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems are then combined to give a solution to the original problem."
  },
  {
    title: "2. The Three Steps",
    content: "The Divide and Conquer strategy involves three distinct steps at each level of recursion:\n1. **Divide:** Break the given problem into sub-problems of the same type.\n2. **Conquer:** Recursively solve these sub-problems. If the sub-problem size is small enough (the base case), just solve it in a straightforward manner.\n3. **Combine:** Appropriately combine the answers of the sub-problems to form the solution to the original problem."
  },
  {
    title: "3. Recurrence Relations",
    content: "The running time of a divide and conquer algorithm is naturally expressed as a Recurrence Relation. A recurrence relation is an equation that defines a sequence based on a rule that gives the next term as a function of the previous term(s). For a D&C algorithm, it usually takes the form:\n$T(n) = aT(n/b) + f(n)$\nWhere:\n- $n$ is the size of the problem.\n- $a$ is the number of sub-problems in the recursion.\n- $n/b$ is the size of each sub-problem.\n- $f(n)$ is the cost of the work done outside the recursive calls, which includes the cost of dividing the problem and combining the solutions."
  },
  {
    title: "4. Master's Theorem",
    content: "The Master's Theorem is a direct mathematical formula used to easily calculate the time complexity of divide-and-conquer recurrence relations of the form $T(n) = aT(n/b) + O(n^k)$.\n\nThere are three cases based on comparing $a$ with $b^k$:\n**Case 1:** If $a > b^k$, then $T(n) = O(n^{\\log_b a})$\n**Case 2:** If $a = b^k$, then $T(n) = O(n^k \\log n)$\n**Case 3:** If $a < b^k$, then $T(n) = O(n^k)$"
  },
  {
    title: "5. Solving Merge Sort with Master's Theorem",
    content: "Let's find the time complexity of Merge Sort.\n- Recurrence: $T(n) = 2T(n/2) + O(n)$\n- Here, $a = 2$, $b = 2$, and $f(n) = O(n^1)$, so $k = 1$.\n- Compare $a$ and $b^k$: $2 = 2^1$.\n- Since $a = b^k$, this falls into **Case 2**.\n- Therefore, $T(n) = O(n^1 \\log n) = O(n \\log n)$."
  },
  {
    title: "6. Examples of Divide & Conquer",
    content: "Many famous algorithms use this paradigm:\n- **Sorting:** Merge Sort, Quick Sort.\n- **Searching:** Binary Search.\n- **Math/Matrices:** Karatsuba's Fast Multiplication, Strassen's Matrix Multiplication.\n- **Geometry:** Closest Pair of Points, Convex Hull.\n- **Dynamic Programming (indirectly):** D&C is the foundation for DP, although DP adds memoization to avoid recomputing overlapping subproblems."
  },
  {
    title: "7. Time & Space Complexity",
    content: "- **Time Complexity:** Depends heavily on the recurrence relation. Well-balanced trees (like Merge Sort) perform optimally ($O(n \\log n)$). Poorly balanced division (like worst-case Quick Sort) degenerates to $O(n^2)$.\n- **Space Complexity:** All D&C algorithms use the system call stack due to recursion. If the recursion tree has a depth of $O(\\log n)$, the space complexity is at least $O(\\log n)$ even if the algorithm is in-place."
  },
  {
    title: "8. Advantages",
    content: "- Solves difficult problems conceptually easily by breaking them down.\n- Can utilize multiprocessing easily since independent subproblems can be solved in parallel on different CPU cores.\n- Often results in highly efficient algorithms (e.g., $O(n \\log n)$ vs $O(n^2)$ sorting)."
  },
  {
    title: "9. Disadvantages",
    content: "- Recursive calls consume call stack memory, risking StackOverflow errors on extremely large inputs.\n- Function call overhead (time spent pushing/popping frames) can make D&C slower than simple iterative approaches for very small $n$.\n- Sometimes it repeats work if subproblems overlap (this is where Dynamic Programming steps in to fix it)."
  },
  {
    title: "10. Iterative vs Recursive",
    content: "Divide and Conquer is inherently designed recursively. While it is mathematically possible to convert any recursive algorithm into an iterative one using an explicit Stack data structure, it is often far more complex to write and harder to read. Therefore, D&C algorithms are almost universally implemented recursively."
  },
  {
    title: "11. Interview Questions",
    content: "1. State the Master's Theorem and its three cases.\n2. How is Divide and Conquer different from Dynamic Programming?\n3. Find the time complexity of Binary Search using Master's Theorem.\n4. Why might a Divide and Conquer algorithm run slower than an iterative $O(n^2)$ algorithm for very small arrays?"
  }
];

export const dcIntroMcqs = [
  {
    q: "In the Divide and Conquer strategy, what does the 'Conquer' step entail?",
    options: ["Breaking the problem into subproblems.", "Recursively solving the subproblems.", "Combining the results of subproblems.", "Optimizing the algorithm using memory."],
    ans: 1,
    explanation: "The 'Conquer' step specifically refers to solving the subproblems recursively. If they are small enough, it solves them directly (base case)."
  },
  {
    q: "Which of the following sorting algorithms does NOT strictly follow the standard Divide and Conquer paradigm?",
    options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Heap Sort"],
    ans: 2,
    explanation: "Insertion sort is an iterative, incremental approach. While Heap Sort uses a tree, it isn't splitting the array into smaller recursive subproblems in the same way. However, Insertion Sort is the most definitive 'No'. Heap Sort is generally considered an advanced selection sort using a data structure."
  },
  {
    q: "Using Master's Theorem on T(n) = 4T(n/2) + O(n), what is the time complexity?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(n^3)"],
    ans: 2,
    explanation: "Here a=4, b=2, k=1. Since 4 > 2^1, this is Case 1. The complexity is O(n^(log_2(4))) = O(n^2)."
  },
  {
    q: "What is a major disadvantage of Divide and Conquer algorithms?",
    options: ["They cannot be parallelized.", "They often result in O(n^2) average time.", "They require significant recursive call stack memory.", "They only work on sorted arrays."],
    ans: 2,
    explanation: "Because they are inherently recursive, they consume memory on the call stack proportional to the depth of the recursion tree, which can lead to Stack Overflow."
  },
  {
    q: "Which algorithm design technique solves the issue of Divide and Conquer repeating identical subproblems?",
    options: ["Greedy Algorithms", "Backtracking", "Dynamic Programming", "Branch and Bound"],
    ans: 2,
    explanation: "Dynamic Programming specifically addresses overlapping subproblems by storing (memoizing) their results so they are only calculated once."
  }
];

export const dcIntroDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const dcIntroDrag = {
  instructions: "Match the steps of Divide and Conquer to their descriptions.",
  lines: [
    { id: "1", text: "Divide" },
    { id: "2", text: "Conquer" },
    { id: "3", text: "Combine" },
    { id: "4", text: "Break the problem into smaller subproblems." },
    { id: "5", text: "Solve subproblems recursively." },
    { id: "6", text: "Merge the subproblem results into the final answer." }
  ],
  order: ["1", "4", "2", "5", "3", "6"]
};

export const dcIntroComplete = {
  instruction: "Fill in the parameters for the Master's Theorem equation: T(n) = aT(n/b) + f(n)",
  template: `In the recurrence relation T(n) = aT(n/b) + f(n):
- 'a' represents the number of ___1___.
- 'n/b' represents the ___2___ of each subproblem.
- 'f(n)' represents the cost of ___3___ the problem and combining results.`,
  answer: `In the recurrence relation T(n) = aT(n/b) + f(n):
- 'a' represents the number of subproblems.
- 'n/b' represents the size of each subproblem.
- 'f(n)' represents the cost of dividing the problem and combining results.`,
  blanks: ["subproblems", "size", "dividing"]
};

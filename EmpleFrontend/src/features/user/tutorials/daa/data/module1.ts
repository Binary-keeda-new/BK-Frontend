import { ChapterContent, MCQQuestion, DebugExercise, DragExercise, CompleteExercise } from "./daaTutorial";

export const module1Content: ChapterContent = {
  title: "Module 1: Introduction to DAA",
  description: "Fundamentals of Design and Analysis of Algorithms, focusing on time and space complexity, asymptotic notations, and basics of algorithms.",
  code: `// Introduction to Algorithm Analysis
// Example: Calculating sum of n numbers

#include <stdio.h>

int sum(int n) {
    int s = 0; // 1 unit of time
    for (int i = 1; i <= n; i++) { // n units of time
        s = s + i; // n units of time
    }
    return s; // 1 unit of time
}
// Total Time Complexity: O(n)
`,
  points: [
    {
      heading: "1. Introduction",
      body: "An **Algorithm** is a step-by-step procedure or a set of rules to solve a specific problem. **Design and Analysis of Algorithms (DAA)** is the study of how to design efficient algorithms and analyze their performance in terms of time (speed) and space (memory)."
    },
    {
      heading: "2. Problem Statement",
      body: "We often have multiple ways (algorithms) to solve the same problem (e.g., sorting a list). The problem is to identify which algorithm is the 'best' or most efficient for a given scenario."
    },
    {
      heading: "3. Theory & Working",
      body: "Algorithm analysis involves estimating the resources required by an algorithm to solve a specific computational problem. The primary resources analyzed are **Time** (CPU cycles) and **Space** (RAM).\n\n**Basics of Algorithms:**\n- **Finiteness:** Must terminate after a finite number of steps.\n- **Definiteness:** Each step must be rigorously and unambiguously defined.\n- **Input:** Zero or more inputs.\n- **Output:** One or more outputs.\n- **Effectiveness:** Basic enough to be done exactly and in a finite length of time."
    },
    {
      heading: "4. Step-by-Step Dry Run",
      body: "Let's analyze a simple loop:\n```c\nfor(int i=0; i<n; i++) {\n  print(i);\n}\n```\n1. `i = 0` (Initialization: 1 step)\n2. `i < n` (Condition checked `n+1` times)\n3. `print(i)` (Executed `n` times)\n4. `i++` (Executed `n` times)\nTotal steps proportional to `n`. Hence, time grows linearly with `n`."
    },
    {
      heading: "5. Pseudocode",
      body: "```text\nAlgorithm Sum(n)\n  s = 0\n  for i = 1 to n do\n    s = s + i\n  return s\nEnd Algorithm\n```"
    },
    {
      heading: "6. C Implementation",
      body: "C code to demonstrate execution time measurement:\n```c\n#include <stdio.h>\n#include <time.h>\n\nint main() {\n    clock_t start = clock();\n    int n = 1000000, sum = 0;\n    for(int i=1; i<=n; i++) sum += i;\n    clock_t end = clock();\n    double time_spent = (double)(end - start) / CLOCKS_PER_SEC;\n    printf(\"Time: %f\", time_spent);\n    return 0;\n}\n```"
    },
    {
      heading: "7. Java Implementation",
      body: "Java code to demonstrate execution time:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        long start = System.nanoTime();\n        int n = 1000000, sum = 0;\n        for(int i=1; i<=n; i++) sum += i;\n        long end = System.nanoTime();\n        System.out.println(\"Time (ns): \" + (end - start));\n    }\n}\n```"
    },
    {
      heading: "8. Time & Space Complexity",
      body: "### Time Complexity\nThe amount of time an algorithm takes to run as a function of the input length.\n### Space Complexity\nThe amount of memory an algorithm takes as a function of the input length (Auxiliary Space + Input Space).\n\n**Asymptotic Notations:**\n1. **Big O (O):** Upper bound (Worst Case).\n2. **Omega (Ω):** Lower bound (Best Case).\n3. **Theta (Θ):** Tight bound (Average/Exact Case)."
    },
    {
      heading: "9. Advantages & Disadvantages",
      body: "**Advantages of Asymptotic Analysis:**\n- Machine and language independent.\n- Focuses on the growth rate of algorithms for large inputs.\n\n**Disadvantages:**\n- Ignores constant factors (e.g., $O(n)$ might be slower than $O(n^2)$ for very small $n$)."
    },
    {
      heading: "10. Applications",
      body: "- Comparing multiple solutions to the same problem without writing actual code.\n- Resource estimation before software development (preventing OutOfMemory exceptions or timeout errors)."
    },
    {
      heading: "11. Interview Questions",
      body: "1. What is the difference between Performance Analysis and Performance Measurement?\n2. Explain Big O notation with a graph.\n3. Why do we usually ignore lower order terms and constants in Time Complexity?\n4. Differentiate between Best, Worst, and Average cases."
    },
    {
      heading: "12. Coding Practice (Easy, Medium & Hard)",
      body: "- **Easy:** Write a function and determine if it runs in O(1) or O(n).\n- **Medium:** Given nested loops, mathematically derive the Exact polynomial time complexity.\n- **Hard:** Formulate a recurrence relation for a recursive function and solve it using Master's Theorem."
    },
    {
      heading: "13. Common Mistakes",
      body: "- Confusing Worst Case with Big-O. (Big-O is an upper bound notation, it can be applied to best case as well, e.g., Best case of Insertion Sort is O(n)).\n- Forgetting to account for the space used by the Call Stack in recursive functions (Space Complexity)."
    },
    {
      heading: "14. Related Algorithms",
      body: "These concepts apply universally to ALL algorithms discussed in the subsequent modules (Searching, Sorting, Graph, DP, etc.)."
    },
    {
      heading: "15. Quiz (MCQs)",
      body: "Move to the **Quiz** tab to practice 15 rigorous MCQs on Asymptotic Notations and Complexity Analysis!"
    },
    {
      heading: "16. Summary",
      body: "Design and Analysis of Algorithms is the foundation of computer science problem solving. By utilizing asymptotic notations ($O$, $Ω$, $Θ$) and understanding best, worst, and average cases, developers can objectively evaluate and compare the scalability of algorithms independent of hardware constraints."
    }
  ]
};

export const module1Mcqs: MCQQuestion[] = [
  {
    q: "Which asymptotic notation is used to represent the upper bound of an algorithm's running time?",
    options: ["Big-Omega (Ω)", "Big-Theta (Θ)", "Big-O (O)", "Small-o (o)"],
    ans: 2,
    explanation: "Big-O notation gives an upper bound on the growth rate of a function, representing the worst-case scenario."
  },
  {
    q: "If an algorithm's time complexity is given by T(n) = 3n^2 + 5n + 10, what is its Big-O notation?",
    options: ["O(n)", "O(n^2)", "O(n^3)", "O(1)"],
    ans: 1,
    explanation: "In Big-O notation, we drop the constants and lower-order terms. The dominant term is n^2, so the complexity is O(n^2)."
  },
  {
    q: "What does the space complexity of an algorithm measure?",
    options: ["Only the size of the input data", "The amount of memory required by the algorithm to execute completely", "The disk space occupied by the source code", "The time it takes to compile the program"],
    ans: 1,
    explanation: "Space complexity is the total amount of memory required by an algorithm to execute, which includes both the input size and the auxiliary (extra) space."
  },
  {
    q: "Which case of an algorithm defines the maximum time required to solve a problem of size n?",
    options: ["Best case", "Average case", "Worst case", "Base case"],
    ans: 2,
    explanation: "The worst-case complexity provides an upper bound on the running time, indicating the maximum time the algorithm will ever take for an input of size n."
  },
  {
    q: "What is the time complexity of accessing an element in an array using its index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    ans: 2,
    explanation: "Array elements are stored in contiguous memory locations, so accessing an element by index takes constant time, O(1)."
  },
  {
    q: "Which notation defines the tight bound (both upper and lower bounds) of an algorithm's time complexity?",
    options: ["Big-O (O)", "Big-Omega (Ω)", "Big-Theta (Θ)", "Little-omega (ω)"],
    ans: 2,
    explanation: "Big-Theta (Θ) provides a tight bound, meaning the function grows at the exact same rate as the bound."
  },
  {
    q: "In complexity analysis, which of the following time complexities is considered the most efficient?",
    options: ["O(n log n)", "O(n)", "O(1)", "O(log n)"],
    ans: 2,
    explanation: "O(1) represents constant time complexity, meaning the execution time does not depend on the input size, making it the most efficient."
  },
  {
    q: "What is the time complexity of a loop that runs from i=1 to n, where i doubles in each iteration (i = i * 2)?",
    options: ["O(n)", "O(n/2)", "O(log n)", "O(n^2)"],
    ans: 2,
    explanation: "Since the loop variable doubles each time, it takes log base 2 of n steps to reach n. Hence, the complexity is O(log n)."
  },
  {
    q: "If algorithm A has time complexity O(n^3) and algorithm B has O(2^n), which is faster for very large values of n?",
    options: ["Algorithm A", "Algorithm B", "Both are equally fast", "Depends on the programming language"],
    ans: 0,
    explanation: "Polynomial time O(n^3) grows much slower than exponential time O(2^n) as n becomes very large. Thus, Algorithm A is faster."
  },
  {
    q: "Which of the following is NOT a characteristic of a good algorithm?",
    options: ["Finiteness", "Definiteness", "Ambiguity", "Effectiveness"],
    ans: 2,
    explanation: "An algorithm must be unambiguous (definiteness). Ambiguity means instructions are not clear, which violates the core definition of an algorithm."
  },
  {
    q: "What is Auxiliary Space?",
    options: ["Total memory taken by the program including input", "Extra or temporary memory used by the algorithm", "Memory used by the operating system", "Memory used to store the compiled binary"],
    ans: 1,
    explanation: "Auxiliary space is the temporary or extra space used by an algorithm during its execution, excluding the space taken by the inputs."
  },
  {
    q: "For a linear search algorithm, what is the best-case time complexity?",
    options: ["O(n)", "O(n/2)", "O(log n)", "O(1)"],
    ans: 3,
    explanation: "The best case for linear search occurs when the target element is found at the very first index, which takes O(1) time."
  },
  {
    q: "If an algorithm requires O(n) auxiliary space, and the input takes O(n) space, what is the total Space Complexity?",
    options: ["O(1)", "O(n)", "O(2n)", "O(n^2)"],
    ans: 1,
    explanation: "Total Space Complexity = Input Space + Auxiliary Space = O(n) + O(n) = O(2n), which simplifies to O(n) in asymptotic notation."
  },
  {
    q: "What does Big-Omega (Ω) notation denote?",
    options: ["The worst-case scenario", "The best-case scenario (Lower bound)", "The exact bound", "The space complexity only"],
    ans: 1,
    explanation: "Big-Omega (Ω) describes the asymptotic lower bound, providing a guarantee on the minimum amount of time an algorithm will take."
  },
  {
    q: "Which analysis depends entirely on the hardware, OS, and compiler?",
    options: ["Asymptotic Analysis", "A Priori Analysis", "A Posteriori Analysis", "Complexity Analysis"],
    ans: 2,
    explanation: "A Posteriori Analysis (Performance Measurement) is done after the algorithm is implemented and executed, hence it depends on the hardware and software environment."
  }
];

export const module1Debug: DebugExercise = {
  instructions: "Fix the loop logic so that it calculates the sum of the first N natural numbers accurately in O(n) time.",
  buggy: `int calculateSum(int n) {
    int sum = 0;
    // Bug: loop condition and update
    for(int i = 0; i < n; i--) {
        sum += i;
    }
    return sum;
}`,
  fixed: `int calculateSum(int n) {
    int sum = 0;
    for(int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}`,
  hints: ["Look at the loop condition (i < n). Should it include n?", "Look at the loop increment/decrement step."],
  expectedOutput: "Sum for n=5 should be 15"
};

export const module1Drag: DragExercise = {
  instructions: "Arrange the asymptotic notations in order of their typical growth rate from slowest (best) to fastest (worst).",
  lines: [
    { id: "1", text: "O(1)" },
    { id: "2", text: "O(log n)" },
    { id: "3", text: "O(n)" },
    { id: "4", text: "O(n log n)" },
    { id: "5", text: "O(n^2)" },
    { id: "6", text: "O(2^n)" }
  ],
  order: ["1", "2", "3", "4", "5", "6"]
};

export const module1Complete: CompleteExercise = {
  instruction: "Fill in the blanks to complete the definition of asymptotic notations.",
  template: "Big O defines the /*[BLANK]*/ bound, Big Omega defines the /*[BLANK]*/ bound, and Big Theta defines the /*[BLANK]*/ bound.",
  blanks: ["upper", "lower", "tight"],
  answer: "Big O defines the upper bound, Big Omega defines the lower bound, and Big Theta defines the tight bound."
};


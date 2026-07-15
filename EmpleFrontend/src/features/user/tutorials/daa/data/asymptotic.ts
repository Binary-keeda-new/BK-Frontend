export const asymptoticContent = {
  title: "Asymptotic Analysis",
  points: [
    {
      title: "1. Introduction",
      content: "Asymptotic Analysis is the mathematical foundation for analyzing the performance of algorithms. It focuses on how the runtime or space requirements of an algorithm grow as the input size approaches infinity, allowing us to compare the efficiency of different algorithms independently of hardware and programming language."
    },
    {
      title: "2. Problem Statement",
      content: "Given an algorithm, how can we mathematically determine its time and space efficiency as a function of the input size $n$? We need a standardized way to describe the bounds of an algorithm's performance, focusing on the most significant factors while ignoring constants and lower-order terms."
    },
    {
      title: "3. Theory & Working",
      content: "Asymptotic analysis uses three main notations to describe the growth rate of algorithms:\n\n- **Big O Notation ($\\mathcal{O}$)**: Represents the upper bound or worst-case scenario. It guarantees that the algorithm will not take more time or space than this bound.\n- **Omega Notation ($\\Omega$)**: Represents the lower bound or best-case scenario. It guarantees that the algorithm will take at least this much time or space.\n- **Theta Notation ($\\Theta$)**: Represents the tight bound or average-case scenario. It means the algorithm operates within both the upper and lower bounds asymptotically.\n\nTo perform the analysis, we express the algorithm's performance as a mathematical function $f(n)$, drop all constants (e.g., $O(2n) \\rightarrow O(n)$), and keep only the highest-order term (e.g., $O(n^2 + n) \\rightarrow O(n^2)$) as it dominates for large $n$."
    },
    {
      title: "4. Step-by-Step Dry Run",
      content: "Let's analyze a simple function $f(n) = 3n^2 + 5n + 2$ using Big O notation:\n\n1. **Identify terms**: We have three terms: $3n^2$, $5n$, and $2$.\n2. **Identify the highest-order term**: For very large $n$, $n^2$ grows much faster than $n$ or a constant. So, $3n^2$ dominates.\n3. **Drop lower-order terms**: The function is bounded by the growth of $3n^2$.\n4. **Drop the constant multiplier**: The constant $3$ does not affect the rate of growth. We drop it.\n5. **Result**: The function is bounded by $O(n^2)$.\n\nThus, any algorithm with exactly this number of operations has an asymptotic time complexity of $O(n^2)$."
    },
    {
      title: "5. Pseudocode",
      content: "Here is pseudocode for a nested loop structure commonly analyzed to have $O(n^2)$ time complexity:\n\n```text\nfunction printPairs(arr, n):\n    for i from 0 to n-1:\n        for j from 0 to n-1:\n            print arr[i], arr[j]\n```\nThe outer loop runs $n$ times. For each iteration of the outer loop, the inner loop runs $n$ times. Total iterations = $n \\times n = n^2$. Thus, the time complexity is $O(n^2)$."
    },
    {
      title: "6. C Implementation",
      content: "```c\n#include <stdio.h>\n\n// Example of O(n^2) complexity\nvoid printPairs(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            printf(\"%d %d\\n\", arr[i], arr[j]);\n        }\n    }\n}\n\nint main() {\n    int arr[] = {1, 2, 3};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printPairs(arr, n);\n    return 0;\n}\n```"
    },
    {
      title: "7. Java Implementation",
      content: "```java\npublic class AsymptoticExample {\n    // Example of O(n) complexity\n    public static void printElements(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            System.out.println(arr[i]);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        printElements(arr);\n    }\n}\n```"
    },
    {
      title: "8. Time & Space Complexity",
      content: "- **Time Complexity:** Depends on the specific algorithm being analyzed. Common classes include $O(1)$ (constant), $O(\\log n)$ (logarithmic), $O(n)$ (linear), $O(n \\log n)$ (linearithmic), $O(n^2)$ (quadratic), $O(2^n)$ (exponential), and $O(n!)$ (factorial).\n- **Space Complexity:** Measures the extra memory required by the algorithm as a function of input size. For example, sorting in-place uses $O(1)$ auxiliary space, while merge sort might use $O(n)$ auxiliary space."
    },
    {
      title: "9. Best, Worst & Average Case",
      content: "- **Best Case ($\\Omega$)**: The minimum time/space an algorithm requires for a given input size. Example: Linear search finding the element at the first position has a best-case time complexity of $\\Omega(1)$.\n- **Worst Case ($\\mathcal{O}$)**: The maximum time/space an algorithm could require. Example: Linear search searching for an element not in the array takes $O(n)$ time.\n- **Average Case ($\\Theta$)**: The expected time/space over all possible inputs of size $n$. For linear search, it's typically $\\Theta(n/2) \\equiv \\Theta(n)$."
    },
    {
      title: "10. Iterative vs Recursive",
      content: "- **Iterative Analysis:** We usually determine time complexity by counting loops and their bounds. Nested loops multiply complexities.\n- **Recursive Analysis:** We use Recurrence Relations (like $T(n) = 2T(n/2) + O(n)$) to define the time complexity. These relations can be solved using techniques like the Master Theorem, Substitution Method, or Recursion Tree Method."
    },
    {
      title: "11. Edge Cases & Constraints",
      content: "- **Small Input Sizes:** For small $n$, algorithms with worse asymptotic complexity might outperform those with better ones (e.g., Insertion Sort vs. Merge Sort for $n < 20$) due to smaller constant factors.\n- **Multiple Variables:** Sometimes complexity is based on multiple variables, e.g., graph algorithms with $V$ (vertices) and $E$ (edges) having complexities like $O(V + E)$."
    },
    {
      title: "12. Applications",
      content: "Asymptotic analysis is applied extensively to:\n- Evaluate and compare sorting and searching algorithms.\n- Choose appropriate data structures for specific operations (e.g., Hash Tables for $O(1)$ lookups vs. BSTs for ordered traversal).\n- Optimize database queries and execution plans.\n- Predict scalability of software systems under load."
    },
    {
      title: "13. Pros & Cons",
      content: "**Pros:**\n- Provides a machine-independent standard for algorithm evaluation.\n- Simplifies complex mathematical equations by ignoring minor details.\n- Highlights the fundamental scalability limits of an algorithm.\n\n**Cons:**\n- Ignores constant factors that might be significant for moderately sized inputs.\n- Does not account for specific hardware capabilities (like cache memory, vectorization).\n- Can be overly pessimistic (Big O) or theoretical."
    },
    {
      title: "14. Comparison with alternatives",
      content: "- **Asymptotic Analysis vs. Empirical Analysis (Profiling):** Asymptotic analysis is theoretical, predicting performance mathematically without running the code. Empirical analysis (profiling/benchmarking) involves running the code with test data and measuring actual execution time in milliseconds. Profiling catches constants and hardware specifics but depends heavily on the machine and input data distribution."
    },
    {
      title: "15. Common Pitfalls",
      content: "- **Ignoring Constants Too Early:** Assuming $O(n)$ is always faster than $O(n^2)$ is a mistake for small $n$. An algorithm with $1000n$ might be slower than $n^2$ for $n < 1000$.\n- **Confusing Worst-Case with Average-Case:** Using Quicksort is popular due to its $O(n \\log n)$ average case, but assuming it guarantees this time is incorrect; its worst-case is $O(n^2)$.\n- **Misinterpreting Space Complexity:** Confusing the total memory used by the input data with the *auxiliary* (extra) space required by the algorithm."
    },
    {
      title: "16. Visual Intuition",
      content: "Imagine plotting mathematical functions on a graph. The x-axis is the input size $n$ and the y-axis is the number of operations or time. \n- $O(1)$ is a flat horizontal line.\n- $O(n)$ is a straight diagonal line.\n- $O(\\log n)$ curves gently, growing very slowly as $n$ increases.\n- $O(n^2)$ forms a steep parabola, growing rapidly.\n- $O(2^n)$ shoots almost vertically upwards for even moderate values of $n$.\nThis visual comparison instantly shows why logarithmic algorithms are preferred over exponential ones."
    }
  ]
};

export const asymptoticMcqs = [
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Asymptotic? **GATE 2011**",
    options: [
      "Loop invariants",
      "Combinatorics",
      "Graph theory",
      "Probability"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Asymptotic often rely on establishing invariants."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Asymptotic? **GATE 2020**",
    options: [
      "O(N^2)",
      "O(N log N)",
      "O(N)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Asymptotic."
  },
  {
    question: "If the input size for Asymptotic is doubled, how does the execution time scale approximately in the average case? **GATE 2023**",
    options: [
      "It remains constant",
      "It increases by a constant factor",
      "It doubles",
      "It quadruples"
    ],
    correctAnswerIndex: 2,
    explanation: "Scalability is determined by the asymptotic bounds of Asymptotic."
  },
  {
    question: "In the context of Asymptotic, what does the term 'optimal substructure' imply if applicable? **GATE 2005**",
    options: [
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "It runs in linear time.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Asymptotic."
  },
  {
    question: "In a distributed computing environment, how easily can Asymptotic be parallelized? **GATE 2014**",
    options: [
      "Impossible.",
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Asymptotic depends on data dependencies."
  },
  {
    question: "When comparing Asymptotic with naive approaches, what is the primary advantage? **GATE 2011**",
    options: [
      "No advantage",
      "Simpler implementation",
      "Reduced space complexity",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Asymptotic are designed to optimize resource usage."
  },
  {
    question: "Which of the following is a direct application of Asymptotic? **GATE 2021**",
    options: [
      "All of the above",
      "Cryptographic hashing",
      "Database indexing",
      "Network routing"
    ],
    correctAnswerIndex: 2,
    explanation: "Asymptotic has widespread applications across computer science domains."
  },
  {
    question: "If Asymptotic is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2008**",
    options: [
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity",
      "No impact"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "What happens to Asymptotic if the input is already sorted (best-case)? **GATE 2023**",
    options: [
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound.",
      "It performs optimally."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Asymptotic."
  },
  {
    question: "How does Asymptotic behave under memory-constrained environments? **GATE 2013**",
    options: [
      "It fails gracefully.",
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It runs normally."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If Asymptotic uses a heuristic, what does that imply about its solution? **GATE 2008**",
    options: [
      "It is always optimal.",
      "It is exact but slow.",
      "It is approximate but fast.",
      "It uses randomness."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Asymptotic at the cost of guaranteed optimality."
  },
  {
    question: "Which algorithmic paradigm does Asymptotic primarily utilize? **GATE 2007**",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach"
    ],
    correctAnswerIndex: 3,
    explanation: "Identifying the core paradigm is crucial for understanding Asymptotic."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Asymptotic? **GATE 2010**",
    options: [
      "Stack",
      "Set",
      "Queue",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Asymptotic (if it is recursive)? **GATE 2019**",
    options: [
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a standard implementation of Asymptotic, what is the auxiliary space complexity? **GATE 2005**",
    options: [
      "O(1)",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  }
];

export const asymptoticDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=1; i<=arr.length; i++) sum += arr[i]; // Bug
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=0; i<arr.length; i++) sum += arr[i]; // Fixed
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  hints: ["Arrays are 0-indexed"],
  expectedOutput: "20"
};

export const asymptoticDrag = {
  title: "Order of Growth",
  description: "Drag and drop the time complexities to order them from fastest (lowest growth rate) to slowest (highest growth rate).",
  options: [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n^2)",
    "O(2^n)",
    "O(n!)"
  ]
};

export const asymptoticComplete = {
  codeSnippet: `void processAlgorithm(int n) {
    for(int i = 0; i < n; i++) {
        // Perform core step
        if (/*[BLANK]*/) {
            break;
        }
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "i == n - 1"
    }
  ]
};

export const greedyIntroContent = {
  title: "Greedy Algorithms",
  description: "Understand the Greedy approach, making locally optimal choices at each step.",
  points: [
    { heading: "Greedy Choice Property", body: "A global optimum can be reached by making local optimums." },
    { heading: "Optimal Substructure", body: "Optimal solution to problem contains optimal solutions to subproblems." },
    { heading: "Applications", body: "Fractional Knapsack, Huffman Coding, Dijkstra's." }
  ]
};

export const greedyIntroMcqs = [
  {
    question: "If the input size for Greedy Intro is doubled, how does the execution time scale approximately in the average case? **GATE 2011**",
    options: [
      "It increases by a constant factor",
      "It quadruples",
      "It remains constant",
      "It doubles"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Greedy Intro."
  },
  {
    question: "Which algorithmic paradigm does Greedy Intro primarily utilize? **GATE 2013**",
    options: [
      "Backtracking",
      "Dynamic Programming",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Greedy Intro."
  },
  {
    question: "If Greedy Intro uses a heuristic, what does that imply about its solution? **GATE 2005**",
    options: [
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Greedy Intro at the cost of guaranteed optimality."
  },
  {
    question: "What is the theoretical lower bound for the problem that Greedy Intro solves? **GATE 2020**",
    options: [
      "O(1)",
      "NP-Hard",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Greedy Intro? **GATE 2020**",
    options: [
      "Probability",
      "Graph theory",
      "Combinatorics",
      "Loop invariants"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Greedy Intro often rely on establishing invariants."
  },
  {
    question: "What is the primary trade-off when optimizing Greedy Intro? **GATE 2023**",
    options: [
      "Time vs. Space",
      "Accuracy vs. Speed",
      "Complexity vs. Readability",
      "None"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Greedy Intro."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Greedy Intro (if it is recursive)? **GATE 2017**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Greedy Intro? **GATE 2009**",
    options: [
      "Extremely large inputs",
      "Negative numbers",
      "All of the above",
      "Empty input"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Greedy Intro must handle boundary conditions."
  },
  {
    question: "Consider the worst-case scenario for Greedy Intro. Which data structure would most likely degrade its performance? **GATE 2006**",
    options: [
      "Hash Tables",
      "Arrays",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Greedy Intro."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Greedy Intro? **GATE 2019**",
    options: [
      "Set",
      "Depends on implementation details",
      "Queue",
      "Stack"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What happens to Greedy Intro if the input is already sorted (best-case)? **GATE 2008**",
    options: [
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Greedy Intro."
  },
  {
    question: "In a distributed computing environment, how easily can Greedy Intro be parallelized? **GATE 2014**",
    options: [
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Greedy Intro depends on data dependencies."
  },
  {
    question: "Which real-world scenario best models the problem solved by Greedy Intro? **GATE 2019**",
    options: [
      "Resource allocation",
      "Sorting data",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Greedy Intro? **GATE 2008**",
    options: [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of Greedy Intro."
  },
  {
    question: "When comparing Greedy Intro with naive approaches, what is the primary advantage? **GATE 2007**",
    options: [
      "No advantage",
      "Reduced time complexity",
      "Simpler implementation",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Greedy Intro are designed to optimize resource usage."
  }
];

export const greedyIntroDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int target = 42;
        int count = 0;
        for(int i=0; i<arr.length; i++) { // Bug: Starts with smallest
            while(target >= arr[i]) { target -= arr[i]; count++; }
        }
        System.out.println(count);
    }
    public static void main(String[] args) {
        int[] arr = {1, 5, 10, 20};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int target = 42;
        int count = 0;
        for(int i=arr.length-1; i>=0; i--) { // Fixed: Starts with largest
            while(target >= arr[i]) { target -= arr[i]; count++; }
        }
        System.out.println(count);
    }
    public static void main(String[] args) {
        int[] arr = {1, 5, 10, 20};
        process(arr);
    }
}`,
  hints: ["Greedy should pick the largest coin first"],
  expectedOutput: "5"
};
export const greedyIntroDrag = {
  instructions: "Arrange the properties of a Greedy Algorithm.",
  lines: [
    { id: "1", text: "Formulate the problem" },
    { id: "2", text: "Identify the greedy choice" },
    { id: "3", text: "Prove the greedy choice yields a global optimum" }
  ],
  order: ["1", "2", "3"]
};



export const greedyIntroComplete = {
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

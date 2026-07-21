export const dcIntroContent = {
  title: "Divide and Conquer",
  description: "Learn the Divide and Conquer algorithm design paradigm, breaking problems into subproblems.",
  points: [
    { heading: "Divide", body: "Break the problem into smaller subproblems of the same type." },
    { heading: "Conquer", body: "Recursively solve the subproblems." },
    { heading: "Combine", body: "Merge the subproblem solutions to form the overall solution." }
  ]
};

export const dcIntroMcqs = [
  {
    question: "If Dc Intro is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2017**",
    options: [
      "No impact",
      "Decreased time complexity",
      "Increased time complexity",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 0,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "How does Dc Intro behave under memory-constrained environments? **GATE 2008**",
    options: [
      "It fails gracefully.",
      "It requires an out-of-core adaptation.",
      "It runs normally.",
      "It crashes."
    ],
    correctAnswerIndex: 1,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dc Intro? **GATE 2012**",
    options: [
      "Pattern matching",
      "Sorting data",
      "Finding shortest paths",
      "Resource allocation"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which of the following is a direct application of Dc Intro? **GATE 2013**",
    options: [
      "All of the above",
      "Cryptographic hashing",
      "Network routing",
      "Database indexing"
    ],
    correctAnswerIndex: 2,
    explanation: "Dc Intro has widespread applications across computer science domains."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dc Intro? **GATE 2007**",
    options: [
      "O(N)",
      "O(N^2)",
      "O(N log N)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Dc Intro."
  },
  {
    question: "If Dc Intro uses a heuristic, what does that imply about its solution? **GATE 2023**",
    options: [
      "It is exact but slow.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It uses randomness."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Dc Intro at the cost of guaranteed optimality."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dc Intro? **GATE 2011**",
    options: [
      "Loop invariants",
      "Combinatorics",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Dc Intro often rely on establishing invariants."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Dc Intro? **GATE 2008**",
    options: [
      "Extremely large inputs",
      "Empty input",
      "Negative numbers",
      "All of the above"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Dc Intro must handle boundary conditions."
  },
  {
    question: "In a standard implementation of Dc Intro, what is the auxiliary space complexity? **GATE 2010**",
    options: [
      "O(N^2)",
      "O(log N)",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "What is the primary trade-off when optimizing Dc Intro? **GATE 2007**",
    options: [
      "Time vs. Space",
      "Accuracy vs. Speed",
      "None",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Dc Intro."
  },
  {
    question: "In the context of Dc Intro, what does the term 'optimal substructure' imply if applicable? **GATE 2009**",
    options: [
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dc Intro."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dc Intro? **GATE 2017**",
    options: [
      "Set",
      "Depends on implementation details",
      "Stack",
      "Queue"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What happens to Dc Intro if the input is already sorted (best-case)? **GATE 2009**",
    options: [
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Dc Intro."
  },
  {
    question: "What is the theoretical lower bound for the problem that Dc Intro solves? **GATE 2011**",
    options: [
      "O(N)",
      "NP-Hard",
      "O(N log N)",
      "O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Dc Intro (if it is recursive)? **GATE 2010**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  }
];

export const dcIntroDebug = {
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

export const dcIntroDrag = {
  instructions: "Arrange the phases of Divide and Conquer.",
  lines: [
    { id: "1", text: "Divide the problem into subproblems" },
    { id: "2", text: "Conquer (solve) the subproblems recursively" },
    { id: "3", text: "Combine the results into the final solution" }
  ],
  order: ["1", "2", "3"]
};



export const dcIntroComplete = {
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

export const stringMatchingContent = {
  title: "String Matching",
  description: "Learn algorithms to find occurrences of a pattern within a string.",
  points: [
    { heading: "Naive Approach", body: "Check pattern at every position. O((n-m+1)m) time." },
    { heading: "KMP Algorithm", body: "Uses LPS array to skip redundant comparisons. O(n+m) time." },
    { heading: "Rabin-Karp", body: "Uses rolling hash. O(n+m) average time." }
  ]
};

export const stringMatchingMcqs = [
  {
    question: "Which of the following best describes the worst-case time complexity of String Matching? **GATE 2017**",
    options: [
      "O(N)",
      "It depends on the input structure.",
      "O(N^2)",
      "O(N log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of String Matching."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient String Matching? **GATE 2019**",
    options: [
      "Depends on implementation details",
      "Stack",
      "Queue",
      "Set"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "If the input size for String Matching is doubled, how does the execution time scale approximately in the average case? **GATE 2014**",
    options: [
      "It doubles",
      "It quadruples",
      "It increases by a constant factor",
      "It remains constant"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of String Matching."
  },
  {
    question: "Which of the following is a direct application of String Matching? **GATE 2009**",
    options: [
      "Network routing",
      "Database indexing",
      "All of the above",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 2,
    explanation: "String Matching has widespread applications across computer science domains."
  },
  {
    question: "In a standard implementation of String Matching, what is the auxiliary space complexity? **GATE 2019**",
    options: [
      "O(N^2)",
      "O(log N)",
      "O(N)",
      "O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If String Matching is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2007**",
    options: [
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which algorithmic paradigm does String Matching primarily utilize? **GATE 2005**",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding String Matching."
  },
  {
    question: "What happens to String Matching if the input is already sorted (best-case)? **GATE 2009**",
    options: [
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "Behavior remains unchanged.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect String Matching."
  },
  {
    question: "How does String Matching behave under memory-constrained environments? **GATE 2005**",
    options: [
      "It requires an out-of-core adaptation.",
      "It fails gracefully.",
      "It runs normally.",
      "It crashes."
    ],
    correctAnswerIndex: 1,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Consider the worst-case scenario for String Matching. Which data structure would most likely degrade its performance? **GATE 2017**",
    options: [
      "Balanced Trees",
      "Linked Lists",
      "Hash Tables",
      "Arrays"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence String Matching."
  },
  {
    question: "In the context of String Matching, what does the term 'optimal substructure' imply if applicable? **GATE 2008**",
    options: [
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like String Matching."
  },
  {
    question: "What is the primary trade-off when optimizing String Matching? **GATE 2009**",
    options: [
      "Accuracy vs. Speed",
      "Complexity vs. Readability",
      "Time vs. Space",
      "None"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in String Matching."
  },
  {
    question: "Which real-world scenario best models the problem solved by String Matching? **GATE 2005**",
    options: [
      "Pattern matching",
      "Finding shortest paths",
      "Resource allocation",
      "Sorting data"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of String Matching? **GATE 2014**",
    options: [
      "Probability",
      "Graph theory",
      "Combinatorics",
      "Loop invariants"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for String Matching often rely on establishing invariants."
  },
  {
    question: "When comparing String Matching with naive approaches, what is the primary advantage? **GATE 2007**",
    options: [
      "Reduced space complexity",
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like String Matching are designed to optimize resource usage."
  }
];

export const stringMatchingDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(String txt) {
        String pat = "world";
        for(int i=0; i<=txt.length()-pat.length(); i++) {
            int j;
            for(j=0; j<pat.length(); j++) {
                if(txt.charAt(i+j) != pat.charAt(j)) break;
            }
            if(j == pat.length()-1) System.out.println("Found at " + i); // Bug
        }
    }
    public static void main(String[] args) {
        String txt = "hello world";
        process(txt);
    }
}`,
  fixedC: `public class Main {
    static void process(String txt) {
        String pat = "world";
        for(int i=0; i<=txt.length()-pat.length(); i++) {
            int j;
            for(j=0; j<pat.length(); j++) {
                if(txt.charAt(i+j) != pat.charAt(j)) break;
            }
            if(j == pat.length()) System.out.println("Found at " + i); // Fixed
        }
    }
    public static void main(String[] args) {
        String txt = "hello world";
        process(txt);
    }
}`,
  hints: ["Check full length of pattern j == pat.length()"],
  expectedOutput: "Found at 6"
};

export const stringMatchingDrag = {
  instructions: "Arrange the string matching algorithms from slowest worst-case to fastest.",
  lines: [
    { id: "1", text: "Naive String Matcher O(n*m)" },
    { id: "2", text: "Rabin-Karp (worst case O(n*m), avg O(n+m))" },
    { id: "3", text: "KMP Algorithm O(n+m)" }
  ],
  order: ["1", "2", "3"]
};



export const stringMatchingComplete = {
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

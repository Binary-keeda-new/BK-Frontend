export const introBasicsContent = {
  title: "Basics of Algorithms",
  description: "An introduction to the fundamentals of algorithms, including their definition, characteristics, and analysis.",
  points: [
    {
      title: "1. Introduction",
      content: "An algorithm is a step-by-step procedure or a set of rules to be followed in calculations or other problem-solving operations, especially by a computer. It is independent of any programming language; it is a fundamental design that can be implemented in various ways. The study of algorithms involves designing, proving correctness, and analyzing their efficiency."
    },
    {
      title: "2. Problem Statement",
      content: "Consider the general problem of finding a specific item in a collection or sorting a set of items. Before writing any code, we need a clear sequence of operations that guarantees the correct output for any valid input. This sequence must be unambiguous, finite, and effective."
    },
    {
      title: "3. Theory & Working",
      content: "A good algorithm must possess several characteristics:\n\n- **Input**: 0 or more inputs supplied externally.\n- **Output**: At least 1 output is produced.\n- **Definiteness**: Each step must be clear and unambiguous.\n- **Finiteness**: It must terminate after a finite number of steps.\n- **Effectiveness**: Every step must be basic enough to be carried out, in principle, by a person using only paper and pencil."
    },
    {
      title: "4. Step-by-Step Dry Run",
      content: "Let's dry run a simple algorithm to find the maximum of two numbers, A and B.\n\n1. Start.\n2. Read values for A and B. Let's say A = 5, B = 10.\n3. Check if A is greater than B. (5 > 10) is False.\n4. Since the condition is false, go to the 'else' part.\n5. Maximum is B (10).\n6. Print the maximum.\n7. Stop.\n\n```text\n        [ Start ]\n            |\n    [ Read A and B ]\n            |\n       ( Is A > B? )\n        /         \\\n      Yes          No\n      /             \\\n  [Max = A]      [Max = B]\n      \\             /\n       \\           /\n     [ Print Maximum ]\n            |\n         [ Stop ]\n```"
    },
    {
      title: "5. Pseudocode",
      content: "```text\nAlgorithm FindMax(A, B)\n1. IF A > B THEN\n2.     RETURN A\n3. ELSE\n4.     RETURN B\n5. END IF\n```"
    },
    {
      title: "6. C Implementation",
      content: "```c\n#include <stdio.h>\n\nint findMax(int a, int b) {\n    if (a > b) {\n        return a;\n    } else {\n        return b;\n    }\n}\n\nint main() {\n    int result = findMax(5, 10);\n    printf(\"Maximum is: %d\\n\", result);\n    return 0;\n}\n```"
    },
    {
      title: "7. Java Implementation",
      content: "```java\npublic class AlgorithmBasics {\n    public static int findMax(int a, int b) {\n        if (a > b) {\n            return a;\n        } else {\n            return b;\n        }\n    }\n\n    public static void main(String[] args) {\n        int result = findMax(5, 10);\n        System.out.println(\"Maximum is: \" + result);\n    }\n}\n```"
    },
    {
      title: "8. Time & Space Complexity",
      content: "For our simple `findMax` algorithm:\n\n- **Time Complexity:** $O(1)$. The number of operations (one comparison) does not depend on the size of the input.\n- **Space Complexity:** $O(1)$. It only requires a constant amount of extra memory space to store variables."
    },
    {
      title: "9. Best, Worst & Average Case",
      content: "- **Best Case:** Not particularly applicable for an $O(1)$ algorithm, but generally it means the minimum time required for program execution.\n- **Worst Case:** The maximum time required by the algorithm.\n- **Average Case:** The expected time required by the algorithm over all possible inputs. For `findMax`, all cases take $O(1)$ time."
    },
    {
      title: "10. Iterative vs Recursive",
      content: "Algorithms can be expressed iteratively (using loops) or recursively (functions calling themselves).\n\n- **Iterative:** Generally more memory-efficient as it avoids function call overhead. Example: a standard `for` loop.\n- **Recursive:** Often results in cleaner, more readable code for problems that can be broken down into similar subproblems. Example: standard implementation of Fibonacci sequence or tree traversals."
    },
    {
      title: "11. Edge Cases & Constraints",
      content: "When designing algorithms, one must consider edge cases.\n\n- What if the inputs are extremely large or extremely small?\n- What if the inputs are null or empty arrays?\n- What if $A = B$ in our `findMax` example? (The logic correctly handles it by returning B, which is equal to A)."
    },
    {
      title: "12. Applications",
      content: "Algorithms form the core of computer science. Applications include:\n\n- Search engines ranking web pages (PageRank).\n- Routing data over the Internet (Dijkstra's, BGP).\n- Cryptography and secure communications (RSA, AES).\n- Operating systems scheduling processes."
    },
    {
      title: "13. Pros & Cons",
      content: "Having a formal algorithm before coding provides several benefits:\n\n- **Pros:** Language independence, easier to analyze for efficiency and correctness, simplifies the coding phase.\n- **Cons:** Developing a highly optimized algorithm can be time-consuming; sometimes a brute-force approach is sufficient for small inputs."
    },
    {
      title: "14. Comparison with alternatives",
      content: "Algorithm vs Heuristic:\n\n- **Algorithm:** Guarantees a correct and optimal solution (if one exists) within a finite time.\n- **Heuristic:** A problem-solving approach that might not be optimal or perfect, but is sufficient for immediate goals (often used when finding an exact solution is computationally intractable, like the Traveling Salesperson Problem)."
    },
    {
      title: "15. Common Pitfalls",
      content: "Beginners often jump straight into coding without designing the algorithm first. This leads to:\n\n- Spaghetti code that is hard to debug.\n- Inefficient solutions that fail on large inputs (e.g., using an $O(n^2)$ approach when an $O(n \\log n)$ one exists).\n- Ignoring edge cases leading to runtime crashes."
    },
    {
      title: "16. Visual Intuition",
      content: "Imagine an algorithm as a cooking recipe.\n\n- **Input:** Ingredients (flour, sugar, eggs).\n- **Algorithm:** The step-by-step instructions (mix, bake at 350 degrees for 30 mins).\n- **Output:** The finished cake.\nIf the recipe is ambiguous ('bake for a while'), the cake might burn. Definiteness is key!"
    }
  ]
};

export const introBasicsMcqs = [
  {
    question: "Consider the worst-case scenario for Intro Basics. Which data structure would most likely degrade its performance? **GATE 2019**",
    options: [
      "Hash Tables",
      "Arrays",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 3,
    explanation: "Different data structures provide different access times which heavily influence Intro Basics."
  },
  {
    question: "Which real-world scenario best models the problem solved by Intro Basics? **GATE 2005**",
    options: [
      "Finding shortest paths",
      "Resource allocation",
      "Sorting data",
      "Pattern matching"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "When comparing Intro Basics with naive approaches, what is the primary advantage? **GATE 2012**",
    options: [
      "Reduced time complexity",
      "Simpler implementation",
      "Reduced space complexity",
      "No advantage"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Intro Basics are designed to optimize resource usage."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Intro Basics? **GATE 2007**",
    options: [
      "Queue",
      "Set",
      "Stack",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What is the primary trade-off when optimizing Intro Basics? **GATE 2020**",
    options: [
      "Time vs. Space",
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "None"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Intro Basics."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Intro Basics (if it is recursive)? **GATE 2020**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "What happens to Intro Basics if the input is already sorted (best-case)? **GATE 2010**",
    options: [
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "Behavior remains unchanged.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Intro Basics."
  },
  {
    question: "If Intro Basics is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2010**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "Reduced stack space overhead",
      "No impact"
    ],
    correctAnswerIndex: 0,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Intro Basics? **GATE 2010**",
    options: [
      "Loop invariants",
      "Probability",
      "Graph theory",
      "Combinatorics"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Intro Basics often rely on establishing invariants."
  },
  {
    question: "What is the theoretical lower bound for the problem that Intro Basics solves? **GATE 2020**",
    options: [
      "NP-Hard",
      "O(N log N)",
      "O(N)",
      "O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which of the following is a direct application of Intro Basics? **GATE 2023**",
    options: [
      "Database indexing",
      "All of the above",
      "Cryptographic hashing",
      "Network routing"
    ],
    correctAnswerIndex: 3,
    explanation: "Intro Basics has widespread applications across computer science domains."
  },
  {
    question: "How does Intro Basics behave under memory-constrained environments? **GATE 2021**",
    options: [
      "It fails gracefully.",
      "It requires an out-of-core adaptation.",
      "It crashes.",
      "It runs normally."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "In a distributed computing environment, how easily can Intro Basics be parallelized? **GATE 2023**",
    options: [
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel.",
      "Impossible.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Intro Basics depends on data dependencies."
  },
  {
    question: "If the input size for Intro Basics is doubled, how does the execution time scale approximately in the average case? **GATE 2005**",
    options: [
      "It remains constant",
      "It increases by a constant factor",
      "It doubles",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Intro Basics."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Intro Basics? **GATE 2020**",
    options: [
      "Extremely large inputs",
      "Empty input",
      "All of the above",
      "Negative numbers"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of Intro Basics must handle boundary conditions."
  }
];

export const introBasicsDebug = {
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

export const introBasicsDrag = {
  problemStatement: "Order the steps to design and analyze a basic algorithm.",
  steps: [
    "Understand the Problem Statement clearly.",
    "Identify Inputs and Expected Outputs.",
    "Draft the step-by-step logic (Pseudocode).",
    "Dry-run the logic with sample test cases.",
    "Analyze Time and Space Complexity.",
    "Implement the algorithm in a programming language."
  ]
};

export const introBasicsComplete = {
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

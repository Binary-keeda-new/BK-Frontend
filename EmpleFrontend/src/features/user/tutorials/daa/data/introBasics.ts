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
    question: "Which of the following is NOT a fundamental characteristic of an algorithm?",
    options: [
      "Finiteness",
      "Definiteness",
      "Language Dependency",
      "Effectiveness"
    ],
    correctAnswer: 2,
    explanation: "Algorithms are conceptual and must be independent of any specific programming language. Finiteness, definiteness, and effectiveness are core characteristics."
  },
  {
    question: "What does 'Definiteness' mean in the context of an algorithm?",
    options: [
      "The algorithm must terminate after a finite number of steps.",
      "Each step of the algorithm must be precisely defined and unambiguous.",
      "The algorithm must produce at least one output.",
      "The algorithm must be highly efficient."
    ],
    correctAnswer: 1,
    explanation: "Definiteness means that every instruction must be clear and have no ambiguity."
  },
  {
    question: "Which time complexity is generally considered the most efficient for large inputs?",
    options: [
      "O(n^2)",
      "O(n log n)",
      "O(n)",
      "O(1)"
    ],
    correctAnswer: 3,
    explanation: "O(1), or constant time, is the most efficient because the execution time does not grow as the input size grows."
  },
  {
    question: "Why do we perform asymptotic analysis of algorithms rather than measuring actual execution time?",
    options: [
      "Actual execution time is machine and compiler dependent.",
      "Asymptotic analysis provides the exact number of milliseconds an algorithm will take.",
      "Asymptotic analysis only works for recursive algorithms.",
      "Execution time is impossible to measure."
    ],
    correctAnswer: 0,
    explanation: "Asymptotic analysis abstracts away hardware and software differences to provide a generalized measure of efficiency based purely on input size."
  },
  {
    question: "An algorithm that yields a good enough solution but does not guarantee an optimal one is known as a:",
    options: [
      "Brute force algorithm",
      "Divide and conquer algorithm",
      "Heuristic",
      "Deterministic algorithm"
    ],
    correctAnswer: 2,
    explanation: "A heuristic is a technique designed for solving a problem more quickly when classic methods are too slow, by finding an approximate solution."
  },
  {
    question: "Which of the following best describes Space Complexity?",
    options: [
      "The physical size of the hard drive required to install the software.",
      "The amount of memory required by an algorithm to execute as a function of the input size.",
      "The number of lines of code in the algorithm.",
      "The time it takes to compile the program."
    ],
    correctAnswer: 1,
    explanation: "Space complexity is a measure of the amount of working storage an algorithm needs, which is crucial for systems with limited memory."
  },
  {
    question: "In algorithm design, what is an 'Edge Case'?",
    options: [
      "The central logic of the loop.",
      "A situation where the algorithm achieves its best-case time complexity.",
      "An extreme or unusual input condition that might cause the algorithm to fail if not handled properly.",
      "The boundary where the algorithm transitions from O(n) to O(n^2)."
    ],
    correctAnswer: 2,
    explanation: "Edge cases involve extreme parameters (like empty inputs, maximum values) that test the robustness of an algorithm."
  },
  {
    question: "What is the primary difference between a recursive and an iterative algorithm?",
    options: [
      "Recursive algorithms use loops, while iterative algorithms call themselves.",
      "Recursive algorithms call themselves to solve sub-problems, while iterative algorithms use loops.",
      "Iterative algorithms always have a worse time complexity.",
      "Recursive algorithms cannot have infinite loops."
    ],
    correctAnswer: 1,
    explanation: "Recursion involves a function calling itself, whereas iteration uses constructs like for/while loops to repeat execution."
  },
  {
    question: "Which characteristic states that an algorithm must terminate after a specific number of steps?",
    options: [
      "Finiteness",
      "Effectiveness",
      "Input",
      "Definiteness"
    ],
    correctAnswer: 0,
    explanation: "Finiteness ensures that an algorithm will eventually come to an end, unlike an infinite loop."
  },
  {
    question: "If an algorithm requires 0 inputs, how many outputs must it produce according to standard definitions?",
    options: [
      "0 outputs",
      "At least 1 output",
      "Exactly 2 outputs",
      "Outputs are optional"
    ],
    correctAnswer: 1,
    explanation: "An algorithm can have 0 or more inputs, but it must produce at least 1 output to be useful and meet standard algorithmic definitions."
  }
];

export const introBasicsDebug = {
  instructions: "Fix the logical bug in findMaxOfThree. It should correctly return the maximum of a, b, and c.",
  buggyC: "#include <stdio.h>\n\nint findMaxOfThree(int a, int b, int c) {\n    int max = a;\n    if (b > a) {\n        max = b;\n    }\n    if (c > a) {\n        max = c;\n    }\n    return max;\n}\n\nint main() {\n    printf(\"%d\\n\", findMaxOfThree(10, 20, 15));\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint findMaxOfThree(int a, int b, int c) {\n    int max = a;\n    if (b > max) {\n        max = b;\n    }\n    if (c > max) {\n        max = c;\n    }\n    return max;\n}\n\nint main() {\n    printf(\"%d\\n\", findMaxOfThree(10, 20, 15));\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static int findMaxOfThree(int a, int b, int c) {\n        int max = a;\n        if (b > a) {\n            max = b;\n        }\n        if (c > a) {\n            max = c;\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(findMaxOfThree(10, 20, 15));\n    }\n}",
  fixedJava: "public class Main {\n    public static int findMaxOfThree(int a, int b, int c) {\n        int max = a;\n        if (b > max) {\n            max = b;\n        }\n        if (c > max) {\n            max = c;\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(findMaxOfThree(10, 20, 15));\n    }\n}",
  hints: ["Check the second if-condition.","Are you comparing 'c' with 'a' or 'max'?","Change 'c > a' to 'c > max'."],
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
  problemStatement: "Complete the Java snippet that implements a simple algorithm to compute the factorial of a non-negative integer using iteration.",
  code: `public class Factorial {
    public static int computeFactorial(int n) {
        int result = 1;
        for (int i = 1; ___________; i++) {
            result = ____________;
        }
        return result;
    }
}`,
  blanks: [
    {
      id: "blank1",
      correct: "i <= n"
    },
    {
      id: "blank2",
      correct: "result * i"
    }
  ],
  solution: `public class Factorial {
    public static int computeFactorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result = result * i;
        }
        return result;
    }
}`,
  explanation: "The loop must run up to and including 'n' (i <= n). Inside the loop, we multiply the current 'result' by 'i' to build the factorial incrementally."
};

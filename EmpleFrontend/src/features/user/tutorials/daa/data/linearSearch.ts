export const linearSearchContent = {
  title: "Linear Search",
  points: [
    {
      title: "1. Introduction",
      description: "Linear search, also known as sequential search, is the simplest searching algorithm. It involves examining every element in a dataset one by one in sequence until the desired target element is found or the end of the dataset is reached."
    },
    {
      title: "2. Problem Statement",
      description: "Given an array (or list) of $N$ elements and a target value $X$, the goal is to find if $X$ exists in the array. If it does, return the index of $X$. If it does not exist, return a special value (like -1) to indicate failure."
    },
    {
      title: "3. Theory & Working",
      description: "Linear search works by iterating over the array from the first element to the last. At each step, it compares the current element with the target value. If a match is found, it terminates and returns the index. If the loop completes without finding a match, the algorithm concludes that the element is not present."
    },
    {
      title: "4. Step-by-Step Dry Run",
      description: "Consider the array: [10, 23, 45, 70, 11, 15] and target X = 70.\nStep 1: Check index 0. Is 10 == 70? No.\nStep 2: Check index 1. Is 23 == 70? No.\nStep 3: Check index 2. Is 45 == 70? No.\nStep 4: Check index 3. Is 70 == 70? Yes! Match found at index 3.\nThe algorithm terminates and returns 3."
    },
    {
      title: "5. Pseudocode",
      description: "```text\nfunction linearSearch(array, target):\n    for i from 0 to length(array) - 1:\n        if array[i] == target:\n            return i\n    return -1\n```"
    },
    {
      title: "6. C Implementation",
      description: "Here is the standard implementation of Linear Search in C:",
      code: "int linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) {\n            return i; // Element found\n        }\n    }\n    return -1; // Element not found\n}",
      language: "c"
    },
    {
      title: "7. Java Implementation",
      description: "Here is the implementation of Linear Search in Java:",
      code: "public class Search {\n    public static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) {\n                return i;\n            }\n        }\n        return -1;\n    }\n}",
      language: "java"
    },
    {
      title: "8. Time & Space Complexity",
      description: "Time Complexity: O(N) because in the worst-case scenario, every element is checked once.\nSpace Complexity: O(1) as no extra space is required (only a few variables for iteration)."
    },
    {
      title: "9. Best, Worst & Average Case",
      description: "Best Case: O(1) - The target element is at the very first index of the array.\nWorst Case: O(N) - The target element is at the very last index, or not present at all.\nAverage Case: O(N) - On average, the target element will be found somewhere in the middle of the array, requiring N/2 comparisons, which simplifies to O(N)."
    },
    {
      title: "10. Iterative vs Recursive",
      description: "Linear Search is most commonly implemented iteratively using a loop. It can also be implemented recursively by passing the array, target, and current index. However, the recursive approach uses O(N) auxiliary stack space, making it less efficient in terms of memory than the iterative O(1) space approach."
    },
    {
      title: "11. Edge Cases & Constraints",
      description: "1. Empty Array: The algorithm should immediately return -1.\n2. Single Element Array: Handled correctly by checking the only element.\n3. Duplicate Elements: Standard linear search returns the index of the first occurrence."
    },
    {
      title: "12. Applications",
      description: "Linear search is used when:\n- The list has only a few elements.\n- Performing a single search in an unordered list (sorting it first would take O(N log N)).\n- The data structure does not support random access (e.g., Linked Lists)."
    },
    {
      title: "13. Pros & Cons",
      description: "Pros:\n- Very simple to understand and implement.\n- Does not require the array to be sorted.\n- Works efficiently on small datasets.\nCons:\n- Very slow for large datasets compared to algorithms like Binary Search.\n- Always requires O(N) time in the worst case."
    },
    {
      title: "14. Comparison with alternatives",
      description: "Binary Search vs Linear Search:\nLinear Search takes O(N) time but works on unsorted arrays. Binary Search takes O(log N) time but strictly requires the array to be sorted beforehand. For one-time searches in unsorted data, Linear Search is better. For multiple searches, sorting and then using Binary Search is optimal."
    },
    {
      title: "15. Common Pitfalls",
      description: "- Off-by-one errors in loop boundaries (e.g., looping to i <= n instead of i < n).\n- Forgetting to handle the case where the element is not found, leading to undefined behavior or incorrect return values."
    },
    {
      title: "16. Visual Intuition",
      description: "Imagine looking for a specific book on a messy desk. You pick up the first book, check if it's the one you need. If not, you put it down and pick up the next one, continuing this process until you either find the book or have checked every single book on the desk. This sequential checking is the essence of Linear Search."
    }
  ]
};

export const linearSearchMcqs = [
  {
    question: "How does Linear Search behave under memory-constrained environments? **GATE 2014**",
    options: [
      "It fails gracefully.",
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It crashes."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Linear Search? **GATE 2009**",
    options: [
      "Negative numbers",
      "All of the above",
      "Empty input",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Linear Search must handle boundary conditions."
  },
  {
    question: "What happens to Linear Search if the input is already sorted (best-case)? **GATE 2008**",
    options: [
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Linear Search."
  },
  {
    question: "If the input size for Linear Search is doubled, how does the execution time scale approximately in the average case? **GATE 2023**",
    options: [
      "It increases by a constant factor",
      "It doubles",
      "It remains constant",
      "It quadruples"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Linear Search."
  },
  {
    question: "What is the primary trade-off when optimizing Linear Search? **GATE 2018**",
    options: [
      "Time vs. Space",
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "None"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Linear Search."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Linear Search? **GATE 2017**",
    options: [
      "Stack",
      "Depends on implementation details",
      "Queue",
      "Set"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In a standard implementation of Linear Search, what is the auxiliary space complexity? **GATE 2009**",
    options: [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which real-world scenario best models the problem solved by Linear Search? **GATE 2015**",
    options: [
      "Finding shortest paths",
      "Sorting data",
      "Resource allocation",
      "Pattern matching"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which of the following is a direct application of Linear Search? **GATE 2019**",
    options: [
      "Network routing",
      "Database indexing",
      "Cryptographic hashing",
      "All of the above"
    ],
    correctAnswerIndex: 2,
    explanation: "Linear Search has widespread applications across computer science domains."
  },
  {
    question: "In the context of Linear Search, what does the term 'optimal substructure' imply if applicable? **GATE 2011**",
    options: [
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 2,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Linear Search."
  },
  {
    question: "Which algorithmic paradigm does Linear Search primarily utilize? **GATE 2013**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Linear Search."
  },
  {
    question: "What is the theoretical lower bound for the problem that Linear Search solves? **GATE 2017**",
    options: [
      "O(1)",
      "O(N log N)",
      "NP-Hard",
      "O(N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If Linear Search uses a heuristic, what does that imply about its solution? **GATE 2019**",
    options: [
      "It is always optimal.",
      "It is approximate but fast.",
      "It uses randomness.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Linear Search at the cost of guaranteed optimality."
  },
  {
    question: "In a distributed computing environment, how easily can Linear Search be parallelized? **GATE 2018**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Linear Search depends on data dependencies."
  },
  {
    question: "Consider the worst-case scenario for Linear Search. Which data structure would most likely degrade its performance? **GATE 2011**",
    options: [
      "Arrays",
      "Hash Tables",
      "Balanced Trees",
      "Linked Lists"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Linear Search."
  }
];

export const linearSearchDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        for (int i = 1; i <= arr.length; i++) { // Bug: 1-based index
            if (arr[i] == 6) { System.out.println("Found at " + i); return; }
        }
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        for (int i = 0; i < arr.length; i++) { // Fixed
            if (arr[i] == 6) { System.out.println("Found at " + i); return; }
        }
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10};
        process(arr);
    }
}`,
  hints: ["Arrays are 0-indexed"],
  expectedOutput: "Found at 2"
};

export const linearSearchDrag = {
  title: "Assemble the Linear Search Algorithm",
  blocks: [
    "function linearSearch(arr, target) {",
    "    for (let i = 0; i < arr.length; i++) {",
    "        if (arr[i] === target) {",
    "            return i;",
    "        }",
    "    }",
    "    return -1;",
    "}"
  ],
  correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
};

export const linearSearchComplete = {
  codeSnippet: `int search(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (/*[BLANK]*/) {
            return i;
        }
    }
    return -1;
}`,
  blanks: [
    {
      id: "blank1",
      text: "arr[i] == x"
    }
  ]
};

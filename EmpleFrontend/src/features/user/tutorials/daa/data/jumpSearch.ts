export const jumpSearchContent = {
  title: "Jump Search",
  points: [
    {
      title: "1. Introduction",
      content: "Jump Search is a searching algorithm for sorted arrays. The basic idea is to check fewer elements (than linear search) by jumping ahead by fixed steps or skipping some elements in place of searching all elements."
    },
    {
      title: "2. Problem Statement",
      content: "Given a sorted array of $n$ elements and a target value $x$, find the index of $x$ in the array. If $x$ is not present, return -1."
    },
    {
      title: "3. Theory & Working",
      content: "Jump Search works on a sorted array by jumping ahead by a block size $m$. \nOptimal jump size is $m = \\sqrt{n}$. \nThe algorithm compares the target element with the element at the current jump. If the current element is smaller than the target, we jump to the next block. We continue jumping until we find an element that is greater than or equal to the target, or we reach the end of the array. \nOnce a block is found where the target could reside, we perform a linear search backward (or forward from the previous jump) within that block."
    },
    {
      title: "4. Step-by-Step Dry Run",
      content: "Let Array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]. Target = 55.\nLength $n = 16$. Optimal jump size $m = \\sqrt{16} = 4$.\nStep 1: Compare arr[3] (2) with 55. 2 < 55. Jump to index 7.\nStep 2: Compare arr[7] (13) with 55. 13 < 55. Jump to index 11.\nStep 3: Compare arr[11] (89) with 55. 89 > 55. So, the element lies in the block between index 7 and 11.\nStep 4: Perform linear search from index 8. arr[8]=21, arr[9]=34, arr[10]=55. Target found at index 10."
    },
    {
      title: "5. Pseudocode",
      content: "```text\nfunction JumpSearch(arr, x, n):\n    step = sqrt(n)\n    prev = 0\n    \n    // Finding the block where element is present\n    while arr[min(step, n) - 1] < x:\n        prev = step\n        step = step + sqrt(n)\n        if prev >= n:\n            return -1\n            \n    // Doing a linear search for x in block beginning with prev\n    while arr[prev] < x:\n        prev = prev + 1\n        if prev == min(step, n):\n            return -1\n            \n    // If element is found\n    if arr[prev] == x:\n        return prev\n        \n    return -1\n```"
    },
    {
      title: "6. C Implementation",
      content: "```c\n#include <stdio.h>\n#include <math.h>\n\nint min(int a, int b) {\n    return (a < b) ? a : b;\n}\n\nint jumpSearch(int arr[], int x, int n) {\n    int step = sqrt(n);\n    int prev = 0;\n    \n    // Finding the block where the element may be present\n    while (arr[min(step, n) - 1] < x) {\n        prev = step;\n        step += sqrt(n);\n        if (prev >= n)\n            return -1;\n    }\n    \n    // Doing a linear search for x in the block beginning with prev\n    while (arr[prev] < x) {\n        prev++;\n        \n        // If we reached next block or end of array, element is not present\n        if (prev == min(step, n))\n            return -1;\n    }\n    \n    // If element is found\n    if (arr[prev] == x)\n        return prev;\n        \n    return -1;\n}\n\nint main() {\n    int arr[] = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };\n    int x = 55;\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int index = jumpSearch(arr, x, n);\n    if (index >= 0)\n        printf(\"Number is at index %d\", index);\n    else\n        printf(\"Number is not in array\");\n    return 0;\n}\n```"
    },
    {
      title: "7. Java Implementation",
      content: "```java\npublic class JumpSearch {\n    public static int jumpSearch(int[] arr, int x) {\n        int n = arr.length;\n        int step = (int)Math.floor(Math.sqrt(n));\n        int prev = 0;\n        \n        // Find the block where element is present\n        while (arr[Math.min(step, n) - 1] < x) {\n            prev = step;\n            step += (int)Math.floor(Math.sqrt(n));\n            if (prev >= n)\n                return -1;\n        }\n        \n        // Linear search for x in block beginning with prev\n        while (arr[prev] < x) {\n            prev++;\n            if (prev == Math.min(step, n))\n                return -1;\n        }\n        \n        // If element is found\n        if (arr[prev] == x)\n            return prev;\n            \n        return -1;\n    }\n    \n    public static void main(String[] args) {\n        int arr[] = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };\n        int x = 55;\n        int index = jumpSearch(arr, x);\n        if (index >= 0)\n            System.out.println(\"Number is at index \" + index);\n        else\n            System.out.println(\"Number is not in array\");\n    }\n}\n```"
    },
    {
      title: "8. Time & Space Complexity",
      content: "Time Complexity: $O(\\sqrt{n})$. In the worst case, we do $n / m$ jumps, and then a linear search of at most $m - 1$ comparisons. The total number of comparisons is roughly $(n / m) + m$. This value is minimized when $m = \\sqrt{n}$, resulting in a time complexity of $O(\\sqrt{n})$.\nSpace Complexity: $O(1)$ since Jump Search only requires a few extra variables for step size and indices, meaning it works entirely in-place."
    },
    {
      title: "9. Best, Worst & Average Case",
      content: "Best Case: $O(1)$. This occurs when the target element happens to be at the very first index of the array, requiring only one comparison.\nWorst Case: $O(\\sqrt{n})$. Occurs when the target element is near the end of the array or not present, requiring the maximum number of jumps and linear search steps.\nAverage Case: $O(\\sqrt{n})$. On average, we make $\\frac{\\sqrt{n}}{2}$ jumps and $\\frac{\\sqrt{n}}{2}$ linear comparisons."
    },
    {
      title: "10. Iterative vs Recursive",
      content: "Jump Search is overwhelmingly implemented iteratively. While a recursive version can be written (by passing the updated step and prev indices), it would incur an $O(\\sqrt{n})$ space overhead due to the recursion stack, completely negating the algorithm's $O(1)$ space advantage. Iterative approaches handle the forward leaps and linear fallback cleanly without stack growth."
    },
    {
      title: "11. Edge Cases & Constraints",
      content: "Edge Cases:\n- Empty array: The algorithm should immediately return -1.\n- Array of size 1: Handled efficiently as `step` evaluates to 1.\n- Target less than first element: Loop condition safely skips or linear search fails immediately.\n- Target larger than last element: The jump condition will exceed `n`, and the code must carefully prevent `IndexOutOfBounds` exceptions using `min(step, n)`.\nConstraints:\n- The input array MUST be sorted for Jump Search to work."
    },
    {
      title: "12. Applications",
      content: "Jump Search is optimal in scenarios where performing a backward step in an array is significantly more costly than jumping forward. Binary Search can jump backward multiple times (up to $O(\\log n)$), whereas Jump Search only ever steps backward exactly once (to reset to `prev` before doing the linear search). It's also utilized when sequential reads heavily outpace random access reads."
    },
    {
      title: "13. Pros & Cons",
      content: "Pros:\n- Faster than Linear Search ($O(\\sqrt{n})$ vs $O(n)$).\n- Bounded backward movement: jumps backwards only once.\n- Predictable cache access patterns compared to scattered Binary Search.\nCons:\n- Slower than Binary Search ($O(\\sqrt{n})$ vs $O(\\log n)$).\n- Requires the array to be sorted, limiting general-purpose unsorted array use."
    },
    {
      title: "14. Comparison with alternatives",
      content: "- **Linear Search:** Jump search drastically reduces comparisons ($O(\\sqrt{n})$ vs $O(n)$) at the cost of requiring sorted data.\n- **Binary Search:** Binary search is fundamentally faster ($O(\\log n)$), but Jump Search avoids frequent backward jumps, which is beneficial for systems where backward traversal is penalized.\n- **Exponential Search:** Exponential search ($O(\\log i)$) tends to be faster for elements located early in unbounded or extremely large arrays."
    },
    {
      title: "15. Common Pitfalls",
      content: "- **Index Out of Bounds:** Failing to use `min(step, n)` causes the jump index to exceed array bounds on the last block.\n- **Premature Termination:** Not properly iterating the `prev` variable leading to skipping the actual target during linear search.\n- **Forgetting Sort Condition:** Applying Jump Search to an unsorted array results in entirely unpredictable results and false negatives."
    },
    {
      title: "16. Visual Intuition",
      content: "Imagine a set of numbered lockers in a very long corridor. Opening a locker takes time. Instead of checking every locker one by one (Linear), you check every 10th locker. When you find a locker with a number larger than what you want, you know you went too far. You stop jumping and just walk backward to the last multiple of 10 you checked, then slowly open lockers one by one until you find your target. This is the essence of Jump Search."
    }
  ]
};

export const jumpSearchMcqs = [
  {
    question: "Which of the following is a direct application of Jump Search? **GATE 2023**",
    options: [
      "Cryptographic hashing",
      "Network routing",
      "All of the above",
      "Database indexing"
    ],
    correctAnswerIndex: 3,
    explanation: "Jump Search has widespread applications across computer science domains."
  },
  {
    question: "Which algorithmic paradigm does Jump Search primarily utilize? **GATE 2014**",
    options: [
      "Dynamic Programming",
      "Greedy Approach",
      "Divide and Conquer",
      "Backtracking"
    ],
    correctAnswerIndex: 3,
    explanation: "Identifying the core paradigm is crucial for understanding Jump Search."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Jump Search? **GATE 2022**",
    options: [
      "Combinatorics",
      "Probability",
      "Loop invariants",
      "Graph theory"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Jump Search often rely on establishing invariants."
  },
  {
    question: "If Jump Search is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2023**",
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
    question: "When comparing Jump Search with naive approaches, what is the primary advantage? **GATE 2017**",
    options: [
      "Simpler implementation",
      "Reduced space complexity",
      "Reduced time complexity",
      "No advantage"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Jump Search are designed to optimize resource usage."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Jump Search (if it is recursive)? **GATE 2023**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "What is the primary trade-off when optimizing Jump Search? **GATE 2021**",
    options: [
      "Time vs. Space",
      "None",
      "Accuracy vs. Speed",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Jump Search."
  },
  {
    question: "In a standard implementation of Jump Search, what is the auxiliary space complexity? **GATE 2017**",
    options: [
      "O(log N)",
      "O(N)",
      "O(1)",
      "O(N^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "In a distributed computing environment, how easily can Jump Search be parallelized? **GATE 2014**",
    options: [
      "Moderately, requires synchronization.",
      "Impossible.",
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Jump Search depends on data dependencies."
  },
  {
    question: "If the input size for Jump Search is doubled, how does the execution time scale approximately in the average case? **GATE 2007**",
    options: [
      "It doubles",
      "It quadruples",
      "It remains constant",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 2,
    explanation: "Scalability is determined by the asymptotic bounds of Jump Search."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Jump Search? **GATE 2012**",
    options: [
      "All of the above",
      "Extremely large inputs",
      "Negative numbers",
      "Empty input"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Jump Search must handle boundary conditions."
  },
  {
    question: "What happens to Jump Search if the input is already sorted (best-case)? **GATE 2014**",
    options: [
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Jump Search."
  },
  {
    question: "What is the theoretical lower bound for the problem that Jump Search solves? **GATE 2021**",
    options: [
      "NP-Hard",
      "O(N)",
      "O(1)",
      "O(N log N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If Jump Search uses a heuristic, what does that imply about its solution? **GATE 2015**",
    options: [
      "It is always optimal.",
      "It is exact but slow.",
      "It is approximate but fast.",
      "It uses randomness."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Jump Search at the cost of guaranteed optimality."
  },
  {
    question: "Which real-world scenario best models the problem solved by Jump Search? **GATE 2009**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Sorting data",
      "Resource allocation"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  }
];

export const jumpSearchDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) { // Bug
            int m = l + (r-l)/2;
            if (arr[m] == 8) { System.out.println("Found"); return; }
            if (arr[m] < 8) l = m + 1; else r = m - 1;
        }
        System.out.println("Not Found");
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l <= r) { // Fixed
            int m = l + (r-l)/2;
            if (arr[m] == 8) { System.out.println("Found"); return; }
            if (arr[m] < 8) l = m + 1; else r = m - 1;
        }
        System.out.println("Not Found");
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10};
        process(arr);
    }
}`,
  hints: ["Loop should continue while l <= r"],
  expectedOutput: "Found"
};

export const jumpSearchDrag = {
  title: "Jump Search Algorithm Steps",
  description: "Drag and drop the steps to correctly implement the Jump Search algorithm logic.",
  steps: [
    "Calculate the optimal jump step size as sqrt(n).",
    "Jump forward by step size while the element at the block's end is less than the target.",
    "If the previous index exceeds array bounds during jumping, return -1.",
    "Once a block containing the target is found, start a linear search from the previous index.",
    "If the element at the current linear search index matches the target, return the index.",
    "If the linear search reaches the end of the block without a match, return -1."
  ]
};

export const jumpSearchComplete = {
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

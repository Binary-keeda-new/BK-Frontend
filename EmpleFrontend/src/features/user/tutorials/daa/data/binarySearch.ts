export const binarySearchContent = [
  {
    title: "Introduction",
    content: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one."
  },
  {
    title: "Problem Statement",
    content: "Given a sorted array `arr[]` of `n` elements, write a function to search a given element `target` in `arr[]`. If `target` is present in `arr[]`, return its index. Otherwise, return `-1`."
  },
  {
    title: "Theory & Working",
    content: "Binary Search relies on the Divide and Conquer paradigm. It requires the array to be sorted. It compares the target value to the middle element of the array.\n- If they are equal, the target is found.\n- If the target is less than the middle element, the search continues in the lower half of the array.\n- If the target is greater than the middle element, the search continues in the upper half of the array.\nBy doing this, the algorithm eliminates half of the remaining elements in each step, guaranteeing a logarithmic search time."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Let's search for `target = 7` in `arr = [2, 3, 5, 7, 9, 11]`.\n1. Initial state: `low = 0`, `high = 5`.\n2. `mid = 0 + (5 - 0) / 2 = 2`. `arr[2] = 5`.\n3. Since `5 < 7`, we update `low = mid + 1 = 3`.\n4. Next state: `low = 3`, `high = 5`.\n5. `mid = 3 + (5 - 3) / 2 = 4`. `arr[4] = 9`.\n6. Since `9 > 7`, we update `high = mid - 1 = 3`.\n7. Next state: `low = 3`, `high = 3`.\n8. `mid = 3 + (3 - 3) / 2 = 3`. `arr[3] = 7`.\n9. Target found at index 3. Return 3."
  },
  {
    title: "Pseudocode",
    content: "```text\nfunction binarySearch(arr, target):\n    low = 0\n    high = length(arr) - 1\n    \n    while low <= high:\n        mid = low + (high - low) / 2\n        \n        if arr[mid] == target:\n            return mid\n        else if arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    return -1\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n\nint binarySearch(int arr[], int n, int target) {\n    int low = 0;\n    int high = n - 1;\n    \n    while (low <= high) {\n        // To prevent integer overflow\n        int mid = low + (high - low) / 2;\n        \n        if (arr[mid] == target)\n            return mid;\n            \n        if (arr[mid] < target)\n            low = mid + 1;\n        else\n            high = mid - 1;\n    }\n    \n    return -1;\n}\n\nint main() {\n    int arr[] = {2, 3, 4, 10, 40};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int result = binarySearch(arr, n, 10);\n    \n    if (result == -1)\n        printf(\"Element is not present in array\\n\");\n    else\n        printf(\"Element is present at index %d\\n\", result);\n        \n    return 0;\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nclass BinarySearch {\n    public int binarySearch(int arr[], int target) {\n        int low = 0, high = arr.length - 1;\n        \n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            \n            if (arr[mid] == target)\n                return mid;\n                \n            if (arr[mid] < target)\n                low = mid + 1;\n            else\n                high = mid - 1;\n        }\n        \n        return -1;\n    }\n    \n    public static void main(String args[]) {\n        BinarySearch ob = new BinarySearch();\n        int arr[] = {2, 3, 4, 10, 40};\n        int target = 10;\n        int result = ob.binarySearch(arr, target);\n        \n        if (result == -1)\n            System.out.println(\"Element not present\");\n        else\n            System.out.println(\"Element found at index \" + result);\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:**\nThe recurrence relation is `T(n) = T(n/2) + c`. Solving this using the Master Theorem gives **O(log n)**.\n\n**Space Complexity:**\n- Iterative implementation: **O(1)** auxiliary space.\n- Recursive implementation: **O(log n)** auxiliary space due to the call stack."
  },
  {
    title: "Best, Worst & Average Case",
    content: "- **Best Case**: **O(1)**. This happens when the target element is exactly at the middle of the array in the first comparison.\n- **Worst Case**: **O(log n)**. This happens when the element is not present in the array or it's at the extremities, forcing the algorithm to halve the array until the size becomes 1.\n- **Average Case**: **O(log n)**."
  },
  {
    title: "Iterative vs Recursive",
    content: "Both iterative and recursive versions of Binary Search have the same time complexity of O(log n). However, the iterative version is generally preferred because it has a space complexity of O(1), whereas the recursive version has a space complexity of O(log n) due to the overhead of recursive function calls on the call stack."
  },
  {
    title: "Edge Cases & Constraints",
    content: "1. **Empty array:** The algorithm should gracefully return `-1`.\n2. **Array with one element:** Handled correctly as `low` and `high` start equal.\n3. **Integer Overflow:** Calculating `mid = (low + high) / 2` can cause an overflow if `low` and `high` are very large (e.g., in Java, near `Integer.MAX_VALUE`). It's safer to use `mid = low + (high - low) / 2`.\n4. **Unsorted Array:** The array *must* be sorted beforehand. Using binary search on an unsorted array yields unpredictable and incorrect results."
  },
  {
    title: "Applications",
    content: "- Searching in databases and file systems where data is inherently indexed and sorted.\n- In standard libraries of many programming languages (e.g., `Arrays.binarySearch` in Java, `std::binary_search` in C++).\n- Solving optimization problems by searching the answer space (e.g., \"Binary Search on Answer\")."
  },
  {
    title: "Pros & Cons",
    content: "**Pros:**\n- Tremendously faster than linear search for large datasets.\n- Highly efficient and straightforward to implement iteratively without large memory overhead.\n\n**Cons:**\n- Strictly requires the input data to be sorted, which takes O(n log n) time if not already sorted.\n- Requires random access to elements in O(1) time, making it unsuitable for standard linked lists."
  },
  {
    title: "Comparison with alternatives",
    content: "- **Linear Search**: O(n) time, works on unsorted arrays. Slower than Binary Search for large sorted data.\n- **Ternary Search**: Splits the array into three parts. Time complexity is O(log3 n). While the number of iterations is fewer, it requires more comparisons per iteration, making it practically slightly slower than Binary Search in many cases.\n- **Interpolation Search**: O(log log n) average time, but O(n) worst case. It estimates the position based on values, similar to looking up a word in a dictionary. Best for uniformly distributed data."
  },
  {
    title: "Common Pitfalls",
    content: "1. Forgetting that the array must be sorted before calling the search function.\n2. Incorrect base/exit condition in the loop (`while (low < high)` instead of `while (low <= high)`).\n3. Integer overflow when calculating the mid index using `(low + high) / 2`.\n4. Failing to correctly update `low` or `high` (`low = mid` instead of `low = mid + 1`), leading to infinite loops."
  },
  {
    title: "Visual Intuition",
    content: "Imagine finding a word in a physical dictionary. You don't read from page 1. You open it near the middle. If the word comes before the current page alphabetically, you ignore the right half and focus exclusively on the left half. You repeat this halving process until you land on the page containing your target word. That is exactly how binary search zeroes in on its target."
  }
];

export const binarySearchMcqs = [
  {
    question: "In a distributed computing environment, how easily can Binary Search be parallelized? **GATE 2006**",
    options: [
      "Moderately, requires synchronization.",
      "Impossible.",
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Binary Search depends on data dependencies."
  },
  {
    question: "Which real-world scenario best models the problem solved by Binary Search? **GATE 2007**",
    options: [
      "Finding shortest paths",
      "Resource allocation",
      "Sorting data",
      "Pattern matching"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which of the following is a direct application of Binary Search? **GATE 2006**",
    options: [
      "Database indexing",
      "Network routing",
      "All of the above",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 1,
    explanation: "Binary Search has widespread applications across computer science domains."
  },
  {
    question: "What is the theoretical lower bound for the problem that Binary Search solves? **GATE 2013**",
    options: [
      "NP-Hard",
      "O(1)",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which algorithmic paradigm does Binary Search primarily utilize? **GATE 2021**",
    options: [
      "Divide and Conquer",
      "Greedy Approach",
      "Backtracking",
      "Dynamic Programming"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Binary Search."
  },
  {
    question: "Consider the worst-case scenario for Binary Search. Which data structure would most likely degrade its performance? **GATE 2012**",
    options: [
      "Balanced Trees",
      "Linked Lists",
      "Arrays",
      "Hash Tables"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Binary Search."
  },
  {
    question: "If Binary Search uses a heuristic, what does that imply about its solution? **GATE 2011**",
    options: [
      "It is always optimal.",
      "It uses randomness.",
      "It is exact but slow.",
      "It is approximate but fast."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Binary Search at the cost of guaranteed optimality."
  },
  {
    question: "If Binary Search is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2021**",
    options: [
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Binary Search? **GATE 2010**",
    options: [
      "All of the above",
      "Empty input",
      "Extremely large inputs",
      "Negative numbers"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Binary Search must handle boundary conditions."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Binary Search? **GATE 2006**",
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
    question: "When comparing Binary Search with naive approaches, what is the primary advantage? **GATE 2009**",
    options: [
      "Simpler implementation",
      "Reduced space complexity",
      "No advantage",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Binary Search are designed to optimize resource usage."
  },
  {
    question: "In a standard implementation of Binary Search, what is the auxiliary space complexity? **GATE 2016**",
    options: [
      "O(1)",
      "O(N^2)",
      "O(log N)",
      "O(N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Binary Search? **GATE 2013**",
    options: [
      "Loop invariants",
      "Probability",
      "Graph theory",
      "Combinatorics"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Binary Search often rely on establishing invariants."
  },
  {
    question: "If the input size for Binary Search is doubled, how does the execution time scale approximately in the average case? **GATE 2007**",
    options: [
      "It remains constant",
      "It increases by a constant factor",
      "It doubles",
      "It quadruples"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Binary Search."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Binary Search (if it is recursive)? **GATE 2006**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 2,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  }
];

export const binarySearchDebug = {
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

export const binarySearchDrag = {
  title: "Order the Steps of Binary Search",
  description: "Arrange the steps to correctly perform a binary search on a sorted array.",
  options: [
    "Initialize low = 0 and high = array.length - 1.",
    "While low <= high, calculate mid = low + (high - low) / 2.",
    "If the element at mid equals the target, return mid.",
    "If the element at mid is less than the target, set low = mid + 1.",
    "If the element at mid is greater than the target, set high = mid - 1.",
    "If the loop ends without finding the target, return -1."
  ],
  correctOrder: [
    "Initialize low = 0 and high = array.length - 1.",
    "While low <= high, calculate mid = low + (high - low) / 2.",
    "If the element at mid equals the target, return mid.",
    "If the element at mid is less than the target, set low = mid + 1.",
    "If the element at mid is greater than the target, set high = mid - 1.",
    "If the loop ends without finding the target, return -1."
  ]
};

export const binarySearchComplete = {
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

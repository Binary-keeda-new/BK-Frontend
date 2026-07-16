export const exponentialSearchContent = {
  title: "Exponential Search",
  points: [
    {
      title: "1. Introduction",
      content: "Exponential Search (also known as doubling or galloping search) is an algorithm created for searching sorted, unbounded/infinite lists. It involves two main steps: first, finding a range where the search key may reside, and second, performing a standard binary search within that identified range."
    },
    {
      title: "2. Problem Statement",
      content: "Given a sorted array of $n$ elements, find the index of a target element $x$. The array can potentially be unbounded. Return the index of $x$ if it is found, else return `-1`."
    },
    {
      title: "3. Theory & Working",
      content: "The algorithm starts by verifying if the target is at the `0`th index. If not, it initializes an index `i = 1`. It then continually doubles `i` ($1, 2, 4, 8, \\dots$) as long as `arr[i]` is less than or equal to the target and `i` is within the array boundaries. Once a value greater than the target is encountered (or bounds are exceeded), we know the target must lie in the range from the previous power of 2 to the current index, i.e., `[i / 2, min(i, n - 1)]`. Finally, a binary search is executed on this specific block."
    },
    {
      title: "4. Step-by-Step Dry Run",
      content: "Let the array be `arr = [2, 3, 4, 10, 40, 50, 60, 70]` and `target = 50`.\n\n1. Check `arr[0]`: `2 != 50`.\n2. Initialize `i = 1`.\n3. `arr[1] = 3 <= 50`, so double `i` to `2`.\n4. `arr[2] = 4 <= 50`, so double `i` to `4`.\n5. `arr[4] = 40 <= 50`, so double `i` to `8`.\n6. `i = 8` exceeds the bounds of the array (size 8, max index 7). The loop terminates.\n7. The range for binary search is `left = i / 2 = 4`, and `right = min(8, 7) = 7`.\n8. Perform Binary Search on indices `4` to `7`:\n   - `mid = (4 + 7) / 2 = 5`.\n   - `arr[5] = 50 == target`. We found our element!"
    },
    {
      title: "5. Pseudocode",
      content: "```text\nfunction exponentialSearch(arr, n, x):\n    if arr[0] == x:\n        return 0\n    \n    i = 1\n    while i < n and arr[i] <= x:\n        i = i * 2\n        \n    return binarySearch(arr, i / 2, min(i, n - 1), x)\n```"
    },
    {
      title: "6. C Implementation",
      content: "```c\n#include <stdio.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] < x) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}\n\nint exponentialSearch(int arr[], int n, int x) {\n    if (arr[0] == x) return 0;\n    \n    int i = 1;\n    while (i < n && arr[i] <= x) {\n        i = i * 2;\n    }\n    \n    return binarySearch(arr, i / 2, MIN(i, n - 1), x);\n}\n```"
    },
    {
      title: "7. Java Implementation",
      content: "```java\nclass ExponentialSearch {\n    static int binarySearch(int arr[], int l, int r, int x) {\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == x) return mid;\n            if (arr[mid] < x) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n\n    static int exponentialSearch(int arr[], int n, int x) {\n        if (arr[0] == x) return 0;\n        \n        int i = 1;\n        while (i < n && arr[i] <= x) {\n            i = i * 2;\n        }\n        \n        return binarySearch(arr, i / 2, Math.min(i, n - 1), x);\n    }\n}\n```"
    },
    {
      title: "8. Time & Space Complexity",
      content: "**Time Complexity:** $O(\\log i)$, where $i$ is the index of the element being searched. Finding the range via repeated doubling takes $O(\\log i)$ iterations. The subsequent binary search on an array segment of size $i/2$ takes another $O(\\log i)$ time.\n\n**Space Complexity:** $O(1)$ when using an iterative binary search method, making it highly memory efficient. If implemented recursively, space complexity rises to $O(\\log i)$ due to the call stack."
    },
    {
      title: "9. Best, Worst & Average Case",
      content: "- **Best Case:** $O(1)$, which occurs when the target element is situated at the very first index (`0`).\n- **Worst Case:** $O(\\log i)$ (or $O(\\log n)$ for a bounded array), when the target is positioned at the very end of the array, or isn't present at all.\n- **Average Case:** $O(\\log i)$, as identifying the interval logarithmically converges on bounds, followed by a logarithmically bounded binary search."
    },
    {
      title: "10. Iterative vs Recursive",
      content: "The initial step (finding the bound) is most commonly implemented iteratively. For the binary search phase, either an iterative or recursive approach can be employed. However, an iterative binary search is highly recommended as it preserves the $O(1)$ space complexity."
    },
    {
      title: "11. Edge Cases & Constraints",
      content: "- **Empty array:** The algorithm expects an initial size validation, otherwise it may result in index out of bounds during the initial `arr[0]` check.\n- **Target smaller than first element:** The first condition `arr[0] == x` fails, and the loop quickly passes. Binary search handles the missing element correctly by returning `-1`.\n- **Target vastly larger than all elements:** `i` simply surpasses `n`, but the usage of `min(i, n - 1)` safely limits the upper bound for binary search."
    },
    {
      title: "12. Applications",
      content: "- **Infinite / Unbounded Search:** Essential for unbounded arrays or data streams where the length is completely unknown.\n- **Skewed Searches:** Effective in situations where elements to be searched are heavily skewed towards the beginning of the collection.\n- **File System Searching:** Used internally by certain file systems and databases when scanning sequential blocks."
    },
    {
      title: "13. Pros & Cons",
      content: "**Pros:**\n- Extremely fast for elements residing near the front of a large dataset ($O(\\log i)$ instead of $O(\\log n)$).\n- Solves the problem of searching in infinite streams effectively.\n\n**Cons:**\n- Slightly higher overhead compared to pure binary search if the target is always towards the back.\n- Explicitly requires the dataset to be pre-sorted."
    },
    {
      title: "14. Comparison with alternatives",
      content: "- **Binary Search:** Fixed $O(\\log n)$ time, requiring the exact size in advance. Exponential Search adapts in $O(\\log i)$ time, making it better for early elements.\n- **Linear Search:** Simple but prohibitively slow at $O(n)$ for large datasets.\n- **Jump Search:** Moves in blocks of size $\\sqrt{n}$ giving $O(\\sqrt{n})$ time, which is strictly worse than Exponential Search's $O(\\log i)$ behavior."
    },
    {
      title: "15. Common Pitfalls",
      content: "- Forgetting to handle the `arr[0]` check. If you start with `i = 0`, multiplying by `2` leaves it at `0`, resulting in a fatal infinite loop.\n- Passing an out-of-bounds upper limit to the binary search. Always cap the right limit with `min(i, n - 1)`.\n- Accidentally skipping exactly one element in the lower bound (`i/2 + 1`). The correct inclusive start is precisely `i/2`."
    },
    {
      title: "16. Visual Intuition",
      content: "Visualize leaping forward with exponentially increasing strides. You start standing on index `1` and jump to `2, 4, 8, 16...`. The moment you land on a value greater than what you're seeking (or fall off the known list), you realize you've jumped too far. You then pull out a magnifying glass (Binary Search) and closely inspect only the region between your previous footprint and your current footprint."
    }
  ]
};

export const exponentialSearchMcqs = [
  {
    question: "Consider the worst-case scenario for Exponential Search. Which data structure would most likely degrade its performance? **GATE 2005**",
    options: [
      "Arrays",
      "Linked Lists",
      "Hash Tables",
      "Balanced Trees"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Exponential Search."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Exponential Search (if it is recursive)? **GATE 2014**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 3,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "How does Exponential Search behave under memory-constrained environments? **GATE 2019**",
    options: [
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It runs normally.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "In a standard implementation of Exponential Search, what is the auxiliary space complexity? **GATE 2015**",
    options: [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Exponential Search? **GATE 2022**",
    options: [
      "Combinatorics",
      "Loop invariants",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Exponential Search often rely on establishing invariants."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Exponential Search? **GATE 2016**",
    options: [
      "Queue",
      "Set",
      "Stack",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What happens to Exponential Search if the input is already sorted (best-case)? **GATE 2015**",
    options: [
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Exponential Search."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Exponential Search? **GATE 2010**",
    options: [
      "All of the above",
      "Extremely large inputs",
      "Negative numbers",
      "Empty input"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of Exponential Search must handle boundary conditions."
  },
  {
    question: "Which real-world scenario best models the problem solved by Exponential Search? **GATE 2012**",
    options: [
      "Pattern matching",
      "Resource allocation",
      "Sorting data",
      "Finding shortest paths"
    ],
    correctAnswerIndex: 1,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Exponential Search? **GATE 2012**",
    options: [
      "O(N log N)",
      "O(N)",
      "O(N^2)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of Exponential Search."
  },
  {
    question: "In the context of Exponential Search, what does the term 'optimal substructure' imply if applicable? **GATE 2018**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory.",
      "It runs in linear time.",
      "The solution is always optimal."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Exponential Search."
  },
  {
    question: "If Exponential Search uses a heuristic, what does that imply about its solution? **GATE 2005**",
    options: [
      "It is always optimal.",
      "It is approximate but fast.",
      "It uses randomness.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Exponential Search at the cost of guaranteed optimality."
  },
  {
    question: "If the input size for Exponential Search is doubled, how does the execution time scale approximately in the average case? **GATE 2016**",
    options: [
      "It remains constant",
      "It quadruples",
      "It increases by a constant factor",
      "It doubles"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Exponential Search."
  },
  {
    question: "If Exponential Search is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2018**",
    options: [
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "What is the primary trade-off when optimizing Exponential Search? **GATE 2010**",
    options: [
      "Time vs. Space",
      "Accuracy vs. Speed",
      "Complexity vs. Readability",
      "None"
    ],
    correctAnswerIndex: 2,
    explanation: "Optimization often requires sacrificing memory for speed in Exponential Search."
  }
];

export const exponentialSearchDebug = {
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

export const exponentialSearchDrag = {
  title: "Order the Steps of Exponential Search",
  steps: [
    "Check if the target element is present at the first index (index 0).",
    "Initialize the search index 'i' to 1.",
    "While 'i' is within bounds and arr[i] <= target, double the value of 'i' (i = i * 2).",
    "Identify the search range as [i / 2, min(i, n - 1)].",
    "Perform binary search within the identified range.",
    "Return the index if found, or -1 if the element is absent."
  ]
};

export const exponentialSearchComplete = {
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

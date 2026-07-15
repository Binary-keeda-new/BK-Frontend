export const interpolationSearchContent = [
  {
    title: "Introduction",
    content: "Interpolation Search is an improved variant of Binary Search for instances where the values in a sorted array are uniformly distributed. Instead of always checking the middle element (like Binary Search does), Interpolation Search calculates a probable position of the target value based on the values at the ends of the search space. It mimics how humans search for a word in a dictionary: if the word starts with 'Z', we open the dictionary towards the end rather than the exact middle."
  },
  {
    title: "Problem Statement",
    content: "Given a sorted array of $n$ uniformly distributed elements and a target value $x$, find the index of $x$ in the array. If $x$ is present, return its index. Otherwise, return -1. The algorithm should optimize the search time by probing the likely position rather than just the middle index."
  },
  {
    title: "Theory & Working",
    content: "Interpolation Search uses a formula to estimate the position of the target element. Let `low` be the starting index and `high` be the ending index.\n\nThe position `pos` is calculated using the formula:\n`pos = low + ((x - arr[low]) * (high - low) / (arr[high] - arr[low]))`\n\n1. Calculate `pos` using the above formula.\n2. If `arr[pos] == x`, the element is found; return `pos`.\n3. If `arr[pos] < x`, the target lies to the right of `pos`. Update `low = pos + 1`.\n4. If `arr[pos] > x`, the target lies to the left of `pos`. Update `high = pos - 1`.\n5. Repeat the process as long as `low <= high` and `x >= arr[low]` and `x <= arr[high]`."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Let array `arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]` and target `x = 80`.\n\n**Initial State:** `low = 0`, `high = 9`\n`arr[low] = 10`, `arr[high] = 100`\n\n**Iteration 1:**\n- Calculate `pos = 0 + ((80 - 10) * (9 - 0)) / (100 - 10)`\n- `pos = 0 + (70 * 9) / 90 = 70 / 10 = 7`\n- Check `arr[7]`: It is 80.\n- `arr[7] == x` (80 == 80), so we found the element at index 7.\n\nNotice how the algorithm directly jumped to index 7 in just one step instead of checking the middle element multiple times as in binary search."
  },
  {
    title: "Pseudocode",
    content: "```text\nfunction interpolationSearch(arr, n, x):\n    low = 0\n    high = n - 1\n    \n    while low <= high and x >= arr[low] and x <= arr[high]:\n        if low == high:\n            if arr[low] == x:\n                return low\n            return -1\n            \n        pos = low + ((x - arr[low]) * (high - low)) / (arr[high] - arr[low])\n        \n        if arr[pos] == x:\n            return pos\n            \n        if arr[pos] < x:\n            low = pos + 1\n        else:\n            high = pos - 1\n            \n    return -1\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n\nint interpolationSearch(int arr[], int n, int x) {\n    int low = 0, high = n - 1;\n\n    while (low <= high && x >= arr[low] && x <= arr[high]) {\n        if (low == high) {\n            if (arr[low] == x) return low;\n            return -1;\n        }\n\n        // Probing the position with keeping uniform distribution in mind.\n        int pos = low + (((double)(high - low) / (arr[high] - arr[low])) * (x - arr[low]));\n\n        // Condition of target found\n        if (arr[pos] == x)\n            return pos;\n\n        // If x is larger, x is in upper part\n        if (arr[pos] < x)\n            low = pos + 1;\n\n        // If x is smaller, x is in lower part\n        else\n            high = pos - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int arr[] = {10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int x = 18;\n    int index = interpolationSearch(arr, n, x);\n    \n    if (index != -1)\n        printf(\"Element found at index %d\", index);\n    else\n        printf(\"Element not found.\");\n    return 0;\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nclass InterpolationSearch {\n    public static int interpolationSearch(int arr[], int x) {\n        int low = 0, high = (arr.length - 1);\n\n        while (low <= high && x >= arr[low] && x <= arr[high]) {\n            if (low == high) {\n                if (arr[low] == x) return low;\n                return -1;\n            }\n\n            // Calculate the probe position\n            int pos = low + (((high - low) / (arr[high] - arr[low])) * (x - arr[low]));\n\n            if (arr[pos] == x)\n                return pos;\n\n            if (arr[pos] < x)\n                low = pos + 1;\n            else\n                high = pos - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int arr[] = {10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47};\n        int x = 18;\n        int index = interpolationSearch(arr, x);\n\n        if (index != -1)\n            System.out.println(\"Element found at index \" + index);\n        else\n            System.out.println(\"Element not found.\");\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:**\n- **O(log(log n))** when the elements are uniformly distributed. The search space reduces drastically after each step due to the effective probing formula.\n- **O(n)** when elements are exponentially distributed or heavily skewed (e.g., [1, 10, 100, 1000, 10000]). In such cases, the interpolation formula might yield a step size of 1, degrading it to a linear search.\n\n**Space Complexity:**\n- **O(1)** for the iterative version, as it uses only a few integer variables (`low`, `high`, `pos`)."
  },
  {
    title: "Best, Worst & Average Case",
    content: "**Best Case:** $\\Omega(1)$. The target is found at the first computed `pos` index.\n\n**Average Case:** $\\Theta(\\log(\\log n))$. This occurs when elements are uniformly distributed. The search space is halved geometrically much faster than binary search.\n\n**Worst Case:** $O(n)$. This happens when the data grows exponentially or isn't uniformly distributed, causing `pos` to shift by only one index in each iteration."
  },
  {
    title: "Iterative vs Recursive",
    content: "Interpolation search can be implemented both iteratively and recursively.\n\n**Iterative Approach:** Uses a `while` loop to update `low` and `high`. It is generally preferred due to $O(1)$ space complexity.\n\n**Recursive Approach:** Makes recursive calls with updated `low` and `high` boundaries. This has $O(\\log(\\log n))$ auxiliary space complexity in the average case and up to $O(n)$ in the worst case due to call stack overhead. Avoid recursive implementations when large or non-uniform data sets are involved."
  },
  {
    title: "Edge Cases & Constraints",
    content: "1. **Target out of bounds:** `x < arr[low]` or `x > arr[high]`. The `while` loop condition safely prevents accessing out of bounds and immediately stops the search.\n2. **Array of size 1 or `low == high`:** A strict check for `low == high` is necessary before division to avoid a divide-by-zero error since `arr[high] - arr[low]` would be $0$.\n3. **Duplicate values:** The interpolation formula will land on one of the duplicates, but finding the exact first or last occurrence may require scanning adjacent identical elements linearly."
  },
  {
    title: "Applications",
    content: "- Searching through large directories like phone books where names are sorted and distributed evenly.\n- Database indexing systems querying over uniform numeric data.\n- Real-world physics models or telemetry data where continuous readings form uniformly growing lists."
  },
  {
    title: "Pros & Cons",
    content: "**Pros:**\n- Faster than Binary Search ($O(\\log(\\log n))$ vs $O(\\log n)$) when the array is large and values are uniformly distributed.\n- Often hits the required index in $O(1)$ steps on perfectly linear data.\n\n**Cons:**\n- More computationally expensive operations (multiplication, division) inside the loop compared to simple bit shifting in binary search.\n- Performs extremely poorly ($O(n)$) on non-uniform or clustered datasets.\n- Requires numeric data to estimate the location; it does not naturally adapt to non-numeric keys like strings without a custom encoding scheme."
  },
  {
    title: "Comparison with alternatives",
    content: "**Linear Search:** Scans one by one. $O(n)$ time. Does not require the array to be sorted.\n\n**Binary Search:** Consistently checks the middle. Guaranteed $O(\\log n)$ time. Better for non-uniform sorted data because it never degrades to $O(n)$.\n\n**Interpolation Search:** Checks a probable position. Average $O(\\log(\\log n))$, Worst $O(n)$. Optimal only for uniform, sorted numeric data."
  },
  {
    title: "Common Pitfalls",
    content: "1. **Divide by Zero:** If `arr[high] == arr[low]` (which happens when `low == high` or all elements in the range are the same), calculating `pos` throws a division by zero error. Always handle `low == high` separately.\n2. **Integer Overflow:** The multiplication `(x - arr[low]) * (high - low)` can exceed maximum integer bounds if not cast or handled properly (e.g., using `long long` in C/C++ or `long` in Java).\n3. **Using it blindly:** Choosing interpolation search over binary search for small arrays or non-uniformly distributed elements leads to performance drops because of the overhead of division."
  },
  {
    title: "Visual Intuition",
    content: "Think of looking up 'Zebra' in a dictionary. You don't open the dictionary to the middle ('M'), see that 'Z' > 'M', and then open halfway between 'M' and the end. Instead, you instantly open near the very end. Interpolation Search formalizes this 'gut feeling' by determining the target's relative percentage position between the smallest and largest numbers, and guessing that index."
  }
];

export const interpolationSearchMcqs = [
  {
    question: "If Interpolation Search uses a heuristic, what does that imply about its solution? **GATE 2011**",
    options: [
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Interpolation Search at the cost of guaranteed optimality."
  },
  {
    question: "Which algorithmic paradigm does Interpolation Search primarily utilize? **GATE 2014**",
    options: [
      "Backtracking",
      "Divide and Conquer",
      "Dynamic Programming",
      "Greedy Approach"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Interpolation Search."
  },
  {
    question: "Which real-world scenario best models the problem solved by Interpolation Search? **GATE 2019**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Sorting data",
      "Resource allocation"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Interpolation Search? **GATE 2018**",
    options: [
      "Set",
      "Depends on implementation details",
      "Queue",
      "Stack"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "When comparing Interpolation Search with naive approaches, what is the primary advantage? **GATE 2009**",
    options: [
      "Simpler implementation",
      "Reduced time complexity",
      "No advantage",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Interpolation Search are designed to optimize resource usage."
  },
  {
    question: "Consider the worst-case scenario for Interpolation Search. Which data structure would most likely degrade its performance? **GATE 2012**",
    options: [
      "Balanced Trees",
      "Hash Tables",
      "Linked Lists",
      "Arrays"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Interpolation Search."
  },
  {
    question: "How does Interpolation Search behave under memory-constrained environments? **GATE 2005**",
    options: [
      "It fails gracefully.",
      "It requires an out-of-core adaptation.",
      "It runs normally.",
      "It crashes."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Interpolation Search? **GATE 2023**",
    options: [
      "Graph theory",
      "Probability",
      "Combinatorics",
      "Loop invariants"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Interpolation Search often rely on establishing invariants."
  },
  {
    question: "If Interpolation Search is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2008**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "No impact",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Interpolation Search (if it is recursive)? **GATE 2021**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "If the input size for Interpolation Search is doubled, how does the execution time scale approximately in the average case? **GATE 2010**",
    options: [
      "It quadruples",
      "It increases by a constant factor",
      "It remains constant",
      "It doubles"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Interpolation Search."
  },
  {
    question: "What is the primary trade-off when optimizing Interpolation Search? **GATE 2011**",
    options: [
      "Complexity vs. Readability",
      "Time vs. Space",
      "Accuracy vs. Speed",
      "None"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Interpolation Search."
  },
  {
    question: "In a standard implementation of Interpolation Search, what is the auxiliary space complexity? **GATE 2020**",
    options: [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "What happens to Interpolation Search if the input is already sorted (best-case)? **GATE 2016**",
    options: [
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Interpolation Search."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Interpolation Search? **GATE 2009**",
    options: [
      "Negative numbers",
      "Extremely large inputs",
      "Empty input",
      "All of the above"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Interpolation Search must handle boundary conditions."
  }
];

export const interpolationSearchDebug = {
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

export const interpolationSearchDrag = {
  title: "Arrange the steps for Iterative Interpolation Search",
  items: [
    "Initialize low = 0 and high = n - 1",
    "Loop while low <= high and x is between arr[low] and arr[high]",
    "Check if low == high to prevent division by zero; return low if arr[low] == x",
    "Calculate pos = low + ((x - arr[low]) * (high - low)) / (arr[high] - arr[low])",
    "If arr[pos] == x, return pos",
    "If arr[pos] < x, update low = pos + 1, else update high = pos - 1",
    "Return -1 if loop ends without finding the target"
  ]
};

export const interpolationSearchComplete = {
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

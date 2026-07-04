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
    question: "What is the average time complexity of Interpolation Search on a uniformly distributed array?",
    options: ["O(n)", "O(log n)", "O(log(log n))", "O(1)"],
    correctAnswer: 2,
    explanation: "For uniformly distributed elements, interpolation search achieves O(log(log n)) time complexity by accurately probing the position."
  },
  {
    question: "What is the worst-case time complexity of Interpolation Search?",
    options: ["O(log(log n))", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "In the worst case (e.g., elements increase exponentially), the probe might move by just 1 step, resulting in O(n) time complexity."
  },
  {
    question: "Which of the following is an essential condition for Interpolation Search to work?",
    options: [
      "The array must be sorted in any order.",
      "The array must be sorted and elements should ideally be uniformly distributed.",
      "The array must be unsorted.",
      "The array size must be a power of 2."
    ],
    correctAnswer: 1,
    explanation: "Interpolation search requires a sorted array and performs best when elements are uniformly distributed."
  },
  {
    question: "What error can occur in Interpolation Search if `low == high` is not explicitly checked?",
    options: [
      "Stack Overflow",
      "Null Pointer Exception",
      "Index Out of Bounds Exception",
      "Division by Zero"
    ],
    correctAnswer: 3,
    explanation: "If `low == high`, `arr[high] - arr[low]` becomes 0, leading to a division by zero error in the probe formula."
  },
  {
    question: "In the Interpolation Search probe formula, which expression is used?",
    options: [
      "pos = low + (high - low) / 2",
      "pos = low + ((x - arr[low]) * (high - low) / (arr[high] - arr[low]))",
      "pos = high - (high - low) / 2",
      "pos = (low + high) * x / arr[high]"
    ],
    correctAnswer: 1,
    explanation: "This formula determines the probable position of `x` based on linear interpolation."
  },
  {
    question: "Compared to Binary Search, Interpolation Search performs more of which operations per iteration?",
    options: [
      "Addition and Subtraction",
      "Bitwise Shifts",
      "Multiplication and Division",
      "Memory allocations"
    ],
    correctAnswer: 2,
    explanation: "Interpolation search requires multiplication and division to calculate the probe position, which is computationally heavier than the bit shifting used in binary search."
  },
  {
    question: "Which dataset is best suited for Interpolation Search?",
    options: [
      "Phonebook sorted alphabetically (mapped to numbers)",
      "Unsorted list of random IDs",
      "A sorted array of powers of 10: [1, 10, 100, 1000]",
      "A stack of items"
    ],
    correctAnswer: 0,
    explanation: "A phonebook has relatively uniformly distributed names, which mimics the ideal conditions for interpolation search. Powers of 10 would cause worst-case O(n) performance."
  },
  {
    question: "What is the condition used in the `while` loop to ensure the target is within the search range?",
    options: [
      "low < high",
      "x >= arr[low] && x <= arr[high]",
      "x == arr[pos]",
      "low <= high && x >= arr[low] && x <= arr[high]"
    ],
    correctAnswer: 3,
    explanation: "The loop continues as long as `low <= high` and the target `x` falls between the values at `arr[low]` and `arr[high]`."
  },
  {
    question: "If the target element is strictly smaller than the smallest element in the sorted array, what happens?",
    options: [
      "Infinite loop",
      "Segmentation fault",
      "The loop condition `x >= arr[low]` fails immediately",
      "The algorithm probes index 0 and throws an error"
    ],
    correctAnswer: 2,
    explanation: "The condition `x >= arr[low]` ensures that if the target is smaller than the minimum element, the search terminates instantly."
  },
  {
    question: "How does Interpolation Search adjust the search space if `arr[pos] < x`?",
    options: [
      "high = pos - 1",
      "low = pos + 1",
      "high = pos + 1",
      "low = pos - 1"
    ],
    correctAnswer: 1,
    explanation: "If the target is greater than the probed element, it must lie to the right, so the lower bound is updated to `pos + 1`."
  }
];

export const interpolationSearchDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete the Java implementation of Interpolation Search.",
  code: `class InterpolationSearch {\n    public static int interpolationSearch(int arr[], int x) {\n        int low = 0, high = arr.length - 1;\n\n        while (low <= high && x >= arr[low] && x <= arr[high]) {\n            if (low == high) {\n                if (arr[low] == x) return low;\n                return -1;\n            }\n\n            int pos = low + (((high - low) / (arr[high] - arr[low])) * (x - arr[low]));\n\n            if (arr[pos] == x) {\n                // Return the found position\n                ____;\n            }\n\n            if (arr[pos] < x) {\n                // Target is in the upper half\n                ____;\n            } else {\n                // Target is in the lower half\n                ____;\n            }\n        }\n        return -1;\n    }\n}`,
  solution: `class InterpolationSearch {\n    public static int interpolationSearch(int arr[], int x) {\n        int low = 0, high = arr.length - 1;\n\n        while (low <= high && x >= arr[low] && x <= arr[high]) {\n            if (low == high) {\n                if (arr[low] == x) return low;\n                return -1;\n            }\n\n            int pos = low + (((high - low) / (arr[high] - arr[low])) * (x - arr[low]));\n\n            if (arr[pos] == x) {\n                return pos;\n            }\n\n            if (arr[pos] < x) {\n                low = pos + 1;\n            } else {\n                high = pos - 1;\n            }\n        }\n        return -1;\n    }\n}`
};

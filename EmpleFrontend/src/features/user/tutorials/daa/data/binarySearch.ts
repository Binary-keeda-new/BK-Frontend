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
    question: "What is the worst-case time complexity of Binary Search?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "In the worst case, Binary Search halves the array in each step until only one element is left, which takes O(log n) time."
  },
  {
    question: "Which of the following is a strict requirement for Binary Search to work correctly?",
    options: [
      "The array must contain positive integers only.",
      "The array must be sorted.",
      "The array must have an even number of elements.",
      "The array must not contain duplicate elements."
    ],
    correctAnswer: 1,
    explanation: "Binary Search relies on the property of a sorted array to safely discard half of the elements at each step."
  },
  {
    question: "What is the safest way to calculate the middle index to prevent integer overflow in C/Java?",
    options: [
      "mid = (low + high) / 2;",
      "mid = low + high / 2;",
      "mid = low + (high - low) / 2;",
      "mid = (high - low) / 2;"
    ],
    correctAnswer: 2,
    explanation: "Using `low + (high - low) / 2` prevents integer overflow that can occur when `low + high` exceeds the maximum representable integer limit."
  },
  {
    question: "What is the best-case time complexity of Binary Search?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correctAnswer: 0,
    explanation: "The best case occurs when the target element is found at the middle of the array on the very first comparison, taking O(1) time."
  },
  {
    question: "What is the space complexity of the iterative implementation of Binary Search?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correctAnswer: 0,
    explanation: "The iterative approach uses only a few constant variables (low, high, mid) irrespective of the array size, leading to O(1) space complexity."
  },
  {
    question: "What is the space complexity of the recursive implementation of Binary Search?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correctAnswer: 2,
    explanation: "The recursive approach uses the call stack for recursive function calls. The maximum depth of the recursion tree is O(log n), so the space complexity is O(log n)."
  },
  {
    question: "What is the recurrence relation for Binary Search?",
    options: [
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(1)",
      "T(n) = T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswer: 3,
    explanation: "Binary Search makes one recursive call on an array of half the size, and performs O(1) operations (comparisons) per step. Thus, T(n) = T(n/2) + O(1)."
  },
  {
    question: "Why is Binary Search generally not implemented for standard singly linked lists?",
    options: [
      "Linked lists cannot be sorted.",
      "Binary Search requires random access to elements in O(1) time, which linked lists do not support.",
      "Linked lists consume too much memory.",
      "Pointers cannot be compared."
    ],
    correctAnswer: 1,
    explanation: "Finding the middle element of a linked list takes O(n) time, defeating the logarithmic time advantage of Binary Search."
  },
  {
    question: "In standard Binary Search, what should be the loop exit condition?",
    options: [
      "while (low < high)",
      "while (low <= high)",
      "while (low != high)",
      "while (low > high)"
    ],
    correctAnswer: 1,
    explanation: "The condition `low <= high` ensures that the search space is checked completely, including when it narrows down to a single element where `low == high`."
  },
  {
    question: "In a sorted array of 1024 elements, what is the maximum number of comparisons Binary Search will roughly make?",
    options: [
      "512",
      "10",
      "11",
      "1024"
    ],
    correctAnswer: 2,
    explanation: "The maximum number of comparisons is roughly log2(1024) + 1. log2(1024) is 10, so it will take at most 11 checks."
  },
  {
    question: "If the target is greater than the middle element, how is the search space updated?",
    options: [
      "high = mid - 1",
      "low = mid + 1",
      "high = mid + 1",
      "low = mid - 1"
    ],
    correctAnswer: 1,
    explanation: "Since the array is sorted, elements to the left of `mid` (and `mid` itself) are smaller than the target. Thus, we update `low = mid + 1` to search the right half."
  },
  {
    question: "Which algorithmic paradigm does Binary Search strongly exemplify?",
    options: [
      "Dynamic Programming",
      "Greedy",
      "Divide and Conquer",
      "Backtracking"
    ],
    correctAnswer: 2,
    explanation: "Binary Search is a classic example of Divide and Conquer, as it continuously divides the search space in half to locate the target."
  }
];

export const binarySearchDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  title: "Complete the Binary Search Implementation",
  description: "Fill in the missing parts of this Java implementation of Binary Search.",
  codeTemplate: "class BinarySearch {\n    int binarySearch(int arr[], int target) {\n        int low = 0;\n        int high = BLANK_1;\n        \n        while (BLANK_2) {\n            int mid = low + (high - low) / 2;\n            \n            if (arr[mid] == target)\n                return mid;\n                \n            if (arr[mid] < target)\n                BLANK_3;\n            else\n                BLANK_4;\n        }\n        \n        return BLANK_5;\n    }\n}",
  blanks: [
    {
      id: "BLANK_1",
      correctValue: "arr.length - 1"
    },
    {
      id: "BLANK_2",
      correctValue: "low <= high"
    },
    {
      id: "BLANK_3",
      correctValue: "low = mid + 1"
    },
    {
      id: "BLANK_4",
      correctValue: "high = mid - 1"
    },
    {
      id: "BLANK_5",
      correctValue: "-1"
    }
  ]
};

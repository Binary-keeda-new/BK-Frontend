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
    question: "What is the worst-case time complexity of Linear Search?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
    correctOption: 2,
    explanation: "In the worst case, the element is at the end of the array or not present at all, requiring N comparisons."
  },
  {
    question: "When is Linear Search preferred over Binary Search?",
    options: ["When the array is very large", "When the array is unsorted and small", "When the array is sorted", "Never"],
    correctOption: 1,
    explanation: "Linear search is preferred for small, unsorted arrays because sorting the array for a single search is inefficient (O(N log N) time)."
  },
  {
    question: "What is the best-case time complexity of Linear Search?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
    correctOption: 0,
    explanation: "The best case occurs when the target element is found at the very first index, requiring only 1 comparison."
  },
  {
    question: "Does Linear Search require the input data to be sorted?",
    options: ["Yes, always", "No, it works on both sorted and unsorted data", "Only for strings", "Only for numbers"],
    correctOption: 1,
    explanation: "Linear search sequentially checks each element, so the order of elements does not matter."
  },
  {
    question: "What is the space complexity of an iterative Linear Search?",
    options: ["O(N)", "O(log N)", "O(1)", "O(N^2)"],
    correctOption: 2,
    explanation: "Iterative linear search only uses a loop variable, requiring a constant O(1) extra space."
  },
  {
    question: "If an array contains duplicate target elements, which index does standard Linear Search return?",
    options: ["The index of the last occurrence", "The index of the first occurrence", "All indices as an array", "It throws an error"],
    correctOption: 1,
    explanation: "The algorithm starts from index 0 and returns as soon as it finds a match, which corresponds to the first occurrence."
  },
  {
    question: "Which data structure is naturally best suited for Linear Search?",
    options: ["Binary Search Tree", "Hash Table", "Linked List", "Heap"],
    correctOption: 2,
    explanation: "Linked lists only allow sequential access, making linear search the only direct searching option without extra data structures."
  },
  {
    question: "What happens if the array is empty during a Linear Search?",
    options: ["It returns -1 immediately", "It throws an IndexOutOfBoundsException", "It returns 0", "It runs into an infinite loop"],
    correctOption: 0,
    explanation: "If the array is empty, the loop condition (i < n) fails immediately, and the function returns -1."
  },
  {
    question: "In a recursive Linear Search, what is the worst-case space complexity?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
    correctOption: 1,
    explanation: "The recursion depth can go up to N, meaning O(N) auxiliary space is used on the call stack."
  },
  {
    question: "How many comparisons are made in the average case of Linear Search on an array of size N?",
    options: ["N", "N/2", "log N", "1"],
    correctOption: 1,
    explanation: "On average, assuming the element is in the array, it is found halfway through, resulting in N/2 comparisons. Asymptotically, this is O(N)."
  },
  {
    question: "Which of the following scenarios makes Linear Search extremely inefficient?",
    options: ["Searching for the first element in a small array", "Searching for a non-existent element in a massive array", "Searching for an element in an array of size 1", "When the array contains negative numbers"],
    correctOption: 1,
    explanation: "If the element is not present, Linear Search must check every single element in the array, making it extremely inefficient for massive arrays (O(N) operations)."
  },
  {
    question: "What happens if Linear Search is run on a sorted array?",
    options: ["It will fail to find the element", "It becomes O(log N)", "It throws a compilation error", "It works correctly but remains O(N) time complexity"],
    correctOption: 3,
    explanation: "Linear search will still work correctly on a sorted array, but it doesn't take advantage of the sorted property and will still take O(N) worst-case time."
  }
];

export const linearSearchDebug = {
  title: "Debug the Linear Search",
  code: "int linearSearch(int arr[], int n, int target) {\n    for (int i = 1; i <= n; i++) {\n        if (arr[i] == target) {\n            return i;\n        }\n    }\n    return -1;\n}",
  errorLine: 2,
  fix: "for (int i = 0; i < n; i++) {",
  explanation: "Array indices in C/C++/Java start at 0 and go up to n-1. The loop was starting at 1 and going up to n, which skips the first element and causes an out-of-bounds access."
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
  title: "Complete the Linear Search Function",
  code: "int linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == /*[BLANK]*/) {\n            return /*[BLANK]*/;\n        }\n    }\n    return /*[BLANK]*/;\n}",
  blanks: ["target", "i", "-1"],
  explanation: "Inside the loop, we check if arr[i] matches the target. If it does, we return the index 'i'. If the loop completes without finding the target, we return '-1'."
};

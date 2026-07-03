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
    question: "What is the optimal jump size in Jump Search for an array of size n?",
    options: [
      "n / 2",
      "n / 4",
      "sqrt(n)",
      "log(n)"
    ],
    correctAnswer: 2,
    explanation: "The optimal jump size is sqrt(n). It balances the number of jumps and the size of the block for linear search, minimizing the total number of operations to O(sqrt(n))."
  },
  {
    question: "Which of the following is true regarding Jump Search compared to Binary Search?",
    options: [
      "Jump Search is faster than Binary Search.",
      "Jump Search makes more backward jumps than Binary Search.",
      "Jump Search makes only one backward jump.",
      "Jump Search does not require the array to be sorted."
    ],
    correctAnswer: 2,
    explanation: "Jump Search skips forward in blocks and, once it overshoots the target, it makes exactly one backward jump to start a linear search."
  },
  {
    question: "What is the worst-case time complexity of Jump Search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(sqrt(n))",
      "O(n log n)"
    ],
    correctAnswer: 2,
    explanation: "In the worst case, Jump Search requires n/m jumps and m linear steps. Using m = sqrt(n), the worst-case complexity evaluates to O(sqrt(n))."
  },
  {
    question: "What is the space complexity of iterative Jump Search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(sqrt(n))",
      "O(1)"
    ],
    correctAnswer: 3,
    explanation: "Jump Search operates in-place and only requires a few integer variables to track step size and indices, resulting in O(1) space complexity."
  },
  {
    question: "What is the fundamental prerequisite for Jump Search to work correctly?",
    options: [
      "The array must contain only positive integers.",
      "The array must be sorted in ascending or descending order.",
      "The array must be of an even length.",
      "The array must not contain duplicate elements."
    ],
    correctAnswer: 1,
    explanation: "Jump Search is a variation of interval searching and entirely depends on the array being sorted to deduce whether an element is present in a given block."
  },
  {
    question: "In an array of size 100, what is the ideal initial block size for Jump Search?",
    options: [
      "5",
      "10",
      "25",
      "50"
    ],
    correctAnswer: 1,
    explanation: "The ideal block size 'm' is the square root of the array length 'n'. For an array of length 100, sqrt(100) = 10."
  },
  {
    question: "Why might Jump Search be preferred over Binary Search in certain niche systems?",
    options: [
      "Because it is mathematically faster.",
      "Because it works on unsorted arrays.",
      "Because jumping backwards is a costly operation on some storage media.",
      "Because it has lower space complexity."
    ],
    correctAnswer: 2,
    explanation: "Binary Search can jump back and forth multiple times (O(log n)). Jump Search only jumps backward once, which is advantageous for media where backward seeks are extremely slow."
  },
  {
    question: "During the linear search phase of Jump Search, what happens if the 'prev' index reaches the array's length?",
    options: [
      "The array automatically expands.",
      "The target is located at the last index.",
      "An IndexOutOfBoundsException is thrown if not explicitly handled.",
      "The search safely terminates by returning -1."
    ],
    correctAnswer: 3,
    explanation: "If properly implemented with bounded while loops (checking 'prev == Math.min(step, n)'), the search recognizes that the element is not found and safely terminates, returning -1."
  },
  {
    question: "What happens if the target element is significantly smaller than the very first element of the array?",
    options: [
      "The algorithm jumps to the end of the array.",
      "The algorithm evaluates the first block, fails the jump condition immediately, and then fails the linear search, returning -1.",
      "The algorithm crashes with a negative index.",
      "The algorithm enters an infinite loop."
    ],
    correctAnswer: 1,
    explanation: "Since the first jump compares arr[step-1] < target, the condition immediately fails if the target is smaller than the first block. It transitions to linear search, which also immediately terminates, returning -1."
  },
  {
    question: "If Jump Search is executed with a step size of '1', which algorithm does it effectively become?",
    options: [
      "Binary Search",
      "Exponential Search",
      "Interpolation Search",
      "Linear Search"
    ],
    correctAnswer: 3,
    explanation: "A step size of 1 means the algorithm advances exactly 1 index at a time, mimicking a classic Linear Search."
  },
  {
    question: "What is the average case time complexity of Jump Search?",
    options: [
      "O(1)",
      "O(log n)",
      "O(sqrt(n))",
      "O(n)"
    ],
    correctAnswer: 2,
    explanation: "On average, the element is found somewhere in the middle of the array, requiring around sqrt(n)/2 jumps and sqrt(n)/2 linear comparisons, leading to an average case complexity of O(sqrt(n))."
  },
  {
    question: "When applying Jump Search on a small array (e.g., size 4), how does its performance compare to Linear Search?",
    options: [
      "Jump Search is vastly superior.",
      "Both perform nearly identical operations.",
      "Linear Search uses significantly less memory.",
      "Jump Search causes a stack overflow."
    ],
    correctAnswer: 1,
    explanation: "For very small arrays, the constant factors overhead of calculating the square root makes Jump Search behave practically identically to or slightly slower than Linear Search."
  }
];

export const jumpSearchDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  title: "Complete the Jump Search",
  description: "Fill in the missing conditions to correctly calculate bounds and perform the linear search.",
  code: "int jumpSearch(int arr[], int x, int n) {\n    int step = sqrt(n);\n    int prev = 0;\n    \n    while (arr[???] < x) {\n        prev = step;\n        step += sqrt(n);\n        if (prev >= n) return -1;\n    }\n    \n    while (arr[prev] < x) {\n        prev++;\n        if (prev == ???) return -1;\n    }\n    \n    if (arr[prev] == x) return prev;\n    return -1;\n}",
  blanks: [
    "min(step, n) - 1",
    "min(step, n)"
  ]
};

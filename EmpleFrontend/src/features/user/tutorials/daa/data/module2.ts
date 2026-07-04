import { ChapterContent, MCQQuestion, DebugExercise, DragExercise, CompleteExercise } from "./daaTutorial";

export const module2Content: ChapterContent = {
  title: "Module 2: Searching Algorithms",
  description: "Learn how to find elements in a dataset efficiently using Linear, Binary, Jump, Interpolation, and Exponential Search.",
  code: `// Binary Search Example (Iterative)
int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
  points: [
    {
      heading: "1. Introduction",
      body: "Searching algorithms are designed to check for an element or retrieve an element from any data structure where it is stored. They are generally classified into two categories: Sequential Search (like Linear Search) and Interval Search (like Binary Search)."
    },
    {
      heading: "2. Problem Statement",
      body: "Given an array `A` of `n` elements and a target value `T`, find the index `i` such that `A[i] == T`. If `T` is not present in `A`, return `-1`."
    },
    {
      heading: "3. Theory & Working",
      body: "We will cover five search algorithms:\n\n**1. Linear Search:** Checks each element sequentially.\n**2. Binary Search:** Works on SORTED arrays by repeatedly dividing the search interval in half.\n**3. Jump Search:** Works on SORTED arrays by jumping ahead by fixed steps $\\\\sqrt{n}$ and then doing a linear search.\n**4. Interpolation Search:** An improvement over Binary Search for instances where the values in a sorted array are uniformly distributed. It probes the position based on the target's value.\n**5. Exponential Search:** Finds a range where the element should be present and then performs a binary search in that range."
    },
    {
      heading: "4. Step-by-Step Dry Run",
      body: "Let's dry run **Binary Search** for `A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`, `T = 23`.\n\n1. Initial state: `L = 0, R = 9`. Mid = `(0+9)/2 = 4`. `A[4] = 16`.\n2. Since `16 < 23`, we search right. `L = 5, R = 9`.\n3. Mid = `(5+9)/2 = 7`. `A[7] = 56`.\n4. Since `56 > 23`, we search left. `L = 5, R = 6`.\n5. Mid = `(5+6)/2 = 5`. `A[5] = 23`. Target found at index `5`!"
    },
    {
      heading: "5. Pseudocode",
      body: "**Binary Search (Iterative):**\n```text\nAlgorithm BinarySearch(A, n, T)\n  L = 0, R = n - 1\n  while L <= R do\n    mid = floor((L + R) / 2)\n    if A[mid] == T then return mid\n    else if A[mid] < T then L = mid + 1\n    else R = mid - 1\n  return -1\n```"
    },
    {
      heading: "6. C Implementation",
      body: "```c\n#include <stdio.h>\n\nint binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int arr[] = {2, 3, 4, 10, 40};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int result = binarySearch(arr, 0, n - 1, 10);\n    printf(\"Element is %s\\\n\", (result == -1) ? \"not present\" : \"present\");\n    return 0;\n}\n```"
    },
    {
      heading: "7. Java Implementation",
      body: "```java\nclass BinarySearch {\n    int binarySearch(int arr[], int l, int r, int x) {\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (arr[m] == x) return m;\n            if (arr[m] < x) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String args[]) {\n        BinarySearch ob = new BinarySearch();\n        int arr[] = {2, 3, 4, 10, 40};\n        int result = ob.binarySearch(arr, 0, arr.length - 1, 10);\n        System.out.println(result == -1 ? \"Not present\" : \"Found at index \" + result);\n    }\n}\n```"
    },
    {
      heading: "8. Time & Space Complexity",
      body: "**Time Complexity:**\n- **Linear Search:** $O(n)$ worst, $O(1)$ best.\n- **Binary Search:** $O(\\\\log n)$ worst, $O(1)$ best.\n- **Jump Search:** $O(\\\\sqrt{n})$ worst.\n- **Interpolation Search:** $O(\\\\log \\\\log n)$ average, $O(n)$ worst (if elements increase exponentially).\n- **Exponential Search:** $O(\\\\log i)$ where $i$ is the index of the element.\n\n**Space Complexity:**\n- Iterative algorithms typically take $O(1)$ auxiliary space.\n- Recursive Binary Search takes $O(\\\\log n)$ space for the call stack."
    },
    {
      heading: "9. Advantages & Disadvantages",
      body: "**Binary Search:**\n- *Advantage:* Extremely fast for large datasets compared to linear search.\n- *Disadvantage:* The array MUST be sorted first. If data is frequently inserted/deleted, keeping it sorted is expensive.\n\n**Interpolation Search:**\n- *Advantage:* Faster than Binary Search if data is uniformly distributed.\n- *Disadvantage:* Very slow ($O(n)$) if data is unevenly distributed."
    },
    {
      heading: "10. Applications",
      body: "- **Binary Search:** Used in standard libraries (like Java's `Arrays.binarySearch`), database indexing, and debugging via bisection (e.g., `git bisect`).\n- **Exponential Search:** Highly effective for unbounded or infinite arrays."
    },
    {
      heading: "11. Interview Questions",
      body: "1. Can Binary Search be implemented on Linked Lists efficiently?\n2. Why is `mid = l + (r - l) / 2` preferred over `mid = (l + r) / 2`?\n3. Explain a scenario where Linear Search is better than Binary Search.\n4. How does Interpolation Search guess the target's position?"
    },
    {
      heading: "12. Coding Practice (Easy, Medium & Hard)",
      body: "- **Easy:** Find the first and last position of an element in a sorted array.\n- **Medium:** Search in a Rotated Sorted Array.\n- **Hard:** Find the median of two sorted arrays of different sizes."
    },
    {
      heading: "13. Common Mistakes",
      body: "- **Integer Overflow:** Using `(L + R) / 2` instead of `L + (R - L) / 2` in Binary Search.\n- **Infinite Loops:** Incorrectly updating boundaries (`L = mid` instead of `L = mid + 1`), causing the loop to never terminate."
    },
    {
      heading: "14. Related Algorithms",
      body: "- **Ternary Search:** Divides the array into three parts instead of two.\n- **Hashing:** An alternative to searching that provides $O(1)$ average time complexity but requires more space."
    },
    {
      heading: "15. Quiz (MCQs)",
      body: "Ready to test your knowledge? Head over to the **Quiz** tab and solve the 15 questions on searching algorithms!"
    },
    {
      heading: "16. Summary",
      body: "Searching is a fundamental operation. While Linear Search is universally applicable, sorting data unlocks powerful interval searches like Binary Search ($O(\\\\log n)$) and Interpolation Search ($O(\\\\log \\\\log n)$). The choice of search algorithm depends heavily on the data's size, state (sorted vs unsorted), and distribution."
    }
  ]
};

export const module2Mcqs: MCQQuestion[] = [
  {
    q: "What is the worst-case time complexity of Linear Search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    ans: 2,
    explanation: "In the worst-case scenario, the target element is at the end of the array or not present, meaning every element must be checked. Thus, O(n)."
  },
  {
    q: "Binary Search requires the array to be:",
    options: ["Unsorted", "Sorted", "Contains only positive integers", "Reversed"],
    ans: 1,
    explanation: "Binary search relies on the array being sorted to correctly determine which half of the array to eliminate during each step."
  },
  {
    q: "In Binary Search, why is 'mid = L + (R - L) / 2' preferred over 'mid = (L + R) / 2'?",
    options: ["It executes faster on modern CPUs", "It prevents integer overflow for large values of L and R", "It results in a more balanced tree", "It requires less memory"],
    ans: 1,
    explanation: "If L and R are very large integers close to the maximum value, (L + R) can overflow the integer limit, resulting in a negative number. L + (R - L) / 2 prevents this."
  },
  {
    q: "What is the optimal block size (jump step) for Jump Search on an array of size n?",
    options: ["n/2", "log n", "√n", "n/10"],
    ans: 2,
    explanation: "The optimal jump size that minimizes the total number of comparisons in the worst case is the square root of n (√n)."
  },
  {
    q: "What is the time complexity of Jump Search?",
    options: ["O(log n)", "O(n)", "O(√n)", "O(1)"],
    ans: 2,
    explanation: "Jump Search has a time complexity of O(√n), placing it between Linear Search O(n) and Binary Search O(log n)."
  },
  {
    q: "Interpolation Search is most effective when the elements in the sorted array are:",
    options: ["Randomly distributed", "Uniformly distributed", "All the same value", "Descending"],
    ans: 1,
    explanation: "Interpolation search estimates the position of the target based on its value relative to the ends of the search space. It works best (O(log log n)) when data is uniformly distributed."
  },
  {
    q: "What is the worst-case time complexity of Interpolation Search?",
    options: ["O(log n)", "O(log log n)", "O(n)", "O(n^2)"],
    ans: 2,
    explanation: "If the elements are exponentially distributed rather than uniformly, Interpolation Search can degenerate to O(n) time."
  },
  {
    q: "Exponential Search is especially useful for which type of data structures?",
    options: ["Linked Lists", "Unbounded or infinite arrays", "Unsorted Arrays", "Hash Maps"],
    ans: 1,
    explanation: "Exponential Search is designed to find an upper bound range for the target by repeatedly doubling the index. This makes it perfect for unbounded (infinite) arrays where the size is unknown."
  },
  {
    q: "What is the time complexity of Exponential Search to find an element at index 'i'?",
    options: ["O(i)", "O(log i)", "O(n)", "O(log n)"],
    ans: 1,
    explanation: "The search space size grows exponentially up to index i, taking O(log i) steps to find the range, followed by a binary search in that range, taking another O(log i). Total = O(log i)."
  },
  {
    q: "Which search algorithm is generally best if the array is unsorted and you only need to search it once?",
    options: ["Binary Search", "Linear Search", "Jump Search", "Interpolation Search"],
    ans: 1,
    explanation: "If you only search once, sorting the array first takes O(n log n) time, whereas a simple Linear Search takes only O(n) time."
  },
  {
    q: "Binary Search is a classic example of which algorithmic paradigm?",
    options: ["Greedy Algorithms", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
    ans: 2,
    explanation: "Binary search divides the problem into subproblems of half the size, solves one of them, and ignores the other. This is the essence of Divide and Conquer."
  },
  {
    q: "How many comparisons does it take to find 72 in the array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] using Binary Search?",
    options: ["2", "3", "4", "5"],
    ans: 1,
    explanation: "Mid1 (index 4) = 16 (go right). Mid2 (index 7) = 56 (go right). Mid3 (index 8) = 72 (Found!). So, 3 comparisons."
  },
  {
    q: "Can Binary Search be efficiently implemented on a standard Singly Linked List?",
    options: ["Yes, taking O(log n) time", "No, because finding the middle element takes O(n) time", "Yes, but it requires extra O(n) space", "No, because linked lists cannot be sorted"],
    ans: 1,
    explanation: "Binary Search requires O(1) random access to the middle element. In a Linked List, finding the middle element takes O(n) time, defeating the purpose of the O(log n) search."
  },
  {
    q: "Ternary Search has a time complexity of O(log_3 n). Is it faster than Binary Search in practice?",
    options: ["Yes, because log base 3 is smaller than log base 2", "No, because Ternary Search makes more comparisons per step", "Yes, it is strictly faster in all cases", "They are exactly the same speed"],
    ans: 1,
    explanation: "Although the tree height in Ternary Search is smaller (log_3 n), it requires 2 comparisons per level compared to 1 comparison in Binary Search, making Binary Search faster in most practical scenarios."
  },
  {
    q: "Which search algorithm uses the following formula to find the next position? pos = L + [ (x - arr[L]) * (R - L) / (arr[R] - arr[L]) ]",
    options: ["Binary Search", "Exponential Search", "Jump Search", "Interpolation Search"],
    ans: 3,
    explanation: "This is the probing formula used in Interpolation Search to estimate the position of the target value 'x' based on a linear interpolation."
  }
];

export const module2Debug: DebugExercise = {
  instructions: "Fix the binary search implementation to prevent integer overflow and infinite loops.",
  buggy: `int binarySearch(int arr[], int l, int r, int x) {
    while (l < r) {
        int m = (l + r) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m;
        else r = m;
    }
    return -1;
}`,
  fixed: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
  hints: ["The while loop should check l <= r.", "To prevent overflow, use m = l + (r - l) / 2.", "Update l to m + 1 and r to m - 1 to shrink the search space correctly."],
  expectedOutput: "Should return the correct index or -1 if not found without hanging."
};

export const module2Drag: DragExercise = {
  instructions: "Order the search algorithms from worst (slowest) to best (fastest) average time complexity for uniformly distributed sorted data.",
  lines: [
    { id: "1", text: "Linear Search O(n)" },
    { id: "2", text: "Jump Search O(√n)" },
    { id: "3", text: "Binary Search O(log n)" },
    { id: "4", text: "Interpolation Search O(log log n)" }
  ],
  order: ["1", "2", "3", "4"]
};

export const module2Complete: CompleteExercise = {
  instruction: "Fill in the blanks regarding search algorithm constraints.",
  template: "Linear search works on BLANK_1 data. Binary search requires the data to be BLANK_2, and Interpolation search assumes the data is BLANK_3 distributed.",
  blanks: ["unsorted", "sorted", "uniformly"],
  answer: "Linear search works on unsorted data. Binary search requires the data to be sorted, and Interpolation search assumes the data is uniformly distributed."
};

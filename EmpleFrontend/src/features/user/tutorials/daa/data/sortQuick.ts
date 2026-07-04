export const sortQuickContent = [
  {
    title: "1. Introduction",
    content: "Quick Sort is a highly efficient, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. It was developed by British computer scientist Tony Hoare in 1959."
  },
  {
    title: "2. Problem Statement",
    content: "Given an unsorted array of `n` elements, reorder them such that they are in monotonically increasing (or decreasing) order using the Quick Sort algorithm."
  },
  {
    title: "3. Theory & Working",
    content: "Quick Sort fundamentally revolves around the 'partitioning' step.\n\n1. Choose a Pivot: Select an element from the array to act as the pivot. Common choices include the first element, the last element, the middle element, or a random element.\n2. Partitioning: Rearrange the array so that all elements smaller than the pivot are placed before it, and all elements greater than the pivot are placed after it. The pivot is now in its final sorted position.\n3. Recursion: Recursively apply the same process to the sub-array of elements with smaller values and the sub-array of elements with greater values.\n\nThe base case for the recursion is when the sub-array has less than two elements, meaning it is inherently sorted."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider the array: `[8, 3, 1, 7, 0, 10, 2]`.\nLet's choose the last element `2` as the pivot.\n\nInitial Array: `[8, 3, 1, 7, 0, 10, 2]` (Pivot = 2)\n- Compare 8 with 2 (8 > 2)\n- Compare 3 with 2 (3 > 2)\n- Compare 1 with 2 (1 < 2) -> Swap 8 and 1. Array: `[1, 3, 8, 7, 0, 10, 2]`\n- Compare 7 with 2 (7 > 2)\n- Compare 0 with 2 (0 < 2) -> Swap 3 and 0. Array: `[1, 0, 8, 7, 3, 10, 2]`\n- Compare 10 with 2 (10 > 2)\n- End of loop. Swap the pivot (2) with the first element greater than it (8). Array: `[1, 0, 2, 7, 3, 10, 8]`\n\nPivot `2` is now in its correct position. The array is partitioned into `[1, 0]` and `[7, 3, 10, 8]`.\nRecursively sort `[1, 0]`:\n- Pivot = 0. Array becomes `[0, 1]`.\nRecursively sort `[7, 3, 10, 8]`:\n- Pivot = 8. Partitioning gives `[7, 3, 8, 10]`.\n- Recursively sort `[7, 3]` (becomes `[3, 7]`) and `[10]` (already sorted).\nFinal Sorted Array: `[0, 1, 2, 3, 7, 8, 10]`."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nfunction quickSort(arr, low, high) {\n    if (low < high) {\n        // pi is partitioning index, arr[pi] is now at right place\n        pi = partition(arr, low, high);\n\n        quickSort(arr, low, pi - 1);  // Before pi\n        quickSort(arr, pi + 1, high); // After pi\n    }\n}\n\nfunction partition(arr, low, high) {\n    pivot = arr[high]; // Choosing the last element as pivot\n    i = (low - 1); // Index of smaller element\n\n    for (j = low; j <= high - 1; j++) {\n        // If current element is smaller than the pivot\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return (i + 1);\n}\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n\n// Function to swap two elements\nvoid swap(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\n// Partition function\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\n// Quick Sort function\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\n// Driver code\nint main() {\n    int arr[] = {10, 7, 8, 9, 1, 5};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    quickSort(arr, 0, n - 1);\n    printf(\"Sorted array: \");\n    for (int i = 0; i < n; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nclass QuickSort {\n\n    // Function to swap two elements\n    static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n\n    // Partition function\n    static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = (low - 1);\n\n        for (int j = low; j <= high - 1; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                swap(arr, i, j);\n            }\n        }\n        swap(arr, i + 1, high);\n        return (i + 1);\n    }\n\n    // Quick Sort function\n    static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            quickSort(arr, low, pi - 1);\n            quickSort(arr, pi + 1, high);\n        }\n    }\n\n    // Driver code\n    public static void main(String[] args) {\n        int[] arr = {10, 7, 8, 9, 1, 5};\n        int n = arr.length;\n        quickSort(arr, 0, n - 1);\n        System.out.print(\"Sorted array: \");\n        for (int i = 0; i < n; i++) {\n            System.out.print(arr[i] + \" \");\n        }\n        System.out.println();\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "- **Time Complexity:**\n  - **Best Case:** `O(N log N)`\n  - **Average Case:** `O(N log N)`\n  - **Worst Case:** `O(N^2)`\n\n- **Space Complexity:**\n  - **Auxiliary Space:** `O(log N)` on average due to the recursive call stack. In the worst case (highly unbalanced partitions), the space complexity can degrade to `O(N)`.\n\nQuick Sort is generally considered faster in practice than other `O(N log N)` algorithms like Merge Sort because its inner loop can be efficiently implemented on most architectures, and it operates in place."
  },
  {
    title: "9. Best, Worst & Average Case",
    content: "- **Best Case:** The best case occurs when the partition process always picks the middle element as the pivot, dividing the array into two equal halves. This results in a balanced recursive tree of depth `log N`, with each level doing `O(N)` work. Time complexity is `O(N log N)`.\n\n- **Average Case:** In the average case, the partition process doesn't perfectly halve the array, but it splits it into constant proportional sizes (e.g., 9-to-1 split). The depth of the recursion tree is still `O(log N)`, leading to an `O(N log N)` time complexity.\n\n- **Worst Case:** The worst case occurs when the partition process always picks the greatest or smallest element as the pivot. This happens when the array is already sorted (or reverse sorted) and the first or last element is chosen as the pivot. The recursion tree becomes skewed, with a depth of `N`, resulting in an `O(N^2)` time complexity."
  },
  {
    title: "10. Iterative vs Recursive",
    content: "- **Recursive Quick Sort:** The standard implementation uses recursion. It's elegant, concise, and easy to understand. However, for extremely large arrays, the deep recursion can lead to a stack overflow error (especially in the worst-case scenario where recursion depth is `O(N)`).\n\n- **Iterative Quick Sort:** Quick Sort can also be implemented iteratively using an explicit stack to keep track of the sub-array bounds (low and high indices). This avoids the function call overhead and prevents stack overflow errors by managing the memory dynamically (e.g., using a heap-allocated stack structure or array), but the logic is more complex to implement."
  },
  {
    title: "11. Edge Cases & Constraints",
    content: "- **Already Sorted Array:** If the pivot is always the last or first element, an already sorted (or reverse sorted) array triggers the worst-case `O(N^2)` performance. Mitigation: Use a randomized pivot or Median-of-Three pivot selection.\n- **Array with All Identical Elements:** Standard partition schemes might exhibit `O(N^2)` performance. Dutch National Flag (3-way) partitioning handles this efficiently in `O(N)` time.\n- **Small Arrays:** For very small sub-arrays (e.g., size < 10), insertion sort is often faster due to a smaller constant factor. Hybrid algorithms like Introsort switch from Quick Sort to Insertion Sort for small partitions."
  },
  {
    title: "12. Applications",
    content: "- **General Purpose Sorting:** It is the default sorting algorithm in many standard libraries (e.g., `qsort` in C, `std::sort` in C++ which uses Introsort - a hybrid of Quick Sort, Heap Sort, and Insertion Sort) due to its excellent average-case performance and cache locality.\n- **Commercial Computing:** Used in various internal systems for fast sorting of massive datasets where average speed is paramount.\n- **Information Searching:** Used efficiently in scenarios requiring fast sorting for subsequent binary searching or related algorithms."
  },
  {
    title: "13. Pros & Cons",
    content: "**Pros:**\n- Extremely fast on average (`O(N log N)`).\n- In-place sorting (requires minimal auxiliary memory, `O(log N)`).\n- Excellent cache locality, making it practically faster than Merge Sort.\n- Highly parallelizable (independent sub-arrays can be sorted concurrently).\n\n**Cons:**\n- Unstable sort (relative order of equal elements may not be preserved).\n- Worst-case time complexity is `O(N^2)` (though easily avoidable with good pivot selection).\n- Recursive implementation can cause stack overflow on massive arrays or in the worst case."
  },
  {
    title: "14. Comparison with alternatives",
    content: "- **Quick Sort vs Merge Sort:** Merge Sort is stable and guarantees `O(N log N)` worst-case time, but it requires `O(N)` extra space. Quick Sort is in-place and generally faster in practice due to cache efficiency, but it has a worst-case `O(N^2)` time.\n- **Quick Sort vs Heap Sort:** Both are in-place. Heap Sort guarantees `O(N log N)` worst-case, but Quick Sort is generally faster in practice. Heap Sort has poor cache locality compared to Quick Sort.\n- **Quick Sort vs Bubble/Insertion/Selection Sort:** Quick Sort completely outperforms these `O(N^2)` algorithms for large datasets."
  },
  {
    title: "15. Common Pitfalls",
    content: "- **Poor Pivot Selection:** Always picking the first or last element without considering array distribution can lead to `O(N^2)` performance on sorted data.\n- **Infinite Recursion:** Incorrectly managing the `low` and `high` pointers or the pivot element itself can result in non-terminating recursive calls, leading to a stack overflow.\n- **Off-by-One Errors:** The partition logic, particularly managing pointers (`i` and `j`), is notorious for off-by-one errors that can corrupt the array or cause out-of-bounds access."
  },
  {
    title: "16. Visual Intuition",
    content: "Imagine organizing a line of people by height. You pick one person (the pivot). You ask everyone shorter to move to their left, and everyone taller to move to their right. Now the pivot person is in their exact right spot. You then ask the group on the left to do the same thing among themselves, and the group on the right to do the same. Eventually, everyone ends up in their correct spot!"
  }
];

export const sortQuickMcqs = [
  {
    question: "What is the worst-case time complexity of standard Quick Sort?",
    options: ["O(N log N)", "O(N^2)", "O(N)", "O(log N)"],
    correctAnswer: 1,
    explanation: "The worst-case time complexity of Quick Sort is O(N^2). This happens when the partition process always picks the greatest or smallest element as pivot (e.g., when the array is already sorted and we pick the first/last element)."
  },
  {
    question: "Which algorithmic paradigm does Quick Sort follow?",
    options: ["Dynamic Programming", "Greedy Approach", "Divide and Conquer", "Backtracking"],
    correctAnswer: 2,
    explanation: "Quick Sort is a classic Divide and Conquer algorithm. It divides the array into sub-arrays based on a pivot, recursively sorts them, and combines the results (conceptually, as the array is modified in-place)."
  },
  {
    question: "Is standard Quick Sort a stable sorting algorithm?",
    options: ["Yes", "No", "Depends on the input", "Depends on the pivot"],
    correctAnswer: 1,
    explanation: "No, standard Quick Sort is not a stable sorting algorithm. The swapping of elements during the partition step can change the relative order of elements with equal keys."
  },
  {
    question: "What is the space complexity of Quick Sort in the best case (using recursion)?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
    correctAnswer: 2,
    explanation: "In the best case, the recursion tree is balanced, leading to a depth of O(log N). Thus, the space complexity due to the recursive call stack is O(log N)."
  },
  {
    question: "Which of the following pivot selection strategies helps avoid the worst-case performance on an already sorted array?",
    options: ["Always picking the first element", "Always picking the last element", "Picking a random element", "None of the above"],
    correctAnswer: 2,
    explanation: "Picking a random element or the median of the first, middle, and last elements helps avoid the worst-case O(N^2) time complexity for already sorted or reverse-sorted arrays."
  },
  {
    question: "In the Lomuto partition scheme, where is the pivot typically chosen from?",
    options: ["The first element", "The middle element", "The last element", "A random element"],
    correctAnswer: 2,
    explanation: "The Lomuto partition scheme typically chooses the last element of the sub-array as the pivot."
  },
  {
    question: "How does Quick Sort behave if all elements in the array are identical (using standard Lomuto partitioning)?",
    options: ["O(N) time", "O(N log N) time", "O(N^2) time", "It will crash"],
    correctAnswer: 2,
    explanation: "With standard Lomuto partitioning, an array of all equal elements will result in highly unbalanced partitions (one sub-array of size N-1, the other of size 0), leading to O(N^2) time complexity."
  },
  {
    question: "What is 3-way Quick Sort (Dutch National Flag partitioning) primarily used for?",
    options: ["Improving best-case time complexity", "Handling arrays with many duplicate elements efficiently", "Reducing space complexity to O(1)", "Making Quick Sort stable"],
    correctAnswer: 1,
    explanation: "3-way Quick Sort partitions the array into three parts: elements less than the pivot, elements equal to the pivot, and elements greater than the pivot. This makes it highly efficient (O(N) time) for arrays with many duplicates."
  },
  {
    question: "Why is Quick Sort generally preferred over Merge Sort for sorting arrays in memory, despite the O(N^2) worst case?",
    options: ["Quick Sort is stable", "Quick Sort has better cache locality and is in-place", "Quick Sort has a lower worst-case bound", "Merge Sort cannot sort large arrays"],
    correctAnswer: 1,
    explanation: "Quick Sort is preferred because it works in-place (no O(N) extra memory needed) and its sequential access pattern results in excellent cache locality, making it faster in practice."
  },
  {
    question: "Which sorting algorithm is often combined with Quick Sort to form Introsort?",
    options: ["Bubble Sort", "Heap Sort and Insertion Sort", "Merge Sort", "Selection Sort"],
    correctAnswer: 1,
    explanation: "Introsort begins with Quick Sort, switches to Heap Sort when the recursion depth exceeds a level based on the number of elements being sorted (to avoid O(N^2) worst case), and uses Insertion Sort for small sub-arrays."
  }
];

export const sortQuickDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const sortQuickDrag = {
  instructions: "Drag the lines of code into the correct order to form the algorithm.",
  lines: [
    { id: "1", text: "for (int i = 0; i < n; i++) {" },
    { id: "2", text: "  // loop body" },
    { id: "3", text: "}" }
  ],
  order: ["1", "2", "3"]
};

export const sortQuickComplete = {
  instruction: "Fill in the blanks to complete the implementation.",
  template: "void sort() {\n  {{blank1}}\n}",
  answer: "void sort() {\n  int x = 0;\n}",
  blanks: ["int x = 0;"]
};

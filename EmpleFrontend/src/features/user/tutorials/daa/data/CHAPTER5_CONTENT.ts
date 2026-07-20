export const CHAPTER5_CONTENT = {
  title: "Linear Search",
  description: "An in-depth look at Linear Search, the most fundamental searching algorithm. You will understand the core concept, trace the step-by-step algorithmic logic, and analyze its time and space complexities. We will also discuss the real-world advantages and disadvantages of using linear search, particularly concerning its performance on large datasets compared to more advanced techniques.",
  points: [
    {
      heading: "Concept",
      body: "Linear Search (or Sequential Search) is the simplest searching algorithm. It involves sequentially checking each element of a list until a match is found or the whole list has been searched. It is intuitive and works just like looking for a specific page in a book by flipping through every single page from the beginning."
    },
    {
      heading: "Algorithm",
      body: "The algorithm for Linear Search is straightforward:\n1. Start at the first element (index 0) of the array.\n2. Compare the current element with the target value.\n3. If it matches, return the current index.\n4. If it doesn't match, move to the next element.\n5. Repeat steps 2-4 until the end of the array is reached.\n6. If the end is reached without a match, return -1 (or null) to indicate the element is not found."
    },
    {
      heading: "Complexity",
      body: "Because Linear Search may have to look at every single element in the worst case:\n- **Best Case Time Complexity:** $O(1)$ - The target is found at the very first position.\n- **Worst Case Time Complexity:** $O(n)$ - The target is at the very last position or not in the array at all.\n- **Average Case Time Complexity:** $O(n)$ - On average, the target might be found halfway through, which simplifies to $O(n)$.\n- **Space Complexity:** $O(1)$ - It only requires a single variable to keep track of the current index."
    },
    {
      heading: "Advantages",
      body: "Linear Search has several benefits, primarily regarding its simplicity:\n- It is extremely easy to understand and implement.\n- It does not require the dataset to be sorted beforehand (unlike Binary Search).\n- It is highly effective for small datasets.\n- It works well on unsorted data and linked lists where random access is not possible."
    },
    {
      heading: "Disadvantages",
      body: "The main drawback of Linear Search is its inefficiency on large datasets:\n- Its $O(n)$ time complexity means that as the data grows, the search time grows linearly. Searching through a database of millions of records linearly would be unacceptably slow.\n- It is vastly outperformed by algorithms like Binary Search ($O(\\log n)$) or Hash Tables ($O(1)$) when searching large or sorted datasets."
    }
  ],
  code: "// Linear Search Implementation in C\n#include <stdio.h>\n\nint linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) {\n            return i; // Target found, return index\n        }\n    }\n    return -1; // Target not found\n}\n\nint main() {\n    int arr[] = {10, 50, 30, 70, 80, 20, 90, 40};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int target = 30;\n    \n    int result = linearSearch(arr, n, target);\n    if (result == -1) printf(\"Element not found.\\n\");\n    else printf(\"Element found at index %d.\\n\", result);\n    \n    return 0;\n}"
};
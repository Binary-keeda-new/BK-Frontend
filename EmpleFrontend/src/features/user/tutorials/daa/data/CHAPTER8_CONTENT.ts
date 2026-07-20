export const CHAPTER8_CONTENT = {
  title: "Introduction to Sorting",
  description: "Welcome to the world of Sorting Algorithms. Dive into the core classifications and properties of sorting techniques. You will learn to differentiate between stable and unstable sorting, understand in-place versus out-of-place algorithms, and explore how external storage impacts sorting strategies. This sets the stage for deeply analyzing individual sorting algorithms.",
  points: [
    {
      heading: "Stable vs Unstable",
      body: "A sorting algorithm is considered **Stable** if it preserves the relative order of equal elements in the sorted output. For example, if you sort a list of students by grade, and two students have the same grade, a stable sort guarantees they will appear in the same order they were originally listed. Examples: Merge Sort, Bubble Sort, Insertion Sort.\n\nAn **Unstable** sort makes no such guarantees. Equal elements might swap positions. Examples: Quick Sort, Heap Sort, Selection Sort."
    },
    {
      heading: "In-place vs Out-of-place",
      body: "An **In-place** sorting algorithm requires only a small, constant amount of extra memory space $O(1)$ for auxiliary variables, manipulating the input array directly. Examples: Quick Sort, Heap Sort, Bubble Sort.\n\nAn **Out-of-place** algorithm requires auxiliary data structures (like arrays) that grow with the input size (usually $O(n)$ space). Example: Merge Sort requires extra space to merge the divided arrays."
    },
    {
      heading: "Internal vs External Sorting",
      body: "**Internal Sorting:** Used when the entire dataset to be sorted is small enough to fit entirely in the computer's main memory (RAM). Most standard sorting algorithms like Quick Sort and Merge Sort are typically used internally.\n\n**External Sorting:** Used when the dataset is too massive to fit into memory all at once (e.g., sorting a terabyte of data). It requires reading data in chunks from slower external storage (like a hard drive), sorting the chunks, and merging them. External Merge Sort is the classic example."
    },
    {
      heading: "Adaptive Sorting",
      body: "An **Adaptive** sorting algorithm takes advantage of existing order in its input. It performs significantly faster (often approaching $O(n)$ time) if the data is already partially or fully sorted. Insertion Sort and Bubble Sort (when optimized) are adaptive. Non-adaptive algorithms, like Selection Sort, take the same amount of time regardless of the initial order of elements."
    },
    {
      heading: "Online Sorting",
      body: "An **Online** sorting algorithm can sort a list as it receives it one piece at a time, without needing the entire dataset available from the start. Insertion Sort is an excellent online algorithm because it maintains a sorted subarray and places new incoming elements into their correct position seamlessly. Merge Sort, conversely, needs the whole array to begin dividing."
    },
    {
      heading: "Lower Bound of Comparison Sorting",
      body: "For any algorithm that sorts by comparing elements (like Quick Sort, Merge Sort, etc.), the mathematical lower bound for time complexity is **$O(n \\log n)$**. This is proven using a decision tree model. It is impossible to write a purely comparison-based sorting algorithm that is faster than $O(n \\log n)$ in the worst/average case. Non-comparison sorts like Radix or Counting Sort can achieve $O(n)$, but they have strict constraints on the input data (e.g., small integers)."
    }
  ],
  code: "// Example illustrating Stability Concept (Conceptual)\n// Given an array of pairs (Value, ID):\n// Input:  [(4, A), (3, B), (4, C), (1, D)]\n// \n// Stable Sort Output (preserves order of 4s):\n// Output: [(1, D), (3, B), (4, A), (4, C)]\n// \n// Unstable Sort Output (might swap 4s):\n// Output: [(1, D), (3, B), (4, C), (4, A)]\n"
};
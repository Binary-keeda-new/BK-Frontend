export const CHAPTER11_MCQ = [
  {
    q: "What is the best-case time complexity of Insertion Sort? (GATE 2004)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
    ans: 0,
    explanation: "If the array is already sorted, the inner while loop never executes. The outer loop runs n-1 times, resulting in O(n) time complexity."
  },
  {
    q: "How does Insertion Sort build the final sorted array?",
    options: ["By repeatedly finding the minimum element and swapping it.", "By dividing the array into halves.", "By taking one element at a time and inserting it into its correct position in the already sorted part.", "By bubbling the largest element to the end."],
    ans: 2,
    explanation: "Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list by inserting the element into its correct place."
  },
  {
    q: "What is the worst-case time complexity of Insertion Sort? (GATE 2007)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(n!)"],
    ans: 2,
    explanation: "The worst-case occurs when the array is in reverse order. Every new element must be compared and shifted past all previously sorted elements, leading to O(n^2)."
  },
  {
    q: "Is Insertion Sort considered a stable sorting algorithm? (GATE 2011)",
    options: ["Yes", "No", "Depends on the array size", "Only for floating-point numbers"],
    ans: 0,
    explanation: "Insertion sort is stable. When it encounters an element equal to the one it is currently inserting, it stops shifting, preserving their relative order."
  },
  {
    q: "Insertion Sort is highly efficient for which type of data sets?",
    options: ["Large and completely random arrays.", "Arrays sorted in reverse order.", "Small or almost sorted arrays.", "Arrays with many duplicates."],
    ans: 2,
    explanation: "Because of its O(n) best-case complexity and low overhead, Insertion Sort is extremely fast for small arrays or arrays that are already mostly sorted."
  },
  {
    q: "In an array of n elements, what is the maximum number of shifts (or swaps) Insertion Sort can make?",
    options: ["n", "n log n", "n(n-1)/2", "n^2"],
    ans: 2,
    explanation: "In the worst case (reverse sorted), the total number of shifts is 1 + 2 + ... + (n-1) = n(n-1)/2."
  },
  {
    q: "Which sorting algorithm is commonly used for small subarrays in advanced algorithms like Timsort or Introsort?",
    options: ["Selection Sort", "Bubble Sort", "Insertion Sort", "Heap Sort"],
    ans: 2,
    explanation: "Due to its very low overhead and excellent performance on small arrays, Insertion Sort is used as the base case algorithm for many advanced sorts."
  },
  {
    q: "What is the space complexity of Insertion Sort? (GATE 2015)",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    ans: 2,
    explanation: "Insertion sort operates in-place, requiring only a single variable 'key' to store the current element being inserted."
  },
  {
    q: "If an array is sorted in reverse order, which sorting algorithm will perform the MAXIMUM number of shifts?",
    options: ["Selection Sort", "Insertion Sort", "Merge Sort", "Heap Sort"],
    ans: 1,
    explanation: "Selection sort does at most n swaps. Merge and Heap sort are O(n log n). Insertion sort does O(n^2) shifts on a reverse-sorted array."
  },
  {
    q: "Consider the array [4, 3, 2, 10, 12, 1, 5, 6]. After how many iterations of the outer loop will the number '10' be in its final sorted position?",
    options: ["1", "3", "7", "It is not guaranteed until the end."],
    ans: 3,
    explanation: "Insertion sort only guarantees that the prefix of the array is sorted. A smaller number later in the array (like 1) will eventually shift '10' further to the right."
  }
];
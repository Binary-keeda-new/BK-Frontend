export const CHAPTER9_MCQ = [
  {
    q: "What is the worst-case time complexity of Bubble Sort? (GATE 2011)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    ans: 2,
    explanation: "In the worst case (reverse sorted array), Bubble Sort must perform n-1 passes, and each pass makes up to n-1 comparisons, resulting in O(n^2) complexity."
  },
  {
    q: "What is the best-case time complexity of an optimized Bubble Sort? (GATE 2008)",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
    ans: 2,
    explanation: "An optimized Bubble Sort uses a boolean 'swapped' flag. If the array is already sorted, the first pass makes no swaps, the flag remains false, and the algorithm terminates in O(n) time."
  },
  {
    q: "Which sorting algorithm is often considered the least efficient for large datasets due to its high number of swaps?",
    options: ["Selection Sort", "Insertion Sort", "Merge Sort", "Bubble Sort"],
    ans: 3,
    explanation: "Bubble Sort not only does O(n^2) comparisons but also O(n^2) swaps in the worst case, making it very slow compared to Selection or Insertion sort in practice."
  },
  {
    q: "Is Bubble Sort a stable sorting algorithm?",
    options: ["Yes, always.", "No, never.", "Only if optimized.", "Only for small arrays."],
    ans: 0,
    explanation: "Bubble Sort only swaps adjacent elements if they are strictly out of order (arr[i] > arr[i+1]). Equal elements are not swapped, preserving their relative order. Thus, it is stable."
  },
  {
    q: "After the first complete pass of Bubble Sort, which of the following is true?",
    options: ["The smallest element is at the beginning.", "The largest element is at the end.", "The array is completely sorted.", "The median element is in the middle."],
    ans: 1,
    explanation: "During the first pass, the largest element 'bubbles up' to the very last position in the array."
  },
  {
    q: "How many maximum passes (outer loop iterations) are required to sort an array of n elements using Bubble Sort?",
    options: ["n", "n-1", "n/2", "n^2"],
    ans: 1,
    explanation: "It takes at most n-1 passes to sort an array of n elements because each pass places one element in its final sorted position. The last remaining element will naturally be sorted."
  },
  {
    q: "What is the space complexity of Bubble Sort? (GATE 2005)",
    options: ["O(n)", "O(n^2)", "O(1)", "O(log n)"],
    ans: 2,
    explanation: "Bubble Sort is an in-place sorting algorithm. It only requires a single temporary variable for swapping, making the space complexity O(1)."
  },
  {
    q: "Consider an array: [5, 1, 4, 2, 8]. How many swaps will occur during the FIRST pass of Bubble Sort?",
    options: ["1", "2", "3", "4"],
    ans: 2,
    explanation: "Swaps: (5,1)->(1,5), (5,4)->(4,5), (5,2)->(2,5). No swap for (5,8). Total 3 swaps."
  },
  {
    q: "In standard unoptimized Bubble Sort, if an array is completely reverse-sorted, how many total comparisons are made?",
    options: ["n", "n(n-1)", "n(n-1)/2", "n^2"],
    ans: 2,
    explanation: "The number of comparisons is (n-1) + (n-2) + ... + 1, which is the sum of the first n-1 integers: n(n-1)/2."
  },
  {
    q: "What is the primary advantage of Bubble Sort?",
    options: ["It is the fastest algorithm for large data.", "It is very easy to understand and implement.", "It minimizes memory writes.", "It scales perfectly on parallel processors."],
    ans: 1,
    explanation: "Bubble Sort's primary (and often only) advantage is its simplicity, making it a common educational tool to introduce the concept of sorting."
  }
];
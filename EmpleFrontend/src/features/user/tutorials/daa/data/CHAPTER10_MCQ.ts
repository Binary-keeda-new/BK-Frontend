export const CHAPTER10_MCQ = [
  {
    q: "What is the primary characteristic of Selection Sort? (GATE 2009)",
    options: ["It repeatedly selects the minimum element from the unsorted part and puts it at the beginning.", "It compares adjacent elements and swaps them.", "It divides the array into halves and sorts them recursively.", "It uses a pivot to partition the array."],
    ans: 0,
    explanation: "Selection sort divides the array into a sorted and an unsorted region. In each iteration, it selects the smallest element from the unsorted region and moves it to the sorted region."
  },
  {
    q: "What is the time complexity of Selection Sort in the best case? (GATE 2003)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
    ans: 2,
    explanation: "Selection sort always scans the entire unsorted portion of the array to find the minimum, regardless of whether the array is already sorted. Thus, it always takes O(n^2) time."
  },
  {
    q: "What is the maximum number of swaps required to sort an array of size n using Selection Sort? (GATE 2012)",
    options: ["n^2", "n", "n-1", "n log n"],
    ans: 2,
    explanation: "In selection sort, one swap is performed at the end of each pass. For an array of size n, it requires n-1 passes, meaning at most n-1 swaps."
  },
  {
    q: "Is standard Selection Sort a stable sorting algorithm? (GATE 2014)",
    options: ["Yes, always.", "No, it is unstable.", "Only for arrays containing integers.", "Yes, but only if the array is small."],
    ans: 1,
    explanation: "Standard Selection Sort is unstable because swapping the minimum element into its correct position can jump over and change the relative order of equal elements."
  },
  {
    q: "Which sorting algorithm is typically preferred when memory write (swap) operations are extremely costly?",
    options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
    ans: 2,
    explanation: "Selection sort makes at most O(n) swaps (one per pass), whereas Bubble and Insertion sort can make up to O(n^2) swaps. Therefore, Selection Sort is preferred when writing to memory is expensive (e.g., EEPROM)."
  },
  {
    q: "How many comparisons are made by Selection Sort to sort an array of size n?",
    options: ["n", "n log n", "n(n-1)/2", "n^2"],
    ans: 2,
    explanation: "The first pass makes n-1 comparisons, the second pass makes n-2, and so on down to 1. The sum is n(n-1)/2, which is O(n^2)."
  },
  {
    q: "In which case does Selection Sort perform better than Insertion Sort?",
    options: ["When the array is already sorted.", "When the array is almost sorted.", "When memory writes are slow and the array is unsorted.", "Selection sort is always worse."],
    ans: 2,
    explanation: "Insertion sort performs O(n) in the best case but does many swaps (shifts). Selection sort always does O(n^2) comparisons but only O(n) swaps, winning when swaps are costly."
  },
  {
    q: "What is the space complexity of Selection Sort?",
    options: ["O(n)", "O(n^2)", "O(1)", "O(log n)"],
    ans: 2,
    explanation: "Selection sort is an in-place sorting algorithm. It only requires a single temporary variable for swapping and index tracking."
  },
  {
    q: "Consider the array [5, 3, 4, 1, 2]. What will the array look like after the FIRST pass of Selection Sort?",
    options: ["[1, 3, 4, 5, 2]", "[3, 5, 4, 1, 2]", "[1, 2, 3, 4, 5]", "[5, 3, 4, 2, 1]"],
    ans: 0,
    explanation: "The minimum element is 1. It is swapped with the first element (5). The array becomes [1, 3, 4, 5, 2]."
  },
  {
    q: "Which array state represents the output of the SECOND pass of Selection Sort on [64, 25, 12, 22, 11]?",
    options: ["[11, 25, 12, 22, 64]", "[11, 12, 25, 22, 64]", "[11, 12, 22, 25, 64]", "[11, 22, 12, 25, 64]"],
    ans: 1,
    explanation: "Pass 1: min is 11, swap with 64 -> [11, 25, 12, 22, 64]. Pass 2: min of remainder is 12, swap with 25 -> [11, 12, 25, 22, 64]."
  }
];
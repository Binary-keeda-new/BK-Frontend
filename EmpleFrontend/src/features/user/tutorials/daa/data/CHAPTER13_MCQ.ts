export const CHAPTER13_MCQ = [
  {
    q: "What is the worst-case time complexity of Quick Sort? (GATE 2011)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    ans: 2,
    explanation: "The worst-case occurs when the chosen pivot is consistently the greatest or smallest element in the array (e.g., array is already sorted and the last element is chosen as pivot). This leads to O(n^2) time."
  },
  {
    q: "What is the expected (average) time complexity of Quick Sort? (GATE 2005)",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
    ans: 1,
    explanation: "On average, the pivot divides the array into two roughly equal halves, resulting in a recurrence relation T(n) = 2T(n/2) + O(n), which resolves to O(n log n)."
  },
  {
    q: "How can the worst-case time complexity of Quick Sort be easily avoided in practice? (GATE 2009)",
    options: ["By using Merge Sort instead.", "By always choosing the first element as the pivot.", "By choosing a random element as the pivot.", "By sorting the array before applying Quick Sort."],
    ans: 2,
    explanation: "Randomized Quick Sort chooses a random pivot, making the probability of hitting the worst-case O(n^2) scenario astronomically low."
  },
  {
    q: "Is standard Quick Sort an in-place sorting algorithm? (GATE 2007)",
    options: ["Yes, completely O(1) space.", "Yes, it requires O(log n) stack space but no O(n) auxiliary arrays.", "No, it requires O(n) auxiliary space.", "No, it requires O(n^2) auxiliary space."],
    ans: 1,
    explanation: "Quick sort is considered in-place because it doesn't create new arrays to hold the partitioned elements. It only uses O(log n) auxiliary space for the recursion stack."
  },
  {
    q: "Is standard Quick Sort a stable sorting algorithm? (GATE 2015)",
    options: ["Yes, always.", "No, it is generally unstable.", "Only when sorting integers.", "Only when the array is sorted in reverse."],
    ans: 1,
    explanation: "The partitioning process swaps non-adjacent elements, which can easily destroy the relative order of equal elements, making it an unstable sort."
  },
  {
    q: "Which partitioning scheme is generally more efficient for Quick Sort and requires fewer swaps?",
    options: ["Lomuto Partition Scheme", "Hoare Partition Scheme", "Bubble Partition", "Merge Partition"],
    ans: 1,
    explanation: "Hoare's partition scheme uses two pointers that start at opposite ends and move towards each other, typically doing three times fewer swaps on average than Lomuto's."
  },
  {
    q: "In Quick Sort, what is true about the pivot element immediately after the partitioning step? (GATE 2008)",
    options: ["It is placed at the very end of the array.", "It is placed at the very beginning of the array.", "It is placed in its final sorted position.", "It is randomly placed."],
    ans: 2,
    explanation: "The core invariant of Quick Sort's partition step is that all elements smaller than the pivot are to its left, and all greater are to its right. Thus, the pivot is in its final sorted position."
  },
  {
    q: "What is the space complexity of Quick Sort in the WORST case if tail-call optimization is NOT applied?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    ans: 2,
    explanation: "In the worst-case scenario (e.g., already sorted array), the recursion tree becomes a skewed straight line of depth n, requiring O(n) stack space."
  },
  {
    q: "Why is Quick Sort often faster in practice than Merge Sort for large arrays in main memory?",
    options: ["Quick Sort does fewer comparisons.", "Quick Sort has a better worst-case time complexity.", "Quick Sort has excellent spatial locality of reference (cache-friendly).", "Quick Sort is easier to implement."],
    ans: 2,
    explanation: "Quick Sort operates strictly in-place with sequential memory accesses, meaning it utilizes the CPU cache much more effectively than Merge Sort."
  },
  {
    q: "To optimize Quick Sort, what algorithm is typically used when the sub-array size becomes very small (e.g., < 10 elements)?",
    options: ["Merge Sort", "Heap Sort", "Insertion Sort", "Selection Sort"],
    ans: 2,
    explanation: "Insertion Sort has very low overhead and is extremely fast for tiny arrays. Many Quick Sort implementations switch to Insertion Sort for sub-arrays of size 10-20."
  }
];
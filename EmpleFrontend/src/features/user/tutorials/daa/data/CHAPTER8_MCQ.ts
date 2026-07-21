export const CHAPTER8_MCQ = [
  {
    q: "Which of the following is true about a stable sorting algorithm? (GATE 2011)",
    options: ["It uses O(1) extra space.", "It runs in O(n log n) time.", "It preserves the relative order of equal elements.", "It is inherently faster than unstable sorts."],
    ans: 2,
    explanation: "A stable sort ensures that if two elements have the same key, their relative order in the sorted output is the same as it was in the original input array."
  },
  {
    q: "An algorithm is called an 'in-place' sorting algorithm if it: (GATE 2004)",
    options: ["Uses O(n) auxiliary space.", "Does not require any extra space or requires O(1) auxiliary space.", "Operates on linked lists only.", "Uses recursion."],
    ans: 1,
    explanation: "An in-place algorithm transforms the input using no auxiliary data structure. However, a small amount of extra storage space is allowed (O(1))."
  },
  {
    q: "What is the theoretical lower bound on the time complexity of any comparison-based sorting algorithm? (GATE 2008)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    ans: 1,
    explanation: "Any comparison-based sorting algorithm must make at least O(n log n) comparisons in the worst case to distinguish between the n! possible permutations."
  },
  {
    q: "Which of the following sorting algorithms is NOT an in-place algorithm? (GATE 2007)",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Heap Sort"],
    ans: 2,
    explanation: "Standard Merge Sort requires O(n) auxiliary space to merge the divided arrays, thus it is not an in-place sort."
  },
  {
    q: "If you have an array that is already almost sorted, which algorithm will perform best?",
    options: ["Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
    ans: 1,
    explanation: "Insertion sort has a best-case time complexity of O(n) when the array is already sorted, and performs extremely well on 'almost sorted' arrays."
  },
  {
    q: "Which sorting algorithm is typically used as the building block for the C standard library qsort() function? (GATE 2014)",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Radix Sort"],
    ans: 1,
    explanation: "qsort is usually implemented using Quick Sort, often optimized into Introsort (a hybrid of Quicksort, Heapsort, and Insertion sort)."
  },
  {
    q: "In what scenario is an unstable sorting algorithm problematic?",
    options: ["When sorting an array of simple integers.", "When sorting by multiple keys sequentially (e.g., sort by first name, then last name).", "When space complexity is restricted.", "When time complexity must be O(n log n)."],
    ans: 1,
    explanation: "If you sort by first name, and then use an unstable sort for the last name, the relative order of the first names (among people with the same last name) will be scrambled."
  },
  {
    q: "Which of the following is NOT a comparison-based sort? (GATE 2005)",
    options: ["Heap Sort", "Merge Sort", "Radix Sort", "Selection Sort"],
    ans: 2,
    explanation: "Radix Sort (and Counting Sort/Bucket Sort) do not compare elements against each other. Instead, they use the integer values directly as array indices or keys."
  },
  {
    q: "What defines the 'internal sorting' category?",
    options: ["Data is too large to fit in main memory.", "All data is kept in main memory (RAM) during sorting.", "It uses internal hardware registers only.", "It uses no auxiliary memory."],
    ans: 1,
    explanation: "Internal sorting implies the entire dataset fits into the computer's main memory. External sorting is required when data is on disk."
  },
  {
    q: "If memory is highly constrained (e.g., an embedded system), which O(n log n) algorithm is preferred?",
    options: ["Merge Sort", "Heap Sort", "Radix Sort", "Counting Sort"],
    ans: 1,
    explanation: "Heap Sort operates in-place (O(1) extra space) while maintaining an O(n log n) worst-case time complexity, making it ideal for strict memory limits."
  }
];
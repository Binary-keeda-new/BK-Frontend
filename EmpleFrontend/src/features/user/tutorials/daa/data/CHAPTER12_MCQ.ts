export const CHAPTER12_MCQ = [
  {
    q: "Merge sort uses which of the following algorithmic paradigms? (GATE 2004)",
    options: ["Dynamic Programming", "Greedy Approach", "Divide and Conquer", "Backtracking"],
    ans: 2,
    explanation: "Merge sort divides the array into halves, recursively sorts them, and then conquers by merging the two sorted halves."
  },
  {
    q: "What is the worst-case time complexity of Merge Sort? (GATE 2008)",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
    ans: 1,
    explanation: "Merge sort always divides the array in half (log n levels) and merges them taking O(n) time at each level, guaranteeing O(n log n) in all cases."
  },
  {
    q: "Which of the following is a significant DISADVANTAGE of standard Merge Sort compared to Quick Sort? (GATE 2011)",
    options: ["It has a worse worst-case time complexity.", "It is not a stable sort.", "It requires O(n) auxiliary space.", "It cannot sort linked lists efficiently."],
    ans: 2,
    explanation: "Standard Merge sort requires O(n) extra space to temporarily hold the merged subarrays, whereas Quick Sort operates in-place (O(log n) stack space)."
  },
  {
    q: "Is Merge Sort a stable sorting algorithm? (GATE 2014)",
    options: ["Yes, always.", "No, never.", "Only if implemented carefully during the merge step.", "Only for small datasets."],
    ans: 2,
    explanation: "Merge sort is stable as long as the merge function favors the left sub-array when encountering equal elements (i.e., if (L[i] <= R[j]))."
  },
  {
    q: "For which data structure is Merge Sort heavily preferred over Quick Sort? (GATE 2005)",
    options: ["Arrays", "Linked Lists", "Hash Tables", "Binary Search Trees"],
    ans: 1,
    explanation: "Merge sort is incredibly efficient for linked lists because elements can be merged by simply changing pointers, eliminating the O(n) auxiliary space requirement."
  },
  {
    q: "In Merge Sort, how many recursive calls are made to divide an array of size 8 into base cases (size 1)?",
    options: ["7", "8", "14", "15"],
    ans: 3,
    explanation: "It forms a full binary tree of recursive calls. A full binary tree with 8 leaves has 2*8 - 1 = 15 total nodes (calls)."
  },
  {
    q: "What is the time complexity of the 'Merge' step itself when merging two sorted arrays of size n/2? (GATE 2017)",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    ans: 2,
    explanation: "The merge step iterates through both subarrays exactly once, performing constant time operations per element, resulting in O(n) time."
  },
  {
    q: "What is the recurrence relation for the time complexity of Merge Sort? (GATE 2002)",
    options: ["T(n) = T(n-1) + O(n)", "T(n) = 2T(n/2) + O(n)", "T(n) = 2T(n/2) + O(1)", "T(n) = T(n/2) + O(n)"],
    ans: 1,
    explanation: "Merge sort makes two recursive calls of size n/2, and then takes O(n) time to merge the results."
  },
  {
    q: "How can Merge Sort be optimized to avoid unnecessary merges?",
    options: ["By using a random pivot.", "By checking if the last element of the left half is <= the first element of the right half.", "By iterating backwards.", "By swapping adjacent elements first."],
    ans: 1,
    explanation: "If arr[mid] <= arr[mid+1], the two halves are already perfectly sorted together, and the O(n) merge step can be skipped entirely."
  },
  {
    q: "Which hybrid sorting algorithm utilizes Merge Sort and Insertion Sort?",
    options: ["Introsort", "Timsort", "Comb Sort", "Shell Sort"],
    ans: 1,
    explanation: "Timsort (used in Python and Java) is a highly optimized hybrid algorithm derived from Merge Sort and Insertion Sort."
  }
];
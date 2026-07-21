export const CHAPTER14_MCQ = [
  {
    q: "Heap sort is an in-place algorithm, but it is not a stable sort. Is this statement true or false? (GATE 2004)",
    options: ["True", "False"],
    ans: 0,
    explanation: "Heap sort is indeed in-place (O(1) extra space) but is not stable because the operations to maintain the heap property (heapify) swap elements across large distances, destroying relative ordering."
  },
  {
    q: "What is the worst-case time complexity of Heap Sort? (GATE 2011)",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    ans: 1,
    explanation: "Heap Sort guarantees O(n log n) time complexity in the best, average, and worst cases because the maximum depth of the heap is always log(n)."
  },
  {
    q: "In an array-based binary heap, if a node is at index 'i', where is its left child located? (assuming 0-indexed array) (GATE 2008)",
    options: ["2i", "2i + 1", "2i + 2", "i / 2"],
    ans: 1,
    explanation: "In a 0-indexed array, the left child is at 2i + 1, the right child is at 2i + 2, and the parent is at floor((i - 1) / 2)."
  },
  {
    q: "To sort an array in ASCENDING order using Heap Sort, which type of heap must be built first?",
    options: ["Min-Heap", "Max-Heap", "Binary Search Tree", "Fibonacci Heap"],
    ans: 1,
    explanation: "A Max-Heap is required. The maximum element is extracted from the root and swapped with the last element of the heap, placing the largest elements at the end of the array."
  },
  {
    q: "What is the time complexity to build a binary heap from an unsorted array using the bottom-up 'heapify' method? (GATE 2006)",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    ans: 0,
    explanation: "While a single heapify takes O(log n), applying it bottom-up to build the entire heap takes tightly bounded O(n) time, not O(n log n)."
  },
  {
    q: "After extracting the maximum element from a Max-Heap, how is the heap structure repaired? (GATE 2015)",
    options: ["By sorting the entire array again.", "By moving the last element to the root and calling heapify down the tree.", "By calling heapify up from the leaves.", "By shifting all elements one position to the left."],
    ans: 1,
    explanation: "The last leaf node is moved to the root to maintain the complete binary tree shape. Then, 'sift down' or 'heapify' is called on the root to restore the max-heap property."
  },
  {
    q: "Which algorithm guarantees an O(n log n) worst-case time bound AND sorts in-place? (GATE 2002)",
    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Insertion Sort"],
    ans: 2,
    explanation: "Merge sort is O(n log n) worst-case but uses O(n) space. Quick sort is in-place but O(n^2) worst-case. Heap sort achieves both."
  },
  {
    q: "In a Max-Heap with n elements, what is the maximum number of comparisons needed to extract the maximum element and restore the heap?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    ans: 1,
    explanation: "Extracting is O(1), but restoring the heap (heapify) requires traversing down the height of the tree, which is O(log n)."
  },
  {
    q: "What is the primary practical disadvantage of Heap Sort compared to Quick Sort?",
    options: ["It requires more memory.", "It is unstable.", "It has poor cache locality.", "It has a worse time complexity."],
    ans: 2,
    explanation: "Heap Sort jumps around the array accessing indices like 2i+1, which causes frequent cache misses, making it practically slower than Quick Sort's sequential access patterns."
  },
  {
    q: "If an array represents a valid Max-Heap, where is the smallest element located?",
    options: ["At index 0 (the root).", "At the very end of the array.", "In one of the leaf nodes.", "It cannot be determined."],
    ans: 2,
    explanation: "In a Max-Heap, every parent is larger than its children. Therefore, the smallest element must have no children; it must be one of the leaves (located in the second half of the array)."
  }
];
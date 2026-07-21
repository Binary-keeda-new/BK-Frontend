export const CHAPTER14_COMPLETE = [
  {
    instruction: "Complete the formula to find the left child of a node 'i' in a 0-indexed array.",
    template: `void heapify(int arr[], int n, int i) {
    int largest = i;
    // Calculate the index of the left child
    int l = ________;
    
    // Calculate the index of the right child
    int r = 2 * i + 2;
    // ...
}`,
    answer: "2 * i + 1",
    blanks: ["2 * i + 1", "2*i+1", "2*i + 1"]
  },
  {
    instruction: "Complete the loop parameters to build the initial Max-Heap in O(n) time.",
    template: `void heapSort(int arr[], int n) {
    // Start from the last non-leaf node and go up to the root
    for (int i = ________; i >= 0; i--) {
        heapify(arr, n, i);
    }
    // ...
}`,
    answer: "n / 2 - 1",
    blanks: ["n / 2 - 1", "n/2 - 1", "n/2-1"]
  }
];
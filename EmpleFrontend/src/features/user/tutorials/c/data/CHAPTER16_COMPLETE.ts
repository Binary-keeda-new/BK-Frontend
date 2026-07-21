export const CHAPTER16_COMPLETE = [
  {
    instruction: "Fill in the blanks to complete the traversal of a linked list.",
    template: `void printList(struct Node* node) {
    while (node != ___) {
        printf("%d ", node->___);
        node = node->___;
    }
}`,
    answer: `void printList(struct Node* node) {
    while (node != NULL) {
        printf("%d ", node->data);
        node = node->next;
    }
}`,
    blanks: ["NULL", "data", "next"]
  },
  {
    instruction: "Complete the definition of a Doubly Linked List node.",
    template: `struct Node {
    int data;
    struct Node* ___;
    struct Node* ___;
};`,
    answer: `struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};`,
    blanks: ["next", "prev"]
  }
];

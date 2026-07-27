export const CHAPTER16_DEBUG = [
  {
    title: "Appending to Linked List",
    instruction: "Fix the bug in the following code which is supposed to append a node at the end.",
    buggy: `void append(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = NULL;
    struct Node* last = *head_ref;
    if (*head_ref == NULL) {
        *head_ref = new_node;
    }
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = new_node;
}`,
    fixed: `void append(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = NULL;
    struct Node* last = *head_ref;
    if (*head_ref == NULL) {
        *head_ref = new_node;
        return;
    }
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = new_node;
}`,
    expectedOutput: "The new node is correctly appended when the list is initially empty.",
    hints: ["If the list is empty, after setting the head, the function should return. Otherwise it will try to access last->next when last is NULL."]
  },
  {
    title: "Deleting a Node",
    instruction: "Fix the memory leak when deleting the head node.",
    buggy: `void deleteHead(struct Node** head_ref) {
    if (*head_ref == NULL) return;
    *head_ref = (*head_ref)->next;
}`,
    fixed: `void deleteHead(struct Node** head_ref) {
    if (*head_ref == NULL) return;
    struct Node* temp = *head_ref;
    *head_ref = (*head_ref)->next;
    free(temp);
}`,
    expectedOutput: "The head node is removed and its memory is successfully freed.",
    hints: ["You need to free the memory allocated to the node being deleted.", "Store the original head in a temporary pointer before updating the head."]
  },
  {
    title: "Creating a Node",
    instruction: "Fix the bug in creating a new node function. It should return a pointer to the newly created node.",
    buggy: `struct Node* createNode(int data) {
    struct Node node;
    node.data = data;
    node.next = NULL;
    return &node;
}`,
    fixed: `struct Node* createNode(int data) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->next = NULL;
    return node;
}`,
    expectedOutput: "A new node is successfully created dynamically and its pointer is returned.",
    hints: ["Local variables are destroyed once the function exits.", "Use malloc to allocate memory dynamically on the heap."]
  }
];

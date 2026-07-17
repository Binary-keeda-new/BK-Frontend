export const CHAPTER16_DRAG = [
  {
    instructions: "Arrange the lines to implement insertion at the head of a linked list.",
    lines: [
      { id: "a", text: 'void push(struct Node** head_ref, int new_data) {' },
      { id: "b", text: '    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));' },
      { id: "c", text: '    new_node->data = new_data;' },
      { id: "d", text: '    new_node->next = (*head_ref);' },
      { id: "e", text: '    (*head_ref) = new_node;' },
      { id: "f", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  },
  {
    instructions: "Arrange the lines to traverse and print a linked list.",
    lines: [
      { id: "a", text: 'void printList(struct Node* head) {' },
      { id: "b", text: '    struct Node* temp = head;' },
      { id: "c", text: '    while (temp != NULL) {' },
      { id: "d", text: '        printf("%d ", temp->data);' },
      { id: "e", text: '        temp = temp->next;' },
      { id: "f", text: '    }' },
      { id: "g", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  }
];

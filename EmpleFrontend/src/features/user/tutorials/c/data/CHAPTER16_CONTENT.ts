export const CHAPTER16_CONTENT = {
  title: "Linked Lists",
  description: "A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. Instead, each element (node) contains a data part and a reference (or link) to the next node in the sequence. Linked lists allow dynamic memory allocation and efficient insertions and deletions, making them a fundamental part of C programming and advanced data structures.",
  points: [
    {
      heading: "Understanding the Node Structure",
      body: "A linked list is made up of nodes. Each node typically consists of two parts: the data and a pointer to the next node. In C, we define a node using a `struct`.\n\nExample:\n```c\nstruct Node {\n    int data;\n    struct Node* next;\n};\n```"
    },
    {
      heading: "Creating a Node",
      body: "To create a node, we need to allocate memory for it dynamically using `malloc` from `<stdlib.h>`. After allocating memory, we can initialize the data and set the next pointer to `NULL`.\n\nExample:\n```c\nstruct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\nnewNode->data = 10;\nnewNode->next = NULL;\n```"
    },
    {
      heading: "Traversing a Linked List",
      body: "Traversing means visiting each node of the linked list systematically to process or print its data. We start from the `head` pointer and keep moving to the `next` node until we reach `NULL`.\n\nExample:\n```c\nstruct Node* temp = head;\nwhile(temp != NULL) {\n    printf(\"%d -> \", temp->data);\n    temp = temp->next;\n}\n```"
    },
    {
      heading: "Inserting at the Beginning",
      body: "To insert a new node at the beginning, we make the new node's `next` pointer point to the current `head`, and then update the `head` to point to the new node.\n\nExample:\n```c\nvoid insertAtHead(struct Node** head, int newData) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = newData;\n    newNode->next = *head;\n    *head = newNode;\n}\n```"
    },
    {
      heading: "Types of Linked Lists",
      body: "There are three main types of linked lists: \n1. **Singly Linked List**: Each node points to the next node.\n2. **Doubly Linked List**: Each node points to both the previous and the next node.\n3. **Circular Linked List**: The last node points back to the first node, forming a circle."
    }
  ],
  codeDescription: "Comprehensive Example: Creating, inserting, and traversing a singly linked list.",
  code: `#include <stdio.h>
#include <stdlib.h>

// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Function to insert at the beginning
void push(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}

// Function to print the linked list
void printList(struct Node* node) {
    while (node != NULL) {
        printf("%d -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;

    push(&head, 30);
    push(&head, 20);
    push(&head, 10);

    printf("Linked list: ");
    printList(head);

    return 0;
}`
};

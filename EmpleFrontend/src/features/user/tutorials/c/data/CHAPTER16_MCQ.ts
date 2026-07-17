export const CHAPTER16_MCQ = [
  {
    q: "What is the time complexity of inserting a node at the beginning of a singly linked list? **GATE 2018**",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    ans: 0,
    explanation: "Inserting a node at the beginning of a singly linked list takes constant time, O(1), because we only need to update the new node's next pointer to the current head and then update the head pointer itself."
  },
  {
    q: "Which of the following operations is performed more efficiently by a doubly linked list than by a singly linked list? **GATE 2014**",
    options: ["Searching for an unsorted item", "Deleting a node whose location is given", "Inserting a node after a given node", "Traversing the list to process each node"],
    ans: 1,
    explanation: "In a doubly linked list, we can easily delete a node if its location (pointer) is given because we have a pointer to the previous node. In a singly linked list, we would have to traverse from the head to find the previous node."
  },
  {
    q: "Consider a singly linked list where the pointer to the last node is known. What is the time complexity to append a node at the end? **GATE 2021**",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    ans: 0,
    explanation: "Since the pointer to the last node is known, we can simply attach the new node to its next pointer and update the last pointer, which takes O(1) time."
  },
  {
    q: "Which of the following is true about linked list implementation of a stack? **GATE 2016**",
    options: ["In push operation, a new node is inserted at the beginning.", "In pop operation, a node is deleted from the beginning.", "Both A and B are true.", "None of the above."],
    ans: 2,
    explanation: "To achieve O(1) time complexity for both push and pop operations, the linked list implementation of a stack inserts and deletes nodes at the beginning (head) of the list."
  },
  {
    q: "A linear collection of data elements where the linear node is given by means of pointer is called? **GATE 2019**",
    options: ["Linked List", "Node List", "Primitive List", "None of these"],
    ans: 0,
    explanation: "A linked list is a linear data structure in which elements are connected via pointers, distinguishing it from arrays which use contiguous memory."
  },
  {
    q: "In a circular linked list, how do you find that a list is empty? **GATE 2015**",
    options: ["head == NULL", "head->next == NULL", "head->next == head", "head == head->next->next"],
    ans: 0,
    explanation: "In any linked list (including circular), the list is empty if the head pointer is NULL."
  },
  {
    q: "What does the following function do for a given Linked List with first node as head? \n`void fun(struct Node* head) { if(head == NULL) return; fun(head->next); printf(\"%d \", head->data); }` **GATE 2020**",
    options: ["Prints all nodes", "Prints all nodes in reverse order", "Prints alternate nodes", "Prints alternate nodes in reverse order"],
    ans: 1,
    explanation: "The function makes a recursive call with `head->next` before printing the current node's data. Therefore, it prints the linked list in reverse order."
  },
  {
    q: "Consider an implementation of unsorted singly linked list. Suppose it has its representation with a head pointer only. Given the representation, which of the following operation can be implemented in O(1) time? **GATE 2017**",
    options: ["Insertion at the front of the linked list", "Insertion at the end of the linked list", "Deletion of the front node of the linked list", "Both A and C"],
    ans: 3,
    explanation: "With a head pointer, inserting and deleting at the front (head) can be done in O(1) time. Insertion at the end requires O(n) traversal."
  },
  {
    q: "How many pointers are required to implement a simple doubly linked list? **GATE 2013**",
    options: ["1", "2", "3", "4"],
    ans: 1,
    explanation: "Each node in a doubly linked list requires two pointers: one pointing to the next node and one pointing to the previous node."
  },
  {
    q: "What is the maximum number of nodes in a linked list? **GATE 2022**",
    options: ["Determined by compile time configuration", "Determined by available memory", "255", "32767"],
    ans: 1,
    explanation: "Unlike arrays with a fixed size, the size of a linked list is bounded only by the amount of memory available on the heap during runtime."
  }
];

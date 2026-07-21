export const CHAPTER17_MCQ = [
  {
    q: "A linear list of elements in which deletion can be done from one end (front) and insertion can take place only at the other end (rear) is known as a ? **GATE 2011**",
    options: ["Queue", "Stack", "Tree", "Linked list"],
    ans: 0,
    explanation: "A queue is a First-In-First-Out (FIFO) data structure where elements are inserted at the rear and deleted from the front."
  },
  {
    q: "Which of the following data structures is used for evaluating postfix expressions? **GATE 1999**",
    options: ["Queue", "Stack", "Tree", "Graph"],
    ans: 1,
    explanation: "A stack is used to evaluate postfix expressions. Operands are pushed onto the stack, and when an operator is encountered, the top two operands are popped, evaluated, and the result is pushed back."
  },
  {
    q: "A queue is implemented using an array such that ENQUEUE and DEQUEUE operations are performed efficiently. Which one of the following statements is CORRECT (n refers to the number of items in queue)? **GATE 2016**",
    options: ["Both operations can be performed in O(1) time", "At most one operation can be performed in O(1) time but the worst case time for the other operation will be Ω(n)", "The worst case time complexity for both operations will be Ω(n)", "Worst case time complexity for both operations will be Ω(log n)"],
    ans: 0,
    explanation: "If a queue is implemented using a circular array with front and rear pointers, both ENQUEUE and DEQUEUE operations take O(1) time."
  },
  {
    q: "The postfix equivalent of the prefix * + a b - c d is: **GATE 2004**",
    options: ["a b + c d - *", "a b c d + - *", "a b + c d * -", "a b + - c d *"],
    ans: 0,
    explanation: "The prefix expression * + a b - c d translates to the infix (a + b) * (c - d). Converting this to postfix gives a b + c d - *."
  },
  {
    q: "Let S be a stack of size n >= 1. Starting with the empty stack, suppose we push the first n integers in sequence 1, 2, ..., n and pop them out one by one. Which of the following sequences CANNOT be the pop sequence? **GATE 2006**",
    options: ["1, 2, ..., n", "n, n-1, ..., 1", "Sequence containing alternating elements", "A sequence where larger elements are popped before smaller elements that were pushed later"],
    ans: 3,
    explanation: "In a stack, if elements are pushed in order, an element can only be popped if it is at the top. A sequence where a larger element is popped before a smaller element that was pushed later is impossible without popping the smaller element first."
  },
  {
    q: "Which of the following operations on a stack requires O(n) time? **GATE 2008**",
    options: ["Push", "Pop", "Finding the minimum element in an unaugmented stack", "Top"],
    ans: 2,
    explanation: "Push, Pop, and Top operations take O(1) time on a standard stack. Finding the minimum element requires traversing the entire stack, taking O(n) time unless augmented with an auxiliary stack."
  },
  {
    q: "A circular queue has been implemented using a singly linked list where each node consists of a value and a single pointer pointing to the next node. We maintain exactly one external pointer called 'rear' pointing to the last node. The time complexity of Enqueue and Dequeue operations will be: **GATE 2018**",
    options: ["O(1) and O(1)", "O(1) and O(n)", "O(n) and O(1)", "O(n) and O(n)"],
    ans: 0,
    explanation: "Enqueue adds at rear->next and updates rear in O(1). Dequeue removes from rear->next (which is the front) in O(1)."
  },
  {
    q: "Suppose a circular queue of capacity (n-1) elements is implemented with an array of n elements. Assume that the insertion and deletion operations are carried out using REAR and FRONT as array index variables, respectively. Initially, REAR = FRONT = 0. The conditions to detect queue full and queue empty are: **GATE 2012**",
    options: ["Full: (REAR+1) mod n == FRONT, Empty: REAR == FRONT", "Full: (REAR+1) mod n == FRONT, Empty: (FRONT+1) mod n == REAR", "Full: REAR == FRONT, Empty: (REAR+1) mod n == FRONT", "Full: (FRONT+1) mod n == REAR, Empty: REAR == FRONT"],
    ans: 0,
    explanation: "In a circular queue with array of size n, one slot is kept empty to distinguish between full and empty states. Queue is empty when FRONT == REAR, and full when (REAR + 1) % n == FRONT."
  },
  {
    q: "Which data structure is typically used to implement Breadth First Search (BFS) in a graph? **GATE 2007**",
    options: ["Stack", "Queue", "Priority Queue", "Linked List"],
    ans: 1,
    explanation: "BFS explores nodes level by level, which follows the First-In-First-Out property, making a Queue the standard data structure for this algorithm."
  },
  {
    q: "How many stacks are needed to implement a queue such that the enqueue and dequeue operations can be performed? **GATE 2017**",
    options: ["1", "2", "3", "4"],
    ans: 1,
    explanation: "A queue can be implemented using two stacks. One stack is used for enqueue operations, and the other is used for dequeue operations."
  }
];

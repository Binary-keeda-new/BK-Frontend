export const CHAPTER17_CONTENT = {
  title: "Stacks and Queues in C",
  description: "Stacks and Queues are fundamental linear data structures that organize elements in a specific order. A Stack operates on the Last-In-First-Out (LIFO) principle, where the most recently added element is the first one to be removed. Imagine a stack of plates; you add and remove plates from the top. A Queue, on the other hand, follows the First-In-First-Out (FIFO) principle, much like a line of people waiting at a ticket counter. The first person to join the queue is the first to be served. Both data structures can be implemented in C using either arrays or linked lists, each offering unique advantages and use cases ranging from expression evaluation to task scheduling.",
  points: [
    {
      heading: "Introduction to Stacks",
      body: "A stack is a linear data structure that restricts insertion and deletion to one end, called the 'top'. It follows the LIFO (Last-In-First-Out) principle. The primary operations are `push` (to insert an element) and `pop` (to remove an element).\n\nExample:\n```c\n#define MAX 100\nint stack[MAX];\nint top = -1;\n\nvoid push(int value) {\n    if (top >= MAX - 1) return; // Overflow\n    stack[++top] = value;\n}\n```"
    },
    {
      heading: "Key Stack Operations",
      body: "Apart from `push` and `pop`, a stack also supports operations like `peek` (or `top`) to view the top element without removing it, and `isEmpty` to check if the stack has no elements.\n\nExample:\n```c\nint peek() {\n    if (top < 0) return -1; // Empty\n    return stack[top];\n}\n\nint isEmpty() {\n    return top == -1;\n}\n```"
    },
    {
      heading: "Introduction to Queues",
      body: "A queue is a linear data structure open at both ends. One end is always used to insert data (enqueue), and the other is used to remove data (dequeue). It follows the FIFO (First-In-First-Out) methodology.\n\nExample:\n```c\n#define MAX 100\nint queue[MAX];\nint front = -1, rear = -1;\n\nvoid enqueue(int value) {\n    if (rear == MAX - 1) return; // Overflow\n    if (front == -1) front = 0;\n    queue[++rear] = value;\n}\n```"
    },
    {
      heading: "Queue Operations and Circular Queues",
      body: "Basic queue operations include `enqueue`, `dequeue`, `front`, and `rear`. In a simple array implementation, space is wasted as `front` and `rear` move forward. Circular queues solve this by logically connecting the last position back to the first.\n\nExample:\n```c\nint dequeue() {\n    if (front == -1 || front > rear) return -1; // Underflow\n    return queue[front++];\n}\n```"
    },
    {
      heading: "Applications of Stacks and Queues",
      body: "Stacks are heavily used in scenarios requiring reversal, such as undo mechanisms, recursive function call management (call stack), and expression evaluation (infix to postfix). Queues are ideal for order-preserving tasks like CPU scheduling, breadth-first search in graphs, and managing requests in a web server."
    }
  ],
  codeDescription: "Below is a comprehensive example demonstrating an array-based implementation of a Stack.",
  code: `#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int value) {
    if (top >= MAX - 1) {
        printf("Stack Overflow! Cannot push %d\\n", value);
    } else {
        stack[++top] = value;
        printf("Pushed %d onto the stack.\\n", value);
    }
}

int pop() {
    if (top < 0) {
        printf("Stack Underflow!\\n");
        return -1;
    } else {
        int poppedValue = stack[top--];
        printf("Popped %d from the stack.\\n", poppedValue);
        return poppedValue;
    }
}

void display() {
    if (top < 0) {
        printf("Stack is empty.\\n");
    } else {
        printf("Stack elements: ");
        for (int i = top; i >= 0; i--) {
            printf("%d ", stack[i]);
        }
        printf("\\n");
    }
}

int main() {
    push(10);
    push(20);
    push(30);
    display();
    pop();
    display();
    return 0;
}`
};

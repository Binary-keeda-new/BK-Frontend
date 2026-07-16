export const CHAPTER17_DEBUG = [
  {
    title: "Stack Push Operation",
    instruction: "Fix the bug in the stack push operation. The stack has a maximum size of 3. Ensure the overflow condition is correctly checked.",
    buggy: `#include <stdio.h>
#define MAX 3

int stack[MAX];
int top = -1;

void push(int value) {
    if (top > MAX) {
        printf("Overflow");
    } else {
        stack[++top] = value;
    }
}

int main() {
    push(1); push(2); push(3); push(4);
    if(top == 2) printf("Fixed!");
    return 0;
}`,
    fixed: `#include <stdio.h>
#define MAX 3

int stack[MAX];
int top = -1;

void push(int value) {
    if (top >= MAX - 1) {
        printf("Overflow");
    } else {
        stack[++top] = value;
    }
}

int main() {
    push(1); push(2); push(3); push(4);
    if(top == 2) printf("Fixed!");
    return 0;
}`,
    expectedOutput: "OverflowFixed!",
    hints: [
        "The highest index in an array of size MAX is MAX - 1.",
        "Check if top is greater than or equal to MAX - 1 before pushing.",
        "Replace \`top > MAX\` with \`top >= MAX - 1\`."
    ]
  },
  {
    title: "Queue Dequeue Operation",
    instruction: "Fix the logic bug in the dequeue function. The function should properly detect an empty queue.",
    buggy: `#include <stdio.h>
#define MAX 5
int queue[MAX];
int front = -1, rear = -1;

void enqueue(int val) {
    if (rear == MAX - 1) return;
    if (front == -1) front = 0;
    queue[++rear] = val;
}

int dequeue() {
    if (front == -1 || front == rear) {
        printf("Underflow");
        return -1;
    }
    return queue[front++];
}

int main() {
    enqueue(10);
    dequeue();
    dequeue();
    return 0;
}`,
    fixed: `#include <stdio.h>
#define MAX 5
int queue[MAX];
int front = -1, rear = -1;

void enqueue(int val) {
    if (rear == MAX - 1) return;
    if (front == -1) front = 0;
    queue[++rear] = val;
}

int dequeue() {
    if (front == -1 || front > rear) {
        printf("Underflow");
        return -1;
    }
    return queue[front++];
}

int main() {
    enqueue(10);
    dequeue();
    dequeue();
    return 0;
}`,
    expectedOutput: "Underflow",
    hints: [
        "A queue becomes empty when the front index surpasses the rear index.",
        "The condition front == rear means there is still one element left to dequeue.",
        "Change the condition to \`front > rear\`."
    ]
  },
  {
    title: "Circular Queue Insertion",
    instruction: "Correct the formula for moving the rear pointer in a circular queue.",
    buggy: `#include <stdio.h>
#define MAX 3
int queue[MAX];
int front = -1, rear = -1;

void enqueue(int val) {
    if ((rear + 1) == front) {
        printf("Full");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1);
    queue[rear] = val;
}

int main() {
    enqueue(1); enqueue(2); enqueue(3);
    enqueue(4);
    return 0;
}`,
    fixed: `#include <stdio.h>
#define MAX 3
int queue[MAX];
int front = -1, rear = -1;

void enqueue(int val) {
    if ((rear + 1) % MAX == front) {
        printf("Full");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % MAX;
    queue[rear] = val;
}

int main() {
    enqueue(1); enqueue(2); enqueue(3);
    enqueue(4);
    return 0;
}`,
    expectedOutput: "Full",
    hints: [
        "In a circular queue, the pointers wrap around when they reach the end of the array.",
        "Use the modulo operator (%) with MAX to wrap the rear pointer.",
        "Also apply modulo MAX when checking the Full condition."
    ]
  }
];

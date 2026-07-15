export const CHAPTER17_COMPLETE = [
  {
    instruction: "Complete the stack pop function to correctly check for underflow and return the popped value.",
    template: `int pop() {
    if (top ___ 0) {
        return -1;
    }
    return stack[___];
}`,
    answer: `int pop() {
    if (top < 0) {
        return -1;
    }
    return stack[top--];
}`,
    blanks: ["<", "top--"]
  },
  {
    instruction: "Complete the queue enqueue function to correctly update the rear pointer and insert the value.",
    template: `void enqueue(int val) {
    if (rear == MAX - 1) return;
    if (front == -1) front = 0;
    ___ = val;
}`,
    answer: `void enqueue(int val) {
    if (rear == MAX - 1) return;
    if (front == -1) front = 0;
    queue[++rear] = val;
}`,
    blanks: ["queue[++rear]"]
  }
];

export const CHAPTER17_DRAG = [
  {
    instructions: "Arrange the lines to implement a valid stack push operation.",
    lines: [
      { id: "a", text: 'void push(int val) {' },
      { id: "b", text: '    if (top >= MAX - 1) return;' },
      { id: "c", text: '    stack[++top] = val;' },
      { id: "d", text: '}' }
    ],
    order: ["a", "b", "c", "d"]
  },
  {
    instructions: "Arrange the lines to properly dequeue an element from a queue.",
    lines: [
      { id: "a", text: 'int dequeue() {' },
      { id: "b", text: '    if (front == -1 || front > rear) return -1;' },
      { id: "c", text: '    return queue[front++];' },
      { id: "d", text: '}' }
    ],
    order: ["a", "b", "c", "d"]
  }
];

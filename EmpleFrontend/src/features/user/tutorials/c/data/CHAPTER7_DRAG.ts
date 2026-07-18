// CHAPTER7_DRAG.ts
export const CHAPTER7_DRAG = [
  {
    instructions: "Arrange these lines to create a complete C program with a function prototype, definition, and call.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'void sayHello();' },
      { id: "c", text: 'int main() {' },
      { id: "d", text: '    sayHello();' },
      { id: "e", text: '    return 0;' },
      { id: "f", text: '}' },
      { id: "g", text: 'void sayHello() {' },
      { id: "h", text: '    printf("Hello!\\n");' },
      { id: "i", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
  },
  {
    instructions: "Arrange these lines to build a recursive function that calculates the sum of numbers from 1 to n.",
    lines: [
      { id: "a", text: 'int sumTo(int n) {' },
      { id: "b", text: '    if (n == 0) {' },
      { id: "c", text: '        return 0;' },
      { id: "d", text: '    }' },
      { id: "e", text: '    return n + sumTo(n - 1);' },
      { id: "f", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  }
];

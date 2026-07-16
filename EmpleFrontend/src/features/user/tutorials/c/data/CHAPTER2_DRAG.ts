// CHAPTER2_DRAG.ts
export const CHAPTER2_DRAG = [
  {
    instructions: "Arrange these lines to correctly declare, initialize, and print a float variable.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    float price;' },
      { id: "d", text: '    price = 19.99;' },
      { id: "e", text: '    printf("Price: %f\\n", price);' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  },
  {
    instructions: "Arrange these data types in order of typical memory size, from smallest (1 byte) to largest.",
    lines: [
      { id: "a", text: 'char (1 byte)' },
      { id: "b", text: 'short (2 bytes)' },
      { id: "c", text: 'int (4 bytes)' },
      { id: "d", text: 'double (8 bytes)' }
    ],
    order: ["a", "b", "c", "d"]
  }
];

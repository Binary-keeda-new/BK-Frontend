// CHAPTER6_DRAG.ts
export const CHAPTER6_DRAG = [
  {
    instructions: "Arrange these lines to create a while loop that prints 'Hello' 3 times.",
    lines: [
      { id: "a", text: 'int count = 0;' },
      { id: "b", text: 'while (count < 3) {' },
      { id: "c", text: '    printf("Hello\\n");' },
      { id: "d", text: '    count++;' },
      { id: "e", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e"]
  },
  {
    instructions: "Arrange these lines to create a nested loop that prints a 2x2 grid of stars.",
    lines: [
      { id: "a", text: 'for (int i = 0; i < 2; i++) {' },
      { id: "b", text: '    for (int j = 0; j < 2; j++) {' },
      { id: "c", text: '        printf("*");' },
      { id: "d", text: '    }' },
      { id: "e", text: '    printf("\\n");' },
      { id: "f", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  }
];

// CHAPTER3_DRAG.ts
export const CHAPTER3_DRAG = [
  {
    instructions: "Arrange these lines to check if a number is even using the modulus operator.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int num = 10;' },
      { id: "d", text: '    if (num % 2 == 0) {' },
      { id: "e", text: '        printf("Even\\n");' },
      { id: "f", text: '    }' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' }
    ]
  },
  {
    instructions: "Arrange these lines to use the compound addition operator (+=).",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int score = 50;' },
      { id: "d", text: '    score += 25;' },
      { id: "e", text: '    printf("Score: %d\\n", score);' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' }
    ]
  }
];
export default CHAPTER3_DRAG;

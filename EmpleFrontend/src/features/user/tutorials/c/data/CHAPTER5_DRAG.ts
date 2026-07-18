// CHAPTER5_DRAG.ts
export const CHAPTER5_DRAG = [
  {
    instructions: "Arrange these lines to build an if/else pass-fail checker.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int score = 68;' },
      { id: "d", text: '    if (score >= 50) {' },
      { id: "e", text: '        printf("Pass");' },
      { id: "f", text: '    } else {' },
      { id: "g", text: '        printf("Fail");' },
      { id: "h", text: '    }' },
      { id: "i", text: '    return 0;' },
      { id: "j", text: '}' }
    ]
  },
  {
    instructions: "Arrange these lines to create an else-if ladder.",
    lines: [
      { id: "a", text: 'int num = 0;' },
      { id: "b", text: 'if (num > 0) {' },
      { id: "c", text: '    printf("Positive");' },
      { id: "d", text: '} else if (num < 0) {' },
      { id: "e", text: '    printf("Negative");' },
      { id: "f", text: '} else {' },
      { id: "g", text: '    printf("Zero");' },
      { id: "h", text: '}' }
    ]
  }
];
export default CHAPTER5_DRAG;

export const CHAPTER15_DRAG = [
  {
    instructions: "Arrange the lines to create a program that conditionally prints a message based on a defined macro.",
    lines: [
      { id: "a", text: '#define GREETING' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '#ifdef GREETING' },
      { id: "d", text: '    printf("Hello!\\n");' },
      { id: "e", text: '#endif' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  },
  {
    instructions: "Arrange the lines to correctly define and use a parameterized macro to find the square of a number.",
    lines: [
      { id: "a", text: '#define SQUARE(x) ((x) * (x))' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int num = 4;' },
      { id: "d", text: '    int result = SQUARE(num);' },
      { id: "e", text: '    printf("%d", result);' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  }
];

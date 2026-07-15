// CHAPTER4_DRAG.ts
export const CHAPTER4_DRAG = [
  {
    instructions: "Arrange these lines to correctly read and print a full name using fgets and puts.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    char name[50];' },
      { id: "d", text: '    printf("Enter name: ");' },
      { id: "e", text: '    fgets(name, sizeof(name), stdin);' },
      { id: "f", text: '    puts(name);' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' }
    ]
  },
  {
    instructions: "Arrange these lines to print a float rounded to 2 decimal places.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    float pi = 3.14159;' },
      { id: "d", text: '    printf("PI is %.2f\\n", pi);' },
      { id: "e", text: '    return 0;' },
      { id: "f", text: '}' }
    ]
  }
];
export default CHAPTER4_DRAG;

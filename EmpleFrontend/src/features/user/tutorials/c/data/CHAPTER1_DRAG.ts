// CHAPTER1_DRAG.ts
export const CHAPTER1_DRAG = [
  {
    instructions: "Arrange these lines to create a standard, functioning Hello World program.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    printf("Hello, World!\\n");' },
      { id: "d", text: '    return 0;' },
      { id: "e", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e"]
  },
  {
    instructions: "Arrange these lines to show the exact sequence of the C Compilation Process.",
    lines: [
      { id: "a", text: 'Source Code (.c)' },
      { id: "b", text: 'Preprocessing (removes comments, expands macros)' },
      { id: "c", text: 'Compilation (translates to assembly)' },
      { id: "d", text: 'Assembly (translates to object code)' },
      { id: "e", text: 'Linking (combines object code with libraries)' },
      { id: "f", text: 'Executable (.exe or .out)' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  }
];
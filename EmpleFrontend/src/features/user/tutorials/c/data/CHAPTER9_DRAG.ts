export const CHAPTER9_DRAG = [
  {
    instructions: "Arrange the lines to concatenate 'Hello ' and 'World' and print the result.",
    lines: [
      { id: "a", text: '    strcat(str, "World");' },
      { id: "b", text: '    printf("%s\\n", str);' },
      { id: "c", text: '#include <string.h>' },
      { id: "d", text: '    char str[20] = "Hello ";' },
      { id: "e", text: '#include <stdio.h>' },
      { id: "f", text: 'int main() {' },
      { id: "g", text: '}' }
    ],
    order: ["e", "c", "f", "d", "a", "b", "g"]
  },
  {
    instructions: "Arrange the code to read a word from the user and print it.",
    lines: [
      { id: "a", text: '    printf("You entered: %s\\n", word);' },
      { id: "b", text: '    return 0;' },
      { id: "c", text: '    scanf("%s", word);' },
      { id: "d", text: '    char word[50];' },
      { id: "e", text: 'int main() {' },
      { id: "f", text: '#include <stdio.h>' },
      { id: "g", text: '}' }
    ],
    order: ["f", "e", "d", "c", "a", "b", "g"]
  }
];

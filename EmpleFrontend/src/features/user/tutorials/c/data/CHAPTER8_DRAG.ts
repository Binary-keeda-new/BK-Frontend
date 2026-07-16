export const CHAPTER8_DRAG = [
  {
    instructions: "Arrange the lines to declare an array, assign a value to its first element, and print it.",
    lines: [
      { id: "a", text: 'int main() {' },
      { id: "b", text: '    int arr[5];' },
      { id: "c", text: '    arr[0] = 42;' },
      { id: "d", text: '    printf("%d\\n", arr[0]);' },
      { id: "e", text: '    return 0;' },
      { id: "f", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  },
  {
    instructions: "Arrange the lines to calculate the sum of an array of 3 elements.",
    lines: [
      { id: "a", text: 'int main() {' },
      { id: "b", text: '    int arr[3] = {1, 2, 3};' },
      { id: "c", text: '    int sum = 0;' },
      { id: "d", text: '    for(int i = 0; i < 3; i++) {' },
      { id: "e", text: '        sum += arr[i];' },
      { id: "f", text: '    }' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"]
  }
];

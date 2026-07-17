export const CHAPTER10_DRAG = [
  {
    instructions: "Arrange the lines of code to declare a pointer, assign it an address, and print the value it points to.",
    lines: [
      { id: "a", text: 'int num = 50;' },
      { id: "b", text: 'printf("%d", *ptr);' },
      { id: "c", text: 'int main() {' },
      { id: "d", text: 'int *ptr = &num;' },
      { id: "e", text: 'return 0;' },
      { id: "f", text: '}' }
    ],
    order: ["c", "a", "d", "b", "e", "f"]
  },
  {
    instructions: "Arrange the lines of code to correctly iterate over an array using a pointer.",
    lines: [
      { id: "a", text: 'int *p = arr;' },
      { id: "b", text: 'for(int i = 0; i < 3; i++) {' },
      { id: "c", text: 'int arr[] = {1, 2, 3};' },
      { id: "d", text: 'printf("%d ", *(p + i));' },
      { id: "e", text: '}' }
    ],
    order: ["c", "a", "b", "d", "e"]
  }
];

export const CHAPTER12_DRAG = [
  {
    instructions: "Arrange the lines to allocate memory for a single integer, assign it a value, print it, and then free the memory.",
    lines: [
      { id: "a", text: 'int *ptr = (int *)malloc(sizeof(int));' },
      { id: "b", text: 'free(ptr);' },
      { id: "c", text: '*ptr = 100;' },
      { id: "d", text: 'int main() {' },
      { id: "e", text: '    printf("%d\\n", *ptr);' },
      { id: "f", text: '}' },
      { id: "g", text: '#include <stdlib.h>' }
    ],
    order: ["g", "d", "a", "c", "e", "b", "f"]
  },
  {
    instructions: "Arrange the lines to dynamically allocate an array of 3 integers using calloc, check for failure, and free the memory.",
    lines: [
      { id: "a", text: 'int main() {' },
      { id: "b", text: '    if (arr == NULL) return 1;' },
      { id: "c", text: '}' },
      { id: "d", text: '    free(arr);' },
      { id: "e", text: '    int *arr = (int *)calloc(3, sizeof(int));' },
      { id: "f", text: '    return 0;' }
    ],
    order: ["a", "e", "b", "d", "f", "c"]
  }
];

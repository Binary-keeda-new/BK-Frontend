export const CHAPTER11_DRAG = [
  {
    instructions: "Arrange the lines to define a structure, initialize it, and print its member.",
    lines: [
      { id: "a", text: 'struct Car {' },
      { id: "b", text: '    int speed;' },
      { id: "c", text: '};' },
      { id: "d", text: 'int main() {' },
      { id: "e", text: '    struct Car c1 = {120};' },
      { id: "f", text: '    printf("%d", c1.speed);' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"]
  },
  {
    instructions: "Arrange the lines to define and use a union correctly.",
    lines: [
      { id: "a", text: 'union Number {' },
      { id: "b", text: '    int i;' },
      { id: "c", text: '};' },
      { id: "d", text: 'int main() {' },
      { id: "e", text: '    union Number n;' },
      { id: "f", text: '    n.i = 5;' },
      { id: "g", text: '    printf("%d", n.i);' },
      { id: "h", text: '    return 0;' },
      { id: "i", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
  }
];

export const CHAPTER14_DRAG = [
  {
    instructions: "Arrange the lines to swap two numbers without a temporary variable using bitwise XOR.",
    lines: [
      { id: "a", text: 'int main() {' },
      { id: "b", text: '    a = a ^ b;' },
      { id: "c", text: '    int a = 5, b = 10;' },
      { id: "d", text: '    b = a ^ b;' },
      { id: "e", text: '    a = a ^ b;' },
      { id: "f", text: '    return 0;\n}' }
    ],
    order: ["a", "c", "b", "d", "e", "f"]
  },
  {
    instructions: "Arrange the lines to count the number of set bits in an integer using Brian Kernighan's algorithm.",
    lines: [
      { id: "a", text: 'int countSetBits(int n) {' },
      { id: "b", text: '    int count = 0;' },
      { id: "c", text: '    while (n) {' },
      { id: "d", text: '        n = n & (n - 1);' },
      { id: "e", text: '        count++;' },
      { id: "f", text: '    }\n    return count;\n}' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  }
];

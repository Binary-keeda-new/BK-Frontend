export const CHAPTER11_MCQ = [
  {
    q: "What is the size of the following union assuming standard 32-bit architecture? \n```c\nunion Test {\n  int a;\n  char b;\n  float c;\n};\n```\n**GATE 2004**",
    options: ["1 byte", "4 bytes", "8 bytes", "9 bytes"],
    ans: 1,
    explanation: "A union allocates memory equal to its largest member. Here, int and float are 4 bytes, and char is 1 byte. Thus, the size is 4 bytes."
  },
  {
    q: "Which operator is used to access structure members using a pointer to a structure? **GATE 2007**",
    options: [".", "->", "*", "&"],
    ans: 1,
    explanation: "The arrow operator (->) is used to access members of a structure using a pointer to that structure."
  },
  {
    q: "Consider the following C code:\n```c\nstruct node {\n  int i;\n  float j;\n};\nstruct node *s[10];\n```\nWhat does the above declaration mean? **GATE 2000**",
    options: [
      "An array of 10 structures.",
      "A pointer to an array of 10 structures.",
      "An array of 10 pointers to structures.",
      "A structure containing an array of 10 pointers."
    ],
    ans: 2,
    explanation: "`s` is an array of 10 elements, where each element is a pointer to a `struct node`."
  },
  {
    q: "What will be the output of the following C program?\n```c\n#include <stdio.h>\nstruct Point {\n  int x, y, z;\n};\nint main() {\n  struct Point p1 = {.y = 0, .z = 1, .x = 2};\n  printf(\"%d %d %d\", p1.x, p1.y, p1.z);\n  return 0;\n}\n```\n**GATE 2016**",
    options: ["2 0 1", "0 1 2", "Compiler error", "Garbage values"],
    ans: 0,
    explanation: "C99 introduced designated initializers. The members are initialized as specified: x=2, y=0, z=1."
  },
  {
    q: "In a union, what happens when a new value is assigned to a different member? **GATE 2014**",
    options: [
      "The new value is stored in a new memory location.",
      "The previous value is preserved.",
      "The previous value is overwritten.",
      "A compile-time error occurs."
    ],
    ans: 2,
    explanation: "Since all members of a union share the same memory location, assigning a value to one member overwrites the value of the previously assigned member."
  },
  {
    q: "How can you prevent modifying the contents of a structure passed to a function by reference? **GATE 2015**",
    options: [
      "Pass by value instead.",
      "Use the `const` keyword in the function parameter.",
      "Structures cannot be passed by reference.",
      "Use the `static` keyword."
    ],
    ans: 1,
    explanation: "Using `const struct Type *ptr` ensures that the function cannot modify the members of the structure pointed to by `ptr`."
  },
  {
    q: "Consider a structure containing a bit field:\n```c\nstruct Bits {\n  unsigned int a: 5;\n  unsigned int b: 3;\n};\n```\nWhat is the maximum value that `b` can hold? **GATE 2018**",
    options: ["3", "7", "8", "15"],
    ans: 1,
    explanation: "The variable `b` is a 3-bit unsigned integer. The maximum value is 2^3 - 1 = 7."
  },
  {
    q: "What does standard C dictate regarding an empty structure `struct A {};`? **GATE 2019**",
    options: ["It is valid and takes 1 byte.", "It is valid and takes 0 bytes.", "It is a constraint violation (compile error).", "It takes 4 bytes."],
    ans: 2,
    explanation: "Standard C does not allow empty structures. It is a constraint violation. However, some compilers like GCC allow it as an extension, giving it 0 bytes."
  },
  {
    q: "Can a structure contain a pointer to itself? **GATE 2021**",
    options: [
      "Yes, it is called a self-referential structure.",
      "No, it will cause infinite memory allocation.",
      "Yes, but only if the pointer is void*.",
      "No, C does not support recursive structures."
    ],
    ans: 0,
    explanation: "Yes, a structure can contain a pointer to its own type. This is known as a self-referential structure and is heavily used in linked lists and trees."
  },
  {
    q: "What does the following snippet print?\n```c\nunion U {\n  short int i;\n  char c[2];\n};\nunion U u;\nu.i = 256;\nprintf(\"%d %d\", u.c[0], u.c[1]);\n```\nAssume little-endian architecture. **GATE 2022**",
    options: ["0 1", "1 0", "256 0", "0 256"],
    ans: 0,
    explanation: "256 in hex is 0x0100. In little-endian, the least significant byte (0x00) is stored first at c[0], and the most significant byte (0x01) at c[1]. So it prints 0 1."
  }
];

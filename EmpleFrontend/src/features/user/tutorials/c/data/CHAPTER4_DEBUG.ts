// CHAPTER4_DEBUG.ts
export const CHAPTER4_DEBUG = [
  {
    instructions: "Fix the bug so that the user's age is successfully read into memory.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int age;\n    printf("Enter your age: ");\n    scanf("%d", age);\n    printf("You are %d years old.", age);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int age;\n    printf("Enter your age: ");\n    scanf("%d", &age);\n    printf("You are %d years old.", age);\n    return 0;\n}`,
    hints: ["scanf needs to know WHERE in memory to store the integer.", "Use the address-of operator '&' before standard variables in scanf."],
    expectedOutput: "You are [age] years old."
  },
  {
    instructions: "Fix the format specifiers so the variables print correctly.",
    buggy: `#include <stdio.h>\n\nint main() {\n    float price = 19.99;\n    char initial = 'Z';\n    printf("Item %s costs $%d\\n", initial, price);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    float price = 19.99;\n    char initial = 'Z';\n    printf("Item %c costs $%.2f\\n", initial, price);\n    return 0;\n}`,
    hints: ["%s is for strings, not single characters.", "%d is for integers, not floats. Consider formatting the float to 2 decimal places."],
    expectedOutput: "Item Z costs $19.99"
  },
  {
    instructions: "Fix the buffering issue so the character is read properly.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int id;\n    char grade;\n    scanf("%d", &id);\n    scanf("%c", &grade);\n    printf("ID: %d, Grade: %c", id, grade);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int id;\n    char grade;\n    scanf("%d", &id);\n    scanf(" %c", &grade);\n    printf("ID: %d, Grade: %c", id, grade);\n    return 0;\n}`,
    hints: ["When you type an ID and press Enter, the Enter key ('\\n') stays in the buffer.", "Put a space before %c in the second scanf to skip leftover whitespace."],
    expectedOutput: "ID: [id], Grade: [grade]"
  }
];
export default CHAPTER4_DEBUG;

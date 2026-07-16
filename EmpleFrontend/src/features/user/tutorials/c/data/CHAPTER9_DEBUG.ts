export const CHAPTER9_DEBUG = [
  {
    title: "String Comparison Error",
    instruction: "Fix the bug to correctly compare the strings and print 'Same'.",
    buggy: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = "Code";\n    char s2[] = "Code";\n    if (s1 == s2) {\n        printf("Same");\n    }\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = "Code";\n    char s2[] = "Code";\n    if (strcmp(s1, s2) == 0) {\n        printf("Same");\n    }\n    return 0;\n}`,
    expectedOutput: "Same",
    hints: ["'==' compares memory addresses, not the string content.", "Use the strcmp() function from <string.h>.", "strcmp() returns 0 when the strings are identical."]
  },
  {
    title: "Buffer Overflow with strcat",
    instruction: "Fix the code so that the string concatenation does not cause a buffer overflow. Allocate enough space.",
    buggy: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char dest[5] = "Hi ";\n    char src[] = "there!";\n    strcat(dest, src);\n    printf("%s", dest);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char dest[20] = "Hi ";\n    char src[] = "there!";\n    strcat(dest, src);\n    printf("%s", dest);\n    return 0;\n}`,
    expectedOutput: "Hi there!",
    hints: ["The 'dest' array size is only 5.", "It needs to hold 'Hi ' (3 chars) + 'there!' (6 chars) + '\\0' (1 char) = 10 characters.", "Increase the size of 'dest' array."]
  },
  {
    title: "Missing String Terminator",
    instruction: "Fix the bug so that the character array becomes a proper string before printing.",
    buggy: `#include <stdio.h>\n\nint main() {\n    char name[4];\n    name[0] = 'B';\n    name[1] = 'o';\n    name[2] = 'b';\n    printf("%s", name);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    char name[4];\n    name[0] = 'B';\n    name[1] = 'o';\n    name[2] = 'b';\n    name[3] = '\\0';\n    printf("%s", name);\n    return 0;\n}`,
    expectedOutput: "Bob",
    hints: ["A string in C must end with a null character.", "Set the 4th element of the array to '\\0'."]
  }
];

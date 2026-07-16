export const CHAPTER9_COMPLETE = [
  {
    instruction: "Fill in the blanks to find the length of the string 'text' and print it.",
    template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char text[] = "BinaryKeeda";\n    int len = ___(text);\n    printf("Length: %d", ___);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char text[] = "BinaryKeeda";\n    int len = strlen(text);\n    printf("Length: %d", len);\n    return 0;\n}`,
    blanks: ["strlen", "len"]
  },
  {
    instruction: "Complete the code to copy the string 'src' into 'dest'.",
    template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char src[] = "CopyMe";\n    char dest[20];\n    ___(___, src);\n    printf("%s", dest);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char src[] = "CopyMe";\n    char dest[20];\n    strcpy(dest, src);\n    printf("%s", dest);\n    return 0;\n}`,
    blanks: ["strcpy", "dest"]
  }
];

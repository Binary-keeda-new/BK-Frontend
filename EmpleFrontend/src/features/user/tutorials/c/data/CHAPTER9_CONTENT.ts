export const CHAPTER9_CONTENT = {
  title: "Strings in C",
  description: "In C programming, a string is a sequence of characters terminated by a null character `\\0`. Unlike other languages like Java or Python, C does not have a built-in String type. Instead, strings are represented as one-dimensional arrays of characters. Understanding strings is crucial for manipulating text, parsing data, and handling user input in C.",
  points: [
    {
      heading: "String Declaration and Initialization",
      body: "Strings can be declared as character arrays and initialized in various ways. The compiler automatically appends a null character `\\0` when initialized with a string literal.\n\nExample:\n```c\nchar str1[] = \"Hello\"; // Compiler adds \\0 implicitly\nchar str2[6] = {'H', 'e', 'l', 'l', 'o', '\\0'}; // Explicit \\0\n```"
    },
    {
      heading: "Reading and Printing Strings",
      body: "Strings can be read using `scanf` or `fgets`, and printed using `printf` or `puts`. `scanf` with `%s` stops reading at the first whitespace.\n\nExample:\n```c\nchar name[50];\nprintf(\"Enter name: \");\nscanf(\"%s\", name); // Reads a single word\nprintf(\"Hello, %s!\\n\", name);\n```"
    },
    {
      heading: "String Length and Built-in Functions",
      body: "The `<string.h>` library provides many useful string functions, such as `strlen()` to find the length (excluding the null terminator), `strcpy()` to copy strings, and `strcmp()` to compare them.\n\nExample:\n```c\n#include <string.h>\nchar src[] = \"Programming\";\nchar dest[20];\nstrcpy(dest, src);\nint len = strlen(dest);\n```"
    },
    {
      heading: "String Concatenation",
      body: "The `strcat()` function appends a copy of the source string to the end of the destination string. The destination string must have enough space to hold the result.\n\nExample:\n```c\nchar str1[20] = \"Hello, \";\nchar str2[] = \"World!\";\nstrcat(str1, str2); // str1 becomes \"Hello, World!\"\n```"
    },
    {
      heading: "Pointers and Strings",
      body: "String literals can also be accessed using character pointers. However, modifying a string literal via a pointer leads to undefined behavior, as string literals are typically stored in read-only memory.\n\nExample:\n```c\nchar *str = \"Hello\"; // Read-only string\n// str[0] = 'h'; // Error: undefined behavior\nstr = \"World\"; // Valid: str points to a new literal\n```"
    }
  ],
  codeDescription: "Here is a complete program demonstrating string declaration, manipulation, and the use of `<string.h>` functions.",
  code: `#include <stdio.h>
#include <string.h>

int main() {
    char str1[50] = "Hello";
    char str2[] = "World";
    char dest[50];

    // 1. String Length
    // %lu is used for size_t which is returned by strlen
    printf("Length of str1: %lu\\n", strlen(str1));

    // 2. String Concatenation
    strcat(str1, " "); // str1 is now "Hello "
    strcat(str1, str2); // str1 is now "Hello World"
    printf("Concatenated String: %s\\n", str1);

    // 3. String Copy
    strcpy(dest, str1);
    printf("Copied String: %s\\n", dest);

    // 4. String Comparison
    int result = strcmp("Apple", "Banana");
    if (result < 0) {
        printf("\\"Apple\\" comes before \\"Banana\\"\\n");
    }

    return 0;
}`
};

// --- TYPES & INTERFACES ---
export interface Point {
  heading: string;
  body: string;
}

export interface ChapterContent {
  title: string;
  description: string;
  points: Point[];
  code: string;
}

export interface MCQQuestion {
  q: string;
  options: string[];
  ans: number;
  explanation: string;
}

export interface DebugExercise {
  instructions: string;
  buggy: string;
  fixed: string;
  hints: string[];
  expectedOutput: string;
}

export interface DragLine {
  id: string;
  text: string;
}

export interface DragExercise {
  instructions: string;
  lines: DragLine[];
  order: string[];
}

export interface CompleteExercise {
  template: string;
  answer: string;
  blanks: string[];
  instruction: string;
}

// --- CURRICULUM DATA ---
export const CONTENT: Record<string, ChapterContent> = {
  basics: {
    title: "C Basics",
    description: "C is a general-purpose, compiled language created by Dennis Ritchie in 1972. It sits close to the hardware, giving you direct memory control and raw speed.",
    points: [
      { heading: "Structure of a C program", body: "Every C program starts execution from the `main()` function. Statements end with a semicolon. Curly braces `{}` group blocks of code." },
      { heading: "Compilation", body: "Source `.c` → Compiler `gcc` → Object file → Executable. Run with: `gcc hello.c -o hello && ./hello`" },
      { heading: "Comments", body: "`// Single-line comment`\n`/* Multi-line comment */`" },
      { heading: "Keywords", body: "Reserved words like `int`, `return`, `if`, `for`, `while` cannot be used as variable names." },
      { heading: "Header Files", body: "`#include <stdio.h>` imports standard input/output functions. Headers `.h` declare function prototypes shared across files." },
      { heading: "main() Return Success", body: "`main()` must return an `int`. Returning `0` signals successful execution to the operating system; non-zero values signal errors." },
    ],
    code: `#include <stdio.h>   /* include standard I/O library */\n\nint main() {           /* program starts here */\n    // print a message\n    printf("Hello, World!\\n");\n    return 0;          /* 0 = success */\n}`,
  },
  variables: {
    title: "Variables & Data Types",
    description: "Variables are named memory locations. C is statically typed — you must declare the type before use.",
    points: [
      { heading: "Common types", body: "`int` (integer), `float` (decimal), `double` (large decimal), `char` (single character), `void` (no value)" },
      { heading: "Declaration & Initialisation", body: "`int age = 25;`\n`float pi = 3.14;`\n`char grade = 'A';`" },
      { heading: "Constants", body: "Use `const` or `#define`: `const int MAX = 100;`  or  `#define MAX 100`" },
      { heading: "Type sizes", body: "`sizeof(int)` reveals how many bytes a type uses — it varies by platform (usually 4 bytes for `int`)." },
      { heading: "Naming Rules", body: "Variable names must <u>start with a letter or underscore</u>, are <u>case-sensitive</u> (`age != Age`), and <u>cannot use reserved keywords</u>." },
      { heading: "Type Casting", body: "Convert types explicitly: `(float)total / count`. Implicit conversion happens automatically but can lose decimal precision." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    int    age    = 20;\n    float  gpa    = 3.85;\n    double salary = 50000.00;\n    char   grade  = 'A';\n\n    printf("Age: %d\\n",    age);\n    printf("GPA: %.2f\\n",  gpa);\n    printf("Pay: %.2f\\n",  salary);\n    printf("Grade: %c\\n",  grade);\n    return 0;\n}`,
  },
  io: {
    title: "Input & Output",
    description: "C uses printf() for output and scanf() for input, both from the stdio.h header. Format specifiers map C types to text.",
    points: [
      { heading: "printf() format specifiers", body: "`%d` `int` · `%f` `float` · `%lf` `double` · `%c` `char` · `%s` `string` · `%ld` `long`" },
      { heading: "scanf() basics", body: "`scanf(\"%d\", &age);` — the `&` passes the memory address so `scanf` can write the value there." },
      { heading: "String input", body: "`char name[50];`\n`scanf(\"%s\", name);` // reads until whitespace\n`fgets(name, 50, stdin);` // reads a full line" },
      { heading: "Output formatting", body: "`%.2f` → 2 decimal places\n`%10d` → right-align in 10 chars\n`%-10d` → left-align" },
      { heading: "Buffer Flushing", body: "`stdout` is buffered; `fflush(stdout)` forces writing to the screen. `\\n` also triggers a flush on most terminals." },
      { heading: "Return Values", body: "`printf` returns characters written. `scanf` returns items successfully matched — useful for input validation." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    char name[50];\n    int  age;\n\n    printf("Enter your name: ");\n    scanf("%s", name);\n\n    printf("Enter your age: ");\n    scanf("%d", &age);\n\n    printf("Hello, %s! You are %d years old.\\n", name, age);\n    return 0;\n}\n`,
  },
  operators: {
    title: "Operators & Expressions",
    description: "Operators combine values and variables into expressions. C groups them into arithmetic, relational, logical, assignment, and bitwise families, each evaluated according to precedence rules.",
    points: [
      { heading: "Arithmetic operators", body: "`+` ` -` `*` `/` `%` — the modulus operator `%` returns the remainder of integer division. Division between two `int`s <u>truncates toward zero</u>." },
      { heading: "Relational & logical operators", body: "`==` `!=` `<` `>` `<=` `>=` compare values and produce `0` or `1`. `&&` `||` `!` combine or invert conditions." },
      { heading: "Assignment & increment/decrement", body: "`=` `+=` `-=` `*=` `/=` `%=` update a variable in place. `++` and `--` add or subtract 1; prefix (`++x`) updates before use, postfix (`x++`) updates after." },
      { heading: "Precedence & bitwise operators", body: "`*` and `/` bind tighter than `+` and `-`; use parentheses to be explicit. Bitwise `&` `|` `^` `~` `<<` `>>` manipulate individual bits directly." },
      { heading: "Short-Circuit Evaluation", body: "In `&&` and `||`, evaluation stops as soon as the outcome is certain (e.g. if the first operand of `&&` is `0`, the second is skipped)." },
      { heading: "Ternary Conditional", body: "`expr1 ? expr2 : expr3` evaluates `expr1`. If non-zero, it returns `expr2`; otherwise, it returns `expr3`." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n\n    printf("a + b = %d\\n", a + b);\n    printf("a - b = %d\\n", a - b);\n    printf("a * b = %d\\n", a * b);\n    printf("a / b = %d\\n", a / b);   // integer division truncates\n    printf("a %% b = %d\\n", a % b);  // remainder\n\n    int counter = 5;\n    printf("counter++ = %d\\n", counter++); // prints 5, then becomes 6\n    printf("++counter = %d\\n", ++counter); // becomes 7, then prints 7\n\n    printf("a > b is %d\\n", a > b);   // 1 (true)\n    printf("a == b is %d\\n", a == b); // 0 (false)\n\n    return 0;\n}`,
  },
  "control-flow": {
    title: "Control Flow: if, else & switch",
    description: "Control-flow statements let a program make decisions. A condition in C is just an expression — any non-zero value is treated as true, and 0 is false.",
    points: [
      { heading: "if / else if / else", body: "`if (condition) {` \n`    // block 1` \n`} else if (condition2) {` \n`    // block 2` \n`} else {` \n`    // block 3` \n`}`\n\nRuns the first matching block and skips the rest." },
      { heading: "Combining & nesting conditions", body: "Use `&&` and `||` to combine conditions, and nest `if` statements inside each other for multi-step logic." },
      { heading: "switch statement", body: "`switch (value) {` \n`    case val1:` \n`        // code` \n`        break;` \n`    default:` \n`        // code` \n`}`\n\nMatches against several case labels. `break` stops fall-through; `default` runs when nothing matches." },
      { heading: "Ternary operator", body: "`result = condition ? valueIfTrue : valueIfFalse;` \n\nA compact one-line alternative to a simple `if`/`else` statement." },
      { heading: "Dangers of Fall-through", body: "Omitting `break` in a `switch` statement makes execution continue into subsequent cases — usually a <u>bug</u>." },
      { heading: "Boolean Values in C", body: "C has no native boolean type before C99 (`<stdbool.h>`). Any expression evaluating to `0` is `false`; all else is `true`." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    int score = 72;\n\n    if (score >= 90) {\n        printf("Grade: A\\n");\n    } else if (score >= 75) {\n        printf("Grade: B\\n");\n    } else if (score >= 60) {\n        printf("Grade: C\\n");\n    } else {\n        printf("Grade: F\\n");\n    }\n\n    char status = (score >= 60) ? 'P' : 'F';\n    printf("Pass/Fail: %c\\n", status);\n\n    switch (status) {\n        case 'P':\n            printf("Status: Passed\\n");\n            break;\n        case 'F':\n            printf("Status: Failed\\n");\n            break;\n        default:\n            printf("Status: Unknown\\n");\n    }\n\n    return 0;\n}`,
  },
  loops: {
    title: "Loops: for, while & do-while",
    description: "Loops repeat a block of code. C offers three forms — choose based on whether you know the iteration count up front and whether the body must run at least once.",
    points: [
      { heading: "for loop", body: "`for (init; condition; update) {` \n`    // loop body` \n`}`\n\nIdeal when you know how many times to repeat, e.g. iterating over an array by index." },
      { heading: "while loop", body: "`while (condition) {` \n`    // loop body` \n`}`\n\nChecks the condition first; may run zero times if the condition starts out `false`." },
      { heading: "do-while loop", body: "`do {` \n`    // loop body` \n`} while (condition);` \n\nAlways runs the body <u>at least once</u> before checking the condition." },
      { heading: "break & continue", body: "`break` exits the loop immediately; `continue` skips the rest of the current iteration and jumps to the next one." },
      { heading: "Infinite Loops", body: "`for(;;)` or `while(1)` run forever. Use them when you want to handle exit conditions dynamically inside the loop body body." },
      { heading: "Nested Loops", body: "Loops inside loops (e.g. nested rows and columns). Keep track of inner and outer loop counters to avoid infinite loops." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    // for loop: print 1 to 5\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n\n    // while loop: sum until total exceeds 20\n    int total = 0, n = 1;\n    while (total <= 20) {\n        total += n;\n        n++;\n    }\n    printf("Total: %d\\n", total);\n\n    // do-while: runs at least once\n    int count = 0;\n    do {\n        printf("Count: %d\\n", count);\n        count++;\n    } while (count < 3);\n\n    // break and continue\n    for (int i = 1; i <= 10; i++) {\n        if (i == 7) break;\n        if (i % 2 == 0) continue;\n        printf("Odd: %d\\n", i);\n    }\n\n    return 0;\n}`,
  },
  functions: {
    title: "Functions",
    description: "Functions package code into reusable, named blocks. C passes arguments by value (a copy), and every function has a fixed return type — use void if it returns nothing.",
    points: [
      { heading: "Function syntax", body: "`returnType name(parameters) { body }` — the body executes when the function is called and may send a value back with `return`." },
      { heading: "Prototypes / declarations", body: "Declaring a function's signature before `main()` lets the compiler check calls even if the full definition appears later in the file." },
      { heading: "Parameters & return values", body: "<u>Pass by value</u> means the function receives a copy of each argument — changes inside the function don't affect the caller's variable." },
      { heading: "Recursion", body: "A function that calls itself needs a <u>base case</u> to stop, or it will recurse forever and overflow the call stack." },
      { heading: "Scope of Variables", body: "Variables declared inside a function are <u>local</u> to it. Global variables are accessible everywhere but increase code coupling." },
      { heading: "Static Variables", body: "Declaring local variables `static` preserves their values across function calls, initializing them <u>only once</u> on startup." },
    ],
    code: `#include <stdio.h>\n\n// function prototypes\nint add(int a, int b);\nint factorial(int n);\n\nint main() {\n    int result = add(4, 7);\n    printf("Sum: %d\\n", result);\n\n    printf("5! = %d\\n", factorial(5));\n\n    return 0;\n}\n\n// function definitions\nint add(int a, int b) {\n    return a + b;\n}\n\nint factorial(int n) {\n    if (n <= 1) return 1;          // base case\n    return n * factorial(n - 1);   // recursive case\n}`,
  },
  arrays: {
    title: "Arrays",
    description: "An array stores a fixed-size sequence of elements of the same type in contiguous memory. Elements are accessed by a zero-based index.",
    points: [
      { heading: "Declaring & initializing", body: "`int nums[5];` reserves space for 5 `int`s; `int nums[5] = {1,2,3,4,5};` initializes them — the size can also be inferred from the list." },
      { heading: "Accessing elements", body: "Arrays are <u>zero-indexed</u>: `nums[0]` is the first element and `nums[4]` is the last element of a 5-element array." },
      { heading: "Iterating with loops", body: "A `for` loop from `i = 0` to `size - 1` is the standard way to visit every element of an array." },
      { heading: "Multidimensional arrays", body: "`int grid[3][3];` declares a 2D array of rows and columns, accessed as `grid[row][col]`." },
      { heading: "Array Decay", body: "When passed to functions, arrays <u>decay into pointers</u> to their first elements. Array size information is lost." },
      { heading: "Designated Initializers", body: "Initialize specific indices: `int arr[5] = {[2] = 10, [4] = 20};` sets index 2 to 10 and 4 to 20, leaving others at 0." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    int nums[5] = {10, 20, 30, 40, 50};\n\n    // access and modify\n    printf("First: %d\\n", nums[0]);\n    nums[2] = 99;\n\n    // iterate with a loop\n    for (int i = 0; i < 5; i++) {\n        printf("nums[%d] = %d\\n", i, nums[i]);\n    }\n\n    // 2D array\n    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    for (int r = 0; r < 2; r++) {\n        for (int c = 0; c < 3; c++) {\n            printf("%d ", grid[r][c]);\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`,
  },
  strings: {
    title: "Strings",
    description: "C has no built-in string type. A string is just an array of characters ending in a null terminator '\\0'. The string.h header provides helper functions for working with them.",
    points: [
      { heading: "Strings as char arrays", body: "`char name[] = \"Alice\";` is really `{'A','l','i','c','e','\\0'}` — the <u>null terminator</u> `\\0` marks where the string ends." },
      { heading: "Common string.h functions", body: "`strlen()` length, `strcpy()` copy, `strcat()` concatenate, `strcmp()` compare (returns `0` when the strings are equal)." },
      { heading: "Reading strings", body: "`scanf(\"%s\", str)` stops at the first whitespace; `fgets(str, size, stdin)` reads a full line, spaces included." },
      { heading: "Looping over a string", body: "Since C strings don't store their own length, loop until you reach the `\\0` terminator to process each character." },
      { heading: "Buffer Overflows", body: "Reading input without bounds checks (like old `gets`) lets strings overwrite adjacent memory, causing system crashes." },
      { heading: "String Literals", body: "`char *s = \"Hello\";` points to read-only memory. Modifying `s[0]` causes undefined behavior; use `char s[]` for editable strings." },
    ],
    code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char greeting[20] = "Hello";\n    char name[20] = "World";\n\n    printf("Length of greeting: %lu\\n", strlen(greeting));\n\n    strcat(greeting, ", ");\n    strcat(greeting, name);\n    printf("Combined: %s\\n", greeting);\n\n    if (strcmp(name, "World") == 0) {\n        printf("Names match!\\n");\n    }\n\n    // manually loop over characters until the null terminator\n    for (int i = 0; greeting[i] != '\\0'; i++) {\n        printf("%c", greeting[i]);\n    }\n    printf("\\n");\n\n    return 0;\n}`,
  },
  pointers: {
    title: "Pointers",
    description: "A pointer is a variable that stores the memory address of another variable. Pointers are central to C's flexibility — and a common source of bugs if used carelessly.",
    points: [
      { heading: "Address-of & dereference", body: "`&` gets a variable's memory address; `*` dereferences a pointer to read or write the value it points to." },
      { heading: "Declaring pointers", body: "`int *p;` declares `p` as a pointer to an `int`; `p = &x;` makes `p` point to the variable `x`." },
      { heading: "Pointers and functions", body: "Passing a pointer lets a function modify the caller's original variable, since both sides now share the same address." },
      { heading: "Pointers and arrays", body: "An array name decays to a pointer to its first element, so `arr[i]` is equivalent to `*(arr + i)`." },
      { heading: "Pointer Arithmetic", body: "`ptr + 1` moves `ptr` forward by the size of the type it points to. Subtracting two pointers yields the number of elements between them." },
      { heading: "NULL & Void Pointers", body: "`NULL` points to nothing (safe default). `void*` is a generic pointer that can point to any type without typecasting." },
    ],
    code: `#include <stdio.h>\n\nvoid increment(int *p) {\n    (*p)++;   // modify the original variable through the pointer\n}\n\nint main() {\n    int x = 10;\n    int *ptr = &x;\n\n    printf("Value of x: %d\\n", x);\n    printf("Address of x: %p\\n", &x);\n    printf("Value via pointer: %d\\n", *ptr);\n\n    *ptr = 20;  // change x through the pointer\n    printf("x after *ptr = 20: %d\\n", x);\n\n    increment(&x);\n    printf("x after increment(): %d\\n", x);\n\n    int arr[3] = {1, 2, 3};\n    int *arrPtr = arr;        // array decays to a pointer\n    printf("First element via pointer: %d\\n", *arrPtr);\n    printf("Second element via pointer: %d\\n", *(arrPtr + 1));\n\n    return 0;\n}`,
  },
  structures: {
    title: "Structures",
    description: "A struct groups related variables of different types under one name, letting you model real-world records like a student or a point in space.",
    points: [
      { heading: "Defining a struct", body: "`struct Point { int x; int y; };` defines a new type; declare a variable of it with `struct Point p1;`." },
      { heading: "Accessing members", body: "Use the dot operator on a regular struct variable: `p1.x = 5;` reads or sets a member." },
      { heading: "typedef", body: "`typedef struct {...} Point;` lets you write `Point` instead of `struct Point` every time you declare a variable." },
      { heading: "Struct pointers", body: "When you have a pointer to a struct, access members with the arrow operator: `p->x` instead of `(*p).x`." },
      { heading: "Struct Padding", body: "Compilers insert empty padding bytes to align struct data with memory word boundaries. `sizeof(struct)` may exceed member sums." },
      { heading: "Nested Structures", body: "Structs can contain other structs as members: `struct Rectangle { struct Point topLeft; struct Point bottomRight; };`." },
    ],
    code: `#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char name[30];\n    int age;\n    float gpa;\n} Student;\n\nvoid printStudent(Student *s) {\n    printf("Name: %s, Age: %d, GPA: %.2f\\n", s->name, s->age, s->gpa);\n}\n\nint main() {\n    Student s1;\n    strcpy(s1.name, "Maria");\n    s1.age = 21;\n    s1.gpa = 3.7;\n\n    printStudent(&s1);\n\n    Student s2 = {"Jon", 19, 3.2};\n    printStudent(&s2);\n\n    return 0;\n}`,
  },
  "file-handling": {
    title: "File Handling",
    description: "C reads and writes files through FILE pointers using functions from stdio.h such as fopen, fclose, fprintf, and fscanf.",
    points: [
      { heading: "Opening & closing files", body: "`FILE *fp = fopen(\"data.txt\", \"w\");` opens a file; always check that `fp` isn't `NULL`, and call `fclose(fp)` when finished." },
      { heading: "File modes", body: "`\"r\"` read, `\"w\"` write (overwrites existing content), `\"a\"` append to the end, `\"r+\"` read and write." },
      { heading: "Writing & reading", body: "`fprintf(fp, ...)` writes formatted text to a file; `fscanf(fp, ...)` reads it back; `fgets`/`fputs` work a line at a time." },
      { heading: "Checking for errors", body: "Always verify `fopen` succeeded before using the file pointer — a missing file or bad permissions makes it return `NULL`." },
      { heading: "Character & Block I/O", body: "`fgetc`/`fputc` handle single characters. `fread`/`fwrite` handle raw binary blocks — essential for custom binary formats." },
      { heading: "File Position Indicator", body: "`ftell()` returns current offset. `fseek()` repositions it. `rewind()` moves it back to the start of the file." },
    ],
    code: `#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("notes.txt", "w");\n    if (fp == NULL) {\n        printf("Error opening file!\\n");\n        return 1;\n    }\n\n    fprintf(fp, "Learning C is fun!\\n");\n    fprintf(fp, "Line two.\\n");\n    fclose(fp);\n\n    // now read it back\n    fp = fopen("notes.txt", "r");\n    if (fp == NULL) {\n        printf("Error opening file!\\n");\n        return 1;\n    }\n\n    char line[100];\n    while (fgets(line, sizeof(line), fp) != NULL) {\n        printf("Read: %s", line);\n    }\n\n    fclose(fp);\n    return 0;\n}`,
  },
  memory: {
    title: "Dynamic Memory Allocation",
    description: "C lets you request memory from the heap at runtime using malloc, calloc, and realloc — and it's your responsibility to free it when you're done.",
    points: [
      { heading: "malloc & free", body: "`malloc(size)` reserves raw bytes on the heap and returns a `void*`; `free(ptr)` releases that memory once you're finished with it." },
      { heading: "calloc", body: "Like `malloc`, but it zero-initializes the memory and takes `(count, size)` as two arguments instead of one total byte count." },
      { heading: "realloc", body: "Resizes a previously allocated block, possibly moving it in memory — always reassign the pointer to `realloc`'s return value." },
      { heading: "Avoiding leaks & dangling pointers", body: "Every `malloc`/`calloc` needs a matching `free`. Using memory after it's been freed (a dangling pointer) is undefined behavior." },
      { heading: "Heap vs Stack", body: "Stack allocation is local and automatic. Heap allocation persists until explicitly freed but is slightly slower." },
      { heading: "Memory Fragmentation", body: "Allocating and freeing blocks of varying sizes creates empty pockets in heap memory, reducing usable contiguous space." },
    ],
    code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = (int *) malloc(n * sizeof(int));\n\n    if (arr == NULL) {\n        printf("Memory allocation failed!\\n");\n        return 1;\n    }\n\n    for (int i = 0; i < n; i++) {\n        arr[i] = i * i;\n    }\n\n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n\n    // grow the array to hold 8 elements\n    arr = (int *) realloc(arr, 8 * sizeof(int));\n    for (int i = n; i < 8; i++) {\n        arr[i] = 0;\n    }\n\n    free(arr);  // always free what you malloc
    return 0;
  }`,
  },
};

export const MCQ: Record<string, MCQQuestion[]> = {
  "basics": [
      {
          "q": "Which of the following is true about C program execution? **GATE 2005**",
          "options": [
              "Execution begins at the main() function",
              "Execution begins at the first function defined in the file",
              "Execution begins at the #include directive",
              "Execution begins at the global variable declarations"
          ],
          "ans": 0,
          "explanation": "In C, the execution of a program always begins at the main() function, regardless of where it is defined in the source file."
      },
      {
          "q": "What is the standard return type of main() in C according to C99? **GATE 2015**",
          "options": [
              "void",
              "int",
              "float",
              "char"
          ],
          "ans": 1,
          "explanation": "According to the C99 standard, the main() function must return an integer value to the operating system, making 'int' the standard return type."
      },
      {
          "q": "Which of the following is not a valid C token? **GATE 2011**",
          "options": [
              "Keywords",
              "Identifiers",
              "Constants",
              "Macros"
          ],
          "ans": 3,
          "explanation": "Macros are preprocessor directives, not C tokens. The basic C tokens are keywords, identifiers, constants, strings, operators, and special symbols."
      },
      {
          "q": "Which phase of the compilation process is responsible for macro expansion? **GATE 2017**",
          "options": [
              "Lexical analysis",
              "Syntax analysis",
              "Preprocessing",
              "Code generation"
          ],
          "ans": 2,
          "explanation": "The preprocessor handles macro expansion, file inclusion, and conditional compilation before the actual compilation begins."
      },
      {
          "q": "What is the typical output of the lexical analyzer during C compilation? **GATE 2004**",
          "options": [
              "Parse tree",
              "Machine code",
              "Stream of tokens",
              "Object code"
          ],
          "ans": 2,
          "explanation": "The lexical analyzer (scanner) reads the source code character by character and groups them into meaningful units called tokens."
      },
      {
          "q": "Which of the following is true regarding comments in C? **GATE 2010**",
          "options": [
              "Comments are processed by the compiler",
              "Comments are removed by the preprocessor",
              "Comments increase the size of the executable",
              "Nested comments are always allowed in standard C"
          ],
          "ans": 1,
          "explanation": "The preprocessor removes comments and replaces them with a single space before the code is sent to the compiler."
      },
      {
          "q": "During the compilation of a C program, what does the linker do? **GATE 2016**",
          "options": [
              "Translates C code to assembly",
              "Translates assembly to machine code",
              "Combines object files and resolves external references",
              "Executes the program"
          ],
          "ans": 2,
          "explanation": "The linker's primary job is to combine one or more object files and library files into a single executable, resolving external symbols and addresses."
      },
      {
          "q": "Which of the following is not a standard keyword in C? **GATE 2018**",
          "options": [
              "volatile",
              "sizeof",
              "typeof",
              "typedef"
          ],
          "ans": 2,
          "explanation": "While 'typeof' is provided as an extension by some compilers like GCC, it is not a standard keyword in ANSI C / C99."
      },
      {
          "q": "What does the `#include` directive do in a C program? **GATE 2006**",
          "options": [
              "Links the library file to the executable",
              "Copies the contents of the included file into the source file",
              "Compiles the included file",
              "Optimizes the source code"
          ],
          "ans": 1,
          "explanation": "The #include directive tells the preprocessor to physically insert the contents of the specified file into the source code at that point."
      },
      {
          "q": "Which tool translates assembly language into machine code in the C toolchain? **GATE 2012**",
          "options": [
              "Compiler",
              "Linker",
              "Assembler",
              "Preprocessor"
          ],
          "ans": 2,
          "explanation": "The assembler takes the assembly language code produced by the compiler and translates it into machine code (object file)."
      },
      {
          "q": "What is the extension of an object file generated by a C compiler on Unix-like systems? **GATE 2014**",
          "options": [
              ".exe",
              ".o",
              ".obj",
              ".out"
          ],
          "ans": 1,
          "explanation": "On Unix-like systems, object files typically have a '.o' extension, whereas Windows uses '.obj'."
      },
      {
          "q": "Which standard initially established the C programming language as ANSI C? **GATE 2020**",
          "options": [
              "C89/C90",
              "C99",
              "C11",
              "C18"
          ],
          "ans": 0,
          "explanation": "The ANSI C standard was first published in 1989 and adopted by ISO in 1990, commonly referred to as C89 or C90."
      },
      {
          "q": "Which of the following is correct for a multi-line comment in C? **GATE 2019**",
          "options": [
              "// comment //",
              "/* comment */",
              "<!-- comment -->",
              "# comment #"
          ],
          "ans": 1,
          "explanation": "Multi-line comments in C begin with /* and end with */."
      },
      {
          "q": "In C, what is the significance of the `return 0;` statement in main()? **GATE 2008**",
          "options": [
              "It terminates the program abnormally",
              "It indicates successful termination of the program",
              "It restarts the program",
              "It throws an exception"
          ],
          "ans": 1,
          "explanation": "Returning 0 from main() conventionally indicates to the operating system that the program executed successfully without errors."
      },
      {
          "q": "What error will be generated if a semicolon is missing at the end of a statement? **GATE 2013**",
          "options": [
              "Lexical error",
              "Syntax error",
              "Semantic error",
              "Linker error"
          ],
          "ans": 1,
          "explanation": "A missing semicolon is a syntax error, which is caught during the syntax analysis (parsing) phase of the compiler."
      }
  ],
  "variables": [
      {
          "q": "What is the size of `int` as per the standard C language specification? **GATE 2004**",
          "options": [
              "2 bytes",
              "4 bytes",
              "8 bytes",
              "Compiler dependent"
          ],
          "ans": 3,
          "explanation": "The C standard does not strictly define the exact size of 'int', only that it must be at least 16 bits (2 bytes). Its actual size depends on the compiler and architecture."
      },
      {
          "q": "Which of the following is true for the `extern` storage class? **GATE 2013**",
          "options": [
              "It allocates memory for the variable",
              "It declares the variable without allocating memory",
              "It limits the scope of the variable to the local block",
              "It makes the variable constant"
          ],
          "ans": 1,
          "explanation": "The 'extern' keyword is used to declare a global variable or function in another file, meaning it tells the compiler that the variable exists, but does not allocate memory for it here."
      },
      {
          "q": "What is the default initial value of an uninitialized static variable? **GATE 2017**",
          "options": [
              "Garbage value",
              "0",
              "Null",
              "Compiler error"
          ],
          "ans": 1,
          "explanation": "Static variables are initialized to zero (or NULL for pointers) by default if not explicitly initialized."
      },
      {
          "q": "What does the `register` storage class hint to the compiler? **GATE 2002**",
          "options": [
              "Store the variable in RAM",
              "Store the variable in cache",
              "Store the variable in CPU registers for fast access",
              "Allocate memory on the heap"
          ],
          "ans": 2,
          "explanation": "The 'register' keyword suggests to the compiler to store the variable in a CPU register rather than memory to speed up access."
      },
      {
          "q": "A variable declared inside a function without any storage class specifier defaults to? **GATE 2009**",
          "options": [
              "static",
              "extern",
              "auto",
              "register"
          ],
          "ans": 2,
          "explanation": "By default, local variables defined inside a function have the 'auto' storage class."
      },
      {
          "q": "Which datatype provides the largest range of floating-point numbers in standard C? **GATE 2021**",
          "options": [
              "float",
              "double",
              "long double",
              "extended double"
          ],
          "ans": 2,
          "explanation": "The 'long double' type provides the highest precision and range among floating-point types in standard C."
      },
      {
          "q": "How is a negative integer stored in memory in C by default? **GATE 2019**",
          "options": [
              "Sign-magnitude",
              "1's complement",
              "2's complement",
              "BCD"
          ],
          "ans": 2,
          "explanation": "Modern systems use 2's complement representation to store negative integers, which simplifies arithmetic operations."
      },
      {
          "q": "Which of the following is an invalid variable name in C? **GATE 2010**",
          "options": [
              "_myVar",
              "my_Var1",
              "1stVar",
              "var_1"
          ],
          "ans": 2,
          "explanation": "Variable names in C cannot start with a digit."
      },
      {
          "q": "What is the scope of a variable declared at the file level with the `static` keyword? **GATE 2014**",
          "options": [
              "Global across all files",
              "Limited to the file in which it is declared",
              "Limited to the main function",
              "Limited to the block it is declared in"
          ],
          "ans": 1,
          "explanation": "A file-scoped variable declared as 'static' has internal linkage, meaning it is only accessible within the translation unit (file) where it is defined."
      },
      {
          "q": "Consider code: `int x = 10; { int x = 20; printf(\"%d\", x); }`. What is printed? **GATE 2018**",
          "options": [
              "10",
              "20",
              "Error",
              "Garbage"
          ],
          "ans": 1,
          "explanation": "Inner block variables shadow outer block variables. The inner 'x' has block scope, so 20 is printed."
      },
      {
          "q": "Consider `void foo() { static int count = 0; count++; printf(\"%d\", count); }`. If called twice, what is the output? **GATE 2011**",
          "options": [
              "1 1",
              "0 1",
              "1 2",
              "Error"
          ],
          "ans": 2,
          "explanation": "Static variables retain their value between function calls. The first call sets it to 1, the second to 2."
      },
      {
          "q": "What happens when a variable is declared as `const volatile`? **GATE 2007**",
          "options": [
              "Compilation error",
              "It is a constant and cannot change by the program, but can change by hardware",
              "It can be modified by the program anytime",
              "It optimizes the variable aggressively"
          ],
          "ans": 1,
          "explanation": "A variable can be both const (cannot be modified by the program code) and volatile (may be modified by external events/hardware, so compiler shouldn't optimize it)."
      },
      {
          "q": "Consider a global variable `int a;` and local variable `int a = 5;`. Which 'a' is accessed inside the local block? **GATE 2016**",
          "options": [
              "Global 'a'",
              "Local 'a'",
              "Compilation error due to redefinition",
              "Garbage value"
          ],
          "ans": 1,
          "explanation": "Local variables shadow global variables with the same name."
      },
      {
          "q": "What is the range of a signed char in C? **GATE 2006**",
          "options": [
              "0 to 255",
              "-127 to 128",
              "-128 to 127",
              "0 to 65535"
          ],
          "ans": 2,
          "explanation": "A signed char is typically 8 bits. In 2's complement representation, it ranges from -128 to 127."
      },
      {
          "q": "What is the output of `printf(\"%d\", sizeof(void));` in GCC? **GATE 2015**",
          "options": [
              "0",
              "1",
              "4",
              "Compilation Error"
          ],
          "ans": 1,
          "explanation": "In standard C, sizeof(void) is incomplete and causes an error. However, as an extension in GCC, it yields 1."
      }
  ],
  "io": [
      {
          "q": "What does the `printf` function return upon successful execution? **GATE 2012**",
          "options": [
              "The string it printed",
              "The number of characters printed",
              "Zero",
              "The number of arguments provided"
          ],
          "ans": 1,
          "explanation": "The printf function returns the total number of characters written to the standard output."
      },
      {
          "q": "What is the return value of `scanf`? **GATE 2014**",
          "options": [
              "The number of items successfully read and assigned",
              "The total number of characters read",
              "Zero always",
              "The memory address of the first variable"
          ],
          "ans": 0,
          "explanation": "scanf returns the number of input items successfully matched and assigned, which can be fewer than provided, or EOF on error."
      },
      {
          "q": "Which format specifier is used to read a single character ignoring leading whitespace? **GATE 2016**",
          "options": [
              "%c",
              " %c",
              "%s",
              "%w"
          ],
          "ans": 1,
          "explanation": "A space before %c in scanf(\" %c\", &ch) tells scanf to skip any leading whitespace characters before reading the character."
      },
      {
          "q": "What is the output of `printf(\"%d\", printf(\"GATE\"));`? **GATE 2010**",
          "options": [
              "GATE4",
              "GATE",
              "4",
              "Error"
          ],
          "ans": 0,
          "explanation": "The inner printf prints 'GATE' and returns 4. The outer printf then prints the return value, resulting in 'GATE4'."
      },
      {
          "q": "What does the `%x` format specifier do in `printf`? **GATE 2008**",
          "options": [
              "Prints integer in octal format",
              "Prints integer in lowercase hexadecimal format",
              "Prints floating point number in exponential format",
              "Prints integer in uppercase hexadecimal format"
          ],
          "ans": 1,
          "explanation": "The %x specifier prints an unsigned integer in hexadecimal format using lowercase letters (a-f)."
      },
      {
          "q": "What is the output of `printf(\"%10s\", \"hello\");`? **GATE 2019**",
          "options": [
              "'hello' followed by 5 spaces",
              "5 spaces followed by 'hello'",
              "Error",
              "Only 10 characters are printed"
          ],
          "ans": 1,
          "explanation": "The format '%10s' right-aligns the string 'hello' in a field of 10 characters, padding with 5 spaces on the left."
      },
      {
          "q": "Which of the following functions is best suited to read a string containing spaces from standard input? **GATE 2005**",
          "options": [
              "scanf(\"%s\", str)",
              "gets(str)",
              "fgets(str, n, stdin)",
              "getchar()"
          ],
          "ans": 2,
          "explanation": "fgets() reads a string until a newline or EOF is reached (up to n-1 characters), making it safe and capable of reading spaces. gets() is deprecated and unsafe."
      },
      {
          "q": "What happens if `scanf(\"%d\", a)` is executed instead of `scanf(\"%d\", &a)` where a is an int? **GATE 2015**",
          "options": [
              "It reads the value into variable 'a'",
              "Compilation error",
              "Runtime error (Segmentation fault)",
              "It stores the value at address 0"
          ],
          "ans": 2,
          "explanation": "scanf expects a memory address. Passing the value of 'a' treats its value as an address, likely leading to a segmentation fault."
      },
      {
          "q": "What is the output of `printf(\"%f\", 9/5);`? **GATE 2020**",
          "options": [
              "1.800000",
              "1.000000",
              "0.000000",
              "Undefined behavior / 0.000000"
          ],
          "ans": 3,
          "explanation": "9/5 is an integer division resulting in 1 (an int). Passing an int to %f (which expects a double) causes undefined behavior, often printing 0.000000."
      },
      {
          "q": "What does the `%p` format specifier print? **GATE 2017**",
          "options": [
              "A floating-point number",
              "A memory address / pointer value",
              "A character array",
              "A percentage sign"
          ],
          "ans": 1,
          "explanation": "The %p specifier is used to print the value of a pointer (a memory address), usually in hexadecimal format."
      },
      {
          "q": "How to print the `%` symbol using `printf`? **GATE 2013**",
          "options": [
              "printf(\"%\");",
              "printf(\"\\%\");",
              "printf(\"%%\");",
              "printf(\"%s\", \"%\");"
          ],
          "ans": 2,
          "explanation": "To print a percent sign in printf, you must escape it using a double percent sign '%%'."
      },
      {
          "q": "What is the output of `printf(\"%05d\", 42);`? **GATE 2011**",
          "options": [
              "42000",
              "   42",
              "00042",
              "42"
          ],
          "ans": 2,
          "explanation": "The '0' flag pads the integer with leading zeroes up to a field width of 5, resulting in '00042'."
      },
      {
          "q": "Which header file must be included to use standard I/O functions like printf and scanf? **GATE 2004**",
          "options": [
              "<stdlib.h>",
              "<conio.h>",
              "<stdio.h>",
              "<math.h>"
          ],
          "ans": 2,
          "explanation": "The standard input/output functions are declared in the <stdio.h> header file."
      },
      {
          "q": "What is the primary difference between `getchar()` and `getch()`? **GATE 2018**",
          "options": [
              "They are identical",
              "getchar() is standard and buffered, getch() is non-standard and unbuffered",
              "getch() echoes the character, getchar() does not",
              "getchar() reads strings, getch() reads characters"
          ],
          "ans": 1,
          "explanation": "getchar() is a standard C function that reads buffered input. getch() is a non-standard function (from conio.h) that reads a character immediately without buffering."
      },
      {
          "q": "What is the output of `printf(\"%*d\", 5, 10);`? **GATE 2022**",
          "options": [
              "10",
              "   10",
              "10000",
              "Error"
          ],
          "ans": 1,
          "explanation": "The '*' allows the field width to be specified as an argument. Thus, it formats '10' with a width of 5, adding 3 leading spaces."
      }
  ],
  "operators": [
      {
          "q": "What is the output of `int a = 5, b = 10; a = a ^ b; b = a ^ b; a = a ^ b;`? **GATE 2008**",
          "options": [
              "a=5, b=10",
              "a=10, b=5",
              "a=15, b=15",
              "a=0, b=0"
          ],
          "ans": 1,
          "explanation": "This sequence of XOR operations swaps the values of the two variables without using a temporary variable."
      },
      {
          "q": "What is the result of `sizeof(int)` when used in an expression? **GATE 2016**",
          "options": [
              "An integer value",
              "A long integer value",
              "A value of type size_t",
              "A string"
          ],
          "ans": 2,
          "explanation": "The sizeof operator always evaluates to an unsigned integer type defined as size_t."
      },
      {
          "q": "Consider `int x = 0, y = 5; if(x && ++y) {}`. What is the value of y after execution? **GATE 2013**",
          "options": [
              "5",
              "6",
              "0",
              "Undefined"
          ],
          "ans": 0,
          "explanation": "The logical AND '&&' uses short-circuit evaluation. Since x is 0 (false), the right side (++y) is not evaluated, so y remains 5."
      },
      {
          "q": "What is the output of `1 << 3`? **GATE 2011**",
          "options": [
              "3",
              "4",
              "8",
              "9"
          ],
          "ans": 2,
          "explanation": "Left shifting by 3 is equivalent to multiplying by 2^3 (8). 1 * 8 = 8."
      },
      {
          "q": "Which operator has the highest precedence among the following? **GATE 2014**",
          "options": [
              "+",
              "*",
              "()",
              "=="
          ],
          "ans": 2,
          "explanation": "Parentheses '()' have the highest precedence in C, allowing overriding of default precedence rules."
      },
      {
          "q": "What is the value of `x` after `x = 5; x = x++ + ++x;`? **GATE 2005**",
          "options": [
              "10",
              "11",
              "12",
              "Undefined behavior"
          ],
          "ans": 3,
          "explanation": "Modifying a variable multiple times without an intervening sequence point results in undefined behavior in C."
      },
      {
          "q": "What is the output of `sizeof('A')` in standard C? **GATE 2019**",
          "options": [
              "1",
              "2",
              "4 (on 32-bit/64-bit systems)",
              "8"
          ],
          "ans": 2,
          "explanation": "In standard C, character constants like 'A' have type 'int', so sizeof('A') is the size of an int (usually 4 bytes)."
      },
      {
          "q": "What is the result of applying the bitwise right shift operator `>>` on a negative integer? **GATE 2021**",
          "options": [
              "Logical shift (pads with 0)",
              "Arithmetic shift (pads with sign bit)",
              "Implementation-defined",
              "Compilation error"
          ],
          "ans": 2,
          "explanation": "In C, right-shifting a signed negative integer is implementation-defined (usually it's an arithmetic shift, but not guaranteed by the standard)."
      },
      {
          "q": "What is the output of `int x = (1, 2, 3);`? **GATE 2018**",
          "options": [
              "1",
              "2",
              "3",
              "Error"
          ],
          "ans": 2,
          "explanation": "The comma operator evaluates all operands from left to right and returns the value of the rightmost operand, assigning 3 to x."
      },
      {
          "q": "What does the bitwise NOT `~` operator do to a binary number? **GATE 2015**",
          "options": [
              "Adds 1 to the number",
              "Flips all bits (1 to 0 and 0 to 1)",
              "Multiplies by -1",
              "Shifts bits to the left"
          ],
          "ans": 1,
          "explanation": "The bitwise NOT operator (~) is a unary operator that performs a one's complement, flipping all 0s to 1s and 1s to 0s."
      },
      {
          "q": "What is the output of `int a = 10, b = 20; int max = (a > b) ? a : b;`? **GATE 2012**",
          "options": [
              "10",
              "20",
              "30",
              "Error"
          ],
          "ans": 1,
          "explanation": "The ternary operator evaluates (a > b) which is false, so it returns the second expression 'b', assigning 20 to max."
      },
      {
          "q": "What is the output of `-1 % 5` in C99? **GATE 2022**",
          "options": [
              "4",
              "-1",
              "1",
              "-4"
          ],
          "ans": 1,
          "explanation": "In C99, the result of the modulo operator takes the sign of the dividend. Thus, -1 % 5 is -1."
      },
      {
          "q": "Which of the following operators cannot be used with floating-point numbers in C? **GATE 2009**",
          "options": [
              "+",
              "-",
              "%",
              "*"
          ],
          "ans": 2,
          "explanation": "The modulo operator (%) requires integer operands. Attempting to use it with floats causes a compilation error."
      },
      {
          "q": "What is the result of `3 ^ 5`? **GATE 2017**",
          "options": [
              "6",
              "8",
              "15",
              "2"
          ],
          "ans": 0,
          "explanation": "Bitwise XOR compares binary representations: 3 is 011, 5 is 101. 011 ^ 101 = 110, which is 6 in decimal."
      },
      {
          "q": "What is the associativity of the assignment operator `=`? **GATE 2010**",
          "options": [
              "Left to Right",
              "Right to Left",
              "None",
              "Depends on compiler"
          ],
          "ans": 1,
          "explanation": "The assignment operator evaluates from right to left, allowing chains like a = b = c = 5."
      }
  ],
  "control-flow": [
      {
          "q": "What is the output of a `switch` statement if a `break` is omitted in a matching case? **GATE 2012**",
          "options": [
              "Compilation error",
              "Execution exits the switch statement immediately",
              "Fall-through to the next case statements until a break or end is reached",
              "Skips all remaining cases"
          ],
          "ans": 2,
          "explanation": "Without a break statement, the execution falls through to subsequent case blocks, regardless of whether their condition matches."
      },
      {
          "q": "How many times does the loop `for(i=0; i<10; i++)` execute? **GATE 2016**",
          "options": [
              "9",
              "10",
              "11",
              "Infinite"
          ],
          "ans": 1,
          "explanation": "The loop initializes i to 0 and runs as long as i < 10. It executes exactly 10 times (from i=0 to i=9)."
      },
      {
          "q": "Which loop guarantees that its body is executed at least once? **GATE 2005**",
          "options": [
              "for loop",
              "while loop",
              "do-while loop",
              "None"
          ],
          "ans": 2,
          "explanation": "The do-while loop evaluates its condition after the loop body is executed, guaranteeing at least one execution."
      },
      {
          "q": "What is the effect of the `continue` statement inside a loop? **GATE 2013**",
          "options": [
              "Exits the loop entirely",
              "Skips the remaining statements in the current iteration and jumps to the next iteration",
              "Exits the program",
              "Restarts the loop from the beginning"
          ],
          "ans": 1,
          "explanation": "The continue statement forces the loop to skip the rest of its body and immediately evaluate the next iteration."
      },
      {
          "q": "In the dangling `else` problem, an `else` is matched with which `if`? **GATE 2011**",
          "options": [
              "The first if in the block",
              "The closest preceding unmatched if",
              "The outermost if",
              "Depends on indentation"
          ],
          "ans": 1,
          "explanation": "C language resolves the dangling else by matching it with the nearest unmatched preceding 'if' statement in the same block."
      },
      {
          "q": "What does the loop `for(;;)` do? **GATE 2018**",
          "options": [
              "Compilation error",
              "Executes zero times",
              "Creates an infinite loop",
              "Executes once"
          ],
          "ans": 2,
          "explanation": "A for loop with empty condition statements acts as a loop with a universally true condition, creating an infinite loop."
      },
      {
          "q": "What is the output of `if(a = 0) printf(\"True\"); else printf(\"False\");`? **GATE 2009**",
          "options": [
              "True",
              "False",
              "Compilation error",
              "Runtime error"
          ],
          "ans": 1,
          "explanation": "The assignment 'a = 0' returns 0, which evaluates to false in C. Therefore, the 'else' block is executed."
      },
      {
          "q": "What is the role of the `default` case in a `switch` statement? **GATE 2017**",
          "options": [
              "It must be the first case",
              "It catches any values not matched by other cases",
              "It terminates the switch statement",
              "It is executed regardless of the match"
          ],
          "ans": 1,
          "explanation": "The default case acts as a fallback and is executed if none of the explicit case values match the switch expression."
      },
      {
          "q": "Which of the following types can be used in a `switch` expression? **GATE 2020**",
          "options": [
              "float",
              "double",
              "int or char",
              "strings"
          ],
          "ans": 2,
          "explanation": "A switch expression must evaluate to an integral type, such as int or char. Floating-point numbers and strings are not allowed."
      },
      {
          "q": "What does a `break` statement inside an inner loop do? **GATE 2015**",
          "options": [
              "Breaks out of all nested loops",
              "Breaks out of the inner loop only",
              "Skips the current iteration of the inner loop",
              "Causes a compilation error"
          ],
          "ans": 1,
          "explanation": "A break statement only terminates the innermost enclosing loop or switch statement."
      },
      {
          "q": "How many times does the loop body of `while(0)` execute? **GATE 2014**",
          "options": [
              "1",
              "0",
              "Infinite",
              "Compiler error"
          ],
          "ans": 1,
          "explanation": "The condition is 0 (false) from the start, so the loop body never executes."
      },
      {
          "q": "Which of the following is true about the `goto` statement? **GATE 2010**",
          "options": [
              "It can jump between different functions",
              "It can only jump within the same function",
              "It is recommended for good program structure",
              "It can jump to a different C file"
          ],
          "ans": 1,
          "explanation": "The goto statement transfers control to a labeled statement within the same function block."
      },
      {
          "q": "Is `for(i=0, j=10; i<10; i++, j--)` a valid C statement? **GATE 2019**",
          "options": [
              "Yes, it is valid",
              "No, comma operator cannot be used here",
              "No, too many initialization variables",
              "No, multiple increments are invalid"
          ],
          "ans": 0,
          "explanation": "The comma operator is perfectly valid in the initialization and iteration parts of a for loop, allowing multiple variables to be updated."
      },
      {
          "q": "What happens if a `switch` statement has duplicate case values? **GATE 2021**",
          "options": [
              "The first case is executed",
              "The last case is executed",
              "Compilation error",
              "Runtime error"
          ],
          "ans": 2,
          "explanation": "C requires all case labels in a switch statement to be unique. Duplicate cases result in a compilation error."
      },
      {
          "q": "What is the output of `if(1) printf(\"A\"); else printf(\"B\");`? **GATE 2022**",
          "options": [
              "A",
              "B",
              "AB",
              "Error"
          ],
          "ans": 0,
          "explanation": "The condition '1' evaluates to true, so the 'if' block executes and prints 'A'."
      }
  ],
  "loops": [
      {
          "q": "Consider the following C program:\n```c\n#include<stdio.h>\nint main() {\n  int i = 0;\n  for(i=0; i<5; i++);\n  printf(\"%d\", i);\n  return 0;\n}\n```\nWhat will be the output? **GATE 2014**",
          "options": [
              "0",
              "4",
              "5",
              "Compilation error"
          ],
          "ans": 2,
          "explanation": "The loop terminates when i becomes 5. Because of the semicolon after the for loop, the printf statement is outside the loop and prints 5."
      },
      {
          "q": "Consider the following C code:\n```c\nint j, n;\nj = 1;\nwhile (j <= n) {\n  j = j * 2;\n}\n```\nWhat is the time complexity of the above loop? **GATE 2008**",
          "options": [
              "O(n)",
              "O(n^2)",
              "O(log n)",
              "O(n log n)"
          ],
          "ans": 2,
          "explanation": "The variable j is multiplied by 2 in each iteration. It will exceed n after log2(n) iterations. Hence, the time complexity is O(log n)."
      },
      {
          "q": "What is the output of the following C program snippet?\n```c\nint i;\nfor (i = 0; i < 10; i++) {\n  if (i == 5) continue;\n  printf(\"%d \", i);\n}\n```\n**GATE 2016**",
          "options": [
              "0 1 2 3 4 5 6 7 8 9",
              "0 1 2 3 4",
              "0 1 2 3 4 6 7 8 9",
              "Infinite loop"
          ],
          "ans": 2,
          "explanation": "The continue statement skips the current iteration when i == 5, so 5 is not printed. The rest of the numbers from 0 to 9 are printed."
      },
      {
          "q": "Consider the following C function:\n```c\nint fun(int n) {\n  int count = 0;\n  for (int i = n; i > 0; i /= 2)\n    for (int j = 0; j < i; j++)\n      count++;\n  return count;\n}\n```\nThe time complexity of fun(n) is: **GATE 2017**",
          "options": [
              "O(n^2)",
              "O(n log n)",
              "O(n)",
              "O(log n)"
          ],
          "ans": 2,
          "explanation": "The inner loop runs i times. The outer loop runs for i = n, n/2, n/4, ..., 1. Total count = n + n/2 + n/4 + ... = O(n)."
      },
      {
          "q": "What will be the output of the following C program?\n```c\nint main() {\n  int c = 5;\n  while (c--) {\n    printf(\"%d \", c);\n  }\n  return 0;\n}\n```\n**GATE 2018**",
          "options": [
              "4 3 2 1 0",
              "5 4 3 2 1",
              "4 3 2 1",
              "5 4 3 2 1 0"
          ],
          "ans": 0,
          "explanation": "The post-decrement operator checks the condition with c=5, then decrements c to 4. So it prints 4, 3, 2, 1, and 0."
      },
      {
          "q": "Consider the following C program:\n```c\nint main() {\n  int i = 0;\n  do {\n    i++;\n    if (i == 2) continue;\n    printf(\"%d \", i);\n  } while (i < 5);\n  return 0;\n}\n```\nWhat is the output? **GATE 2021**",
          "options": [
              "1 3 4 5",
              "1 3 4",
              "1 2 3 4",
              "1 2 3 4 5"
          ],
          "ans": 0,
          "explanation": "The loop runs for i=0 to 4 initially. i is incremented before printing. When i is 2, it continues to the next iteration. Output is 1 3 4 5."
      },
      {
          "q": "Which of the following loops will result in an infinite loop? **GATE 2015**",
          "options": [
              "for (int i = 0; i < 10; i--) {}",
              "for (int i = 0; i < 10; i++) {}",
              "while (0) {}",
              "do {} while (0);"
          ],
          "ans": 0,
          "explanation": "The variable i is decremented, so the condition i < 10 will always be true (ignoring overflow/underflow specifics leading to negative values indefinitely in normal context)."
      },
      {
          "q": "Consider the following nested loops:\n```c\nint n = 10, count = 0;\nfor (int i = 1; i <= n; i *= 2) {\n  for (int j = 1; j <= n; j++) {\n    count++;\n  }\n}\n```\nWhat is the time complexity? **GATE 2019**",
          "options": [
              "O(n)",
              "O(n^2)",
              "O(n log n)",
              "O(log n)"
          ],
          "ans": 2,
          "explanation": "The outer loop runs log(n) times. The inner loop runs n times. Therefore, the total time complexity is O(n log n)."
      },
      {
          "q": "What is the output of the following C program?\n```c\n#include <stdio.h>\nint main() {\n  int x = 1;\n  switch (x) {\n    case 1:\n      for (int i = 0; i < 2; i++) {\n        printf(\"A \");\n        break;\n      }\n    case 2:\n      printf(\"B \");\n  }\n  return 0;\n}\n```\n**GATE 2013**",
          "options": [
              "A",
              "A B",
              "A A B",
              "Compilation error"
          ],
          "ans": 1,
          "explanation": "The break statement only exits the for loop, not the switch case. Fallthrough occurs to case 2, printing 'A B '."
      },
      {
          "q": "What is the value of `i` after the following loop terminates?\n```c\nint i;\nfor (i = 0; i < 10; i += 3) {\n  // empty body\n}\n```\n**GATE 2005**",
          "options": [
              "9",
              "10",
              "12",
              "13"
          ],
          "ans": 2,
          "explanation": "The loop iterations give i = 0, 3, 6, 9. After i becomes 12, the condition i < 10 becomes false and the loop terminates with i = 12."
      },
      {
          "q": "Consider the following code snippet:\n```c\nint i = 0;\nwhile (+(+i--) != 0) {\n  i -= i;\n}\n```\nHow many times does the loop body execute? **GATE 2020**",
          "options": [
              "0",
              "1",
              "Infinite",
              "Compilation error"
          ],
          "ans": 0,
          "explanation": "The initial value of i is 0. The post-decrement returns 0, which makes the condition false immediately. Loop body executes 0 times."
      },
      {
          "q": "Consider the following C program:\n```c\nint main() {\n  int i, j;\n  for (i = 1, j = 1; i <= 5, j <= 3; i++, j++) {\n    printf(\"%d %d \", i, j);\n  }\n  return 0;\n}\n```\nWhat is the output? **GATE 2012**",
          "options": [
              "1 1 2 2 3 3",
              "1 1 2 2 3 3 4 4 5 5",
              "1 1 2 2",
              "Syntax Error"
          ],
          "ans": 0,
          "explanation": "The condition part is an expression `i <= 5, j <= 3`. The comma operator returns the value of the rightmost operand, so the loop continues as long as `j <= 3`. Thus, it prints '1 1 2 2 3 3'."
      },
      {
          "q": "What is the output of the given C code snippet?\n```c\nint x = 3;\ndo {\n  printf(\"%d \", x);\n  x -= 2;\n} while (x > 0);\n```\n**GATE 2011**",
          "options": [
              "3 1",
              "3",
              "3 1 -1",
              "Infinite loop"
          ],
          "ans": 0,
          "explanation": "First iteration prints 3, x becomes 1. Condition x > 0 holds. Second iteration prints 1, x becomes -1. Condition x > 0 fails. Output: 3 1."
      },
      {
          "q": "What does the following C loop do?\n```c\nwhile (printf(\"0\")) {\n  break;\n}\n```\n**GATE 2004**",
          "options": [
              "Prints 0 infinite times",
              "Prints 0 once",
              "Compilation error",
              "Nothing is printed"
          ],
          "ans": 1,
          "explanation": "printf returns the number of characters printed, which is 1. The condition is true, it enters the loop, and the break statement terminates it immediately. Output is '0' once."
      },
      {
          "q": "Consider this loop structure:\n```c\nint i = 5;\nwhile (i || printf(\"A\")) {\n  i--;\n  if (i == 0) break;\n}\n```\nWhat is printed? **GATE 2022**",
          "options": [
              "AAAA",
              "A",
              "Nothing is printed",
              "Infinite loop"
          ],
          "ans": 2,
          "explanation": "Initially i=5. Since i is non-zero, the short-circuit || operator does not evaluate printf(\"A\"). Inside the loop, i becomes 4, 3, 2, 1, 0, and when i==0 it breaks. Nothing is printed."
      }
  ],
  "functions": [
      {
          "q": "Consider the following C function:\n```c\nint f(int n) {\n  static int i = 1;\n  if (n >= 5) return n;\n  n = n + i;\n  i++;\n  return f(n);\n}\n```\nWhat is the value returned by `f(1)`? **GATE 2015**",
          "options": [
              "5",
              "6",
              "7",
              "8"
          ],
          "ans": 2,
          "explanation": "f(1): i=1, n=2, i=2; calls f(2)\nf(2): i=2, n=4, i=3; calls f(4)\nf(4): i=3, n=7, i=4; calls f(7)\nf(7): returns 7."
      },
      {
          "q": "Consider the following C function:\n```c\nvoid swap(int x, int y) {\n  int temp = x;\n  x = y;\n  y = temp;\n}\n```\nIf called with `swap(a, b)`, what happens to variables a and b? **GATE 2007**",
          "options": [
              "They are swapped",
              "They remain unchanged",
              "Compilation error",
              "Runtime error"
          ],
          "ans": 1,
          "explanation": "C uses pass by value. The changes made to x and y inside the function do not affect the original variables a and b."
      },
      {
          "q": "What is the output of the following C program?\n```c\nint func(int x) {\n  return x > 0 ? x + func(x - 1) : 0;\n}\nint main() {\n  printf(\"%d\", func(5));\n  return 0;\n}\n```\n**GATE 2011**",
          "options": [
              "15",
              "10",
              "5",
              "0"
          ],
          "ans": 0,
          "explanation": "The function calculates the sum of the first x natural numbers. For x=5, sum is 5+4+3+2+1 = 15."
      },
      {
          "q": "Consider the following C function:\n```c\nint f(int *a, int n) {\n  if (n <= 0) return 0;\n  else if (*a % 2 == 0) return *a + f(a + 1, n - 1);\n  else return *a - f(a + 1, n - 1);\n}\n```\nFor an array `a = {12, 7, 13, 4, 11, 6}` and `n = 6`, what is the returned value? **GATE 2018**",
          "options": [
              "15",
              "14",
              "33",
              "19"
          ],
          "ans": 0,
          "explanation": "f({12,...}, 6) = 12 + f({7,...}, 5)\nf({7,...}, 5) = 7 - f({13,...}, 4)\nf({13,...}, 4) = 13 - f({4,...}, 3)\nf({4,...}, 3) = 4 + f({11,...}, 2)\nf({11,...}, 2) = 11 - f({6}, 1)\nf({6}, 1) = 6 + 0 = 6\nWorking backwards: f(11)=11-6=5; f(4)=4+5=9; f(13)=13-9=4; f(7)=7-4=3; f(12)=12+3=15."
      },
      {
          "q": "Consider the program:\n```c\nint f(int n) {\n  static int r = 0;\n  if (n <= 0) return 1;\n  if (n > 3) {\n    r = n;\n    return f(n-2) + 2;\n  }\n  return f(n-1) + r;\n}\n```\nWhat is the value of `f(5)`? **GATE 2014**",
          "options": [
              "16",
              "18",
              "19",
              "21"
          ],
          "ans": 1,
          "explanation": "f(5) sets r=5, returns f(3)+2.\nf(3) returns f(2)+5.\nf(2) returns f(1)+5.\nf(1) returns f(0)+5.\nf(0) returns 1.\nf(1) = 1+5=6; f(2) = 6+5=11; f(3) = 11+5=16; f(5) = 16+2=18."
      },
      {
          "q": "Which of the following is true about inline functions in C? **GATE 2008**",
          "options": [
              "They must be recursive",
              "They reduce function call overhead",
              "They cannot return a value",
              "They cannot take parameters"
          ],
          "ans": 1,
          "explanation": "Inline functions are expanded in line when they are invoked, which eliminates the function call overhead."
      },
      {
          "q": "Consider the following recursive C function:\n```c\nvoid get(int n) {\n  if (n < 1) return;\n  get(n - 1);\n  get(n - 3);\n  printf(\"%d \", n);\n}\n```\nIf `get(6)` is called, how many times will `get()` be invoked? **GATE 2010**",
          "options": [
              "15",
              "25",
              "21",
              "29"
          ],
          "ans": 1,
          "explanation": "T(n) = 1 + T(n-1) + T(n-3). Base cases T(n)=1 for n<1.\nT(0)=1, T(-1)=1, T(-2)=1\nT(1) = 1 + 1 + 1 = 3\nT(2) = 1 + T(1) + T(-1) = 1 + 3 + 1 = 5\nT(3) = 1 + T(2) + T(0) = 1 + 5 + 1 = 7\nT(4) = 1 + T(3) + T(1) = 1 + 7 + 3 = 11\nT(5) = 1 + T(4) + T(2) = 1 + 11 + 5 = 17\nT(6) = 1 + T(5) + T(3) = 1 + 17 + 7 = 25 calls total."
      },
      {
          "q": "Consider the following C function:\n```c\nint fun(int n) {\n  if (n == 4) return n;\n  else return 2 * fun(n + 1);\n}\n```\nWhat is returned by `fun(2)`? **GATE 2021**",
          "options": [
              "4",
              "8",
              "16",
              "32"
          ],
          "ans": 2,
          "explanation": "fun(2) = 2 * fun(3)\nfun(3) = 2 * fun(4)\nfun(4) = 4\nSo, fun(3) = 2 * 4 = 8, and fun(2) = 2 * 8 = 16."
      },
      {
          "q": "Consider the following program:\n```c\nvoid printxy(int x, int y) {\n  int *ptr;\n  x = 0;\n  ptr = &x;\n  y = *ptr;\n  *ptr = 1;\n  printf(\"%d,%d\", x, y);\n}\n```\nWhat is the output? **GATE 2004**",
          "options": [
              "0,0",
              "1,0",
              "0,1",
              "1,1"
          ],
          "ans": 1,
          "explanation": "x=0. ptr points to x. y = *ptr = 0. *ptr = 1, so x becomes 1. Output is x=1, y=0. Thus, 1,0."
      },
      {
          "q": "What happens if a function is declared without a return type in C90? **GATE 2006**",
          "options": [
              "It defaults to returning void",
              "It defaults to returning int",
              "Compilation error",
              "Warning and defaults to void"
          ],
          "ans": 1,
          "explanation": "In older C standards (C89/C90), if a function has no explicit return type, it defaults to returning 'int'."
      },
      {
          "q": "Consider the program:\n```c\nint f(int n) {\n  int x = 1, k;\n  if (n == 1) return x;\n  for (k = 1; k < n; ++k)\n    x = x + f(k) * f(n - k);\n  return x;\n}\n```\nWhat is the value of `f(5)`? **GATE 2016**",
          "options": [
              "51",
              "52",
              "53",
              "54"
          ],
          "ans": 0,
          "explanation": "f(1)=1\nf(2) = 1 + f(1)f(1) = 2\nf(3) = 1 + f(1)f(2) + f(2)f(1) = 1 + 2 + 2 = 5\nf(4) = 1 + f(1)f(3) + f(2)f(2) + f(3)f(1) = 1 + 5 + 4 + 5 = 15\nf(5) = 1 + f(1)f(4) + f(2)f(3) + f(3)f(2) + f(4)f(1) = 1 + 15 + 10 + 10 + 15 = 51."
      },
      {
          "q": "Consider the following function:\n```c\nint f(int j) {\n  static int i = 50;\n  int k;\n  if (i == j) {\n    printf(\"something\");\n    k = f(i);\n    return 0;\n  }\n  else return 0;\n}\n```\nWhich statement is true? **GATE 2005**",
          "options": [
              "The function returns 0 for all values of j",
              "The function results in infinite recursion if j = 50",
              "The function prints 'something' multiple times",
              "Compilation error"
          ],
          "ans": 1,
          "explanation": "If j = 50, i == j is true. The function calls f(i) i.e., f(50). This again matches i == j since i is static and unchanged. Thus it leads to infinite recursion."
      },
      {
          "q": "Which of the following passing mechanisms allows a function to modify a variable passed by the caller? **GATE 2003**",
          "options": [
              "Call by value",
              "Call by reference using pointers",
              "Call by name",
              "Call by value-result"
          ],
          "ans": 1,
          "explanation": "In C, passing pointers to a variable (simulating call by reference) allows the called function to modify the caller's variable."
      },
      {
          "q": "Consider the following macro and function:\n```c\n#define SQR(x) (x*x)\nint main() {\n  int a = 3, b;\n  b = SQR(a + 1);\n  printf(\"%d\", b);\n  return 0;\n}\n```\nWhat is the output? **GATE 2012**",
          "options": [
              "16",
              "7",
              "11",
              "9"
          ],
          "ans": 1,
          "explanation": "Macro expansion: (a + 1 * a + 1) -> (3 + 1 * 3 + 1) = 3 + 3 + 1 = 7."
      },
      {
          "q": "What will be the output?\n```c\nint foo(int val) {\n  int x = 0;\n  while (val > 0) {\n    x = x + foo(val--);\n  }\n  return val;\n}\n```\n**GATE 2013**",
          "options": [
              "Returns 0",
              "Infinite recursion",
              "Returns val",
              "Compilation error"
          ],
          "ans": 1,
          "explanation": "val-- is a post-decrement. The function foo is called recursively with the same value of val (e.g., if initial val is 1, foo(1) is called, which calls foo(1) again). This leads to infinite recursion."
      }
  ],
  "arrays": [
      {
          "q": "Consider the following C program:\n```c\nint main() {\n  int a[] = {1, 2, 3, 4, 5, 6};\n  int *ptr = (int*)(&a + 1);\n  printf(\"%d \", *(ptr - 1));\n  return 0;\n}\n```\nWhat is the output? **GATE 2011**",
          "options": [
              "1",
              "5",
              "6",
              "Garbage value"
          ],
          "ans": 2,
          "explanation": "&a points to the entire array. &a + 1 increments the pointer by the size of the whole array (6 integers). Casting it to int* and subtracting 1 points it to the last element of the array, which is 6."
      },
      {
          "q": "Consider a 2D array `int A[10][20];`. The base address of A is 1000. Assuming the size of an integer is 4 bytes and elements are stored in row-major order, what is the address of `A[5][15]`? **GATE 2004**",
          "options": [
              "1460",
              "1540",
              "1260",
              "1480"
          ],
          "ans": 0,
          "explanation": "Address = Base + (RowIndex * NumCols + ColIndex) * Size = 1000 + (5 * 20 + 15) * 4 = 1000 + (115) * 4 = 1000 + 460 = 1460."
      },
      {
          "q": "What is the output of the following C code?\n```c\nint main() {\n  int arr[] = {10, 20, 30, 40, 50};\n  int *p = arr;\n  printf(\"%d \", *p++ );\n  printf(\"%d \", *p);\n  return 0;\n}\n```\n**GATE 2010**",
          "options": [
              "10 10",
              "20 20",
              "10 20",
              "20 30"
          ],
          "ans": 2,
          "explanation": "*p++ first dereferences p (giving 10) and then increments the pointer p. The next printf prints the value at the new pointer location (20)."
      },
      {
          "q": "In C, what does the expression `arr[i]` internally evaluate to? **GATE 2008**",
          "options": [
              "*(arr + i)",
              "*arr + i",
              "&arr + i",
              "arr + *i"
          ],
          "ans": 0,
          "explanation": "In C, array indexing is a syntactic sugar for pointer arithmetic. `arr[i]` is exactly equivalent to `*(arr + i)`."
      },
      {
          "q": "Consider the declaration `int a[5] = {1, 2};`. What will be the value of `a[3]`? **GATE 2015**",
          "options": [
              "Garbage value",
              "3",
              "0",
              "Compilation error"
          ],
          "ans": 2,
          "explanation": "When an array is partially initialized, the remaining elements are automatically initialized to 0. So a[3] is 0."
      },
      {
          "q": "Consider a 2D array `A[m][n]`. Which of the following is equivalent to `A[i][j]`? **GATE 2013**",
          "options": [
              "*(*(A + i) + j)",
              "*(A + i + j)",
              "*(A + i) + j",
              "&A[i][j]"
          ],
          "ans": 0,
          "explanation": "A[i] is equivalent to *(A+i). Thus A[i][j] is equivalent to *(*(A+i) + j)."
      },
      {
          "q": "What will be the output?\n```c\n#include <stdio.h>\nvoid print(int arr[]) {\n  printf(\"%lu\", sizeof(arr));\n}\nint main() {\n  int arr[10];\n  print(arr);\n  return 0;\n}\n```\nAssume a 64-bit system. **GATE 2017**",
          "options": [
              "40",
              "8",
              "10",
              "4"
          ],
          "ans": 1,
          "explanation": "When an array is passed to a function, it decays into a pointer. On a 64-bit system, the size of a pointer is typically 8 bytes."
      },
      {
          "q": "Consider the array declaration: `int arr[3][4] = {1,2,3,4,5,6,7,8,9,10,11,12};`. What is the value of `*(*(arr + 2) + 1)`? **GATE 2009**",
          "options": [
              "7",
              "9",
              "10",
              "11"
          ],
          "ans": 2,
          "explanation": "`*(*(arr + 2) + 1)` is equivalent to `arr[2][1]`. The 3rd row (index 2) starts at 9, and the 2nd element (index 1) of that row is 10."
      },
      {
          "q": "What is the result of `&arr[4] - &arr[0]` for an integer array `arr`? **GATE 2021**",
          "options": [
              "16",
              "4",
              "Garbage",
              "0"
          ],
          "ans": 1,
          "explanation": "Pointer subtraction in C yields the number of elements between the two pointers, not the number of bytes. So, 4 - 0 = 4."
      },
      {
          "q": "Which of the following array initializations is incorrect? **GATE 2006**",
          "options": [
              "int a[] = {1, 2, 3};",
              "int a[3] = {1, 2, 3};",
              "int a[3] = {1, 2};",
              "int a[];"
          ],
          "ans": 3,
          "explanation": "The size of the array must be specified if it is not initialized at the time of declaration."
      },
      {
          "q": "Consider the following C program:\n```c\nint main() {\n  int arr[] = {1, 2, 3, 4, 5};\n  int *p = arr;\n  ++*p;\n  p += 2;\n  printf(\"%d\", *p);\n  return 0;\n}\n```\nWhat is the output? **GATE 2016**",
          "options": [
              "2",
              "3",
              "4",
              "5"
          ],
          "ans": 1,
          "explanation": "++*p increments the first element (arr[0] becomes 2). Then p += 2 moves the pointer to arr[2], which is 3. The output is 3."
      },
      {
          "q": "Consider `int a[10];`. What is the type of `&a`? **GATE 2018**",
          "options": [
              "int *",
              "int **",
              "int (*)[10]",
              "int *[10]"
          ],
          "ans": 2,
          "explanation": "`&a` gives the address of the whole array, so its type is a pointer to an array of 10 integers, which is `int (*)[10]`."
      },
      {
          "q": "Consider the following C snippet:\n```c\nint arr[5] = {1, 2, 3, 4, 5};\nprintf(\"%d\", 2[arr]);\n```\nWhat is the output? **GATE 2005**",
          "options": [
              "1",
              "2",
              "3",
              "Syntax error"
          ],
          "ans": 2,
          "explanation": "In C, `2[arr]` is evaluated as `*(2 + arr)`, which is identical to `*(arr + 2)` or `arr[2]`. The output is 3."
      },
      {
          "q": "Given an array `int A[] = {10, 20, 30};`, what does `A` represent? **GATE 2007**",
          "options": [
              "Value of the first element",
              "Pointer to the first element",
              "Size of the array",
              "Address of the last element"
          ],
          "ans": 1,
          "explanation": "The array name `A` acts as a constant pointer to the first element of the array."
      },
      {
          "q": "What will be the output?\n```c\nint a[5] = {5, 1, 15, 20, 25};\nint i, j, m;\ni = ++a[1];\nj = a[1]++;\nm = a[i++];\nprintf(\"%d, %d, %d\", i, j, m);\n```\n**GATE 2012**",
          "options": [
              "2, 2, 15",
              "3, 2, 15",
              "3, 2, 20",
              "2, 3, 20"
          ],
          "ans": 1,
          "explanation": "a = {5, 1, 15, 20, 25}. i = ++a[1] -> a[1] becomes 2, so i=2.\nj = a[1]++ -> j gets 2, a[1] becomes 3.\nm = a[i++] -> m = a[2++] -> m = a[2] = 15, i becomes 3.\nOutput is 3, 2, 15."
      }
  ],
  "strings": [
      {
          "q": "Consider the following C code:\n```c\nchar str[] = \"GATE2024\";\nprintf(\"%c\", *(&str[2]));\n```\nWhat is the output? **GATE 2019**",
          "options": [
              "G",
              "A",
              "T",
              "E"
          ],
          "ans": 2,
          "explanation": "str[2] is 'T'. The address of str[2] is &str[2]. Dereferencing it using * gives the value 'T'."
      },
      {
          "q": "What will be the output of the following C program?\n```c\n#include <stdio.h>\n#include <string.h>\nint main() {\n  char p[] = \"assignment\";\n  printf(\"%lu\", strlen(p));\n  printf(\"%lu\", sizeof(p));\n  return 0;\n}\n```\n**GATE 2014**",
          "options": [
              "10 10",
              "10 11",
              "11 11",
              "11 10"
          ],
          "ans": 1,
          "explanation": "strlen() counts characters up to the null terminator, so 10. sizeof() returns the size of the array, which includes the null terminator, so 11."
      },
      {
          "q": "Consider the following C program:\n```c\nchar *c = \"GATECSIT\";\nchar *p = c;\nprintf(\"%c %c\", *p, *(p+3));\n```\nWhat is the output? **GATE 2017**",
          "options": [
              "G E",
              "G C",
              "G A",
              "G T"
          ],
          "ans": 0,
          "explanation": "*p points to the first character 'G'. *(p+3) points to the 4th character, which is 'E'."
      },
      {
          "q": "Consider the string declaration `char str[20] = \"Hello\";`. What is the value of `str[5]`? **GATE 2008**",
          "options": [
              "'o'",
              "'\\0'",
              "Garbage",
              "Space"
          ],
          "ans": 1,
          "explanation": "The string is null-terminated, so the character immediately following 'o' (at index 4) is the null character '\\0' at index 5."
      },
      {
          "q": "Consider the following snippet:\n```c\nchar s1[] = \"Cisco\";\nchar s2[] = \"Systems\";\nprintf(\"%s\", s1);\n```\nHow can you concatenate s2 to s1 using standard C library? **GATE 2010**",
          "options": [
              "strcat(s1, s2)",
              "s1 = s1 + s2",
              "strcpy(s1, s2)",
              "strncat(s1, s2) - assuming sufficient size"
          ],
          "ans": 0,
          "explanation": "strcat is the standard C function to concatenate two strings, provided the destination has enough space. (Note: Here s1 array size is not large enough, but functionally strcat is the answer)."
      },
      {
          "q": "What is the output of the following code?\n```c\nchar *s = \"hello\";\nchar *p = s;\nprintf(\"%c\\t%c\", p[0], s[1]);\n```\n**GATE 2004**",
          "options": [
              "h\\te",
              "h\\tl",
              "e\\tl",
              "h\\to"
          ],
          "ans": 0,
          "explanation": "p points to the same string literal. p[0] is 'h' and s[1] is 'e'. Output: h\\te."
      },
      {
          "q": "Consider the following C program:\n```c\n#include <stdio.h>\nvoid foo(char *a) {\n  if (*a && *a != ' ') {\n    foo(a + 1);\n    putchar(*a);\n  }\n}\nint main() {\n  foo(\"GATE EXAM\");\n  return 0;\n}\n```\nWhat is the output? **GATE 2016**",
          "options": [
              "GATE",
              "ETAG",
              "MAXE ETAG",
              "GATE EXAM"
          ],
          "ans": 1,
          "explanation": "The function uses recursion to print characters in reverse until it hits a null character or a space. The first space occurs after \"GATE\". So it prints \"GATE\" in reverse, i.e., ETAG."
      },
      {
          "q": "Consider the following C statement: `char *p = \"Hello\";`. Which of the following operations is invalid? **GATE 2013**",
          "options": [
              "p++;",
              "*p = 'M';",
              "char c = *p;",
              "printf(\"%s\", p);"
          ],
          "ans": 1,
          "explanation": "String literals are stored in read-only memory. Attempting to modify them (e.g., *p = 'M') leads to undefined behavior or a segmentation fault."
      },
      {
          "q": "What is the return value of `strcmp(\"apple\", \"apple\")`? **GATE 2011**",
          "options": [
              "1",
              "-1",
              "0",
              "Garbage"
          ],
          "ans": 2,
          "explanation": "The strcmp function returns 0 if both strings are exactly equal."
      },
      {
          "q": "What will be printed by the following code?\n```c\nchar str[20] = \"123456789\";\nprintf(\"%s\", str + 4);\n```\n**GATE 2015**",
          "options": [
              "1234",
              "56789",
              "456789",
              "5"
          ],
          "ans": 1,
          "explanation": "str + 4 points to the 5th character of the string (index 4). So it prints from '5' up to the null terminator, outputting '56789'."
      },
      {
          "q": "Consider the following code snippet:\n```c\nchar s1[] = \"Hello\";\nchar s2[] = \"Hello\";\nif (s1 == s2)\n  printf(\"Equal\");\nelse\n  printf(\"Unequal\");\n```\nWhat is the output? **GATE 2007**",
          "options": [
              "Equal",
              "Unequal",
              "Compilation error",
              "Undefined behavior"
          ],
          "ans": 1,
          "explanation": "s1 and s2 are two different arrays in memory. Comparing them with == compares their base addresses, which are different. Thus, they are Unequal."
      },
      {
          "q": "What is the output of this C code snippet?\n```c\nchar str[] = \"GATE\\0CSIT\";\nprintf(\"%d\", strlen(str));\n```\n**GATE 2021**",
          "options": [
              "8",
              "4",
              "5",
              "9"
          ],
          "ans": 1,
          "explanation": "strlen counts characters until the first null character '\\0'. So it counts G, A, T, E and stops. The length is 4."
      },
      {
          "q": "What happens in the following code snippet?\n```c\nchar dest[5];\nstrcpy(dest, \"Programming\");\n```\n**GATE 2009**",
          "options": [
              "It securely copies 'Prog'",
              "It raises a compilation error",
              "Buffer overflow occurs",
              "It copies 'Progr'"
          ],
          "ans": 2,
          "explanation": "The destination array size is 5, but the source string requires 12 bytes (including '\\0'). strcpy does not check bounds, causing a buffer overflow."
      },
      {
          "q": "Which format specifier is used to read a string with spaces in C (like `scanf` without regex magic or gets)? **GATE 2012**",
          "options": [
              "%s",
              "%c",
              "%[^\\n]",
              "%d"
          ],
          "ans": 2,
          "explanation": "The specifier `%[^\\n]` tells scanf to read characters until it encounters a newline character, effectively allowing spaces in the input."
      },
      {
          "q": "Consider the following code snippet:\n```c\nchar *str = \"Hello\";\nprintf(\"%c\", *str++);\n```\nWhat will be printed? **GATE 2005**",
          "options": [
              "H",
              "e",
              "Hello",
              "ello"
          ],
          "ans": 0,
          "explanation": "The post-increment operator increments the pointer str, but the dereference uses the original value of the pointer. Thus, it prints 'H'."
      }
  ],
  "pointers": [
      {
          "q": "What is the output of the following C code snippet? **GATE 2004**\n```c\n#include <stdio.h>\nint main() {\n  char *p = \"GATE2004\";\n  printf(\"%s\", p + p[3] - p[1]);\n  return 0;\n}\n```",
          "options": [
              "2004",
              "GATE",
              "E200",
              "004"
          ],
          "ans": 0,
          "explanation": "p[3] is 'E' (ASCII 69) and p[1] is 'A' (ASCII 65). p[3] - p[1] = 4. The expression evaluates to p + 4, which points to the substring '2004'."
      },
      {
          "q": "Consider the following C function. **GATE 2015**\n```c\nint f(int *a, int n) {\n  if(n <= 0) return 0;\n  else if(*a % 2 == 0) return *a + f(a+1, n-1);\n  else return *a - f(a+1, n-1);\n}\n```\nFor an array `a = {12, 7, 13, 4, 11, 6}` and `n = 6`, what is the output of `f(a, n)`?",
          "options": [
              "15",
              "14",
              "9",
              "20"
          ],
          "ans": 0,
          "explanation": "Recursively computes: 12 + f({7,13,4,11,6}, 5) -> 12 + (7 - f({13,4,11,6}, 4)) -> 12 + 7 - (13 - f({4,11,6}, 3)) -> 12 + 7 - 13 + (4 + f({11,6}, 2)) -> 12 + 7 - 13 + 4 + (11 - f({6}, 1)) -> 12 + 7 - 13 + 4 + 11 - (6 + 0) = 15."
      },
      {
          "q": "Consider the following declaration in C. **GATE 2011**\n```c\nint (*f)(int *);\n```\nWhat does it signify?",
          "options": [
              "f is a pointer to a function that takes an integer pointer as argument and returns an integer.",
              "f is a function that returns a pointer to an integer.",
              "f is a pointer to an array of integers.",
              "f is an array of function pointers."
          ],
          "ans": 0,
          "explanation": "The parentheses around *f indicate it is a pointer to a function. The `(int *)` indicates it takes an integer pointer parameter, and `int` at the beginning indicates it returns an integer."
      },
      {
          "q": "Consider the following C program: **GATE 2016**\n```c\n#include <stdio.h>\nvoid f(int *p, int *m) {\n  m = p;\n  *m = 2;\n}\nint main() {\n  int i = 3, j = 5;\n  f(&i, &j);\n  printf(\"%d %d\", i, j);\n  return 0;\n}\n```\nWhat is the output?",
          "options": [
              "2 5",
              "3 5",
              "2 2",
              "3 2"
          ],
          "ans": 0,
          "explanation": "In `f`, `m` is initially pointing to `j`. `m = p` makes `m` point to `i`. `*m = 2` changes the value of `i` to 2. `j` remains unchanged (5). The output is '2 5'."
      },
      {
          "q": "Consider the following C declaration. **GATE 2000**\n```c\nstruct node {\n  int i;\n  float j;\n};\nstruct node *s[10];\n```\nWhat does `s` represent?",
          "options": [
              "An array of 10 pointers to struct node.",
              "A pointer to an array of 10 struct nodes.",
              "An array of 10 struct nodes.",
              "A struct node containing an array of 10 pointers."
          ],
          "ans": 0,
          "explanation": "`[]` has higher precedence than `*`. Therefore, `s` is an array of 10 elements, and each element is a pointer to a `struct node`."
      },
      {
          "q": "Consider the C program below. **GATE 2014**\n```c\n#include <stdio.h>\nint main() {\n  int a[] = {2, 4, 6, 8, 10};\n  int i, sum = 0, *b = a + 4;\n  for(i = 0; i < 5; i++)\n    sum = sum + (*b - i) - *(b - i);\n  printf(\"%d\", sum);\n  return 0;\n}\n```\nWhat is the output?",
          "options": [
              "10",
              "15",
              "20",
              "25"
          ],
          "ans": 0,
          "explanation": "`b` points to `a[4]`, which is 10. `*b` is always 10. `*(b-i)` gives `a[4-i]`. The sum evaluated is (10-0-10) + (10-1-8) + (10-2-6) + (10-3-4) + (10-4-2) = 0 + 1 + 2 + 3 + 4 = 10."
      },
      {
          "q": "What is the output of the following C program? **GATE 2005**\n```c\nvoid swap(int *x, int *y) {\n  static int *temp;\n  temp = x;\n  x = y;\n  y = temp;\n}\nvoid main() {\n  int a = 1, b = 2;\n  swap(&a, &b);\n  printf(\"%d %d\", a, b);\n}\n```",
          "options": [
              "1 2",
              "2 1",
              "0 0",
              "Compile error"
          ],
          "ans": 0,
          "explanation": "The `swap` function only exchanges the local copies of the pointers `x` and `y`. It does not dereference them to change the values of `a` and `b`. Thus, `a` and `b` remain 1 and 2."
      },
      {
          "q": "Consider the following C snippet. **GATE 2008**\n```c\nint a[5] = {1, 2, 3, 4, 5};\nint *p = (int*)(&a + 1);\nprintf(\"%d\", *(p - 1));\n```\nWhat is the output?",
          "options": [
              "5",
              "1",
              "Garbage value",
              "Compile error"
          ],
          "ans": 0,
          "explanation": "`&a` is a pointer to the entire array of 5 integers. `&a + 1` increments the pointer by `sizeof(int[5])`, pointing to the memory just past the array. Cast to `int*`, `p - 1` points back to the last element of the array, which is 5."
      },
      {
          "q": "What is printed by the following program? **GATE 2017**\n```c\n#include <stdio.h>\n#include <string.h>\nint main() {\n  char *c = \"GATECSIT2017\";\n  char *p = c;\n  printf(\"%d\", (int)strlen(c + 2[p] - 6[p] - 1));\n  return 0;\n}\n```",
          "options": [
              "2",
              "4",
              "6",
              "8"
          ],
          "ans": 0,
          "explanation": "`2[p]` is equivalent to `*(2 + p)` which is `c[2]` ('T' or ASCII 84). `6[p]` is `c[6]` ('I' or ASCII 73). `84 - 73 - 1 = 10`. The expression `c + 10` points to \"17\". `strlen(\"17\")` is 2."
      },
      {
          "q": "Assume `int` is 4 bytes and pointer is 8 bytes. What is the output? **GATE 2019**\n```c\nint a[3][4];\nprintf(\"%lu\", sizeof(*a));\n```",
          "options": [
              "16",
              "4",
              "8",
              "12"
          ],
          "ans": 0,
          "explanation": "`a` is a 2D array (array of 3 arrays of 4 ints). `*a` gives the first element, which is a 1D array of 4 ints. Its size is `4 * sizeof(int) = 4 * 4 = 16`."
      },
      {
          "q": "Consider the following C code: **GATE 2012**\n```c\nint x[] = {1, 2, 3, 4, 5};\nint *p = x;\nint *q = x + 3;\nprintf(\"%d\", (int)(q - p));\n```\nWhat is the output?",
          "options": [
              "3",
              "12",
              "4",
              "Error"
          ],
          "ans": 0,
          "explanation": "Pointer subtraction yields the number of elements between the two pointers. `q` points to `x[3]` and `p` points to `x[0]`. Thus, `q - p` evaluates to 3."
      },
      {
          "q": "What does the following declaration mean? **GATE 2003**\n```c\nvoid *(*f)(int*);\n```",
          "options": [
              "f is a pointer to a function taking an int pointer and returning a void pointer.",
              "f is a function returning a pointer to void.",
              "f is a pointer to void function.",
              "f is a void pointer."
          ],
          "ans": 0,
          "explanation": "`*f` in parentheses means `f` is a pointer to a function. `(int*)` specifies it takes an integer pointer parameter. `void *` at the beginning specifies it returns a void pointer."
      },
      {
          "q": "Consider the C program: **GATE 2001**\n```c\n#include<stdio.h>\nint main() {\n  int i = 10;\n  int *p = &i;\n  int **q = &p;\n  printf(\"%d %d\", *p, **q);\n  return 0;\n}\n```\nWhat is the output?",
          "options": [
              "10 10",
              "Address of i",
              "Error",
              "10 Address"
          ],
          "ans": 0,
          "explanation": "`p` holds the address of `i`, so `*p` is the value of `i` (10). `q` holds the address of `p`, so `**q` dereferences twice, also yielding the value of `i` (10)."
      },
      {
          "q": "Consider the following code. **GATE 1999**\n```c\nchar *str = \"Hello\";\nstr[0] = 'M';\nprintf(\"%s\", str);\n```\nWhat will happen at runtime?",
          "options": [
              "Segmentation fault / Undefined behavior",
              "Mello",
              "Hello",
              "Compile error"
          ],
          "ans": 0,
          "explanation": "String literals are stored in read-only memory. Attempting to modify them using a pointer (like `str[0] = 'M'`) causes a segmentation fault or undefined behavior."
      },
      {
          "q": "Which of the following is true about pointers in C? **GATE 1998**",
          "options": [
              "An array name acts as a constant pointer to its first element.",
              "Pointers cannot point to another pointer.",
              "Pointers are always 4 bytes long.",
              "Pointer arithmetic is allowed for void pointers."
          ],
          "ans": 0,
          "explanation": "In most expressions, the name of an array decays into a constant pointer to its first element. Void pointer arithmetic is not allowed in standard C, and pointer size depends on the architecture."
      }
  ],
  "structures": [
      {
          "q": "Consider the following C code. **GATE 2015**\n```c\nstruct student {\n  int roll;\n  char name[20];\n};\nstruct student s1 = {1, \"Alice\"};\nstruct student s2 = s1;\n```\nWhat happens when `s2 = s1` is executed?",
          "options": [
              "s2 receives a copy of the contents of s1.",
              "Compile error because structs cannot be assigned directly.",
              "s2 becomes a pointer to s1.",
              "Runtime error."
          ],
          "ans": 0,
          "explanation": "In C, structure variables can be directly assigned. This results in a shallow copy of all members from `s1` to `s2`."
      },
      {
          "q": "Consider the following definition: **GATE 2007**\n```c\nstruct node {\n  int data;\n  struct node *next;\n};\n```\nWhat type of structure is this?",
          "options": [
              "Self-referential structure",
              "Nested structure",
              "Anonymous structure",
              "Union"
          ],
          "ans": 0,
          "explanation": "A structure that contains a pointer to a structure of its own type is known as a self-referential structure, heavily used in linked lists and trees."
      },
      {
          "q": "Consider the C code: **GATE 2004**\n```c\nstruct test {\n  unsigned int x: 2;\n  unsigned int y: 2;\n  unsigned int z: 2;\n};\nint main() {\n  struct test t;\n  t.x = 5;\n  printf(\"%d\", t.x);\n  return 0;\n}\n```\nWhat will be the output?",
          "options": [
              "1",
              "5",
              "Compile error",
              "0"
          ],
          "ans": 0,
          "explanation": "`x` is a 2-bit bit-field. Assigning 5 (binary 101) to it results in overflow, and only the lower 2 bits (01) are stored. The value of 01 in binary is 1."
      },
      {
          "q": "Consider the following C declaration. **GATE 2001**\n```c\nstruct {\n  short s[5];\n  union {\n    float y;\n    long z;\n  } u;\n} t;\n```\nAssume short, float, and long occupy 2, 4, and 8 bytes respectively. What is the size of `t` in bytes (ignoring alignment and padding)?",
          "options": [
              "18",
              "14",
              "22",
              "10"
          ],
          "ans": 0,
          "explanation": "The array `s[5]` takes `5 * 2 = 10` bytes. The union `u` shares memory among its members, so its size is the maximum of its members, which is `sizeof(long) = 8` bytes. The total size is `10 + 8 = 18` bytes."
      },
      {
          "q": "Which of the following operators is used to access members of a structure using a pointer? **GATE 1996**",
          "options": [
              "->",
              ".",
              "&",
              "*"
          ],
          "ans": 0,
          "explanation": "The arrow operator `->` is used to access structure members using a pointer to the structure. It is equivalent to `(*ptr).member`."
      },
      {
          "q": "Consider the following snippet: **GATE 2010**\n```c\ntypedef struct {\n  int a;\n} s1;\n```\nWhat is `s1`?",
          "options": [
              "A type representing a structure.",
              "A variable of type struct.",
              "A pointer to a struct.",
              "A function returning a struct."
          ],
          "ans": 0,
          "explanation": "`typedef` is used to create an alias for a type. Thus, `s1` becomes a new type name representing this anonymous structure."
      },
      {
          "q": "What will be the output? **GATE 2003**\n```c\n#include <stdio.h>\nstruct Point { int x, y; };\nint main() {\n  struct Point p1 = {10, 20};\n  struct Point *p2 = &p1;\n  printf(\"%d\", p2->x);\n  return 0;\n}\n```",
          "options": [
              "10",
              "20",
              "Compile error",
              "Garbage value"
          ],
          "ans": 0,
          "explanation": "`p2` is a pointer to `p1`. `p2->x` accesses the member `x` of the structure pointed to by `p2`, which is 10."
      },
      {
          "q": "Which of the following is true about bit-fields in C? **GATE 2014**",
          "options": [
              "We cannot have pointers to bit-field members.",
              "Bit-fields can be of any type including arrays.",
              "Bit-fields must be signed.",
              "Bit-fields size can exceed the size of their type."
          ],
          "ans": 0,
          "explanation": "Because bit-fields may not start at a byte boundary, you cannot take their address using the `&` operator, and therefore cannot have pointers to them."
      },
      {
          "q": "Consider the code: **GATE 2008**\n```c\nstruct S {\n  int a;\n  char b;\n};\n```\nIf sizeof(int) is 4 and sizeof(char) is 1, what is typically the sizeof(struct S) on a 32-bit machine with 4-byte word alignment?",
          "options": [
              "8",
              "5",
              "4",
              "1"
          ],
          "ans": 0,
          "explanation": "`a` takes 4 bytes. `b` takes 1 byte. Due to 4-byte word alignment (padding), 3 bytes of padding are added at the end. Total size is `4 + 1 + 3 = 8` bytes."
      },
      {
          "q": "Consider the following code: **GATE 2000**\n```c\nstruct node {\n  int i;\n  struct node *next;\n} *p;\n```\nWhich of the following correctly allocates memory for the node?",
          "options": [
              "p = malloc(sizeof(struct node));",
              "p = malloc(sizeof(node));",
              "p = malloc(struct node);",
              "p = malloc(*p);"
          ],
          "ans": 0,
          "explanation": "Using `sizeof(struct node)` is the correct way to specify the size. `sizeof(node)` fails since there is no `typedef`."
      },
      {
          "q": "Can two structures in C contain members with the same name? **GATE 2018**",
          "options": [
              "Yes, members in different structures have different namespaces.",
              "No, it causes naming collisions.",
              "Yes, but only if they have different data types.",
              "No, struct member names must be globally unique."
          ],
          "ans": 0,
          "explanation": "Each struct creates its own namespace for its members. Therefore, two different structures can have members with the exact same name without conflict."
      },
      {
          "q": "Consider the snippet: **GATE 1999**\n```c\nunion U {\n  int x;\n  char y[4];\n};\nunion U u;\nu.x = 0x12345678;\n```\nAssuming a little-endian architecture, what is the value of `u.y[0]`?",
          "options": [
              "0x78",
              "0x12",
              "0x34",
              "0x56"
          ],
          "ans": 0,
          "explanation": "In a little-endian machine, the least significant byte is stored at the lowest memory address. The least significant byte of `0x12345678` is `0x78`, which goes into `u.y[0]`."
      },
      {
          "q": "What happens if a structure member is itself a structure? **GATE 2002**",
          "options": [
              "It is called a nested structure.",
              "It is illegal in C.",
              "The inner structure must be declared after the outer.",
              "It is called a union."
          ],
          "ans": 0,
          "explanation": "Having a structure as a member of another structure is a common concept in C, referred to as a nested structure."
      },
      {
          "q": "Which of the following is NOT allowed in C? **GATE 2011**",
          "options": [
              "Comparing two structures using `==` operator.",
              "Assigning one structure variable to another of the same type.",
              "Passing a structure to a function by value.",
              "Returning a structure from a function."
          ],
          "ans": 0,
          "explanation": "C does not support direct comparison of two structures using `==` because of potential padding bytes. They must be compared member by member."
      },
      {
          "q": "How are the members of a union allocated in memory? **GATE 2006**",
          "options": [
              "They share the same memory location.",
              "They are allocated at contiguous memory locations.",
              "They are allocated at non-contiguous memory locations.",
              "The compiler decides."
          ],
          "ans": 0,
          "explanation": "A union allows storing different data types in the same memory location. The total size of a union is determined by its largest member, and all members overlap."
      }
  ],
  "file-handling": [
      {
          "q": "Which function is used to open a file in C? **GATE 2001**",
          "options": [
              "fopen()",
              "file_open()",
              "open()",
              "fopen_s()"
          ],
          "ans": 0,
          "explanation": "The standard C library uses `fopen()` declared in `<stdio.h>` to open files."
      },
      {
          "q": "What is the return type of fopen() on success? **GATE 2005**",
          "options": [
              "FILE pointer",
              "Integer file descriptor",
              "void pointer",
              "char pointer"
          ],
          "ans": 0,
          "explanation": "`fopen()` returns a pointer to a `FILE` structure, which contains information about the file being accessed."
      },
      {
          "q": "What does `fopen(\"file.txt\", \"a+\")` do? **GATE 2008**",
          "options": [
              "Opens for reading and appending.",
              "Opens for reading and writing at the beginning.",
              "Creates a new file for writing only.",
              "Opens for reading only."
          ],
          "ans": 0,
          "explanation": "The mode `\"a+\"` opens the file for reading and appending (writing at the end of the file). If the file does not exist, it is created."
      },
      {
          "q": "Which of the following functions sets the file position indicator? **GATE 2010**",
          "options": [
              "fseek()",
              "ftell()",
              "fgetc()",
              "fputc()"
          ],
          "ans": 0,
          "explanation": "`fseek()` is used to move the file pointer to a specific location within the file."
      },
      {
          "q": "What does `ftell()` return? **GATE 2015**",
          "options": [
              "The current file position indicator.",
              "The end of file position.",
              "The beginning of file position.",
              "Error status."
          ],
          "ans": 0,
          "explanation": "`ftell()` returns the current value of the position indicator of the stream, usually representing the number of bytes from the beginning of the file."
      },
      {
          "q": "Which predefined file pointer is associated with the standard input stream? **GATE 1999**",
          "options": [
              "stdin",
              "stdout",
              "stderr",
              "stdfile"
          ],
          "ans": 0,
          "explanation": "`stdin` is a predefined standard input stream in C, typically linked to the keyboard."
      },
      {
          "q": "What does EOF stand for in C file handling? **GATE 2003**",
          "options": [
              "End Of File",
              "Error On File",
              "End Of Folder",
              "Execute On File"
          ],
          "ans": 0,
          "explanation": "EOF stands for End Of File. It indicates that the end of the file has been reached during reading."
      },
      {
          "q": "What is the typical value of EOF defined in `<stdio.h>`? **GATE 2012**",
          "options": [
              "-1",
              "0",
              "1",
              "Null"
          ],
          "ans": 0,
          "explanation": "EOF is typically defined as an integer constant with a negative value, usually -1, to distinguish it from any valid character code."
      },
      {
          "q": "Which function reads a single character from a file? **GATE 2007**",
          "options": [
              "fgetc()",
              "fgets()",
              "fread()",
              "fscanf()"
          ],
          "ans": 0,
          "explanation": "`fgetc()` reads the next character from a stream and returns it as an unsigned char cast to an int, or EOF on end of file or error."
      },
      {
          "q": "In `fseek(fp, offset, whence)`, what does `SEEK_END` signify for `whence`? **GATE 2014**",
          "options": [
              "End of file",
              "Current position",
              "Beginning of file",
              "Next line"
          ],
          "ans": 0,
          "explanation": "`SEEK_END` means the offset is applied relative to the end of the file. `SEEK_SET` is for beginning, and `SEEK_CUR` is for current position."
      },
      {
          "q": "Which function is used to write formatted data to a file? **GATE 2000**",
          "options": [
              "fprintf()",
              "fputs()",
              "fwrite()",
              "fputc()"
          ],
          "ans": 0,
          "explanation": "`fprintf()` is used to write formatted text to the file stream."
      },
      {
          "q": "How can you check if the end of file is reached while reading? **GATE 2017**",
          "options": [
              "Using the feof() function",
              "Using ferror() function",
              "Using fseek() return value",
              "Using fflush()"
          ],
          "ans": 0,
          "explanation": "`feof()` is used to test the end-of-file indicator for a given stream, returning non-zero if it is set."
      },
      {
          "q": "What happens if you open an existing file in `\"w\"` mode? **GATE 2006**",
          "options": [
              "The file's contents are truncated to zero length.",
              "Data is appended to the file.",
              "The open fails.",
              "The file is opened for reading."
          ],
          "ans": 0,
          "explanation": "Opening in `\"w\"` mode truncates the file if it exists, erasing its contents, or creates a new file if it doesn't."
      },
      {
          "q": "Which function writes a block of data to a stream, useful for binary files? **GATE 2011**",
          "options": [
              "fwrite()",
              "fprintf()",
              "fputs()",
              "fputc()"
          ],
          "ans": 0,
          "explanation": "`fwrite()` writes an array of elements (a block of data) directly to the stream."
      },
      {
          "q": "What is the purpose of `fflush(FILE *stream)`? **GATE 2004**",
          "options": [
              "Flushes the output buffer of a stream.",
              "Closes the stream.",
              "Reads remaining data from the stream.",
              "Deletes the file."
          ],
          "ans": 0,
          "explanation": "`fflush()` forces a write of all user-space buffered data for the given output or update stream."
      }
  ],
  "memory": [
      {
          "q": "Which function allocates memory and initializes it to zero? **GATE 2001**",
          "options": [
              "calloc()",
              "malloc()",
              "realloc()",
              "free()"
          ],
          "ans": 0,
          "explanation": "`calloc()` allocates memory for an array of elements and initializes all bytes to zero. `malloc()` does not initialize memory."
      },
      {
          "q": "What does `malloc(size_t size)` return if memory allocation fails? **GATE 2005**",
          "options": [
              "NULL",
              "-1",
              "0",
              "Garbage value"
          ],
          "ans": 0,
          "explanation": "If `malloc()` fails to allocate the requested block of memory (e.g., memory is exhausted), it returns a `NULL` pointer."
      },
      {
          "q": "Which header file is required to use dynamic memory allocation functions in C? **GATE 2008**",
          "options": [
              "<stdlib.h>",
              "<stdio.h>",
              "<memory.h>",
              "<malloc.h>"
          ],
          "ans": 0,
          "explanation": "The declarations for `malloc`, `calloc`, `realloc`, and `free` are available in the `<stdlib.h>` standard library header."
      },
      {
          "q": "Consider `ptr = (int*)realloc(ptr, new_size);`. What happens if `ptr` is NULL? **GATE 2014**",
          "options": [
              "It behaves like malloc(new_size).",
              "It causes a segmentation fault.",
              "It returns NULL.",
              "It does nothing."
          ],
          "ans": 0,
          "explanation": "In standard C, if the pointer passed to `realloc()` is NULL, it behaves exactly like `malloc(new_size)`."
      },
      {
          "q": "What happens when a dynamically allocated memory block is not freed after its use? **GATE 2010**",
          "options": [
              "Memory leak",
              "Dangling pointer",
              "Buffer overflow",
              "Segmentation fault"
          ],
          "ans": 0,
          "explanation": "Failure to free dynamically allocated memory results in a memory leak, where the memory remains allocated but unreachable, potentially exhausting memory over time."
      },
      {
          "q": "What is a dangling pointer? **GATE 2007**",
          "options": [
              "A pointer pointing to a memory location that has been deleted (freed).",
              "A pointer that points to NULL.",
              "An uninitialized pointer.",
              "A pointer to a function."
          ],
          "ans": 0,
          "explanation": "A dangling pointer arises when memory is deallocated (e.g. using `free`), but the pointer itself still holds the address of the deallocated memory."
      },
      {
          "q": "Which segment of memory is used for dynamic memory allocation? **GATE 2012**",
          "options": [
              "Heap",
              "Stack",
              "Data segment",
              "BSS segment"
          ],
          "ans": 0,
          "explanation": "Dynamic memory allocation (using `malloc`, `calloc`, etc.) occurs on the heap, which grows upwards in the typical memory layout."
      },
      {
          "q": "Consider the code snippet: **GATE 2015**\n```c\nint *p = malloc(sizeof(int));\nfree(p);\n*p = 10;\n```\nWhat is this an example of?",
          "options": [
              "Dangling pointer dereference",
              "Memory leak",
              "Valid memory access",
              "Syntax error"
          ],
          "ans": 0,
          "explanation": "After `free(p)`, `p` becomes a dangling pointer. Dereferencing it with `*p = 10` causes undefined behavior."
      },
      {
          "q": "What is the correct syntax to allocate memory for an array of 10 integers using malloc? **GATE 2004**",
          "options": [
              "malloc(10 * sizeof(int));",
              "malloc(10);",
              "calloc(10 * sizeof(int));",
              "malloc(10, sizeof(int));"
          ],
          "ans": 0,
          "explanation": "`malloc` takes a single argument: the total number of bytes. For 10 integers, it is `10 * sizeof(int)`."
      },
      {
          "q": "If `malloc` returns a `void*`, why do we traditionally cast it in C (e.g., `(int*)malloc(...)`)? **GATE 2003**",
          "options": [
              "In standard C, the cast is not required as void* promotes automatically, but it was required in C++ and older C versions.",
              "The cast is mandatory in standard C for correct compilation.",
              "It prevents memory leaks.",
              "It makes the execution faster."
          ],
          "ans": 0,
          "explanation": "In standard C, a `void*` is automatically implicitly converted to any other pointer type. The cast is unnecessary in C but required in C++."
      },
      {
          "q": "Consider the following memory allocation: `int *a = calloc(5, sizeof(int));`. What is the value of `a[3]`? **GATE 2018**",
          "options": [
              "0",
              "Garbage value",
              "NULL",
              "Depends on compiler"
          ],
          "ans": 0,
          "explanation": "`calloc` initializes the allocated memory blocks to zero. Therefore, `a[3]` will be initialized to 0."
      },
      {
          "q": "What happens if we pass `NULL` to the `free()` function? **GATE 2011**",
          "options": [
              "No action occurs.",
              "Segmentation fault.",
              "Runtime error.",
              "Compilation error."
          ],
          "ans": 0,
          "explanation": "According to the C standard, if `NULL` is passed to `free()`, the function does nothing and returns safely."
      },
      {
          "q": "Which function changes the size of a previously dynamically allocated memory block? **GATE 2006**",
          "options": [
              "realloc()",
              "malloc()",
              "calloc()",
              "resize()"
          ],
          "ans": 0,
          "explanation": "`realloc()` reallocates memory, changing the size of an existing memory block while preserving its contents up to the minimum of the old and new sizes."
      },
      {
          "q": "Local variables of a function are typically stored in which memory segment? **GATE 2000**",
          "options": [
              "Stack",
              "Heap",
              "Data segment",
              "Code segment"
          ],
          "ans": 0,
          "explanation": "Local (automatic) variables are typically stored on the stack, which automatically allocates and deallocates them upon function entry and exit."
      },
      {
          "q": "Where are global and static variables initialized to zero stored? **GATE 2019**",
          "options": [
              "BSS segment",
              "Data segment",
              "Stack",
              "Heap"
          ],
          "ans": 0,
          "explanation": "Uninitialized global/static variables or those initialized to zero are stored in the BSS (Block Started by Symbol) segment."
      }
  ],
};

export const DEBUG: Record<string, DebugExercise> = {
  basics: {
    instructions: "Fix the 3 bugs in this program so it compiles and prints 'Hello, World!'",
    buggy: "#include <stdio.h>\n\nint Main() {\n    printf(\"Hello, World!\")\n    return 0\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
    hints: ["main() must be lowercase", "printf statement needs a semicolon", "return 0 needs a semicolon"],
    expectedOutput: "Hello, World!"
  },
  variables: {
    instructions: "Fix the 3 bugs related to variable declarations and format specifiers.",
    buggy: "#include <stdio.h>\n\nint main() {\n    Int score = 95;\n    float avg = 88.5;\n    printf(\"Score: %f\\n\", score);\n    printf(\"Average: %d\\n\", avg);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int score = 95;\n    float avg = 88.5;\n    printf(\"Score: %d\\n\", score);\n    printf(\"Average: %.2f\\n\", avg);\n    return 0;\n}",
    hints: ["int is lowercase — C is case-sensitive", "%f is for float, not int", "%d is for int, not float"],
    expectedOutput: "Score: 95\nAverage: 88.50"
  },
  io: {
    instructions: "Fix the 3 scanf bugs so user input is correctly read and displayed.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int age;\n    char name[50];\n    printf(\"Enter age: \");\n    scanf(\"%d\", age);\n    printf(\"Enter name: \");\n    scanf(\"%s\", &name);\n    printf(\"Name: %s, Age: %f\\n\", name, age);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int age;\n    char name[50];\n    printf(\"Enter age: \");\n    scanf(\"%d\", &age);\n    printf(\"Enter name: \");\n    scanf(\"%s\", name);\n    printf(\"Name: %s, Age: %d\\n\", name, age);\n    return 0;\n}",
    hints: ["scanf needs &age (address-of operator)", "Arrays like name[] already decay to a pointer — no & needed", "%f is for float; use %d for int"],
    expectedOutput: "Enter age: [e.g. 20]\nEnter name: [e.g. Alex]\nName: Alex, Age: 20"
  },
  operators: {
    instructions: "Fix the 3 bugs related to operators in this program.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    int sum = a + b\n    if (a = b) {\n        printf(\"Equal\\n\");\n    }\n    printf(\"Remainder: %d\\n\", a / b);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    int sum = a + b;\n    if (a == b) {\n        printf(\"Equal\\n\");\n    }\n    printf(\"Remainder: %d\\n\", a % b);\n    return 0;\n}",
    hints: ["Statements need a semicolon at the end", "Use == to compare values; = assigns a value", "% gives the remainder, / gives the quotient"],
    expectedOutput: "Remainder: 1"
  },
  "control-flow": {
    instructions: "Fix the 3 bugs in this grading program.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int score = 85\n\n    if (score >= 90)\n        printf(\"A\\n\");\n    else if (score >= 75)\n        printf(\"B\\n\")\n    else\n        printf(\"C\\n\");\n\n    switch (score / 10) {\n        case 8:\n            printf(\"Good job\\n\");\n        case 9:\n            printf(\"Excellent\\n\");\n            break;\n    }\n\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int score = 85;\n\n    if (score >= 90)\n        printf(\"A\\n\");\n    else if (score >= 75)\n        printf(\"B\\n\");\n    else\n        printf(\"C\\n\");\n\n    switch (score / 10) {\n        case 8:\n            printf(\"Good job\\n\");\n            break;\n        case 9:\n            printf(\"Excellent\\n\");\n            break;\n    }\n\n    return 0;\n}",
    hints: ["Every declaration needs a semicolon", "Each printf statement must end with a semicolon", "Add break after case 8 or it falls through into case 9"],
    expectedOutput: "B\nGood job"
  },
  loops: {
    instructions: "Fix the 3 bugs in this loop that should print numbers 1 through 5.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while (i <= 5) {\n        printf(\"%d \", i)\n        i++\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n    while (i <= 5) {\n        printf(\"%d \", i);\n        i++;\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    hints: ["Start counting from 1, not 0", "The printf statement needs a semicolon", "i++ needs a semicolon too"],
    expectedOutput: "1 2 3 4 5 "
  },
  functions: {
    instructions: "Fix the 3 bugs preventing this program from computing a square correctly.",
    buggy: "#include <stdio.h>\n\nint square(n) {\n    n * n;\n}\n\nint main() {\n    int result = square(5)\n    printf(\"Square: %d\\n\", result);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int result = square(5);\n    printf(\"Square: %d\\n\", result);\n    return 0;\n}",
    hints: ["Function parameters need a type, e.g. int n", "Use return to send a value back from the function", "The function call needs a semicolon at the end"],
    expectedOutput: "Square: 25"
  },
  arrays: {
    instructions: "Fix the 3 bugs in this array-summing program.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int nums[5] = {1, 2, 3, 4, 5};\n    int sum = 0;\n\n    for (int i = 1; i <= 5; i++) {\n        sum += nums[i];\n    }\n\n    printf(\"Sum: %d\\n\", sum)\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int nums[5] = {1, 2, 3, 4, 5};\n    int sum = 0;\n\n    for (int i = 0; i < 5; i++) {\n        sum += nums[i];\n    }\n\n    printf(\"Sum: %d\\n\", sum);\n    return 0;\n}",
    hints: ["Arrays are zero-indexed — start the loop at 0", "Use < size, not <= size, to avoid going out of bounds", "The printf statement needs a semicolon"],
    expectedOutput: "Sum: 15"
  },
  strings: {
    instructions: "Fix the 3 bugs in this string-handling program.",
    buggy: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char word[10] = \"Cat\";\n\n    if (word == \"Cat\") {\n        printf(\"Match\\n\");\n    }\n\n    printf(\"Length: %d\\n\", strlen(word))\n    strcat(word, \"s\")\n\n    printf(\"Result: %s\\n\", word);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char word[10] = \"Cat\";\n\n    if (strcmp(word, \"Cat\") == 0) {\n        printf(\"Match\\n\");\n    }\n\n    printf(\"Length: %d\\n\", strlen(word));\n    strcat(word, \"s\");\n\n    printf(\"Result: %s\\n\", word);\n    return 0;\n}",
    hints: ["Use strcmp() to compare strings, not ==", "The printf with strlen needs a semicolon", "The strcat call needs a semicolon"],
    expectedOutput: "Match\nLength: 3\nResult: Cats"
  },
  pointers: {
    instructions: "Fix the 3 bugs in this pointer program.",
    buggy: "#include <stdio.h>\n\nvoid doubleValue(int p) {\n    *p = *p * 2;\n}\n\nint main() {\n    int x = 5\n    int *ptr;\n\n    ptr = x;\n    doubleValue(ptr);\n\n    printf(\"x = %d\\n\", x);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nvoid doubleValue(int *p) {\n    *p = *p * 2;\n}\n\nint main() {\n    int x = 5;\n    int *ptr;\n\n    ptr = &x;\n    doubleValue(ptr);\n\n    printf(\"x = %d\\n\", x);\n    return 0;\n}",
    hints: ["The variable declaration needs a semicolon", "The parameter must be a pointer: int *p", "Assign the address of x, not its value: ptr = &x;"],
    expectedOutput: "x = 10"
  },
  structures: {
    instructions: "Fix the 3 bugs in this struct program.",
    buggy: "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n}\n\nint main() {\n    Point p1;\n    p1.x = 3;\n    p1->y = 4;\n\n    printf(\"Point: (%d, %d)\\n\", p1.x, p1.y);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p1;\n    p1.x = 3;\n    p1.y = 4;\n\n    printf(\"Point: (%d, %d)\\n\", p1.x, p1.y);\n    return 0;\n}",
    hints: ["A struct definition needs a semicolon after the closing brace", "Without typedef, you must write 'struct Point' to declare a variable", "Use . for a regular struct variable — -> is only for pointers"],
    expectedOutput: "Point: (3, 4)"
  },
  "file-handling": {
    instructions: "Fix the 3 bugs in this file-writing program.",
    buggy: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"log.txt\", \"w\")\n\n    fprintf(fp \"Program started\\n\");\n\n    fclose(fp);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"log.txt\", \"w\");\n    if (fp == NULL) {\n        printf(\"Error opening file!\\n\");\n        return 1;\n    }\n\n    fprintf(fp, \"Program started\\n\");\n\n    fclose(fp);\n    return 0;\n}",
    hints: ["The fopen line needs a semicolon", "fprintf needs a comma between the file pointer and the format string", "Always check if fopen returned NULL before using the file pointer"],
    expectedOutput: "(No console output. Writes 'Program started' to log.txt)"
  },
  memory: {
    instructions: "Fix the 3 bugs in this dynamic memory program.",
    buggy: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = malloc(n)\n\n    for (int i = 0; i < n; i++) {\n        arr[i] = i;\n    }\n\n    printf(\"arr[2] = %d\\n\", arr[2]);\n    return 0;\n}",
    fixed: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = malloc(n * sizeof(int));\n\n    for (int i = 0; i < n; i++) {\n        arr[i] = i;\n    }\n\n    printf(\"arr[2] = %d\\n\", arr[2]);\n    free(arr);\n    return 0;\n}",
    hints: ["The malloc line needs a semicolon", "Allocate n * sizeof(int) bytes, not just n bytes", "Always free() memory you malloc() before the program ends"],
    expectedOutput: "arr[2] = 2"
  }
};

export const DRAG_DROP: Record<string, DragExercise> = {
  basics: {
    instructions: "Arrange these lines to create a valid 'Hello, World!' program.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    printf("Hello, World!\\n");' },
      { id: "d", text: '    return 0;' },
      { id: "e", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e"],
  },
  variables: {
    instructions: "Arrange these lines to declare variables and print them correctly.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int x = 10;' },
      { id: "d", text: '    float y = 3.14;' },
      { id: "e", text: '    printf("x=%d, y=%.2f\\n", x, y);' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"],
  },
  io: {
    instructions: "Arrange these lines to correctly prompt, read, and print a user's age.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int age;' },
      { id: "d", text: '    printf("Enter age: ");' },
      { id: "e", text: '    scanf("%d", &age);' },
      { id: "f", text: '    printf("Age: %d\\n", age);' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"],
  },
  operators: {
    instructions: "Arrange these lines to compute and print the remainder of two numbers.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int a = 17, b = 5;' },
      { id: "d", text: '    int remainder = a % b;' },
      { id: "e", text: '    printf("Remainder: %d\\n", remainder);' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"],
  },
  "control-flow": {
    instructions: "Arrange these lines to build an if/else pass-fail checker.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int score = 68;' },
      { id: "d", text: '    if (score >= 60) {' },
      { id: "e", text: '        printf("Pass\\n");' },
      { id: "f", text: '    } else {' },
      { id: "g", text: '        printf("Fail\\n");' },
      { id: "h", text: '    }' },
      { id: "i", text: '    return 0;' },
      { id: "j", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  },
  loops: {
    instructions: "Arrange these lines to build a for loop that prints squares from 1 to 5.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    for (int i = 1; i <= 5; i++) {' },
      { id: "d", text: '        printf("%d squared is %d\\n", i, i * i);' },
      { id: "e", text: '    }' },
      { id: "f", text: '    return 0;' },
      { id: "g", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"],
  },
  functions: {
    instructions: "Arrange these lines to define and call a function that doubles a number.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int doubleIt(int n) {' },
      { id: "c", text: '    return n * 2;' },
      { id: "d", text: '}' },
      { id: "e", text: 'int main() {' },
      { id: "f", text: '    printf("Doubled: %d\\n", doubleIt(8));' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"],
  },
  arrays: {
    instructions: "Arrange these lines to find the largest number in an array.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    int nums[4] = {12, 45, 7, 23};' },
      { id: "d", text: '    int max = nums[0];' },
      { id: "e", text: '    for (int i = 1; i < 4; i++) {' },
      { id: "f", text: '        if (nums[i] > max) max = nums[i];' },
      { id: "g", text: '    }' },
      { id: "h", text: '    printf("Max: %d\\n", max);' },
      { id: "i", text: '    return 0;' },
      { id: "j", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  },
  strings: {
    instructions: "Arrange these lines to copy one string into another and print it.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: '#include <string.h>' },
      { id: "c", text: 'int main() {' },
      { id: "d", text: '    char source[20] = "Hello";' },
      { id: "e", text: '    char dest[20];' },
      { id: "f", text: '    strcpy(dest, source);' },
      { id: "g", text: '    printf("Copied: %s\\n", dest);' },
      { id: "h", text: '    return 0;' },
      { id: "i", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  },
  pointers: {
    instructions: "Arrange these lines to swap two numbers using pointers.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'void swap(int *a, int *b) {' },
      { id: "c", text: '    int temp = *a;' },
      { id: "d", text: '    *a = *b;' },
      { id: "e", text: '    *b = temp;' },
      { id: "f", text: '}' },
      { id: "g", text: 'int main() {' },
      { id: "h", text: '    int x = 1, y = 2;' },
      { id: "i", text: '    swap(&x, &y);' },
      { id: "j", text: '    printf("x=%d y=%d\\n", x, y);' },
      { id: "k", text: '    return 0;' },
      { id: "l", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
  },
  structures: {
    instructions: "Arrange these lines to define a struct and print its values.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'struct Book {' },
      { id: "c", text: '    char title[30];' },
      { id: "d", text: '    int pages;' },
      { id: "e", text: '};' },
      { id: "f", text: 'int main() {' },
      { id: "g", text: '    struct Book b1 = {"C Basics", 200};' },
      { id: "h", text: '    printf("%s has %d pages\\n", b1.title, b1.pages);' },
      { id: "i", text: '    return 0;' },
      { id: "j", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  },
  "file-handling": {
    instructions: "Arrange these lines to write a single line of text to a file.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: 'int main() {' },
      { id: "c", text: '    FILE *fp = fopen("out.txt", "w");' },
      { id: "d", text: '    if (fp == NULL) return 1;' },
      { id: "e", text: '    fprintf(fp, "Hello, file!\\n");' },
      { id: "f", text: '    fclose(fp);' },
      { id: "g", text: '    return 0;' },
      { id: "h", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"],
  },
  memory: {
    instructions: "Arrange these lines to allocate, use, and free an array.",
    lines: [
      { id: "a", text: '#include <stdio.h>' },
      { id: "b", text: '#include <stdlib.h>' },
      { id: "c", text: 'int main() {' },
      { id: "d", text: '    int *nums = malloc(3 * sizeof(int));' },
      { id: "e", text: '    nums[0] = 10;' },
      { id: "f", text: '    nums[1] = 20;' },
      { id: "g", text: '    nums[2] = 30;' },
      { id: "h", text: '    free(nums);' },
      { id: "i", text: '    return 0;' },
      { id: "j", text: '}' },
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  },
};

export const COMPLETE_EXERCISES: Record<string, CompleteExercise[]> = {
  basics: [
    { template: `#include <stdio.h>\n\nint ___() {\n    printf("Hello, C!\\n");\n    return ___;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}`, blanks: ["main", "0"], instruction: "Fill in the missing function name and return value." },
  ],
  variables: [
    { template: `#include <stdio.h>\n\nint main() {\n    ___ score = 98;\n    ___ pi = 3.14;\n    printf("Score: %d, Pi: %.2f\\n", score, pi);\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int score = 98;\n    float pi = 3.14;\n    printf("Score: %d, Pi: %.2f\\n", score, pi);\n    return 0;\n}`, blanks: ["int", "float"], instruction: "Fill in the correct data types for each variable." },
  ],
  io: [
    { template: `#include <stdio.h>\n\nint main() {\n    int age;\n    printf("Enter age: ");\n    scanf("__%__", ___age);\n    printf("You are %d years old.\\n", age);\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int age;\n    printf("Enter age: ");\n    scanf("%d", &age);\n    printf("You are %d years old.\\n", age);\n    return 0;\n}`, blanks: ["%d", "&"], instruction: "Fill in the scanf format specifier and address-of operator." },
  ],
  operators: [
    { template: `#include <stdio.h>\n\nint main() {\n    int a = 9, b = 4;\n    printf("Quotient: %d\\n", a ___ b);\n    printf("Remainder: %d\\n", a ___ b);\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int a = 9, b = 4;\n    printf("Quotient: %d\\n", a / b);\n    printf("Remainder: %d\\n", a % b);\n    return 0;\n}`, blanks: ["/", "%"], instruction: "Fill in the operators to compute the quotient and remainder." },
  ],
  "control-flow": [
    { template: `#include <stdio.h>\n\nint main() {\n    int n = 4;\n    ___ (n % 2 == 0) {\n        printf("Even\\n");\n    } ___ {\n        printf("Odd\\n");\n    }\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int n = 4;\n    if (n % 2 == 0) {\n        printf("Even\\n");\n    } else {\n        printf("Odd\\n");\n    }\n    return 0;\n}`, blanks: ["if", "else"], instruction: "Fill in the keywords to complete the if/else block." },
  ],
  loops: [
    { template: `#include <stdio.h>\n\nint main() {\n    int i = 0;\n    ___ (i ___ 5) {\n        printf("%d\\n", i);\n        i++;\n    }\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while (i < 5) {\n        printf("%d\\n", i);\n        i++;\n    }\n    return 0;\n}`, blanks: ["while", "<"], instruction: "Fill in the loop keyword and comparison operator to print 0 through 4." },
  ],
  functions: [
    { template: `#include <stdio.h>\n\nint ___(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    printf("Product: %d\\n", multiply(6, 7));\n    return ___;\n}`, answer: `#include <stdio.h>\n\nint multiply(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    printf("Product: %d\\n", multiply(6, 7));\n    return 0;\n}`, blanks: ["multiply", "0"], instruction: "Fill in the function name and the return value of main." },
  ],
  arrays: [
    { template: `#include <stdio.h>\n\nint main() {\n    int nums[3] = {5, 10, 15};\n    printf("%d\\n", nums[___]);\n    printf("%d\\n", nums[___]);\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int nums[3] = {5, 10, 15};\n    printf("%d\\n", nums[0]);\n    printf("%d\\n", nums[2]);\n    return 0;\n}`, blanks: ["0", "2"], instruction: "Fill in the indices to print the first and last elements of the array." },
  ],
  strings: [
    { template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char name[20] = "Sam";\n    printf("Length: %lu\\n", ___(name));\n    ___(name, "my");\n    printf("Result: %s\\n", name);\n    return 0;\n}`, answer: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char name[20] = "Sam";\n    printf("Length: %lu\\n", strlen(name));\n    strcat(name, "my");\n    printf("Result: %s\\n", name);\n    return 0;\n}`, blanks: ["strlen", "strcat"], instruction: "Fill in the string.h functions used to get the length and concatenate text." },
  ],
  pointers: [
    { template: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int ___ptr = ___x;\n    printf("Value: %d\\n", *ptr);\n    return 0;\n}`, answer: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *ptr = &x;\n    printf("Value: %d\\n", *ptr);\n    return 0;\n}`, blanks: ["*", "&"], instruction: "Fill in the symbols to declare a pointer and assign it the address of x." },
  ],
  structures: [
    { template: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p1;\n    p1___x = 5;\n    p1___y = 10;\n    printf("(%d, %d)\\n", p1.x, p1.y);\n    return 0;\n}`, answer: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p1;\n    p1.x = 5;\n    p1.y = 10;\n    printf("(%d, %d)\\n", p1.x, p1.y);\n    return 0;\n}`, blanks: [".", "."], instruction: "Fill in the operator used to access struct members through a regular variable." },
  ],
  "file-handling": [
    {
      template: `#include <stdio.h>\n\nint main() {\n    FILE *fp = ___("data.txt", "w");\n    if (fp == ___) {\n        return 1;\n    }\n    fprintf(fp, "Hello");\n    ___(fp);\n    return 0;\n}`,
      answer: `#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("data.txt", "w");\n    if (fp == NULL) {\n        return 1;\n    }\n    fprintf(fp, "Hello");\n    fclose(fp);\n    return 0;\n}`,
      blanks: ["fopen", "NULL", "fclose"],
      instruction: "Fill in fopen, NULL check, and fclose to write to a file safely."
    }
  ],
  memory: [
    {
      template: `#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)___(sizeof(int));\n    *ptr = 100;\n    ___(ptr);\n    return 0;\n}`,
      answer: `#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(sizeof(int));\n    *ptr = 100;\n    free(ptr);\n    return 0;\n}`,
      blanks: ["malloc", "free"],
      instruction: "Fill in malloc to allocate memory dynamically and free to release it."
    }
  ]
};

export const CHAPTERS = [
  { id: "basics", label: "01 · Basics" },
  { id: "variables", label: "02 · Variables" },
  { id: "io", label: "03 · Input / Output" },
  { id: "operators", label: "04 · Operators" },
  { id: "control-flow", label: "05 · Control Flow" },
  { id: "loops", label: "06 · Loops" },
  { id: "functions", label: "07 · Functions" },
  { id: "arrays", label: "08 · Arrays" },
  { id: "strings", label: "09 · Strings" },
  { id: "pointers", label: "10 · Pointers" },
  { id: "structures", label: "11 · Structures" },
  { id: "file-handling", label: "12 · File Handling" },
  { id: "memory", label: "13 · Memory" }
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

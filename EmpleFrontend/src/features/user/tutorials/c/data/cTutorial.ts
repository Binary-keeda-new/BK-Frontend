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
  basics: [
    { q: "What does every C program require as the entry point?", options: ["start()", "main()", "begin()", "run()"], ans: 1, explanation: "Every C program must have a main() function, which serves as the starting point of execution." },
    { q: "Which symbol ends a C statement?", options: [".", ":", ";", ","], ans: 2, explanation: "A semicolon (;) is used in C to mark the end of a statement." },
    { q: "Which header is needed for printf?", options: ["stdlib.h", "math.h", "stdio.h", "string.h"], ans: 2, explanation: "stdio.h stands for Standard Input/Output, which declares core I/O functions like printf()." },
    { q: "What value does main() return to signal success?", options: ["1", "-1", "null", "0"], ans: 3, explanation: "Returning 0 from main() traditionally indicates to the operating system that the program executed successfully." },
  ],
  variables: [
    { q: "Which type stores a single character?", options: ["string", "char", "letter", "byte"], ans: 1, explanation: "The char data type is used to store a single character, occupying 1 byte of memory." },
    { q: "What format specifier prints an int?", options: ["%f", "%c", "%d", "%s"], ans: 2, explanation: "%d (or %i) is the standard format specifier used to print signed decimal integers." },
    { q: "How do you declare a constant in C?", options: ["static int X=1;", "const int X=1;", "final int X=1;", "fixed int X=1;"], ans: 1, explanation: "The 'const' prefix declares a read-only variable whose value cannot be altered after initialization." },
    { q: "Which type holds the largest decimal value?", options: ["float", "int", "short", "double"], ans: 3, explanation: "A double offers double-precision floating-point precision, storing much larger/more precise decimals than a float." },
  ],
  io: [
    { q: "What does & mean in scanf(\"%d\",&x)?", options: ["Multiply x", "Address of x", "Value of x", "Pointer type"], ans: 1, explanation: "The address-of operator (&) passes the memory address of x, letting scanf write the input directly into that variable." },
    { q: "Which function reads a full line including spaces?", options: ["scanf", "getchar", "fgets", "gets"], ans: 2, explanation: "fgets() reads a specified number of characters until a newline or EOF, safely preventing buffer overflow." },
    { q: "What does \\n do in printf?", options: ["Tab", "Backspace", "New line", "Space"], ans: 2, explanation: "\\n is an escape sequence representing a newline, shifting the output cursor to the next line." },
    { q: "Which specifier prints a float to 2 decimal places?", options: ["%.2d", "%2f", "%.2f", "%f.2"], ans: 2, explanation: "%.2f specifies a floating-point number formatted with exactly 2 digits after the decimal point." },
  ],
  operators: [
    { q: "What does the % operator do in C?", options: ["Divides two numbers", "Returns the remainder of division", "Multiplies by a percentage", "Compares two numbers"], ans: 1, explanation: "The modulus operator (%) calculates the remainder after dividing one integer by another." },
    { q: "What is the result of 7 / 2 in C when both operands are ints?", options: ["3.5", "4", "3", "2"], ans: 2, explanation: "Integer division in C truncates any decimal part, meaning 7 / 2 evaluates to 3 instead of 3.5." },
    { q: "What does x++ (post-increment) do?", options: ["Increments x then returns the new value", "Returns the current value of x, then increments it", "Decrements x", "Has no effect"], ans: 1, explanation: "Post-increment returns the value of x for the current expression first, then increments x by 1." },
    { q: "Which operator checks if two values are equal?", options: ["=", "==", "!=", "==="], ans: 1, explanation: "In C, == is the equality operator, whereas a single = is used for value assignment." },
  ],
  "control-flow": [
    { q: "What does an if statement check?", options: ["A string", "A condition that evaluates to true or false", "A loop count", "A function name"], ans: 1, explanation: "An if statement evaluates a boolean condition; any non-zero value is true, and zero is false." },
    { q: "Which keyword prevents fall-through in a switch statement?", options: ["continue", "break", "return", "stop"], ans: 1, explanation: "The break keyword exits the switch block, preventing execution from continuing into subsequent cases." },
    { q: "What does the ternary operator `cond ? a : b` return?", options: ["Always a", "a if cond is true, otherwise b", "Always b", "Nothing"], ans: 1, explanation: "The ternary operator evaluates cond. If true, it returns expression 'a'; otherwise, it returns 'b'." },
    { q: "Which value does C treat as 'false' in a condition?", options: ["Any negative number", "0", "An empty string", "1"], ans: 1, explanation: "In C, a value of 0 represents false, while any non-zero value represents true." },
  ],
  loops: [
    { q: "Which loop guarantees its body runs at least once?", options: ["for", "while", "do-while", "switch"], ans: 2, explanation: "A do-while loop evaluates its conditional statement at the end of the iteration, guaranteeing at least one execution." },
    { q: "What does break do inside a loop?", options: ["Skips to the next iteration", "Exits the loop immediately", "Restarts the loop", "Pauses execution"], ans: 1, explanation: "The break statement terminates the current loop execution instantly and passes control to the next block." },
    { q: "In `for (init; cond; update)`, when does update run?", options: ["Before each iteration begins", "After each iteration's body finishes", "Only once at the start", "Never"], ans: 1, explanation: "The update statement runs at the very end of each iteration loop body before the condition is re-evaluated." },
    { q: "What happens if a while loop's condition is false from the very start?", options: ["It runs once", "It runs forever", "The body never executes", "It throws an error"], ans: 2, explanation: "A while loop is a pre-test loop; if the condition is false initially, the body is skipped entirely." },
  ],
  functions: [
    { q: "Why write a function prototype before main()?", options: ["It runs the function early", "It tells the compiler the function's signature ahead of its full definition", "It makes the function run faster", "It is required for every C program"], ans: 1, explanation: "Prototypes declare a function's parameters and return type so the compiler can validate calls before the function is defined." },
    { q: "What does 'pass by value' mean?", options: ["The function modifies the original variable", "A copy of the argument is passed into the function", "Only pointers can be passed", "Arguments are passed by reference"], ans: 1, explanation: "Pass-by-value makes a local copy of the parameter. Changes inside the function do not affect the original variable." },
    { q: "What must every recursive function have to avoid infinite recursion?", options: ["A loop", "A base case", "A pointer", "A global variable"], ans: 1, explanation: "A base case specifies the condition under which a recursive function stops calling itself." },
    { q: "Which return type is used when a function returns no value?", options: ["int", "null", "void", "empty"], ans: 2, explanation: "The void keyword indicates that a function does not return any value to the caller." },
  ],
  arrays: [
    { q: "What is the index of the first element in a C array?", options: ["1", "0", "-1", "Depends on the array"], ans: 1, explanation: "C uses zero-based indexing, meaning the first element of an array is accessed at index 0." },
    { q: "Given `int a[5];`, what is the valid index range?", options: ["1 to 5", "0 to 4", "0 to 5", "1 to 4"], ans: 1, explanation: "An array of size N has valid indices running from 0 up to N-1." },
    { q: "How do you access row 1, column 2 of a 2D array called grid?", options: ["grid(1,2)", "grid[1][2]", "grid[1,2]", "grid->1->2"], ans: 1, explanation: "2D array elements are accessed using double square brackets: grid[row][column]." },
    { q: "What happens if you access an index outside an array's bounds in C?", options: ["The compiler stops you", "C automatically resizes the array", "Undefined behavior — C does not check bounds", "It returns 0"], ans: 2, explanation: "C does not perform bounds checking at runtime; out-of-bounds access leads to undefined behavior or memory corruption." },
  ],
  strings: [
    { q: "What character marks the end of a C string?", options: ["'\\n'", "' '", "'\\0'", "'\\e'"], ans: 2, explanation: "The null-terminator character '\\0' marks the boundary and end of a character string in C." },
    { q: "Which function returns the number of characters in a string, excluding the terminator?", options: ["strcpy", "strlen", "strcmp", "strcat"], ans: 1, explanation: "strlen() counts characters in a string up to, but not including, the terminating null character." },
    { q: "What does strcmp(a, b) return when the two strings are equal?", options: ["1", "-1", "0", "true"], ans: 2, explanation: "strcmp() compares strings lexicographically and returns 0 if they are identical." },
    { q: "Why is fgets often preferred over scanf(\"%s\", ...) for reading strings?", options: ["fgets is always faster", "fgets can read a full line including spaces", "scanf cannot read strings at all", "fgets compiles smaller code"], ans: 1, explanation: "fgets() accepts spaces and limits the maximum characters read, making it much safer against buffer overflows." },
  ],
  pointers: [
    { q: "What does the & operator do?", options: ["Dereferences a pointer", "Returns the memory address of a variable", "Adds two numbers", "Declares a pointer"], ans: 1, explanation: "The address-of operator (&) extracts the memory location where a variable is stored." },
    { q: "What does *ptr do when ptr is a pointer?", options: ["Multiplies ptr by something", "Declares a new pointer", "Accesses the value ptr points to", "Returns the address of ptr"], ans: 2, explanation: "The dereference operator (*) accesses or modifies the value stored at the address pointed to by ptr." },
    { q: "Why pass a pointer to a function instead of a regular variable?", options: ["Pointers are always faster", "It lets the function modify the caller's original variable", "It is required for all function arguments", "Pointers always use less memory"], ans: 1, explanation: "Passing pointers shares the memory address, allowing modifications to propagate back to the caller." },
    { q: "For `int arr[3]`, what does `*(arr + 1)` access?", options: ["arr[0]", "arr[1]", "arr[2]", "The address of arr"], ans: 1, explanation: "By pointer arithmetic, adding 1 to the array name points to the next element, which is dereferenced as arr[1]." },
  ],
  structures: [
    { q: "What does a struct let you do in C?", options: ["Define a new function", "Group related variables of different types under one name", "Create a loop", "Allocate memory automatically"], ans: 1, explanation: "A struct is a user-defined type that aggregates variables of various data types into a single unit." },
    { q: "Which operator accesses a struct member through a regular struct variable?", options: ["->", "::", ".", "&"], ans: 2, explanation: "The dot operator (.) is used to access members directly from a struct variable." },
    { q: "Which operator accesses a struct member through a pointer to the struct?", options: [".", "->", "*", "&"], ans: 1, explanation: "The arrow operator (->) dereferences a struct pointer and accesses the member in one step." },
    { q: "What is the main benefit of using typedef with a struct?", options: ["It makes the struct faster", "You can use the type name without writing 'struct' each time", "It is required to compile structs", "It automatically initializes members to 0"], ans: 1, explanation: "typedef creates an alias, letting you write 'Point p;' instead of 'struct Point p;' for cleaner code." },
  ],
  "file-handling": [
    { q: "What does fopen return if the file cannot be opened?", options: ["0", "An empty string", "NULL", "-1 cast as a pointer"], ans: 2, explanation: "fopen() returns NULL to signal that the file could not be opened due to missing files, permissions, or issues." },
    { q: "Which file mode appends new data to the end of an existing file instead of overwriting it?", options: ["\"r\"", "\"w\"", "\"a\"", "\"x\""], ans: 2, explanation: "The append mode (\"a\") positions the file write pointer at the end of the file, preserving existing content." },
    { q: "Why must you always call fclose() on an open file?", options: ["It is optional but recommended", "To free the FILE pointer's resources and flush data to disk", "To delete the file", "To rename the file"], ans: 1, explanation: "fclose() releases system file locks, frees buffers, and ensures all written data is saved to disk." },
    { q: "What does fgets(line, sizeof(line), fp) do?", options: ["Writes a line to the file", "Reads one line from the file into the buffer", "Counts the lines in the file", "Closes the file"], ans: 1, explanation: "fgets() reads characters from a file stream until a newline is found or the buffer size limit is reached." },
  ],
  memory: [
    { q: "Which header declares malloc, calloc, realloc, and free?", options: ["stdio.h", "stdlib.h", "string.h", "math.h"], ans: 1, explanation: "Memory management functions are declared inside the standard library header <stdlib.h>." },
    { q: "What does malloc return if it cannot allocate the requested memory?", options: ["0", "NULL", "-1", "An empty array"], ans: 1, explanation: "If the heap is full or the request cannot be met, malloc() returns NULL to signal failure." },
    { q: "What is the key difference between malloc and calloc?", options: ["calloc's memory cannot be freed", "malloc only works for arrays", "calloc zero-initializes the memory it allocates", "malloc is always faster"], ans: 2, explanation: "Unlike malloc which leaves memory uninitialized (garbage values), calloc sets all allocated bytes to zero." },
    { q: "Why must every malloc/calloc be matched with a free?", options: ["It's just a style preference", "To avoid memory leaks", "Because the compiler requires it", "To make the program run faster"], ans: 1, explanation: "Dynamically allocated memory remains reserved until explicitly released; failing to free it causes memory leaks." },
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

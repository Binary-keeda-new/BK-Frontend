// Chapter 03

export const chapter03_CONTENT = {
  "title": "Input & Output",
  "description": "Java provides standard stream variables System.out and System.in for output and input. The Scanner class is used to read formatted user input.",
  "points": [
    {
      "heading": "System.out methods",
      "body": "`println()` prints data with a newline. `print()` prints data without a newline. `printf()` provides formatted output (e.g., `%d`, `%s`)."
    },
    {
      "heading": "Reading Input with Scanner",
      "body": "Import `java.util.Scanner`. Initialize with: `Scanner scanner = new Scanner(System.in);`. Always close the scanner when done."
    },
    {
      "heading": "Reading Primitive values",
      "body": "Use `nextInt()` for integers, `nextDouble()` for doubles, `nextBoolean()` for booleans, and `next()` for single words."
    },
    {
      "heading": "Reading Strings",
      "body": "Use `nextLine()` to read an entire line of text. Be careful: call `nextLine()` to clear the buffer if reading a line after `nextInt()`."
    },
    {
      "heading": "Format Specifiers",
      "body": "Use `System.out.printf(\"Total: %.2f\", total);` for decimals, `%s` for strings, `%d` for integers, and `%n` for a platform-independent newline."
    },
    {
      "heading": "System.err",
      "body": "`System.err` is the standard error stream. Output is typically colored red in IDE consoles to denote error logs."
    }
  ],
  "code": "import java.util.Scanner;\n\npublic class InputOutput {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        System.out.print(\"Enter name: \");\n        String name = scanner.nextLine();\n\n        System.out.print(\"Enter age: \");\n        int age = scanner.nextInt();\n\n        System.out.printf(\"Hello, %s! Next year you will be %d.%n\", name, age + 1);\n        scanner.close();\n    }\n}"
};

export const chapter03_DEBUG = {
  "instructions": "Fix the 3 errors preventing reading and printing values correctly.",
  "buggy": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = Scanner(System.in);\n        int age = scanner.nextString();\n        System.out.printf(\"Age: %s\\n\", age);\n    }\n}",
  "fixed": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int age = scanner.nextInt();\n        System.out.printf(\"Age: %d\\n\", age);\n    }\n}",
  "hints": [
    "Instantiate the Scanner using the 'new' keyword",
    "Use nextInt() to read an integer, not nextString()",
    "Use %d format specifier for integer types, not %s"
  ],
  "expectedOutput": "Age: [input]"
};

export const chapter03_DRAG_DROP = {
  "instructions": "Arrange these lines to read an integer from console and print it.",
  "lines": [
    {
      "id": "a",
      "text": "import java.util.Scanner;"
    },
    {
      "id": "b",
      "text": "public class Main {"
    },
    {
      "id": "c",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "d",
      "text": "        Scanner input = new Scanner(System.in);"
    },
    {
      "id": "e",
      "text": "        int value = input.nextInt();"
    },
    {
      "id": "f",
      "text": "        System.out.println(value);"
    },
    {
      "id": "g",
      "text": "    }"
    },
    {
      "id": "h",
      "text": "}"
    }
  ],
  "order": [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h"
  ]
};

export const chapter03_MCQ = [
  {
    "q": "Which standard stream in Java is typically used to output error messages directly without buffering? (GATE CS 2008)",
    "options": [
      "System.out",
      "System.in",
      "System.err",
      "System.log"
    ],
    "ans": 2,
    "explanation": "System.err is the standard error output stream, which is conventionally unbuffered so errors appear immediately."
  },
  {
    "q": "When using `Scanner.nextInt()` followed by `Scanner.nextLine()`, which issue is commonly encountered? (GATE IT 2012)",
    "options": [
      "Type mismatch exception",
      "Scanner skips the nextLine() because it consumes the leftover newline character",
      "The program crashes",
      "nextInt() returns 0"
    ],
    "ans": 1,
    "explanation": "nextInt() reads the integer but does not consume the newline character generated when the user presses Enter. nextLine() then consumes this newline immediately, returning an empty string."
  },
  {
    "q": "Which Java formatting specifier correctly outputs a floating-point number restricted to exactly two decimal places? (GATE CS 2015)",
    "options": [
      "%2f",
      "%.2f",
      "%0.2d",
      "%f2"
    ],
    "ans": 1,
    "explanation": "%.2f is the correct format specifier in methods like printf() to format a float or double to 2 decimal places."
  },
  {
    "q": "What exception is thrown by `Scanner.nextInt()` if the user inputs a string instead of an integer? (GATE CS 2016)",
    "options": [
      "IOException",
      "InputMismatchException",
      "NumberFormatException",
      "IllegalArgumentException"
    ],
    "ans": 1,
    "explanation": "The Scanner class throws an InputMismatchException when the retrieved token does not match the expected type pattern."
  },
  {
    "q": "In Java, how do `System.out.print` and `System.out.println` differ? (GATE IT 2006)",
    "options": [
      "print is for integers, println is for strings",
      "println appends a newline character to the output, print does not",
      "print flushes the buffer immediately, println does not",
      "There is no difference"
    ],
    "ans": 1,
    "explanation": "println() adds a newline at the end of the printed output, moving the cursor to the next line, whereas print() leaves the cursor on the same line."
  },
  {
    "q": "Which of the following packages must be imported to use the Scanner class in Java? (GATE CS 2011)",
    "options": [
      "java.io",
      "java.lang",
      "java.util",
      "java.net"
    ],
    "ans": 2,
    "explanation": "The Scanner class is part of the java.util package."
  },
  {
    "q": "Which method of the Scanner class is used to read a single word (token) up to the next whitespace? (GATE CS 2013)",
    "options": [
      "nextLine()",
      "next()",
      "nextString()",
      "nextWord()"
    ],
    "ans": 1,
    "explanation": "The next() method finds and returns the next complete token from the scanner, delimited by whitespace."
  },
  {
    "q": "What does `System.in` represent in Java? (GATE IT 2005)",
    "options": [
      "Standard output stream",
      "Standard error stream",
      "Standard input stream",
      "A method for reading files"
    ],
    "ans": 2,
    "explanation": "System.in is an InputStream object representing the standard input stream, typically the keyboard."
  },
  {
    "q": "Consider the statement `System.out.printf(\"Count is %d\", 5);`. What does %d represent? (GATE CS 2010)",
    "options": [
      "A double value",
      "A decimal (integer) value",
      "A string value",
      "A boolean value"
    ],
    "ans": 1,
    "explanation": "%d is the format specifier for decimal integers in Java's printf method."
  },
  {
    "q": "What is the primary advantage of using a Scanner over `System.in.read()`? (GATE CS 2017)",
    "options": [
      "Scanner is faster",
      "Scanner parses primitive types and strings automatically",
      "Scanner does not require importing packages",
      "Scanner reads only binary data"
    ],
    "ans": 1,
    "explanation": "Scanner provides convenient methods like nextInt(), nextDouble(), etc., to easily parse input, whereas System.in.read() reads bytes directly."
  },
  {
    "q": "Which format specifier is used to print a string using `System.out.printf()`? (GATE CS 2004)",
    "options": [
      "%c",
      "%s",
      "%str",
      "%d"
    ],
    "ans": 1,
    "explanation": "%s is used as the format specifier for Strings."
  },
  {
    "q": "What happens if you do not close a Scanner attached to System.in? (GATE IT 2014)",
    "options": [
      "Compilation error",
      "System crash",
      "Potential resource leak",
      "The input is discarded"
    ],
    "ans": 2,
    "explanation": "Failing to close a Scanner may cause a resource leak, though for System.in it's generally considered acceptable for the lifetime of the program."
  },
  {
    "q": "How can you read a boolean value using Scanner? (GATE CS 2009)",
    "options": [
      "nextBool()",
      "getBoolean()",
      "nextBoolean()",
      "readBoolean()"
    ],
    "ans": 2,
    "explanation": "The method nextBoolean() parses the next token as a boolean value."
  },
  {
    "q": "What will `System.out.printf(\"%n\")` do? (GATE CS 2018)",
    "options": [
      "Prints the letter n",
      "Prints a null character",
      "Outputs a platform-specific newline character",
      "Throws a format exception"
    ],
    "ans": 2,
    "explanation": "%n is a platform-independent newline character used in printf()."
  },
  {
    "q": "Which of these is a correct way to instantiate a Scanner to read from the console? (GATE IT 2007)",
    "options": [
      "Scanner sc = Scanner(System.in);",
      "Scanner sc = new Scanner(System.out);",
      "Scanner sc = new Scanner(System.in);",
      "Scanner sc = new Scanner();"
    ],
    "ans": 2,
    "explanation": "Scanner must be instantiated with 'new', and to read from the console, System.in is passed to its constructor."
  }
];

export const chapter03_COMPLETE_EXERCISES = [];

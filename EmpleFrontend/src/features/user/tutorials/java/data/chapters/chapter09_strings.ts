// Chapter 09

export const chapter09_CONTENT = {
  "title": "Strings",
  "description": "In Java, a String is an object that represents a sequence of characters. Strings are immutable, meaning their content cannot be modified once created.",
  "points": [
    {
      "heading": "Immutability",
      "body": "`String` operations (like concat or replace) do not modify the original string; instead, they return a new `String` object."
    },
    {
      "heading": "Comparing Strings",
      "body": "Always use `.equals()` for content comparison. `==` checks if two variables point to the same memory reference."
    },
    {
      "heading": "Common Methods",
      "body": "`length()` returns character count; `charAt(index)` gets character; `substring(start, end)` extracts parts; `toLowerCase()` converts case."
    },
    {
      "heading": "String Pool",
      "body": "Java optimizes memory by storing literal strings in a pool. Literal declarations (e.g. `\"Hi\"`) share pool references."
    },
    {
      "heading": "Concatenation",
      "body": "Use `+` operator or `concat()`. Under the hood, Java uses `StringBuilder` to optimize repetitive literal concatenations."
    },
    {
      "heading": "StringBuilder & StringBuffer",
      "body": "Mutable character sequences. Use `StringBuilder` for heavy string manipulations inside single-threaded applications."
    }
  ],
  "code": "public class StringsExample {\n    public static void main(String[] args) {\n        String str = \"Java Programming\";\n        System.out.println(\"Length: \" + str.length());\n        System.out.println(\"Char at index 5: \" + str.charAt(5));\n        System.out.println(\"Substring: \" + str.substring(0, 4));\n\n        String s1 = new String(\"Hello\");\n        String s2 = new String(\"Hello\");\n        System.out.println(\"s1 == s2: \" + (s1 == s2));       // false\n        System.out.println(\"s1.equals(s2): \" + s1.equals(s2)); // true\n    }\n}"
};

export const chapter09_DEBUG = {
  "instructions": "Fix the 3 string methods and length property bugs.",
  "buggy": "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        int size = text.length;\n        char letter = text.charAt[1];\n        String upper = text.upper();\n        System.out.println(upper);\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        int size = text.length();\n        char letter = text.charAt(1);\n        String upper = text.toUpperCase();\n        System.out.println(upper);\n    }\n}",
  "hints": [
    "String length is retrieved using a method call length()",
    "Use parentheses text.charAt(1) instead of square brackets",
    "The method to convert string to uppercase is toUpperCase()"
  ],
  "expectedOutput": "JAVA"
};

export const chapter09_DRAG_DROP = {
  "instructions": "Arrange these lines to concatenate two strings in Java.",
  "lines": [
    {
      "id": "a",
      "text": "public class Main {"
    },
    {
      "id": "b",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "c",
      "text": "        String s1 = \"Java\";"
    },
    {
      "id": "d",
      "text": "        String s2 = \"SE\";"
    },
    {
      "id": "e",
      "text": "        String s3 = s1 + s2;"
    },
    {
      "id": "f",
      "text": "        System.out.println(s3);"
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

export const chapter09_MCQ = [
  {
    "q": "Consider the following code snippet (GATE CS 2012):\n```java\nString s1 = new String(\"GATE\");\nString s2 = new String(\"GATE\");\nSystem.out.println(s1 == s2);\n```\nWhat will be the output?",
    "options": [
      "true",
      "false",
      "Compilation Error",
      "Runtime Exception"
    ],
    "ans": 1,
    "explanation": "In Java, the `new` keyword always creates a new object in the heap memory. Thus, `s1` and `s2` refer to different objects, making the `==` reference comparison evaluate to `false`."
  },
  {
    "q": "Consider the following Java code (GATE IT 2006):\n```java\nString s = \"Java\";\ns.concat(\" Programming\");\nSystem.out.println(s);\n```\nWhat will be printed?",
    "options": [
      "Java",
      "Java Programming",
      " Programming",
      "null"
    ],
    "ans": 0,
    "explanation": "Strings in Java are immutable. The `concat` method returns a new String object, but since it is not assigned to any variable, `s` remains \"Java\"."
  },
  {
    "q": "Which of the following is true about `String` and `StringBuffer` in Java (GATE CS 2005)?",
    "options": [
      "Both are mutable",
      "String is immutable, StringBuffer is mutable",
      "String is mutable, StringBuffer is immutable",
      "Both are immutable"
    ],
    "ans": 1,
    "explanation": "In Java, `String` objects are immutable (their value cannot be changed after creation), while `StringBuffer` provides mutable sequence of characters."
  },
  {
    "q": "Consider the following expression in Java (GATE CS 2014):\n```java\nString str = 10 + 20 + \"Java\" + 10 + 20;\nSystem.out.println(str);\n```\nWhat is the output?",
    "options": [
      "1020Java1020",
      "30Java1020",
      "30Java30",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "The evaluation happens left to right. `10 + 20` is evaluated as integer addition (30). Then `30 + \"Java\"` results in string concatenation (\"30Java\"). Subsequent `+` operations with integers treat them as strings, resulting in \"30Java1020\"."
  },
  {
    "q": "Consider the following code (GATE IT 2008):\n```java\nString s = \"abcdef\";\nSystem.out.println(s.substring(1, 3));\n```\nWhat will be the output?",
    "options": [
      "ab",
      "bc",
      "bcd",
      "cd"
    ],
    "ans": 1,
    "explanation": "The `substring(start, end)` method in Java extracts characters from `start` index (inclusive) to `end` index (exclusive). Index 1 is 'b', index 2 is 'c'. Output is \"bc\"."
  },
  {
    "q": "Analyze the output (GATE CS 2001):\n```java\nString s1 = \"hello\";\nString s2 = \"hello\";\nSystem.out.println(s1 == s2);\n``",
    "options": [
      "true",
      "false",
      "Compilation Error",
      "Runtime Exception"
    ],
    "ans": 0,
    "explanation": "String literals are placed in the string pool. Since \"hello\" is a literal, both s1 and s2 refer to the exact same object in the string pool, so == returns true."
  },
  {
    "q": "What is the return type of the `charAt(int index)` method of the String class? (GATE CS 1999)",
    "options": [
      "String",
      "char",
      "int",
      "byte"
    ],
    "ans": 1,
    "explanation": "The charAt() method returns a primitive char at the specified index."
  },
  {
    "q": "Identify the output (GATE CS 2016):\n```java\nSystem.out.println(\"Hello\".replace('l', 'w'));\n``",
    "options": [
      "Hello",
      "Hewlo",
      "Hewwo",
      "Compilation Error"
    ],
    "ans": 2,
    "explanation": "The replace() method replaces all occurrences of the first character with the second character. 'Hello' becomes 'Hewwo'."
  },
  {
    "q": "What does the following snippet print? (GATE IT 2004)\n```java\nString s = \" Java \";\nSystem.out.println(s.trim().length());\n``",
    "options": [
      "6",
      "5",
      "4",
      "3"
    ],
    "ans": 2,
    "explanation": "trim() removes leading and trailing spaces, leaving \"Java\", which has a length of 4."
  },
  {
    "q": "Choose the correct output (GATE CS 2013):\n```java\nString str = \"Programming\";\nSystem.out.println(str.indexOf('r'));\n``",
    "options": [
      "1",
      "2",
      "3",
      "-1"
    ],
    "ans": 0,
    "explanation": "The indexOf() method returns the index of the first occurrence of the specified character. The first 'r' is at index 1 (0-based indexing)."
  },
  {
    "q": "What is printed here? (GATE CS 2008)\n```java\nString s = \"abc\";\nSystem.out.println(s.equals(\"ABC\"));\nSystem.out.println(s.equalsIgnoreCase(\"ABC\"));\n``",
    "options": [
      "true false",
      "false true",
      "true true",
      "false false"
    ],
    "ans": 1,
    "explanation": "equals() is case-sensitive, so it returns false. equalsIgnoreCase() ignores case, returning true."
  },
  {
    "q": "Is a String object thread-safe in Java? (GATE CS 2018)",
    "options": [
      "Yes, because it is immutable",
      "No, only StringBuffer is thread-safe",
      "Yes, because it uses synchronized methods",
      "No, strings are never thread-safe"
    ],
    "ans": 0,
    "explanation": "Since String objects are immutable, their state cannot be changed after creation, making them inherently thread-safe."
  },
  {
    "q": "What is printed? (GATE CS 2019)\n```java\nStringBuilder sb = new StringBuilder(\"Java\");\nsb.append(\" SE\");\nSystem.out.println(sb);\n``",
    "options": [
      "Java",
      "Java SE",
      "SE",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "Unlike String, StringBuilder is mutable. append() modifies the same object and adds \" SE\", making it \"Java SE\"."
  },
  {
    "q": "What happens if we pass null to a String's length() method? (GATE IT 2007)\n```java\nString s = null;\nSystem.out.println(s.length());\n``",
    "options": [
      "Prints 0",
      "Prints null",
      "Throws NullPointerException",
      "Compilation Error"
    ],
    "ans": 2,
    "explanation": "Calling an instance method on a null reference throws a NullPointerException at runtime."
  },
  {
    "q": "Evaluate (GATE CS 2011):\n```java\nString s1 = \"Apple\";\nString s2 = \"Apple\";\nSystem.out.println(s1.compareTo(s2));\n``",
    "options": [
      "true",
      "false",
      "0",
      "1"
    ],
    "ans": 2,
    "explanation": "The compareTo() method compares strings lexicographically. Since both are identical, it returns 0."
  }
];

export const chapter09_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        int len = str.___;
    }
}`,
    blanks: [
      "length()"
    ]
  }
];

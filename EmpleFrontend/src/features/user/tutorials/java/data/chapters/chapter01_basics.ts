// Chapter 01

export const chapter01_CONTENT = {
  "title": "Java Basics",
  "description": "Java is a popular, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. It runs on the Write Once, Run Anywhere principle using the Java Virtual Machine (JVM).",
  "points": [
    {
      "heading": "Structure of a Java program",
      "body": "Every Java program is written inside a class. The filename must match the public class name (e.g., `Main.java`). Execution starts from the main method: `public static void main(String[] args)`."
    },
    {
      "heading": "Compilation & JVM",
      "body": "Source `.java` → Compiler `javac` → Bytecode `.class` → JVM `java`. The JVM interprets/JIT-compiles bytecode into native machine instructions."
    },
    {
      "heading": "Comments",
      "body": "`// Single-line comment`\n`/* Multi-line comment */`\n`/** Javadoc comment used to generate API docs */"
    },
    {
      "heading": "Identifiers & Keywords",
      "body": "Names of classes, methods, and variables are identifiers. Keywords like `public`, `class`, `static`, `void` are <u>reserved by Java</u>."
    },
    {
      "heading": "System.out.println()",
      "body": "Standard output function. `System` is a class, `out` is a static print stream, and `println` is the method that prints text followed by a newline."
    },
    {
      "heading": "Strict Rules",
      "body": "Java is <u>case-sensitive</u>, statements must end with semicolons, and code blocks are enclosed in curly braces `{}`."
    }
  ],
  "code": "public class Main {\n    public static void main(String[] args) {\n        // Print hello message to console\n        System.out.println(\"Hello, Java!\");\n    }\n}"
};

export const chapter01_DEBUG = {
  "instructions": "Fix the 3 syntax errors so this Java program compiles and prints 'Hello, World!'",
  "buggy": "public Class main {\n    public static void Main(String[] args) {\n        System.out.println(\"Hello, World!\")\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
  "hints": [
    "class keyword is lowercase",
    "The class name must match Main (uppercase M)",
    "System.out.println requires a semicolon at the end"
  ],
  "expectedOutput": "Hello, World!"
};

export const chapter01_DRAG_DROP = {
  "instructions": "Arrange these lines to create a valid Java program that prints Hello.",
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
      "text": "        System.out.println(\"Hello\");"
    },
    {
      "id": "d",
      "text": "    }"
    },
    {
      "id": "e",
      "text": "}"
    }
  ],
  "order": [
    "a",
    "b",
    "c",
    "d",
    "e"
  ]
};

export const chapter01_MCQ = [
  {
    "q": "Which of the following is true about Java byte code? (GATE CS 2011)",
    "options": [
      "It is machine dependent",
      "It is the machine code for the Java Virtual Machine",
      "It is human readable source code",
      "It executes directly on the hardware"
    ],
    "ans": 1,
    "explanation": "Byte code is the machine language for the JVM, which makes it platform-independent."
  },
  {
    "q": "Which of the following components is responsible for optimizing and converting bytecode into native machine code at runtime? (GATE IT 2007)",
    "options": [
      "Java Compiler",
      "Java Virtual Machine Interpreter",
      "Just-In-Time (JIT) Compiler",
      "Garbage Collector"
    ],
    "ans": 2,
    "explanation": "The JIT compiler, a part of the JVM, compiles bytecode into native machine code at runtime to improve performance."
  },
  {
    "q": "In the context of language processors, the Java compiler (javac) translates source code into: (GATE CS 2014)",
    "options": [
      "Target machine code",
      "Assembly language code",
      "Intermediate representation (bytecode)",
      "Relocatable machine code"
    ],
    "ans": 2,
    "explanation": "Java compiler generates an intermediate representation called bytecode, not native machine code."
  },
  {
    "q": "Which of the following is NOT a fundamental feature of Object-Oriented Programming as supported by Java? (GATE CS 2005)",
    "options": [
      "Encapsulation",
      "Inheritance",
      "Pointers arithmetic",
      "Polymorphism"
    ],
    "ans": 2,
    "explanation": "Java does not support explicit pointer arithmetic to ensure memory safety."
  },
  {
    "q": "Consider a program compiled to intermediate code (like Java bytecode). The primary advantage is: (GATE IT 2008)",
    "options": [
      "Faster execution speed than native code",
      "Portability across different hardware architectures",
      "Elimination of the need for an operating system",
      "Reduction in memory consumption"
    ],
    "ans": 1,
    "explanation": "Intermediate codes like Java bytecode are designed to be run on any platform that has an appropriate interpreter/JVM, ensuring portability."
  },
  {
    "q": "Which object-oriented programming concept is achieved by hiding the internal state and requiring all interaction to be performed through an object's methods? (GATE CS 2006)",
    "options": [
      "Abstraction",
      "Encapsulation",
      "Inheritance",
      "Polymorphism"
    ],
    "ans": 1,
    "explanation": "Encapsulation bundles the data and methods that operate on the data into a single unit and restricts direct access to some of the object's components."
  },
  {
    "q": "In Java, what is the role of the Garbage Collector? (GATE IT 2005)",
    "options": [
      "To delete unreferenced objects from memory",
      "To compile java code into bytecode",
      "To prevent unauthorized access to memory",
      "To manage file I/O operations"
    ],
    "ans": 0,
    "explanation": "The garbage collector automatically reclaims memory by deleting objects that are no longer reachable in the program."
  },
  {
    "q": "Which of these is a valid entry point for a Java program? (GATE CS 2012)",
    "options": [
      "public void main(String[] args)",
      "public static void main(String args)",
      "public static void main(String[] args)",
      "static void Main(String args[])"
    ],
    "ans": 2,
    "explanation": "The standard entry point must be public, static, return void, named 'main', and take an array of Strings."
  },
  {
    "q": "Which of the following is correct regarding the execution of a Java program? (GATE CS 2018)",
    "options": [
      "It is strictly compiled",
      "It is strictly interpreted",
      "It is first interpreted and then compiled",
      "It is first compiled into bytecode and then interpreted/compiled by JVM"
    ],
    "ans": 3,
    "explanation": "Java source code is compiled by javac into bytecode, which is then interpreted or JIT-compiled by the JVM."
  },
  {
    "q": "The concept of 'Write Once, Run Anywhere' (WORA) in Java is primarily due to: (GATE IT 2015)",
    "options": [
      "The Java Compiler producing native code",
      "The presence of JVM on different platforms",
      "The absence of pointers in Java",
      "Automatic garbage collection"
    ],
    "ans": 1,
    "explanation": "The JVM acts as an abstraction layer between the bytecode and the underlying operating system and hardware."
  },
  {
    "q": "Which of the following keywords is used to define a class in Java? (GATE CS 2002)",
    "options": [
      "struct",
      "class",
      "Class",
      "def"
    ],
    "ans": 1,
    "explanation": "The 'class' keyword is used to declare classes in Java."
  },
  {
    "q": "Which of the following best describes polymorphism in Java? (GATE CS 2010)",
    "options": [
      "Hiding data from outside interference",
      "Creating new classes from existing ones",
      "The ability of different objects to respond to the same method call in their own way",
      "Restricting access to members"
    ],
    "ans": 2,
    "explanation": "Polymorphism allows objects of different classes to be treated as objects of a common superclass, responding uniquely to overridden methods."
  },
  {
    "q": "What happens if a Java program does not have a main method? (GATE CS 2008)",
    "options": [
      "It will not compile",
      "It will compile but throw a runtime error when executed",
      "It will execute normally",
      "It will run in an infinite loop"
    ],
    "ans": 1,
    "explanation": "A class without a main method will compile successfully, but the JVM will throw a NoSuchMethodError when trying to run it as an application."
  },
  {
    "q": "Which of the following is NOT a reserved keyword in Java? (GATE CS 2017)",
    "options": [
      "public",
      "v\u043Eid",
      "main",
      "static"
    ],
    "ans": 2,
    "explanation": "main is not a keyword in Java; it is just the name of the method the JVM looks for as the entry point."
  },
  {
    "q": "Which language feature of Java ensures that objects cannot be explicitly destroyed by the programmer? (GATE CS 2004)",
    "options": [
      "Lack of pointers",
      "Exception handling",
      "Automatic Garbage Collection",
      "Strong typing"
    ],
    "ans": 2,
    "explanation": "Java does not provide a destructor or free() function. Memory management is handled entirely by the Automatic Garbage Collector."
  }
];

export const chapter01_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static void ___(String[] args) {
        System.out.println("Hello World");
    }
}`,
    blanks: [
      "main"
    ]
  }
];

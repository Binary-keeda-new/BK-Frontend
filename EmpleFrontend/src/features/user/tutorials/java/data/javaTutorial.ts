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
    title: "Java Basics",
    description: "Java is a popular, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. It runs on the Write Once, Run Anywhere principle using the Java Virtual Machine (JVM).",
    points: [
      { heading: "Structure of a Java program", body: "Every Java program is written inside a class. The filename must match the public class name (e.g., `Main.java`). Execution starts from the main method: `public static void main(String[] args)`." },
      { heading: "Compilation & JVM", body: "Source `.java` → Compiler `javac` → Bytecode `.class` → JVM `java`. The JVM interprets/JIT-compiles bytecode into native machine instructions." },
      { heading: "Comments", body: "`// Single-line comment`\n`/* Multi-line comment */`\n`/** Javadoc comment used to generate API docs */`" },
      { heading: "Identifiers & Keywords", body: "Names of classes, methods, and variables are identifiers. Keywords like `public`, `class`, `static`, `void` are <u>reserved by Java</u>." },
      { heading: "System.out.println()", body: "Standard output function. `System` is a class, `out` is a static print stream, and `println` is the method that prints text followed by a newline." },
      { heading: "Strict Rules", body: "Java is <u>case-sensitive</u>, statements must end with semicolons, and code blocks are enclosed in curly braces `{}`." }
    ],
    code: `public class Main {\n    public static void main(String[] args) {\n        // Print hello message to console\n        System.out.println("Hello, Java!");\n    }\n}`
  },
  variables: {
    title: "Variables & Data Types",
    description: "Variables are containers for storing data values. Java is statically-typed, meaning every variable must be declared with a data type before use.",
    points: [
      { heading: "Primitive Types", body: "Java has 8 primitives: `byte`, `short`, `int`, `long` (integers); `float`, `double` (floating points); `boolean` (true/false); `char` (single 16-bit Unicode character)." },
      { heading: "Reference Types", body: "Point to objects in memory. The most common reference type is `String` (e.g., `String name = \"Alex\"`). Uninitialized reference types default to `null`." },
      { heading: "Declaration & Initialization", body: "`int count = 10;`\n`double price = 19.99;`\n`char grade = 'A';`\n`boolean isActive = true;`" },
      { heading: "Type Casting", body: "Widening casting (implicit): `byte` -> `short` -> `int` -> `long` -> `float` -> `double`. Narrowing casting (explicit): `double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`, e.g., `int x = (int) 3.14;`" },
      { heading: "Variables Scope", body: "Local variables are declared inside methods and must be initialized before use. Instance variables are declared in a class and have default values." },
      { heading: "Constants", body: "Use the `final` keyword. A `final` variable's value cannot be changed once assigned: `final double PI = 3.14159;`" }
    ],
    code: `public class DataVariables {\n    public static void main(String[] args) {\n        int age = 22;\n        double gpa = 3.85;\n        char initial = 'J';\n        boolean isEnrolled = true;\n        final int MAX_CREDITS = 18;\n\n        System.out.println("Age: " + age);\n        System.out.println("GPA: " + gpa);\n        System.out.println("Initial: " + initial);\n        System.out.println("Enrolled: " + isEnrolled);\n    }\n}`
  },
  io: {
    title: "Input & Output",
    description: "Java provides standard stream variables System.out and System.in for output and input. The Scanner class is used to read formatted user input.",
    points: [
      { heading: "System.out methods", body: "`println()` prints data with a newline. `print()` prints data without a newline. `printf()` provides formatted output (e.g., `%d`, `%s`)." },
      { heading: "Reading Input with Scanner", body: "Import `java.util.Scanner`. Initialize with: `Scanner scanner = new Scanner(System.in);`. Always close the scanner when done." },
      { heading: "Reading Primitive values", body: "Use `nextInt()` for integers, `nextDouble()` for doubles, `nextBoolean()` for booleans, and `next()` for single words." },
      { heading: "Reading Strings", body: "Use `nextLine()` to read an entire line of text. Be careful: call `nextLine()` to clear the buffer if reading a line after `nextInt()`." },
      { heading: "Format Specifiers", body: "Use `System.out.printf(\"Total: %.2f\", total);` for decimals, `%s` for strings, `%d` for integers, and `%n` for a platform-independent newline." },
      { heading: "System.err", body: "`System.err` is the standard error stream. Output is typically colored red in IDE consoles to denote error logs." }
    ],
    code: `import java.util.Scanner;\n\npublic class InputOutput {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        System.out.print("Enter name: ");\n        String name = scanner.nextLine();\n\n        System.out.print("Enter age: ");\n        int age = scanner.nextInt();\n\n        System.out.printf("Hello, %s! Next year you will be %d.%n", name, age + 1);\n        scanner.close();\n    }\n}`
  },
  operators: {
    title: "Operators & Expressions",
    description: "Operators perform operations on variables and values. Java provides arithmetic, relational, logical, assignment, bitwise, and conditional operators.",
    points: [
      { heading: "Arithmetic Operators", body: "`+`, `-`, `*`, `/`, `%` (modulus). Division on integers discards remainder (e.g., `5 / 2 = 2`). Modulus returns the remainder (e.g., `5 % 2 = 1`)." },
      { heading: "Relational & Logical Operators", body: "`==`, `!=`, `<`, `>`, `<=`, `>=` evaluate to boolean values. Logical `&&` (AND), `||` (OR), and `!` (NOT) are used to combine conditions." },
      { heading: "Short-Circuit Evaluation", body: "`&&` and `||` evaluate operands left-to-right. If the first operand determines the result (e.g., false in `&&`), the second is skipped." },
      { heading: "Unary Operators", body: "`++` and `--` increment/decrement by 1. Post-increment (`x++`) returns the value first, then increments. Pre-increment (`++x`) increments first." },
      { heading: "String Concatenation", body: "The `+` operator concatenates strings. If one operand is a `String` and the other is a primitive, the primitive is converted to a `String`." },
      { heading: "Ternary Operator", body: "`condition ? value_if_true : value_if_false` is a compact single-line if-else assignment." }
    ],
    code: `public class Operators {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 4;\n        System.out.println("Quotient: " + (a / b));\n        System.out.println("Remainder: " + (a % b));\n\n        int x = 5;\n        System.out.println("Post-increment: " + x++); // prints 5\n        System.out.println("Current x: " + x);         // prints 6\n\n        String result = (a > b) ? "Greater" : "Lesser";\n        System.out.println("Ternary: " + result);\n    }\n}`
  },
  "control-flow": {
    title: "Control Flow",
    description: "Control flow statements let programs make choices. Java uses if, else if, else, switch, and modern switch expressions to branch logic.",
    points: [
      { heading: "if / else if / else", body: "Evaluates boolean conditions. If a condition matches, its block runs and the remaining branches are skipped." },
      { heading: "Comparing Reference Types", body: "Always use `.equals()` to compare object content (like `String`s). Do not use `==`, as it compares memory references instead of actual text values." },
      { heading: "Traditional switch", body: "Tests a variable against constant case values. Requires a `break` statement to prevent falling through to the next case." },
      { heading: "Switch Expressions (Java 12+)", body: "Uses arrows (`->`) instead of colons, supports returning a value directly, and eliminates the need for `break` statements." },
      { heading: "Variable Scope in Blocks", body: "Variables declared inside an `if`/`else` or `switch` block are local to that block and cannot be accessed outside." },
      { heading: "Condition Types", body: "Unlike C, Java conditions must evaluate strictly to a `boolean` (`true`/`false`). Integer values like `0` or `1` are not treated as booleans." }
    ],
    code: `public class ControlFlow {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println("Grade: A");\n        } else if (score >= 75) {\n            System.out.println("Grade: B");\n        } else {\n            System.out.println("Grade: F");\n        }\n\n        String day = "MON";\n        String type = switch (day) {\n            case "SAT", "SUN" -> "Weekend";\n            default -> "Weekday";\n        };\n        System.out.println(day + " is a " + type);\n    }\n}`
  },
  loops: {
    title: "Loops: for, while & do-while",
    description: "Loops repeat blocks of code. Java offers standard counter-controlled loops, pre-condition while loops, post-condition do-while loops, and enhanced for-loops.",
    points: [
      { heading: "for loop", body: "`for (int i = 0; i < n; i++) {` \n`    // loop body` \n`}`\n\nUsed when the number of iterations is known before entering the loop." },
      { heading: "while loop", body: "`while (condition) {` \n`    // loop body` \n`}`\n\nRepeats execution while the condition is true. The condition is tested before entering the loop." },
      { heading: "do-while loop", body: "`do {` \n`    // loop body` \n`} while (condition);` \n\nRuns the loop body <u>at least once</u>, testing the condition at the end of the block." },
      { heading: "break & continue", body: "`break` immediately exits the current loop. `continue` skips the rest of the current iteration and goes to the next update." },
      { heading: "Enhanced for loop (for-each)", body: "`for (Type item : collection) {` \n`    // loop body` \n`}`\n\nSimplified syntax used to iterate sequentially over arrays or collection frameworks." },
      { heading: "Infinite loops", body: "`while (true)` runs forever unless a `break` statement is executed inside the body." }
    ],
    code: `public class Loops {\n    public static void main(String[] args) {\n        // for loop\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + " ");\n        }\n        System.out.println();\n\n        // enhanced for loop\n        int[] numbers = {10, 20, 30};\n        for (int num : numbers) {\n            System.out.println("Value: " + num);\n        }\n    }\n}`
  },
  functions: {
    title: "Methods",
    description: "Methods (functions in OOP) are blocks of code that run when called. They are used to modularize, write reusable logic, and define behavior inside classes.",
    points: [
      { heading: "Method Signature", body: "Consists of the method name and parameter list. Access modifiers (like `public`) and return type (or `void`) are declared first." },
      { heading: "Static vs Instance Methods", body: "`static` methods belong to the class and are called directly: `ClassName.method()`. Instance methods require an object to be called." },
      { heading: "Pass by Value", body: "Java passes all arguments <u>by value</u>. For objects, the 'value' passed is the memory reference copy, so properties can be modified." },
      { heading: "Return Statement", body: "Sends a value back to the caller. `void` methods return no value and can use a blank `return;` to exit early." },
      { heading: "Method Overloading", body: "Declaring multiple methods in the same class with the same name but different parameters (number, types, or order)." },
      { heading: "Recursion", body: "A method calling itself. Must contain a <u>base case</u> to terminate execution and prevent `StackOverflowError`." }
    ],
    code: `public class Methods {\n    // Static helper method\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n\n    // Overloaded method\n    public static double multiply(double a, double b) {\n        return a * b;\n    }\n\n    public static void main(String[] args) {\n        int res1 = multiply(5, 10);\n        double res2 = multiply(2.5, 4.0);\n        System.out.println("Res 1: " + res1);\n        System.out.println("Res 2: " + res2);\n    }\n}`
  },
  arrays: {
    title: "Arrays",
    description: "An array is an object that holds a fixed number of values of a single data type. Arrays in Java are zero-indexed and reside on the heap.",
    points: [
      { heading: "Declaring & Instantiating", body: "`int[] nums = new int[5];` creates an empty array of size 5. Or declare with values: `int[] nums = {1, 2, 3, 4, 5};`." },
      { heading: "Accessing elements", body: "Use square brackets: `nums[0]` is the first element, `nums[nums.length - 1]` is the last element." },
      { heading: "Array Length", body: "Use the `.length` property to find size (e.g., `nums.length`). Unlike `String`s, arrays use a property, not a method." },
      { heading: "Multidimensional Arrays", body: "Arrays of arrays. Declare a 2D grid: `int[][] matrix = new int[3][3];`. Access elements via `matrix[row][col]`." },
      { heading: "Default values", body: "Newly allocated numeric arrays are initialized to `0`. `boolean` arrays default to `false`. Object arrays default to `null`." },
      { heading: "ArrayIndexOutOfBoundsException", body: "Thrown at runtime if you attempt to access an index less than 0 or greater than or equal to the array length." }
    ],
    code: `public class ArraysExample {\n    public static void main(String[] args) {\n        int[] values = {10, 20, 30, 40};\n        \n        System.out.println("Length: " + values.length);\n        for (int i = 0; i < values.length; i++) {\n            System.out.printf("Index %d: %d%n", i, values[i]);\n        }\n\n        int[][] grid = {{1, 2}, {3, 4}};\n        System.out.println("Grid[1][0]: " + grid[1][0]);\n    }\n}`
  },
  strings: {
    title: "Strings",
    description: "In Java, a String is an object that represents a sequence of characters. Strings are immutable, meaning their content cannot be modified once created.",
    points: [
      { heading: "Immutability", body: "`String` operations (like concat or replace) do not modify the original string; instead, they return a new `String` object." },
      { heading: "Comparing Strings", body: "Always use `.equals()` for content comparison. `==` checks if two variables point to the same memory reference." },
      { heading: "Common Methods", body: "`length()` returns character count; `charAt(index)` gets character; `substring(start, end)` extracts parts; `toLowerCase()` converts case." },
      { heading: "String Pool", body: "Java optimizes memory by storing literal strings in a pool. Literal declarations (e.g. `\"Hi\"`) share pool references." },
      { heading: "Concatenation", body: "Use `+` operator or `concat()`. Under the hood, Java uses `StringBuilder` to optimize repetitive literal concatenations." },
      { heading: "StringBuilder & StringBuffer", body: "Mutable character sequences. Use `StringBuilder` for heavy string manipulations inside single-threaded applications." }
    ],
    code: `public class StringsExample {\n    public static void main(String[] args) {\n        String str = "Java Programming";\n        System.out.println("Length: " + str.length());\n        System.out.println("Char at index 5: " + str.charAt(5));\n        System.out.println("Substring: " + str.substring(0, 4));\n\n        String s1 = new String("Hello");\n        String s2 = new String("Hello");\n        System.out.println("s1 == s2: " + (s1 == s2));       // false\n        System.out.println("s1.equals(s2): " + s1.equals(s2)); // true\n    }\n}`
  },
  pointers: {
    title: "Classes & Objects",
    description: "Java is an object-oriented language. A class is a blueprint, and an object is an instance of a class that contains state (fields) and behavior (methods).",
    points: [
      { heading: "Declaring a Class", body: "A class defines the template. Instance variables hold state, constructors initialize state, and methods define actions." },
      { heading: "Instantiation", body: "Create an object using the `new` keyword: `Car myCar = new Car();`. This allocates object memory on the heap." },
      { heading: "Constructors", body: "Special methods called during object creation. They have no return type and share the exact name of the class." },
      { heading: "The 'this' Keyword", body: "Refers to the current object instance. Typically used to distinguish instance variables from local parameter names." },
      { heading: "Access Modifiers", body: "Control visibility: `public` (anywhere), `private` (class only), `protected` (package/subclass), `default` (package only)." },
      { heading: "Getters & Setters", body: "Provide controlled access to private instance fields, enforcing <u>encapsulation</u> best practices." }
    ],
    code: `public class User {\n    private String name;\n    private int age;\n\n    // Constructor\n    public User(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    // Getter\n    public String getName() {\n        return name;\n    }\n\n    public static void main(String[] args) {\n        User user = new User("Bob", 25);\n        System.out.println("User Name: " + user.getName());\n    }\n}`
  },
  structures: {
    title: "OOP Principles",
    description: "Object-Oriented Programming relies on four main pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction to manage complexity.",
    points: [
      { heading: "Inheritance", body: "Allows a class (subclass) to inherit fields and methods from another (superclass) using the `extends` keyword." },
      { heading: "Polymorphism", body: "Allows objects to take many forms. Method Overriding lets a subclass provide a custom implementation of an inherited method using `@Override`." },
      { heading: "Encapsulation", body: "Restricting direct access to object state. Fields are declared `private`, and exposed through public getters and setters." },
      { heading: "Abstraction & Interfaces", body: "Abstract classes/methods hide implementation details. Interfaces define contracts using abstract methods and default implementations using `implements`." },
      { heading: "The 'super' Keyword", body: "Used to call superclass constructors or superclass overridden methods from a subclass." },
      { heading: "Final Classes & Methods", body: "A `final` class cannot be inherited (`extended`). A `final` method cannot be overridden by subclasses." }
    ],
    code: `// Interface\ninterface Animal {\n    void makeSound();\n}\n\n// Subclass implementing interface\nclass Dog implements Animal {\n    @Override\n    public void makeSound() {\n        System.out.println("Woof");\n    }\n}\n\npublic class OOP {\n    public static void main(String[] args) {\n        Animal myDog = new Dog();\n        myDog.makeSound(); // Polymorphism\n    }\n}`
  },
  "file-handling": {
    title: "Exception Handling",
    description: "Exceptions are events that disrupt the normal flow of instructions. Java handles exceptions using try, catch, finally, throw, and throws keywords.",
    points: [
      { heading: "Try-Catch Blocks", body: "Place error-prone code in the `try` block. If an exception occurs, execution transfers to the `catch` block." },
      { heading: "Finally Block", body: "Code that <u>always executes</u> after try-catch, regardless of whether an exception was thrown. Used to release files or resources." },
      { heading: "Checked vs Unchecked", body: "Checked (compile-time) exceptions must be caught or declared. Unchecked (runtime) exceptions represent programming bugs." },
      { heading: "Throwing Exceptions", body: "Use the `throw` keyword to explicitly raise an exception in code (e.g., `throw new IllegalArgumentException();`)." },
      { heading: "Throws Clause", body: "Declared in method signatures to list the checked exceptions a method might propagate to its callers using `throws`." },
      { heading: "Multiple Catches", body: "Catch specific exceptions first (e.g., `NullPointerException`) before catching generic `Exception` objects to prevent swallowing bugs." }
    ],
    code: `public class ExceptionsExample {\n    public static void main(String[] args) {\n        try {\n            int[] arr = {1, 2};\n            System.out.println(arr[5]); // throws exception\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("Handled index error: " + e.getMessage());\n        } finally {\n            System.out.println("Execution cleanup completed.");\n        }\n    }\n}`
  },
  memory: {
    title: "Collections",
    description: "The Java Collections Framework provides an architecture to store and manipulate groups of objects. It includes lists, sets, and maps.",
    points: [
      { heading: "ArrayList", body: "A resizable array implementation of the `List` interface. Elements can be dynamically added, accessed, and removed." },
      { heading: "HashMap", body: "A map implementation that stores key-value pairs. Offers constant-time `O(1)` performance for insert and lookup operations." },
      { heading: "Generics", body: "Specify the type of objects collections store (e.g. `ArrayList<String>`). Prevents typecast errors at runtime." },
      { heading: "Wrapper Classes", body: "Primitives cannot be stored in collections. Java autoboxes primitives into Wrapper objects (e.g., `int` -> `Integer`)." },
      { heading: "HashSet", body: "A collection that stores unique elements only. Backed by a `HashMap`, duplicate element insertions are ignored." },
      { heading: "Iterating Collections", body: "Use an enhanced `for` loop, `Iterator` class, or Lambda expressions (`.forEach()`) to traverse collection elements." }
    ],
    code: `import java.util.ArrayList;\nimport java.util.HashMap;\n\npublic class CollectionsExample {\n    public static void main(String[] args) {\n        // ArrayList\n        ArrayList<String> list = new ArrayList<>();\n        list.add("Java");\n        list.add("C++");\n        System.out.println("List: " + list);\n\n        // HashMap\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put("Java", 1);\n        map.put("Python", 2);\n        System.out.println("Java Rank: " + map.get("Java"));\n    }\n}`
  },
  multithreading: {
    title: "Concurrency & Shared Data",
    description: "Multithreading is a Java feature that allows concurrent execution of two or more parts of a program to make maximum use of the CPU.",
    points: [
      { heading: "Creating a Thread", body: "Two ways: (1) Extend the `Thread` class and override `run()`, or (2) Implement the `Runnable` interface and pass it to a new Thread instance (preferred)." },
      { heading: "Thread Lifecycle", body: "Threads can be in states: `New`, `Runnable`, `Blocked`, `Waiting`, `Timed Waiting`, or `Terminated`. Use `thread.start()` to begin execution." },
      { heading: "Concurrency & Shared Data", body: "When multiple threads access shared resources, race conditions can occur. Use the `synchronized` keyword or Locks to ensure thread-safety." },
      { heading: "Thread Methods", body: "`Thread.sleep(ms)` pauses execution. `thread.join()` waits for a thread to die. `Thread.currentThread()` retrieves the active thread." },
      { heading: "Volatile Keyword", body: "Ensures changes to a variable are immediately visible to all threads, preventing local caching of shared variables using `volatile`." },
      { heading: "Thread Pool & ExecutorService", body: "Reuses threads from a pool instead of creating new ones for every task, improving performance in concurrent applications." }
    ],
    code: `class MyThread extends Thread {\n    public void run() {\n        System.out.println("Thread running: " + Thread.currentThread().getName());\n    }\n}\n\npublic class Concurrency {\n    public static void main(String[] args) {\n        MyThread t1 = new MyThread();\n        t1.start(); // Start thread execution\n    }\n}`
  },
  java8: {
    title: "Streams & Lambdas",
    description: "Java 8 introduced functional programming features that allow writing concise, declarative code. The core elements are Lambda Expressions, Functional Interfaces, and the Streams API.",
    points: [
      { heading: "Lambda Expressions", body: "An anonymous method with syntax: `(parameters) -> { body }`. Useful for writing inline implementations of single-method interfaces." },
      { heading: "Functional Interfaces", body: "Interfaces with exactly one abstract method (e.g., `Runnable`, `Comparator`). Annotate with `@FunctionalInterface` for compiler checks." },
      { heading: "Streams API Overview", body: "Allows sequence of elements to be processed in pipeline. Streams do not modify the original data source; they process elements on the fly." },
      { heading: "Intermediate Operations", body: "Transform a stream into another stream (lazy evaluation). Common operations: `filter()`, `map()`, `sorted()`, `distinct()`." },
      { heading: "Terminal Operations", body: "Produce a result or side-effect and close the stream. Common operations: `collect()`, `forEach()`, `count()`, `reduce()`." },
      { heading: "Method References", body: "Double colon syntax (`Class::method`) used as a shorthand writeup for simple lambda expressions calling existing methods." }
    ],
    code: `import java.util.Arrays;\nimport java.util.List;\n\npublic class StreamsExample {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");\n        \n        // Filter names starting with 'A' and print\n        names.stream()\n             .filter(name -> name.startsWith("A"))\n             .forEach(System.out::println);\n    }\n}`
  }
};

export const MCQ: Record<string, MCQQuestion[]> = {
  basics: [
    { q: "Who created Java and when?", options: ["Dennis Ritchie in 1972", "James Gosling in 1995", "Bjarne Stroustrup in 1985", "Guido van Rossum in 1991"], ans: 1, explanation: "James Gosling created Java at Sun Microsystems in 1995." },
    { q: "What does the JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Java Verified Mechanism", "Java Value Mapping"], ans: 0, explanation: "JVM stands for Java Virtual Machine, which runs Java bytecode on host operating systems." },
    { q: "Which tool compiled Main.java to Main.class?", options: ["java", "jvm", "javac", "jar"], ans: 2, explanation: "javac is the Java compiler tool used to compile source files to bytecode class files." },
    { q: "Which signature represents the standard Java entry point method?", options: ["public void main(String[] args)", "public static void main(String[] args)", "static void main(String args)", "public static int main(String[] args)"], ans: 1, explanation: "The standard entry point signature is public static void main(String[] args)." }
  ],
  variables: [
    { q: "Which is NOT a primitive data type in Java?", options: ["int", "double", "String", "boolean"], ans: 2, explanation: "String is a class in Java (reference type), not a primitive." },
    { q: "How many bytes does an int data type use in Java?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], ans: 2, explanation: "An int primitive is fixed at 32-bits (4 bytes) in Java across all platforms." },
    { q: "Which keyword declares a variable whose value cannot be reassigned?", options: ["const", "final", "static", "void"], ans: 1, explanation: "The final keyword declares a constant variable in Java." },
    { q: "Which type conversion represents narrow (explicit) casting?", options: ["int to long", "float to double", "double to int", "byte to int"], ans: 2, explanation: "Converting from double (larger) to int (smaller) requires explicit narrowing cast: (int)." }
  ],
  io: [
    { q: "Which class is commonly used to read input from the console?", options: ["Reader", "Scanner", "System.in", "Console"], ans: 1, explanation: "java.util.Scanner is the utility class used to read user input values." },
    { q: "Which method in Scanner reads an entire line of text?", options: ["next()", "read()", "nextLine()", "nextString()"], ans: 2, explanation: "nextLine() reads text until a newline character is encountered." },
    { q: "What is the difference between print() and println()?", options: ["println() requires arguments", "println() appends a newline at the end", "print() works with integers only", "println() writes to error stream"], ans: 1, explanation: "println() appends a newline character to the end of the printed text." },
    { q: "Which format specifier outputs a decimal value with exactly 2 decimal places?", options: ["%d", "%.2d", "%.2f", "%f.2"], ans: 2, explanation: "%.2f formats a floating-point number to two decimal places." }
  ],
  operators: [
    { q: "What is the result of 5 / 2 in Java?", options: ["2.5", "2", "3", "0"], ans: 1, explanation: "Integer division discards any decimal remainder, evaluating to 2." },
    { q: "What is the modulus operator (%) used for?", options: ["Percentage math", "Dividing floats", "Calculating division remainder", "Pointer math"], ans: 2, explanation: "The modulus operator computes the remainder after division." },
    { q: "What does short-circuit evaluation of logical AND (&&) mean?", options: ["Both sides are evaluated concurrently", "If the left side is false, the right side is skipped", "If the left side is true, the right side is skipped", "It throws an exception"], ans: 1, explanation: "In &&, if the left operand is false, the expression is guaranteed false, so the right side is not run." },
    { q: "Which operator is the ternary conditional?", options: ["??", "::", "? :", "->"], ans: 2, explanation: "? : is the ternary operator used for inline conditional assignments." }
  ],
  "control-flow": [
    { q: "How must a condition inside an if statement evaluate in Java?", options: ["To any integer (0 or 1)", "Strictly to a boolean (true or false)", "To a string object", "To any numeric value"], ans: 1, explanation: "Java requires conditions to evaluate strictly to a boolean value." },
    { q: "Which keyword stops execution fall-through in case statements?", options: ["stop", "continue", "break", "exit"], ans: 2, explanation: "The break keyword exits the switch block, preventing fall-through." },
    { q: "How do you compare the content of two String variables for equality?", options: ["s1 == s2", "s1.equals(s2)", "s1 === s2", "compare(s1, s2)"], ans: 1, explanation: ".equals() checks content equality. == checks memory reference equality." },
    { q: "Which operator replaces colons in modern Java switch expressions?", options: ["->", "=>", "::", ":"], ans: 0, explanation: "Modern switch expressions (Java 12+) use the arrow operator (->)." }
  ],
  loops: [
    { q: "Which loop evaluates its condition after running the body?", options: ["for", "while", "do-while", "for-each"], ans: 2, explanation: "The do-while loop evaluates its condition after executing the body, running at least once." },
    { q: "What does the continue statement do in a loop?", options: ["Exits the loop", "Restarts the program", "Skips to the next iteration", "Pauses execution"], ans: 2, explanation: "continue skips the remainder of the current iteration block." },
    { q: "What is the enhanced for loop syntax used for?", options: ["Infinite looping", "Iterating arrays or collections sequentially", "Pre-testing conditions", "Throwing exceptions"], ans: 1, explanation: "The enhanced for loop (for-each) provides a clean way to iterate over arrays and collections." },
    { q: "What represents a standard infinite loop in Java?", options: ["while(1)", "while(true)", "for(true)", "do while(0)"], ans: 1, explanation: "while(true) creates an infinite loop since Java conditions must be booleans." }
  ],
  functions: [
    { q: "What belongs to a class and doesn't require creating an object?", options: ["Instance method", "Constructor", "Static method", "Field modifier"], ans: 2, explanation: "Static methods belong to the class and are called without class instances." },
    { q: "What is method overloading?", options: ["Overriding parent class methods", "Declaring methods with same name but different parameters", "Running out of call stack space", "Declaring final methods"], ans: 1, explanation: "Method overloading means sharing the method name with unique parameter signatures." },
    { q: "How does Java pass parameters to methods?", options: ["By reference", "By value", "Depends on type", "By constant reference"], ans: 1, explanation: "Java passes all arguments strictly by value (copying reference variables or primitives)." },
    { q: "Which exception occurs when recursive calls overflow stack memory?", options: ["OutOfMemoryError", "StackOverflowError", "RecursionException", "NullPointerException"], ans: 1, explanation: "Too many nested stack frames result in a StackOverflowError." }
  ],
  arrays: [
    { q: "Which is the index of the first element in a Java array?", options: ["1", "0", "-1", "null"], ans: 1, explanation: "Java arrays use zero-based indexing, starting at 0." },
    { q: "How do you find the size of a Java array named data?", options: ["data.size()", "data.length()", "data.length", "data.count"], ans: 2, explanation: "Arrays use the read-only .length field property to expose their sizes." },
    { q: "Which exception is thrown if you access index -1?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "ArrayStoreException", "IllegalArgumentException"], ans: 1, explanation: "Out-of-bounds array access throws an ArrayIndexOutOfBoundsException." },
    { q: "What is the default value of boolean array elements?", options: ["true", "false", "null", "0"], ans: 1, explanation: "Newly allocated boolean arrays are initialized with false by default." }
  ],
  strings: [
    { q: "What does string immutability mean?", options: ["String content cannot be changed once created", "String objects cannot be assigned to variables", "String values cannot be compared", "String pool is read-only"], ans: 0, explanation: "String immutability means modifying operations return new String objects instead of altering the original memory." },
    { q: "Which method extracts a subset of characters from a String?", options: ["slice()", "split()", "substring()", "charAt()"], ans: 2, explanation: "substring() extracts character ranges from strings." },
    { q: "Which class is optimized for thread-safe mutable string operations?", options: ["StringBuilder", "StringBuffer", "StringJoiner", "StringTokenizer"], ans: 1, explanation: "StringBuffer is synchronized and thread-safe, unlike StringBuilder." },
    { q: "Where does Java store string literals for memory reuse?", options: ["Stack pool", "Heap registers", "String constant pool", "JVM stack"], ans: 2, explanation: "String literals are stored in the String Constant Pool in the heap." }
  ],
  pointers: [
    { q: "Which keyword initializes a new object instance on the heap?", options: ["class", "this", "new", "null"], ans: 2, explanation: "The new keyword allocates heap memory and calls the class constructor." },
    { q: "What is a constructor?", options: ["A class builder tool", "A method called during object initialization", "An interface contract", "A garbage collector"], ans: 1, explanation: "Constructors are invoked during object creation to initialize fields." },
    { q: "What does the 'this' keyword reference?", options: ["The parent class instance", "The current class blueprint", "The current object instance", "The garbage collector"], ans: 2, explanation: "'this' refers to the active object instance executing the method." },
    { q: "Which access modifier restricts visibility to the declaring class only?", options: ["public", "protected", "private", "default"], ans: 2, explanation: "private elements are accessible only within the declaring class itself." }
  ],
  structures: [
    { q: "Which keyword establishes inheritance in Java?", options: ["implements", "inherits", "extends", "super"], ans: 2, explanation: "Java subclasses extend a superclass using the 'extends' keyword." },
    { q: "Which keyword references parent class variables or constructors?", options: ["super", "this", "parent", "base"], ans: 0, explanation: "The super keyword is used to access superclass constructors and overridden methods." },
    { q: "What is method overriding?", options: ["Writing overloaded methods", "Providing a custom implementation of an inherited parent method", "Declaring abstract methods", "Calling super constructors"], ans: 1, explanation: "Overriding replaces an inherited method with custom behavior in a subclass." },
    { q: "What is an interface in Java?", options: ["A GUI visual tool", "A class template containing abstract methods to be implemented", "A final class", "A type of constructor"], ans: 1, explanation: "An interface defines public behaviors that implementing classes must define." }
  ],
  "file-handling": [
    { q: "Which block contains code that always executes after try-catch?", options: ["final", "finally", "catch-all", "finish"], ans: 1, explanation: "The finally block is guaranteed to execute, even if an exception occurs or a return statement is hit." },
    { q: "Which keyword declares that a method throws checked exceptions?", options: ["throw", "throws", "try", "catch"], ans: 1, explanation: "The throws keyword lists checked exceptions a method propagates to its caller." },
    { q: "What represents an unchecked runtime exception?", options: ["IOException", "SQLException", "NullPointerException", "ClassNotFoundException"], ans: 2, explanation: "NullPointerException extends RuntimeException and is unchecked at compile-time." },
    { q: "Which keyword explicitly raises an exception in code?", options: ["throw", "throws", "raise", "new"], ans: 0, explanation: "The throw keyword is used to explicitly instantiate and raise an exception." }
  ],
  memory: [
    { q: "What is an ArrayList in Java?", options: ["A fixed-size array", "A resizable array class that implements List", "A linked node structure", "A map of key-value pairs"], ans: 1, explanation: "ArrayList is a dynamic resizable array class that implements the List interface." },
    { q: "Which collection stores unique items only?", options: ["ArrayList", "HashMap", "HashSet", "LinkedList"], ans: 2, explanation: "A HashSet stores unique items, filtering out duplicate values." },
    { q: "What is autoboxing in Java collections?", options: ["Auto-resizing list arrays", "Automatic conversion of primitives to their wrapper classes", "Compressing objects into archives", "Garbage collection of references"], ans: 1, explanation: "Autoboxing converts primitives (int) to their object wrapper equivalents (Integer) automatically." },
    { q: "What is the key benefit of specifying generics (e.g. ArrayList<String>)?", options: ["Increases execution speed", "Enforces compile-time type-safety without explicit casting", "Saves stack memory", "Auto-serializes list data"], ans: 1, explanation: "Generics catch type mismatch bugs at compile-time and remove the need for casting." }
  ],
  multithreading: [
    { q: "Which interface should you implement to make a class runnable by a thread?", options: ["Callable", "Runnable", "Threadable", "Executor"], ans: 1, explanation: "Implementing java.lang.Runnable is the standard way to define a thread task." },
    { q: "How do you start a newly created Thread instance named thread?", options: ["thread.run()", "thread.start()", "thread.execute()", "thread.begin()"], ans: 1, explanation: "thread.start() allocates resources and executes the run() method in a new call stack. Calling run() directly runs it synchronously in the main thread." },
    { q: "Which keyword prevents multiple threads from executing a block of code simultaneously?", options: ["volatile", "synchronized", "transient", "static"], ans: 1, explanation: "synchronized locks class/instance locks, allowing only one thread to execute the block at a time." },
    { q: "What does Thread.sleep(1000) do?", options: ["Suspends thread for 1 second", "Terminates the thread", "Yields thread execution", "Locks the thread"], ans: 0, explanation: "Thread.sleep() pauses the execution of the current thread for the specified milliseconds." }
  ],
  java8: [
    { q: "What is a functional interface?", options: ["An interface with public methods only", "An interface with exactly one abstract method", "An interface with static methods only", "An interface with default fields"], ans: 1, explanation: "A functional interface has exactly one abstract method, making it suitable for lambda expressions." },
    { q: "Which Stream operation is an intermediate operation?", options: ["count()", "collect()", "filter()", "forEach()"], ans: 2, explanation: "filter() is intermediate and lazy. count(), collect(), and forEach() are terminal operations." },
    { q: "What syntax represents a method reference in Java 8?", options: ["Class.method", "Class::method", "Class->method", "Class.method()"], ans: 1, explanation: "Class::method is the method reference syntax introduced in Java 8." },
    { q: "Do Java 8 streams modify the underlying collection?", options: ["Yes, always", "No, they produce a new stream/result without changing source", "Depends on operations", "Only on parallel streams"], ans: 1, explanation: "Streams process data pipelines lazily but do not alter the source collection data structure." }
  ]
};

export const DEBUG: Record<string, DebugExercise> = {
  basics: {
    instructions: "Fix the 3 syntax errors so this Java program compiles and prints 'Hello, World!'",
    buggy: "public Class main {\n    public static void Main(String[] args) {\n        System.out.println(\"Hello, World!\")\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    hints: ["class keyword is lowercase", "The class name must match Main (uppercase M)", "System.out.println requires a semicolon at the end"],
    expectedOutput: "Hello, World!"
  },
  variables: {
    instructions: "Fix the 3 variable type and constant re-assignment errors in this code.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        int age = 22.5;\n        final double PI = 3.14;\n        PI = 3.14159;\n        boolean status = \"true\";\n        System.out.println(age);\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        double age = 22.5;\n        final double PI = 3.14159;\n        boolean status = true;\n        System.out.println(age);\n    }\n}",
    hints: ["An int cannot store decimal values like 22.5 (use double)", "A final variable (PI) cannot be reassigned once initialized", "A boolean accepts literal true/false, not a string \"true\""],
    expectedOutput: "22.5"
  },
  io: {
    instructions: "Fix the 3 errors preventing reading and printing values correctly.",
    buggy: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = Scanner(System.in);\n        int age = scanner.nextString();\n        System.out.printf(\"Age: %s\\n\", age);\n    }\n}",
    fixed: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int age = scanner.nextInt();\n        System.out.printf(\"Age: %d\\n\", age);\n    }\n}",
    hints: ["Instantiate the Scanner using the 'new' keyword", "Use nextInt() to read an integer, not nextString()", "Use %d format specifier for integer types, not %s"],
    expectedOutput: "Age: [input]"
  },
  operators: {
    instructions: "Fix the 3 logical and modulus operator errors in this division check.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        if (y != 0 & x / y > 2) {\n            System.out.println(\"Valid\");\n        }\n        int remainder = x / 2;\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        if (y != 0 && x / y > 2) {\n            System.out.println(\"Valid\");\n        }\n        int remainder = x % 2;\n    }\n}",
    hints: ["Use short-circuit operator && to prevent division by zero", "Change variable 'b' to a declared variable or numeric constant", "Use modulus % to get the remainder instead of division /"],
    expectedOutput: ""
  },
  "control-flow": {
    instructions: "Fix the 3 string comparison and switch syntax bugs in this code.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        String color = \"red\";\n        if (color == \"red\") {\n            System.out.println(\"Stop\");\n        }\n        switch (color) {\n            case \"red\":\n                System.out.println(\"Red\");\n            case \"green\":\n                System.out.println(\"Green\");\n                break;\n        }\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        String color = \"red\";\n        if (color.equals(\"red\")) {\n            System.out.println(\"Stop\");\n        }\n        switch (color) {\n            case \"red\":\n                System.out.println(\"Red\");\n                break;\n            case \"green\":\n                System.out.println(\"Green\");\n                break;\n        }\n    }\n}",
    hints: ["Use .equals() for string content comparison rather than ==", "Add break after the first case block to prevent fall-through", "Ensure all switch branches end with break or yield"],
    expectedOutput: "Stop\nRed"
  },
  loops: {
    instructions: "Fix the 3 bugs in this loop to print numbers from 1 to 5.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i <= 5) {\n            System.out.print(i + \" \")\n            i++\n        }\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 5) {\n            System.out.print(i + \" \");\n            i++;\n        }\n    }\n}",
    hints: ["Initialize index i to 1 to start printing from 1", "The System.out.print statement requires a semicolon", "The counter update i++ requires a semicolon"],
    expectedOutput: "1 2 3 4 5 "
  },
  functions: {
    instructions: "Fix the 3 method declaration and signature bugs in this helper class.",
    buggy: "public class Main {\n    int doubleVal(n) {\n        n * 2;\n    }\n    public static void main(String[] args) {\n        int result = doubleVal(5);\n        System.out.println(result);\n    }\n}",
    fixed: "public class Main {\n    public static int doubleVal(int n) {\n        return n * 2;\n    }\n    public static void main(String[] args) {\n        int result = doubleVal(5);\n        System.out.println(result);\n    }\n}",
    hints: ["The helper method must be declared static to be called inside main()", "Method parameter must have a data type (int n)", "The method must return the result value using the return keyword"],
    expectedOutput: "10"
  },
  arrays: {
    instructions: "Fix the 3 array initialization and loop bounds bugs in this code.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        int nums = {1, 2, 3};\n        int sum = 0;\n        for (int i = 0; i <= nums.length; i++) {\n            sum += nums(i);\n        }\n        System.out.println(sum);\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        int sum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n        }\n        System.out.println(sum);\n    }\n}",
    hints: ["Declare array variables with square brackets int[] nums", "Use < instead of <= to avoid ArrayIndexOutOfBoundsException", "Access array elements using square brackets nums[i] instead of parentheses"],
    expectedOutput: "6"
  },
  strings: {
    instructions: "Fix the 3 string methods and length property bugs.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        int size = text.length;\n        char letter = text.charAt[1];\n        String upper = text.upper();\n        System.out.println(upper);\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        int size = text.length();\n        char letter = text.charAt(1);\n        String upper = text.toUpperCase();\n        System.out.println(upper);\n    }\n}",
    hints: ["String length is retrieved using a method call length()", "Use parentheses text.charAt(1) instead of square brackets", "The method to convert string to uppercase is toUpperCase()"],
    expectedOutput: "JAVA"
  },
  pointers: {
    instructions: "Fix the 3 constructor and object instantiation errors in this class.",
    buggy: "public class Dog {\n    private String name;\n    public void Dog(String name) {\n        name = name;\n    }\n    public static void main(String[] args) {\n        Dog d = Dog(\"Rex\");\n    }\n}",
    fixed: "public class Dog {\n    private String name;\n    public Dog(String name) {\n        this.name = name;\n    }\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Rex\");\n    }\n}",
    hints: ["Constructors have no return type — remove void", "Use this.name to assign the constructor parameter to the instance field", "Instantiate the object using the 'new' keyword"],
    expectedOutput: ""
  },
  structures: {
    instructions: "Fix the 3 inheritance and interface implementation bugs in this class.",
    buggy: "interface Flyer {\n    void fly();\n}\nclass Bird implements Flyer {\n    public void fly() {\n        System.out.println(\"Flying\");\n    }\n}\npublic class Eagle extends Bird implements Flyer {\n    void fly() {\n        super.fly();\n    }\n}",
    fixed: "interface Flyer {\n    void fly();\n}\nclass Bird implements Flyer {\n    public void fly() {\n        System.out.println(\"Flying\");\n    }\n}\npublic class Eagle extends Bird {\n    public void fly() {\n        super.fly();\n    }\n}",
    hints: ["Eagle already inherits Flyer implementation from Bird — remove implements Flyer", "Overridden methods in Eagle must retain public visibility", "Verify super.fly() is called correctly inside the overridden method"],
    expectedOutput: ""
  },
  "file-handling": {
    instructions: "Fix the 3 exception handling blocks and try-catch syntax bugs.",
    buggy: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } finally {\n            System.out.println(\"Final\");\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error\");\n        }\n    }\n}",
    fixed: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error\");\n        } finally {\n            System.out.println(\"Final\");\n        }\n    }\n}",
    hints: ["The catch block must precede the finally block", "Verify catch brackets and parentheses match", "Ensure division-by-zero exception is caught correctly"],
    expectedOutput: "Error\nFinal"
  },
  memory: {
    instructions: "Fix the 3 collection ArrayList and primitive storage errors in this method.",
    buggy: "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<int> list = new ArrayList<int>();\n        list.add(10);\n        int val = list.get[0];\n        System.out.println(val);\n    }\n}",
    fixed: "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(10);\n        int val = list.get(0);\n        System.out.println(val);\n    }\n}",
    hints: ["Collections store objects — use wrapper class Integer instead of primitive int", "Retrieve elements from an ArrayList using method get(0), not index brackets", "Ensure all collection packages are imported"],
    expectedOutput: "10"
  },
  multithreading: {
    instructions: "Fix the 3 multithreading and thread class launch bugs.",
    buggy: "class MyTask implements Runnable {\n    public void execute() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyTask task = new MyTask();\n        Thread t = new Thread(task);\n        t.run();\n    }\n}",
    fixed: "class MyTask implements Runnable {\n    public void run() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyTask task = new MyTask();\n        Thread t = new Thread(task);\n        t.start();\n    }\n}",
    hints: ["Runnable interface requires overriding run(), not execute()", "To execute thread concurrently, call start() instead of run()", "Ensure thread tasks implement Runnable or extend Thread"],
    expectedOutput: "Running"
  },
  java8: {
    instructions: "Fix the 3 lambda syntax and streams pipeline compile errors.",
    buggy: "import java.util.Arrays;\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\");\n        list.stream().filter(s -> s = \"A\").forEach(s => System.out.println(s));\n    }\n}",
    fixed: "import java.util.Arrays;\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\");\n        list.stream().filter(s -> s.equals(\"A\")).forEach(s -> System.out.println(s));\n    }\n}",
    hints: ["Inside filter lambda, use s.equals(\"A\") or == for comparisons instead of assignment =", "Java 8 lambdas use arrow -> instead of heavy arrow =>", "Verify stream terminal operations are written correctly"],
    expectedOutput: "A"
  }
};

export const DRAG_DROP: Record<string, DragExercise> = {
  basics: {
    instructions: "Arrange these lines to create a valid Java program that prints Hello.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        System.out.println(\"Hello\");" },
      { id: "d", text: "    }" },
      { id: "e", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e"]
  },
  variables: {
    instructions: "Arrange these lines to declare variables and print their values.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        int x = 5;" },
      { id: "d", text: "        double y = 10.5;" },
      { id: "e", text: "        System.out.println(x + \" \" + y);" },
      { id: "f", text: "    }" },
      { id: "g", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  },
  io: {
    instructions: "Arrange these lines to read an integer from console and print it.",
    lines: [
      { id: "a", text: "import java.util.Scanner;" },
      { id: "b", text: "public class Main {" },
      { id: "c", text: "    public static void main(String[] args) {" },
      { id: "d", text: "        Scanner input = new Scanner(System.in);" },
      { id: "e", text: "        int value = input.nextInt();" },
      { id: "f", text: "        System.out.println(value);" },
      { id: "g", text: "    }" },
      { id: "h", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"]
  },
  operators: {
    instructions: "Arrange these lines to check if x is even using modulus.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        int x = 12;" },
      { id: "d", text: "        boolean isEven = (x % 2 == 0);" },
      { id: "e", text: "        System.out.println(isEven);" },
      { id: "f", text: "    }" },
      { id: "g", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  },
  "control-flow": {
    instructions: "Arrange these lines to create an if-else check.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        int num = 15;" },
      { id: "d", text: "        if (num > 10) {" },
      { id: "e", text: "            System.out.println(\"Large\");" },
      { id: "f", text: "        } else {" },
      { id: "g", text: "            System.out.println(\"Small\");" },
      { id: "h", text: "        }" },
      { id: "i", text: "    }" },
      { id: "j", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
  },
  loops: {
    instructions: "Arrange these lines to write a for loop that runs 3 times.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        for (int i = 0; i < 3; i++) {" },
      { id: "d", text: "            System.out.println(i);" },
      { id: "e", text: "        }" },
      { id: "f", text: "    }" },
      { id: "g", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g"]
  },
  functions: {
    instructions: "Arrange these lines to call a static method that returns a String.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static String greet() {" },
      { id: "c", text: "        return \"Hello\";" },
      { id: "d", text: "    }" },
      { id: "e", text: "    public static void main(String[] args) {" },
      { id: "f", text: "        System.out.println(greet());" },
      { id: "g", text: "    }" },
      { id: "h", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"]
  },
  arrays: {
    instructions: "Arrange these lines to initialize an array and print its first element.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        int[] arr = {10, 20, 30};" },
      { id: "d", text: "        System.out.println(arr[0]);" },
      { id: "e", text: "    }" },
      { id: "f", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  },
  strings: {
    instructions: "Arrange these lines to concatenate two strings in Java.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        String s1 = \"Java\";" },
      { id: "d", text: "        String s2 = \"SE\";" },
      { id: "e", text: "        String s3 = s1 + s2;" },
      { id: "f", text: "        System.out.println(s3);" },
      { id: "g", text: "    }" },
      { id: "h", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h"]
  },
  pointers: {
    instructions: "Arrange these lines to instantiate a User object in Java.",
    lines: [
      { id: "a", text: "class User {" },
      { id: "b", text: "    String name = \"Tom\";" },
      { id: "c", text: "}" },
      { id: "d", text: "public class Main {" },
      { id: "e", text: "    public static void main(String[] args) {" },
      { id: "f", text: "        User u = new User();" },
      { id: "g", text: "        System.out.println(u.name);" },
      { id: "h", text: "    }" },
      { id: "i", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
  },
  structures: {
    instructions: "Arrange these lines to demonstrate inheritance with class Cat.",
    lines: [
      { id: "a", text: "class Animal {}" },
      { id: "b", text: "class Cat extends Animal {" },
      { id: "c", text: "    void meow() {}" },
      { id: "d", text: "}" },
      { id: "e", text: "public class Main {" },
      { id: "f", text: "    public static void main(String[] args) {" },
      { id: "g", text: "        Cat c = new Cat();" },
      { id: "h", text: "        c.meow();" },
      { id: "i", text: "    }" },
      { id: "j", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
  },
  "file-handling": {
    instructions: "Arrange these lines to create a standard try-catch block.",
    lines: [
      { id: "a", text: "public class Main {" },
      { id: "b", text: "    public static void main(String[] args) {" },
      { id: "c", text: "        try {" },
      { id: "d", text: "            int x = 5 / 0;" },
      { id: "e", text: "        } catch (ArithmeticException e) {" },
      { id: "f", text: "            System.out.println(\"Error\");" },
      { id: "g", text: "        }" },
      { id: "h", text: "    }" },
      { id: "i", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
  },
  memory: {
    instructions: "Arrange these lines to add and retrieve an item from an ArrayList.",
    lines: [
      { id: "a", text: "import java.util.ArrayList;" },
      { id: "b", text: "public class Main {" },
      { id: "c", text: "    public static void main(String[] args) {" },
      { id: "d", text: "        ArrayList<String> list = new ArrayList<>();" },
      { id: "e", text: "        list.add(\"Java\");" },
      { id: "f", text: "        String item = list.get(0);" },
      { id: "g", text: "        System.out.println(item);" },
      { id: "h", text: "    }" },
      { id: "i", text: "}" }
    ],
    order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
  },
  multithreading: {
    instructions: "Arrange these lines to create and run a thread using Runnable interface.",
    lines: [
      { id: "a", text: "Runnable r = () -> {" },
      { id: "b", text: "    System.out.println(\"Run\");" },
      { id: "c", text: "};" },
      { id: "d", text: "Thread t = new Thread(r);" },
      { id: "e", text: "t.start();" }
    ],
    order: ["a", "b", "c", "d", "e"]
  },
  java8: {
    instructions: "Arrange these lines to filter a list using Streams API.",
    lines: [
      { id: "a", text: "List<Integer> numbers = Arrays.asList(1, 2, 3);" },
      { id: "b", text: "numbers.stream()" },
      { id: "c", text: "       .filter(n -> n % 2 == 0)" },
      { id: "d", text: "       .forEach(System.out::println);" }
    ],
    order: ["a", "b", "c", "d"]
  }
};

export const COMPLETE_EXERCISES: Record<string, CompleteExercise[]> = {
  basics: [
    { template: `public class Main {\n    public static void ___(String[] args) {\n        System.out.___("Hello");\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}`, blanks: ["main", "println"], instruction: "Fill in the entry method name and the standard output statement." },
  ],
  variables: [
    { template: `public class Main {\n    public static void main(String[] args) {\n        ___ score = 100;\n        ___ name = "Alice";\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        int score = 100;\n        String name = "Alice";\n    }\n}`, blanks: ["int", "String"], instruction: "Fill in the primitive integer type and reference String type." },
  ],
  io: [
    { template: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = ___ Scanner(System.in);\n        int x = scan.___();\n    }\n}`, answer: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int x = scan.nextInt();\n    }\n}`, blanks: ["new", "nextInt"], instruction: "Fill in the instantiation keyword and Scanner method to read integers." },
  ],
  operators: [
    { template: `public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = x ___ 2; // remainder\n        String res = (y == 1) ___ "Odd" : "Even";\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = x % 2; // remainder\n        String res = (y == 1) ? "Odd" : "Even";\n    }\n}`, blanks: ["%", "?"], instruction: "Fill in the remainder operator and ternary condition prefix symbol." },
  ],
  "control-flow": [
    { template: `public class Main {\n    public static void main(String[] args) {\n        String a = "test";\n        if (a.___("test")) {\n            System.out.println("Matches");\n        }\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        String a = "test";\n        if (a.equals("test")) {\n            System.out.println("Matches");\n        }\n    }\n}`, blanks: ["equals"], instruction: "Fill in the method to compare two string contents in Java." },
  ],
  loops: [
    { template: `public class Main {\n    public static void main(String[] args) {\n        ___ (int i = 0; i < 5; i___) {\n            System.out.println(i);\n        }\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);\n        }\n    }\n}`, blanks: ["for", "++"], instruction: "Fill in the loop keyword and increment step expression." },
  ],
  functions: [
    { template: `public class Main {\n    public ___ int add(int a, int b) {\n        ___ a + b;\n    }\n}`, answer: `public class Main {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n}`, blanks: ["static", "return"], instruction: "Fill in static keyword and return keyword inside the method." },
  ],
  arrays: [
    { template: `public class Main {\n    public static void main(String[] args) {\n        int[] values = ___ int[3];\n        int size = values.___;\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        int[] values = new int[3];\n        int size = values.length;\n    }\n}`, blanks: ["new", "length"], instruction: "Fill in array allocation keyword and array size property." },
  ],
  strings: [
    { template: `public class Main {\n    public static void main(String[] args) {\n        String txt = "Java";\n        int len = txt.___();\n        char c = txt.___(0);\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        String txt = "Java";\n        int len = txt.length();\n        char c = txt.charAt(0);\n    }\n}`, blanks: ["length", "charAt"], instruction: "Fill in string length method and character extraction method." },
  ],
  pointers: [
    { template: `public class User {\n    private String name;\n    public User(String name) {\n        ___.name = name;\n    }\n}`, answer: `public class User {\n    private String name;\n    public User(String name) {\n        this.name = name;\n    }\n}`, blanks: ["this"], instruction: "Fill in reference keyword to target the current instance's field." },
  ],
  structures: [
    { template: `class Cat ___ Animal {\n    @___ \n    void makeSound() {\n        System.out.println("Meow");\n    }\n}`, answer: `class Cat extends Animal {\n    @Override \n    void makeSound() {\n        System.out.println("Meow");\n    }\n}`, blanks: ["extends", "Override"], instruction: "Fill in inheritance keyword and overridden method annotation." },
  ],
  "file-handling": [
    { template: `public class Main {\n    public static void main(String[] args) {\n        ___ {\n            int x = 5 / 0;\n        } ___ (ArithmeticException e) {\n            System.out.println("Zero Div");\n        }\n    }\n}`, answer: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 5 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Zero Div");\n        }\n    }\n}`, blanks: ["try", "catch"], instruction: "Fill in standard try-catch block keywords." },
  ],
  memory: [
    { template: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<___> items = new ArrayList<>();\n        items.___("Java");\n    }\n}`, answer: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> items = new ArrayList<>();\n        items.add("Java");\n    }\n}`, blanks: ["String", "add"], instruction: "Fill in element type wrapper and insert method for the ArrayList." },
  ],
  multithreading: [
    { template: `class MyThread extends ___ {\n    public void run() {\n        System.out.println("Running");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyThread t = new MyThread();\n        t.___();\n    }\n}`, answer: `class MyThread extends Thread {\n    public void run() {\n        System.out.println("Running");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyThread t = new MyThread();\n        t.start();\n    }\n}`, blanks: ["Thread", "start"], instruction: "Fill in the base Thread class name and launch method to start the thread." }
  ],
  java8: [
    { template: `import java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = List.of("a", "b");\n        list.___()\n            .filter(s -> s.startsWith("a"))\n            .___((System.out::println));\n    }\n}`, answer: `import java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = List.of("a", "b");\n        list.stream()\n            .filter(s -> s.startsWith("a"))\n            .forEach((System.out::println));\n    }\n}`, blanks: ["stream", "forEach"], instruction: "Fill in the stream source pipeline initialization method and terminal output print method." }
  ]
};

export const CHAPTERS = [
  { id: "basics", label: "01 · Java Basics" },
  { id: "variables", label: "02 · Variables" },
  { id: "io", label: "03 · Input / Output" },
  { id: "operators", label: "04 · Operators" },
  { id: "control-flow", label: "05 · Control Flow" },
  { id: "loops", label: "06 · Loops" },
  { id: "functions", label: "07 · Methods" },
  { id: "arrays", label: "08 · Arrays" },
  { id: "strings", label: "09 · Strings" },
  { id: "pointers", label: "10 · Classes & Objects" },
  { id: "structures", label: "11 · OOP Principles" },
  { id: "file-handling", label: "12 · Exception Handling" },
  { id: "memory", label: "13 · Collections" },
  { id: "multithreading", label: "14 · Multithreading" },
  { id: "java8", label: "15 · Streams & Lambdas" }
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Chapter 15

export const chapter15_CONTENT = {
  "title": "Streams & Lambdas",
  "description": "Java 8 introduced functional programming features that allow writing concise, declarative code. The core elements are Lambda Expressions, Functional Interfaces, and the Streams API.",
  "points": [
    {
      "heading": "Lambda Expressions",
      "body": "An anonymous method with syntax: `(parameters) -> { body }`. Useful for writing inline implementations of single-method interfaces."
    },
    {
      "heading": "Functional Interfaces",
      "body": "Interfaces with exactly one abstract method (e.g., `Runnable`, `Comparator`). Annotate with `@FunctionalInterface` for compiler checks."
    },
    {
      "heading": "Streams API Overview",
      "body": "Allows sequence of elements to be processed in pipeline. Streams do not modify the original data source; they process elements on the fly."
    },
    {
      "heading": "Intermediate Operations",
      "body": "Transform a stream into another stream (lazy evaluation). Common operations: `filter()`, `map()`, `sorted()`, `distinct()`."
    },
    {
      "heading": "Terminal Operations",
      "body": "Produce a result or side-effect and close the stream. Common operations: `collect()`, `forEach()`, `count()`, `reduce()`."
    },
    {
      "heading": "Method References",
      "body": "Double colon syntax (`Class::method`) used as a shorthand writeup for simple lambda expressions calling existing methods."
    }
  ],
  "code": "import java.util.Arrays;\nimport java.util.List;\n\npublic class StreamsExample {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Alice\", \"Bob\", \"Charlie\");\n        \n        // Filter names starting with 'A' and print\n        names.stream()\n             .filter(name -> name.startsWith(\"A\"))\n             .forEach(System.out::println);\n    }\n}"
};

export const chapter15_DEBUG = {
  "instructions": "Fix the 3 lambda syntax and streams pipeline compile errors.",
  "buggy": "import java.util.Arrays;\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\");\n        list.stream().filter(s -> s = \"A\").forEach(s => System.out.println(s));\n    }\n}",
  "fixed": "import java.util.Arrays;\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\");\n        list.stream().filter(s -> s.equals(\"A\")).forEach(s -> System.out.println(s));\n    }\n}",
  "hints": [
    "Inside filter lambda, use s.equals(\"A\") or == for comparisons instead of assignment =",
    "Java 8 lambdas use arrow -> instead of heavy arrow =>",
    "Verify stream terminal operations are written correctly"
  ],
  "expectedOutput": "A"
};

export const chapter15_DRAG_DROP = {
  "instructions": "Arrange these lines to filter a list using Streams API.",
  "lines": [
    {
      "id": "a",
      "text": "List<Integer> numbers = Arrays.asList(1, 2, 3);"
    },
    {
      "id": "b",
      "text": "numbers.stream()"
    },
    {
      "id": "c",
      "text": "       .filter(n -> n % 2 == 0)"
    },
    {
      "id": "d",
      "text": "       .forEach(System.out::println);"
    }
  ],
  "order": [
    "a",
    "b",
    "c",
    "d"
  ]
};

export const chapter15_MCQ = [
  {
    "q": "(GATE CS 2007) Which of the following features is most closely associated with the functional programming paradigm (as enabled in Java 8 via Lambdas)?",
    "options": [
      "State mutability and side effects",
      "Object encapsulation",
      "First-class functions and higher-order functions",
      "Inheritance and polymorphism"
    ],
    "ans": 2,
    "explanation": "Functional programming treats functions as first-class citizens, allowing them to be passed as arguments (higher-order functions), returned from other functions, and assigned to variables (like Java Lambdas)."
  },
  {
    "q": "(GATE CS 2008) In the context of Java Streams, what does \\\"lazy evaluation\\\" mean?",
    "options": [
      "The program executes slower to save CPU",
      "Intermediate operations are not executed until a terminal operation is invoked",
      "Variables are not initialized until they are used",
      "Memory allocation is deferred until garbage collection"
    ],
    "ans": 1,
    "explanation": "Java Streams use lazy evaluation: intermediate operations (like `filter` or `map`) do not process the data immediately. The pipeline is only executed when a terminal operation (like `collect` or `forEach`) is called."
  },
  {
    "q": "(GATE IT 2005) An anonymous function in Java (Lambda Expression) is essentially used to provide an inline implementation for:",
    "options": [
      "Any interface",
      "A class with a single constructor",
      "A Functional Interface (an interface with exactly one abstract method)",
      "An abstract class"
    ],
    "ans": 2,
    "explanation": "Lambda expressions provide a concise way to implement a Functional Interface (e.g., `Runnable`, `Callable`, `Comparator`), which has exactly one abstract method."
  },
  {
    "q": "(GATE CS 2014) Which of the following operations on a Java Stream produces a side-effect rather than a new Stream?",
    "options": [
      "map()",
      "filter()",
      "forEach()",
      "sorted()"
    ],
    "ans": 2,
    "explanation": "`map()`, `filter()`, and `sorted()` are intermediate operations that return a new Stream. `forEach()` is a terminal operation that consumes the stream and produces a side-effect (like printing)."
  },
  {
    "q": "(GATE CS 2011) When a lambda expression accesses a local variable from its enclosing scope, that variable must be:",
    "options": [
      "Static",
      "Volatile",
      "Effectively final (its value is never changed after initialization)",
      "Global"
    ],
    "ans": 2,
    "explanation": "To prevent concurrency issues and state inconsistency, Java requires that any local variable accessed from within a lambda expression must be final or effectively final."
  },
  {
    "q": "(GATE CS 2016) The process of applying a function to each element of a collection and returning a new collection of the results is known as:",
    "options": [
      "Filtering",
      "Mapping",
      "Reducing",
      "Sorting"
    ],
    "ans": 1,
    "explanation": "Mapping (`map()` in Java Streams) transforms each element in a sequence using a provided function, yielding a new sequence of transformed elements."
  },
  {
    "q": "(GATE CS 2019) Which built-in functional interface in Java 8 contains the single abstract method `boolean test(T t)`?",
    "options": [
      "Function<T, R>",
      "Consumer<T>",
      "Supplier<T>",
      "Predicate<T>"
    ],
    "ans": 3,
    "explanation": "The `Predicate` interface represents a boolean-valued function of one argument, often used for filtering data in streams."
  },
  {
    "q": "(GATE IT 2006) What is the main purpose of the `reduce()` terminal operation in Java Streams?",
    "options": [
      "To decrease the size of the stream by deleting elements.",
      "To combine elements of a stream into a single summary result.",
      "To convert a stream into an array.",
      "To sort elements in descending order."
    ],
    "ans": 1,
    "explanation": "`reduce()` repeatedly applies a combining operation (like sum, min, or max) to the elements in the stream, reducing them to a single accumulated value."
  },
  {
    "q": "(GATE CS 2010) Which of the following statements correctly highlights a key difference between Java Streams and Java Collections?",
    "options": [
      "Streams store elements in memory; Collections do not.",
      "Collections process data lazily; Streams process it eagerly.",
      "Streams do not store elements; Collections are in-memory data structures.",
      "Streams can be modified directly; Collections cannot."
    ],
    "ans": 2,
    "explanation": "A Collection is an in-memory data structure that holds elements, while a Stream is an abstraction that processes a pipeline of elements (often from a collection) without storing them."
  },
  {
    "q": "(GATE CS 2013) In a Java Stream pipeline, which type of operation can appear multiple times?",
    "options": [
      "Terminal operations",
      "Short-circuiting operations",
      "Intermediate operations",
      "None of the above"
    ],
    "ans": 2,
    "explanation": "A stream pipeline consists of zero or more intermediate operations (like `filter`, `map`) and exactly one terminal operation (like `collect`, `forEach`)."
  },
  {
    "q": "(GATE IT 2004) What does the double colon (`::`) syntax represent in Java 8?",
    "options": [
      "A static block initialization",
      "A method reference",
      "An anonymous inner class",
      "A lambda expression body"
    ],
    "ans": 1,
    "explanation": "The `::` operator is used for Method References. It provides a shorthand syntax for a lambda expression that simply calls an existing method by name."
  },
  {
    "q": "(GATE CS 2015) If you want to convert the results of a Stream pipeline back into a `List`, which terminal operation should you use?",
    "options": [
      "toList()",
      "collect(Collectors.toList())",
      "asList()",
      "reduceToList()"
    ],
    "ans": 1,
    "explanation": "The `collect()` method is a terminal operation that can accumulate stream elements into a collection, commonly using `Collectors.toList()`."
  },
  {
    "q": "(GATE CS 2005) Which functional interface is primarily used with the `map()` operation in Streams to transform objects?",
    "options": [
      "Predicate",
      "Consumer",
      "Supplier",
      "Function"
    ],
    "ans": 3,
    "explanation": "The `map()` method takes a `Function<T, R>`, which applies a transformation to each element of type `T` and returns a result of type `R`."
  },
  {
    "q": "(GATE CS 2012) Which of the following stream operations is considered 'short-circuiting' (it may not process the entire stream)?",
    "options": [
      "map()",
      "filter()",
      "sorted()",
      "findFirst()"
    ],
    "ans": 3,
    "explanation": "`findFirst()` (and others like `anyMatch()`, `limit()`) is a short-circuiting terminal operation because it can return a result as soon as it finds a matching element, without processing the rest of the stream."
  },
  {
    "q": "(GATE IT 2007) Is a Java Stream object reusable after a terminal operation has been executed on it?",
    "options": [
      "Yes, it resets automatically.",
      "Yes, but only if it's a parallel stream.",
      "No, it throws an IllegalStateException if reused.",
      "No, it silently returns an empty stream."
    ],
    "ans": 2,
    "explanation": "A Stream in Java can only be traversed once. Attempting to execute a second terminal operation on the same stream reference throws an `IllegalStateException`."
  }
];

export const chapter15_COMPLETE_EXERCISES = [];

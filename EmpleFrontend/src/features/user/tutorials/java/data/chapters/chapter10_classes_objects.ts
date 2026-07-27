// Chapter 10

export const chapter10_CONTENT = {
  "title": "Classes & Objects",
  "description": "Java is an object-oriented language. A class is a blueprint, and an object is an instance of a class that contains state (fields) and behavior (methods).",
  "points": [
    {
      "heading": "Declaring a Class",
      "body": "A class defines the template. Instance variables hold state, constructors initialize state, and methods define actions."
    },
    {
      "heading": "Instantiation",
      "body": "Create an object using the `new` keyword: `Car myCar = new Car();`. This allocates object memory on the heap."
    },
    {
      "heading": "Constructors",
      "body": "Special methods called during object creation. They have no return type and share the exact name of the class."
    },
    {
      "heading": "The 'this' Keyword",
      "body": "Refers to the current object instance. Typically used to distinguish instance variables from local parameter names."
    },
    {
      "heading": "Access Modifiers",
      "body": "Control visibility: `public` (anywhere), `private` (class only), `protected` (package/subclass), `default` (package only)."
    },
    {
      "heading": "Getters & Setters",
      "body": "Provide controlled access to private instance fields, enforcing <u>encapsulation</u> best practices."
    }
  ],
  "code": "public class User {\n    private String name;\n    private int age;\n\n    // Constructor\n    public User(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    // Getter\n    public String getName() {\n        return name;\n    }\n\n    public static void main(String[] args) {\n        User user = new User(\"Bob\", 25);\n        System.out.println(\"User Name: \" + user.getName());\n    }\n}"
};

export const chapter10_DEBUG = {
  "instructions": "Fix the 3 constructor and object instantiation errors in this class.",
  "buggy": "public class Dog {\n    private String name;\n    public void Dog(String name) {\n        name = name;\n    }\n    public static void main(String[] args) {\n        Dog d = Dog(\"Rex\");\n    }\n}",
  "fixed": "public class Dog {\n    private String name;\n    public Dog(String name) {\n        this.name = name;\n    }\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Rex\");\n    }\n}",
  "hints": [
    "Constructors have no return type — remove void",
    "Use this.name to assign the constructor parameter to the instance field",
    "Instantiate the object using the 'new' keyword"
  ],
  "expectedOutput": ""
};

export const chapter10_DRAG_DROP = {
  "instructions": "Arrange these lines to instantiate a User object in Java.",
  "lines": [
    {
      "id": "a",
      "text": "class User {"
    },
    {
      "id": "b",
      "text": "    String name = \"Tom\";"
    },
    {
      "id": "c",
      "text": "}"
    },
    {
      "id": "d",
      "text": "public class Main {"
    },
    {
      "id": "e",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "f",
      "text": "        User u = new User();"
    },
    {
      "id": "g",
      "text": "        System.out.println(u.name);"
    },
    {
      "id": "h",
      "text": "    }"
    },
    {
      "id": "i",
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
    "h",
    "i"
  ]
};

export const chapter10_MCQ = [
  {
    "q": "Consider the following Java program (GATE CS 2004):\n```java\nclass Test {\n    int x;\n    Test() { x = 10; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Test t1 = new Test();\n        Test t2 = t1;\n        t2.x = 20;\n        System.out.println(t1.x);\n    }\n}\n```\nWhat is the output?",
    "options": [
      "10",
      "20",
      "Compilation Error",
      "Runtime Exception"
    ],
    "ans": 1,
    "explanation": "In Java, assigning an object reference to another variable (`t2 = t1`) does not copy the object. Both `t1` and `t2` point to the same object on the heap. Thus modifying `t2.x` changes `t1.x` to 20."
  },
  {
    "q": "Consider the following code (GATE IT 2006):\n```java\nclass MyClass {\n    static int count = 0;\n    MyClass() { count++; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyClass obj1 = new MyClass();\n        MyClass obj2 = new MyClass();\n        System.out.println(MyClass.count);\n    }\n}\n```\nWhat gets printed?",
    "options": [
      "0",
      "1",
      "2",
      "Compilation error"
    ],
    "ans": 2,
    "explanation": "The `count` variable is static, meaning it is shared among all instances of `MyClass`. Each creation increments `count` by 1. Since two instances are created, `count` becomes 2."
  },
  {
    "q": "Which of the following is TRUE regarding constructors in Java (GATE CS 2002)?",
    "options": [
      "A constructor can be declared abstract",
      "A constructor must have a return type",
      "Constructors can be overloaded",
      "Constructors are inherited by default"
    ],
    "ans": 2,
    "explanation": "Constructors cannot be abstract, cannot have a return type, and are not inherited. They can, however, be overloaded by having different parameter lists."
  },
  {
    "q": "Consider the following class (GATE CS 2017):\n```java\nclass Parent {\n    Parent() { System.out.print(\"P \"); }\n}\nclass Child extends Parent {\n    Child() { System.out.print(\"C \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n    }\n}\n```\nWhat is the output?",
    "options": [
      "P C",
      "C P",
      "C",
      "P"
    ],
    "ans": 0,
    "explanation": "When an object of a subclass is created, the constructor of the superclass is automatically called first (via an implicit `super()` call), followed by the subclass constructor. Thus, \"P C \" is printed."
  },
  {
    "q": "What does the `this` keyword refer to in Java (GATE IT 2005)?",
    "options": [
      "The parent class of the current object",
      "The current instance of the class",
      "A static method inside the class",
      "The package of the current class"
    ],
    "ans": 1,
    "explanation": "The `this` keyword acts as a reference to the current object instance whose method or constructor is being executed."
  },
  {
    "q": "Identify the output (GATE CS 2013):\n```java\nclass A {\n    int a = 10;\n}\npublic class Test {\n    public static void main(String[] args) {\n        A obj = new A();\n        System.out.println(obj.a);\n    }\n}\n``",
    "options": [
      "0",
      "10",
      "Compilation Error",
      "Runtime Exception"
    ],
    "ans": 1,
    "explanation": "The object is correctly instantiated and the instance variable a is accessed via the object reference, printing 10."
  },
  {
    "q": "Consider the following program (GATE CS 1999):\n```java\nclass Box {\n    int width;\n    int height;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        System.out.println(b.width);\n    }\n}\n``",
    "options": [
      "0",
      "null",
      "Garbage value",
      "Compilation Error"
    ],
    "ans": 0,
    "explanation": "In Java, instance variables of numeric types are automatically initialized to 0 when an object is created."
  },
  {
    "q": "What happens here? (GATE IT 2004):\n```java\nclass Temp {\n    private Temp() {}\n}\npublic class Main {\n    public static void main(String[] args) {\n        Temp t = new Temp();\n    }\n}\n``",
    "options": [
      "Compiles and runs fine",
      "Compilation Error",
      "Runtime Exception",
      "Creates an anonymous class"
    ],
    "ans": 1,
    "explanation": "The constructor of Temp is private, which restricts instantiation from outside the Temp class. Main cannot instantiate it, resulting in a Compilation Error."
  },
  {
    "q": "What is the primary purpose of encapsulation? (GATE CS 2011)",
    "options": [
      "To allow classes to inherit from multiple parents",
      "To hide the internal state of an object and require all interaction to be performed through an object's methods",
      "To enable polymorphism",
      "To allow method overloading"
    ],
    "ans": 1,
    "explanation": "Encapsulation restricts direct access to some of an object's components, which is a means of preventing accidental interference and misuse. It is often achieved by making fields private and using getters/setters."
  },
  {
    "q": "Can we overload a constructor in Java? (GATE CS 2008)",
    "options": [
      "No, a class can have only one constructor",
      "Yes, by using different return types",
      "Yes, by changing the number or type of parameters",
      "No, constructors cannot have parameters"
    ],
    "ans": 2,
    "explanation": "Constructor overloading is perfectly valid in Java as long as the parameter lists differ."
  },
  {
    "q": "Analyze the program (GATE CS 2016):\n```java\nclass Point {\n    int x, y;\n    void Point(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n}\n``",
    "options": [
      "It declares a valid constructor",
      "It declares a method named Point, not a constructor",
      "Compilation error due to the use of 'this'",
      "Compilation error due to void return type"
    ],
    "ans": 1,
    "explanation": "Because of the `void` return type, Java treats this as a regular method named Point, not as a constructor. A constructor must have no return type."
  },
  {
    "q": "What is the memory location where objects are allocated in Java? (GATE CS 2012)",
    "options": [
      "Stack",
      "Heap",
      "BSS Segment",
      "Data Segment"
    ],
    "ans": 1,
    "explanation": "In Java, all objects are dynamically allocated on the Heap memory."
  },
  {
    "q": "What will be printed? (GATE IT 2008):\n```java\nclass Demo {\n    int x;\n}\npublic class Test {\n    static void modify(Demo d) {\n        d.x = 5;\n    }\n    public static void main(String[] args) {\n        Demo obj = new Demo();\n        obj.x = 2;\n        modify(obj);\n        System.out.println(obj.x);\n    }\n}\n``",
    "options": [
      "2",
      "5",
      "0",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "The reference to the object `obj` is passed by value. The method `modify` modifies the field `x` of the actual object. So it becomes 5."
  },
  {
    "q": "Consider the code (GATE CS 2001):\n```java\nclass Main {\n    public static void main(String[] args) {\n        System.out.println(new Main());\n    }\n}\n``",
    "options": [
      "Compilation Error",
      "Runtime Error",
      "Prints the memory hash address of the Main object",
      "Prints nothing"
    ],
    "ans": 2,
    "explanation": "Instantiating an object is allowed, and printing it directly will implicitly call its `toString()` method, which by default prints the class name and a hash code."
  },
  {
    "q": "Which of these access modifiers restricts access the most? (GATE CS 2019)",
    "options": [
      "public",
      "protected",
      "default (package-private)",
      "private"
    ],
    "ans": 3,
    "explanation": "The `private` modifier restricts access completely to within the same class only."
  }
];

export const chapter10_COMPLETE_EXERCISES = [
  {
    template: `public class ___ {
    String name;
    public void meow() {
        System.out.println("Meow!");
    }
}`,
    blanks: [
      "Cat"
    ]
  }
];

// Chapter 11

export const chapter11_CONTENT = {
  "title": "OOP Principles",
  "description": "Object-Oriented Programming relies on four main pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction to manage complexity.",
  "points": [
    {
      "heading": "Inheritance",
      "body": "Allows a class (subclass) to inherit fields and methods from another (superclass) using the `extends` keyword."
    },
    {
      "heading": "Polymorphism",
      "body": "Allows objects to take many forms. Method Overriding lets a subclass provide a custom implementation of an inherited method using `@Override`."
    },
    {
      "heading": "Encapsulation",
      "body": "Restricting direct access to object state. Fields are declared `private`, and exposed through public getters and setters."
    },
    {
      "heading": "Abstraction & Interfaces",
      "body": "Abstract classes/methods hide implementation details. Interfaces define contracts using abstract methods and default implementations using `implements`."
    },
    {
      "heading": "The 'super' Keyword",
      "body": "Used to call superclass constructors or superclass overridden methods from a subclass."
    },
    {
      "heading": "Final Classes & Methods",
      "body": "A `final` class cannot be inherited (`extended`). A `final` method cannot be overridden by subclasses."
    }
  ],
  "code": "// Interface\ninterface Animal {\n    void makeSound();\n}\n\n// Subclass implementing interface\nclass Dog implements Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(\"Woof\");\n    }\n}\n\npublic class OOP {\n    public static void main(String[] args) {\n        Animal myDog = new Dog();\n        myDog.makeSound(); // Polymorphism\n    }\n}"
};

export const chapter11_DEBUG = {
  "instructions": "Fix the 3 inheritance and interface implementation bugs in this class.",
  "buggy": "interface Flyer {\n    void fly();\n}\nclass Bird implements Flyer {\n    public void fly() {\n        System.out.println(\"Flying\");\n    }\n}\npublic class Eagle extends Bird implements Flyer {\n    void fly() {\n        super.fly();\n    }\n}",
  "fixed": "interface Flyer {\n    void fly();\n}\nclass Bird implements Flyer {\n    public void fly() {\n        System.out.println(\"Flying\");\n    }\n}\npublic class Eagle extends Bird {\n    public void fly() {\n        super.fly();\n    }\n}",
  "hints": [
    "Eagle already inherits Flyer implementation from Bird — remove implements Flyer",
    "Overridden methods in Eagle must retain public visibility",
    "Verify super.fly() is called correctly inside the overridden method"
  ],
  "expectedOutput": ""
};

export const chapter11_DRAG_DROP = {
  "instructions": "Arrange these lines to demonstrate inheritance with class Cat.",
  "lines": [
    {
      "id": "a",
      "text": "class Animal {}"
    },
    {
      "id": "b",
      "text": "class Cat extends Animal {"
    },
    {
      "id": "c",
      "text": "    void meow() {}"
    },
    {
      "id": "d",
      "text": "}"
    },
    {
      "id": "e",
      "text": "public class Main {"
    },
    {
      "id": "f",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "g",
      "text": "        Cat c = new Cat();"
    },
    {
      "id": "h",
      "text": "        c.meow();"
    },
    {
      "id": "i",
      "text": "    }"
    },
    {
      "id": "j",
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
    "i",
    "j"
  ]
};

export const chapter11_MCQ = [
  {
    "q": "(GATE CS 2003) The primary purpose of an abstract class in object-oriented programming is to:",
    "options": [
      "Provide a class that can be instantiated directly",
      "Provide a common interface for a set of subclasses",
      "Hide the data of a class completely",
      "Improve the runtime performance of a program"
    ],
    "ans": 1,
    "explanation": "Abstract classes cannot be instantiated directly. Their primary purpose is to provide a common blueprint or interface that multiple derived classes can share and extend."
  },
  {
    "q": "(GATE CS 2014) Which of the following statements is/are TRUE regarding Object-Oriented Programming concepts?\\nS1: Data hiding is a way of restricting access to the data members of a class.\\nS2: Encapsulation is the bundling of data and the methods that operate on that data into a single unit.\\nS3: Inheritance allows a class to acquire the properties and methods of another class.",
    "options": [
      "S1 and S2 only",
      "S2 and S3 only",
      "S1 and S3 only",
      "S1, S2, and S3"
    ],
    "ans": 3,
    "explanation": "All three statements are fundamental truths of Object-Oriented Programming. Data hiding restricts access, encapsulation bundles state with behavior, and inheritance facilitates code reuse."
  },
  {
    "q": "(GATE CS 2017) In Object-Oriented Programming, the mechanism of hiding the implementation details and showing only the functionality to the users is known as:",
    "options": [
      "Encapsulation",
      "Inheritance",
      "Abstraction",
      "Polymorphism"
    ],
    "ans": 2,
    "explanation": "Abstraction is the process of hiding the complex implementation details and showing only the essential features of the object. Encapsulation is the mechanism used to achieve it by bundling data and methods."
  },
  {
    "q": "(GATE CS 2006) Which of the following OOP concepts is most closely associated with the \\\"is-a\\\" relationship?",
    "options": [
      "Aggregation",
      "Inheritance",
      "Association",
      "Composition"
    ],
    "ans": 1,
    "explanation": "Inheritance models the \\\"is-a\\\" relationship (e.g., a Dog \\\"is-a\\\" Animal). Aggregation and composition model \\\"has-a\\\" relationships."
  },
  {
    "q": "(GATE IT 2004) In Java, when a subclass provides a specific implementation of a method that is already provided by one of its superclasses, it is known as:",
    "options": [
      "Method overloading",
      "Method overriding",
      "Method hiding",
      "Data hiding"
    ],
    "ans": 1,
    "explanation": "Method overriding allows a subclass to provide a specific implementation of a method that is already defined by its parent class. The method signature must remain exactly the same."
  },
  {
    "q": "(GATE CS 2018) Consider a class `B` that inherits from class `A`. If an instance method `m()` in class `A` is overridden in class `B`, and an object of class `B` is assigned to a reference of class `A`, calling `m()` on the reference will invoke:",
    "options": [
      "The method defined in class A",
      "The overridden method in class B",
      "Both methods, sequentially",
      "Compilation error due to type mismatch"
    ],
    "ans": 1,
    "explanation": "This demonstrates dynamic method dispatch (runtime polymorphism). The method invoked is determined by the actual object type at runtime (which is `B`), not the reference type."
  },
  {
    "q": "(GATE CS 2005) The feature of an object-oriented programming language that allows a single name to represent different behaviors based on the object's type is known as:",
    "options": [
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction"
    ],
    "ans": 2,
    "explanation": "Polymorphism allows objects of different classes to be treated as objects of a common superclass and respond to the same method call with class-specific behaviors."
  },
  {
    "q": "(GATE IT 2008) Which of the following access specifiers in Java provides the tightest encapsulation?",
    "options": [
      "public",
      "protected",
      "default",
      "private"
    ],
    "ans": 3,
    "explanation": "The 'private' access specifier restricts the access of data members and methods to within the same class, providing the highest level of encapsulation."
  },
  {
    "q": "(GATE CS 2002) In an object-oriented programming language, which of the following refers to the wrapping up of data and operations into a single unit?",
    "options": [
      "Polymorphism",
      "Encapsulation",
      "Inheritance",
      "Abstraction"
    ],
    "ans": 1,
    "explanation": "Encapsulation is the bundling of data and the methods that operate on that data into a single unit, typically a class."
  },
  {
    "q": "(GATE CS 2011) Which of the following statements about inheritance in Java is correct?",
    "options": [
      "Java supports multiple inheritance of classes.",
      "Java does not support inheritance at all.",
      "Java supports multiple inheritance of interfaces but not classes.",
      "Java classes can inherit from multiple abstract classes."
    ],
    "ans": 2,
    "explanation": "To prevent the diamond problem, Java does not support multiple inheritance of classes, but a class can implement multiple interfaces."
  },
  {
    "q": "(GATE CS 1999) The mechanism that allows a class A to use the methods of class B by declaring a reference of B inside A is termed as:",
    "options": [
      "Inheritance",
      "Composition/Aggregation",
      "Polymorphism",
      "Encapsulation"
    ],
    "ans": 1,
    "explanation": "When class A contains a reference to class B, it is called Composition or Aggregation (a \\\"has-a\\\" relationship)."
  },
  {
    "q": "(GATE CS 2013) Dynamic binding is most closely related to which of the following OOP concepts?",
    "options": [
      "Compile-time Polymorphism",
      "Run-time Polymorphism",
      "Data Hiding",
      "Class Abstraction"
    ],
    "ans": 1,
    "explanation": "Dynamic binding is resolved at run-time, which allows Java to figure out which overridden method to call. This is run-time polymorphism."
  },
  {
    "q": "(GATE IT 2005) Which of the following is true for an interface in Java?",
    "options": [
      "An interface can extend another interface.",
      "An interface can implement another interface.",
      "An interface can extend a class.",
      "An interface can be instantiated."
    ],
    "ans": 0,
    "explanation": "In Java, an interface can extend one or more other interfaces, but it cannot implement interfaces, extend classes, or be instantiated."
  },
  {
    "q": "(GATE CS 2019) A final class in Java:",
    "options": [
      "Can be extended by other classes.",
      "Cannot be instantiated.",
      "Cannot be extended by other classes.",
      "Can only have static methods."
    ],
    "ans": 2,
    "explanation": "Making a class final prevents it from being extended by any other class."
  },
  {
    "q": "(GATE CS 2015) In OOP, when a method of a subclass has the same name and signature as a method in its superclass, it is called:",
    "options": [
      "Method overloading",
      "Method overriding",
      "Method shadowing",
      "Method abstracting"
    ],
    "ans": 1,
    "explanation": "When a subclass defines a method with the same name and signature as one in its superclass, it is known as method overriding."
  }
];

export const chapter11_COMPLETE_EXERCISES = [];

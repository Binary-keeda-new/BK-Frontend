// Chapter 21 - nested_classes

export const chapter21_CONTENT = {
    title: "NESTED CLASSES",
    description: "Learn about nested classes",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};


export const chapter21_MCQ = [
    {
        "q": "Which of the following is true regarding static nested classes in Java? (GATE CS 2018)",
        "options": [
            "They can access all members (static and non-static) of the outer class directly.",
            "They require an instance of the outer class to be instantiated.",
            "They can access only the static members of the outer class directly.",
            "They cannot have static methods or fields."
        ],
        "ans": 2,
        "explanation": "Static nested classes are associated with the outer class, not a specific instance. Thus, they can only directly access static members of the outer class."
    },
    {
        "q": "Consider the following code snippet. How do you instantiate the Inner class? (GATE CS 2014)\n```java\nclass Outer {\n    class Inner {\n    }\n}\n``",
        "options": [
            "Outer.Inner obj = new Outer.Inner();",
            "Outer.Inner obj = new Outer().new Inner();",
            "Inner obj = new Outer.Inner();",
            "Outer.Inner obj = new Inner();"
        ],
        "ans": 1,
        "explanation": "Since Inner is a non-static nested class, it requires an instance of the Outer class to be instantiated. So, new Outer().new Inner() is the correct syntax."
    },
    {
        "q": "What variables of the enclosing method can a local inner class access? (GATE CS 2006)",
        "options": [
            "Any variable declared in the enclosing method.",
            "Only static variables of the enclosing method.",
            "Only final or effectively final variables of the enclosing method.",
            "Local inner classes cannot access any variables of the enclosing method."
        ],
        "ans": 2,
        "explanation": "Local inner classes can only access local variables of the enclosing method if they are declared final or are effectively final."
    },
    {
        "q": "Which of the following statements about anonymous inner classes is FALSE? (GATE IT 2005)",
        "options": [
            "They can implement only one interface at a time.",
            "They can extend exactly one class at a time.",
            "They can define their own constructors.",
            "They cannot be explicitly named."
        ],
        "ans": 2,
        "explanation": "Anonymous inner classes do not have a name, so they cannot define explicit constructors. They rely on instance initializer blocks instead."
    },
    {
        "q": "Consider an anonymous inner class defined inside a static method. Which members of the enclosing class can it access? (GATE CS 2011)",
        "options": [
            "Only static members.",
            "Only non-static members.",
            "Both static and non-static members.",
            "None."
        ],
        "ans": 0,
        "explanation": "Because it is defined inside a static method, there is no enclosing instance. Thus, it can only access static members of the enclosing class."
    },
    {
        "q": "What is the output of the following Java program? (GATE CS 2015)\n```java\nclass Test {\n    int x = 10;\n    class Inner {\n        int x = 20;\n        void show() {\n            System.out.println(x + \" \" + Test.this.x);\n        }\n    }\n}\n``",
        "options": ["10 20", "20 10", "10 10", "20 20"],
        "ans": 1,
        "explanation": "The variable x inside the inner class shadows the outer class's x. To access the outer class's x, we use Test.this.x, giving 20 and 10."
    },
    {
        "q": "Can a static nested class be inherited by another class? (GATE IT 2007)",
        "options": ["Yes, like any other normal class.", "No, static nested classes are implicitly final.", "Yes, but only by other nested classes within the same outer class.", "No, they cannot be inherited."],
        "ans": 0,
        "explanation": "A static nested class can be extended by other classes just like a top-level class, provided its access modifiers allow it."
    },
    {
        "q": "Which keyword is used to access the current instance of the enclosing outer class from within a non-static inner class? (GATE CS 2010)",
        "options": ["this.Outer", "Outer.this", "super", "Outer.super"],
        "ans": 1,
        "explanation": "To explicitly refer to the instance of the enclosing class from within an inner class, the syntax OuterClassName.this is used."
    },
    {
        "q": "What is the limitation of a local inner class declared inside a block? (GATE IT 2012)",
        "options": ["It can only be instantiated inside that block.", "It cannot have any methods.", "It must be abstract.", "It must implement an interface."],
        "ans": 0,
        "explanation": "A local class is visible only within the block in which it is defined and can only be instantiated within that block."
    },
    {
        "q": "Is it possible to declare an interface inside a class? If so, what is its implicit modifier? (GATE CS 2016)",
        "options": ["No, interfaces cannot be nested.", "Yes, implicitly private.", "Yes, implicitly static.", "Yes, implicitly final."],
        "ans": 2,
        "explanation": "Nested interfaces are implicitly static. They belong to the class rather than an instance of the class."
    },
    {
        "q": "Which of the following classes cannot be instantiated? (GATE CS 2004)",
        "options": ["Static nested class", "Anonymous inner class", "Local inner class", "An abstract inner class"],
        "ans": 3,
        "explanation": "Abstract inner classes, like abstract top-level classes, cannot be instantiated directly. Anonymous classes are instantiated at the point of creation."
    },
    {
        "q": "How many .class files are generated when compiling an outer class with one inner class? (GATE IT 2008)",
        "options": ["One", "Two", "Three", "Depends on the compiler"],
        "ans": 1,
        "explanation": "The compiler generates a separate .class file for the inner class, typically named Outer$Inner.class, in addition to Outer.class."
    },
    {
        "q": "Can an inner class declare static members? (GATE CS 2019)",
        "options": ["Yes, without restrictions.", "No, unless they are final constants.", "Yes, but only static methods.", "No, completely disallowed."],
        "ans": 1,
        "explanation": "Prior to Java 16, a non-static inner class could only declare static members if they were final constants (compile-time constants). (Java 16+ relaxed this)."
    },
    {
        "q": "An anonymous inner class is created from an interface. What is actually happening? (GATE CS 2013)",
        "options": ["An instance of the interface is created.", "A class implementing the interface is defined and instantiated simultaneously.", "The interface is converted into a class.", "A static nested class is implicitly created."],
        "ans": 1,
        "explanation": "Interfaces cannot be instantiated. The anonymous class syntax defines an unnamed class that implements the interface and instantiates it."
    },
    {
        "q": "What is the primary benefit of using local inner classes? (GATE IT 2014)",
        "options": ["To achieve multiple inheritance.", "To improve execution speed of methods.", "To encapsulate logic that is only relevant within a specific method.", "To allow global access to the class."],
        "ans": 2,
        "explanation": "Local inner classes provide strong encapsulation by hiding the class definition inside a method where it is exclusively used."
    }
];

export const chapter21_DEBUG = undefined;
export const chapter21_DRAG_DROP = undefined;
export const chapter21_COMPLETE_EXERCISES = [];

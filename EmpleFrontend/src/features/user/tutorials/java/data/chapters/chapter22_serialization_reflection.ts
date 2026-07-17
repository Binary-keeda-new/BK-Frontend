// Chapter 22 - serialization_reflection

export const chapter22_CONTENT = {
    title: "SERIALIZATION REFLECTION",
    description: "Learn about serialization reflection",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};


export const chapter22_MCQ = [
    {
        "q": "In Java, what happens to fields declared as 'transient' during serialization? (GATE CS 2017)",
        "options": [
            "They are encrypted in the serialized stream.",
            "They are ignored and not included in the serialized stream.",
            "They throw an exception during serialization.",
            "They are serialized normally like other fields."
        ],
        "ans": 1,
        "explanation": "The transient keyword is used to indicate that a field should not be serialized. During deserialization, it gets its default value."
    },
    {
        "q": "Which interface must a class implement to allow its objects to be serialized? (GATE IT 2004)",
        "options": [
            "java.io.Externalizable",
            "java.io.Serializable",
            "java.io.ObjectOutput",
            "Both A and B"
        ],
        "ans": 3,
        "explanation": "Both Serializable and Externalizable allow object serialization, where Externalizable extends Serializable and provides custom serialization control."
    },
    {
        "q": "What is the purpose of the 'serialVersionUID' field in a Serializable class? (GATE CS 2012)",
        "options": [
            "To define the size of the serialized object.",
            "To restrict the number of times the object can be serialized.",
            "To verify that the sender and receiver of a serialized object have loaded classes for that object that are compatible.",
            "To encrypt the serialized data stream."
        ],
        "ans": 2,
        "explanation": "The serialVersionUID is used as a version control mechanism during deserialization to verify that the sender and receiver have compatible class definitions."
    },
    {
        "q": "Which of the following operations is NOT possible using the Java Reflection API? (GATE CS 2008)",
        "options": [
            "Accessing private fields of a class.",
            "Invoking private methods of a class.",
            "Modifying the bytecode of a class dynamically at runtime.",
            "Creating a new instance of a class using its fully qualified name."
        ],
        "ans": 2,
        "explanation": "Modifying bytecode dynamically at runtime is not done via standard Reflection (though libraries like ASM or CGLIB can do this). Reflection primarily inspects and interacts with loaded classes."
    },
    {
        "q": "Consider a static field in a Serializable class. Will its state be saved during serialization? (GATE IT 2007)",
        "options": [
            "Yes, if it is not marked as transient.",
            "No, static fields belong to the class, not the object instance, so they are not serialized.",
            "Yes, static fields are always serialized.",
            "It will throw a NotSerializableException."
        ],
        "ans": 1,
        "explanation": "Serialization operates on the instance state. Static fields belong to the class, so they are ignored during object serialization."
    },
    {
        "q": "Which exception is thrown if a class is not serializable but we try to serialize its object? (GATE CS 2015)",
        "options": ["IOException", "NotSerializableException", "ClassNotFoundException", "InvalidClassException"],
        "ans": 1,
        "explanation": "A java.io.NotSerializableException is thrown when an instance is required to have a Serializable interface but does not."
    },
    {
        "q": "During deserialization, is the constructor of the serialized object called? (GATE IT 2009)",
        "options": ["Yes, the no-arg constructor is called.", "Yes, all constructors are called.", "No, no constructor of the serialized class is called.", "Depends on whether the object has a parameterized constructor."],
        "ans": 2,
        "explanation": "During deserialization, the constructor of the serialized class itself is not called. However, the no-arg constructor of its closest non-serializable superclass is invoked."
    },
    {
        "q": "Which method of java.lang.Class is used to get all declared fields (including private ones) of a class? (GATE CS 2018)",
        "options": ["getFields()", "getDeclaredFields()", "getAllFields()", "fetchFields()"],
        "ans": 1,
        "explanation": "getDeclaredFields() returns all fields declared in the class, while getFields() only returns public fields (including inherited ones)."
    },
    {
        "q": "How can you bypass Java's access control checks (e.g., to access private fields) using Reflection? (GATE CS 2014)",
        "options": ["By calling Field.setAccessible(true)", "By using the SecurityManager", "By changing the field's modifier dynamically", "By invoking Class.unlock()"],
        "ans": 0,
        "explanation": "Calling setAccessible(true) on a Field or Method object suppresses standard Java access checking, allowing access to private members."
    },
    {
        "q": "If a superclass is Serializable, does a subclass need to explicitly implement Serializable? (GATE IT 2006)",
        "options": ["Yes, serialization is not inherited.", "No, it is inherited automatically.", "Yes, otherwise it throws an exception.", "Only if it contains new non-transient fields."],
        "ans": 1,
        "explanation": "Serialization is inheritable. If a superclass implements Serializable, all its subclasses are also serializable."
    },
    {
        "q": "What happens if a serialized object contains a reference to an object of a class that is NOT Serializable? (GATE CS 2011)",
        "options": ["The reference is ignored and set to null.", "Only primitive fields of the referenced object are serialized.", "A NotSerializableException is thrown.", "The object is implicitly made Serializable."],
        "ans": 2,
        "explanation": "If a serializable object contains a reference to a non-serializable object, the serialization process will throw a NotSerializableException."
    },
    {
        "q": "Which of the following packages provides the primary classes for Java Reflection? (GATE CS 2003)",
        "options": ["java.util.reflect", "java.lang.reflect", "java.io.reflect", "java.net.reflect"],
        "ans": 1,
        "explanation": "The java.lang.reflect package contains classes and interfaces for obtaining reflective information about classes and objects."
    },
    {
        "q": "Can you instantiate an object using Reflection without knowing its class name at compile time? (GATE IT 2010)",
        "options": ["Yes, using Class.forName() and newInstance().", "No, class names must be resolved at compile time.", "Yes, but only for classes extending Object directly.", "No, Reflection is only for inspecting, not creating."],
        "ans": 0,
        "explanation": "Reflection allows you to load a class dynamically using Class.forName(className) and instantiate it using newInstance() (or via Constructors)."
    },
    {
        "q": "Which class is the entry point for all reflection operations in Java? (GATE CS 2016)",
        "options": ["java.lang.Object", "java.lang.reflect.Method", "java.lang.Class", "java.lang.reflect.Field"],
        "ans": 2,
        "explanation": "The java.lang.Class object represents classes and interfaces in a running Java application and is the entry point for Reflection."
    },
    {
        "q": "What is the output when deserializing a transient boolean field? (GATE CS 2020)",
        "options": ["true", "false", "null", "Throws Exception"],
        "ans": 1,
        "explanation": "Transient fields are not serialized. During deserialization, they receive their default values. The default value for boolean is false."
    }
];

export const chapter22_DEBUG = undefined;
export const chapter22_DRAG_DROP = undefined;
export const chapter22_COMPLETE_EXERCISES = [
  {
    template: `import java.io.Serializable;
class Person implements ___ {
    String name;
}`,
    blanks: [
      "Serializable"
    ]
  }
];

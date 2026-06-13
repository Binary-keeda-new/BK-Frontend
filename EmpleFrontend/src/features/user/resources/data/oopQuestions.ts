import { InterviewQuestion } from "../types/interviewQuestion";

export const OOP_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    question: "What is Object-Oriented Programming (OOP)?",
    answer: `Object-Oriented Programming is a programming paradigm in which the entire software is designed as a collection of **objects** that interact with each other. Each object consists of **data** and the **methods** that manipulate this data.

The four main pillars of OOP are:

- **Encapsulation:** Binding data and methods together while hiding internal details.
- **Abstraction:** Exposing only necessary information and hiding complexity.
- **Inheritance:** Allowing a class to acquire properties and behaviors of another class.
- **Polymorphism:** Allowing the same entity to behave differently in different contexts.`,
    
    companies: ["Google", "Amazon", "Microsoft", "Meta", "TCS"],
  },
  {
    id: 2,
    question: "Why should we use Object-Oriented Programming?",
    answer: `The primary advantage of OOP lies in **improved code manageability**, which includes:

- Enhancing the overall understanding of the software by narrowing the gap between the language used by developers and that understood by users.
- **Encapsulation** simplifies maintenance by allowing changes in internal representation without affecting external methods.
- Particularly beneficial for developing **large-scale software applications**.
- Promotes **code reuse** through inheritance and polymorphism, reducing redundancy.
- Provides **better data security** by restricting unauthorized access to sensitive data.`,
    companies: ["Amazon", "Microsoft", "Google", "Infosys", "Wipro"],
  },
  {
    id: 3,
    question: "What are the key features of OOP?",
    answer: `The fundamental features of OOP, often referred to as the **four pillars**, are:

**Encapsulation:**
- Binding data and methods into a single unit (class) while hiding internal details.

**Data Abstraction:**
- Displaying only necessary information to the user while hiding irrelevant complexity.

**Polymorphism:**
- Allowing the same entity (function or object) to behave differently in different scenarios.

**Inheritance:**
- Allowing a child class to inherit properties and behaviors from a parent class, promoting code reuse.`,
    
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Cognizant"],
  },
  {
    id: 4,
    question: "Besides OOP, what other programming paradigms exist?",
    answer: `A programming paradigm is the approach or methodology used to write programs. The main paradigms include:

**Imperative Programming:**
- Involves changing program state via assignment statements.
- **Procedural Programming:** Based on procedure/function calls.
- **Object-Oriented Programming:** Focuses on objects with state and behavior.
- **Parallel Programming:** Executes multiple instructions concurrently.

**Declarative Programming:**
- Emphasizes *what* should be executed rather than *how*.
- **Logical Programming:** Based on formal logic with facts and rules.
- **Functional Programming:** Builds programs through function composition.
- **Database Programming:** Manages data organized as fields, records, and files.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe"],
  },
  {
    id: 5,
    question: "How does Structured Programming differ from Object-Oriented Programming?",
    answer: `Structured Programming is a technique viewed as a precursor to OOP, usually consisting of well-organized, separated modules.

**Key Differences:**

- **Basis:** OOP is based on objects with state and behavior; Structured Programming organizes programs into functions.
- **Approach:** OOP follows a **bottom-up** approach; Structured Programming uses a **top-down** approach.
- **Data Security:** OOP restricts data flow to authorized parts, enhancing security; Structured Programming allows unrestricted data access.
- **Code Reuse:** OOP achieves reuse through polymorphism and inheritance; Structured Programming relies on functions and loops.
- **Execution:** OOP dynamically invokes calls based on object behavior at runtime; Structured Programming executes functions sequentially.`,
    
    companies: ["TCS", "Infosys", "Wipro", "Cognizant", "Capgemini"],
  },
  {
    id: 6,
    question: "Which programming languages are commonly used for OOP?",
    answer: `Popular programming languages that support OOP include:

- **C++** — Supports both OOP and procedural programming; widely used in systems and game development.
- **Java** — Fully object-oriented; used in enterprise applications and Android development.
- **Python** — Supports OOP along with functional and procedural paradigms; popular in AI/ML.
- **JavaScript** — Supports OOP via prototypes and ES6 classes; primarily used for web development.
- **C#** — Microsoft's OOP language; used in .NET applications and game development (Unity).
- **Ruby** — Fully object-oriented; popular for web development with Ruby on Rails.`,
    companies: ["Google", "Microsoft", "Amazon", "Oracle", "TCS"],
  },
  {
    id: 7,
    question: "What are the advantages and disadvantages of using OOP?",
    answer: `**Advantages of OOP:**

- **Code Reuse:** Inheritance and polymorphism reduce redundancy.
- **Easier Maintenance:** Encapsulation allows internal changes without affecting external code.
- **Better Data Security:** Access specifiers restrict unauthorized access.
- **Faster Implementation:** Existing classes can be reused, reducing development time.
- **Reduced Complexity:** Breaks complex problems into manageable objects.

**Disadvantages of OOP:**

- Requires **skilled programmers** with an object-oriented mindset.
- Requires **proper planning** upfront due to design complexity.
- **Not suitable for all problem types** — simple tasks may be over-engineered.
- Programs tend to be **longer** compared to procedural approaches.`,
    companies: ["Amazon", "Microsoft", "Google", "Infosys", "Wipro"],
  },
  {
    id: 8,
    question: "How is a class defined in OOP?",
    answer: `A class is a **user-defined data type** that contains **data members** (attributes) and **member functions** (methods) that operate on those data members.

It acts as a **blueprint or template** for creating objects with common properties and behaviors.

**Key Points:**
- A class itself does not consume memory — it is just a definition.
- Memory is allocated only when an **object** (instance) of the class is created.
- Classes support access specifiers (public, private, protected) to control visibility.

**Example:**
- A \`Car\` class can define attributes like \`color\`, \`speed\`, and \`brand\`, and methods like \`accelerate()\` and \`brake()\`.
- Multiple car objects can be created from this single \`Car\` class blueprint.`,
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Cognizant"],
  },
  {
    id: 9,
    question: "What is an object in OOP?",
    answer: `An object is an **instance of a class**. Class data members and methods cannot be used directly — an object must be created to access them.

**Key Characteristics:**
- **State:** Represented by the values of its data members (attributes).
- **Behavior:** Defined by the methods (functions) of its class.
- **Identity:** Each object has a unique identity that distinguishes it from other objects.

**Key Points:**
- Objects represent **real-world entities**.
- Objects **occupy memory** when instantiated.
- Multiple objects can be created from the same class, each with its own state.

**Example:**
- From a \`Car\` class, objects like \`myCar\` and \`yourCar\` can be created, each with different colors and speeds but sharing the same structure.`,
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 10,
    question: "How much memory does a class consume?",
    answer: `**Classes themselves do not consume memory** — they serve merely as templates or blueprints.

Memory allocation occurs only when **objects are instantiated**, at which point the class members and methods are initialized in memory.

**Key Points:**
- The class definition is stored in the **code segment** of memory.
- When an object is created, memory is allocated on the **heap or stack** for its data members.
- All objects of the same class **share the same method definitions** but have their own copies of data members.
- **Static members** are shared across all objects and allocated once in memory.

**Example:**
- Defining a \`Car\` class allocates no memory. Creating \`Car myCar;\` allocates memory for the object's attributes like color, speed, etc.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 11,
    question: "What does encapsulation mean in OOP?",
    answer: `Encapsulation is the process of **binding data and the methods that manipulate them into a single unit** in such a way that sensitive data is hidden from users.

**It is implemented in two ways:**

**Data Hiding:**
- Restricts access to object members using access specifiers (e.g., private and protected in C++).
- Prevents unauthorized access or modification of internal data.

**Data Binding:**
- Bundles data members and member functions together within a class as a single unit.

**Benefits:**
- **Data Security:** Sensitive data is protected from external access.
- **Maintainability:** Internal implementation can change without affecting external code.
- **Control:** Provides controlled access through getters and setters.

**Example:**
- A \`BankAccount\` class with a private \`balance\` field accessible only via \`deposit()\` and \`withdraw()\` methods.`,
    
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 12,
    question: "What is abstraction in the context of OOP?",
    answer: `Abstraction is closely related to encapsulation and is crucial in OOP. It refers to **displaying only the necessary information to the user while hiding irrelevant details** and complexity.

**Key Concept:**
- Shows *what* an object does without revealing *how* it does it.

**How it is implemented:**
- Using **abstract classes** that define common behavior without full implementation.
- Using **interfaces** that expose only method signatures without implementation details.

**Benefits:**
- Reduces complexity by focusing on essential features.
- Increases security by hiding internal implementation.
- Improves code maintainability and flexibility.

**Example:**
- When you drive a car, you interact with the steering wheel and pedals (abstraction) without knowing the internal mechanics of the engine. Similarly, a \`Shape\` abstract class exposes \`draw()\` without revealing how each shape is drawn.`,
    
    companies: ["Amazon", "Google", "Microsoft", "Wipro", "Cognizant"],
  },
  {
    id: 13,
    question: "What are access specifiers, and why are they important in OOP?",
    answer: `Access specifiers are **special keywords used to define or control the accessibility** of entities like classes, methods, and variables.

**Types of Access Specifiers:**

**Public:**
- Members are accessible from anywhere — inside and outside the class.

**Private:**
- Members are accessible only within the class itself.
- Cannot be accessed by derived classes or external code.

**Protected:**
- Members are accessible within the class and by derived (child) classes.
- Not accessible from outside the class hierarchy.

**Why They Are Important:**
- Enable **encapsulation** by controlling how data is accessed or modified.
- Protect **data integrity** by preventing unauthorized access.
- Restrict access to sensitive data, improving **security**.
- Define clear boundaries between a class's internal implementation and its public interface.`,
    imageUrls: ["/images/interview-questions/oop/Q13.png"],
    imageCaptions: ["Figure 13: ★ Access Specifiers in OOP"],
    companies: ["Microsoft", "Google", "Amazon", "TCS", "Infosys"],
  },
  {
    id: 14,
    question: "What is an abstract class?",
    answer: `An abstract class is designed to serve as a **base class for inheritance** and **cannot be instantiated directly**. It may include both abstract methods (without implementation) and non-abstract methods (with implementation).

**Key Characteristics:**
- Cannot be used to create objects directly.
- Serves as a template for derived classes to implement specific behavior.
- Can have constructors, data members, and concrete methods.

**Language-Specific Implementation:**
- **C++:** Contains at least one **pure virtual function** declared as \`virtual void func() = 0;\`
- **Java/C#:** Declared using the \`abstract\` keyword.
- **Python:** Uses the \`ABC\` module with \`@abstractmethod\` decorator.

**Example:**
- A \`Shape\` abstract class can define an abstract \`area()\` method. Subclasses like \`Circle\` and \`Rectangle\` must provide their own implementation of \`area()\`.`,
    
    companies: ["Google", "Amazon", "Microsoft", "Oracle", "TCS"],
  },
  {
    id: 15,
    question: "What is an interface in programming?",
    answer: `An interface is a **unique type of class that contains only method declarations without any implementation**. Objects cannot be created directly from an interface.

**Key Characteristics:**
- Contains only **abstract methods** (method signatures without bodies).
- Variables in an interface are **static and final** by default.
- A class **implements** an interface and provides concrete definitions for all declared methods.
- Acts as a **formal contract** — any class implementing it must fulfill all its method declarations.

**Supports Multiple Inheritance:**
- A class can implement **multiple interfaces**, overcoming the single inheritance limitation in languages like Java.

**Example:**
- An \`Animal\` interface declaring \`makeSound()\` and \`move()\`. Classes \`Dog\` and \`Bird\` implement this interface with their own specific behavior.

**Note (Java 8+):** Interfaces can now have \`default\` and \`static\` methods with implementations.`,
    
    companies: ["Amazon", "Google", "Microsoft", "Oracle", "TCS"],
  },
  {
    id: 16,
    question: "How does an abstract class differ from an interface?",
    answer: `Both abstract classes and interfaces are used to achieve **abstraction**, but they differ significantly in design and capability.

**Abstract Class:**
- Can have both **abstract and non-abstract (concrete) methods**.
- Can contain **final, non-final, static, and non-static variables**.
- Can have **constructors** and instance variables.
- Does **not support multiple inheritance** — a class can extend only one abstract class.
- Use when classes share a **common base implementation**.

**Interface:**
- Contains only **abstract methods** (Java 8+ allows default and static methods).
- Variables are **static and final** only.
- Cannot have constructors or instance variables.
- **Supports multiple inheritance** — a class can implement multiple interfaces.
- Use when unrelated classes need to share a **common contract or behavior**.

**Rule of Thumb:** Use an abstract class for "is-a" relationships with shared code, and an interface for "can-do" or behavioral contracts.`,
    
    companies: ["Google", "Amazon", "Microsoft", "Oracle", "TCS"],
  },
  {
    id: 17,
    question: "What is inheritance, and what is its purpose?",
    answer: `Inheritance is a fundamental OOP concept where a **child class (derived/subclass) inherits properties and behaviors from a parent class (base/superclass)**.

**Main Purposes:**
- **Code Reuse:** Avoids rewriting existing code by reusing parent class members.
- **Runtime Polymorphism:** Enables method overriding for dynamic behavior.
- **Extensibility:** New classes can extend existing ones without modifying them.

**Key Terminology:**
- **Parent/Base/Superclass:** The class being inherited from.
- **Child/Derived/Subclass:** The class that inherits.

**What is inherited:**
- Public and protected data members and methods of the parent class.
- Private members are not directly accessible but exist in memory.

**Example:**
- A \`Vehicle\` class with common attributes like \`speed\` and \`fuel\`. \`Car\` and \`Truck\` classes inherit from \`Vehicle\` and add their own specific features.`,
    imageUrls: ["/images/interview-questions/oop/Q17.png"],  
    imageCaptions: ["Figure 17: ★ Inheritance in OOP"],
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 18,
    question: "What types of inheritance are there?",
    answer: `The different types of inheritance are:

**Single Inheritance:**
- A child class inherits directly from **one base class**.
- Example: \`Dog\` inherits from \`Animal\`.

**Multiple Inheritance:**
- A child class inherits from **multiple base classes**.
- Supported in C++ but **not in Java** (to avoid the diamond problem).

**Multilevel Inheritance:**
- A class is derived from another **derived class**, forming a chain.
- Example: \`GrandChild\` → \`Child\` → \`Parent\`.

**Hierarchical Inheritance:**
- **Multiple child classes** derive from a **single base class**.
- Example: \`Car\` and \`Truck\` both inherit from \`Vehicle\`.

**Hybrid Inheritance:**
- A combination of **two or more types** of inheritance.
- Can lead to the diamond problem in languages supporting multiple inheritance.

**Note:** The availability of these types depends on the programming language used.`,
    
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Wipro"],
  },
  {
    id: 19,
    question: "Are there any limitations to inheritance?",
    answer: `While inheritance is a powerful OOP feature, it comes with notable limitations:

**Performance Overhead:**
- May increase processing time due to the need to **traverse multiple classes** in inheritance chains during method resolution.

**Tight Coupling:**
- Creates a strong dependency between base and derived classes.
- Changes in the **base class may require corresponding changes** in derived classes, reducing flexibility.

**Unexpected Errors:**
- Incorrect implementation of inheritance can cause **unexpected errors** or incorrect program behavior, especially in deep hierarchies.

**Diamond Problem:**
- In **multiple inheritance**, ambiguity arises when two parent classes have the same method.
- Java avoids this by not supporting multiple class inheritance.

**Reduced Encapsulation:**
- Derived classes can access protected members of the base class, potentially **weakening data hiding**.

**Fragile Base Class Problem:**
- Changes to a base class can **break derived classes** in unexpected ways.`,
    companies: ["Amazon", "Google", "Microsoft", "Adobe", "Infosys"],
  },
  {
    id: 20,
    question: "What are virtual functions and pure virtual functions?",
    answer: `**Virtual Function:**
- A function that can be **overridden in a derived class** to provide specific behavior and supports runtime polymorphism.
- Declared with the \`virtual\` keyword in C++ and C#.
- In **Java**, all public, non-static, non-final methods are virtual by default.
- In **Python**, methods are inherently virtual.

**Pure Virtual Function:**
- A virtual function declared **without any implementation** that must be defined in derived classes.
- In C++: \`virtual void pureVirFunc() = 0;\`
- Makes the class an **abstract class** — it cannot be instantiated.
- In Python: Achieved using the \`@abstractmethod\` decorator from the Abstract Base Class (ABC) module.

**Key Difference:**
- A virtual function **has a default implementation** in the base class that can be optionally overridden.
- A pure virtual function **has no implementation** in the base class and must be overridden in all concrete derived classes.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 21,
    question: "What are friend functions and friend classes?",
    answer: `**Friend Function:**
- A special function that has permission to **access the private and protected data of a class**, even though it is not a member of that class.
- Declared using the \`friend\` keyword inside the class.
- It is **not a member function** — it does not have a \`this\` pointer.

**Friend Class:**
- A class that is permitted to **access the private and protected members of another class**.
- Declared using \`friend class ClassName;\` inside the target class.

**Important Rules:**
- Friendship is **not mutual** — if A is a friend of B, B is not automatically a friend of A.
- Friendship is **not inherited** — derived classes do not inherit friendship.
- Mainly used when two classes or functions need **close cooperation** and direct access to each other's internals.

**Example:**
- A \`MathHelper\` friend function accessing private members of a \`Matrix\` class to perform complex calculations efficiently.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 22,
    question: "What is the difference between a structure and a class in C++?",
    answer: `A **structure** in C++ is a user-defined data type similar to a class, with the following notable differences:

**Default Access:**
- **Structure:** Members are **public by default**.
- **Class:** Members are **private by default**.

**Declaration Keyword:**
- **Structure:** Declared using the \`struct\` keyword.
- **Class:** Declared using the \`class\` keyword.

**Memory:**
- Structure is saved in the **stack memory**.
- Class is saved in the **heap memory**.

**Abstraction:**
- **Data Abstraction cannot be achieved** with a structure.
- With a class, **Abstraction is majorly used**.

**Inheritance:**
- Both support inheritance, but classes are more commonly used for OOP-based inheritance hierarchies.

**General Use:**
- Structures are typically used for **simple data grouping** (Plain Old Data).
- Classes are used for **complex OOP designs** with encapsulation, inheritance, and polymorphism.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 23,
    question: "What is polymorphism, and what are its types?",
    answer: `Polymorphism means **having many forms** — it is the ability of code to behave differently based on context. For example, in C++, multiple functions can share the same name but operate differently depending on context.

**Two Types of Polymorphism:**

**Compile-Time Polymorphism (Static / Early Binding):**
- Function binding occurs at **compile time**.
- Achieved through:
  - **Method Overloading:** Same function name, different parameters.
  - **Operator Overloading:** Same operator behaves differently with different types.

**Runtime Polymorphism (Dynamic / Late Binding):**
- Function implementation is decided **during execution**.
- Achieved through:
  - **Method Overriding:** Derived class provides its own implementation of a base class method.
  - Requires **virtual functions** in C++.

**Example:**
- A \`draw()\` method behaves differently for \`Circle\`, \`Rectangle\`, and \`Triangle\` objects — all called through a base class pointer.`,
    imageUrls: ["/images/interview-questions/oop/Q23.png"],  
    imageCaptions: ["Figure 23: ★ Polymorphism in OOP"],
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 24,
    question: "How do overloading and overriding differ?",
    answer: `**Overloading (Compile-Time Polymorphism):**
- Multiple functions/methods share the **same name but different parameters** (type, number, or order).
- Resolved at **compile time** (early binding).
- Occurs **within the same class**.
- Includes **method overloading** and **operator overloading**.
- Example: \`add(int, int)\` and \`add(double, double)\` in the same class.

**Overriding (Runtime Polymorphism):**
- A derived class provides its **own implementation** of a method already defined in the base class.
- Same name, **same parameters**, same return type.
- Resolved at **runtime** (late binding).
- Occurs **across parent and child classes**.
- Implemented using **virtual functions** in C++.
- Example: \`Animal.makeSound()\` overridden by \`Dog.makeSound()\`.

**Key Difference:** Overloading is about multiple implementations of the same name in one class; overriding is about replacing a parent's implementation in a child class.`,
    
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Cognizant"],
  },
  {
    id: 25,
    question: "What is static polymorphism?",
    answer: `Static polymorphism, also known as **compile-time polymorphism**, links an object to a particular function or operator **during compile time**.

**How it is Achieved:**

**Method Overloading:**
- Multiple methods with the same name but different parameter lists within the same class.
- The compiler determines which method to call based on the arguments provided.

**Operator Overloading:**
- Redefining the behavior of operators (like +, -, *) for user-defined types.
- The compiler resolves which operator implementation to use at compile time.

**Key Characteristics:**
- Also called **early binding** since the function call is resolved before program execution.
- Generally **faster** than dynamic polymorphism since no runtime lookup is needed.
- **No virtual functions** involved.

**Example:**
- \`print(int x)\` and \`print(double x)\` — the compiler picks the right one based on the argument type at compile time.`,
    
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 26,
    question: "What is dynamic polymorphism?",
    answer: `Dynamic polymorphism, or **runtime polymorphism**, determines the actual function implementation **during program execution** rather than at compile time.

**How it is Achieved:**
- Through **method overriding** — a derived class provides its own implementation of a base class method.
- Requires **virtual functions** in C++.
- In Java, all non-static, non-final public methods support dynamic polymorphism by default.

**How it Works:**
- A base class pointer or reference is used to call a method.
- At runtime, the actual object type determines which overridden method is executed.
- In C++, this is managed via the **vtable (virtual table)** mechanism.

**Key Characteristics:**
- Also called **late binding** since function resolution happens at runtime.
- Slightly **slower** than static polymorphism due to runtime lookup.
- Enables writing **generic and extensible code**.

**Example:**
- A \`Shape*\` pointer calling \`draw()\` on \`Circle\` or \`Rectangle\` objects — the correct version is called at runtime based on the actual object.`,
   
    companies: ["Google", "Amazon", "Microsoft", "Adobe", "Oracle"],
  },
  {
    id: 27,
    question: "How does C++ implement polymorphism?",
    answer: `C++ supports both types of polymorphism:

**Compile-Time Polymorphism:**
- Achieved via **function overloading**, **operator overloading**, and **templates**.
- The compiler resolves function calls at compile time based on argument types or template parameters.

**Runtime Polymorphism:**
- Achieved using **virtual functions**.
- When a base class declares a function as \`virtual\`, derived classes can override it.
- C++ resolves the correct function at runtime based on the **actual object type**.

**vtable Mechanism:**
- C++ implements runtime polymorphism using a **virtual function table (vtable)**.
- Each class with virtual functions has a vtable — an array of function pointers.
- Each object has a **vptr (virtual pointer)** pointing to its class's vtable.
- At runtime, the vptr is used to look up the correct function to call.

**Example:**
\`\`\`cpp
class Animal {
public:
    virtual void sound() { cout << "Some sound"; }
};
class Dog : public Animal {
public:
    void sound() override { cout << "Bark"; }
};
\`\`\``,
    imageUrls: ["/images/interview-questions/oop/Q27.png"],  
    imageCaptions: ["Figure 27: ★ Runtime Polymorphism"],
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 28,
    question: "What is a constructor?",
    answer: `A constructor is a **special code block that initializes a newly created object**. It is automatically called when an object is instantiated.

**Key Characteristics:**
- Has the **same name as the class** (in C++ and Java).
- Has **no return type** — not even void.
- Called **automatically** when an object is created.
- Can be **overloaded** to support different initialization options.

**Language Variations:**
- **C++/Java:** Constructor name matches the class name.
- **Python:** Constructor is named \`__init__\`.
- **C#:** Constructor name matches the class name, similar to Java.

**Purpose:**
- Initializes data members to valid starting values.
- Allocates resources needed by the object.
- Sets the object into a valid initial state before use.

**Example:**
- A \`Car\` constructor setting \`color = "red"\` and \`speed = 0\` when a new \`Car\` object is created.`,
    imageUrls: ["/images/interview-questions/oop/Q28.png"],
    imageCaptions: ["Figure 28: ★ Constructor Working"],
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 29,
    question: "What are the different types of constructors in C++?",
    answer: `Common constructor types in C++ include:

**Default Constructor:**
- Takes **no arguments**.
- Automatically initialized by the compiler if no constructor is defined.
- Sets members to default values.

**Non-Parameterized Constructor:**
- **User-defined** constructor without parameters.
- Explicitly defined to set specific default values.

**Parameterized Constructor:**
- Takes **arguments** to initialize data members with specific values at creation time.
- Enables creating objects with different initial states.

**Copy Constructor:**
- Initializes a new object by **copying an existing object** of the same class.
- Clones the object and its values into another object.
- Signature: \`ClassName(const ClassName &obj)\`
- Python lacks built-in copy constructors but offers the \`copy\` module as an alternative.

**Move Constructor (C++11):**
- Transfers resources from a temporary object rather than copying them.
- Improves performance by avoiding unnecessary copies.`,
    imageUrls: ["/images/interview-questions/oop/Q29.png"],
    imageCaptions: ["Figure 29: ★ Types of Constructors"],  
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 30,
    question: "What is a destructor?",
    answer: `A destructor is a **special method called automatically when an object is destroyed** or goes out of scope. It frees the resources and memory occupied by an object.

**Key Characteristics:**
- **Cannot be overloaded** — a class can only have one destructor.
- Takes **no parameters** and has **no return type**.
- Called automatically by the runtime when the object's lifetime ends.

**Language Variations:**
- **C++:** Named like the class but prefixed with \`~\`. Example: \`~ClassName()\`
- **Python:** Named \`__del__\`.
- **Java:** Does not have destructors — the **garbage collector** manages memory. The \`finalize()\` method was previously used but is **deprecated since Java 9**.

**Purpose:**
- Release dynamically allocated memory.
- Close file handles, database connections, or network sockets.
- Prevent **memory leaks**.

**Example:**
- A \`DatabaseConnection\` destructor closing the connection when the object goes out of scope.`,
    
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 31,
    question: "Can constructors in a class be overloaded?",
    answer: `**Yes**, constructors can be overloaded in a class.

**How it Works:**
- Multiple constructors can be defined with the **same name but different parameter lists** (different types, number, or order of parameters).
- The compiler determines which constructor to invoke based on the **arguments provided** at object creation.

**Example in Java:**
\`\`\`java
class Car {
    Car() { /* default */ }
    Car(String color) { /* with color */ }
    Car(String color, int speed) { /* with color and speed */ }
}
\`\`\`

**Benefits:**
- Provides **flexibility** in object creation with different initialization options.
- Allows creating objects with varying levels of detail.
- Supports the **principle of least surprise** by giving intuitive ways to create objects.

**Note:** Python achieves similar behavior using **default parameter values** in \`__init__\` since it doesn't support traditional method overloading.`,
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 32,
    question: "Can destructors in a class be overloaded?",
    answer: `**No**, destructors **cannot be overloaded**. A class can only have **one destructor**.

**Reasons Why:**
- A destructor takes **no parameters**, so there is no basis for overloading (overloading requires different parameter signatures).
- If overloading were allowed, the **compiler wouldn't know which destructor to call** during cleanup, leading to ambiguity.
- The destructor is called **automatically** by the runtime — there is no mechanism to specify which version to invoke.

**Key Facts:**
- Only **one destructor per class** is allowed.
- It has **no return type** and **no parameters**.
- In C++, it is named \`~ClassName()\`.
- It is called in the **reverse order** of constructor calls during object destruction.

**Contrast with Constructors:**
- Constructors **can** be overloaded because they accept parameters.
- Destructors **cannot** because they accept no parameters and must have a single, unambiguous cleanup path.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 33,
    question: "What is an exception?",
    answer: `An exception is a **special runtime event that disrupts normal program execution**, often caused by illegal operations or unexpected input that the program isn't designed to handle.

**Common Causes:**
- **Invalid input** — e.g., dividing by zero.
- **File not found** — trying to open a non-existent file.
- **Network failure** — unexpected disconnection.
- **Null pointer access** — accessing an object that hasn't been initialized.
- **Array index out of bounds** — accessing an invalid index.

**Types of Exceptions:**

**Checked Exceptions (Java):**
- Checked at **compile time**.
- Must be handled or declared. Example: \`IOException\`, \`SQLException\`.

**Unchecked Exceptions (Java):**
- Occur at **runtime**.
- Example: \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`.

**Key Point:**
- Not handling exceptions properly can cause the **program to terminate abruptly**.
- Exception handling mechanisms allow programs to **respond gracefully** to errors instead of crashing.`,
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 34,
    question: "What does exception handling mean?",
    answer: `Exception handling is a **mechanism to anticipate and manage undesirable program states** to prevent crashes and allow programs to continue running gracefully.

**Core Constructs:**

**try block:**
- Contains the code that **may throw an exception**.
- If an exception occurs, execution jumps to the catch block.

**catch block:**
- **Catches and handles** the exception thrown in the try block.
- Can have multiple catch blocks for different exception types.

**finally block:**
- Executes **important cleanup code** regardless of whether an exception occurred.
- Used for closing files, releasing resources, etc.

**throw / throws:**
- \`throw\` is used to **explicitly throw** an exception.
- \`throws\` (Java) declares that a method **may throw** certain exceptions.

**Benefits:**
- Prevents **abrupt program termination**.
- Separates **error handling code** from main business logic.
- Provides a structured way to **recover from errors**.

**Example:**
- A file reading function wraps the operation in a try-catch block, catching \`FileNotFoundException\` and logging an error instead of crashing.`,
    imageUrls: ["/images/interview-questions/oop/Q34.png"],  
    imageCaptions: ["Figure 34: ★ Exception Handling"],
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Oracle"],
  },
  {
    id: 35,
    question: "What is garbage collection in OOP?",
    answer: `Garbage collection in OOP refers to **automatic memory management** that frees up memory by removing objects no longer in use. This prevents memory leaks and related errors caused by improper handling of multiple objects in memory.

**How it Works:**
- The garbage collector runs **in the background** and identifies objects with no active references.
- Once an object becomes **unreachable** (no references pointing to it), it is eligible for collection.
- The collector then **deallocates that memory** and makes it available for new objects.

**Languages with Automatic GC:**
- **Java** — uses the JVM garbage collector (Mark and Sweep, G1GC, etc.).
- **Python** — uses reference counting with a cyclic garbage collector.
- **C#** — uses the .NET CLR garbage collector.

**Languages without Automatic GC:**
- **C++** — requires **manual memory management** using \`new\` and \`delete\`, or smart pointers.

**Benefits:**
- Prevents **memory leaks**.
- Reduces **developer burden** of manual memory management.
- Improves **program stability**.`,
    imageUrls: ["/images/interview-questions/oop/Q35.png"],
    imageCaptions: ["Figure 35: ★ Garbage Collection Process"],
    companies: ["Google", "Microsoft", "Amazon", "Oracle", "TCS"],
  },
  {
    id: 36,
    question: "Can a Java application run without using OOP concepts?",
    answer: `**No**, Java applications rely **fundamentally on OOP concepts** and cannot run without them.

**Why:**
- Every Java program must have at least one **class** — the basic unit of OOP.
- The \`main\` method itself must be inside a class: \`public static void main(String[] args)\`.
- Java was designed from the ground up as an **object-oriented language**.
- All Java code is organized into classes and objects, making OOP unavoidable.

**Contrast with C++:**
- **C++** supports **both OOP and procedural programming**.
- A C++ program can be written without any classes or objects, purely using functions and structs.
- This makes C++ a **multi-paradigm language**, whereas Java is strictly object-oriented.

**Note:**
- While Java has static methods (which can be called without objects), they must still be defined inside a class.
- Java 8 introduced functional programming features (lambdas, streams) but these still operate within the OOP framework.`,
    companies: ["Oracle", "TCS", "Infosys", "Wipro", "Cognizant"],
  },
  {
    id: 37,
    question: "Is it always necessary to create objects from a class?",
    answer: `**No**, it is not always necessary to create objects from a class.

**When Objects ARE Required:**
- When calling **non-static (instance) methods** — these methods operate on object-specific data and require an instance.
- When accessing **non-static data members** — each object has its own copy of instance variables.

**When Objects ARE NOT Required:**
- **Static methods** can be called directly using the **class name** without creating an object.
- **Static variables** are shared across all instances and can be accessed via the class name.
- **Abstract classes** cannot be instantiated at all.
- **Utility classes** (like Java's \`Math\` class) are designed to be used without object creation.

**Examples:**
\`\`\`java
// No object needed — static method
Math.sqrt(16);

// Object needed — instance method
Car myCar = new Car();
myCar.accelerate();
\`\`\`

**Design Pattern:**
- The **Singleton pattern** restricts object creation to exactly one instance.
- The **Static Factory** pattern uses static methods to create objects indirectly.`,
    companies: ["Microsoft", "Google", "Amazon", "TCS", "Wipro"],
  },
  {
    id: 38,
    question: "What will be the output of the following code involving multiple inheritance in C++?",
    answer: `**Output:**
\`\`\`
BaseClass1 constructor called
BaseClass2 constructor called
DerivedClass constructor called
\`\`\`

**Explanation:**
In **multiple inheritance**, when the derived class constructor is invoked, it automatically calls the base classes' constructors in **left-to-right order** as specified in the derived class declaration.

For example, if the derived class is declared as:
\`\`\`cpp
class DerivedClass : public BaseClass1, public BaseClass2
\`\`\`

Then:
- \`BaseClass1\` constructor is called **first**.
- \`BaseClass2\` constructor is called **second**.
- \`DerivedClass\` constructor is called **last**.

**Destruction** happens in the **reverse order**:
- \`DerivedClass\` destructor → \`BaseClass2\` destructor → \`BaseClass1\` destructor.`,
    imageUrls: ["/images/interview-questions/oop/Q38.png"],  
    imageCaptions: ["Figure 38: ★ Multiple Inheritance"],
    companies: ["Microsoft", "Google", "Adobe", "Qualcomm", "Amazon"],
  },
  {
    id: 39,
    question: "What will be the output of the following Java code with static blocks?",
    answer: `**Output:**
\`\`\`
b
c
a
100
\`\`\`

**Explanation:**
- **Static blocks** in Java execute **before the main method**, in the order they appear in the class.
- The static block inside the main class executes first, printing \`b\`.
- Then the \`main\` method executes, printing the remaining values (\`c\`, \`a\`, \`100\`) in order.

**Key Points about Static Blocks:**
- Static blocks run **once** when the class is first loaded by the JVM.
- They execute **before** any object is created or any static method is called.
- Multiple static blocks execute in the **order they are defined**.
- Commonly used for **static variable initialization** that requires complex logic.`,
    companies: ["Oracle", "Amazon", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 40,
    question: "What will the output be for the overloaded main method in Java shown below?",
    answer: `**Output:**
\`\`\`
Main1
\`\`\`

**Explanation:**
- The \`main()\` method is overloaded, but the **JVM only recognizes the main method with a \`String[]\` parameter** as the entry point.
- The overloaded \`main\` with a different signature is treated as a **regular method** and is ignored by the JVM at startup.
- Therefore, only the standard \`public static void main(String[] args)\` executes, printing \`Main1\`.

**Key Rule:**
- JVM entry point signature: \`public static void main(String[] args)\`
- Any other overloaded version of \`main\` **will not be called automatically** by the JVM.
- It can only be called **explicitly** like any other static method from within the program.`,
    companies: ["Oracle", "Google", "Amazon", "TCS", "Infosys"],
  },
  {
    id: 41,
    question: "Can you predict the output of the type conversion constructor example in C++?",
    answer: `**Output:**
\`\`\`
i = 10
i = 20
\`\`\`

**Explanation:**
- **ClassA** contains a **conversion constructor**, which allows objects of ClassA to be initialized with integer values.
- Thus, the statement \`g(20)\` works successfully because the integer \`20\` is implicitly converted to a ClassA object using the conversion constructor.
- Additionally, **ClassB** has an **overloaded conversion operator**, which makes the statement \`g(b)\` valid as well — the object \`b\` of ClassB is converted to ClassA using the conversion operator.

**Key Concepts:**
- A **conversion constructor** enables implicit conversion from one type to a class type.
- A **conversion operator** enables implicit conversion from a class type to another type.
- Both enable flexible and seamless type conversions in C++.`,
    companies: ["Microsoft", "Google", "Adobe", "Qualcomm", "Amazon"],
  },
  {
    id: 42,
    question: "Can you predict the output related to the diamond problem and sizeof operator in C++?",
    answer: `**Output:**
\`\`\`
80
\`\`\`

**Explanation:**
- If the size of an integer is **4 bytes**, the output will be **80**.
- This occurs because both \`DerivedBaseClass1\` and \`DerivedBaseClass2\` inherit from \`BaseClass\`.
- As a result, \`DerivedClass\` contains **two copies of BaseClass** — one from each intermediate class.
- This **duplication** results in wasted space and a larger size output.

**The Diamond Problem:**
- Occurs in multiple inheritance when two classes inherit from the same base class, and another class inherits from both.
- If B and C both inherit from A, and D inherits from both B and C, then D contains **two copies of A**, causing ambiguity.

**Solution — Virtual Inheritance:**
- Using \`virtual\` base class ensures only **one shared copy** of the base class exists:
\`\`\`cpp
class DerivedBaseClass1 : virtual public BaseClass { };
class DerivedBaseClass2 : virtual public BaseClass { };
\`\`\``,
    imageUrls: ["/images/interview-questions/oop/Q42.png"],
    imageCaptions: ["Figure 42: ★ Diamond Problem in C++"],  
    companies: ["Microsoft", "Google", "Adobe", "Qualcomm", "Amazon"],
  },
  {
    id: 43,
    question: "What is the output of the below C++ program demonstrating multilevel inheritance?",
    answer: `**Output:**
\`\`\`
Inside B
\`\`\`

**Explanation:**
- The program implements a **multilevel inheritance** hierarchy.
- When a method is called, C++ **linearly searches up the class hierarchy** until it finds a matching function.
- Since both classes A and B have a \`print()\` method, the method defined in **class B is called** — because B is the most derived class that defines \`print()\` before reaching A.

**Key Rule:**
- In multilevel inheritance, the **most derived class's method** takes precedence.
- The search starts from the **most derived class** and moves upward to base classes.
- This is an example of **method overriding** in action within an inheritance chain.`,
    companies: ["Microsoft", "Google", "Adobe", "Qualcomm", "Amazon"],
  },
  {
    id: 44,
    question: "What is a class?",
    answer: `A class can be understood as a **blueprint or template** that contains member data (values) and behaviors (functions).

**Key Points:**
- When an object is created, it automatically **inherits the data and functions** defined in the class.
- A class serves as a template for creating objects, and **multiple objects** can be created from the same class.
- The class itself **does not occupy memory** — memory is allocated only when objects are instantiated.

**Components of a Class:**
- **Data Members:** Variables that hold the state of objects.
- **Member Functions:** Methods that define the behavior of objects.
- **Access Specifiers:** Control the visibility of members (public, private, protected).
- **Constructors/Destructors:** Special methods for object lifecycle management.

**Example:**
- A \`Car\` class template can be created first with attributes like \`color\`, \`brand\`, and \`speed\`.
- Then many individual car objects (e.g., \`myCar\`, \`yourCar\`) are instantiated based on that template.`,
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Cognizant"],
  },
  {
    id: 45,
    question: "What is an object?",
    answer: `An object is an **instance of a class** that contains the actual instances of the members and behaviors defined by the class template.

**Real-World Analogy:**
- In the real world, an object is a **tangible entity** with which users interact.
- A **class** is only the blueprint; an **object** is the actual realization of that blueprint.

**Key Characteristics:**
- **State:** The current values of its data members (e.g., a car's color = "red", speed = 60).
- **Behavior:** Actions it can perform via its methods (e.g., \`accelerate()\`, \`brake()\`).
- **Identity:** Each object has a unique identity distinguishing it from other objects.
- **Memory:** Objects **occupy memory** when instantiated.

**Example:**
- From a \`Car\` class, a specific car (e.g., a red Toyota at 60 km/h) is an **object**.
- Multiple objects can exist from the same class, each with its own state but sharing the same behavior definitions.`,
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 46,
    question: "What is encapsulation?",
    answer: `Encapsulation can be visualized as the process of **placing all necessary data and methods inside a capsule** and presenting this capsule to the user, hiding unnecessary details.

**Two Key Aspects:**

**Data Hiding:**
- Encapsulation hides unwanted information by **restricting access to object members** using access specifiers (private, protected).
- Prevents unauthorized external access to sensitive data.

**Data Binding:**
- **Binds data members and methods together** as a single unit, typically in a class.
- Ensures that data and the operations on it are always kept together.

**Benefits:**
- **Security:** Sensitive data is protected from external interference.
- **Flexibility:** Internal implementation can change without affecting external code.
- **Maintainability:** Changes are localized within the class.
- **Control:** Access is provided through controlled interfaces (getters/setters).

**Example:**
- A \`BankAccount\` class with a private \`balance\` field — users can only interact with it through \`deposit()\`, \`withdraw()\`, and \`getBalance()\` methods.`,
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Wipro"],
  },
  {
    id: 47,
    question: "What is inheritance?",
    answer: `Inheritance means **receiving certain qualities or behaviors from a parent to an offspring**. In OOP, it is the mechanism by which a child class or object is created using the definition of a parent class.

**Purpose:**
- **Simplifies implementation** by reusing existing code.
- **Facilitates code reuse** — no need to rewrite existing functionality.
- Enables **runtime polymorphism** through method overriding.

**Key Terminology:**
- **Parent / Base / Superclass:** The class being inherited from.
- **Child / Derived / Subclass:** The class that inherits.

**What Gets Inherited:**
- Public and protected data members and methods of the parent class.
- Private members exist in memory but are not directly accessible.

**Types:** Single, Multiple, Multilevel, Hierarchical, and Hybrid inheritance.

**Example:**
- A \`Vehicle\` parent class with attributes like \`speed\` and \`fuel\`. \`Car\`, \`Truck\`, and \`Bus\` child classes inherit these common attributes while adding their own specific features.`,
    companies: ["Amazon", "Google", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 48,
    question: "Can you explain inheritance with an example?",
    answer: `Inheritance is a key feature of OOP where an entity **inherits characteristics and behaviors from another entity** and adopts them as its own.

**Real-World Example — Vehicles:**

Consider vehicles like cars, trucks, and buses. They have **distinct features** but share **common components** such as:
- Steering wheel
- Accelerator
- Clutch
- Brakes

**Without Inheritance:**
- Each vehicle class would need to define steering, accelerator, clutch, and brakes **from scratch**, leading to code duplication.

**With Inheritance:**
- A \`Vehicle\` base class defines these common components once.
- \`Car\`, \`Truck\`, and \`Bus\` classes **inherit** from \`Vehicle\` and only define their unique features.

\`\`\`java
class Vehicle {
    void applyBrakes() { System.out.println("Brakes applied"); }
    void steer() { System.out.println("Steering"); }
}
class Car extends Vehicle {
    void openSunroof() { System.out.println("Sunroof opened"); }
}
\`\`\`

**Benefits shown:**
- **Code reuse** — common code written once.
- **Extensibility** — new vehicle types easily added.
- **Maintainability** — changes to brakes only needed in one place.`,
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Cognizant"],
  },
  {
    id: 49,
    question: "What is a copy constructor?",
    answer: `A copy constructor is a **special type of constructor that initializes a new object by copying an existing object** of the same class. Essentially, it clones the object and its values into another object.

**Key Characteristics:**
- Both objects must belong to the **same class**.
- In C++, the signature is: \`ClassName(const ClassName &obj)\`
- Called automatically when an object is **passed by value**, **returned by value**, or **explicitly copied**.

**Types of Copy:**

**Shallow Copy:**
- Copies the object's values, including **memory addresses** for pointer members.
- Both objects share the same memory — changes in one affect the other.
- Default copy constructor performs a shallow copy.

**Deep Copy:**
- Creates **independent copies** of dynamically allocated memory.
- Changes in one object do **not affect** the other.
- Must be explicitly implemented when a class has pointer members.

**Language Notes:**
- **C++:** Has built-in copy constructor support.
- **Python:** Lacks built-in copy constructors but offers the \`copy\` module (\`copy.copy()\` for shallow, \`copy.deepcopy()\` for deep).
- **Java:** No copy constructor by default; achieved via cloning or manually defined constructors.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
  {
    id: 50,
    question: "What is a destructor?",
    answer: `Unlike constructors which initialize objects and allocate memory, destructors are **special methods that free the resources and memory occupied by an object**. They are automatically called when an object is destroyed or goes out of scope.

**Key Characteristics:**
- **Cannot be overloaded** — only one destructor per class.
- Takes **no parameters** and has **no return type**.
- Called **automatically** — no need to invoke explicitly.
- Executes in **reverse order** of constructor calls.

**Language Variations:**
- **C++:** Named \`~ClassName()\`. Example: \`~Car() { }\`
- **Python:** Named \`__del__\`.
- **Java:** No destructors — the **garbage collector** handles memory. \`finalize()\` is deprecated since Java 9.

**Purpose:**
- Release **dynamically allocated memory** to prevent memory leaks.
- Close **file handles, database connections, or network sockets**.
- Perform any necessary **cleanup operations** before the object is removed.

**Example:**
- A \`DatabaseConnection\` destructor that **closes the connection** and releases the connection pool slot when the object goes out of scope.`,
    companies: ["Microsoft", "Google", "Amazon", "Adobe", "Qualcomm"],
  },
];
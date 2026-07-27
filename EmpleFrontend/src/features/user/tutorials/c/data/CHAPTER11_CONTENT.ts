export const CHAPTER11_CONTENT = {
  title: "Structures and Unions",
  description: "In C, arrays allow you to store multiple elements of the same data type. However, real-world data is often a collection of different data types. For instance, a student has a name (string), roll number (integer), and marks (float). Structures and Unions are user-defined data types that allow you to combine different data types under a single name, making data management significantly easier and more intuitive.",
  points: [
    {
      heading: "Introduction to Structures",
      body: "A structure is a user-defined data type in C that groups logically related variables of different data types together under a single name. You define a structure using the `struct` keyword.\n\nExample:\n```c\nstruct Student {\n    char name[50];\n    int roll;\n    float marks;\n};\n```\nHere, `Student` is the structure name, and `name`, `roll`, and `marks` are its members."
    },
    {
      heading: "Accessing Structure Members",
      body: "Structure members are accessed using the dot operator (`.`) for normal structure variables, and the arrow operator (`->`) for structure pointers.\n\nExample:\n```c\nstruct Student s1;\ns1.roll = 101;\nprintf(\"Roll: %d\", s1.roll);\n```"
    },
    {
      heading: "Arrays of Structures",
      body: "Just like arrays of basic types, you can create arrays of structures to store multiple records. This is highly useful for databases or lists of entities.\n\nExample:\n```c\nstruct Student class[60]; // Array of 60 students\nclass[0].roll = 1;\n```"
    },
    {
      heading: "Introduction to Unions",
      body: "A union is similar to a structure, but it allocates a single shared memory location for all its members. The size of the union is equal to the size of its largest member. It can only store one member's value at a given time.\n\nExample:\n```c\nunion Data {\n    int i;\n    float f;\n    char str[20];\n};\n```"
    },
    {
      heading: "Structures vs Unions",
      body: "The primary difference lies in memory allocation. A structure allocates separate memory for each member, while a union shares memory among all members. Modifying one member in a union will overwrite the value of the other members. Structures are used when all members are needed simultaneously, whereas unions are used when only one member is needed at a time, conserving memory."
    }
  ],
  codeDescription: "Comprehensive Example",
  code: `#include <stdio.h>
#include <string.h>

// Defining a structure
struct Employee {
    int id;
    char name[50];
    float salary;
};

// Defining a union
union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    // Using the structure
    struct Employee emp1;
    emp1.id = 101;
    strcpy(emp1.name, "John Doe");
    emp1.salary = 55000.50;

    printf("Employee Details:\\n");
    printf("ID: %d\\n", emp1.id);
    printf("Name: %s\\n", emp1.name);
    printf("Salary: %.2f\\n\\n", emp1.salary);

    // Using the union
    union Data data;
    
    data.i = 10;
    printf("Union Data after setting integer:\\n");
    printf("data.i : %d\\n", data.i);

    data.f = 220.5;
    printf("Union Data after setting float:\\n");
    // Notice that printing data.i here would give garbage because memory is overwritten
    printf("data.f : %.1f\\n", data.f);

    strcpy(data.str, "C Programming");
    printf("Union Data after setting string:\\n");
    printf("data.str : %s\\n", data.str);

    return 0;
}`
};

export const CHAPTER11_DEBUG = [
  {
    title: "Structure Assignment",
    instruction: "Fix the bug in the following code so that the string is properly copied to the structure member.",
    buggy: `#include <stdio.h>
#include <string.h>

struct Book {
    char title[50];
    int pages;
};

int main() {
    struct Book b1;
    b1.title = "C Programming";
    b1.pages = 300;
    printf("%s", b1.title);
    return 0;
}`,
    fixed: `#include <stdio.h>
#include <string.h>

struct Book {
    char title[50];
    int pages;
};

int main() {
    struct Book b1;
    strcpy(b1.title, "C Programming");
    b1.pages = 300;
    printf("%s", b1.title);
    return 0;
}`,
    expectedOutput: "C Programming",
    hints: ["Arrays in C cannot be assigned using the '=' operator.", "Use a string manipulation function from <string.h>."]
  },
  {
    title: "Structure Pointer Access",
    instruction: "Fix the bug in the pointer access to print the student's ID.",
    buggy: `#include <stdio.h>

struct Student {
    int id;
};

int main() {
    struct Student s1 = {101};
    struct Student *ptr = &s1;
    printf("%d", *ptr.id);
    return 0;
}`,
    fixed: `#include <stdio.h>

struct Student {
    int id;
};

int main() {
    struct Student s1 = {101};
    struct Student *ptr = &s1;
    printf("%d", ptr->id);
    return 0;
}`,
    expectedOutput: "101",
    hints: ["The dot operator (.) has higher precedence than the dereference operator (*).", "Use the arrow operator (->) for structure pointers."]
  },
  {
    title: "Union Size and Access",
    instruction: "Fix the code to correctly print the float value stored in the union.",
    buggy: `#include <stdio.h>

union Data {
    int i;
    float f;
};

int main() {
    union Data d;
    d.f = 3.14;
    d.i = 10;
    printf("%.2f", d.f);
    return 0;
}`,
    fixed: `#include <stdio.h>

union Data {
    int i;
    float f;
};

int main() {
    union Data d;
    d.i = 10;
    d.f = 3.14;
    printf("%.2f", d.f);
    return 0;
}`,
    expectedOutput: "3.14",
    hints: ["A union shares memory across all its members.", "Assigning a value to one member overwrites the others. Set 'd.f' right before printing it."]
  }
];

export const CHAPTER11_COMPLETE = [
  {
    instruction: "Fill in the blanks to declare and initialize a structure.",
    template: `#include <stdio.h>

___ Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, ___};
    printf("%d %d", p1.x, p1.y);
    return 0;
}`,
    answer: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    printf("%d %d", p1.x, p1.y);
    return 0;
}`,
    blanks: ["struct", "20"]
  },
  {
    instruction: "Fill in the blanks to correctly access structure members using a pointer.",
    template: `#include <stdio.h>

struct Item {
    int price;
};

int main() {
    struct Item item1 = {50};
    struct Item *ptr = ___item1;
    printf("%d", ptr___price);
    return 0;
}`,
    answer: `#include <stdio.h>

struct Item {
    int price;
};

int main() {
    struct Item item1 = {50};
    struct Item *ptr = &item1;
    printf("%d", ptr->price);
    return 0;
}`,
    blanks: ["&", "->"]
  }
];

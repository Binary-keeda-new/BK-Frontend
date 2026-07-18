export const CHAPTER15_COMPLETE = [
  {
    instruction: "Fill in the blanks to define a macro for the constant PI and use it to calculate the area of a circle.",
    template: `#include <stdio.h>\n___ PI 3.14159\n\nint main() {\n    float radius = 5.0;\n    float area = PI * ___ * radius;\n    printf("Area: %.2f", area);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n#define PI 3.14159\n\nint main() {\n    float radius = 5.0;\n    float area = PI * radius * radius;\n    printf("Area: %.2f", area);\n    return 0;\n}`,
    blanks: ["#define", "radius"]
  },
  {
    instruction: "Fill in the blanks to complete the conditional compilation directive that checks if 'VERSION' is not defined.",
    template: `#include <stdio.h>\n\n___ VERSION\n#define VERSION 1\n___\n\nint main() {\n    printf("Version: %d", VERSION);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n\n#ifndef VERSION\n#define VERSION 1\n#endif\n\nint main() {\n    printf("Version: %d", VERSION);\n    return 0;\n}`,
    blanks: ["#ifndef", "#endif"]
  }
];

export const CHAPTER14_CONTENT = {
  title: "Bitwise Programming",
  description: "Bitwise programming in C involves manipulating individual bits within integer data types. By operating directly at the bit level, developers can optimize code for performance and memory, especially in embedded systems, cryptography, and low-level hardware interactions. C provides a set of powerful operators such as AND, OR, XOR, NOT, and shifts to perform these bit-level operations efficiently.",
  points: [
    {
      heading: "Bitwise AND, OR, and XOR",
      body: `The bitwise AND (\`&\`) operator compares corresponding bits of two operands and yields 1 if both bits are 1. The bitwise OR (\`|\`) yields 1 if at least one bit is 1. The bitwise XOR (\`^\`) yields 1 if exactly one of the bits is 1.

Example:
\`\`\`c
int a = 5;  // 0101
int b = 3;  // 0011
int and_res = a & b; // 0001 (1)
int or_res = a | b;  // 0111 (7)
int xor_res = a ^ b; // 0110 (6)
\`\`\``
    },
    {
      heading: "Bitwise NOT",
      body: `The bitwise NOT (\`~\`) is a unary operator that inverts all the bits of its operand, turning 1s to 0s and 0s to 1s. This is also known as the one's complement.

Example:
\`\`\`c
int a = 5; // 0000...0101
int not_a = ~a; // 1111...1010 (depends on integer size)
\`\`\``
    },
    {
      heading: "Left Shift and Right Shift",
      body: `The left shift operator (\`<<\`) moves the bits of its first operand to the left by the number of positions specified by the second operand. This effectively multiplies the number by 2 for each shift. The right shift operator (\`>>\`) moves bits to the right, effectively dividing by 2.

Example:
\`\`\`c
int a = 5; // 0101
int left = a << 1; // 1010 (10)
int right = a >> 1; // 0010 (2)
\`\`\``
    },
    {
      heading: "Setting, Clearing, and Toggling Bits",
      body: `Bitwise operators are commonly used to manipulate specific bits (bit masking). To set a bit, use bitwise OR (\`|\`). To clear a bit, use bitwise AND with a NOT mask (\`& ~\`). To toggle a bit, use bitwise XOR (\`^\`).

Example:
\`\`\`c
int num = 0; // 0000
num |= (1 << 2);  // Set bit 2: 0100
num &= ~(1 << 2); // Clear bit 2: 0000
num ^= (1 << 2);  // Toggle bit 2: 0100
\`\`\``
    },
    {
      heading: "Checking if a Bit is Set",
      body: `To check if a specific bit is set (i.e., is 1), you can use the bitwise AND operator with a mask that has only that bit set. If the result is non-zero, the bit is set.

Example:
\`\`\`c
int num = 5; // 0101
if (num & (1 << 2)) {
    printf("Bit 2 is set!\\n");
}
\`\`\``
    }
  ],
  codeDescription: "A comprehensive example demonstrating various bitwise operations including setting, clearing, toggling, and checking bits in an integer.",
  code: `#include <stdio.h>

void printBinary(unsigned int num) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (num >> i) & 1);
    }
    printf("\\n");
}

int main() {
    unsigned int flags = 0; // 00000000
    
    // 1. Set bit 3
    flags |= (1 << 3);
    printf("After setting bit 3:   ");
    printBinary(flags);
    
    // 2. Set bit 5
    flags |= (1 << 5);
    printf("After setting bit 5:   ");
    printBinary(flags);
    
    // 3. Clear bit 3
    flags &= ~(1 << 3);
    printf("After clearing bit 3:  ");
    printBinary(flags);
    
    // 4. Toggle bit 1
    flags ^= (1 << 1);
    printf("After toggling bit 1:  ");
    printBinary(flags);
    
    // 5. Check if bit 5 is set
    if (flags & (1 << 5)) {
        printf("Bit 5 is currently SET.\\n");
    }
    
    return 0;
}`
};

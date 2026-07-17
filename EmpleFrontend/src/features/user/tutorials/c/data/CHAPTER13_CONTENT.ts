export const CHAPTER13_CONTENT = {
  title: "File Handling in C",
  description: "File handling in C enables programs to store data permanently on secondary storage devices, allowing information to persist beyond the program's execution time. By using standard library functions, developers can create, read, write, and manipulate files efficiently. Mastering file I/O operations is crucial for tasks like logging, data processing, and configuration management in real-world applications.",
  points: [
    {
      heading: "File Pointers and fopen",
      body: "In C, a file is represented by a `FILE` pointer. The `fopen()` function is used to open a file and associate it with a stream. It takes two arguments: the filename and the mode (e.g., \"r\" for read, \"w\" for write, \"a\" for append).\\n\\nExample:\\n```c\\nFILE *fp;\\nfp = fopen(\"data.txt\", \"w\");\\nif (fp == NULL) {\\n    printf(\"Error opening file.\\n\");\\n}\\n```"
    },
    {
      heading: "Writing to a File",
      body: "Functions like `fprintf()`, `fputs()`, and `fputc()` are used to write data to a file. `fprintf()` works similarly to `printf()` but takes a file pointer as its first argument.\\n\\nExample:\\n```c\\nFILE *fp = fopen(\"output.txt\", \"w\");\\nif (fp != NULL) {\\n    fprintf(fp, \"Hello, File!\\n\");\\n    fclose(fp);\\n}\\n```"
    },
    {
      heading: "Reading from a File",
      body: "To read data, C provides functions like `fscanf()`, `fgets()`, and `fgetc()`. `fgets()` is commonly used to read a line of text safely, preventing buffer overflows.\\n\\nExample:\\n```c\\nchar buffer[100];\\nFILE *fp = fopen(\"input.txt\", \"r\");\\nif (fp != NULL) {\\n    while (fgets(buffer, sizeof(buffer), fp) != NULL) {\\n        printf(\"%s\", buffer);\\n    }\\n    fclose(fp);\\n}\\n```"
    },
    {
      heading: "Closing a File",
      body: "It is essential to close a file using `fclose()` once operations are complete. This ensures that all buffers are flushed to disk and system resources are freed.\\n\\nExample:\\n```c\\nFILE *fp = fopen(\"data.txt\", \"r\");\\n// ... read or write operations\\nfclose(fp);\\n```"
    },
    {
      heading: "Binary File I/O",
      body: "For non-text data, binary modes (\"rb\", \"wb\") are used along with `fread()` and `fwrite()` functions. This allows for reading and writing complex data structures directly.\\n\\nExample:\\n```c\\nstruct Record { int id; float value; };\\nstruct Record rec = {1, 99.5};\\nFILE *fp = fopen(\"data.bin\", \"wb\");\\nif (fp != NULL) {\\n    fwrite(&rec, sizeof(struct Record), 1, fp);\\n    fclose(fp);\\n}\\n```"
    }
  ],
  codeDescription: "A comprehensive example demonstrating opening, writing, reading, and closing a file using text mode.",
  code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fp;
    char buffer[255];

    // 1. Open for writing
    fp = fopen("example.txt", "w");
    if (fp == NULL) {
        printf("Error opening file for writing!\\n");
        return 1;
    }
    
    // Write data to the file
    fprintf(fp, "Learning File Handling in C.\\n");
    fprintf(fp, "This is the second line.\\n");
    fclose(fp); // Always close the file
    
    // 2. Open for reading
    fp = fopen("example.txt", "r");
    if (fp == NULL) {
        printf("Error opening file for reading!\\n");
        return 1;
    }
    
    // Read data line by line
    printf("File contents:\\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    
    fclose(fp);
    return 0;
}`
};

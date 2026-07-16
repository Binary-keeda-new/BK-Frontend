export const CHAPTER8_COMPLETE = [
  {
    instruction: "Fill in the blanks to complete the code to initialize an array and print its first element.",
    template: `int main() {
  int arr[3] = {___, 2, 3};
  printf("%d", arr[___]);
  return 0;
}`,
    answer: `int main() {
  int arr[3] = {1, 2, 3};
  printf("%d", arr[0]);
  return 0;
}`,
    blanks: ["1", "0"]
  },
  {
    instruction: "Fill in the blanks to correctly loop through a 2D array matrix of size 2x2 and print the elements.",
    template: `int main() {
  int mat[2][2] = {{1,2}, {3,4}};
  for(int i = 0; i < ___; i++) {
    for(int j = 0; j < 2; j++) {
      printf("%d ", mat[i][___]);
    }
  }
  return 0;
}`,
    answer: `int main() {
  int mat[2][2] = {{1,2}, {3,4}};
  for(int i = 0; i < 2; i++) {
    for(int j = 0; j < 2; j++) {
      printf("%d ", mat[i][j]);
    }
  }
  return 0;
}`,
    blanks: ["2", "j"]
  }
];

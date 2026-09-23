export const CHAPTER2_DRAG = [
  {
    instructions: "Order these growth functions from slowest growing to fastest growing.",
    lines: [
      { id: "1", text: "log n" },
      { id: "2", text: "n log n" },
      { id: "3", text: "n^2" },
      { id: "4", text: "2^n" },
      { id: "5", text: "n" }
    ],
    order: ["1", "5", "2", "3", "4"]
  },
  {
    instructions: "Arrange the steps to compute binary representation of a number.",
    lines: [
      { id: "1", text: "Record the remainder" },
      { id: "2", text: "Take modulo 2 of the number" },
      { id: "3", text: "Reverse the recorded remainders" },
      { id: "4", text: "Divide the number by 2" }
    ],
    order: ["2", "1", "4", "3"]
  }
];
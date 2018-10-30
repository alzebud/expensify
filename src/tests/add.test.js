const add = (a, b) => a + b;
const generateGreeting = (name = "anonymous") => `Hello ${name}!`;

test("should add two numbers", () => {
  const result = add(3, 4);
  // if (result !== 7) {
  //   throw new Error(`you added 3 and 4; the result was ${result}; expected: 7`);
  // }
  expect(result).toBe(7);
});

test("should generate greeting from name", () => {
  const result = generateGreeting("Arnold");
  expect(result).toBe("Hello Arnold!");
});

test("should generate greeting from name", () => {
  const result = generateGreeting();
  expect(result).toBe("Hello anonymous!");
});
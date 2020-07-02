module.exports = number => {
  const numbers = { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 0: "zero" };
  let text = "";

  for (let i = 0; i < `${number}`.length; i++) {
    text += `:${numbers[parseInt(`${number}`[i])]}:`
  }
  return text;
};

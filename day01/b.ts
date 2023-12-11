const words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const reverse = (x: string) => x.split("").reverse().join("");

const regex = new RegExp(`\\d|${words.join("|")}`);
const reverseRegex = new RegExp(
  `\\d|${(words.map(reverse)).join("|")}`,
);
const res = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split("\n")
  .map((line: string) => {
    const a = line.match(regex)?.at(0)!;
    const b = reverse(reverse(line).match(reverseRegex)?.at(0)!);
    return [a, b].map((n) => n.length > 1 ? `${words.indexOf(n)}` : n).join("");
  })
  .reduce((a: number, c: string) => a + parseInt(c), 0);
console.log(res);

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

const regex = new RegExp(`\\d|${words.join("|")}`);
const lastregex = new RegExp(`.*(\\d|${words.join("|")})`)

const res = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split("\n")
  .map((line: string) => {
    const a = line.match(regex)?.at(0)!;
    const b = line.match(lastregex)?.at(1);
    return [a, b].map((n) => n.length > 1 ? `${words.indexOf(n)}` : n).join("");
  })
  .reduce((a: number, c: string) => a + parseInt(c), 0);
console.log(res);

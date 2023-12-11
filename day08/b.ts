const regex = /(?<Key>\w+) = \((?<L>\w+),\s(?<R>\w+)\)/;

const file = await Deno.readTextFile("./input.txt");

const [path, map_text] = file.split("\n\n");

const mapIV: {
  [key: string]: string[];
} = {};

const lines = map_text
  .split("\n")
  .map((l) => {
    const groups = l.match(regex)?.groups;
    return {
      key: groups?.Key ?? "oops",
      value: [groups?.L ?? "oops", groups?.R ?? "oops"],
    };
  })
  .reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, mapIV);

function get(key: string, value: string) {
  return lines[key][+!(value == "L")];
}
const pathArr = path.split("");

const starts = Object.keys(lines).filter((l) => l.endsWith("A"));
function solve(s: string) {
  let i = 0;
  let current = s;

  while (!current.endsWith("Z")) {
    current = get(current, pathArr[i % pathArr.length]);
    i++;
  }

  return i;
}
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

const res = (
  await Promise.all(
    starts.map(
      (s) =>
        new Promise((resolve, _) => {
          resolve(solve(s));
        }),
    ),
  )
).map((n) => n as number).reduce((acc, cur) => lcm(acc, cur), 1);

console.log(res);

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

let i = 0;
let cur = "AAA";
while (cur != "ZZZ") {
  const cPath = pathArr.at(i % pathArr.length)!;
  const next = get(cur, cPath);
  console.log("Cur: ", cur, "Path", cPath, "Next: ", next);
  cur = next;
  i++;
}

console.log(i);

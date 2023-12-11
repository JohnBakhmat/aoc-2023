const res = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split("\n")
  .map((line: string) => {
    const nums = line.match(/\d/g) as Array<string>;
    return nums?.at(0)! + nums?.at(-1)!;
  })
  .reduce((a: number, c: string) => a + parseInt(c), 0);
console.log(res);

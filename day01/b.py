import re

file = open("./input.txt", "r")
words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
counter = 0

regexF = re.compile("(\\d|" + "|".join(words)+")")
regexL = re.compile(".*(\\d|" + "|".join(words)+")")
while True:
    line = file.readline().strip()
    if not line:
        break

    a = re.search(regexF, line).group()
    b = re.findall(regexL, line)[-1]
    a = a if len(a) == 1 else words.index(a)
    b = b if len(b) == 1 else words.index(b)
    counter += int(str(a)+str(b))
print(counter)

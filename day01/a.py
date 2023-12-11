from os import read
import re

file = open("./input.txt", "r")

counter = 0
while True:
    line = file.readline()
    if not line:
        break

    numbers = list(re.findall(r"\d", line))
    n = numbers[0] + numbers[-1]
    counter += int(n)

print(counter)

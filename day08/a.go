package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

type MapEntry struct {
	L string
	R string
}

func Part1() {
	file, err := os.ReadFile("./input.txt")
	if err != nil {
		panic(err)
	}

	re := regexp.MustCompile(`(?P<K>\w+) = \((?P<L>\w+), (?P<R>\w+)\)`)
	data := strings.Split(strings.TrimSpace(string(file)), "\n\n")
	path := strings.Split(data[0], "")
	rawMap := data[1]
	parsedMap := map[string]MapEntry{}

	lines := strings.Split(rawMap, "\n")
	for _, v := range lines {
		submatches := re.FindStringSubmatch(v)
		names := re.SubexpNames()
		result := map[string]string{}

		for i, name := range names {
			if i != 0 && name != "" {
				result[name] = submatches[i]
			}
		}
		parsedMap[result["K"]] = MapEntry{
			L: result["L"],
			R: result["R"],
		}
	}

	solve := func(start string) int {
		cur := start
		counter := 0
		for cur != "ZZZ" {
			nextDir := path[counter%len(path)]
			next := parsedMap[cur]
			if nextDir == "L" {
				cur = next.L
			} else {
				cur = next.R
			}
			counter++
		}
		return counter
	}

	fmt.Printf("Part1 res: {%d}\n", solve("AAA"))
}

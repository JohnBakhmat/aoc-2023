package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
	"sync"
)

func Part2() {
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
	keys := make([]string, len(lines))
	for i, v := range lines {
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
		keys[i] = result["K"]
	}

	solve := func(start string, data map[string]MapEntry, path []string) int {
		cur := start
		counter := 0
		for !strings.HasSuffix(cur, "Z") {
			nextDir := path[counter%len(path)]
			next := data[cur]
			if nextDir == "L" {
				cur = next.L
			} else {
				cur = next.R
			}
			counter++
		}
		return counter
	}

	starts := make([]string, 0, len(keys))

	for _, v := range keys {
		if strings.HasSuffix(v, "A") {
			starts = append(starts, v)
		}
	}

	var wg sync.WaitGroup

	wg.Add(len(starts))

	results := make(chan int, len(starts))

	for _, start := range starts {
		go func(s string, c chan int, data map[string]MapEntry, path []string) {
			defer wg.Done()
			res := solve(s, data, path)
			c <- res

		}(start, results, parsedMap, path)
	}

	go func() {
		wg.Wait()
		close(results)
	}()

	total := 1
	for res := range results {
		total = lcm(total, res)
	}

	fmt.Printf("Part2 {%d}", total)
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func lcm(a, b int) int {
	return (a * b) / gcd(a, b)
}

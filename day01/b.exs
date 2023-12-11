valid_numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
]

regex = ~r/(#{Enum.join(valid_numbers, "|")}|\d)/

File.read!("input.txt") 
|> String.split("\n", trim: true)
|> Enum.map(fn l ->
    l
    |> then(&Regex.scan(regex, &1))
    |> Enum.map(&Enum.at(&1, 0))
    |> Enum.map(fn n ->
      n
      |> then(&Regex.match?(~r/\d/, &1))
      |> if(do: n, else: valid_numbers |> Enum.find_index(&(&1 == n)))
      end)
    |> then(&"#{Enum.at(&1, 0)}#{Enum.at(&1, -1)}")
    |> String.to_integer()
    end)
  |> Enum.sum()
|> IO.inspect()

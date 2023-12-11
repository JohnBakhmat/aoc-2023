File.read!("./input.txt")
|> String.split("\n", trim: true)
|> Enum.map(fn l ->
    l
    |> then(&Regex.scan(~r/\d/, &1))
    |> List.flatten()
    |> then(&(Enum.at(&1, 0) <> Enum.at(&1, -1)))
    |> String.to_integer()
    end)
|> Enum.sum()
|> IO.inspect()

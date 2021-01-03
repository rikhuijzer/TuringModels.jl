# This file was generated, do not modify it. # hide
using DataFrames
using TuringModels # hide

import CSV

data_path = joinpath(TuringModels.project_root, "data", "UCBadmit.csv")
df = CSV.read(data_path, DataFrame; delim=';')

@assert size(df) == (12, 5) # hide
write_csv(name, data) = CSV.write(joinpath(@OUTPUT, "$name.csv"), data) # hide
write_csv("data", df) # hide
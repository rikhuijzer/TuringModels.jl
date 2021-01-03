# This file was generated, do not modify it. # hide
import CSV

using DataFrames
using TuringModels

data_path = joinpath(TuringModels.project_root, "data", "reedfrogs.csv")
df = CSV.read(data_path, DataFrame; delim=';');
@assert size(df) == (48, 5) # hide
df.tank = 1:nrow(df)
write_csv(name, data) = CSV.write(joinpath(@OUTPUT, "$name.csv"), data) # hide
write_csv("data", df) # hide
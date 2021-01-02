# This file was generated, do not modify it. # hide
using DataFrames
using Distributions
using Turing
using TuringModels # hide

import CSV

data_path = joinpath(TuringModels.project_root, "data", "rugged.csv")
df = CSV.read(data_path, DataFrame)
@assert size(df) == (234, 51) # hide

df.log_gdp = [log(x) for x in df.rgdppc_2000]

# When this (https://github.com/JuliaData/DataFrames.jl/pull/1546) hits DataFrame it'll be conceptually easier: i.e., completecases!(d, :rgdppc_2000)

notisnan(e) = !ismissing(e)
df = df[map(notisnan, df[:, :rgdppc_2000]), :];

df = select(df, :log_gdp, :rugged, :cont_africa)

write_csv(name, data) = CSV.write(joinpath(@OUTPUT, "$name.csv"), data) # hide
write_csv("data", df) # hide
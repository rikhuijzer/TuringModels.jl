# This file was generated, do not modify it. # hide
import CSV

using DataFrames
using StatsPlots
using Turing
using TuringModels

data_path = joinpath(TuringModels.project_root, "data", "Howell1.csv")
df = CSV.read(data_path, DataFrame; delim=';')

# Use only adults and center the weight observations
df2 = filter(row -> row.age >= 18, df)
mean_weight = mean(df2.weight)
df2.weight_c = df2.weight .- mean_weight

@model function line(x, y)
    alpha ~ Normal(178.0, 100.0)
    beta ~ Normal(0.0, 10.0)
    sigma ~ Uniform(0, 50)

    mu = alpha .+ beta*x
    y .~ Normal.(mu, sigma)
end
x = df2.weight_c
y = df2.height
chains = sample(line(x, y), NUTS(0.65), 1000)
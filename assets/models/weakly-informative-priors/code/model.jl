# This file was generated, do not modify it. # hide
using Turing

@model function m8_3(y)
    α ~ Normal(1, 10)
    σ ~ truncated(Cauchy(0, 1), 0, Inf)

    μ = α
    y .~ Normal(μ, σ)
end

chains = sample(m8_3(y), NUTS(0.65), 1000);
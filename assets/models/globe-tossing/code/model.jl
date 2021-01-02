# This file was generated, do not modify it. # hide
using DataFrames
using Turing

@model function globe_toss(n, k)
  θ ~ Beta(1, 1) # prior
  k ~ Binomial(n, θ) # model
  return k, θ
end

chains = sample(globe_toss(n, k), NUTS(0.65), 1000)
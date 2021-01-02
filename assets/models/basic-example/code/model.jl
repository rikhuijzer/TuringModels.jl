# This file was generated, do not modify it. # hide
import CSV

using DataFrames
using StatsPlots
using Turing

@model gdemo(x, y) = begin
  s ~ InverseGamma(2, 3)
  m ~ Normal(0, sqrt(s))
  x ~ Normal(m, sqrt(s))
  y ~ Normal(m, sqrt(s))
end
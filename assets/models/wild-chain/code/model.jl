# This file was generated, do not modify it. # hide
using Turing

@model m8_2(y) = begin
    σ ~ FlatPos(0.0) # improper prior with probability one everywhere above 0.0
    α ~ Flat() # improper prior with pobability one everywhere

    y .~ Normal(α, σ)
end

chains = sample(m8_2(y), NUTS(0.65), 1000)
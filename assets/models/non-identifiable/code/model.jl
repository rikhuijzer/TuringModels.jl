# This file was generated, do not modify it. # hide
using Turing

# Can't really set a Uniform[-Inf,Inf] on σ 

@model m8_4(y) = begin
    α₁ ~ Uniform(-3000, 1000)
    α₂ ~ Uniform(-1000, 3000)
    σ ~ truncated(Cauchy(0,1), 0, Inf)

    y .~ Normal(α₁ + α₂, σ)
end

chains = sample(m8_4(y), NUTS(0.65), 2000)
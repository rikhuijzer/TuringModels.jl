# This file was generated, do not modify it. # hide
using Turing

@model m13_1(cafe, afternoon, wait) = begin
    Rho ~ LKJ(2, 1.)
    sigma ~ truncated(Cauchy(0, 2), 0, Inf)
    sigma_cafe ~ filldist(truncated(Cauchy(0, 2), 0, Inf), 2)
    a ~ Normal(0, 10)
    b ~ Normal(0, 10)
    
    dist_mu = [a, b]
    dist_Sigma = sigma_cafe .* Rho .* sigma_cafe'
    dist_Sigma = (dist_Sigma' + dist_Sigma) / 2
    a_b_cafe ~ filldist(MvNormal(dist_mu, dist_Sigma), 20)
    
    a_cafe = a_b_cafe[1, :]
    b_cafe = a_b_cafe[2, :]
        
    μ = a_cafe[cafe] + b_cafe[cafe] .* afternoon
    wait .~ Normal.(μ, sigma)
end

chains = sample(
    m13_1(df.cafe, df.afternoon, df.wait),
    # This model fails on NUTS(0.65).
    Turing.NUTS(0.95),
    1000
)
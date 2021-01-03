# This file was generated, do not modify it. # hide
using Turing

@model reedfrogs(density, tank, surv, n_tanks) = begin
    a_tank ~ filldist(Normal(0, 1.5), n_tanks)

    logitp = a_tank[tank]
    surv .~ BinomialLogit.(density, logitp)
end

n_tanks = length(df.tank)
model = reedfrogs(df.density, df.tank, df.surv, n_tanks)
chains = sample(model, NUTS(0.65), 1000)
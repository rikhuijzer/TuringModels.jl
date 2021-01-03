# This file was generated, do not modify it. # hide
using Turing

@model reedfrogs(density, tank, surv, n) = begin
    a_tank ~ filldist(Normal(0, 1.5), n)

    logitp = a_tank[tank]
    surv .~ BinomialLogit.(density, logitp)
end

n = nrow(df)
model = reedfrogs(df.density, df.tank, df.surv, n)
chains = sample(model, NUTS(0.65), 1000)
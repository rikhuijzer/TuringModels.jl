using TuringModels

Turing.setadbackend(:reverse_diff);
#nbTuring.turnprogress(false);

μ = 1.4
σ = 1.5
nponds = 60
ni = repeat([5,10,25,35], inner=15);

a_pond = rand(Normal(μ, σ), nponds);

dsim = DataFrame(pond = 1:nponds, ni = ni, true_a = a_pond);

prob = logistic.(Vector{Real}(dsim[:true_a]));

dsim[:si] = [rand(Binomial(ni[i], prob[i])) for i = 1:nponds];

# Used only in the continuation of this example
dsim[:p_nopool] = dsim[:si] ./ dsim[:ni];

# Turing model

@model m12_3(pond, si, ni) = begin

    # Separate priors on μ and σ for each pond
    σ ~ Truncated(Cauchy(0, 1), 0, Inf)
    μ ~ Normal(0, 1)

    # Number of ponds in the data set
    N_ponds = length(pond)

    # vector for the priors for each pond
    a_pond = Vector{Real}(undef, N_ponds)

    # For each pond set a prior. Note the [] around Normal(), i.e.,
    a_pond ~ [Normal(μ, σ)]

    # Observation
    logitp = [a_pond[pond[i]] for i = 1:N_ponds]
    si ~ VecBinomialLogit(ni, logitp)

end

# Sample

posterior = sample(m12_3(Vector{Int64}(dsim[:pond]), Vector{Int64}(dsim[:si]),
    Vector{Int64}(dsim[:ni])), Turing.NUTS(4000, 1000, 0.8));
  
# Fix the inclusion of adaptation samples

posterior2 = posterior[1001:4000,:,:];

# Results from rethinking

m123rethinking = "
                  mean   sd  5.5% 94.5% n_eff Rhat
a                 1.30 0.23  0.94  1.67  8064    1
sigma         1.55 0.21  1.24  1.92  3839    1
a_pond[1]   2.57 1.17  0.85  4.57  9688    1
a_pond[2]   2.58 1.19  0.83  4.56  9902    1
a_pond[3]   2.56 1.16  0.84  4.57 12841    1
a_pond[4]   1.49 0.92  0.12  3.03 15532    1
a_pond[5]   1.51 0.95  0.07  3.09 14539    1
a_pond[6]   0.72 0.84 -0.59  2.08 13607    1
a_pond[7]   2.56 1.16  0.86  4.51 12204    1
a_pond[8]   1.50 0.93  0.07  3.05 19903    1
a_pond[9]   2.56 1.15  0.86  4.51 11054    1
a_pond[10]  1.49 0.95  0.05  3.09 14134    1
a_pond[11] -0.64 0.86 -2.06  0.70 15408    1
a_pond[12]  2.56 1.16  0.86  4.53 11512    1
a_pond[13]  1.49 0.95  0.05  3.10 16270    1
a_pond[14]  0.71 0.84 -0.59  2.07 17077    1
a_pond[15]  1.50 0.93  0.10  3.05 16996    1
a_pond[16]  2.98 1.07  1.45  4.84  9033    1
a_pond[17]  2.09 0.84  0.85  3.54 14636    1
a_pond[18]  1.01 0.66  0.00  2.10 12971    1
a_pond[19]  1.01 0.68 -0.03  2.13 12598    1
a_pond[20]  1.48 0.72  0.38  2.67 15500    1
a_pond[21]  2.96 1.09  1.42  4.87 11204    1
a_pond[22] -2.04 0.87 -3.53 -0.75  9065    1
a_pond[23]  0.99 0.67 -0.04  2.11 15365    1
a_pond[24]  1.48 0.72  0.41  2.67 14879    1
a_pond[25]  2.10 0.85  0.85  3.53 13298    1
a_pond[26]  1.00 0.65  0.01  2.06 18583    1
a_pond[27]  3.00 1.08  1.44  4.86  9312    1
a_pond[28]  0.98 0.66 -0.03  2.09 14703    1
a_pond[29]  0.21 0.61 -0.76  1.19 15554    1
a_pond[30]  2.95 1.05  1.45  4.73  9816    1
a_pond[31]  1.70 0.53  0.89  2.59 19148    1
a_pond[32]  0.82 0.42  0.17  1.51 13556    1
a_pond[33]  0.32 0.40 -0.33  0.96 19388    1
a_pond[34] -0.15 0.40 -0.79  0.48 18684    1
a_pond[35]  3.57 0.98  2.19  5.26  8769    1
a_pond[36]  0.16 0.40 -0.46  0.80 17595    1
a_pond[37]  2.00 0.58  1.13  2.99 14669    1
a_pond[38] -1.41 0.49 -2.22 -0.65 12957    1
a_pond[39]  1.21 0.46  0.49  1.97 14185    1
a_pond[40] -1.18 0.46 -1.95 -0.48 16142    1
a_pond[41]  2.86 0.78  1.73  4.18 10508    1
a_pond[42]  0.00 0.39 -0.61  0.63 16138    1
a_pond[43]  1.43 0.48  0.70  2.24 17100    1
a_pond[44]  2.86 0.77  1.75  4.15 12002    1
a_pond[45] -1.40 0.49 -2.21 -0.66 14292    1
a_pond[46]  0.12 0.33 -0.40  0.66 20425    1
a_pond[47] -0.56 0.36 -1.14  0.00 18981    1
a_pond[48]  1.11 0.38  0.52  1.73 14176    1
a_pond[49]  3.81 0.95  2.47  5.45  8841    1
a_pond[50]  2.05 0.50  1.31  2.88 15898    1
a_pond[51] -1.40 0.41 -2.08 -0.76 17188    1
a_pond[52] -0.11 0.34 -0.65  0.43 17158    1
a_pond[53]  1.61 0.44  0.94  2.36 15132    1
a_pond[54]  2.05 0.50  1.30  2.89 15799    1
a_pond[55]  3.14 0.75  2.08  4.40 12702    1
a_pond[56]  3.13 0.74  2.07  4.41 11143    1
a_pond[57]  1.26 0.40  0.65  1.92 14587    1
a_pond[58]  1.11 0.38  0.51  1.74 21740    1
a_pond[59]  2.33 0.56  1.50  3.25 13116    1
a_pond[60]  1.27 0.40  0.66  1.91 15611    1
";

# Draw summary
  
describe(posterior2)

# End of `12/m12.3t.jl`
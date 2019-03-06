var documenterSearchIndex = {"docs": [

{
    "location": "intro/#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "intro/#Turing-versions-of-TuringModels-models-1",
    "page": "Home",
    "title": "Turing versions of TuringModels models",
    "category": "section",
    "text": "This package contains Julia versions of  mcmc models contained in the R package \"rethinking\" associated with the book Statistical Rethinking by Richard McElreath implemented using Turing.jl."
},

{
    "location": "02/m2.1t/#",
    "page": "m2.1t",
    "title": "m2.1t",
    "category": "page",
    "text": "EditURL = \"https://github.com/StatisticalRethinkingJulia/TuringModels.jl/blob/master/scripts/02/m2.1t.jl\""
},

{
    "location": "02/m2.1t/#m2.1t.jl-1",
    "page": "m2.1t",
    "title": "m2.1t.jl",
    "category": "section",
    "text": "Load Julia packages (libraries) neededusing TuringModels\nusing Optim, Turing, Flux.Tracker\ngr(size=(600,300));Turing.setadbackend(:reverse_diff);"
},

{
    "location": "02/m2.1t/#snippet-2.8t-1",
    "page": "m2.1t",
    "title": "snippet 2.8t",
    "category": "section",
    "text": "Define the datak = 6; n = 9;Define the model@model globe_toss(n, k) = begin\n  theta ~ Beta(1, 1) # prior\n  k ~ Binomial(n, theta) # model\n  return k, theta\nend;Compute the \"maximumaposteriori\" valueSet search boundslb = [0.0]; ub = [1.0];Create (compile) the modelmodel = globe_toss(n, k);Compute the maximumaposteriorimaximum_a_posteriori(model, lb, ub)Use Turing mcmcchn = sample(model, Turing.NUTS(2000, 1000, 0.65));Correct NUTS chain (drop adaptation samples)chn2 = chn[1001:2000, \"theta\", :]Extract theta drawsLook at the proper draws (in corrected chn2)describe(chn2)Show the hpd regionMCMCChains.hpd(chn2, alpha=0.055)Compute the hpd bounds for plottingd, p, c = size(chn2.value);\ntheta = convert(Vector{Float64}, reshape(chn2[:theta], d));\nbnds = quantile(theta, [0.045, 0.955])Show hpd regionprintln(\"hpd bounds = $bnds\\n\")analytical calculationw = 6; n = 9; x = 0:0.01:1\nplot( x, pdf.(Beta( w+1 , n-w+1 ) , x ), fill=(0, .5,:orange), lab=\"Conjugate solution\")quadratic approximationplot!( x, pdf.(Normal( 0.67 , 0.16 ) , x ), lab=\"Normal approximation\")Turing Chain &  89%hpd region boundaries#tmp = convert(Array{Float64,3}, chn.value[:, 4, :])\n#draws = reshape(tmp, (size(tmp, 1)*size(tmp, 3)),)\ndensity!(theta, lab=\"Turing chain\")\nvline!([bnds[1]], line=:dash, lab=\"hpd lower bound\")\nvline!([bnds[2]], line=:dash, lab=\"hpd upper bound\")End of 02/m2.1t.jlThis page was generated using Literate.jl."
},

{
    "location": "04/m4.2t/#",
    "page": "m4.2t",
    "title": "m4.2t",
    "category": "page",
    "text": "EditURL = \"https://github.com/StatisticalRethinkingJulia/TuringModels.jl/blob/master/scripts/04/m4.2t.jl\"using TuringModels\ngr(size=(500,500));\n\nTuring.setadbackend(:reverse_diff);\n\nProjDir = rel_path_t(\"..\", \"scripts\", \"04\")\ncd(ProjDir)"
},

{
    "location": "04/m4.2t/#snippet-4.43-1",
    "page": "m4.2t",
    "title": "snippet 4.43",
    "category": "section",
    "text": "howell1 = CSV.read(rel_path(\"..\", \"data\", \"Howell1.csv\"), delim=\';\')\ndf = convert(DataFrame, howell1);Use only adults and center the weight observationsdf2 = filter(row -> row[:age] >= 18, df);\nmean_weight = mean(df2[:weight]);\ndf2[:weight_c] = df2[:weight] .- mean_weight;\nfirst(df2, 5)Extract variables for Turing modely = convert(Vector{Float64}, df2[:height]);\nx = convert(Vector{Float64}, df2[:weight_c]);Define the regression model@model line(y, x) = begin\n    #priors\n    alpha ~ Normal(178.0, 100.0)\n    beta ~ Normal(0.0, 10.0)\n    s ~ Uniform(0, 50)\n\n    #model\n    mu = alpha .+ beta*x\n    for i in 1:length(y)\n      y[i] ~ Normal(mu[i], s)\n    end\nend;Draw the samplessamples = 2000\nadapt_cycles = 1000\n\n@time chn = sample(line(y, x), Turing.NUTS(samples, adapt_cycles, 0.65));\ndraws = adapt_cycles+1:samples;Correct NUTS chain (drop adaptation samples)chn2 = Chains(chn[draws,:,:], :parameters)Look at the proper draws (in corrected chn2)describe(chn2)Compare with a previous resultclip_43s_example_output = \"\n\nIterations = 1:1000\nThinning interval = 1\nChains = 1,2,3,4\nSamples per chain = 1000\n\nEmpirical Posterior Estimates:\n         Mean        SD       Naive SE       MCSE      ESS\nalpha 154.597086 0.27326431 0.0043206882 0.0036304132 1000\n beta   0.906380 0.04143488 0.0006551430 0.0006994720 1000\nsigma   5.106643 0.19345409 0.0030587777 0.0032035103 1000\n\nQuantiles:\n          2.5%       25.0%       50.0%       75.0%       97.5%\nalpha 154.0610000 154.4150000 154.5980000 154.7812500 155.1260000\n beta   0.8255494   0.8790695   0.9057435   0.9336445   0.9882981\nsigma   4.7524368   4.9683400   5.0994450   5.2353100   5.5090128\n\";Plot the chainsplot(chn2)Plot the regerssion line and observationsscatter(x, y, lab=\"Observations\", xlab=\"weight\", ylab=\"height\")\nxi = -15.0:0.1:15.0\nyi = mean(chn2[:alpha]) .+ mean(chn2[:beta])*xi\nplot!(xi, yi, lab=\"Regression line\")End of 04/m4.2t.jlThis page was generated using Literate.jl."
},

{
    "location": "08/m8.1t/#",
    "page": "m8.1t",
    "title": "m8.1t",
    "category": "page",
    "text": ""
},

{
    "location": "08/m8.1t/#m8.1stan-1",
    "page": "m8.1t",
    "title": "m8.1stan",
    "category": "section",
    "text": "m8.1stan is the first model in the Statistical Rethinking book (pp. 249) using Stan.Here we will use Turing\'s NUTS support, which is currently (2018) the originalNUTS by Hoffman & Gelman and not the one that\'s in Stan 2.18.2, i.e., Appendix A.5 in: https://arxiv.org/abs/1701.02434The TuringModels pkg imports modules such as CSV and DataFramesusing TuringModels\n\nTuring.setadbackend(:reverse_diff);\nTuring.turnprogress(false)loaded\n\n\n┌ Info: [Turing]: global PROGRESS is set as false\n└ @ Turing /Users/rob/.julia/packages/Turing/r03H1/src/Turing.jl:24\n\n\n\n\n\nfalseRead in the rugged data as a DataFramed = CSV.read(rel_path(\"..\", \"data\", \"rugged.csv\"), delim=\';\');Show size of the DataFrame (should be 234x51)size(d)(234, 51)Apply log() to each element in rgdppc_2000 column and add it as a new columnd = hcat(d, map(log, d[Symbol(\"rgdppc_2000\")]));Rename our col x1 => log_gdprename!(d, :x1 => :log_gdp);Now we need to drop every row where rgdppc_2000 == missingWhen this (https://github.com/JuliaData/DataFrames.jl/pull/1546) hits DataFrame it\'ll be conceptually easier: i.e., completecases!(d, :rgdppc_2000)notisnan(e) = !ismissing(e)\ndd = d[map(notisnan, d[:rgdppc_2000]), :];Updated DataFrame dd size (should equal 170 x 52)size(dd)(170, 52)Define the Turing model@model m8_1stan(y, x₁, x₂) = begin\n    σ ~ Truncated(Cauchy(0, 2), 0, Inf)\n    βR ~ Normal(0, 10)\n    βA ~ Normal(0, 10)\n    βAR ~ Normal(0, 10)\n    α ~ Normal(0, 100)\n\n    for i ∈ 1:length(y)\n        y[i] ~ Normal(α + βR * x₁[i] + βA * x₂[i] + βAR * x₁[i] * x₂[i], σ)\n    end\nend;Test to see that the model is sane. Use 2000 for now, as in the book. Need to set the same stepsize and adapt_delta as in Stan...Use Turing mcmcposterior = sample(m8_1stan(dd[:log_gdp], dd[:rugged], dd[:cont_africa]),\nTuring.NUTS(2000, 1000, 0.95));┌ Info: [Turing] looking for good initial eps...\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:240\n[NUTS{Turing.Core.FluxTrackerAD,Union{}}] found initial ϵ: 0.1\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:235\n┌ Info:  Adapted ϵ = 0.026392788491123437, std = [1.0, 1.0, 1.0, 1.0, 1.0]; 1000 iterations is used for adaption.\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/adapt/adapt.jl:91\n\n\n[NUTS] Finished with\n  Running time        = 223.3260227410002;\n  #lf / sample        = 0.0;\n  #evals / sample     = 46.4005;\n  pre-cond. metric    = [1.0, 1.0, 1.0, 1.0, 1.0].Fix the inclusion of adaptation samplesdraws = 1001:2000\nposterior2 = Chains(posterior[draws,:,:], :parameters)Object of type Chains, with data of type 1000×5×1 Array{Union{Missing, Float64},3}\n\nLog evidence      = 0.0\nIterations        = 1001:2000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 1000\nparameters        = σ, βAR, βA, α, βR\n\nparameters\n      Mean    SD   Naive SE  MCSE     ESS  \n  α  9.2258 0.1457   0.0046 0.0097 224.9403\n βA -1.9580 0.2372   0.0075 0.0164 209.5267\nβAR  0.3969 0.1330   0.0042 0.0100 175.8492\n βR -0.2038 0.0797   0.0025 0.0055 212.8302\n  σ  0.9500 0.0509   0.0016 0.0017 916.8077Example of a Turing run simulation outputHere\'s the ulam() output from rethinkingm8_1s_cmdstan = \"\nIterations = 1:1000\nThinning interval = 1\nChains = 1,2,3,4\nSamples per chain = 1000\n\nEmpirical Posterior Estimates:\n          Mean         SD       Naive SE       MCSE      ESS\n    a  9.22360053 0.139119116 0.0021996664 0.0034632816 1000\n   bR -0.20196346 0.076106388 0.0012033477 0.0018370185 1000\n   bA -1.94430980 0.227080488 0.0035904578 0.0057840746 1000\n  bAR  0.39071684 0.131889143 0.0020853505 0.0032749642 1000\nsigma  0.95036370 0.052161768 0.0008247500 0.0009204073 1000\n\nQuantiles:\n          2.5%       25.0%       50.0%      75.0%        97.5%\n    a  8.95307475  9.12719750  9.2237750  9.31974000  9.490234250\n   bR -0.35217930 -0.25334425 -0.2012855 -0.15124725 -0.054216855\n   bA -2.39010825 -2.09894500 -1.9432550 -1.78643000 -1.513974250\n  bAR  0.13496995  0.30095575  0.3916590  0.47887625  0.650244475\nsigma  0.85376115  0.91363250  0.9484920  0.98405750  1.058573750\n\";Describe the posterior samplesdescribe(posterior2)Log evidence      = 0.0\nIterations        = 1001:2000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 1000\nparameters        = σ, βAR, βA, α, βR\n\n\n\n┌ Warning: `quantile(v::AbstractArray{<:Real})` is deprecated, use `quantile(v, [0.0, 0.25, 0.5, 0.75, 1.0])` instead.\n│   caller = (::getfield(MCMCChains, Symbol(\"##102#104\")){Chains{Union{Missing, Float64},Float64,NamedTuple{(:parameters,),Tuple{Array{String,1}}},NamedTuple{(:hashedsummary,),Tuple{Base.RefValue{Tuple{UInt64,MCMCChains.ChainSummaries}}}}}})(::String) at none:0\n└ @ MCMCChains ./none:0\n\n\n[36m[1mEmpirical Posterior Estimates[22m[39m\n───────────────────────────────────────────\nparameters\n      Mean    SD   Naive SE  MCSE     ESS  \n  α  9.2258 0.1457   0.0046 0.0097 224.9403\n βA -1.9580 0.2372   0.0075 0.0164 209.5267\nβAR  0.3969 0.1330   0.0042 0.0100 175.8492\n βR -0.2038 0.0797   0.0025 0.0055 212.8302\n  σ  0.9500 0.0509   0.0016 0.0017 916.8077\n\n[36m[1mQuantiles[22m[39m\n───────────────────────────────────────────\nparameters\n      2.5%   25.0%   50.0%   75.0%   97.5% \n  α  8.6704  9.1249  9.2246  9.3219  9.7520\n βA -2.6922 -2.1177 -1.9737 -1.7884 -1.2476\nβAR -0.0845  0.3022  0.3964  0.4840  0.8435\n βR -0.4696 -0.2584 -0.2024 -0.1488  0.0564\n  σ  0.7990  0.9121  0.9494  0.9842  1.1318end of 08/m8.1t.jl#- This notebook was generated using Literate.jl."
},

{
    "location": "08/m8.4t/#",
    "page": "m8.4t",
    "title": "m8.4t",
    "category": "page",
    "text": "using TuringModels\n\nTuring.setadbackend(:reverse_diff);\nTuring.turnprogress(false);┌ Info: Recompiling stale cache file /Users/rob/.julia/compiled/v1.2/TuringModels/nq4gQ.ji for TuringModels [ead7e11d-4ba5-55c3-9d74-177ea73ef1fd]\n└ @ Base loading.jl:1188\n\n\nloaded\n\n\n┌ Info: [Turing]: global PROGRESS is set as false\n└ @ Turing /Users/rob/.julia/packages/Turing/r03H1/src/Turing.jl:24Can\'t really set a Uniform[-Inf,Inf] on σTuring model@model m8_4(y) = begin\n    α₁ ~ Uniform(-3000, 1000)\n    α₂ ~ Uniform(-1000, 3000)\n    σ ~ Truncated(Cauchy(0,1), 0, Inf)\n\n    for i ∈ 1:length(y)\n        y[i] ~ Normal(α₁ + α₂, σ)\n    end\nendm8_4 (generic function with 2 methods)Observationsy = rand(Normal(0,1), 100);Sampleposterior = sample(m8_4(y), Turing.NUTS(4000, 1000, 0.95));┌ Info: [Turing] looking for good initial eps...\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:240\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, -99.0000000000002]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n[NUTS{Turing.Core.FluxTrackerAD,Union{}}] found initial ϵ: 0.0015625\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:235\n┌ Info:  Adapted ϵ = 0.0012446019552466972, std = [1.0, 1.0, 1.0]; 1000 iterations is used for adaption.\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/adapt/adapt.jl:91\n\n\n[NUTS] Finished with\n  Running time        = 503.2693889070004;\n  #lf / sample        = 0.0;\n  #evals / sample     = 131.66425;\n  pre-cond. metric    = [1.0, 1.0, 1.0].Fix the inclusion of adaptation samplesdraws = 1001:4000\nposterior2 = Chains(posterior[draws,:,:], :parameters)Object of type Chains, with data of type 3000×3×1 Array{Union{Missing, Float64},3}\n\nLog evidence      = 0.0\nIterations        = 1001:4000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 3000\nparameters        = α₂, α₁, σ\n\nparameters\n      Mean      SD   Naive SE  MCSE     ESS  \nα₁  910.8323 21.9943   0.4016 3.7948  33.5924\nα₂ -910.6959 21.9930   0.4015 3.7947  33.5911\n σ    1.0401  0.0744   0.0014 0.0069 117.3083Describe the posterior samplesdescribe(posterior2)Log evidence      = 0.0\nIterations        = 1001:4000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 3000\nparameters        = α₂, α₁, σ\n\n\n\n┌ Warning: `quantile(v::AbstractArray{<:Real})` is deprecated, use `quantile(v, [0.0, 0.25, 0.5, 0.75, 1.0])` instead.\n│   caller = (::getfield(MCMCChains, Symbol(\"##102#104\")){Chains{Union{Missing, Float64},Float64,NamedTuple{(:parameters,),Tuple{Array{String,1}}},NamedTuple{(:hashedsummary,),Tuple{Base.RefValue{Tuple{UInt64,MCMCChains.ChainSummaries}}}}}})(::String) at none:0\n└ @ MCMCChains ./none:0\n\n\n[36m[1mEmpirical Posterior Estimates[22m[39m\n────────────────────────────────────────────────────\nparameters\n      Mean      SD   Naive SE  MCSE     ESS  \nα₁  910.8323 21.9943   0.4016 3.7948  33.5924\nα₂ -910.6959 21.9930   0.4015 3.7947  33.5911\n σ    1.0401  0.0744   0.0014 0.0069 117.3083\n\n[36m[1mQuantiles[22m[39m\n────────────────────────────────────────────────────\nparameters\n      2.5%     25.0%     50.0%     75.0%     97.5%  \nα₁  859.3251  890.0703  914.4814  929.4525  959.2620\nα₂ -958.9285 -929.3161 -914.3284 -890.0230 -859.1671\n σ    0.8119    0.9883    1.0315    1.0811    1.3478Results rethinkingm84rethinking = \"\n         mean      sd     5.5%   94.5% n_eff Rhat\n a1    -861.15 558.17 -1841.89  -31.04     7 1.43\n a2     861.26 558.17    31.31 1842.00     7 1.43\n sigma    0.97   0.07     0.89    1.09     9 1.17\n\";This notebook was generated using Literate.jl."
},

{
    "location": "10/m10.04t/#",
    "page": "m10.04t",
    "title": "m10.04t",
    "category": "page",
    "text": "using TuringModels\n\nTuring.setadbackend(:reverse_diff);\nTuring.turnprogress(false);\n\nd = CSV.read(rel_path(\"..\", \"data\", \"chimpanzees.csv\"), delim=\';\');\nsize(d) # Should be 504x8┌ Info: [Turing]: global PROGRESS is set as false\n└ @ Turing /Users/rob/.julia/packages/Turing/r03H1/src/Turing.jl:24\n\n\n\n\n\n(504, 8)pulledleft, actors, condition, prosocleft@model m10_4(y, actors, x₁, x₂) = begin\n    # Number of unique actors in the data set\n    N_actor = length(unique(actors))\n    # Set an TArray for the priors/param\n    α = TArray{Any}(undef, N_actor)\n    # For each actor [1,..,7] set a prior\n    for i ∈ 1:length(α)\n        α[i] ~ Normal(0,10)\n    end\n\n    βp ~ Normal(0, 10)\n    βpC ~ Normal(0, 10)\n\n    for i ∈ 1:length(y)\n        p = logistic(α[actors[i]] + (βp + βpC * x₁[i]) * x₂[i])\n        y[i] ~ Binomial(1, p)\n    end\nend;\n\nposterior = sample(m10_4(d[:,:pulled_left], d[:,:actor],d[:,:condition],\nd[:,:prosoc_left]), Turing.NUTS(2000, 1000, 0.95));┌ Info: [Turing] looking for good initial eps...\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:240\n[NUTS{Turing.Core.FluxTrackerAD,Union{}}] found initial ϵ: 0.4\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:235\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Info:  Adapted ϵ = 0.09340741377838617, std = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]; 1000 iterations is used for adaption.\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/adapt/adapt.jl:91\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [-1.413683823692169, NaN, -0.0053143216643326, 6.180638719948819, 5.7481680727318825, 1.2802685894642976, 2.4636098718763173, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n\n\n[NUTS] Finished with\n  Running time        = 1036.9406298429983;\n  #lf / sample        = 0.0;\n  #evals / sample     = 67.339;\n  pre-cond. metric    = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0,....Fix the inclusion of adaptation samplesdraws = 1001:2000\nposterior2 = Chains(posterior[draws,:,:], :parameters)Object of type Chains, with data of type 1000×9×1 Array{Union{Missing, Float64},3}\n\nLog evidence      = 0.0\nIterations        = 1001:2000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 1000\nparameters        = α[2], βpC, βp, α[7], α[4], α[6], α[5], α[3], α[1]\n\nparameters\n       Mean    SD   Naive SE  MCSE     ESS   \nα[1] -0.7368 0.2626   0.0083 0.0096  743.4117\nα[2] 11.1931 5.4292   0.1717 0.8311   42.6710\nα[3] -1.0455 0.2848   0.0090 0.0076 1000.0000\nα[4] -1.0465 0.2808   0.0089 0.0065 1000.0000\nα[5] -0.7435 0.2715   0.0086 0.0084 1000.0000\nα[6]  0.2216 0.2738   0.0087 0.0065 1000.0000\nα[7]  1.8233 0.3832   0.0121 0.0146  692.2298\n  βp  0.8450 0.2572   0.0081 0.0115  500.4234\n βpC -0.1528 0.2815   0.0089 0.0101  782.8304Rethinking/CmdStan resultsm_10_04s_result = \"\nIterations = 1:1000\nThinning interval = 1\nChains = 1,2,3,4\nSamples per chain = 1000\n\nEmpirical Posterior Estimates:\n        Mean        SD       Naive SE       MCSE      ESS\na.1 -0.74503184 0.26613979 0.0042080396 0.0060183398 1000\na.2 10.77955494 5.32538998 0.0842018089 0.1269148045 1000\na.3 -1.04982353 0.28535997 0.0045119373 0.0049074219 1000\na.4 -1.04898135 0.28129307 0.0044476339 0.0056325117 1000\na.5 -0.74390933 0.26949936 0.0042611590 0.0052178124 1000\na.6  0.21599365 0.26307574 0.0041595927 0.0045153523 1000\na.7  1.81090866 0.39318577 0.0062168129 0.0071483527 1000\nbp  0.83979926 0.26284676 0.0041559722 0.0059795826 1000\nbpC -0.12913322 0.29935741 0.0047332562 0.0049519863 1000\n\";Describe the drawsdescribe(posterior2)Log evidence      = 0.0\nIterations        = 1001:2000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 1000\nparameters        = α[2], βpC, βp, α[7], α[4], α[6], α[5], α[3], α[1]\n\n\n\n┌ Warning: `quantile(v::AbstractArray{<:Real})` is deprecated, use `quantile(v, [0.0, 0.25, 0.5, 0.75, 1.0])` instead.\n│   caller = (::getfield(MCMCChains, Symbol(\"##102#104\")){Chains{Union{Missing, Float64},Float64,NamedTuple{(:parameters,),Tuple{Array{String,1}}},NamedTuple{(:hashedsummary,),Tuple{Base.RefValue{Tuple{UInt64,MCMCChains.ChainSummaries}}}}}})(::String) at none:0\n└ @ MCMCChains ./none:0\n\n\n[36m[1mEmpirical Posterior Estimates[22m[39m\n─────────────────────────────────────────────\nparameters\n       Mean    SD   Naive SE  MCSE     ESS   \nα[1] -0.7368 0.2626   0.0083 0.0096  743.4117\nα[2] 11.1931 5.4292   0.1717 0.8311   42.6710\nα[3] -1.0455 0.2848   0.0090 0.0076 1000.0000\nα[4] -1.0465 0.2808   0.0089 0.0065 1000.0000\nα[5] -0.7435 0.2715   0.0086 0.0084 1000.0000\nα[6]  0.2216 0.2738   0.0087 0.0065 1000.0000\nα[7]  1.8233 0.3832   0.0121 0.0146  692.2298\n  βp  0.8450 0.2572   0.0081 0.0115  500.4234\n βpC -0.1528 0.2815   0.0089 0.0101  782.8304\n\n[36m[1mQuantiles[22m[39m\n─────────────────────────────────────────────\nparameters\n       2.5%   25.0%   50.0%   75.0%   97.5% \nα[1] -1.7078 -0.9135 -0.7309 -0.5709  0.1285\nα[2]  3.0412  7.2461 10.0285 14.0184 31.8224\nα[3] -2.1025 -1.2400 -1.0375 -0.8606 -0.1937\nα[4] -2.0072 -1.2185 -1.0397 -0.8696 -0.0853\nα[5] -1.5113 -0.9400 -0.7376 -0.5517  0.0889\nα[6] -0.6183  0.0334  0.2297  0.4092  1.1575\nα[7]  0.7556  1.5585  1.8237  2.0891  3.1643\n  βp  0.1388  0.6579  0.8346  1.0279  1.6540\n βpC -0.9645 -0.3344 -0.1512  0.0349  0.6841Create a DataFramecnames = [\n  :a_1, :a_2, :a_3, :a_4, :a_5, :a_6, :a_7,\n  :bp, :bpC\n]\n\ndf = DataFrame(convert(Matrix{Float64}, to_df(posterior2)), cnames)\nfirst(df, 5)<table class=\"data-frame\"><thead><tr><th></th><th>a1</th><th>a2</th><th>a3</th><th>a4</th><th>a5</th><th>a6</th><th>a_7</th><th>bp</th><th>bpC</th></tr><tr><th></th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th></tr></thead><tbody><p>5 rows × 9 columns</p><tr><th>1</th><td>-1.0929</td><td>6.73563</td><td>-0.976573</td><td>-1.12526</td><td>-0.886459</td><td>0.322946</td><td>2.6305</td><td>0.850382</td><td>-0.395548</td></tr><tr><th>2</th><td>-0.431177</td><td>6.35147</td><td>-1.23014</td><td>-1.1136</td><td>-0.704243</td><td>-0.0204245</td><td>1.48751</td><td>0.558974</td><td>0.0371371</td></tr><tr><th>3</th><td>-0.732745</td><td>4.9389</td><td>-0.913287</td><td>-1.05535</td><td>-0.778746</td><td>0.569156</td><td>2.39251</td><td>0.942476</td><td>-0.376117</td></tr><tr><th>4</th><td>-0.647605</td><td>4.52435</td><td>-0.908345</td><td>-0.982594</td><td>-0.555483</td><td>-0.234643</td><td>1.56546</td><td>1.02727</td><td>-0.187141</td></tr><tr><th>5</th><td>-0.518945</td><td>8.02371</td><td>-1.03367</td><td>-0.914572</td><td>-0.562902</td><td>-0.145583</td><td>2.15204</td><td>0.586953</td><td>-0.084613</td></tr></tbody></table>End of 10/m1004t.jl#- This notebook was generated using Literate.jl."
},

{
    "location": "12/m12.6t/#",
    "page": "m12.6t",
    "title": "m12.6t",
    "category": "page",
    "text": "using TuringModels\n\nTuring.setadbackend(:reverse_diff)\nTuring.turnprogress(false)\n\nd = CSV.read(rel_path(\"..\", \"data\", \"Kline.csv\"), delim=\';\');\nsize(d) # Should be 10x5┌ Info: [Turing]: global PROGRESS is set as false\n└ @ Turing /Users/rob/.julia/packages/Turing/r03H1/src/Turing.jl:24\n\n\n\n\n\n(10, 5)New col log_pop, set log() for population datad[:log_pop] = map((x) -> log(x), d[:population]);\nd[:society] = 1:10;Turing model@model m12_6(total_tools, log_pop, society) = begin\n    # Total num of y\n    N = length(total_tools)\n    # priors\n    α ~ Normal(0, 10)\n    βp ~ Normal(0, 1)\n    # Separate σ priors for each society\n    σ_society ~ Truncated(Cauchy(0, 1), 0, Inf)\n    # Number of unique societies in the data set\n    N_society = length(unique(society)) #10\n    # Vector of societies (1,..,10) which we\'ll set priors on\n    α_society = Vector{Real}(undef, N_society)\n    # For each society [1,..,10] set a prior N(0, σ_society)\n    α_society ~ [Normal(0, σ_society)]\n\n    for i ∈ 1:N\n        λ = exp(α + α_society[society[i]] + βp*log_pop[i])\n        total_tools[i] ~ Poisson(λ)\n    end\nendm12_6 (generic function with 4 methods)Sampleposterior = sample(m12_6(d[:total_tools], d[:log_pop],\n    d[:society]), Turing.NUTS(4000, 1000, 0.95));\n# Fix the inclusion of adaptation samples\ndraws = 1001:4000\nposterior2 = Chains(posterior[draws,:,:], :parameters)┌ Info: [Turing] looking for good initial eps...\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:240\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, 3.975875826723833e81, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n┌ Warning: Numerical error has been found in gradients.\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:169\n┌ Warning: grad = [NaN, NaN, 1.5404851023330582e36, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]\n└ @ Turing.Core /Users/rob/.julia/packages/Turing/r03H1/src/core/ad.jl:170\n[NUTS{Turing.Core.FluxTrackerAD,Union{}}] found initial ϵ: 0.0125\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/support/hmc_core.jl:235\n┌ Info:  Adapted ϵ = 0.004603497304111276, std = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]; 1000 iterations is used for adaption.\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/r03H1/src/inference/adapt/adapt.jl:91\n\n\n[NUTS] Finished with\n  Running time        = 196.16798833699977;\n  #lf / sample        = 0.0;\n  #evals / sample     = 189.32975;\n  pre-cond. metric    = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0,....\n\n\n\n\n\nObject of type Chains, with data of type 3000×13×1 Array{Union{Missing, Float64},3}\n\nLog evidence      = 0.0\nIterations        = 1001:4000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 3000\nparameters        = α_society[5], α_society[9], α_society[3], α_society[6], α_society[8], α_society[1], βp, α_society[10], σ_society, α, α_society[2], α_society[4], α_society[7]\n\nparameters\n                Mean    SD   Naive SE  MCSE     ESS  \n            α  1.0131 0.8098   0.0148 0.1170  47.9312\n α_society[1] -0.1869 0.2628   0.0048 0.0274  91.8357\n α_society[2]  0.0725 0.2366   0.0043 0.0222 113.4874\n α_society[3] -0.0192 0.2089   0.0038 0.0160 171.3097\n α_society[4]  0.3666 0.2069   0.0038 0.0180 131.4825\n α_society[5]  0.0727 0.1925   0.0035 0.0126 232.8379\n α_society[6] -0.3322 0.2107   0.0038 0.0131 258.9057\n α_society[7]  0.1750 0.1813   0.0033 0.0110 273.2586\n α_society[8] -0.1702 0.1895   0.0035 0.0089 455.1627\n α_society[9]  0.2971 0.1775   0.0032 0.0089 397.5320\nα_society[10] -0.1077 0.2929   0.0053 0.0340  74.0449\n           βp  0.2685 0.0857   0.0016 0.0122  49.1601\n    σ_society  0.3309 0.1184   0.0022 0.0120  97.7657Results rethinkingm126rethinking = \"\n              Mean StdDev lower 0.89 upper 0.89 n_eff Rhat\na              1.11   0.75      -0.05       2.24  1256    1\nbp             0.26   0.08       0.13       0.38  1276    1\na_society[1]  -0.20   0.24      -0.57       0.16  2389    1\na_society[2]   0.04   0.21      -0.29       0.38  2220    1\na_society[3]  -0.05   0.19      -0.36       0.25  3018    1\na_society[4]   0.32   0.18       0.01       0.60  2153    1\na_society[5]   0.04   0.18      -0.22       0.33  3196    1\na_society[6]  -0.32   0.21      -0.62       0.02  2574    1\na_society[7]   0.14   0.17      -0.13       0.40  2751    1\na_society[8]  -0.18   0.19      -0.46       0.12  2952    1\na_society[9]   0.27   0.17      -0.02       0.52  2540    1\na_society[10] -0.10   0.30      -0.52       0.37  1433    1\nsigma_society  0.31   0.13       0.11       0.47  1345    1\n\";Describe the posterior samplesdescribe(posterior2)\n\ncnames = [\n  :α,:α_society_1, :α_society_2, :α_society_3,\n  :α_society_4, :α_society_5, :α_society_6,\n  :α_society_7, :α_society_8,:α_society_9,\n  :α_society_10, :βp, :σ_society\n]\n\ndf = DataFrame(convert(Matrix{Float64}, to_df(posterior2)), cnames)\nfirst(df, 5)Log evidence      = 0.0\nIterations        = 1001:4000\nThinning interval = 1\nChains            = Chain1\nSamples per chain = 3000\nparameters        = α_society[5], α_society[9], α_society[3], α_society[6], α_society[8], α_society[1], βp, α_society[10], σ_society, α, α_society[2], α_society[4], α_society[7]\n\n\n\n┌ Warning: `quantile(v::AbstractArray{<:Real})` is deprecated, use `quantile(v, [0.0, 0.25, 0.5, 0.75, 1.0])` instead.\n│   caller = (::getfield(MCMCChains, Symbol(\"##102#104\")){Chains{Union{Missing, Float64},Float64,NamedTuple{(:parameters,),Tuple{Array{String,1}}},NamedTuple{(:hashedsummary,),Tuple{Base.RefValue{Tuple{UInt64,MCMCChains.ChainSummaries}}}}}})(::String) at none:0\n└ @ MCMCChains ./none:0\n\n\n[36m[1mEmpirical Posterior Estimates[22m[39m\n─────────────────────────────────────────────────────\nparameters\n                Mean    SD   Naive SE  MCSE     ESS  \n            α  1.0131 0.8098   0.0148 0.1170  47.9312\n α_society[1] -0.1869 0.2628   0.0048 0.0274  91.8357\n α_society[2]  0.0725 0.2366   0.0043 0.0222 113.4874\n α_society[3] -0.0192 0.2089   0.0038 0.0160 171.3097\n α_society[4]  0.3666 0.2069   0.0038 0.0180 131.4825\n α_society[5]  0.0727 0.1925   0.0035 0.0126 232.8379\n α_society[6] -0.3322 0.2107   0.0038 0.0131 258.9057\n α_society[7]  0.1750 0.1813   0.0033 0.0110 273.2586\n α_society[8] -0.1702 0.1895   0.0035 0.0089 455.1627\n α_society[9]  0.2971 0.1775   0.0032 0.0089 397.5320\nα_society[10] -0.1077 0.2929   0.0053 0.0340  74.0449\n           βp  0.2685 0.0857   0.0016 0.0122  49.1601\n    σ_society  0.3309 0.1184   0.0022 0.0120  97.7657\n\n[36m[1mQuantiles[22m[39m\n─────────────────────────────────────────────────────\nparameters\n                2.5%   25.0%   50.0%   75.0%   97.5%\n            α -1.9097  0.5650  1.1230  1.5701 2.9674\n α_society[1] -0.9649 -0.3578 -0.1898 -0.0308 0.8134\n α_society[2] -0.7020 -0.0856  0.0478  0.2050 1.1970\n α_society[3] -0.7583 -0.1486 -0.0274  0.1092 0.7739\n α_society[4] -0.2466  0.2232  0.3541  0.4903 1.1594\n α_society[5] -0.6097 -0.0515  0.0675  0.1932 0.7374\n α_society[6] -1.1308 -0.4671 -0.3199 -0.1882 0.5029\n α_society[7] -0.4311  0.0523  0.1669  0.2836 0.9332\n α_society[8] -0.7607 -0.2923 -0.1698 -0.0388 0.5453\n α_society[9] -0.4227  0.1762  0.2881  0.4116 0.9183\nα_society[10] -1.1368 -0.2898 -0.0896  0.0916 0.7851\n           βp  0.0498  0.2081  0.2575  0.3182 0.5793\n    σ_society  0.0436  0.2467  0.3137  0.3965 1.1329<table class=\"data-frame\"><thead><tr><th></th><th>α</th><th>αsociety1</th><th>αsociety2</th><th>αsociety3</th><th>αsociety4</th><th>αsociety5</th><th>αsociety6</th><th>αsociety7</th><th>αsociety8</th><th>αsociety9</th><th>αsociety10</th><th>βp</th><th>σ_society</th></tr><tr><th></th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th><th>Float64</th></tr></thead><tbody><p>5 rows × 13 columns</p><tr><th>1</th><td>0.468659</td><td>0.0997899</td><td>0.0627841</td><td>0.131921</td><td>0.18443</td><td>0.0221748</td><td>-0.117291</td><td>0.189045</td><td>-0.257996</td><td>0.203787</td><td>-0.218552</td><td>0.319401</td><td>0.217443</td></tr><tr><th>2</th><td>0.586306</td><td>0.0517588</td><td>0.0721921</td><td>0.12386</td><td>0.126687</td><td>0.00442691</td><td>-0.0824298</td><td>0.174092</td><td>-0.202191</td><td>0.21546</td><td>-0.178376</td><td>0.312929</td><td>0.209458</td></tr><tr><th>3</th><td>0.687747</td><td>0.0621691</td><td>0.160311</td><td>-0.352538</td><td>0.432242</td><td>0.0729015</td><td>-0.32996</td><td>0.118331</td><td>-0.343966</td><td>0.29101</td><td>-0.123686</td><td>0.304788</td><td>0.194923</td></tr><tr><th>4</th><td>0.713992</td><td>0.0974287</td><td>0.22961</td><td>0.167159</td><td>0.280534</td><td>0.159729</td><td>-0.141922</td><td>0.0661826</td><td>-0.0955419</td><td>-0.0728205</td><td>-0.0705672</td><td>0.306378</td><td>0.179783</td></tr><tr><th>5</th><td>0.774082</td><td>0.13936</td><td>0.256276</td><td>0.129645</td><td>0.285317</td><td>-0.0341815</td><td>-0.220036</td><td>0.219055</td><td>0.0609183</td><td>0.0107175</td><td>-0.079961</td><td>0.28998</td><td>0.146416</td></tr></tbody></table>End of m12.6t.jlThis notebook was generated using Literate.jl."
},

{
    "location": "#",
    "page": "Functions",
    "title": "Functions",
    "category": "page",
    "text": "CurrentModule = TuringModels"
},

{
    "location": "#TuringModels.rel_path_t-Tuple",
    "page": "Functions",
    "title": "TuringModels.rel_path_t",
    "category": "method",
    "text": "relpatht\n\nRelative path using the TuringModels src/ directory.\n\nExample to get access to the data subdirectory\n\nrel_path_t(\"..\", \"data\")\n\n\n\n\n\n"
},

{
    "location": "#rel_path_t-1",
    "page": "Functions",
    "title": "rel_path_t",
    "category": "section",
    "text": "rel_path_t(parts...)"
},

{
    "location": "#TuringModels.generate_t-Tuple{}",
    "page": "Functions",
    "title": "TuringModels.generate_t",
    "category": "method",
    "text": "generate_t\n\nUtility function to generate all notebooks and chapters from scripts in the scripts directory.\n\nMethod\n\ngenerate_t(sd = script_dict_t)\n\nRequired arguments\n\nNone, all notebooks/.. and chapters/.. files are regenerated.\n\n\n\n\n\n"
},

{
    "location": "#TuringModels.generate_t-Tuple{AbstractString}",
    "page": "Functions",
    "title": "TuringModels.generate_t",
    "category": "method",
    "text": "generate_t\n\nGenerate notebooks and scripts in a single chapter.\n\nMethod\n\ngenerate_t(chapter::AbstractString)\n\nRequired arguments\n\nGenerate notebooks and scripts in a single chapter, e.g. generate(\"04\")\n\n\n\n\n\n"
},

{
    "location": "#TuringModels.generate_t-Tuple{AbstractString,AbstractString}",
    "page": "Functions",
    "title": "TuringModels.generate_t",
    "category": "method",
    "text": "generate_t\n\nGenerate a single notebook and script\n\nMethod\n\ngenerate_t(chapter::AbstractString, file::AbstractString)\n\nRequired arguments\n\nGenerate notebook and script file in chapter, e.g. generatet(\"04\", \"m4.1d.jl\") or  generatet(\"04/m4.1t.jl\")\n\n\n\n\n\n"
},

{
    "location": "#generate_t-1",
    "page": "Functions",
    "title": "generate_t",
    "category": "section",
    "text": "generate_t(; sd=script_dict_t)\ngenerate_t(chapter::AbstractString; sd=script_dict_t_)\ngenerate_t(chapter::AbstractString, scriptfile::AbstractString; sd=script_dict_t_)"
},

{
    "location": "#StatisticalRethinking.ScriptEntry",
    "page": "Functions",
    "title": "StatisticalRethinking.ScriptEntry",
    "category": "type",
    "text": "ScriptEntry\n\nDefine processing requirements for chapter scripts\n\nConstructor\n\nscriptentry(scriptfile;; nb=true, exe=true, doc=true)\n\nRequired arguments\n\n* `scriptfile::AbstractString`        : Script file\n\nOptional arguments\n\n* `nb::Bool`      : Generate a notebook version in notebooks directory\n* `exe::Bool`     : Execute the notebook (for testing or documentation purposes)\n* `doc::Bool`     : Insert documention into Github pages\n\nIf exe = false and doc = true it is assumed the appropriate .md files have been manually created and stored in docs/src/nn/... (Travis will terminate if runs take too long).\n\n\n\n\n\n"
},

{
    "location": "#ScriptEntry-1",
    "page": "Functions",
    "title": "ScriptEntry",
    "category": "section",
    "text": "ScriptEntry"
},

{
    "location": "#StatisticalRethinking.scriptentry-Tuple{Any}",
    "page": "Functions",
    "title": "StatisticalRethinking.scriptentry",
    "category": "method",
    "text": "scriptentry\n\nConstructor for ScriptEntry objects.\n\nConstructor\n\nscriptentry(scriptfile;; nb=true, exe=true, doc=true)\n\nRequired arguments\n\n* `scriptfile::AbstractString`        : Script file\n\nOptional arguments\n\n* `nb::Bool`      : Generate a notebook version in notebooks directory\n* `exe::Bool`     : Execute the notebook (for testing or documentation purposes)\n* `doc::Bool`     : Insert documention into Github pages\n\nIf exe = false and doc = true it is assumed the appropriate .md files have been manually created and stored in docs/src/nn/... (Travis will terminate if runs take too long).\n\n\n\n\n\n"
},

{
    "location": "#scriptentry-1",
    "page": "Functions",
    "title": "scriptentry",
    "category": "section",
    "text": "scriptentry(scriptfile; nb = true, exe = true, doc = true)"
},

{
    "location": "#TuringModels.maximum_a_posteriori-Tuple{Any,Any,Any}",
    "page": "Functions",
    "title": "TuringModels.maximum_a_posteriori",
    "category": "method",
    "text": "maximum_a_posteriori\n\nCompute the maximum_a_posteriori of a model. \n\nMethod\n\nmaximum_a_posteriori(model, lower_bound, upper_bound)\n\nRequired arguments\n\n* `model::Turing model`\n* `lower_bound::Float64`\n* `upper_bound::Float64`\n\nReturn values\n\n* `result`                       : Maximum_a_posterior vector\n\nExamples\n\nSee m2.1t.jl\n\n\n\n\n\n"
},

{
    "location": "#maximum_a_posteriori-1",
    "page": "Functions",
    "title": "maximum_a_posteriori",
    "category": "section",
    "text": "maximum_a_posteriori(model, lower_bound, upper_bound)link to m2.1t.jl\nlink to maximum_a_posteriori(model, lower_bound, upper_bound)"
},

]}

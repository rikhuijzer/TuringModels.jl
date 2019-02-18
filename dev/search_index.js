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
    "text": "Define the datak = 6; n = 9;Define the model@model globe_toss(n, k) = begin\n  theta ~ Beta(1, 1) # prior\n  k ~ Binomial(n, theta) # model\n  return k, theta\nend;Compute the \"maximumaposteriori\" valueSet search boundslb = [0.0]; ub = [1.0];Create (compile) the modelmodel = globe_toss(n, k);Compute the maximumaposteriorimaximum_a_posteriori(model, lb, ub)Use Turing mcmcchn = sample(model, Turing.NUTS(2000, 1000, 0.65));Fix the inclusion of adaptation sampleschn2 = MCMCChain.Chains(chn.value[1001:2000,:,:], names=chn.names)Look at the proper draws (in corrected chn2)describe(chn2)Compute at hpd regionbnds = MCMCChain.hpd(chn2[:, 4, :], alpha=0.06);analytical calculationw = 6; n = 9; x = 0:0.01:1\nplot( x, pdf.(Beta( w+1 , n-w+1 ) , x ), fill=(0, .5,:orange), lab=\"Conjugate solution\")quadratic approximationplot!( x, pdf.(Normal( 0.67 , 0.16 ) , x ), lab=\"Normal approximation\")Turing Chain &  89%hpd region boundaries#tmp = convert(Array{Float64,3}, chn.value[:, 4, :])\n#draws = reshape(tmp, (size(tmp, 1)*size(tmp, 3)),)\ndensity!(chn.value[:, 4, 1], lab=\"Turing chain\")\nvline!([bnds.value[1]], line=:dash, lab=\"hpd lower bound\")\nvline!([bnds.value[2]], line=:dash, lab=\"hpd upper bound\")Show hpd regionprintln(\"hpd bounds = $bnds\\n\")End of clip_08t.jlThis page was generated using Literate.jl."
},

{
    "location": "04/m4.2t/#",
    "page": "m4.2t",
    "title": "m4.2t",
    "category": "page",
    "text": "using TuringModels, MCMCChain\ngr(size=(500,500));\n\nTuring.setadbackend(:reverse_diff);\nTuring.turnprogress(false);\n\nProjDir = rel_path_t(\"..\", \"scripts\", \"04\")\ncd(ProjDir)loaded\n\n\n┌ Info: [Turing]: global PROGRESS is set as false\n└ @ Turing /Users/rob/.julia/packages/Turing/FTRCE/src/Turing.jl:24"
},

{
    "location": "04/m4.2t/#snippet-4.43-1",
    "page": "m4.2t",
    "title": "snippet 4.43",
    "category": "section",
    "text": "howell1 = CSV.read(rel_path(\"..\", \"data\", \"Howell1.csv\"), delim=\';\')\ndf = convert(DataFrame, howell1);Use only adults and center the weight observationsdf2 = filter(row -> row[:age] >= 18, df);\nmean_weight = mean(df2[:weight]);\ndf2[:weight_c] = df2[:weight] .- mean_weight;\nfirst(df2, 5)<table class=\"data-frame\"><thead><tr><th></th><th>height</th><th>weight</th><th>age</th><th>male</th><th>weight_c</th></tr><tr><th></th><th>Float64⍰</th><th>Float64⍰</th><th>Float64⍰</th><th>Int64⍰</th><th>Float64</th></tr></thead><tbody><p>5 rows × 5 columns</p><tr><th>1</th><td>151.765</td><td>47.8256</td><td>63.0</td><td>1</td><td>2.83512</td></tr><tr><th>2</th><td>139.7</td><td>36.4858</td><td>63.0</td><td>0</td><td>-8.50468</td></tr><tr><th>3</th><td>136.525</td><td>31.8648</td><td>65.0</td><td>0</td><td>-13.1256</td></tr><tr><th>4</th><td>156.845</td><td>53.0419</td><td>41.0</td><td>1</td><td>8.05143</td></tr><tr><th>5</th><td>145.415</td><td>41.2769</td><td>51.0</td><td>0</td><td>-3.71361</td></tr></tbody></table>Extract variables for Turing modely = convert(Vector{Float64}, df2[:height]);\nx = convert(Vector{Float64}, df2[:weight_c]);Define the regression model@model line(y, x) = begin\n    #priors\n    alpha ~ Normal(178.0, 100.0)\n    beta ~ Normal(0.0, 10.0)\n    s ~ Uniform(0, 50)\n\n    #model\n    mu = alpha .+ beta*x\n    for i in 1:length(y)\n      y[i] ~ Normal(mu[i], s)\n    end\nend;Draw the samplessamples = 2000\nadapt_cycles = 1000\n\n@time chn = sample(line(y, x), Turing.NUTS(samples, adapt_cycles, 0.65));\ndraws = adapt_cycles+1:samples┌ Info: [Turing] looking for good initial eps...\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/FTRCE/src/inference/support/hmc_core.jl:240\n[NUTS{Turing.Core.FluxTrackerAD,Union{}}] found initial ϵ: 0.1\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/FTRCE/src/inference/support/hmc_core.jl:235\n┌ Warning: 6.327001291052424 exceeds 5.0; capped to 5.0 for numerical stability\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/FTRCE/src/inference/adapt/stepsize.jl:96\n┌ Info:  Adapted ϵ = 0.051517780320521116, std = [1.0, 1.0, 1.0]; 1000 iterations is used for adaption.\n└ @ Turing.Inference /Users/rob/.julia/packages/Turing/FTRCE/src/inference/adapt/adapt.jl:91\n\n\n[NUTS] Finished with\n  Running time        = 159.94918556499996;\n  #lf / sample        = 0.0;\n  #evals / sample     = 20.008;\n  pre-cond. metric    = [1.0, 1.0, 1.0].\n170.377918 seconds (1.34 G allocations: 87.482 GiB, 15.07% gc time)\n\n\n\n\n\n1001:2000Show corrected results (drop adaptation samples)chn2 = MCMCChain.Chains(chn.value[draws,:,:], names=chn.names)Object of type \"Chains{Float64}\"\n\nIterations = 1:1000\nThinning interval = 1\nChains = 1\nSamples per chain = 1000\n\nUnion{Missing, Float64}[154.565 0.941322 … 22.0 0.0515178; 154.916 0.883904 … 34.0 0.0515178; … ; 154.289 0.851291 … 22.0 0.0515178; 154.37 0.937918 … 10.0 0.0515178]Look at the proper draws (in corrected chn2)describe(chn2)Iterations = 1:1000\nThinning interval = 1\nChains = 1\nSamples per chain = 1000\n\nEmpirical Posterior Estimates:\n              Mean                   SD                       Naive SE                      MCSE                ESS    \n   alpha   154.61332796  0.259161915144187238180251 0.0081954193462691650451379 0.0210813303088451635403100  151.128487\n    beta     0.90576261  0.042698830241467457258242 0.0013502555698791454674712 0.0008073661429612670730610 1000.000000\n  lf_num     0.00000000  0.000000000000000000000000 0.0000000000000000000000000 0.0000000000000000000000000         NaN\n       s     5.10082014  0.196183320754445472688943 0.0062038613251943043949699 0.0054795928509070619683019 1000.000000\n elapsed     0.07116950  0.054788946285877590525182 0.0017325786086399600719604 0.0025559342065862200761572  459.501100\n epsilon     0.05151778  0.000000000000000013884732 0.0000000000000000004390738 0.0000000000000000023129646   36.036036\n      lp -1083.66705962  1.208537476717588265984205 0.0382173106410029217450131 0.0685026818053934005714467  311.246945\neval_num    18.60400000 13.295862663398866132524745 0.4204520947313308276704902 0.3685864891718090841088440 1000.000000\n  lf_eps     0.05151778  0.000000000000000013884732 0.0000000000000000004390738 0.0000000000000000023129646   36.036036\n\nQuantiles:\n               2.5%           25.0%           50.0%           75.0%          97.5%    \n   alpha   154.115249976   154.428978890   154.615084568   154.78540763   155.12353252\n    beta     0.823492977     0.874431020     0.906152726     0.93672589     0.98784233\n  lf_num     0.000000000     0.000000000     0.000000000     0.00000000     0.00000000\n       s     4.734281054     4.966697003     5.093838278     5.21369238     5.50648751\n elapsed     0.011072525     0.033625251     0.039526645     0.10545082     0.18928973\n epsilon     0.051517780     0.051517780     0.051517780     0.05151778     0.05151778\n      lp -1086.947008681 -1084.227420414 -1083.320255590 -1082.75445198 -1082.31191138\neval_num     4.000000000    10.000000000    10.000000000    22.00000000    46.00000000\n  lf_eps     0.051517780     0.051517780     0.051517780     0.05151778     0.05151778Compare with a previous resultm4_2s_result = \"\n\nIterations = 1:1000\nThinning interval = 1\nChains = 1,2,3,4\nSamples per chain = 1000\n\nEmpirical Posterior Estimates:\n         Mean        SD       Naive SE       MCSE      ESS\nalpha 154.597086 0.27326431 0.0043206882 0.0036304132 1000\n beta   0.906380 0.04143488 0.0006551430 0.0006994720 1000\nsigma   5.106643 0.19345409 0.0030587777 0.0032035103 1000\n\nQuantiles:\n          2.5%       25.0%       50.0%       75.0%       97.5%\nalpha 154.0610000 154.4150000 154.5980000 154.7812500 155.1260000\n beta   0.8255494   0.8790695   0.9057435   0.9336445   0.9882981\nsigma   4.7524368   4.9683400   5.0994450   5.2353100   5.5090128\n\";Plot the regerssion line and observationsscatter(x, y, lab=\"Observations\", xlab=\"weight\", ylab=\"height\")\nxi = -15.0:0.1:15.0\nyi = mean(chn2.value[:,1,:]) .+ mean(chn2.value[:, 2, :])*xi\nplot!(xi, yi, lab=\"Regression line\")(Image: svg)Plot the chainsplot(chn2)┌ Warning: No strict ticks found\n└ @ PlotUtils /Users/rob/.julia/packages/PlotUtils/GxT73/src/ticks.jl:173\n┌ Warning: No strict ticks found\n└ @ PlotUtils /Users/rob/.julia/packages/PlotUtils/GxT73/src/ticks.jl:173(Image: svg)┌ Warning: No strict ticks found\n└ @ PlotUtils /Users/rob/.julia/packages/PlotUtils/GxT73/src/ticks.jl:173\nGKS: Rectangle definition is invalid in routine SET_WINDOW\nGKS: Rectangle definition is invalid in routine SET_WINDOW\n┌ Warning: No strict ticks found\n└ @ PlotUtils /Users/rob/.julia/packages/PlotUtils/GxT73/src/ticks.jl:173\nGKS: Rectangle definition is invalid in routine SET_WINDOW\nGKS: Rectangle definition is invalid in routine SET_WINDOW\n┌ Warning: No strict ticks found\n└ @ PlotUtils /Users/rob/.julia/packages/PlotUtils/GxT73/src/ticks.jl:173\nGKS: Rectangle definition is invalid in routine SET_WINDOW\nGKS: Rectangle definition is invalid in routine SET_WINDOW\n┌ Warning: No strict ticks found\n└ @ PlotUtils /Users/rob/.julia/packages/PlotUtils/GxT73/src/ticks.jl:173\nGKS: Rectangle definition is invalid in routine SET_WINDOW\nGKS: Rectangle definition is invalid in routine SET_WINDOWEnd of m4.2t.jlThis notebook was generated using Literate.jl."
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
    "text": "maximum_a_posteriori\n\nCompute the maximum_a_posteriori of a model. \n\nMethod\n\nmaximum_a_posteriori(model, lower_bound, upper_bound)\n\nRequired arguments\n\n* `model::Turing model`\n* `lower_bound::Float64`\n* `upper_bound::Float64`\n\nReturn values\n\n* `result`                       : Maximum_a_posterior vector\n\nExamples\n\nSee m2.1t.jl Documentation\n\n\n\n\n\n"
},

{
    "location": "#maximum_a_posteriori-1",
    "page": "Functions",
    "title": "maximum_a_posteriori",
    "category": "section",
    "text": "maximum_a_posteriori(model, lower_bound, upper_bound)link to m2.1t.jl\nlink to maximum_a_posteriori(model, lower_bound, upper_bound)"
},

]}

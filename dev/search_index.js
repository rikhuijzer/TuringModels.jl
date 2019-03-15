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
    "location": "00/section_example/#",
    "page": "section_example",
    "title": "section_example",
    "category": "page",
    "text": "EditURL = \"https://github.com/StatisticalRethinkingJulia/TuringModels.jl/blob/master/scripts/00/section_example.jl\"using TuringModels\n\n@model model() = begin\n    a ~ Normal(-10,.1)\n    b ~ Normal(-8,.1)\n    c ~ Normal(-6,.1)\n    d ~ Normal(-4,.1)\n    return nothing\nend\n\nNsamples = 2000\nNadapt = 1000\ndraws = Nadapt+1 : Nsamples\nδ = .85\nsampler = NUTS(Nsamples, Nadapt, δ)\n\nsampler = Turing.NUTS(2000, 1000, 0.65)\nchn = sample(model(), sampler)\n\nchn1 = set_section(chn, Dict(\n  :parameters => [\"a\", \"c\"],\n  :pooled => [\"b\", \"d\"],\n  :internals => [\"elapsed\", \"epsilon\", \"eval_num\", \"lf_eps\", \"lf_num\", \"lp\"])\n)\n\ndescribe(chn1)\ndescribe(chn1, section=:pooled)\ndescribe(chn1, section=:internals)This page was generated using Literate.jl."
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
    "text": "Define the datak = 6; n = 9;Define the model@model globe_toss(n, k) = begin\n  theta ~ Beta(1, 1) # prior\n  k ~ Binomial(n, theta) # model\n  return k, theta\nend;Compute the \"maximumaposteriori\" valueSet search boundslb = [0.0]; ub = [1.0];Create (compile) the modelmodel = globe_toss(n, k);Compute the maximumaposteriorimaximum_a_posteriori(model, lb, ub)Use Turing mcmcchn = sample(model, Turing.NUTS(2000, 1000, 0.65));Look at the proper draws (in corrected chn2)chn2 = chn[1001:2000, :, :]\ndescribe(chn2)Show the hpd regionMCMCChains.hpd(chn2[:theta], alpha=0.055)End of 02/m2.1t.jlThis page was generated using Literate.jl."
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
    "text": "howell1 = CSV.read(rel_path(\"..\", \"data\", \"Howell1.csv\"), delim=\';\')\ndf = convert(DataFrame, howell1);Use only adults and center the weight observationsdf2 = filter(row -> row[:age] >= 18, df);\nmean_weight = mean(df2[:weight]);\ndf2[:weight_c] = df2[:weight] .- mean_weight;\nfirst(df2, 5)Extract variables for Turing modely = convert(Vector{Float64}, df2[:height]);\nx = convert(Vector{Float64}, df2[:weight_c]);Define the regression model@model line(y, x) = begin\n    #priors\n    alpha ~ Normal(178.0, 100.0)\n    beta ~ Normal(0.0, 10.0)\n    s ~ Uniform(0, 50)\n\n    #model\n    mu = alpha .+ beta*x\n    for i in 1:length(y)\n      y[i] ~ Normal(mu[i], s)\n    end\nend;Draw the samplessamples = 2000\nadapt_cycles = 1000\n\n@time chn = sample(line(y, x), Turing.NUTS(samples, adapt_cycles, 0.65));\ndraws = adapt_cycles+1:samples;Correct NUTS chain (drop adaptation samples)chn2 = Chains(chn[draws,:,:], :parameters)Look at the proper draws (in corrected chn2)describe(chn2)Compare with a previous resultclip_43s_example_output = \"\n\nIterations = 1:1000\nThinning interval = 1\nChains = 1,2,3,4\nSamples per chain = 1000\n\nEmpirical Posterior Estimates:\n         Mean        SD       Naive SE       MCSE      ESS\nalpha 154.597086 0.27326431 0.0043206882 0.0036304132 1000\n beta   0.906380 0.04143488 0.0006551430 0.0006994720 1000\nsigma   5.106643 0.19345409 0.0030587777 0.0032035103 1000\n\nQuantiles:\n          2.5%       25.0%       50.0%       75.0%       97.5%\nalpha 154.0610000 154.4150000 154.5980000 154.7812500 155.1260000\n beta   0.8255494   0.8790695   0.9057435   0.9336445   0.9882981\nsigma   4.7524368   4.9683400   5.0994450   5.2353100   5.5090128\n\";Plot the chainsplot(chn2)End of 04/m4.2t.jlThis page was generated using Literate.jl."
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

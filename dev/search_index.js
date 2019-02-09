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
    "text": "EditURL = \"https://github.com/StatisticalRethinkingJulia/TuringModels.jl/blob/master/scripts/02/m2.1t.jl\"Load Julia packages (libraries) neededusing TuringModels\nusing Optim, Turing, Flux.Tracker\ngr(size=(600,300));Turing.setadbackend(:reverse_diff);"
},

{
    "location": "02/m2.1t/#snippet-2.8t-1",
    "page": "m2.1t",
    "title": "snippet 2.8t",
    "category": "section",
    "text": "Define the datak = 6; n = 9;Define the model@model globe_toss(n, k) = begin\n  theta ~ Beta(1, 1) # prior\n  k ~ Binomial(n, theta) # model\n  return k, theta\nend;Compute the \"maximumaposteriori\" valueSet search boundslb = [0.0]; ub = [1.0];Create (compile) the modelmodel = globe_toss(n, k);Use Turing mcmcchn = sample(model, NUTS(2000, 200, 0.65));Look at the generated draws (in chn)describe(chn)Look at the mean and sdprintln(\"\\ntheta = $(mean_and_std(chn[:theta][201:2000]))\\n\")Fix the inclusion of adaptation sampleschn2 = MCMCChain.Chains(chn.value[201:2000,:,:], names=chn.names)Look at the proper draws (in corrected chn2)describe(chn2)Compute at hpd regionbnds = MCMCChain.hpd(chn2[:, 4, :], alpha=0.06);analytical calculationw = 6; n = 9; x = 0:0.01:1\nplot( x, pdf.(Beta( w+1 , n-w+1 ) , x ), fill=(0, .5,:orange), lab=\"Conjugate solution\")quadratic approximationplot!( x, pdf.(Normal( 0.67 , 0.16 ) , x ), lab=\"Normal approximation\")Turing Chain &  89%hpd region boundaries#tmp = convert(Array{Float64,3}, chn.value[:, 4, :])\n#draws = reshape(tmp, (size(tmp, 1)*size(tmp, 3)),)\ndensity!(chn.value[:, 4, 1], lab=\"Turing chain\")\nvline!([bnds.value[1]], line=:dash, lab=\"hpd lower bound\")\nvline!([bnds.value[2]], line=:dash, lab=\"hpd upper bound\")Show hpd regionprintln(\"hpd bounds = $bnds\\n\")End of clip_08t.jlThis page was generated using Literate.jl."
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
    "location": "#generate_t-1",
    "page": "Functions",
    "title": "generate_t",
    "category": "section",
    "text": "generate_t_(; sd=script_dict_t)\ngenerate_t(chapter::AbstractString; sd=script_dict_t_)\ngenerate_t(chapter::AbstractString, scriptfile::AbstractString; sd=script_dict_t_)"
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

]}

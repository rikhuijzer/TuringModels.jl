# Load Julia packages (libraries) needed  for the snippets in chapter 0

using StatisticalRethinking, CmdStan, StanMCMCChain
gr(size=(500,500));

# CmdStan uses a tmp directory to store the output of cmdstan

ProjDir = rel_path("..", "scripts", "04")
cd(ProjDir)

# ### snippet 4.7

howell1 = CSV.read(rel_path("..", "data", "Howell1.csv"), delim=';')
df = convert(DataFrame, howell1);

# Use only adults

df2 = filter(row -> row[:age] >= 18, df);

# Standardize age, store as age_s

mean_age = mean(df2[:age])
df2[:age_s] = convert(Vector{Float64},
  (df2[:age]) .- mean_age)/std(df2[:age]);
  
  # Standardize height, store as height_s

mean_height = mean(df2[:height])
df2[:height_s] = convert(Vector{Float64},
  (df2[:height]) .- mean_height)/std(df2[:height]);
first(df2, 5)


female_df = filter(row -> row[:male] == 0, df2);
male_df = filter(row -> row[:male] == 1, df2);
first(male_df, 5)

# Plot the densities.

density(df2[:height], lab="All heights", xlab="height [cm]", ylab="density")

# Is it bi-modal?

density!(female_df[:height], lab="Female heights")
density!(male_df[:height], lab="Male heights")

# Define the Stan language model

heightsmodel = "
// Inferring a Rate
data {
  int N;
  real<lower=0> h[N];
}
parameters {
  real<lower=0> sigma;
  real<lower=0,upper=250> mu;
}
model {
  // Priors for mu and sigma
  mu ~ normal(178, 20);
  sigma ~ uniform( 0 , 50 );

  // Observed heights
  h ~ normal(mu, sigma);
}
";

# Define the Stanmodel and set the output format to :mcmcchain.

stanmodel = Stanmodel(name="heights", monitors = ["mu", "sigma"],model=heightsmodel,
  output_format=:mcmcchain);

# Input data for cmdstan

heightsdata = Dict("N" => length(df2[:height]), "h" => df2[:height]);

# Sample using cmdstan

rc, chn, cnames = stan(stanmodel, heightsdata, ProjDir, diagnostics=false,
  summary=false, CmdStanDir=CMDSTAN_HOME);

# Describe the draws

describe(chn)

# Plot the density of posterior draws

density(chn, lab="All heights", xlab="height [cm]", ylab="density")

# End of `clip_07.0s.jl`

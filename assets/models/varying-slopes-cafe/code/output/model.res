Chains MCMC chain (1000×61×1 Array{Float64,3}):

Iterations        = 1:1000
Thinning interval = 1
Chains            = 1
Samples per chain = 1000
parameters        = Rho[1,1], Rho[1,2], Rho[2,1], Rho[2,2], a, a_b_cafe[1,1], a_b_cafe[1,2], a_b_cafe[1,3], a_b_cafe[1,4], a_b_cafe[1,5], a_b_cafe[1,6], a_b_cafe[1,7], a_b_cafe[1,8], a_b_cafe[1,9], a_b_cafe[1,10], a_b_cafe[1,11], a_b_cafe[1,12], a_b_cafe[1,13], a_b_cafe[1,14], a_b_cafe[1,15], a_b_cafe[1,16], a_b_cafe[1,17], a_b_cafe[1,18], a_b_cafe[1,19], a_b_cafe[1,20], a_b_cafe[2,1], a_b_cafe[2,2], a_b_cafe[2,3], a_b_cafe[2,4], a_b_cafe[2,5], a_b_cafe[2,6], a_b_cafe[2,7], a_b_cafe[2,8], a_b_cafe[2,9], a_b_cafe[2,10], a_b_cafe[2,11], a_b_cafe[2,12], a_b_cafe[2,13], a_b_cafe[2,14], a_b_cafe[2,15], a_b_cafe[2,16], a_b_cafe[2,17], a_b_cafe[2,18], a_b_cafe[2,19], a_b_cafe[2,20], b, sigma, sigma_cafe[1], sigma_cafe[2]
internals         = acceptance_rate, hamiltonian_energy, hamiltonian_energy_error, is_accept, log_density, lp, max_hamiltonian_energy_error, n_steps, nom_step_size, numerical_error, step_size, tree_depth

Summary Statistics
      parameters      mean       std   naive_se      mcse         ess      rhat
          Symbol   Float64   Float64    Float64   Float64     Float64   Float64

        Rho[1,1]    1.0000    0.0000     0.0000    0.0000         NaN       NaN
        Rho[1,2]   -0.2309    0.3496     0.0111    0.0118    717.9131    0.9997
        Rho[2,1]   -0.2309    0.3496     0.0111    0.0118    717.9131    0.9997
        Rho[2,2]    1.0000    0.0000     0.0000    0.0000    827.3590    0.9990
               a    3.7346    0.2121     0.0067    0.0052   1218.7630    0.9994
   a_b_cafe[1,1]    4.0954    0.1856     0.0059    0.0038   1011.5836    0.9991
   a_b_cafe[1,2]    2.3530    0.1804     0.0057    0.0070    949.9112    0.9990
   a_b_cafe[1,3]    3.9525    0.1638     0.0052    0.0036   1227.0080    0.9991
   a_b_cafe[1,4]    3.4470    0.1766     0.0056    0.0048   1038.6326    0.9991
   a_b_cafe[1,5]    2.1308    0.1848     0.0058    0.0063   1178.0050    0.9993
   a_b_cafe[1,6]    4.2685    0.1721     0.0054    0.0058   1117.4995    0.9991
   a_b_cafe[1,7]    3.5630    0.1857     0.0059    0.0052   1207.1429    0.9996
   a_b_cafe[1,8]    3.8028    0.1861     0.0059    0.0043    999.9748    0.9996
   a_b_cafe[1,9]    3.9021    0.1726     0.0055    0.0072   1119.9624    0.9990
  a_b_cafe[1,10]    3.6930    0.1725     0.0055    0.0057   1196.2720    0.9993
  a_b_cafe[1,11]    2.4593    0.1901     0.0060    0.0067    863.1679    0.9990
  a_b_cafe[1,12]    4.0782    0.1820     0.0058    0.0035   1358.1466    0.9990
  a_b_cafe[1,13]    3.8887    0.1860     0.0059    0.0060   1229.1131    0.9991
  a_b_cafe[1,14]    3.3372    0.1805     0.0057    0.0060   1169.8518    0.9991
  a_b_cafe[1,15]    4.2547    0.2120     0.0067    0.0111    510.6015    0.9992
  a_b_cafe[1,16]    3.6009    0.1785     0.0056    0.0077    977.7306    1.0021
  a_b_cafe[1,17]    4.4294    0.1853     0.0059    0.0061   1348.4280    0.9992
  a_b_cafe[1,18]    6.1121    0.1901     0.0060    0.0058   1046.6164    0.9993
  a_b_cafe[1,19]    3.4891    0.1838     0.0058    0.0079    875.9515    1.0005
  a_b_cafe[1,20]    3.8993    0.1908     0.0060    0.0078    839.7836    0.9991
   a_b_cafe[2,1]   -1.3110    0.1912     0.0060    0.0060    848.4774    0.9998
   a_b_cafe[2,2]   -1.1856    0.1905     0.0060    0.0053    912.2984    1.0002
   a_b_cafe[2,3]   -1.2652    0.1718     0.0054    0.0047   1249.4303    0.9994
   a_b_cafe[2,4]   -1.2911    0.1836     0.0058    0.0067    889.4131    0.9992
   a_b_cafe[2,5]   -1.2500    0.2100     0.0066    0.0093    827.4570    0.9994
   a_b_cafe[2,6]   -1.2920    0.1817     0.0057    0.0077    967.6678    0.9995
   a_b_cafe[2,7]   -1.2349    0.1841     0.0058    0.0053    974.0458    1.0004
   a_b_cafe[2,8]   -1.2615    0.1932     0.0061    0.0046    956.3147    0.9991
   a_b_cafe[2,9]   -1.1413    0.1879     0.0059    0.0079    630.4071    0.9990
  a_b_cafe[2,10]   -1.1871    0.1862     0.0059    0.0064    895.6303    1.0015
  a_b_cafe[2,11]   -1.0210    0.2218     0.0070    0.0145    371.4903    0.9990
  a_b_cafe[2,12]   -1.2102    0.1796     0.0057    0.0063    921.4850    0.9998
  a_b_cafe[2,13]   -1.3349    0.1932     0.0061    0.0055    979.6141    0.9993
  a_b_cafe[2,14]   -1.3717    0.1972     0.0062    0.0113    576.8556    0.9997
  a_b_cafe[2,15]   -1.5714    0.2724     0.0086    0.0182    293.8773    0.9998
  a_b_cafe[2,16]   -1.1876    0.1770     0.0056    0.0044    945.5425    0.9993
  a_b_cafe[2,17]   -1.1541    0.1943     0.0061    0.0082    599.1401    0.9990
  a_b_cafe[2,18]   -1.3209    0.2297     0.0073    0.0098    788.5668    1.0005
  a_b_cafe[2,19]   -1.0325    0.2201     0.0070    0.0136    409.1361    0.9993
  a_b_cafe[2,20]   -1.0808    0.2241     0.0071    0.0130    465.9236    0.9996
               b   -1.2352    0.0877     0.0028    0.0028    714.6860    0.9991
           sigma    0.4882    0.0264     0.0008    0.0007    954.1911    0.9994
   sigma_cafe[1]    0.9246    0.1784     0.0056    0.0040   1161.6125    0.9990
   sigma_cafe[2]    0.2309    0.1077     0.0034    0.0094    152.7693    0.9990

Quantiles
      parameters      2.5%     25.0%     50.0%     75.0%     97.5%
          Symbol   Float64   Float64   Float64   Float64   Float64

        Rho[1,1]    1.0000    1.0000    1.0000    1.0000    1.0000
        Rho[1,2]   -0.8046   -0.4956   -0.2595    0.0029    0.5446
        Rho[2,1]   -0.8046   -0.4956   -0.2595    0.0029    0.5446
        Rho[2,2]    1.0000    1.0000    1.0000    1.0000    1.0000
               a    3.3189    3.6057    3.7351    3.8722    4.1386
   a_b_cafe[1,1]    3.7277    3.9631    4.0950    4.2215    4.4727
   a_b_cafe[1,2]    1.9967    2.2286    2.3540    2.4808    2.7005
   a_b_cafe[1,3]    3.6231    3.8462    3.9543    4.0561    4.2651
   a_b_cafe[1,4]    3.1087    3.3351    3.4425    3.5618    3.7833
   a_b_cafe[1,5]    1.7798    1.9993    2.1309    2.2539    2.4884
   a_b_cafe[1,6]    3.9440    4.1488    4.2675    4.3837    4.6018
   a_b_cafe[1,7]    3.1776    3.4450    3.5721    3.6879    3.8978
   a_b_cafe[1,8]    3.4549    3.6784    3.8029    3.9330    4.1604
   a_b_cafe[1,9]    3.5829    3.7861    3.9058    4.0163    4.2305
  a_b_cafe[1,10]    3.3488    3.5803    3.6923    3.8037    4.0160
  a_b_cafe[1,11]    2.0640    2.3330    2.4712    2.5890    2.8253
  a_b_cafe[1,12]    3.7257    3.9545    4.0730    4.2113    4.4272
  a_b_cafe[1,13]    3.5308    3.7663    3.8854    4.0163    4.2577
  a_b_cafe[1,14]    3.0002    3.2141    3.3385    3.4595    3.6839
  a_b_cafe[1,15]    3.8475    4.1172    4.2519    4.3945    4.6725
  a_b_cafe[1,16]    3.2490    3.4797    3.6065    3.7256    3.9425
  a_b_cafe[1,17]    4.0664    4.3054    4.4319    4.5474    4.7948
  a_b_cafe[1,18]    5.7418    5.9919    6.1128    6.2342    6.4898
  a_b_cafe[1,19]    3.1163    3.3639    3.4905    3.6203    3.8338
  a_b_cafe[1,20]    3.5172    3.7705    3.9039    4.0359    4.2453
   a_b_cafe[2,1]   -1.7204   -1.4300   -1.3020   -1.1865   -0.9572
   a_b_cafe[2,2]   -1.5554   -1.3081   -1.1857   -1.0653   -0.8138
   a_b_cafe[2,3]   -1.6209   -1.3690   -1.2591   -1.1546   -0.9190
   a_b_cafe[2,4]   -1.6697   -1.4030   -1.2862   -1.1728   -0.9475
   a_b_cafe[2,5]   -1.6730   -1.3844   -1.2346   -1.1107   -0.8595
   a_b_cafe[2,6]   -1.6548   -1.4088   -1.2878   -1.1810   -0.9337
   a_b_cafe[2,7]   -1.5942   -1.3536   -1.2336   -1.1270   -0.8542
   a_b_cafe[2,8]   -1.6683   -1.3723   -1.2595   -1.1444   -0.8756
   a_b_cafe[2,9]   -1.4887   -1.2697   -1.1514   -1.0288   -0.7551
  a_b_cafe[2,10]   -1.5418   -1.2990   -1.1955   -1.0841   -0.7610
  a_b_cafe[2,11]   -1.3958   -1.1770   -1.0368   -0.8829   -0.5688
  a_b_cafe[2,12]   -1.5686   -1.3180   -1.2189   -1.1024   -0.8300
  a_b_cafe[2,13]   -1.7487   -1.4478   -1.3175   -1.2021   -0.9906
  a_b_cafe[2,14]   -1.8005   -1.4953   -1.3507   -1.2293   -1.0525
  a_b_cafe[2,15]   -2.1671   -1.7454   -1.5313   -1.3664   -1.1445
  a_b_cafe[2,16]   -1.5166   -1.3058   -1.1970   -1.0744   -0.8176
  a_b_cafe[2,17]   -1.5088   -1.2919   -1.1712   -1.0296   -0.7602
  a_b_cafe[2,18]   -1.7660   -1.4687   -1.3154   -1.1779   -0.8639
  a_b_cafe[2,19]   -1.3781   -1.1944   -1.0614   -0.8942   -0.5361
  a_b_cafe[2,20]   -1.4566   -1.2284   -1.1083   -0.9571   -0.5555
               b   -1.4030   -1.2938   -1.2354   -1.1781   -1.0634
           sigma    0.4407    0.4701    0.4865    0.5047    0.5420
   sigma_cafe[1]    0.6412    0.7993    0.8985    1.0315    1.3410
   sigma_cafe[2]    0.0583    0.1476    0.2239    0.2982    0.4795
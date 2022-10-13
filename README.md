# Puppeteer-Performance-Analysis-for-Parallelization
This repo will provide some scripts in order to evaluate **Puppeteer** performance in parallelized setups. 

There are currently two parallelized approachs that will be compared : 
- **S**ingle **B**rowser > **M**ultiples **P**ages (SBMP)
- **M**ultiples **B**rowsers > **S**ingle **P**age (MBSP) 

We will refer to them using **SBMP** for the 1st one and **MBSP** for the 2nd one.

Along with some results from the performed tests.


**Dependencies:** 
- <a href="https://www.npmjs.com/package/puppeteer-core">puppeteer-core</a>
- <a href="https://www.npmjs.com/package/mathjs">mathjs</a> (used for rounding `float` values during test result transformation)

If you have not installed those modules yet you can do it with:
<pre>npm i puppeteer-core
npm i mathjs</pre>





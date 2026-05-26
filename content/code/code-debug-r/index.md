---
description: This album showcases visualizations related to writing and debugging code in R. It includes code snippets, debugging workflows, error-handling techniques, and insights into writing nice(r) functions in R. Whether you're troubleshooting issues or improving efficiency, these visuals provide a helpful guide to coding in R.
title: Writing and Debugging Code in R
categories: ["Code", "R"]
params:
  theme: light
resources:
  - src: CS_Functions.png
    title: Image showing how a general function in R looks like (a function has arguments, a function statement, and usually a return function). Good practices when writing functions are such as 1) use meaningful names for your functions, 2) make your function short and simple - each function should do one thing at a time, 3) use an explicit return statement, and 4) writing assertions, warnings and stops is helpful
  - src: CS_Package.png
    title: A summary reiterating the basic structure in package development (DESCRIPTION, NAMESPACE, R/, man/, and tests/) as well as helpful packages (devtools, use this, roxygen2, testthat, xpectr, cover, goodpractice, inteRgrate).
  - src: CS_Debugging.png
    title: Image showing a mole as a comparison for the debugging process (a mole digs in using debug(), stops when there is a browser(), and leaves the tunnel when calling undebug(). It also shows how the flow package works and that you get a visual overview of the "flow" of your package.
    params:
      cover: true
---
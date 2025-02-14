---
title: Explainable AI
description: This album includes visual on model interpretability techniques, and more—offering insights into how AI understands and explains language.
categories: ["XAI", "Machine Learning"]
resources:
  - src: explainable_ai.png
    title: The visualization of six different model agnostic approaches to explain machine learning models post-hoc such as<br><br>- Feature importance is based on the idea of permutation where you shuffle the values of a feature. If this change increases the model error, the feature is perceived to be important.<br>- Shapley values are based on a game theoretical approach that calculates the average of *all* marginal contributions to *all* possible outcomes.<br>- LIME plots tell you locally around a data point what the most important feature is. While they may look similar to SHAP, they are only an approximation (calculated on a small set of features and do not provide a guarantee of accuracy and consistency.<br>- ICE plots show the individual conditional expectation where all other features are kept the same and the effects for one feature are calculated.<br>-  Partial dependency plots visualize the *average* output of the model for each target feature value for the entire dataset.<br>- Breakdown plots show the contribution of every variable to the final prediction.
  - src: integrated_gradients.png
    title: The visualization shows the logic of integrated gradients. You start with your baseline which does not have any effect on the model classification and continue stepwise using linear interpolation to get to the original input. On the way, you calculate the model's prediction, compare it to the baseline, and derive the integrated gradients for each input feature by summing up the results of these calculations.
    params:
      cover: true
---
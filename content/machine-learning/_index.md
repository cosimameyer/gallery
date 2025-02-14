---
title: Machine Learning
description: This album showcases a collection of machine learning visualizations, focusing on Natural Language Processing (NLP) and Explainable AI (XAI).
resources:
  - src: BERT_BoW_blue.png
    title: Image showing two different workflows (Bag of words and BERT). The main difference is that with BERT you build upon a pre-trained model and tokenizer while with BOW you often have to train a model from scratch.
    params:
      cover: true
  - src: BERT_Embedding_blue.png
    title: 
  - src: BERT_training_blue.png
    title: Image showing three important components to know when training a BERT model.<br> First, with BERT, you identify the order of the input. You give the model information about different embedding layers (the tokens (BERT uses special tokens ([CLS] and [SEP]) to make sense of the sentence), the positional embedding (where each token is placed in the sentence), and the segment embedding (which gives you more info about the sentences to which the tokens belong). And then there is the training. The first half of the training involves masking the words (Mask ML). During the training period, you mask one word at a time and the model learns, which word usually follows. During the second half, you train the model to predict the next sentence. This way, the model learns which sentences usually follow each other.
  - src: CS_Terms_purple.png
    title: Image showing a visual overview of terms and concepts explaining a corpus, tokens, tokenization, DFM, stemming, and lemmatization. The verbalized version is in the text below.<br><br>"Corpus" - When you have your text data ready, you have your corpus. It’s a collection of documents. <br><br>"Tokens" - Define each word in a text (but it could also be a sentence, paragraph, or character). <br><br>"Tokenization" - When you hear the word tokenization, it means that you are splitting up the sentences into single words (tokens) and turning them into a bag of words. You can take this quite literally - a bag of words does not really take the order of the words into account. There are ways to account for the order using n-grams (so for instance a bigram would leave the sentence "Rory lives in a world of books" as "Rory lives", "lives in", "in a", "a world", "world of", "of books") but it’s limited. <br><br>"Document-feature matrix (DFM)" - To generate the DFM you first split the text into its single terms (tokens), then count how frequently each token occurs in each document. <br><br>"Stemming" - With stemming, you are getting the stem of the word. <br><br>"Lemmatization" - With lemmatization, it’s slightly different. Instead of "stud" (which is the stem of the study terms), you end up with a meaningful stem - "study"
menus: "main"
categories: ["Machine Learning", "NLP", "XAI"]
---
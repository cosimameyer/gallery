---
title: Natural Language Processing
description: This album includes visual representations of text embeddings, and model training.
categories: ["Machine Learning"]
resources:
  - src: BERT_BoW_blue.png
    title: Visualization titled 'Natural Language Processing — Two Possible Workflows' comparing Bag of Words and BERT. Bag of Words — load data, tokenize and pre-process text (stemming, lemmatization, removing stop words) to generate a document feature matrix (DFM), then use labeled data to train a model or apply dictionary-based approaches. BERT — load data with a pre-trained tokenizer and model, tokenize text under the hood, then fine-tune for text classification, sentiment analysis, translation, or question answering.
  - src: BERT_Embedding_blue.png
    title: Visualization titled 'How BERT Captures Text' showing three embedding layers BERT uses to identify input order — Token Embedding (one embedding per token), Segment Embedding (marks which sentence a token belongs to), and Position Embedding (encodes position of each token). Example input shown is '[CLS] Mannheim is a beautiful city [SEP]'. A cartoon of Bert from Sesame Street appears on the right.
  - src: BERT_training_blue.png
    title: Visualization titled 'How to Pre-Train Your BERT Model' covering two tasks. 1) Masked Language Modeling — one word in the input is masked (e.g. '[CLS] mannheim is a [MASK] city [SEP]') and BERT predicts the original word. 2) Next Sentence Prediction — given a document the model predicts whether sentence B follows sentence A.
    params:
      cover: true
  - src: CS_Terms_purple.png
    title: Vertical cheat sheet of 6 key NLP terms — Corpus (collection of documents), Tokens (each individual word, sentence, paragraph, or character in a text), Tokenization (creating a bag of words), Document-feature matrix or DFM (split text into terms then count how frequently each token occurs in each document), Stemming (getting the stem of the word, e.g. playing/player/plays → play), Lemmatization (getting the meaningful stem, e.g. studies/studying/study → study).
---
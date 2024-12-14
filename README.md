# Emerging Technologies Assignment

## Overview
This project is part fo the Emerging Technologies module in ATU Galways Level 8 degree in Software development. This repository is based on getting farmilar with the basics of Artifical Intelligence and how it is implemented. The repository consists of a series of tasks based on trigram models and First order letter and word approximations and JSON data handling. It also contains my own implementation of a Eliza bot, a early natural language processing program.

## How to run
1. Clone the repository to your local machine: /n
   git clone https://github.com/kkmm1234/emergingtechnologies/n
2. Notebook:/n
   If run on VSC the required extension can be installed automatically be hitting select kernal on the top right and selecting the first option./n
   The kernal requires Python.3.13.0, you will be promtped to install when ran if python is missing from your machine./n
3. Eliza bot:/n
   If you would like you can host the Eliza bot on you own webpage./n
   It is much simplier for you to access the Eliza bot through [Github pages where I've hosted it.](https://kkmm1234.github.io/emergingtechnologies/)

## Tasks
1. **Task 1 - Trigram Model**:
   - Read text files and remove any preamble and postamble.
   - Clean the data converting it to lower case and removing any unwanted charecters.
   - Generate a trigram model from the cleaned text and store it.
2. **Task 2 - Third Order Letter Approximation Generation**
   - Intialize a string starting with TH.
   - Generate each charecter by looking at two previous charecters finding the sequence in the trigram and using the counts as weights to randomly select next letter.
   - Repeat until 10,000 charecters have been generated.
3. **Task 3 - Analyse Model**
   - Read file containing vaild words into a data structure.
   - Process generated text by spliting into words.
   - Calculate valid words by comparing generated words to words in vaild word data structure.
   - Compute a percentage for the models accuracy to generate valid words.
4. **Task 4 - Export Model as Json**
   - Serialize the Model by converting the trigram model into JSON format
   - Save the serialized model to a JSON file : trigrams.json


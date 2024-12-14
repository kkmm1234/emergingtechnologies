# Emerging Technologies Assignment

## Overview
This repository is part of the Emerging Technologies module in ATU Galways Level 8 degree in Software development. This repository is based on the basics of Artifical Intelligence and how it is implemented. The repository consists of a series of tasks based on trigram models and First order letter and word approximations and JSON data handling. It also contains my own implementation of a Eliza bot, a early natural language processing program.

## How to run
1. Clone the repository to your local machine:
   - git clone https://github.com/kkmm1234/emergingtechnologies
3. Notebook:
   - If run on VSC the required extensions can be installed automatically installed be hitting select kernal on the top right and selecting the first option.
   - The kernal requires Python, you will be promtped to install when ran if python is missing from your machine.
5. Eliza bot:
   - If you would like you can host the Eliza bot on you own webpage. It is much simpler for you to access the Eliza bot through [Github pages here,](https://kkmm1234.github.io/emergingtechnologies/) where I've hosted.

## Progress Tracking
If you would like to see how this project progressed through the development window you can check the commit history [here](https://github.com/kkmm1234/emergingtechnologies/commits/main/). You can also take a look at closed Github Issues and Milestones [here](https://github.com/kkmm1234/emergingtechnologies/issues?q=is%3Aissue+is%3Aclosed) which were used to document the planning and progress behind this project.
   
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
   - Serialize the Model by converting the trigram model into JSON format.
   - Save the serialized model to a JSON file : trigrams.json.
  
## Eliza Chatbot
The Eliza inspired chatbot uses pattern matching and reflection to respond to user inputs in a meaningful way.
1. Features:
   - **Pattern Matching**: uses regular expressions to detect user input patterns.
   - **Reflecion**: The reflect function inverts a user statement to create converstaional flow eg: (I am good are how are you -> You are good how am I).
   - **Predefined responses**: A object of predefined responses follow patterns such as emotions, family and requests for things like advice.
   - **Default Responses**: Fallback responses are provided to keep conversation alive if input does not match a pattern.

## Technical details
   - JavaScript for chatbot logic.
   - HTML/CSS for web interface.

## References 
- Module git repo: https://github.com/ianmcloughlin/2425_emerging_technologies/tree/main
- Markdown guide: https://www.markdownguide.org/
- Python docs: https://docs.python.org/3/
- Reading text files Python: https://www.w3schools.com/python/python_file_open.
- Java Script docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Java Script Objects: https://www.w3schools.com/js/js_objects.asp
- Regex in Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions






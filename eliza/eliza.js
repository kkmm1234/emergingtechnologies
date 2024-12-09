//DOM elements
const inputElement = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const textArea = document.getElementById('conversation');

//messages funcion
function addMessage() {
    //get user input
    const userMessage = inputElement.value.trim();

    if (userMessage === "") { 
        return; //do nothing if input is empty
    }

    //add user message
    //create a div element
    const userElement = document.createElement('div');
    //add class to the div element
    userElement.className = 'user-message';
    //add text content to the div element
    userElement.textContent = `${userMessage}`;
    //append the div element to the textArea
    textArea.appendChild(userElement);

    //set the input to empty
    inputElement.value = '';
}

//reflections object
const reflections = {
    "i": "you",
    "me": "you",
    "my": "your",
    "am": "are",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "are": "am",
    "was": "were",
    "were": "was",
    "i'd": "you would",
    "i've": "you have",
    "i'll": "you will",
    "you'd": "I would",
    "you've": "I have",
    "you'll": "I will",
    "myself": "yourself",
    "yourself": "myself"
}

//reflect function
function reflect(input) {
    //split the input into words
    const words = input.toLowerCase().split(' ');
    //map the words to their reflections
    const reflectedWords = words.map(word => reflections[word] || word);
    //join the reflected words back into a sentence
    return reflectedWords.join(' ');
}

//test response
function respond(input) {
    const reflected = reflect(input);
    return `input "${userInput}", output: "${reflected}"`;
}

//event listener for send button calls add message function
sendButton.addEventListener('click', addMessage);

//test
const userInput = "I am feeling good how are you feeling";
console.log(respond(userInput));
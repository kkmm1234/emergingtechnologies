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

//responses object
const responses = [
    {
        pattern: /I need (.*)/,
        response: [
            "Why do you need {0}?",
            "Would getting {0} help you?",
            "What if you didn't need {0}?"
        ]
    },
    {
        //only process one word after I feel so bot doesnt output more then the feeling
        pattern: /I feel (\w+)/,
        response: [
            "Why do you feel {0}?",
            "How often do you feel {0}?",
            "What makes you feel {0}?"
        ]
    }
];

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
    //iterate over the response patterns
    for(let i = 0; i < responses.length; i++) {
        const { pattern, response} = responses[i];
        //attempt to match the input to the pattern
        const match = input.match(pattern);
        
        //if the input matches the pattern
        if(match){
            //randomly select a response
            const selectedResponse = response[Math.floor(Math.random() * response.length)];
            //reflected the response groups
            const reflectedGroups = match.slice(1).map(group => reflect(group));

            //replace placeholders with reflected groups
            return selectedResponse.replace(/{(\d+)}/g, (match, number) => reflectedGroups[number] || match);
        }
    }
    //default response
    return "I'm not sure I understand, please explain further.";
}

//event listener for send button calls add message function
sendButton.addEventListener('click', addMessage);

//test
const userInput = "I feel good how are you feeling";
console.log(respond(userInput));
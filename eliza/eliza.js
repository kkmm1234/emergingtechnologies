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

    //add bot message
    const elizaResponse = respond(userMessage);

    //add elizas repose to text area
    const elizaElement = document.createElement('div');
    elizaElement.className = 'eliza-message';
    elizaElement.textContent = `${elizaResponse}`;
    textArea.appendChild(elizaElement);

    //scroll to the bottom of the text area
    textArea.scrollTop = textArea.scrollHeight;
}

//reflections object
const reflections = {
    "i": "you",
    "me": "you",
    "my": "your",
    "am": "are",
    "you": "I",
    "you" : "me",
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
const responses = {
    'hello|hi|hey': [
        "Hello! How are you feeling today?",
        "Hi there! What's on your mind?",
        "Hey! How can I help you?"
    ],
    '(.*)?you remind me of (.*)': [
        "Why do you think I remind you of {1}?",
        "What makes you think of {1} when talking to me?",
        "Is it a good feeling to be reminded of {1}?"
    ],
    '(.*)?mother|father|family|parent(.*)': [
        "Tell me more about your family.",
        "How does that make you feel about your family?",
        "What role does your family play in your thoughts?"
    ],
    '(.*)?I need (.*)': [
        "Why do you need {1}?",
        "Would getting {1} really help you?",
        "What if you didn't need {1}?"
    ],
    '(.*)?I am (.*)': [
        "Why do you think you are {1}?",
        "How long have you felt that way?",
        "What made you feel like {1}?"
    ],
    '(.*)?I feel (.*)': [
        "Why do you feel {1}?",
        "Does feeling {1} happen often?",
        "How does that feeling affect you?"
    ],
    '(.*)?(sorry|apologize)(.*)': [
        "No need to apologize.",
        "Apologies aren't necessary. Why do you feel that way?",
        "It's okay to feel that way."
    ],
    'bye|goodbye|exit': [
        "Goodbye! Take care.",
        "Thank you for sharing. Goodbye!",
        "Bye! I'm here if you need to talk again."
    ],
    '(.*)': [
        "Can you tell me more?",
        "Why do you say that?",
        "How does that make you feel?",
        "What do you mean by that?",
        "Interesting... go on."
    ]
};



//reflect function
function reflect(input) {
    //convert input to lowercase and split into words
    const words = input.toLowerCase().split(' ');
    //iterate over the words and reflect if there is a reflection
    const reflectedWords = words.map(word => reflections[word] || word);
    //return the reflected words as a string
    return reflectedWords.join(' ');
}

//response method
function respond(input) {
    //iterate over the response patterns
    for(const [pattern, responseList] of Object.entries(responses)) {
        //attempt to match the input to the pattern
        const regex = new RegExp(pattern, 'i');
        const match = input.match(regex);
        
        //if the input matches the pattern
        if(match){
            //randomly select a response
            const selectedResponse = responseList[Math.floor(Math.random() * responseList.length)];
           
            if (match.length > 1){
                //reflected the response groups
                const reflectedGroups = match.slice(1).map(group => group ? reflect(group): '');
                
                //replace placeholders with reflected groups
                return selectedResponse.replace(/{(\d+)}/g, (_, number) => reflectedGroups[number] || '');
            }
            return selectedResponse;
        }
    }
    return "I'm not sure I understand. Could you explain that further?";
}

//event listener for send button calls add message function
sendButton.addEventListener('click', addMessage);

//test
const userInput = "I feel good how are you feeling";
console.log(respond(userInput));
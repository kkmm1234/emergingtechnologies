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

const responses = [
    {
        //using word boundaries for more accurate matching
        pattern: /\bi (?:am|feel|was) ((?:\w+\s*)+)\b/i,
        response: [
            "Why do you feel {0}?",
            "How long have you felt {0}?",
            "Do you often feel {0}?",
            "What makes you feel {0}?"
        ]
    },
    {
        //handle you followed by prepositions separately
        pattern: /\byou (?:are|seem|look) ((?:\w+\s*)+)\b/i,
        response: [
            "What makes you think I am {0}?",
            "Why do you say I am {0}?",
            "Does it matter to you if I am {0}?"
        ]
    },
    {
        //improved pattern for I need/want
        pattern: /\bi (?:need|want) ((?:\w+\s*)+)\b/i,
        response: [
            "Why do you need {0}?",
            "Would it really help you to get {0}?",
            "Are you sure you need {0}?"
        ]
    },
    {
        //pattern for questions about the bot
        pattern: /\bcan you ([^?]+)\??/i,
        response: [
            "You believe I can {0}?",
            "What makes you think I can {0}?",
            "Perhaps you would like me to {0}?"
        ]
    },
    {
        //pattern for memory/remembering
        pattern: /\bi (?:remember|recall) ((?:\w+\s*)+)\b/i,
        response: [
            "Do you often think of {0}?",
            "Does thinking of {0} bring anything else to mind?",
            "What else do you remember about {0}?"
        ]
    },
    {
        //pattern for problems/difficulties
        pattern: /\bi (?:can't|cannot) ((?:\w+\s*)+)\b/i,
        response: [
            "How do you know you can't {0}?",
            "Have you tried to {0}?",
            "Perhaps you could {0} now?"
        ]
    },
    {
        //pattern for feelings about others
        pattern: /\b(?:my|our) ((?:mother|father|sister|brother|family|friend)(?:\s\w+)*)\b/i,
        response: [
            "Tell me more about your {0}.",
            "How do you feel about your {0}?",
            "What comes to mind when you think of your {0}?"
        ]
    },
    {
        //pattern for statements about the past
        pattern: /\bi (?:was|used to) ((?:\w+\s*)+)\b/i,
        response: [
            "How do you feel about {0} now?",
            "And what about now?",
            "How has that changed?"
        ]
    },
    {
        //pattern for helos
        pattern: /\b(?:hello|hi|hey)\b/i,
        response: [
            "Hello! How are you feeling today?",
            "Hi there! What's on your mind?",
            "Hey! How can I help you?"
        ]
    },
    {
        //pattern for goodbyes
        pattern: /\b(?:goodbye|bye)\b/i,
        response: [
            "Goodbye! Take care.",
            "Thank you for sharing. Goodbye!",
            "Bye! I'm here if you need to talk again."
        ]
    },
    {
        //default pattern
        pattern: /(.*)/i,
        response: [
            "Please tell me more.",
            "Let's explore that together.",
            "What does that suggest to you?",
            "Can you elaborate on that?",
            "I see. Please go on."
        ]
    }
];



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
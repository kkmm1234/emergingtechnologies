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
    "my": "your",
    "me": "you",
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
        pattern: /I need (.*)/i,
        response: [
            "Why do you need {0}?",
            "Would getting {0} help you?",
            "What if you didn't need {0}?",
            "How would you feel if you didn't have {0}?",
            "Is there a specific reason you need {0}?",
            "How long have you needed {0}?"
        ]
    },
    
    {
        //\w+ processes only one word after "I feel"
        pattern: /I feel (\w+)/i,
        response: [
            "Why do you feel {0}?",
            "How often do you feel {0}?",
            "What makes you feel {0}?",
            "When was the last time you felt {0}?",
            "What would make you feel {0} again?",
            "Do you usually feel {0} in certain situations?"
        ]
    },
    
    {
        pattern: /I want (.*)/i,
        response: [
            "Why do you want {0}?",
            "What makes you desire {0}?",
            "How would getting {0} make you feel?",
            "What would you do with {0}?",
            "How do you think obtaining {0} would affect you?"
        ]
    },
    
    {
        pattern: /I am (\w+)/i,
        response: [
            "Why do you feel you are {0}?",
            "What made you feel {0}?",
            "Do you usually feel {0}?",
            "When was the last time you felt {0}?",
            "How long have you been feeling {0}?"
        ]
    },
    
    {
        pattern: /I can't (.*)/i,
        response: [
            "What makes you think you can't {0}?",
            "Why do you feel you can't {0}?",
            "Have you tried to {0} before?",
            "What if you could {0}?",
            "What would happen if you could {0}?"
        ]
    },
    
    {
        pattern: /I don't know/i,
        response: [
            "What makes you feel unsure?",
            "Why do you think you don't know?",
            "What could help you figure it out?",
            "Is there a way to find out?",
            "How would you feel if you did know?"
        ]
    },
    
    {
        pattern: /I think (.*)/i,
        response: [
            "Why do you think {0}?",
            "What makes you believe that {0}?",
            "Have you thought about it from a different perspective?",
            "Do you think you are sure about {0}?",
            "How do you feel about {0}?"
        ]
    },
    
    {
        pattern: /You are (\w+)/i,
        response: [
            "What makes you say I'm {0}?",
            "How does it feel to say I'm {0}?",
            "What does being {0} mean to you?",
            "Why do you think I am {0}?",
            "Would you like me to be {0}?"
        ]
    },
    
    {
        pattern: /I remember (.*)/i,
        response: [
            "Why do you remember {0}?",
            "What happened when you remembered {0}?",
            "How do you feel about remembering {0}?",
            "How long ago did you remember {0}?",
            "Do you think remembering {0} has affected you?"
        ]
    },
    
    {
        pattern: /I always (.*)/i,
        response: [
            "Why do you always {0}?",
            "Do you feel like it's always necessary to {0}?",
            "Have you considered changing the way you {0}?",
            "What would happen if you stopped always {0}?",
            "Is there a reason you always {0}?"
        ]
    },
    
    {
        pattern: /I never (.*)/i,
        response: [
            "What makes you never {0}?",
            "Why do you feel you never {0}?",
            "Have you always felt this way about {0}?",
            "What would happen if you did {0}?",
            "Do you think it's important to never {0}?"
        ]
    },
    
    {
        pattern: /I feel like (.*)/i,
        response: [
            "Why do you feel like {0}?",
            "What makes you think you feel like {0}?",
            "What would make you feel differently about {0}?",
            "Is there a reason you feel like {0}?",
            "Have you felt like {0} before?"
        ]
    },
    
    {
        pattern: /I want to (.*)/i,
        response: [
            "Why do you want to {0}?",
            "What makes you want to {0}?",
            "How would you feel if you could {0}?",
            "What would it take for you to {0}?",
            "How would your life change if you {0}?"
        ]
    },
    
    {
        pattern: /I don't (.*)/i,
        response: [
            "Why don't you {0}?",
            "What makes you not {0}?",
            "Is there something stopping you from {0}?",
            "Do you think you should {0}?",
            "What would happen if you did {0}?"
        ]
    },
    
    {
        pattern: /You should (.*)/i,
        response: [
            "Why do you think I should {0}?",
            "What makes you say I should {0}?",
            "How do you feel about me {0}?",
            "Would it help if I {0}?",
            "What makes you think I should {0}?"
        ]
    },
    
    {
        pattern: /Tell me about (.*)/i,
        response: [
            "What would you like to know about {0}?",
            "Why are you interested in {0}?",
            "How does {0} make you feel?",
            "What do you think about {0}?",
            "Do you have any experience with {0}?"
        ]
    },
    
    {
        pattern: /Why (.*)/i,
        response: [
            "What makes you ask why {0}?",
            "What do you think about {0}?",
            "Why do you think that is?",
            "How do you feel about {0}?",
            "What would you do if {0}?"
        ]
    },

    //Default response for unrecognized input
    {
        pattern: /.*/,
        response: [
            "I'm not sure I understand. Could you explain that further?",
            "I dont understand, Can you tell me more about that?",
            "I'm not sure how to respond to that. Could you explain more?"
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
}

//event listener for send button calls add message function
sendButton.addEventListener('click', addMessage);

//test
//const userInput = "I feel good how are you feeling";
//console.log(respond(userInput));
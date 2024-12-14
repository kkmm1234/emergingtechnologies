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
    "mine": "yours",
    "am": "are",
    "i'm": "you're",
    "i'd": "you would",
    "i've": "you've",
    "i'll": "you'll",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "you're": "I'm",
    "you've": "I've",
    "you'll": "I'll",
    "you'd": "I'd",
    "yourself": "myself",
    "myself": "yourself"
};

const responses = {
    //I feel patterns
    "(.*)I feel (.*)": [
        "What’s made you feel {1}?",
        "Why do you think you’re feeling {1}?",
        "How long have you been feeling {1}?",
        "Does feeling {1} happen often for you?"
    ],

    //I am patterns
    "(.*)I am (.*)": [
        "What makes you believe you’re {1}?",
        "How long have you thought of yourself as {1}?",
        "What led you to think you’re {1}?",
        "Has something specific made you feel like you’re {1}?"
    ],

    //I need patterns
    "(.*)I need (.*)": [
        "Why do you feel like you need {1}?",
        "How would having {1} change things for you?",
        "What if you didn’t have {1}? Could there be another way?",
        "Do you often feel like you need {1}?"
    ],

    //emotions
    "glad|happy|excited|cheerful": [
        "That’s amazing! What’s brightened your day?",
        "I’m happy to hear that! What’s bringing you so much joy?",
        "It’s wonderful that you’re feeling cheerful. What’s the occasion?",
        "Great to know you’re in good spirits! What’s making you feel so positive?"
    ],

    "sad|unhappy|miserable|blue": [
        "I’m sorry to hear that. What’s been on your mind lately?",
        "It’s tough feeling down. Would you like to share what’s going on?",
        "Feeling blue can be heavy. I’m here to listen if you’d like to talk.",
        "What’s making you feel this way? Let’s work through it together."
    ],

    "angry|upset|frustrated|irritated": [
        "I can sense you’re upset. What’s caused these feelings?",
        "It seems like you’re angry. What happened to make you feel this way?",
        "Frustration can be challenging. Would talking about it help?",
        "What’s been bothering you? Let me know how I can assist."
    ],

    "worried|anxious|uneasy|fearful": [
        "You seem concerned. Would sharing what’s troubling you help?",
        "Feeling worried can be overwhelming. What’s on your mind?",
        "What’s been making you feel uneasy? Let’s try to unpack it.",
        "Anxiety can feel like a heavy weight. How can I support you?"
    ],

    //family patterns
    "(.*)mother|father|sibling|parent|family(.*)": [
        "Tell me more about your family life.",
        "How do you feel about your family relationships?",
        "What role does your family play in your life these days?",
        "It sounds like family is on your mind. Care to elaborate?"
    ],

    //advice patterns
    "advice|help|support|suggestion": [
        "What kind of advice or help are you looking for?",
        "Sometimes exploring the situation can help. What do you think?",
        "What would you like to change or improve about your situation?",
        "Let’s think of some steps you could take. What feels manageable for you?"
    ],
    
    //hello patterns
    "hi|hello|hey there|greetings": [
        "Hi! What’s been on your mind today?",
        "Hello there! How are you doing right now?",
        "Hey! How can I be of assistance to you?",
        "Greetings! What’s brought you here today?"
    ],
    
    //goodbye patterns
    "goodbye|bye|later|farewell": [
        "Take care! It’s been a pleasure chatting with you.",
        "See you later! Remember, I’m here when you need to talk.",
        "Goodbye for now. Feel free to return whenever you like.",
        "Farewell! Wishing you the best until next time."
    ],

    //default
    "(.*)": [
        "Can you expand on that?",
        "I’m listening. What else is on your mind?",
        "Why do you say that? Can you explain more?",
        "I’d like to hear more about that.",
        "Hmm, interesting. Could you tell me more?",
        "I didn’t catch that. Could you clarify for me?",
        "What do you mean by that? Let’s dive deeper.",
        "I’m here to listen—please share more details."
    ]
};

//reflect function
function reflect(input) {
    //split into words preserve punctuation
    const words = input.toLowerCase().match(/\b\w+\b|\S/g) || [];
    
    //iterate over words
    return words.map((word, index, array) => {
        //get the reflection for the word
        const reflection = reflections[word];
        
        //if no reflection exists return the word
        if (!reflection) return word;
        
        //special handling for contexts
        if (word === "you" || word === "i") {
            //check previous word for problems
            const prevWord = array[index - 1];
            const nextWord = array[index + 1];
            const problems = ["to", "for", "with", "at", "by", "about"];
            
            //if the previous or next word is a problem word
            if (problems.includes(prevWord) || problems.includes(nextWord)) {
                return word === "you" ? "me" : "you";
            }
        }
        
        return reflection;
    }).join(' ');
}

//response method
function respond(input) {
    //iterate over the response patterns
    for(const [pattern, response] of Object.entries(responses)) {
        //create a regex pattern
        const regex = new RegExp(pattern, 'i');
        //check if the input matches the pattern
        const match = input.match(regex);
        
        //if the input matches the pattern
        if(match){
            //randomly select a response
            const selectedResponse = response[Math.floor(Math.random() * response.length)];
           
            if (match.length > 1){
                //reflected the response groups
                const reflectedGroups = match.slice(1).map(group => group ? reflect(group.trim()): '');
                
                //replace placeholders with reflected groups
                return selectedResponse.replace(/{(\d+)}/g, (_, number) => reflectedGroups[number] || '');
            }
            //return the selected response if no groups
            return selectedResponse;
        }
    }
    //return default response if no matches
    return "I'm not sure I understand. Could you explain that further?";
}

//event listener for send button calls add message function
sendButton.addEventListener('click', addMessage);
//get enter key to call add message function
inputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addMessage();
    }
})

//test
const userInput = "I feel good how are you feeling";
console.log(reflect(userInput));
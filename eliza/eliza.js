//DOM elements
const inputElement = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const textArea = document.getElementById('conversation');

//messages funcion
function addMessage() {
    const userMessage = inputElement.value.trim();

    if (userMessage === "") { 
        return; //do nothing if input is empty
    }

    //add user message
    const userElement = document.createElement('div');
    userElement.className = 'user-message';
    userElement.textContent = `You: ${userMessage}`;
    textArea.appendChild(userElement);

    inputElement.value = '';
}

sendButton.addEventListener('click', addMessage);
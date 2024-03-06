/*
 * We have the following use cases:
 *
 *  - Send message
 *  - Abort response
 *
 * We have the following elements:
 *
 * - message input
 * - send button
 *
 * - chat history
 * - chat message (request & response)
 *
 * - sidebar
 * - menu
 */
// Configuration and DOM elements
let controller; // Interrupt controller
const ollamaHost = 'http://localhost:11434';
const url = `${ollamaHost}/api/generate`;
const sendButton = document.getElementById('send-button');
const abortButton = document.getElementById('abort-button');
const messageInput = document.getElementById('message-input');
const chatHistory = document.getElementById('chat-history');

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    alert('An error occurred: ' + message);
    return true; // Prevents the default browser error handling
};

// Event listeners
sendButton.addEventListener('click', sendMessage);
abortButton.addEventListener("click", () => {
    if (controller) {
        controller.abort();
        enableInput();
        console.log("Request aborted");
    }
});
messageInput.addEventListener('keypress', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
        sendMessage();
    }
});
messageInput.focus();

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

function enable(elem) {
    elem.disabled = false;
}

function disable(elem) {
    elem.disabled = true;
}

function enableInput() {
    show(sendButton);
    hide(abortButton);
    enable(messageInput);
    messageInput.focus();
}

function disableInput() {
    hide(sendButton);
    show(abortButton);
    disable(messageInput);
}

// Send message and handle response
async function sendMessage() {
    const message = messageInput.value.trim();
    messageInput.value = '';
    if (message && message.length > 0) {
        disableInput()
        const requestDiv = createMessageDiv(message, 'user');
        const responseDiv = createMessageDiv('...', 'system');
        responseDiv.innerHTML = '<div class="spinner"></div>';

        try {
            // TODO: Hardcoded to use mistral
            const data = { model: "mistral", prompt: message };
            const response = await postMessage(data);
            handleResponse(response, responseDiv);
        } catch (error) {
            updateResponseDiv(responseDiv, `Error: ${error.message}`, 'system');
        }
    }
}

// Create a div for displaying a message
function createMessageDiv(text, sender) {
    const div = document.createElement('div');
    div.initialResponse = true;
    div.classList.add('message', `${sender}-message`);
    div.textContent = text;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return div;
}

// Post message to the server
async function postMessage(data) {
    controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch(url, {
        signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}

// Handle response stream and update UI
async function handleResponse(response, responseDiv) {
    const reader = response.body.getReader();
    let partialLine = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                enableInput();
                break;
            }

            const textChunk = new TextDecoder().decode(value);
            const lines = (partialLine + textChunk).split('\n');
            partialLine = lines.pop();

            lines.forEach(line => {
                if (line.trim()) {
                    updateResponseDiv(responseDiv, JSON.parse(line).response, 'system');
                }
            });
        }

        if (partialLine.trim()) {
            updateResponseDiv(responseDiv, partialLine);
        }
    } catch (error) {
        if (!error.message.includes('The operation was aborted')) {
            updateResponseDiv(responseDiv, `Error: ${error.message}`, 'system');
        }
        enableInput();
    }
}

// Update response div with new content
//
// Example content:
//
//   Object { model: "mistral", created_at: "2023-12-09T17:36:20.24176Z", response: "Hello", done: false }
//
function updateResponseDiv(div, content) {
    console.log(content)
    // TODO: Sanitize
    //const sanitizedContent = sanitize(content); // Sanitize content
    const sanitizedContent = content;
    if (div.initialResponse == true) {
        div.innerHTML = sanitizedContent; // Replace content
        div.initialResponse = false
    } else {
        div.innerHTML += sanitizedContent; // Append content
    }
}

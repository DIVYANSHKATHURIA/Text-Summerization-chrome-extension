// Function to create the floating div
function createFloatingDiv() {
    // Check if the floating div already exists
    let existingDiv = document.getElementById('floatingExtension');
    if (existingDiv) {
        existingDiv.style.display = 'block'; // Show the div if it exists
        return;
    }

    // Create the floating div
    let floatingDiv = document.createElement('div');
    floatingDiv.id = 'floatingExtension';
    floatingDiv.style.position = 'fixed';
    floatingDiv.style.bottom = '10px';
    floatingDiv.style.right = '10px';
    floatingDiv.style.width = '320px';
    floatingDiv.style.height = '500px'; // Adjusted height for content
    floatingDiv.style.backgroundColor = '#e3f2fd'; // Light blue background
    floatingDiv.style.border = '2px solid #1e88e5'; // Deep blue border
    floatingDiv.style.borderRadius = '20px'; // Rounded corners
    floatingDiv.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)'; // Softer shadow
    floatingDiv.style.zIndex = '1000';
    floatingDiv.style.cursor = 'move';
    floatingDiv.style.overflow = 'auto';

    // Create a shadow root
    let shadowRoot = floatingDiv.attachShadow({ mode: 'open' });

    // Define updated HTML content and styles
    shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
            }
            form {
                margin: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .header {
                font-size: 20px;
                font-weight: bold;
                color: #1e88e5; /* Deep blue for heading */
                text-align: center;
                margin-bottom: 15px;
            }
            textarea {
                width: 100%;
                margin-bottom: 15px;
                box-sizing: border-box;
                resize: vertical;
                padding: 12px;
                border-radius: 15px;
                border: 2px solid #1e88e5; /* Deep blue border */
                background-color: #ffffff; /* White background */
                color: #333; /* Dark text color */
                font-size: 14px;
            }
            .slider-container {
                margin-bottom: 15px;
            }
            .slider-labels {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #2196f3; /* Bright blue labels */
            }
            input[type="range"] {
                -webkit-appearance: none; /* Remove default appearance */
                width: 100%;
                height: 12px;
                background: #b3e5fc; /* Light blue track */
                border-radius: 10px;
                outline: none;
                cursor: pointer;
                position: relative;
            }
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 30px;
                height: 30px;
                background: #03a9f4; /* Bright blue thumb */
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Shadow for thumb */
            }
            input[type="range"]::-moz-range-thumb {
                width: 30px;
                height: 30px;
                background: #03a9f4; /* Bright blue thumb */
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Shadow for thumb */
            }
            input[type="range"]::-ms-thumb {
                width: 30px;
                height: 30px;
                background: #03a9f4; /* Bright blue thumb */
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Shadow for thumb */
            }
            button {
                margin-top: 10px;
                background-color: #ff5722; /* Vibrant orange button color */
                color: #fff;
                border: none;
                padding: 12px;
                cursor: pointer;
                border-radius: 15px;
                font-size: 14px;
                transition: background-color 0.3s ease, transform 0.2s ease;
            }
            button:hover {
                background-color: #e64a19; /* Darker orange on hover */
                transform: scale(1.05); /* Slight scale effect on hover */
            }
            button#closeButton {
                position: absolute;
                top: 10px;
                right: 10px;
                border: none;
                background: none;
                color: #d32f2f; /* Red close button color */
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                z-index: 1001;
            }
            button#closeButton:hover {
                color: #c62828; /* Darker red on hover */
            }
            #loadingOverlay {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #000;
                z-index: 1000;
                border-radius: 20px; /* Match rounded corners */
            }
            .word-count {
                font-size: 12px;
                color: #555;
                margin-top: 10px;
            }
        </style>
        <div id="loadingOverlay" style="display: none;">Processing...</div>
        <form id="floatingForm">
            <div class="header">Text Summerizer</div>
            <textarea id="floatingTextInput" name="data" placeholder="Enter text here..." rows="6"></textarea>
            <div class="word-count" id="inputWordCount">Word count: 0</div>
            <div class="slider-container">
                <input type="range" min="0" max="2" step="1" value="0" class="slider" id="floatingSummaryLength">
                <div class="slider-labels">
                    <span>Short</span>
                    <span>Medium</span>
                    <span>Long</span>
                </div>
            </div>
            <button type="button" id="floatingSummarizeButton">Summarize</button>
            <textarea id="floatingResultTextarea" readonly rows="6"></textarea>
            <div class="word-count" id="outputWordCount">Word count: 0</div>
            <button type="button" id="floatingCopyButton">Copy Text</button>
            <button type="button" id="closeButton">&times;</button>
        </form>
    `;

    // Add close button functionality
    shadowRoot.getElementById('closeButton').onclick = function() {
        floatingDiv.style.display = 'none';
    };

    // Adding event listeners for form functionality
    const summarizeButton = shadowRoot.getElementById('floatingSummarizeButton');
    const textInput = shadowRoot.getElementById('floatingTextInput');
    const summaryLength = shadowRoot.getElementById('floatingSummaryLength');
    const resultTextarea = shadowRoot.getElementById('floatingResultTextarea');
    const copyButton = shadowRoot.getElementById('floatingCopyButton');
    const loadingOverlay = shadowRoot.getElementById('loadingOverlay');
    const inputWordCount = shadowRoot.getElementById('inputWordCount');
    const outputWordCount = shadowRoot.getElementById('outputWordCount');

    // Function to count words
    function countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    // Update word count
    function updateWordCounts() {
        inputWordCount.textContent = `Word count: ${countWords(textInput.value)}`;
        outputWordCount.textContent = `Word count: ${countWords(resultTextarea.value)}`;
    }

    // Event listeners for text input
    textInput.addEventListener('input', updateWordCounts);

    // Summarize button functionality
    summarizeButton.addEventListener('click', () => {
        // Show the loading overlay
        loadingOverlay.style.display = 'flex';

        const formData = new FormData();
        formData.append('data', textInput.value.trim());
        formData.append('summary_length', summaryLength.value);

        fetch('https://textsummerizer.onrender.com/summerize', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultTextarea.value = data.result || 'Error occurred';
            updateWordCounts(); // Update output word count
        })
        .catch(error => {
            resultTextarea.value = "An error occurred: " + error.message;
        })
        .finally(() => {
            // Hide the loading overlay after processing
            loadingOverlay.style.display = 'none';
        });
    });

    // Copy button functionality
    copyButton.addEventListener('click', () => {
        resultTextarea.select();
        document.execCommand('copy');
        alert('Text copied to clipboard!');
    });

    // Append the floating div to the body
    document.body.appendChild(floatingDiv);

    // Drag functionality
    let isDragging = false;
    let offsetX, offsetY;

    floatingDiv.addEventListener('mousedown', (event) => {
        // Check if the cursor is not over a textarea
        if (event.target.tagName.toLowerCase() !== 'textarea') {
            isDragging = true;
            offsetX = event.clientX - floatingDiv.getBoundingClientRect().left;
            offsetY = event.clientY - floatingDiv.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });

    function onMouseMove(event) {
        if (isDragging) {
            floatingDiv.style.left = `${event.clientX - offsetX}px`;
            floatingDiv.style.top = `${event.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    floatingDiv.ondragstart = function() {
        return false;
    };
}

// Run the function to create the floating div
createFloatingDiv();

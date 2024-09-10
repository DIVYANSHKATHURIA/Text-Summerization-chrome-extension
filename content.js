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
    floatingDiv.style.height = '500px'; 
    floatingDiv.style.backgroundColor = '#e3f2fd'; 
    floatingDiv.style.border = '2px solid #1e88e5'; 
    floatingDiv.style.borderRadius = '20px';
    floatingDiv.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
    floatingDiv.style.zIndex = '1000';
    floatingDiv.style.cursor = 'move';
    floatingDiv.style.overflow = 'auto';

    // Create a shadow root
    let shadowRoot = floatingDiv.attachShadow({ mode: 'open' });

    // Load HTML content into shadow DOM
    fetch(chrome.runtime.getURL('popup.html'))
        .then(response => response.text())
        .then(html => {
            shadowRoot.innerHTML = html;
            // Attach CSS
            let style = document.createElement('style');
            fetch(chrome.runtime.getURL('popup.css'))
                .then(response => response.text())
                .then(css => {
                    style.textContent = css;
                    shadowRoot.appendChild(style);
                });

            shadowRoot.getElementById('closeButton').onclick = function() {
                floatingDiv.style.display = 'none';
            };

            const summarizeButton = shadowRoot.getElementById('floatingSummarizeButton');
            const textInput = shadowRoot.getElementById('floatingTextInput');
            const summaryLength = shadowRoot.getElementById('floatingSummaryLength');
            const resultTextarea = shadowRoot.getElementById('floatingResultTextarea');
            const copyButton = shadowRoot.getElementById('floatingCopyButton');
            const loadingOverlay = shadowRoot.getElementById('loadingOverlay');
            const inputWordCount = shadowRoot.getElementById('inputWordCount');
            const outputWordCount = shadowRoot.getElementById('outputWordCount');

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

            copyButton.addEventListener('click', () => {
                resultTextarea.select();
                document.execCommand('copy');
                alert('Text copied to clipboard!');
            });

            let isDragging = false;
            let offsetX, offsetY;

            floatingDiv.addEventListener('mousedown', (event) => {
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
        });

    // Append the floating div to the body
    document.body.appendChild(floatingDiv);
}

createFloatingDiv();

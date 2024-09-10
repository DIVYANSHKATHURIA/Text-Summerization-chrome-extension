# Chrome Extension: Floating Text Summarizer

## Overview

This Chrome extension provides a user-friendly interface for text summarization directly within web pages. It leverages the power of the [Facebook BART model](https://huggingface.co/facebook/bart-large-cnn) from Hugging Face, a state-of-the-art model for generating high-quality text summaries.

The extension creates a floating div that allows users to input text, adjust the summary length, and view the summarized output without leaving their current webpage. By integrating the advanced BART model, the extension ensures that summaries are both concise and informative, making it an effective tool for users who need quick and accurate text summaries.

## Features

- Floating div for text summarization
- Adjustable summary length with a slider
- Copy summarized text to clipboard
- Drag the floating div around the screen
- Light blue, user-friendly interface

## Installation

1. **Download the Extension**

   Download the latest version of the extension files, which should include:
   - `popup.html`
   - `popup.css`
   - `content.js`
   - Any other required files (e.g., `manifest.json`)

2. **Load the Extension into Chrome**

   1. Open Google Chrome and navigate to `chrome://extensions/`.
   2. Enable **Developer mode** by toggling the switch in the upper right corner.
   3. Click on the **Load unpacked** button.
   4. Select the directory where you have downloaded the extension files.

   The extension should now be loaded and visible in your Chrome extensions list.

## Usage

1. **Activate the Floating Div**

   Once the extension is loaded, you should see a new icon in the Chrome toolbar. Click on this icon to activate the floating div.

2. **Using the Floating Div**

   - **Enter Text**: Type or paste text into the text area labeled "Enter text here..."
   - **Adjust Summary Length**: Use the range slider to select the desired length of the summary. The slider has three settings: Short, Medium, and Long.
   - **Summarize**: Click the **Summarize** button to process the text and generate a summary.
   - **View Result**: The summarized text will appear in the result text area below the summary button.
   - **Copy Text**: Click the **Copy Text** button to copy the summarized text to your clipboard.
   - **Close the Div**: Click the **x** button in the top right corner of the floating div to hide it.

3. **Drag the Floating Div**

   - Click and hold the header of the floating div to drag it to your desired position on the screen.
  
![Screenshot (29)](https://github.com/user-attachments/assets/6f831fbd-92ac-4ebe-aa4a-b6974cc82455)


## Troubleshooting

- **The Floating Div Doesn't Appear**: Ensure that the extension is properly loaded in Chrome and that there are no errors in the console (access the console by pressing `Ctrl+Shift+J` or `Cmd+Option+J` on Mac).
- **Text Summarization Not Working**: Verify that you have a working internet connection and that the text summarizer service is online.

## Development

If you wish to make modifications to the extension:

1. **Edit the Files**: Modify `popup.html`, `popup.css`, and `content.js` as needed.
2. **Reload the Extension**: Go to `chrome://extensions/`, find your extension, and click the **Reload** button to apply changes.

## Contributing

Feel free to open issues or submit pull requests if you find bugs or have improvements in mind. Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).

---

For any questions or support, please contact divyanshkathuria4@gmail.com.

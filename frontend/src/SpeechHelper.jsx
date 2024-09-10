// speechHelper.js
export const speak = (text, options = {}) => {
    // Create a new SpeechSynthesisUtterance instance
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;

    // Apply options (if provided)
    speech.volume = options.volume || 1; // 0 to 1
    speech.rate = options.rate || 1;     // 0.1 to 10
    speech.pitch = options.pitch || 1;   // 0 to 2

    // Use SpeechSynthesis API to speak
    window.speechSynthesis.speak(speech);
};

// Create a new SpeechSynthesisUtterance instance
let speech = new SpeechSynthesisUtterance();
let voices = [];

// Get references to DOM elements
let voiceSelect = document.querySelector('select');
let textArea = document.querySelector('textarea');
let button = document.querySelector('button');

// Function to populate the voices list
function populateVoices() {
    voices = speechSynthesis.getVoices();
    // Clear existing options
    voiceSelect.innerHTML = '';
    // Add a default option
    voiceSelect.add(new Option('Select Voice', ''));
    // Populate the select element with available voices
    voices.forEach((voice, index) => {
        voiceSelect.add(new Option(voice.name, index));
    });
    // Set default voice
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Event listener for when voices are loaded
speechSynthesis.onvoiceschanged = populateVoices;

// Also handle the case where voices might already be loaded
if (speechSynthesis.getVoices().length > 0) {
    populateVoices();
}

// Event listener for changing the voice selection
voiceSelect.addEventListener('change', () => {
    const selectedIndex = voiceSelect.value;
    if (selectedIndex) {
        speech.voice = voices[selectedIndex];
    }
});

// Event listener for button click to speak the text
button.addEventListener('click', () => {
    if (textArea.value.trim() === '') {
        alert('Please enter some text to speak.');
        return;
    }
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    // Set the text to be spoken
    speech.text = textArea.value;
    // Speak the text
    window.speechSynthesis.speak(speech);
});

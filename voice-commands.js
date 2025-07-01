// Voice Command System - DISABLED
class VoiceCommands {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.commands = {};
        
        // Voice commands disabled per user request
        // this.init();
    }
    
    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.setupRecognition();
            this.createVoiceButton();
        } else {
            console.log('Speech recognition not supported');
        }
    }
    
    setupRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateVoiceButton();
            this.showVoiceIndicator('Listening...');
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateVoiceButton();
            this.hideVoiceIndicator();
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            this.processCommand(transcript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.showVoiceIndicator('Error: ' + event.error, 'error');
        };
    }
    
    createVoiceButton() {
        const button = document.createElement('button');
        button.id = 'voice-command-btn';
        button.className = 'voice-btn';
        button.innerHTML = '<i class="fas fa-microphone"></i>';
        button.title = 'Voice Commands (Click to toggle)';
        
        button.addEventListener('click', () => {
            this.toggleListening();
        });
        
        document.body.appendChild(button);
    }
    
    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }
    
    updateVoiceButton() {
        const button = document.getElementById('voice-command-btn');
        if (button) {
            button.classList.toggle('listening', this.isListening);
            button.innerHTML = this.isListening ? 
                '<i class="fas fa-microphone-slash"></i>' : 
                '<i class="fas fa-microphone"></i>';
        }
    }
    
    processCommand(transcript) {
        console.log('Voice command:', transcript);
        
        for (const [command, action] of Object.entries(this.commands)) {
            if (transcript.includes(command)) {
                this.showVoiceIndicator(`Executing: ${command}`, 'success');
                action();
                return;
            }
        }
        
        // If no command matched
        this.showVoiceIndicator(`Command not recognized: "${transcript}"`, 'error');
        setTimeout(() => {
            this.speak('Sorry, I didn\'t understand that command. Say "help" for available commands.');
        }, 1000);
    }
    
    showVoiceIndicator(message, type = 'info') {
        let indicator = document.getElementById('voice-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'voice-indicator';
            indicator.className = 'voice-indicator';
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = message;
        indicator.className = `voice-indicator ${type}`;
        indicator.style.display = 'block';
        
        if (type !== 'listening') {
            setTimeout(() => {
                this.hideVoiceIndicator();
            }, 3000);
        }
    }
    
    hideVoiceIndicator() {
        const indicator = document.getElementById('voice-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }
    
    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 0.7;
            speechSynthesis.speak(utterance);
        }
    }
    
    activateTerminal() {
        showSection('terminal');
        setTimeout(() => {
            if (typeof initializeTerminal === 'function') {
                initializeTerminal();
            }
        }, 500);
    }
    
    toggleTheme() {
        document.body.classList.toggle('light-theme');
        this.speak('Theme toggled');
    }
    
    showVoiceHelp() {
        const helpText = `
Available voice commands:
- "Go to [section]" - Navigate to profile, about, experience, projects, or contact
- "Download CV" - Download resume
- "Start terminal" - Open terminal interface
- "Toggle theme" - Switch color scheme
- "Scroll up/down" - Page navigation
- "Help" - Show this help

Try saying: "Go to projects" or "Show about"
        `;
        
        this.showVoiceIndicator('Voice commands help displayed in console', 'info');
        console.log(helpText);
        this.speak('Voice commands help is available. Check the console for details.');
    }
}

// Initialize voice commands
document.addEventListener('DOMContentLoaded', () => {
    new VoiceCommands();
});
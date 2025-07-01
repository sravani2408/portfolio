// Terminal Simulation System
class TerminalSimulator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.output = this.container.querySelector('.terminal-output');
        this.input = this.container.querySelector('.terminal-input');
        this.cursor = this.container.querySelector('.terminal-cursor');
        
        this.commands = {
            'help': 'Available commands: about, skills, projects, contact, clear, whoami, ls, cat, github',
            'about': 'Software Developer passionate about creating innovative solutions...',
            'skills': 'Python | JavaScript | SQL | .NET | C | Azure | AWS | Power BI | Machine Learning',
            'projects': 'Loading project portfolio... [████████████] 100%',
            'contact': 'Email: sravani@example.com | LinkedIn: /in/sravani-ganta',
            'clear': '',
            'whoami': 'sravani_ganta@portfolio:~$',
            'ls': 'about.txt  skills.json  projects/  contact.md  resume.pdf',
            'cat about.txt': 'Full-stack developer with expertise in modern web technologies...',
            'github': 'Opening GitHub profile... https://github.com/sravani-ganta'
        };
        
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.init();
    }
    
    init() {
        this.typeWelcomeMessage();
        this.bindEvents();
        this.startCursorBlink();
    }
    
    typeWelcomeMessage() {
        const welcomeText = `
╔══════════════════════════════════════════════════════════════╗
║                    Welcome to Sravani's Terminal             ║
║                                                              ║
║  Type 'help' to see available commands                      ║
║  Navigate through my portfolio using terminal commands      ║
╚══════════════════════════════════════════════════════════════╝

sravani_ganta@portfolio:~$ `;
        
        this.typeText(welcomeText, () => {
            this.input.style.display = 'inline';
            this.input.focus();
        });
    }
    
    typeText(text, callback) {
        const lines = text.split('\n');
        let lineIndex = 0;
        
        const typeLine = () => {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                const lineElement = document.createElement('div');
                lineElement.className = 'terminal-line';
                this.output.appendChild(lineElement);
                
                let charIndex = 0;
                const typeChar = () => {
                    if (charIndex < line.length) {
                        lineElement.textContent += line[charIndex];
                        charIndex++;
                        setTimeout(typeChar, Math.random() * 50 + 10);
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 200);
                    }
                };
                typeChar();
            } else if (callback) {
                callback();
            }
        };
        
        typeLine();
    }
    
    bindEvents() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });
        
        // Keep input focused
        document.addEventListener('click', () => {
            if (this.container.offsetParent !== null) {
                this.input.focus();
            }
        });
    }
    
    executeCommand() {
        const command = this.input.value.trim().toLowerCase();
        
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            
            // Display command
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line command-line';
            commandLine.innerHTML = `<span class="prompt">sravani_ganta@portfolio:~$</span> ${command}`;
            this.output.appendChild(commandLine);
            
            // Execute command
            if (command === 'clear') {
                this.output.innerHTML = '';
            } else if (this.commands[command]) {
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-line result-line';
                resultLine.textContent = this.commands[command];
                this.output.appendChild(resultLine);
                
                // Special commands
                if (command === 'projects') {
                    setTimeout(() => showSection('projects'), 1000);
                } else if (command === 'contact') {
                    setTimeout(() => showSection('contact'), 500);
                } else if (command === 'github') {
                    setTimeout(() => window.open('https://github.com', '_blank'), 500);
                }
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-line error-line';
                errorLine.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
                this.output.appendChild(errorLine);
            }
        }
        
        this.input.value = '';
        this.scrollToBottom();
    }
    
    navigateHistory(direction) {
        const newIndex = this.historyIndex + direction;
        if (newIndex >= 0 && newIndex < this.commandHistory.length) {
            this.historyIndex = newIndex;
            this.input.value = this.commandHistory[newIndex];
        } else if (newIndex === this.commandHistory.length) {
            this.historyIndex = newIndex;
            this.input.value = '';
        }
    }
    
    startCursorBlink() {
        setInterval(() => {
            if (this.cursor) {
                this.cursor.style.opacity = this.cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 530);
    }
    
    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }
}

// Initialize terminal when needed
let terminalInstance = null;

function initializeTerminal() {
    if (!terminalInstance) {
        terminalInstance = new TerminalSimulator('terminal-container');
    }
}
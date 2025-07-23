const input = document.getElementById("input");
const output = document.getElementById("output");

const colors = {
    '0': 'BLACK',
    '1': 'DARK_BLUE',
    '2': 'DARK_GREEN',
    '3': 'DARK_AQUA',
    '4': 'DARK_RED',
    '5': 'DARK_PURPLE',
    '6': 'GOLD',
    '7': 'GRAY',
    '8': 'DARK_GRAY',
    '9': 'BLUE',
    'a': 'GREEN',
    'b': 'AQUA',
    'c': 'RED',
    'd': 'PINK',
    'e': 'YELLOW',
    'f': 'WHITE'
};

const randomChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getRandomChar() {
    return randomChars[Math.floor(Math.random() * randomChars.length)];
}

function convertColor(text) {
    let result = '';
    let currentColor = null;
    let buffer = '';
    let BOLD = false;
    let RANDOM = false;
    let STRIKE = false;
    let UNDERLINE = false;
    let ITALIC = false;

    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (char === '&') {
            const nextChar = text.charAt(i + 1);
            if (nextChar) {
                if (buffer) {
                    result += `<span class="${currentColor || ''} ${BOLD ? 'BOLD' : ''} ${RANDOM ? 'RANDOM' : ''} ${STRIKE ? 'STRIKE' : ''} ${UNDERLINE ? 'UNDERLINE' : ''} ${ITALIC ? 'ITALIC' : ''}">${buffer}</span>`;
                    buffer = '';
                }
                switch (nextChar) {
                    case 'l':
                        BOLD = true;
                        break;
                    case 'k':
                        RANDOM = true;
                        break;
                    case 'm':
                        STRIKE = true;
                        break;
                    case 'n':
                        UNDERLINE = true;
                        break;
                    case 'o':
                        ITALIC = true;
                        break;
                    case 'r':
                        BOLD = false;
                        RANDOM = false;
                        STRIKE = false;
                        UNDERLINE = false;
                        ITALIC = false;
                        currentColor = null;
                        break;
                    default:
                        if (colors[nextChar]) {
                            currentColor = colors[nextChar];
                        }
                }
                i++;
                continue;
            }
        }
        buffer += char;
    }

    if (buffer) {
        result += `<span class="${currentColor || ''} ${BOLD ? 'BOLD' : ''} ${RANDOM ? 'RANDOM' : ''} ${STRIKE ? 'STRIKE' : ''} ${UNDERLINE ? 'UNDERLINE' : ''} ${ITALIC ? 'ITALIC' : ''}">${buffer}</span>`;
    }

    return result;
}

function applyRandomEffect() {
    const spans = output.getElementsByTagName('span');
    for (let span of spans) {
        if (span.classList.contains('RANDOM')) {
            let originalText = span.textContent;
            let animatedText = '';
            for (let i = 0; i < originalText.length; i++) {
                animatedText += `<span class="random-char" data-original="${originalText[i]}">${originalText[i]}</span>`;
            }
            span.innerHTML = animatedText;
        }
    }
}

function animateRandomChars() {
    const randomChars = output.getElementsByClassName('random-char');
    for (let char of randomChars) {
        if (Math.random() < 0.5) {
            char.textContent = getRandomChar();
        } else {
            char.textContent = char.dataset.original;
        }
    }
    requestAnimationFrame(animateRandomChars);
}

input.oninput = () => {
    output.innerHTML = convertColor(input.value);
    applyRandomEffect();
    if (!output.dataset.animated) {
        output.dataset.animated = true;
        requestAnimationFrame(animateRandomChars);
    }
};
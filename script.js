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

function convertColor(text) {
    let result = '';
    let currentColor = null;
    let buffer = '';
    let BOLD = false;

    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (char === '&') {
            const nextChar = text.charAt(i + 1);
            if (nextChar === 'l') {
                BOLD = true;
                i++;
                continue;
            }
            if (colors[nextChar]) {
                if (buffer) {
                    result += BOLD ? `<span class="${currentColor} bold">${buffer}</span>` : `<span class="${currentColor}">${buffer}</span>`;
                    buffer = '';
                    BOLD = false;
                }
                currentColor = colors[nextChar];
                i++;
                continue;
            }
        }
        buffer += char;
    }

    if (currentColor) {
        result += BOLD ? `<span class="${currentColor} bold">${buffer}</span>` : `<span class="${currentColor}">${buffer}</span>`;
    } else {
        result = buffer;
    }

    return result;
}


input.oninput = () => {
    output.innerHTML = convertColor(input.value);
};

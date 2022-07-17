import { morseDict, englishDict } from "./dict.js";

function translateToMorse(str) {
    let result = "";
    for (const char of str) {
        const key = char.toUpperCase();
        if (Object.keys(morseDict).includes(key)) {
            result += morseDict[key] + " ";
        }
    }
    return result;
}

function translateToEnglish(str) {
    let input = str.split(" ");
    let result = "";
    for (const char of input) {
        if (Object.keys(englishDict).includes(char)) {
            result += englishDict[char];
        }
    }
    return result;
}

function isMorse(input) {
    const morseChars = ["-", ".", "/", " "];
    return input.split("").every((char) => morseChars.includes(char));
}

function isValid(input) {
    const validChars = Object.keys(morseDict);
    return input
        .split("")
        .every((char) => validChars.includes(char.toUpperCase()));
}

export function translate(input) {
    let toTranslate = input.trim();
    if (!isValid(input)) {
        return "Please enter either morse: ['.', '-', ' ', '/'] or text: [a-z, A-Z, 0-9, . , ? ! / ( ) & : ; = + - _ ' \" $ @, ' ']";
    } else if (toTranslate.length > 0 && !isMorse(toTranslate)) {
        return translateToMorse(toTranslate);
    } else if (toTranslate.length > 0) {
        return translateToEnglish(toTranslate);
    } else {
        return "Please enter a message to translate.";
    }
}

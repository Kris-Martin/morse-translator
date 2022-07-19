import { morseDict, englishDict } from "./dict.js";

function translateToMorse(str) {
    let result = "";
    for (const char of str) {
        const key = char.toUpperCase();
        if (Object.keys(morseDict).includes(key)) {
            result += morseDict[key] + " ";
        }
    }
    return result.trim();
}

function translateToEnglish(str) {
    let input = str.split(" ");
    let result = "";
    for (const char of input) {
        if (Object.keys(englishDict).includes(char)) {
            result += englishDict[char];
        }
    }
    return result.trim();
}

export function isMorse(input) {
    const validMorseChars = Object.values(morseDict);
    return input.split(" ").every((char) => validMorseChars.includes(char));
}

export function isValid(input) {
    const morseChars = [".", "-", "/", " "];
    const validChars = Object.keys(morseDict);
    const allValid = input
        .split("")
        .every((char) => validChars.includes(char.toUpperCase()));
    const isMorseSymbolsOnly = input
        .split("")
        .every((char) => morseChars.includes(char.toUpperCase()));
    return allValid && !isMorseSymbolsOnly;
}

export function translate(input) {
    let toTranslate = input ? input.trim() : "";
    if (toTranslate.length < 1) {
        return "Please enter a message to translate.";
    } else if (isMorse(toTranslate)) {
        return translateToEnglish(toTranslate);
    } else if (isValid(input) && !isMorse(input)) {
        return translateToMorse(toTranslate);
    } else {
        return "Please enter either morse: ['.', '-', ' ', '/'] or text: [a-z, A-Z, 0-9, . , ? ! / ( ) & : ; = + - _ ' \" $ @, ' ']";
    }
}

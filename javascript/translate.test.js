import { translate, isMorse, isValid } from "./translate.js";

let testCases = [
    [
        "To be or not to be",
        "- --- / -... . / --- .-. / -. --- - / - --- / -... .",
    ],
    [
        "Sherman, 42 Wallaby Way, Sydney.",
        "... .... . .-. -- .- -. --..-- / ....- ..--- / .-- .- .-.. .-.. .- -... -.-- / .-- .- -.-- --..-- / ... -.-- -.. -. . -.-- .-.-.-",
    ],
    [
        "The time of the Elves... is over. Do we leave Middle-Earth to its fate? Do we let them stand alone?",
        "- .... . / - .. -- . / --- ..-. / - .... . / . .-.. ...- . ... .-.-.- .-.-.- .-.-.- / .. ... / --- ...- . .-. .-.-.- / -.. --- / .-- . / .-.. . .- ...- . / -- .. -.. -.. .-.. . -....- . .- .-. - .... / - --- / .. - ... / ..-. .- - . ..--.. / -.. --- / .-- . / .-.. . - / - .... . -- / ... - .- -. -.. / .- .-.. --- -. . ..--..",
    ],
    [
        "abcdefghikjlmnopqrstuvwxyz",
        ".- -... -.-. -.. . ..-. --. .... .. -.- .--- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..",
    ],
    [
        "0123456789",
        "----- .---- ..--- ...-- ....- ..... -.... --... ---.. ----.",
    ],
    [
        ".,?'!/()&:;=+-_\"$:@",
        ".-.-.- --..-- ..--.. .----. -.-.-- -..-. -.--. -.--.- .-... ---... -.-.-. -...- .-.-. -....- ..--.- .-..-. ...-..- ---... .--.-.",
    ],
];

describe("translate translates strings with english chars to morse and back", () => {
    testCases.forEach((testCase) => {
        const [testStr, output] = testCase;
        test(`Translates "${testStr}" to: ${output}`, () => {
            expect(translate(testStr)).toBe(output.toUpperCase());
        });
        test(`Translates "${output}" to: ${testStr}`, () => {
            expect(translate(output)).toBe(testStr.toUpperCase());
        });
    });
});

const emptyInputErr = "Please enter a message to translate.";
const invalidCharErr =
    "Please enter either morse: ['.', '-', ' ', '/'] or text: [a-z, A-Z, 0-9, . , ? ! / ( ) & : ; = + - _ ' \" $ @, ' ']";

describe("translate handles invalid input", () => {
    test("if input is empty returns prompt to enter a message", () => {
        expect(translate("")).toBe(emptyInputErr);
        expect(translate()).toBe(emptyInputErr);
        expect(translate(" ")).toBe(emptyInputErr);
        expect(translate("    ")).toBe(emptyInputErr);
    });
    test("returns error prompt if invalid characters entered", () => {
        expect(translate("^^^")).toBe(invalidCharErr);
        expect(translate("#")).toBe(invalidCharErr);
        expect(translate("-.-*")).toBe(invalidCharErr);
        expect(translate("Hello invalid ~'s")).toBe(invalidCharErr);
        expect(translate("------ ------")).toBe(invalidCharErr);
        expect(translate("------")).toBe(invalidCharErr);
        expect(translate("......")).toBe(invalidCharErr);
        expect(translate(".. / --. / ------ / ... / .- ")).toBe(invalidCharErr);
    });
});

describe("isMorse returns true if valid morse, false if not ", () => {
    test("detects fake morse and returns false", () => {
        expect(isMorse("------ ------")).toBeFalsy();
        expect(isMorse("------")).toBeFalsy();
        expect(isMorse("......")).toBeFalsy();
        expect(isMorse(".. / --. / ------ / ... / .- ")).toBeFalsy();
    });
    testCases.forEach((testCase) => {
        test("returns false if not morse", () => {
            expect(isMorse(testCase[0])).toBeFalsy();
        });
        test("returns true for valid morse strings", () => {
            expect(isMorse(testCase[1])).toBeTruthy();
        });
    });
});

describe("isValid returns correct output", () => {
    testCases.forEach((testCase) => {
        test("returns true if contains all valid chars and not all morse code symbols", () => {
            expect(isValid(testCase[0])).toBeTruthy();
        });
        test("returns false if contains all morse code symbols", () => {
            expect(isValid(testCase[1])).toBeFalsy();
        });
    });
    test("returns false if contains invalid characters", () => {
        expect(isValid("^^^")).toBeFalsy();
        expect(isValid("#")).toBeFalsy();
        expect(isValid("-.-*")).toBeFalsy();
        expect(isValid("Hello invalid ~'s")).toBeFalsy();
    });
});

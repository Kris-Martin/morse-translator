import { translate } from "./translate.js";

const clearBtn = document.getElementById("clear");
const translateBtn = document.getElementById("translate");

let input = document.getElementById("input");
let output = document.getElementById("output");

clearBtn.addEventListener("click", () => {
    input.innerText = "";
    output.innerText = "";
});

translateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    output.innerText = translate(input.value);
});

import { HangmanController } from "./controller/hangmanController";
import { HangmanModel } from "./model/hangmanModel";
import { HangmanView } from "./view/hangmanView";
const input = document.getElementById("word-input") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
let inputValue = "Пылесос";
const handleSubmit = (e: Event) => {
  e.preventDefault();
  const model = new HangmanModel(inputValue);
  const controller = new HangmanController(model);
  const view = new HangmanView(controller);

  view.start();
  form.innerHTML = "";
};

input.addEventListener(
  "change",
  (e: Event) => (inputValue = (e.target as HTMLInputElement).value)
);
form.addEventListener("submit", (e) => handleSubmit(e));

import type { IHangmanController } from "../controller/hangmanController";
interface IHangmanView {
  controller: IHangmanController;
  start(): void;
  win(): void;
  gameOver(): void;
  getWord(): string;
}
export class HangmanView implements IHangmanView {
  controller: IHangmanController;
  private inputElement: HTMLInputElement;
  private word: HTMLDivElement;

  constructor(controller: IHangmanController) {
    this.controller = controller;
    this.inputElement = document.createElement("input") as HTMLInputElement;
    this.word = document.querySelector(".word") as HTMLDivElement;
  }
  public start(): void {
    const template = document.querySelector("#template") as HTMLTemplateElement;
    const container = document.querySelector("#app") as HTMLDivElement;
    const content = template.content.cloneNode(true) as DocumentFragment;

    this.inputElement.classList.add("input");

    container.appendChild(content);
    container.appendChild(this.inputElement);

    this.inputElement.focus();
    this.renderWord(this.getWord(), this.word);
    this.inputElement.addEventListener("keyup", (e) => this.handleInput(e));
  }
  renderWord(word: string, container: HTMLDivElement) {
    container.innerHTML = "";
    let guessSet = this.controller.getGuessLetter();
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement("span");
      span.classList.add("letter");
      if (!guessSet.has(word[i])) {
        span.textContent = "_";
      } else {
        span.textContent = word[i];
      }
      container.appendChild(span);
    }
  }
  private handleInput(event: KeyboardEvent) {
    if (
      event.key.length === 1 &&
      /[а-яё]/i.test(event.key) &&
      !this.controller.getGuessLetter().has(event.key)
    ) {
      this.gameOver();
      if (this.controller.check(event.key) != -1) {
        this.renderWord(this.getWord(), this.word);
        if (this.isWin()) {
          this.win();
        }
      } else {
        this.hangmanRender();
      }
    }
  }

  private hangmanRender(): void {
    const attempts = this.controller.getAttempts();
    for (let i = attempts; i <= 6; i++) {
      const hangmanDetail = document.getElementById(`${i}`);
      hangmanDetail?.classList.remove("invisible");
    }
  }
  getWord(): string {
    return this.controller.getWord();
  }
  public win(): void {
    this.word.innerHTML = "Вы победили";
    document.querySelector(".smile")?.classList.remove("invisible");
    const button = document.createElement("button");
    button.textContent = "Еще раз?";
    button.classList.add("button");
    button.addEventListener("click", () => {
      location.reload();
    });
    document.body.appendChild(button);
  }
  public isWin(): boolean {
    let word = this.controller.getWord();
    let set = this.controller.getGuessLetter();
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      if (set.has(word[i])) count++;
    }
    if (count === word.length) {
      return true;
    }
    return false;
  }
  public gameOver(): void {
    if (this.controller.getAttempts() === 0) {
      this.word.innerHTML =
        "Вы проиграли, было слово: " + this.controller.getWord();
      this.inputElement.disabled = true;
      document.querySelector(".unsmile")?.classList.remove("invisible");
      const button = document.createElement("button");
      button.textContent = "Еще раз?";
      button.classList.add("button");
      button.addEventListener("click", () => {
        location.reload();
      });
      document.body.appendChild(button);
    }
  }
}

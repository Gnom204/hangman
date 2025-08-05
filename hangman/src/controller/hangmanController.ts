import type { IHangmanModel } from "../model/hangmanModel";

export interface IHangmanController {
  model: IHangmanModel;
  check(ltr: string): number[] | number;
  isGameOver(): boolean;
  getGuessLetter(): Set<string>;
  getWord(): string;
  getAttempts(): number;
}

export class HangmanController implements IHangmanController {
  model: IHangmanModel;
  constructor(model: IHangmanModel) {
    this.model = model;
  }

  check(ltr: string): number[] | number {
    return this.model.checkLetter(ltr);
  }

  getAttempts(): number {
    return this.model.attempts;
  }

  getWord(): string {
    return this.model.word;
  }

  getGuessLetter(): Set<string> {
    return this.model.getGuess();
  }

  isGameOver(): boolean {
    return this.model.isGameOver();
  }
}

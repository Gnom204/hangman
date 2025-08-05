export interface IHangmanModel {
  word: string;
  guessLetters: Set<string>;
  attempts: number;
  isGameOver(): boolean;
  checkLetter(ltr: string): number[] | number;
  getGuess(): Set<string>;
}
export class HangmanModel implements IHangmanModel {
  public word: string;
  public guessLetters: Set<string>;
  public attempts: number;
  constructor(word: string) {
    this.word = word.toLocaleLowerCase();
    this.guessLetters = new Set();
    this.attempts = 6;
  }

  public isGameOver(): boolean {
    if (this.attempts === 0) {
      return true;
    }
    return false;
  }
  public checkLetter(ltr: string): number[] | number {
    const indexes = [];
    for (let i = 0; i < this.word.length; i++) {
      if (ltr === this.word[i]) {
        indexes.push(i);
      }
    }
    this.guessLetters.add(ltr);
    console.log(ltr, this.guessLetters, this.attempts);
    if (indexes.length === 0) {
      this.attempts -= 1;
      return -1;
    }
    return indexes;
  }
  public getGuess(): Set<string> {
    return this.guessLetters;
  }
}

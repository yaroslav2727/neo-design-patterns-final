/**
 * Блок відображення короткого опису резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SummaryBlock implements IBlock {
  constructor(private d: ResumeModel["summary"]) {}

  /**
   * Рендеринг блоку короткого опису
   *
   * Реалізація методу для відображення секції з коротким описом
   */
  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section summary";

    el.innerHTML = `
      <h2>Summary</h2>
      <p>${this.d.text}</p>
    `;

    return el;
  }
}

/**
 * Блок відображення навичок резюме
 */

import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  /**
   * Рендеринг блоку навичок
   *
   * Реалізація методу для відображення категорій навичок
   * та їх списків у вигляді HTML елементів
   */
  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section skills";
    sec.innerHTML = "<h2>Skills</h2>";

    for (const [category, skills] of Object.entries(this.d)) {
      if (Array.isArray(skills) && skills.length > 0) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
          <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        `;

        const skillsList = document.createElement("ul");
        skillsList.className = "skills-list";

        for (const skill of skills) {
          const skillItem = document.createElement("li");
          skillItem.textContent = skill;
          skillsList.appendChild(skillItem);
        }

        categoryDiv.appendChild(skillsList);
        sec.appendChild(categoryDiv);
      }
    }

    return sec;
  }
}

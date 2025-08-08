/**
 * Блок відображення освіти в резюме
 */

import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private educationList: Education[]) {}

  /**
   * Рендеринг блоку освіти
   *
   * Реалізація методу для відображення інформації про освіту
   */
  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section education";
    el.innerHTML = "<h2>Education</h2>";

    for (const education of this.educationList) {
      const educationItem = document.createElement("div");
      educationItem.className = "education-item";

      educationItem.innerHTML = `
        <h3>${education.degree} in ${education.field}</h3>
        <p><strong>Institution:</strong> ${education.institution}</p>
        <p><strong>Graduation:</strong> ${education.graduation}</p>
      `;

      el.appendChild(educationItem);
    }

    return el;
  }
}

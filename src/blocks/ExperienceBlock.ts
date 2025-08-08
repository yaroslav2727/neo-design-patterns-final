/**
 * Патерн Composite (Компоновщик)
 *
 * Блок досвіду роботи, який містить дочірні блоки проєктів
 */

import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private experiences: Experience[]) {}

  /**
   * Рендеринг блоку досвіду роботи
   *
   * Реалізація методу render(), який створює DOM-елементи для секції досвіду
   * та використовує патерн Composite для рендерингу проєктів всередині цієї секції.
   */
  render(): HTMLElement {
    const container = document.createElement("section");
    container.className = "section experience";
    container.innerHTML = "<h2>Experience</h2>";

    // Для кожного досвіду створити div.experience-item з innerHTML (позиція, компанія, період)
    for (const experience of this.experiences) {
      const experienceItem = document.createElement("div");
      experienceItem.className = "experience-item";

      experienceItem.innerHTML = `
        <h3>${experience.position} at ${experience.company}</h3>
        <p><strong>Period:</strong> ${experience.start} — ${experience.end}</p>
      `;

      // Додати проєкти (ProjectBlock, HighlightDecorator) до цього div
      if (experience.projects && experience.projects.length > 0) {
        const projectsContainer = document.createElement("div");
        projectsContainer.className = "projects";

        for (const project of experience.projects) {
          const projectBlock = new ProjectBlock(project);
          let projectElement = projectBlock.render();

          // Використовуємо Decorator для виділення нещодавніх проєктів
          if (project.isRecent) {
            const highlightDecorator = new HighlightDecorator(projectBlock);
            projectElement = highlightDecorator.render();
          }

          projectsContainer.appendChild(projectElement);
        }

        experienceItem.appendChild(projectsContainer);
      }

      // Додати всі experience-item до секції
      container.appendChild(experienceItem);
    }

    return container;
  }
}

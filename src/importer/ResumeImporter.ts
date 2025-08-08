/**
 * Конкретна реалізація імпортера резюме
 * Наслідується від AbstractImporter і реалізує абстрактні методи
 */

import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  /**
   * Перевіряє, чи відповідає JSON-об'єкт очікуваній структурі
   *
   * Реалізація валідації JSON-даних резюме.
   * Перевірка наявності необхідних полів (header, summary, experience, education, skills)
   */
  protected validate(): void {
    if (!this.raw || typeof this.raw !== "object") {
      throw new Error("Invalid JSON: data must be an object");
    }

    const data = this.raw as Record<string, unknown>;

    const requiredFields = [
      "header",
      "summary",
      "experience",
      "education",
      "skills",
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (typeof data.header !== "object" || !data.header) {
      throw new Error("Invalid header structure");
    }

    if (typeof data.summary !== "object" || !data.summary) {
      throw new Error("Invalid summary structure");
    }

    if (!Array.isArray(data.experience)) {
      throw new Error("Experience must be an array");
    }

    if (!Array.isArray(data.education)) {
      throw new Error("Education must be an array");
    }

    if (typeof data.skills !== "object" || !data.skills) {
      throw new Error("Invalid skills structure");
    }
  }

  /**
   * Перетворює JSON-дані у внутрішню модель резюме
   *
   */
  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  /**
   * Рендерить модель резюме у DOM
   *
   * Реалізація рендерингу моделі у DOM-дерево
   */
  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content")!;

    root.innerHTML = "";
    const factory = new BlockFactory();

    const blockTypes: Array<{
      type: Parameters<typeof factory.createBlock>[0];
    }> = [
      { type: "header" },
      { type: "summary" },
      { type: "experience" },
      { type: "education" },
      { type: "skills" },
    ];

    for (const { type } of blockTypes) {
      const block = factory.createBlock(type, model);
      const element = block.render();
      root.appendChild(element);
    }
  }
}

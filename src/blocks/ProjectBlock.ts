/**
 * Блок проєкту - є частиною патерну Composite
 * Це "листовий" компонент, який не має дочірніх елементів
 */

import { Project } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class ProjectBlock implements IBlock {
  constructor(private d: Project) {}

  /**
   * Рендеринг блоку проєкту
   *
   * Реалізація методу render(), який створює HTML-елементи
   * для відображення даних проєкту
   */
  render(): HTMLElement {
    const container = document.createElement("div");
    container.className = "project-item";
    container.textContent = `• ${this.d.name} – ${this.d.description}`;
    return container;
  }
}

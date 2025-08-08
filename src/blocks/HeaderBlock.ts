/**
 * Блок відображення заголовка резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  /**
   * Рендеринг блоку заголовка
   *
   * Реалізація методу render(), який створює DOM-елементи
   * для відображення даних заголовка: ім'я, позиція та контактна інформація.
   */
  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    const contacts = this.d.contacts;
    const contactParts = [];

    if (contacts.email) contactParts.push(`Email: ${contacts.email}`);
    if (contacts.phone) contactParts.push(`Phone: ${contacts.phone}`);
    if (contacts.location) contactParts.push(`Location: ${contacts.location}`);

    header.innerHTML = `
      <h1>${this.d.fullName}</h1>
      <p><strong>${this.d.title}</strong></p>
      <p>${contactParts.join(" | ")}</p>
    `;

    return header;
  }
}

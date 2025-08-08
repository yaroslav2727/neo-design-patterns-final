import { ResumeImporter } from "../importer/ResumeImporter";

/**
 * Фасад: єдина точка входу.
 */
export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    try {
      const jsonData = await this.fetchData(jsonPath);
      const importer = new ResumeImporter(jsonData);
      importer.import();
    } catch (error) {
      console.error("Failed to initialize resume page:", error);
      throw error;
    }
  }

  private async fetchData(path: string): Promise<unknown> {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from ${path}: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      throw error;
    }
  }
}

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function getProjects(): any[] {
  try {
    const filePath = path.join(DATA_DIR, "projects.json");
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    return data.projects || [];
  } catch {
    return [];
  }
}

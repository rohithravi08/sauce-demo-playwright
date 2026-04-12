import * as fs from 'fs';
import * as path from 'path';

export function loadData<T>(filename: string): T {
  const filePath = path.join(__dirname, '../data', filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found: ${filename}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
}

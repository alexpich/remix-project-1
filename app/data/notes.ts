import { readFile, writeFile } from "fs/promises";

export async function getStoredNotes(): Promise<any[]> {
  const rawFileContent = await readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes: any[]): Promise<void> {
  return writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}

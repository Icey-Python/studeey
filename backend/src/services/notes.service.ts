import NoteModel from "../models/note.model";
import { processImage } from "./ocr.service";
import { extractTextFromPDF } from "../utils/pdf.helper";

// Create a new note
export const createNote = async (data: {
  title: string;
  content: string;
  tags: string[];
  format: "pdf" | "image" | "text";
  owner: string;
}) => {
  const note = await NoteModel.create(data);
  return note;
};

// Process a note based on its format
export const processNote = async (
  filePath: string,
  format: "pdf" | "image" | "text"
) => {
  let content = "";

  switch (format) {
    case "image":
      content = await processImage(filePath);
      break;
    case "pdf":
      content = await extractTextFromPDF(filePath);
      break;
    case "text":
      content = await readTextFile(filePath);
      break;
    default:
      throw new Error("Unsupported file format");
  }

  return content;
};

// Get all notes for a user
export const getUserNotes = async (userId: string) => {
  return await NoteModel.find({ owner: userId });
};

// Utility: Read plain text file
export const readTextFile = async (filePath: string): Promise<string> => {
  const fs = await import("fs/promises");
  return await fs.readFile(filePath, "utf-8");
};


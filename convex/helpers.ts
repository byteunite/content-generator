

export function cleanJson<T>(rawText: string): T {
  // Trim the response text
  const text = rawText.trim();

  // Extract JSON code block if exists
  const startIndex = text.indexOf("```json");
  const endIndex = text.lastIndexOf("```");

  // Default to the whole text
  let jsonString = text;

  // If JSON code block is found, extract and return the JSON content
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    jsonString = text.substring(startIndex + 7, endIndex).trim();
  } 

  return JSON.parse(jsonString);
}
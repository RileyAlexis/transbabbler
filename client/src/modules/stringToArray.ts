export function stringToArray(text: string): string[] {
    if (!text.trim()) {
        return [];
    }

    const words = text
        .split(/[\s,;\n\r\t]+/) // Match spaces, commas, semicolons, newlines, or tabs
        .filter(word => word.trim() !== ""); // Remove any empty strings from the result

    return words;
}
export function encodeQuotedPrintable(text: string): string {
    return text
      .replace(/[^\x20-\x7E]/g, (char) => {
        const hex = char.charCodeAt(0).toString(16).toUpperCase();
        return `=${hex.padStart(2, '0')}`;
      })
      .replace(/=/g, '=3D')
      .split('\n')
      .map((line) => {
        if (line.length > 75) {
          const chunks = line.match(/.{1,75}/g) || [];
          return chunks.join('=\n');
        }
        return line;
      })
      .join('\n');
  }
  
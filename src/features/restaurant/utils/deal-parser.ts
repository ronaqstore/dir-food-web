export interface ParsedDealItem {
  name: string;
  emoji: string;
  quantityText?: string;
}

export interface ParsedDealDetails {
  items: ParsedDealItem[];
  servingNote?: string;
  rawText: string;
}

function getEmojiForItem(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('pizza')) return '🍕';
  if (lower.includes('burger') || lower.includes('zinger')) return '🍔';
  if (lower.includes('broast') || lower.includes('crispy chicken') || lower.includes('fried chicken') || lower.includes('wings') || lower.includes('drumstick')) return '🍗';
  if (lower.includes('shawarma') || lower.includes('roll') || lower.includes('wrap') || lower.includes('paratha roll')) return '🌯';
  if (lower.includes('fries') || lower.includes('chips') || lower.includes('potato')) return '🍟';
  if (lower.includes('drink') || lower.includes('coke') || lower.includes('pepsi') || lower.includes('dew') || lower.includes('sprite') || lower.includes('liter') || lower.includes('litre') || lower.includes('bottle')) return '🥤';
  if (lower.includes('kabab') || lower.includes('tikka') || lower.includes('bbq') || lower.includes('boti') || lower.includes('seekh')) return '🍢';
  if (lower.includes('karahi') || lower.includes('handi') || lower.includes('curry') || lower.includes('qorma') || lower.includes('gravy')) return '🍲';
  if (lower.includes('naan') || lower.includes('roti') || lower.includes('paratha') || lower.includes('kulcha')) return '🫓';
  if (lower.includes('biryani') || lower.includes('pulao') || lower.includes('rice')) return '🍚';
  if (lower.includes('salad') || lower.includes('raita')) return '🥗';
  if (lower.includes('kheer') || lower.includes('dessert') || lower.includes('sweet') || lower.includes('ice cream') || lower.includes('halwa')) return '🍨';
  if (lower.includes('chai') || lower.includes('tea') || lower.includes('kahwa')) return '☕';
  if (lower.includes('fish')) return '🐟';
  if (lower.includes('soup')) return '🥣';

  return '🍽️';
}

/**
 * Parses deal/combo description text into structured list of individual items.
 * Works with '+', newlines, bullet points, numbered lists, and sentence separators.
 */
export function parseDealDescription(description?: string | null): ParsedDealDetails {
  if (!description || !description.trim()) {
    return { items: [], rawText: '' };
  }

  const rawText = description.trim();
  let text = rawText;
  let servingNote: string | undefined;

  // Extract serving note if present (e.g. "Feeds 5-6 persons." or "Perfect for 3 students.")
  const servingRegex = /(?:feeds|serves|suitable for|perfect for|for)\s+([0-9]+(?:-[0-9]+)?\s+(?:persons?|people|students?|heads?|members?))/i;
  const servingMatch = text.match(servingRegex);
  if (servingMatch && servingMatch[0]) {
    servingNote = servingMatch[0];
    text = text.replace(servingMatch[0], '').replace(/\.\s*$/, '').trim();
  }

  // Split items by '+', newlines, bullet points ('•', '-', '*'), or semicolons
  let rawParts: string[] = [];

  if (text.includes('\n')) {
    rawParts = text.split('\n');
  } else if (text.includes('+')) {
    rawParts = text.split('+');
  } else if (text.includes('•')) {
    rawParts = text.split('•');
  } else if (text.includes(';') || text.includes(',')) {
    rawParts = text.split(/[;,]/);
  } else {
    rawParts = [text];
  }

  const items: ParsedDealItem[] = rawParts
    .map((part) => part.replace(/^[-*•]\s*|^\d+[.)]\s*/, '').replace(/[.,;]+$/, '').trim())
    .filter((part) => part.length > 1)
    .map((part) => ({
      name: part,
      emoji: getEmojiForItem(part)
    }));

  return {
    items,
    servingNote,
    rawText
  };
}

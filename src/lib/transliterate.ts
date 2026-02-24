/**
 * Ukrainian Transliteration Utility
 * Based on Ukrainian Cabinet of Ministers Resolution №55 (2010)
 */

const TRANSLIT_MAP: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
  'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z', 'и': 'y',
  'і': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
  'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
  'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
  'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'iu', 'я': 'ia',
  'є': 'ie', 'ї': 'i', 'й': 'i',
};

const TRANSLIT_START: Record<string, string> = {
  'є': 'ye', 'ї': 'yi', 'й': 'y', 'ю': 'yu', 'я': 'ya',
};

/**
 * Transliterate Ukrainian text to Latin characters
 * Following Ukrainian Cabinet of Ministers Resolution №55 (2010)
 *
 * Position rules for є, ї, й, ю, я:
 * - At word START: ye, yi, y, yu, ya
 * - After any letter (vowel or consonant): ie, i, i, iu, ia
 */
export function transliterate(text: string): string {
  const lower = text.toLowerCase();
  let result = '';

  for (let i = 0; i < lower.length; i++) {
    const char = lower[i];
    const prevChar = lower[i - 1];

    // Handle зг → zgh (to distinguish from ж → zh)
    if (char === 'г' && prevChar === 'з') {
      result += 'gh';
      continue;
    }

    // Handle position-dependent letters (є, ї, й, ю, я)
    if (TRANSLIT_START[char]) {
      const isWordStart = i === 0 || /[\s\-_.,!?:;'"()\[\]{}]/.test(prevChar);

      if (isWordStart) {
        result += TRANSLIT_START[char];
      } else {
        result += TRANSLIT_MAP[char];
      }
      continue;
    }

    // Handle regular Ukrainian characters
    if (TRANSLIT_MAP[char] !== undefined) {
      result += TRANSLIT_MAP[char];
    } else {
      // Keep Latin characters, numbers, and other symbols as-is
      result += char;
    }
  }

  return result;
}

/**
 * Generate URL-safe slug from Ukrainian text
 *
 * @param text - Ukrainian or mixed text
 * @param maxLength - Maximum slug length (default: 60)
 * @returns URL-safe slug
 *
 * @example
 * slugify('Електросамокат Tiger SUPRA')
 * // → 'elektrosamokat-tiger-supra'
 */
export function slugify(text: string, maxLength = 60): string {
  return transliterate(text)
    .toLowerCase()
    .replace(/[\s_]+/g, '-')       // spaces/underscores → hyphen
    .replace(/[^a-z0-9-]/g, '')    // remove invalid chars
    .replace(/-+/g, '-')           // collapse consecutive hyphens
    .replace(/^-|-$/g, '')         // trim leading/trailing hyphens
    .slice(0, maxLength)           // truncate to max length
    .replace(/-$/, '');            // trim trailing hyphen after truncate
}

/**
 * Validate if a string is a valid slug
 */
export function isValidSlug(slug: string, maxLength = 60): boolean {
  const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return SLUG_REGEX.test(slug) && slug.length <= maxLength;
}

/**
 * Generate file name from Ukrainian text
 *
 * @example
 * toFileName('Tiger SUPRA PRO', { suffix: 'main', extension: 'webp' })
 * // → 'tiger-supra-pro_main.webp'
 */
export function toFileName(
  text: string,
  options: {
    prefix?: string;
    suffix?: string;
    extension?: string;
    maxLength?: number;
  } = {}
): string {
  const { prefix = '', suffix = '', extension = '', maxLength = 80 } = options;

  // Calculate available length for the base name
  const reservedLength =
    (prefix ? prefix.length + 1 : 0) +
    (suffix ? suffix.length + 1 : 0) +
    (extension ? extension.length + 1 : 0);

  const base = slugify(text, maxLength - reservedLength);

  let name = base;
  if (prefix) name = `${prefix}_${name}`;
  if (suffix) name = `${name}_${suffix}`;
  if (extension) name = `${name}.${extension.replace(/^\./, '')}`;

  return name;
}

/**
 * Validate if a string is a valid file name
 */
export function isValidFileName(name: string, maxLength = 100): boolean {
  const FILE_NAME_REGEX = /^[a-z0-9]+(?:[-_][a-z0-9]+)*\.[a-z0-9]+$/;
  return FILE_NAME_REGEX.test(name) && name.length <= maxLength;
}

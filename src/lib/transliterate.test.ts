import { describe, it, expect } from 'vitest';
import {
  transliterate,
  slugify,
  isValidSlug,
  toFileName,
  isValidFileName,
} from './transliterate';

describe('transliterate', () => {
  it('transliterates basic Ukrainian text', () => {
    expect(transliterate('електросамокат')).toBe('elektrosamokat');
  });

  it('handles зг → zgh correctly', () => {
    expect(transliterate('згоден')).toBe('zghoden');
  });

  it('handles position-dependent letters at word start', () => {
    expect(transliterate('Юрій')).toBe('yurii');
    expect(transliterate('Яків')).toBe('yakiv');
    expect(transliterate('Євген')).toBe('yevhen');
    expect(transliterate('Їжак')).toBe('yizhak');
  });

  it('handles position-dependent letters mid-word', () => {
    expect(transliterate('Україна')).toBe('ukraina');
    expect(transliterate('знаю')).toBe('znaiu');
  });

  it('preserves Latin characters', () => {
    expect(transliterate('Tiger SUPRA')).toBe('tiger supra');
  });

  it('preserves numbers', () => {
    expect(transliterate('Модель 2025')).toBe('model 2025');
  });

  it('handles ь (soft sign)', () => {
    expect(transliterate('тінь')).toBe('tin');
  });
});

describe('slugify', () => {
  it('creates URL-safe slug from Ukrainian text', () => {
    expect(slugify('Електросамокат Tiger SUPRA')).toBe('elektrosamokat-tiger-supra');
  });

  it('collapses consecutive hyphens', () => {
    expect(slugify('Tiger -- SUPRA')).toBe('tiger-supra');
  });

  it('removes special characters', () => {
    expect(slugify('Tiger KING RS (2025)')).toBe('tiger-king-rs-2025');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify(' -Tiger- ')).toBe('tiger');
  });

  it('respects maxLength', () => {
    const slug = slugify('дуже довга назва електросамоката яка не влізе', 20);
    expect(slug.length).toBeLessThanOrEqual(20);
  });

  it('does not end with hyphen after truncation', () => {
    const slug = slugify('aaaaa bbbbb ccccc ddddd eeeee', 12);
    expect(slug).not.toMatch(/-$/);
  });
});

describe('isValidSlug', () => {
  it('validates correct slugs', () => {
    expect(isValidSlug('tiger-king-rs')).toBe(true);
    expect(isValidSlug('nami-burn-e3-max')).toBe(true);
    expect(isValidSlug('a')).toBe(true);
  });

  it('rejects invalid slugs', () => {
    expect(isValidSlug('')).toBe(false);
    expect(isValidSlug('-starts-with-hyphen')).toBe(false);
    expect(isValidSlug('ends-with-hyphen-')).toBe(false);
    expect(isValidSlug('has--double-hyphen')).toBe(false);
    expect(isValidSlug('HAS-UPPERCASE')).toBe(false);
    expect(isValidSlug('has spaces')).toBe(false);
  });

  it('respects maxLength', () => {
    expect(isValidSlug('abcdef', 5)).toBe(false);
    expect(isValidSlug('abcde', 5)).toBe(true);
  });
});

describe('toFileName', () => {
  it('creates file name from text', () => {
    expect(toFileName('Tiger SUPRA PRO', { suffix: 'main', extension: 'webp' }))
      .toBe('tiger-supra-pro_main.webp');
  });

  it('adds prefix', () => {
    expect(toFileName('test', { prefix: 'hyper', extension: 'webp' }))
      .toBe('hyper_test.webp');
  });

  it('handles no options', () => {
    expect(toFileName('Tiger King RS')).toBe('tiger-king-rs');
  });
});

describe('isValidFileName', () => {
  it('validates correct file names', () => {
    expect(isValidFileName('tiger-king-rs.webp')).toBe(true);
    expect(isValidFileName('hyper_tiger-supra_main.webp')).toBe(true);
  });

  it('rejects invalid file names', () => {
    expect(isValidFileName('no-extension')).toBe(false);
    expect(isValidFileName('HAS-UPPERCASE.webp')).toBe(false);
    expect(isValidFileName('')).toBe(false);
  });
});

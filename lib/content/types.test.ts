import { describe, it, expect } from 'vitest';
import { pick, pickText, pickItem } from './types';
import type { I18n, ListItem } from './types';

describe('pick', () => {
  it('devuelve el texto en el idioma pedido', () => {
    const v: I18n = { es: 'Hola', en: 'Hello' };
    expect(pick(v, 'es')).toBe('Hola');
    expect(pick(v, 'en')).toBe('Hello');
  });

  it('cae al español si falta la traducción en inglés', () => {
    const v: I18n = { es: 'Hola', en: '' };
    expect(pick(v, 'en')).toBe('Hola');
  });

  it('devuelve string vacío si el valor es undefined', () => {
    expect(pick(undefined, 'es')).toBe('');
  });
});

describe('pickText', () => {
  it('combina los campos con el idioma pedido sobre el español', () => {
    const o = {
      es: { t1: 'Titulo ES', text: 'Texto ES' },
      en: { t1: 'Title EN' },
    };
    const result = pickText(o, 'en');
    expect(result.t1).toBe('Title EN');
    expect(result.text).toBe('Texto ES');
  });

  it('devuelve solo español si se pide español', () => {
    const o = {
      es: { t1: 'Titulo ES' },
      en: { t1: 'Title EN' },
    };
    expect(pickText(o, 'es').t1).toBe('Titulo ES');
  });

  it('ignora campos vacíos del idioma secundario', () => {
    const o = {
      es: { t1: 'Titulo ES', text: 'Texto ES' },
      en: { t1: '', text: 'Text EN' },
    };
    const result = pickText(o, 'en');
    expect(result.t1).toBe('Titulo ES');
    expect(result.text).toBe('Text EN');
  });
});

describe('pickItem', () => {
  const item: ListItem = {
    visible: true,
    es: { t: 'Paso uno', d: 'Descripción' },
    en: { t: 'Step one', d: '' },
  };

  it('devuelve solo español en modo español', () => {
    const r = pickItem(item, 'es');
    expect(r.t).toBe('Paso uno');
    expect(r.d).toBe('Descripción');
  });

  it('combina inglés sobre español, omitiendo vacíos', () => {
    const r = pickItem(item, 'en');
    expect(r.t).toBe('Step one');
    expect(r.d).toBe('Descripción'); // cae al español
  });
});

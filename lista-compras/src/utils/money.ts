import type { Cents } from '@/types/models';

/** Espaço de não-quebra: impede o símbolo da moeda de ficar sozinho na linha seguinte. */
const NBSP = '\u00A0';

/**
 * Formata cêntimos como texto em português.
 *   150    → "1,50 €"
 *   123456 → "1 234,56 €"
 * Os milhares são separados por um espaço de não-quebra.
 */
export function formatCents(cents: Cents, currencySymbol = '€'): string {
  const sign = cents < 0 ? '-' : '';
  const absolute = Math.abs(Math.round(cents));
  const whole = Math.floor(absolute / 100);
  const fraction = String(absolute % 100).padStart(2, '0');
  const groupedWhole = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

  return `${sign}${groupedWhole},${fraction}${NBSP}${currencySymbol}`;
}

/**
 * Converte o texto de um campo de preço em cêntimos.
 *   "1,5" → 150    "1.50" → 150    "2" → 200    "3,99 €" → 399
 *
 * Devolve `null` se o texto for inválido. Regras:
 *  - só dígitos e, no máximo, um separador decimal (vírgula ou ponto);
 *  - no máximo 2 casas decimais (senão não sabemos se "1,234" é 1,23 € ou 1234);
 *  - sem separadores de milhares ("1.234,56" é recusado) nem espaços no meio;
 *  - no máximo 7 dígitos na parte inteira (até 9 999 999,99).
 * O símbolo € e os espaços nas pontas são ignorados.
 */
export function parseMoneyInput(text: string): Cents | null {
  const cleaned = text.replace(/€/g, '').trim();
  const match = /^(\d{1,7})(?:[.,](\d{1,2}))?$/.exec(cleaned);

  if (!match) {
    return null;
  }

  const euros = Number(match[1]);
  // "5" → "00"; "5,5" → "50"; "5,05" → "05"
  const centsPart = Number((match[2] ?? '').padEnd(2, '0'));

  return euros * 100 + centsPart;
}

/** Converte cêntimos no texto que se mostra num campo de edição: 899 → "8,99". */
export function centsToInputString(cents: Cents): string {
  const whole = Math.floor(cents / 100);
  const fraction = String(cents % 100).padStart(2, '0');

  return `${whole},${fraction}`;
}

/**
 * Total de uma linha: preço unitário × quantidade, arredondado ao cêntimo
 * (a metade arredonda para cima). A quantidade pode ser decimal (1,5 kg).
 */
export function multiplyCents(unitPriceCents: Cents, quantity: number): Cents {
  return Math.round(unitPriceCents * quantity);
}
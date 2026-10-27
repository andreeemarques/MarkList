import { centsToInputString, formatCents, multiplyCents, parseMoneyInput } from '@/utils/money';

// Espaço de não-quebra que o formatCents coloca antes do símbolo e entre os milhares.
const NBSP = '\u00A0';

describe('formatCents', () => {
  it('formata valores simples', () => {
    expect(formatCents(150)).toBe(`1,50${NBSP}€`);
    expect(formatCents(100)).toBe(`1,00${NBSP}€`);
    expect(formatCents(99)).toBe(`0,99${NBSP}€`);
  });

  it('mantém sempre duas casas decimais', () => {
    expect(formatCents(0)).toBe(`0,00${NBSP}€`);
    expect(formatCents(5)).toBe(`0,05${NBSP}€`);
  });

  it('separa os milhares', () => {
    expect(formatCents(123456)).toBe(`1${NBSP}234,56${NBSP}€`);
    expect(formatCents(100000000)).toBe(`1${NBSP}000${NBSP}000,00${NBSP}€`);
  });

  it('formata valores negativos', () => {
    expect(formatCents(-10)).toBe(`-0,10${NBSP}€`);
  });

  it('aceita outro símbolo de moeda', () => {
    expect(formatCents(150, '$')).toBe(`1,50${NBSP}$`);
  });
});

describe('parseMoneyInput', () => {
  it.each<[string, number]>([
    ['1,5', 150],
    ['1.50', 150],
    ['2', 200],
    ['3,99 €', 399],
    ['€ 3,99', 399],
    ['  10  ', 1000],
    ['0,05', 5],
    ['0,5', 50],
    ['9999999,99', 999999999],
  ])('aceita "%s" como %i cêntimos', (text, expected) => {
    expect(parseMoneyInput(text)).toBe(expected);
  });

  it.each([
    '',
    '   ',
    'abc',
    '-1',
    '1,234',
    '1.234,56',
    '1,2,3',
    '1,',
    ',5',
    '1 5',
    '12345678',
  ])('recusa "%s"', (text) => {
    expect(parseMoneyInput(text)).toBeNull();
  });
});

describe('centsToInputString', () => {
  it('converte cêntimos para texto de edição', () => {
    expect(centsToInputString(899)).toBe('8,99');
    expect(centsToInputString(100)).toBe('1,00');
    expect(centsToInputString(5)).toBe('0,05');
    expect(centsToInputString(0)).toBe('0,00');
  });

  it('é o inverso de parseMoneyInput', () => {
    expect(parseMoneyInput(centsToInputString(12345))).toBe(12345);
  });
});

describe('multiplyCents', () => {
  it('multiplica por quantidades inteiras', () => {
    expect(multiplyCents(85, 6)).toBe(510);
    expect(multiplyCents(1999, 3)).toBe(5997);
  });

  it('arredonda ao cêntimo (a metade arredonda para cima)', () => {
    expect(multiplyCents(189, 1.5)).toBe(284); // 283,5 → 284
  });

  it('não se deixa enganar por erros de vírgula flutuante', () => {
    expect(multiplyCents(85, 1.1)).toBe(94);
    expect(multiplyCents(100, 0.1 + 0.2)).toBe(30);
  });
});
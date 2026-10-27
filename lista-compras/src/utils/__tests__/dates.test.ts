import { formatDate, formatLongDate, formatRelativeTime, nowIso } from '@/utils/dates';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Data "atual" fixa, para os resultados não dependerem do dia em que corres os testes.
const now = new Date('2026-10-27T12:00:00.000Z');
const ago = (milliseconds: number) => new Date(now.getTime() - milliseconds).toISOString();

describe('nowIso', () => {
  it('devolve uma data ISO 8601 em UTC', () => {
    expect(nowIso()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});

describe('formatDate', () => {
  // Datas criadas à hora local (meio-dia) para o teste não depender do fuso horário.
  it('formata como DD/MM/AAAA', () => {
    const iso = new Date(2026, 9, 24, 12, 0).toISOString();
    expect(formatDate(iso)).toBe('24/10/2026');
  });

  it('acrescenta zeros à esquerda', () => {
    const iso = new Date(2026, 0, 5, 12, 0).toISOString();
    expect(formatDate(iso)).toBe('05/01/2026');
  });
});

describe('formatLongDate', () => {
  it('mostra o dia da semana, o dia e o mês por extenso', () => {
    expect(formatLongDate(new Date(2026, 9, 23))).toBe('Sexta-feira, 23 de outubro');
    expect(formatLongDate(new Date(2026, 2, 1))).toBe('Domingo, 1 de março');
  });
});

describe('formatRelativeTime', () => {
  it.each<[string, number, string]>([
    ['30 segundos', 30 * 1000, 'agora mesmo'],
    ['5 minutos', 5 * MINUTE, 'há 5 min'],
    ['1 hora', HOUR, 'há 1 hora'],
    ['3 horas', 3 * HOUR, 'há 3 horas'],
    ['1 dia', DAY, 'há 1 dia'],
    ['4 dias', 4 * DAY, 'há 4 dias'],
    ['14 dias', 14 * DAY, 'há 2 semanas'],
    ['21 dias', 21 * DAY, 'há 3 semanas'],
    ['30 dias', 30 * DAY, 'há 1 mês'],
    ['60 dias', 60 * DAY, 'há 2 meses'],
    ['400 dias', 400 * DAY, 'há 1 ano'],
    ['800 dias', 800 * DAY, 'há 2 anos'],
  ])('há %s → "%s"', (_label, elapsed, expected) => {
    expect(formatRelativeTime(ago(elapsed), now)).toBe(expected);
  });

  it('trata datas no futuro como "agora mesmo"', () => {
    expect(formatRelativeTime(ago(-2 * HOUR), now)).toBe('agora mesmo');
  });
});
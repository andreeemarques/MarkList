import type { Cents, ProductUnit } from '@/types/models';
import { parseMoneyInput } from '@/utils/money';

export const NAME_MAX_LENGTH = 80;
export const DESCRIPTION_MAX_LENGTH = 500;

/** O que o formulário de produto recolhe: tudo texto, como vem dos campos. */
export interface ProductFormValues {
  name: string;
  priceText: string;
  unit: ProductUnit;
  description: string;
}

/** Uma mensagem de erro por campo inválido. */
export interface ProductFormErrors {
  name?: string;
  price?: string;
  description?: string;
}

/** Dados validados e normalizados, prontos para o service. */
export interface ValidProductInput {
  name: string;
  priceCents: Cents;
  unit: ProductUnit;
  description: string | null;
}

export type ProductValidationResult =
  | { ok: true; value: ValidProductInput }
  | { ok: false; errors: ProductFormErrors };

/** Valida o formulário e devolve os dados limpos, ou TODOS os erros de uma vez. */
export function validateProductForm(values: ProductFormValues): ProductValidationResult {
  const errors: ProductFormErrors = {};

  const name = values.name.trim();
  if (name === '') {
    errors.name = 'Indica o nome do produto.';
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `O nome não pode ter mais de ${NAME_MAX_LENGTH} caracteres.`;
  }

  const priceText = values.priceText.trim();
  const priceCents = parseMoneyInput(priceText);
  if (priceText === '') {
    errors.price = 'Indica o preço.';
  } else if (priceCents === null) {
    errors.price = 'Preço inválido. Usa um formato como 1,50.';
  }

  const description = values.description.trim();
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `A descrição não pode ter mais de ${DESCRIPTION_MAX_LENGTH} caracteres.`;
  }

  if (Object.keys(errors).length > 0 || priceCents === null) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      priceCents,
      unit: values.unit,
      // Sem descrição guarda-se `null`, e não um texto vazio.
      description: description === '' ? null : description,
    },
  };
}
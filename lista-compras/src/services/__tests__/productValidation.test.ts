import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
  validateProductForm,
  type ProductFormErrors,
  type ProductFormValues,
} from '@/services/productValidation';

const validValues: ProductFormValues = {
  name: 'Leite Meio Gordo',
  priceText: '0,85',
  unit: 'un',
  description: '',
};

/** Valida valores que DEVEM ser recusados e devolve os erros. */
function errorsFor(values: ProductFormValues): ProductFormErrors {
  const result = validateProductForm(values);
  if (result.ok) {
    throw new Error('A validação devia ter falhado');
  }
  return result.errors;
}

describe('validateProductForm', () => {
  it('aceita dados válidos', () => {
    expect(validateProductForm(validValues)).toEqual({
      ok: true,
      value: { name: 'Leite Meio Gordo', priceCents: 85, unit: 'un', description: null },
    });
  });

  it('apara os espaços do nome e da descrição', () => {
    const result = validateProductForm({
      ...validValues,
      name: '  Azeite  ',
      description: '  Gallo ou Oliveira da Serra  ',
    });

    expect(result).toEqual({
      ok: true,
      value: {
        name: 'Azeite',
        priceCents: 85,
        unit: 'un',
        description: 'Gallo ou Oliveira da Serra',
      },
    });
  });

  it('aceita o preço 0', () => {
    const result = validateProductForm({ ...validValues, priceText: '0' });

    expect(result.ok).toBe(true);
    expect(result.ok && result.value.priceCents).toBe(0);
  });

  it('recusa o nome vazio ou só com espaços', () => {
    expect(errorsFor({ ...validValues, name: '' }).name).toBeDefined();
    expect(errorsFor({ ...validValues, name: '   ' }).name).toBeDefined();
  });

  it('aceita um nome com o tamanho máximo e recusa um com mais um caracter', () => {
    const maxName = 'a'.repeat(NAME_MAX_LENGTH);

    expect(validateProductForm({ ...validValues, name: maxName }).ok).toBe(true);
    expect(errorsFor({ ...validValues, name: maxName + 'a' }).name).toBeDefined();
  });

  it('recusa o preço vazio', () => {
    expect(errorsFor({ ...validValues, priceText: '' }).price).toBeDefined();
  });

  it('recusa um preço inválido', () => {
    expect(errorsFor({ ...validValues, priceText: '1,234' }).price).toBeDefined();
    expect(errorsFor({ ...validValues, priceText: 'abc' }).price).toBeDefined();
    expect(errorsFor({ ...validValues, priceText: '-2' }).price).toBeDefined();
  });

  it('recusa uma descrição demasiado longa', () => {
    const description = 'a'.repeat(DESCRIPTION_MAX_LENGTH + 1);

    expect(errorsFor({ ...validValues, description }).description).toBeDefined();
  });

  it('devolve todos os erros de uma vez', () => {
    const errors = errorsFor({ ...validValues, name: '', priceText: 'abc' });

    expect(errors.name).toBeDefined();
    expect(errors.price).toBeDefined();
    expect(errors.description).toBeUndefined();
  });
});
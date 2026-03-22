import { faker } from '@faker-js/faker';

export function generateComplexPassword( length:number = 8): string {
    const uppercase = faker.string.alpha({ length: 1, casing: 'upper' });
  const lowercase = faker.string.alpha({ length: 1, casing: 'lower' });
  const number = faker.string.numeric(1);
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '&', '*']);

  const remainingLength = length - 4;
  const filler = faker.string.alphanumeric({ length: remainingLength });
  const passwordArray = (uppercase + lowercase + number + special + filler).split('');
  return faker.helpers.shuffle(passwordArray).join('');

}
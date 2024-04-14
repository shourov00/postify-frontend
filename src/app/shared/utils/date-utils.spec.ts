import { randomDate, randomNumber } from './date-utils';

describe('randomDate', () => {
  it('returns a random date between the specified range', () => {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 0, 5);
    const result = randomDate(startDate, endDate);

    expect(result.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(endDate.getTime());
  });

  it('returns a random date between default start date and current date', () => {
    const currentDate = new Date();
    const result = randomDate();

    expect(result.getTime()).toBeGreaterThanOrEqual(new Date(2024, 0, 1).getTime());
    expect(result.getTime()).toBeLessThanOrEqual(currentDate.getTime());
  });
});

describe('randomNumber', () => {
  it('returns a random number between 0 and 10000', () => {
    const result = randomNumber();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10000);
  });
});

import { screenModeFromWidth } from './screen-size-utils';
import { ScreenModeResolution } from '@store/core/models/core.models';

describe('screenModeFromWidth', () => {
  it('returns Large screen mode for width greater than or equal to 992', () => {
    expect(screenModeFromWidth(1000)).toBe(ScreenModeResolution.Large);
  });

  it('returns Medium screen mode for width greater than or equal to 768', () => {
    expect(screenModeFromWidth(800)).toBe(ScreenModeResolution.Medium);
  });

  it('returns Small screen mode for width greater than or equal to 550', () => {
    expect(screenModeFromWidth(600)).toBe(ScreenModeResolution.Small);
  });

  it('returns Mobile screen mode for width less than 550', () => {
    expect(screenModeFromWidth(500)).toBe(ScreenModeResolution.Mobile);
  });
});

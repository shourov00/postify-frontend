import { ScreenModeResolution } from '@store/core/models/core.models';

export function screenModeFromWidth(width: number): ScreenModeResolution {
  if (width >= 992) return ScreenModeResolution.Large;
  if (width >= 768) return ScreenModeResolution.Medium;
  if (width >= 550) return ScreenModeResolution.Small;
  return ScreenModeResolution.Mobile;
}

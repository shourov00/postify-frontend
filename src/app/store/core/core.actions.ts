import { createAction, props } from '@ngrx/store';
import { ScreenModeResolution } from './models/core.models';

export const CORE_FEATURE_NAME = 'Core';

export const updateScreenModeResolution = createAction(
  `[${CORE_FEATURE_NAME}] Update screen mode resolution`,
  props<{ mode: ScreenModeResolution }>()
);

export const actionSetLoading = createAction(`[${CORE_FEATURE_NAME}] set loading`, props<{ loader: boolean }>());

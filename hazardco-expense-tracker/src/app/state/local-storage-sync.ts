import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [],
    rehydrate: true,
    storage: sessionStorage,
    checkStorageAvailability: false,
  })(reducer);
}

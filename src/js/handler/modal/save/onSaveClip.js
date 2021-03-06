import {
  MESSAGE,
  LOCAL_STORAGE_KEY,
  YOUTUBE,
  LOCAL_STORAGE_VALUE,
} from '../../../utils/constant.js';
import { renderSavedClip } from '../../../view/main.js';
import storage from '../../../utils/localStorage.js';
import { hideElement } from '../../../utils/setAttribute.js';
import { showSnackbar } from '../../../utils/showSnackbar.js';
import { renderSaveVideoCount } from '../../../view/modal.js';
import $DOM from '../../../utils/DOM.js';

export const onSaveClip = ({ target }) => {
  if (target.dataset.js !== 'save-button') {
    return;
  }

  const clipIndex = target.dataset.clipIndex;
  const recentSearchResults =
    storage.get(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS) ?? [];
  const savedClip = recentSearchResults[clipIndex];
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const existClips = savedClips.filter((savedClip) => !savedClip.isDeleted);

  if (existClips.length >= YOUTUBE.MAXIMUM_SAVE_CLIPS) {
    showSnackbar(MESSAGE.ERROR.EXCEED_MAXIMUM_CLIP_COUNT);
    return;
  }

  hideElement(target);
  hideElement($DOM.SAVE_PAGE.NOT_FOUND);

  savedClips.push(savedClip);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  showSnackbar(MESSAGE.NOTIFY.SAVE_CLIP);
  renderSavedClip(savedClip, savedClips.length - 1);
  renderSaveVideoCount(savedClips);
};

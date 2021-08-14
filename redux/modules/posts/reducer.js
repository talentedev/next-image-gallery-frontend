import {
  POSTS_REQ_DONE,
  POSTS_REQ_WAITING,
  GET_GALLERY_CONFIG,
  SET_GALLERY_CONFIG,
  SET_IMAGE_LIST,
  CLEAR_IMAGE_LIST,
  GALLERY_ERROR,
} from "./types";

const ConfigReducer = (
  state = {
    galleryConfig: { title: "", text: "", imageList: [] },
    loading: true,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GALLERY_CONFIG:
      return {
        ...state,
        galleryConfig: payload,
        loading: false,
      };
    case SET_GALLERY_CONFIG:
      return {
        ...state,
        galleryConfig: payload,
        loading: false,
      };
    case SET_IMAGE_LIST:
      return {
        ...state,
        galleryConfig: payload,
        loading: false,
      };
    case CLEAR_IMAGE_LIST:
      return {
        ...state,
        galleryConfig: payload,
        loading: false,
      };
    case GALLERY_ERROR:
      return state;
    default:
      return state;
  }
};

export default ConfigReducer;

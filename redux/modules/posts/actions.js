import {
  POSTS_REQ_DONE,
  POSTS_REQ_WAITING,
  GET_GALLERY_CONFIG,
  SET_GALLERY_CONFIG,
  SET_IMAGE_LIST,
  GALLERY_ERROR,
  CLEAR_IMAGE_LIST,
} from "./types";

import api from "../../api";
/**
 * sample function to fetch api
 */
export function fetchApi(response) {
  if (!response) {
    return {
      type: POSTS_REQ_WAITING,
    };
  } else {
    return {
      type: POSTS_REQ_DONE,
      response,
    };
  }
}

// Get current gallery config
export const getGalleryConfig = () => async (dispatch) => {
  try {
    const res = await api.get("/");
    dispatch({
      type: GET_GALLERY_CONFIG,
      payload: res.data,
    });
  } catch (err) {
    return {
      type: GALLERY_ERROR,
      ...err.response,
    };
  }
};

// set current gallery config
export const setGalleryConfig = (title, text) => async (dispatch) => {
  const body = { title, text };
  try {
    const res = await api.post("/", body);
    dispatch({
      type: SET_GALLERY_CONFIG,
      payload: res.data,
    });
  } catch (err) {
    return {
      type: GALLERY_ERROR,
      ...err.response,
    };
  }
};

// set upload gallery config
export const uploadImages = (files) => async (dispatch) => {
  console.log(files);

  const formData = new FormData();
  files.map((file, index) => {
    formData.append("image" + index, file, file.name);
  });
  // formData.append("myFile", files[0], files[0].name);
  try {
    const res = await api.post("/upload", formData);
    dispatch({
      type: SET_IMAGE_LIST,
      payload: res.data,
    });
  } catch (err) {
    return {
      type: GALLERY_ERROR,
      ...err.response,
    };
  }
};

// set clear all images
export const clearImageList = () => async (dispatch) => {
  try {
    const res = await api.post("/clear");
    dispatch({
      type: CLEAR_IMAGE_LIST,
      payload: res.data,
    });
  } catch (err) {
    return {
      type: GALLERY_ERROR,
      ...err.response,
    };
  }
};

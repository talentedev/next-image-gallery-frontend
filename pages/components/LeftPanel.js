import { connect } from "react-redux";
import {
  fetchApi,
  setGalleryConfig,
  clearImageList,
  uploadImages,
} from "../../redux/modules/posts/actions";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import AlertFillIcon from "remixicon-react/AlertFillIcon";

const LeftPanel = ({
  setGalleryConfig,
  clearImageList,
  uploadImages,
  galleryConfig,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeAll = () => {
    clearImageList();
  };
  const setConfig = () => {
    setGalleryConfig(title, text);
  };
  const uploadAll = () => {
    if (files.length == 0) return;
    uploadImages(files);
  };
  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <img src={file.preview} className="thumb-image" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="col-md-6 px-5">
      <InputGroup className="my-3">
        <FormControl
          placeholder="Gallery Title"
          name="title"
          value={title}
          onChange={onChangeTitle}
          cols={5}
        />
      </InputGroup>
      <InputGroup>
        <FormControl
          as="textarea"
          placeholder="Gallery Introduction"
          name="text"
          value={text}
          rows="5"
          onChange={onChangeText}
        />
      </InputGroup>

      <InputGroup className="my-3">
        <Button className="col-4" variant="success" onClick={setConfig}>
          Set Texts
        </Button>
        <Button className="col-4" onClick={uploadAll}>
          Upload Photos
        </Button>
        <Button className="col-4" variant="danger" onClick={removeAll}>
          Delete All Photos
        </Button>
      </InputGroup>
      <InputGroup className="my-3">
        <div {...getRootProps({ className: "dropzone drop-zone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside className="thumbs-container">{thumbs}</aside>
      </InputGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  galleryConfig: state.Gallery.galleryConfig,
  loading: state.Gallery.loading,
});

export default connect(mapStateToProps, {
  setGalleryConfig,
  uploadImages,
  clearImageList,
})(LeftPanel);

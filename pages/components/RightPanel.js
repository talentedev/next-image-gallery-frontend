import { connect } from "react-redux";
import { fetchApi, getGalleryConfig } from "../../redux/modules/posts/actions";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, Button, Image, Col, Row } from "react-bootstrap";
import HomeLineIcon from "remixicon-react/HomeLineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import ModalImage from "react-modal-image";

const RightPanel = ({ galleryConfig: { title, text, imageList }, loading }) => {
  const [idStart, setStart] = useState(0);
  const [idEnd, setEnd] = useState(9);
  return (
    <Col md={6} className=" px-5">
      <Card className="my-3 gallery-shadow">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Row>
            {imageList.map((image, index) => {
              return (
                index >= idStart &&
                index < idEnd && (
                  <Col md={4} xs={4} className="my-1">
                    <div className="overlay">
                      <ModalImage
                        small={"http://localhost:3000" + image}
                        large={"http://localhost:3000" + image}
                        alt={image}
                        className="rounded-image"
                      />
                      <EyeLineIcon className="overlay-icon" />
                    </div>
                  </Col>
                )
              );
            })}
          </Row>
          <Row className="my-2">
            <Col md={4} xs={4}>
              <Button
                variant="light"
                className="px-5 full-width"
                onClick={(e) => {
                  if (idStart) {
                    setStart(idStart - 9);
                    setEnd(idEnd - 9);
                  }
                }}
              >
                <ArrowLeftLineIcon />
              </Button>
            </Col>
            <Col md={4} xs={4}>
              <Button
                variant="light"
                className="px-5 full-width"
                onClick={(e) => {
                  setStart(0);
                  setEnd(9);
                }}
              >
                <HomeLineIcon />
              </Button>
            </Col>
            <Col md={4} xs={4}>
              <Button
                variant="light"
                className="px-5 full-width"
                onClick={(e) => {
                  if (idStart + 9 < imageList.length) {
                    setStart(idStart + 9);
                    setEnd(idEnd + 9);
                  }
                }}
              >
                <ArrowRightLineIcon />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  galleryConfig: state.Gallery.galleryConfig,
  loading: state.Gallery.loading,
});

export default connect(mapStateToProps)(RightPanel);

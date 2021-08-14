import Head from "next/head";
import { connect } from "react-redux";
import { getGalleryConfig } from "../redux/modules/posts/actions";
import { useEffect } from "react";

import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const HomePage = ({ getGalleryConfig, loading }) => {
  useEffect(() => {
    getGalleryConfig();
  }, [getGalleryConfig]);
  return (
    <div className="row">
      <Head>
        <title>Next Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading ? <LeftPanel /> : "false"}
      {!loading ? <RightPanel /> : "false"}
    </div>
  );
};

export default connect(null, { getGalleryConfig })(HomePage);

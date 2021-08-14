import "../styles/globals.scss";
import { Provider } from "react-redux";
import WithRedux from "../redux/withRedux";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp(props) {
  const { pageProps, Component, reduxStore } = props;
  const router = useRouter();

  // component did mount
  useEffect(async () => {
    // check session
    const res = await fetch(`/api/session`);
    const { data, status } = await res.json();
  }, [router.pathname]);

  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  //Anything returned here can be access by the client
  return { pageProps };
};

export default WithRedux(MyApp);

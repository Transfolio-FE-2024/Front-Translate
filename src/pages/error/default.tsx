import { AuthContext } from "@/context/AuthContext";
import styles from "./default.module.scss";
import { TF } from "@/util/const";
import { useContext } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Header } from "@/components/Header/Header";

export default function DefaultErrorBoundary() {
  const error = useRouteError();
  const authContext = useContext(AuthContext);
  let errorComponent = <ErrorElement_Unknown />;

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorComponent = <ErrorElement_404 />;
        break;
      case 401:
        errorComponent = <ErrorElement_401 />;
        break;
      case 503:
        errorComponent = <ErrorElement_503 />;
        break;
      case 418:
        errorComponent = <ErrorElement_418 />;
        break;
    }
  }

  if (error == TF.PAGE_ERROR.NOT_FOUND) {
    errorComponent = <ErrorElement_404 />;
  }

  return (
    <Layout>
      {authContext.isSignedIn && <Header />}
      {errorComponent}
    </Layout>
  );
}

//
const ErrorElement_404: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>This page doesn't exist!</div>
      <div>
        Click <Link to={"/home"}>here</Link> to go home
      </div>
    </div>
  );
};

//
const ErrorElement_401: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>You aren't authorized to see this</div>
      <div>
        Click <Link to={"/home"}>here</Link> to go home
      </div>
    </div>
  );
};

//
const ErrorElement_503: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Looks like our API is down</div>
      <div>
        Click <Link to={"/home"}>here</Link> to go home
      </div>
    </div>
  );
};

//
const ErrorElement_418: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>🫖</div>
      <div>
        Click <Link to={"/home"}>here</Link> to go home
      </div>
    </div>
  );
};

//
const ErrorElement_Unknown: React.FC = () => {
  const error = useRouteError();

  console.warn("[Transfolio]", error);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Something went wrong</div>
      <div>
        Click <Link to={"/home"}>here</Link> to go home
      </div>
    </div>
  );
};

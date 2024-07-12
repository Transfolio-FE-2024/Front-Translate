import styles from "./default.module.scss";
import { TF } from "@/util/const";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function DefaultErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorElement_404 />;
    }

    if (error.status === 401) {
      return <ErrorElement_401 />;
    }

    if (error.status === 503) {
      return <ErrorElement_503 />;
    }

    if (error.status === 418) {
      return <ErrorElement_418 />;
    }
  }

  if (error == TF.PAGE_ERROR.NOT_FOUND) return <ErrorElement_404 />;

  return <ErrorElement_Unknown />;
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
  return (
    <div className={styles.container}>
      <div className={styles.title}>Something went wrong</div>
      <div>
        Click <Link to={"/home"}>here</Link> to go home
      </div>
    </div>
  );
};

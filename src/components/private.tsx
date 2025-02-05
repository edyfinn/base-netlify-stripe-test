import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function render(c: JSX.Element) {
  return c;
}

const Private = (Component: JSX.Element) => {
  const [hasSession, setHasSession] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const sessionStatus = false; //await checkLoginSession();

      setHasSession(Boolean(sessionStatus));
    })();
  }, [hasSession, Component]);

  console.log("Login correcto ", hasSession)

  return hasSession ? render(Component) : <Navigate to="main" />;
};

export default Private;
import React from "react";
import { LoginPage } from "./pages/LoginPage.js";
// import LoginPage from "./pages/_LoginPage.js";
// import { getTheme } from '@fluentui/react'

// const theme = getTheme()

const styles = {
  background: "linear-gradient(45deg, rgba(0,166,202,1) 0%, rgba(0,107,181,1) 35%, rgba(0,46,99,1) 100%)",
  height: "100vh",
  width: "100vw",
};

const App: React.FC = (): React.ReactElement => {
  return (
    <div style={styles}>
      <LoginPage />
    </div>
  );
};

export default App;

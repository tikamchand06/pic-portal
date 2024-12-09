import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import PexelsProvider from "./PexelsProvider";
import { App as AntApp, ConfigProvider } from "antd";

import "./index.css";
import "simplebar-react/dist/simplebar.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      hashed: false,
      components: { Button: { fontWeight: 500 }, Image: { colorBgMask: "rgba(0, 0, 0, 0.75)" } },
      token: { controlHeight: 36, colorPrimary: "#2196f3", fontFamily: "Inter" },
    }}
  >
    <AntApp>
      <PexelsProvider>
        <App />
      </PexelsProvider>
    </AntApp>
  </ConfigProvider>
);

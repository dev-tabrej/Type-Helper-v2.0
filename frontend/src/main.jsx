import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme, ColorModeScript } from "@chakra-ui/react";
// const styles = {
//   global: (props) => ({
//     body: {
//       color: mode("grey.800", "whitealpha.900")(props),
//       bg: mode("gray.100", "#101010")(props),
//     },
//   }),
// };

// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: true,
// };

// const colors = {
//   gray: {
//     light: "#616161",
//     dark: "#101010",
//   },
// };
// const theme = extendTheme({ colors, config, styles });
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ChakraProvider >
          <App />
        </ChakraProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SellProduct from "./pages/SellProduct";
import Navbar from "./components/Navbar";
import { extendTheme, QuaantumProvider, theme } from "@quaantum/components";
interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <QuaantumProvider
        theme={extendTheme(theme, {
          components: {
            ListItem: {
              base: {
                listStyle: "none",
              },
              defaultVariant: "",
              variants: {},
            },
            Link: {
              base: {
                color: "#fff",
              },
              defaultVariant: "",
              variants: {},
            },
          },
        })}
      >
        <Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sell" element={<SellProduct />} />
          </Routes>
        </Navbar>
      </QuaantumProvider>
    </BrowserRouter>
  );
};

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store.jsx";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider";
import ThemeContext from "./contexts/ThemeContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
          </ThemeProvider>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Zoom}
          />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

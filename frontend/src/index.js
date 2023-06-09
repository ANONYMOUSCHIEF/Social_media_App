import React from "react";
import ReactDom from "react-dom/client"
import App from "./App";
import './index.css'
import { AuthContextProvider } from "./Components/AuthContext";
const root=ReactDom.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<AuthContextProvider>
<App/>
</AuthContextProvider>
</React.StrictMode>
)
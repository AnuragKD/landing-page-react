import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Preload critical above-the-fold Hero Section assets dynamically (supports Vite's content hashing)
import heroGradient from "./assets/images/hero_gradient.png";
import phone from "./assets/images/iPhone 14 Pro.png";
import folderBottom from "./assets/icons/folder bottom.svg";
import folderTop from "./assets/icons/Folder top.svg";

[heroGradient, phone, folderBottom, folderTop].forEach((src) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import './assest/styles.scss'
import Posts from "./Posts";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" exect />
      <Route element={<Posts />} path="/posts" exect />
    </Routes>
  );
}

export default App;

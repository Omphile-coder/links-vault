import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags?: string;
}

function App() {
  const [count, setCount] = useState(0);

  return <>{/* <Navbar /> */}</>;
}

export default App;

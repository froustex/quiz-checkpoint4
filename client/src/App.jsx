import { Outlet } from "react-router-dom";
import "./styles/app.css";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

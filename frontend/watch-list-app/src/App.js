import "./App.css";
import Header from "./components/Header";
import MoviesTable from "./components/movies/MoviesTable";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://localhost:7086/movies")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log("fetch err: " + e.message));
  }, []);

  return (
    <div className="wrapper">
      <header>
        <Header title="WatchList"></Header>
      </header>

      <main>
        <MoviesTable></MoviesTable>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;

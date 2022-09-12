import "./App.css";
import Main from "./components/main";
import TopAppBar from "./components/top-app-bar";

function App() {
  return (
    <div style={{ backgroundColor: "#fec64b", minHeight: "100vh" }}>
      <TopAppBar />
      <Main />
    </div>
  );
}

export default App;

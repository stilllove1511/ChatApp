import "antd/dist/antd.min.css";
import "@assets/scss/App.scss";
import HttpHandler from "@components/HttpHandler";
import Routes from "@routes/Routers";

function App() {
  return (
    <div className="App">
      <HttpHandler />
      <Routes />
    </div>
  );
}

export default App;

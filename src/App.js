import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    //BEM naming convention
    <div className="app">
      <div className="app__body">
        <div className="sdsd"></div>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;

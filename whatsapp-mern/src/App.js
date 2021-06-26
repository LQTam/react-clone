import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        {/* SIDE BAR */}
        <Sidebar />
        {/* CHAT COMPONENT */}
        <Chat />
      </div>
    </div>
  );
}

export default App;

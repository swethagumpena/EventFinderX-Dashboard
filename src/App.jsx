import { Route, Routes } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Indexinter from "./components/Indexinter"
import Finish from "./components/Finish";
import Test7 from "./components/Test7";


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/index"><Indexinter/></Route>
          <Navigate to="/index"/>
          <Route path="/test/:id/:num">
            <Test7/>
          </Route>
          <Route path="/finish">
            <Finish/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

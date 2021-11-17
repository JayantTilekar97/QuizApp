import "./App.css";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Indexinter from "./components/Indexinter"
import Finish from "./components/Finish";
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";
import Test4 from "./components/Test4";
import Test5 from "./components/Test5";
import Test6 from "./components/Test6";
import Test7 from "./components/Test7";
import Test8 from "./components/Test8";
import Test9 from "./components/Test9";


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

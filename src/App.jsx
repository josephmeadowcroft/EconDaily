import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import Results from "./components/Results/Results";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { ChakraProvider } from "@chakra-ui/react";
import "./app.scss";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <ChakraProvider resetCSS={false} disableGlobalStyle={true}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/quiz" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </PrimeReactProvider>
    </>
  );
}

export default App;

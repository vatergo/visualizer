import "./App.css";
import Plot from "react-plotly.js";
import { usePlot } from "./hooks";

function App() {
  const { data } = usePlot();

  return (
    <Plot
      data={data}
      layout={{
        title: "Проекция скважины",
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default App;

import "./App.css";
import Plot from "react-plotly.js";
import { usePlot } from "./hooks";

function App() {
  const { data3D, data2D } = usePlot();

  return (
    <div className="content">
      <Plot
        className="plot"
        data={data3D}
        layout={{
          title: "Проекция скважины",
        }}
      />
      <Plot
        className="plot"
        data={data2D}
        layout={{
          title: "Проекция скважины",
        }}
      />
    </div>
  );
}

export default App;

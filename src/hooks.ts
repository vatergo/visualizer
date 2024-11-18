import { useCallback, useEffect, useState } from "react";
import { Las } from "las-js";
import path from "path";
import { calculateCoordinates } from "./utils";

export const usePlot = (): { data3D: Plotly.Data[]; data2D: Plotly.Data[] } => {
  const [points, setPoints] = useState<{ x: number; y: number; z: number }[]>(
    []
  );

  const readFile = useCallback(() => {
    // const las = new Las(path.join(__dirname, "../../../../../sample.las")); // Mac OS

    const las = new Las(
      path.join(__dirname, "../../../../../../../../public/sample.las") // local
    );

    las.data().then((data) => {
      const points = data.map((item) =>
        calculateCoordinates(Number(item[0]), Number(item[1]), Number(item[3]))
      );
      setPoints(points);
    });
  }, []);

  useEffect(() => {
    readFile();
    const intervalId = setInterval(readFile, 60000);

    return () => clearInterval(intervalId);
  }, [readFile]);

  // Сбор данных для графика
  const lineData3D: Plotly.Data = {
    type: "scatter3d",
    mode: "lines+markers",
    x: points.map((p) => p.x),
    y: points.map((p) => p.y),
    z: points.map((p) => p.z),
    line: { color: "red", width: 5 },
    marker: { size: 1 },
  };

  const lineData2D: Plotly.Data = {
    type: "scatter",
    mode: "lines+markers",
    x: points.map((p) => p.x),
    y: points.map((p) => p.y),
    line: { color: "red", width: 2 },
    marker: { size: 4 },
  };

  return { data3D: [lineData3D], data2D: [lineData2D] };
};

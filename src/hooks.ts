import { useCallback, useEffect, useState } from "react";
import { Las } from "las-js";
import path from "path";
import { calculateCoordinates } from "./utils";

export const usePlot = (): { data: Plotly.Data[] } => {
  const [points, setPoints] = useState<{ x: number; y: number; z: number }[]>(
    []
  );

  const readFile = useCallback(() => {
    const las = new Las(path.join(__dirname, "../../../../../sample.las"));

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
  const lineData: Plotly.Data = {
    type: "scatter3d",
    mode: "lines+markers",
    x: points.map((p) => p.x),
    y: points.map((p) => p.y),
    z: points.map((p) => p.z),
    line: { color: "red", width: 5 },
    marker: { size: 1 },
  };

  return { data: [lineData] };
};

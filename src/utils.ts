export const calculateCoordinates = (
  depth: number,
  zenith: number,
  azimuth: number
) => {
  // Преобразуем углы из градусов в радианы
  const zenithInRadians = zenith * (Math.PI / 180);
  const azimuthInRadians = azimuth * (Math.PI / 180);

  // Рассчитываем координаты X и Y
  const x = depth * Math.sin(azimuthInRadians) * Math.cos(zenithInRadians);
  const y = depth * Math.cos(azimuthInRadians) * Math.cos(zenithInRadians);

  return { x, y, z: -depth };
};

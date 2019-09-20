export const rgbToyiq = rgb => {
  const r = parseInt(rgb.substr(0, 2), 16);
  const g = parseInt(rgb.substr(2, 2), 16);
  const b = parseInt(rgb.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return Math.trunc(yiq);
};

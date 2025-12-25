const durationConversion = (sec) => {
  const hours = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  return `${hours}:${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const formatViewCount = (viewCount) => {
  if (viewCount >= 1_000_000_000) {
    return (viewCount / 1_000_000_000).toFixed(1) + "B";
  } else if (viewCount >= 1_000_000) {
    return (viewCount / 1_000_000).toFixed(1) + "M";
  } else if (viewCount >= 1_000) {
    return (viewCount / 1_000).toFixed(1) + "K";
  }
  return viewCount;
};

export { durationConversion, formatViewCount };

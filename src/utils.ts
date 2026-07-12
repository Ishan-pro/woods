export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  return `${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""}${remainingSeconds}s`;
};

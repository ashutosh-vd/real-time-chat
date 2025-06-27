export const formatMessageTime = (unformattedTime) => {
  return new Date(unformattedTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

import app from "./app";

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});

const onCloseSignal = () => {
  console.warn("SIGINT received, shutting down");
  server.close(() => {
    console.warn("Server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);

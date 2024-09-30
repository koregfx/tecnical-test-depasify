import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const steps = [
  {
    card_1: "blue",
    card_2: "blue",
    card_3: "blue",
    card_4: "blue",
  },
  {
    card_1: "yellow",
    card_2: "blue",
    card_3: "blue",
    card_4: "blue",
  },
  {
    card_1: "green",
    card_2: "blue",
    card_3: "blue",
    card_4: "blue",
  },
  {
    card_1: "green",
    card_2: "yellow",
    card_3: "blue",
    card_4: "blue",
  },
  {
    card_1: "green",
    card_2: "green",
    card_3: "blue",
    card_4: "blue",
  },
  {
    card_1: "green",
    card_2: "green",
    card_3: "yellow",
    card_4: "blue",
  },
  {
    card_1: "green",
    card_2: "green",
    card_3: "green",
    card_4: "blue",
  },
  {
    card_1: "green",
    card_2: "green",
    card_3: "green",
    card_4: "yellow",
  },
  {
    card_1: "green",
    card_2: "green",
    card_3: "green",
    card_4: "green",
  },
];
const __filename = fileURLToPath(import.meta.url);
let httpServer;
let io;
let app;
const processingPayments = [];
const initializeServer = (port = 3000) => {
  const dev = process.env.NODE_ENV !== "production";
  const hostname = "localhost";
  // when using middleware `hostname` and `port` must be provided below
  app = next({ dev, hostname, port });
  const handler = app.getRequestHandler();
  app.prepare().then(() => {
    httpServer = createServer(handler);

    io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log("connection done");

      socket.on("paymentSubscribe", (data) => {
        if (!processingPayments.includes(data)) {
          processingPayments.push(data);
          processPayment(socket, data);
        }
      });
    });

    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  });
};

if (process.argv[1] === __filename) {
  initializeServer();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const processPayment = async (socket, paymentId) => {
  for (let index = 0; index < steps.length; index++) {
    if (process.argv[1] === __filename) {
      // console.log("sending step", index);
    }
    const status = steps[index];
    socket.emit("paymentStatusUpdate", { status, step: index, paymentId });
    await sleep(1000);
  }
};

const closeServer = () => {
  if (httpServer) httpServer.close();
  if (io) io.close();
};
export { initializeServer, processingPayments, processPayment, closeServer };

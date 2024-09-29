import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

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
]
const processingPayments = []
app.prepare().then(() => {

  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
    console.log(socket.id)
    console.log("connection done")

    socket.onAny((data) => { console.log(data) })
    socket.on('paymentSubscribe', (data) => {
      console.log(data)
      if (!processingPayments.includes(data)) {
        processingPayments.push(data)
        proccessPayment(socket, data)
      }
    })
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



const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const proccessPayment = async (socket, paymentId) => {
  for (let index = 0; index < steps.length; index++) {
    console.log('sending step', index)
    const status = steps[index];
    socket.emit("paymentStatusUpdate", { status, step: index, paymentId })
    await sleep(1000)
  }
}

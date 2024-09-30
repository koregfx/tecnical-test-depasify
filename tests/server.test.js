import * as chai from "chai";
import chaiHttp from "chai-http";
import { Server } from "socket.io";
import { createServer } from "http";
import ioClient from "socket.io-client";
import {
  initializeServer,
  processingPayments,
  closeServer,
} from "../server.js";

chai.should();
chai.use(chaiHttp);

describe("Socket Server", () => {
  let ioServer;
  let httpServer;
  let clientSocket;

  before(async function () {
    this.timeout(10000);
    await new Promise((resolve) => {
      const port = 4000;
      initializeServer(port);
      httpServer = createServer();
      ioServer = new Server(httpServer);
      httpServer.listen(() => {
        clientSocket = ioClient(`http://localhost:${port}`);
        clientSocket.on("connect", resolve);
      });
    });
  });

  after(() => {
    ioServer.close();
    clientSocket.close();
    closeServer();
  });

  it("should accept socket connections", function (done) {
    this.timeout(5000); // Aumentar el tiempo límite a 5000ms

    if (clientSocket.connected) {
      done();
    } else {
      clientSocket.on("connect", () => {
        done();
      });
    }
  });

  it("should emit payment status updates", function (done) {
    this.timeout(5000); // Aumentar el tiempo límite a 5000ms
    clientSocket.emit("paymentSubscribe", "payment1");
    clientSocket.once("paymentStatusUpdate", (data) => {
      data.should.have.property("status");
      data.should.have.property("step");
      processingPayments
        .filter((id) => id === "payment1")
        .length.should.equal(1);
      done();
    });
  });

  it("should not process the same payment twice simultaneously", function (done) {
    this.timeout(5000); // Aumentar el tiempo límite a 5000ms
    clientSocket.emit("paymentSubscribe", "payment2");
    clientSocket.emit("paymentSubscribe", "payment2");
    setTimeout(() => {
      processingPayments
        .filter((id) => id === "payment2")
        .length.should.equal(1);
      done();
    }, 20); // Esperar un poco para asegurarse de que no se procesa dos veces
  });
});

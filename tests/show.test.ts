import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Show from "@/app/show/[id]/page";
import PaymentStatusCard from "@/app/components/paymentStatusCard";
import { expect } from "chai";
import { describe, it } from "node:test";

describe("<Show />", () => {
  it("should render correctly when payment is present", () => {
    const useSocket = () => ({
      isConnected: true,
      transport: "websocket",
      payment: {
        status: {
          card_1: "completed",
          card_2: "completed",
          card_3: "completed",
          card_4: "completed",
        },
      },
    });

    const params = { id: "123" };
    render(<Show params={params} useSocket={useSocket as any} />);

    expect(screen.getByText("Madrid-Eur")).toBeInTheDocument();
    const cards = screen.getAllByTestId("payment-status-card");
    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveTextContent("completed");
  });
});

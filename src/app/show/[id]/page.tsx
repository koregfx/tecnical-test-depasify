"use client";

import PaymentStatusCard from "@/app/components/paymentStatusCard";
import Link from "next/link";
import { useSocket } from "@/app/lib/socket/socket";

export default function Show({ params }: { params: { id: string } }) {
  const { isConnected, transport, payment } = useSocket(params.id);

  if (!payment) return <></>;
  if (!payment) return <></>;
  return (
    <div className="flex justify-center items-center flex-col gap-10 my-5">
      <div>
        {isConnected ? "true" : "false"} {transport}
      </div>
      <div className="flex mx">
        <p className="flex-grow text-3xl">Pago {params.id}</p>
        <Link href={"/"}> Home</Link>
      </div>
      <div className="flex flex-row gap-10 justify-center items-center">
        <PaymentStatusCard title="Madrid-Eur" status={payment.status.card_1} />
        <PaymentStatusCard title="Eur-Usdt" status={payment.status.card_2} />
        <PaymentStatusCard title="Usdt-Peso" status={payment.status.card_3} />
        <PaymentStatusCard title="Peso-Bogota" status={payment.status.card_4} />
      </div>
    </div>
  );
}

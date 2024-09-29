"use client";

import PaymentListItem from "@/app/components/paymentListItem";
import { useStore } from "@/app//lib/store/store";


export default function Home() {

  const payments = useStore(state => state.payments)

  return (
    <div className="flex justify-center items-center flex-col gap-10 my-5">
      <p className="text-3xl">Pagos</p>
      <div className="flex flex-col justify-center items-center">

        {Object.keys(payments).map(paymentId =>
        (
          <PaymentListItem key={paymentId} payment={payments[paymentId]} />
        ))}
      </div>

      <button>Reset Socket</button>
    </div>
  );
}

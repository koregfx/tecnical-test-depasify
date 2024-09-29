"use client";
import { Payment } from "@/app/lib/store/store"
import { timestampToString } from "@/app/lib/utils";
import Link from "next/link";

interface Props {
  payment: Payment
}
export default function PaymentListItem({ payment }: Props) {
  return (
    <div className="flex border gap-8 p-3 rounded-lg m-2 max-w-4xl">
      <p>{payment.name}</p>
      <p>{payment.balances.EUR} eur</p>
      <p>{payment.balances.USDT} $</p>
      <p>{timestampToString(payment.date)}</p>
      <Link href={`show/${payment.id}`} className="flex-grow flex justify-end">
        <p>Show</p>
      </Link>
    </div>

  );
}

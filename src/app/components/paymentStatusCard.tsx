"use client";

import { validStatus } from "@/app/lib/store/store";

interface Props {
  title: string,
  status: validStatus
}

const styles = {
  green: {
    bg: 'bg-[#d5e8d4]',
    border: 'border-[#a5ca95]'
  },

  yellow: {
    bg: 'bg-[#fff2cc]',
    border: 'border-[#edd89b]'
  },
  blue: {
    bg: 'bg-[#dae8fc]',
    border: 'border-[#a3b9d8]'
  }
}
export default function PaymentStatusCard({ title, status }: Props) {
  return (
    <div className="flex flex-col items-center border rounded-xl p-5 w-40 h-60">
      <p>{title}</p>
      <p>{status}</p>
      <div className={`rounded-full border-[4px] ${styles[status].bg} ${styles[status].border} w-16 h-16 mt-8`}></div>
    </div>
  );
}

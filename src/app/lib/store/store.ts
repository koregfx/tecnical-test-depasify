import { randomUUID } from 'crypto';
import { create } from 'zustand'
interface State {
  payments: Payment[];
  updatePaymentStatus: (paymentId: string, newStatus: PaymentStatus) => void
}
interface Payment {
  id: string,
  name: string,
  balances: {
    EUR: number,
    USDT: number
  },
  date: number,
  status: PaymentStatus
}
interface PaymentStatus {

  card_1: validStatus,
  card_2: validStatus,
  card_3: validStatus,
  card_4: validStatus,
}
type validStatus = "blue" | "yellow" | "green"
export const useStore = create<State>((set) => ({
  payments: [
    {
      id: randomUUID(),
      name: "Payment 1",
      balances: {
        EUR: 20,
        USDT: 23
      },
      date: Date.now() + 86400000 * 3,
      status: {
        card_1: "blue",
        card_2: "blue",
        card_3: "blue",
        card_4: "blue",
      }
    },

    {
      id: randomUUID(),
      name: "Payment 2",
      balances: {
        EUR: 40,
        USDT: 46
      },
      date: Date.now() + 86400000 * 1,
      status: {
        card_1: "blue",
        card_2: "blue",
        card_3: "blue",
        card_4: "blue",
      }
    },

    {
      id: randomUUID(),
      name: "Payment 3",
      balances: {
        EUR: 60,
        USDT: 69
      },
      date: Date.now(),
      status: {
        card_1: "blue",
        card_2: "blue",
        card_3: "blue",
        card_4: "blue",
      }
    },

  ],
  updatePaymentStatus: (paymentId, newStatus) => {
    set((state) => {
      const updatedPayment = state.payments.filter(e => e.id === paymentId)[0]
      updatedPayment.status = newStatus

      state.payments = [...state.payments.filter(e => e.id !== paymentId), updatedPayment]
      return state
    })
  }
}))

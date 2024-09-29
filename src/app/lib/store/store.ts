import { create } from 'zustand'

interface State {
  payments: { [key: string]: Payment };
  updatePaymentStatus: (paymentId: string, newStatus: PaymentStatus) => void
}
export interface Payment {
  id: string,
  name: string,
  balances: {
    EUR: number,
    USDT: number
  },
  date: number,
  status: PaymentStatus
}
export interface PaymentStatus {
  card_1: validStatus,
  card_2: validStatus,
  card_3: validStatus,
  card_4: validStatus,
}
export type validStatus = "blue" | "yellow" | "green"
export const useStore = create<State>((set) => ({
  payments: {
    "df88e4f1-4301-44f7-a449-7f2a2b4ce3ad": {
      id: "df88e4f1-4301-44f7-a449-7f2a2b4ce3ad",
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
    "87afdaf0-41e3-4da7-9ae1-b98c3193ec91": {
      id: "87afdaf0-41e3-4da7-9ae1-b98c3193ec91",
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
    "d2bf8a51-d241-4531-877b-20cac0a57a31": {
      id: "d2bf8a51-d241-4531-877b-20cac0a57a31",
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

  },
  updatePaymentStatus: (paymentId, newStatus) => {
    set((state) => ({
      payments: {
        ...state.payments,
        [paymentId]: {
          ...state.payments[paymentId],
          status: newStatus,
        },
      },
    }))
  }
}))

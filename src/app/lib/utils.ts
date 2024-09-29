import { PaymentStatus, validStatus } from "./store/store"

export const timestampToString = (time: number): string => {
  const date = new Date(time).toISOString()
  return date
}


export const validateNewStatus = (prevStatus: PaymentStatus, nextStatus: PaymentStatus): boolean => {
  const statusOrder: validStatus[] = ['blue', "yellow", "green"]
  const statusKeys = Object.keys(prevStatus);
  let yellowCounter = 0
  for (let index = 0; index < statusKeys.length; index++) {
    const card = statusKeys[index] as "card_1" | "card_2" | "card_3" | "card_4";
    if (statusOrder.indexOf(prevStatus[card]) > statusOrder.indexOf(nextStatus[card]))
      return false
    if (nextStatus[card] === 'yellow')
      yellowCounter++
  }
  if (yellowCounter > 1) return false
  return true
}

"use client";

import { io } from "socket.io-client";
import { useEffect, useState, useCallback } from 'react';
import { Payment, PaymentStatus, useStore } from '@/app/lib/store/store';
import { validateNewStatus } from '@/app/lib/utils';

export const socket = io();

export const useSocket = (paymentId: string) => {
  const { payments, updatePaymentStatus } = useStore(state => state);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const [payment, setPayment] = useState<Payment>();
  useEffect(() => {
    setPayment(payments[paymentId])
  }, [payments, paymentId])

  const onConnect = () => {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);

    socket.io.engine.on('upgrade', (transport) => {
      setTransport(transport.name);
    });
  }

  const statusUpdate = useCallback(
    (data: { status: PaymentStatus; step: number; paymentId: string }) => {
      console.log('statusUpdate: ', data.step);
      if (data.paymentId !== paymentId) return;

      if (!payment) return;

      const isValid = validateNewStatus(payment.status, data.status);
      console.log({ isValid, data });

      if (isValid) {
        updatePaymentStatus(payment.id, data.status);
      } else {
        console.error('Invalid Status');
      }
    },
    [payment, paymentId, updatePaymentStatus] // Dependencias de useCallback
  );

  const onDisconnect = () => {
    setIsConnected(false);
    setTransport('N/A');
  }

  useEffect(() => {
    console.log("Start")
    if (socket.connected) {
      onConnect();
    }
    socket.on('paymentStatusUpdate', statusUpdate);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.emit('paymentSubscribe', paymentId);

    return () => {
      socket.off('connect', onConnect);
      socket.off('paymentStatusUpdate', statusUpdate);
      socket.off('disconnect', onDisconnect);
    };
  }, [paymentId, statusUpdate]);

  return { isConnected, transport, payment };
};

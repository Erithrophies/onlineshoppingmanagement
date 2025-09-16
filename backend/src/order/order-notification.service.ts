// order-notification.service.ts
const Pusher = require("pusher"); // <-- use require

export const pusher = new Pusher({
  appId: "2051316",
  key: "383839eff6f5dc6b68fc",
  secret: "4c68059fa4f5b174a2a5",
  cluster: "mt1",
  useTLS: true,
});

export async function sendOrderNotification(
  customerId: number,
  payload: Record<string, any>
) {
  try {
    await pusher.trigger(`customer-${customerId}`, 'new-order', payload);
    console.log('✅ Pusher event sent:', payload);  // <-- add this line
   
  } catch (err) {
    console.error('Failed to send Pusher notification:', err);
  }
}



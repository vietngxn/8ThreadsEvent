export function pickPaymentFields(source = {}) {
  const allowed = {};
  if (source.paymentId !== undefined) allowed.paymentId = source.paymentId;
  if (source.orderId !== undefined) allowed.orderId = source.orderId;
  if (source.method !== undefined) allowed.method = source.method;
  if (source.amount !== undefined) allowed.amount = source.amount;
  if (source.currency !== undefined) allowed.currency = source.currency;
  if (source.status !== undefined) allowed.status = source.status;
  if (source.paidAt !== undefined) allowed.paidAt = source.paidAt;
  return allowed;
}

export function pickOrderFields(source = {}) {
  const allowed = {};
  if (source.orderId !== undefined) allowed.orderId = source.orderId;
  if (source.userId !== undefined) allowed.userId = source.userId;
  if (source.eventId !== undefined) allowed.eventId = source.eventId;
  if (source.items !== undefined) allowed.items = source.items;
  if (source.subtotal !== undefined) allowed.subtotal = source.subtotal;
  if (source.status !== undefined) allowed.status = source.status;
  if (source.voucherId !== undefined) allowed.voucherId = source.voucherId;
  if (source.createdAt !== undefined) allowed.createdAt = source.createdAt;
  return allowed;
}

export function withStatus(source = {}, status) {
  return pickOrderFields({ ...source, status });
}

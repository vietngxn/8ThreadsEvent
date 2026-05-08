export function pickTicketFields(source = {}) {
  const allowed = {};

  if (source.ticketId !== undefined) allowed.ticketId = source.ticketId;
  if (source.eventId !== undefined) allowed.eventId = source.eventId;
  if (source.ticketTypeId !== undefined)
    allowed.ticketTypeId = source.ticketTypeId;
  if (source.orderId !== undefined) allowed.orderId = source.orderId;
  if (source.ownerId !== undefined) allowed.ownerId = source.ownerId;
  if (source.qrCode !== undefined) allowed.qrCode = source.qrCode;
  if (source.status !== undefined) allowed.status = source.status;

  return allowed;
}

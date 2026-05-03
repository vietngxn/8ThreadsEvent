import { VNPay } from "vnpay";

function getVnpEnv(...keys) {
  for (const key of keys) {
    if (process.env[key]) {
      return process.env[key];
    }
  }
  return undefined;
}

function normalizeVnpayHost(host) {
  if (!host) return "https://sandbox.vnpayment.vn";

  try {
    const url = new URL(host);
    return `${url.protocol}//${url.host}`;
  } catch {
    return host.replace(/\/?paymentv2\/vpcpay\.html\/?$/i, "");
  }
}

export const vnpay = new VNPay({
  tmnCode: getVnpEnv("VNPAY_TMN_CODE", "VNP_TMNCODE"),
  secureSecret: getVnpEnv("VNPAY_HASH_SECRET", "VNP_HASHSECRET"),
  vnpayHost: normalizeVnpayHost(
    getVnpEnv("VNPAY_URL", "VNP_URL") || "https://sandbox.vnpayment.vn",
  ),
  testMode: true,
});

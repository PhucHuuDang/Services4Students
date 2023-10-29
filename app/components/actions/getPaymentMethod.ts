export default async function getPaymentMethod() {
  const getPaymentMethod = await fetch(
    "http://3.27.132.94/api/v1/paymentmethods",
    {
      cache: "no-store",
    }
  );

  if (!getPaymentMethod.ok) {
    throw new Error("Failed to fetch payment method");
  }

  const paymentMethodRes = await getPaymentMethod.json();

  return paymentMethodRes;
}

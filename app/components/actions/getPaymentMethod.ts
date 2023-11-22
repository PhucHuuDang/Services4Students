export default async function getPaymentMethod() {
  const getPaymentMethod = await fetch(
    // "http://13.210.56.232/api/v1/paymentmethods",
    "https://housevn.azurewebsites.net/api/v1/paymentmethods",
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

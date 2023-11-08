interface BookingData {
  totalPrice: any;
  listBookingData: Array<{
    id: string;
    studentName: string;
    paymentMethodName: string;
    created: string;
    totalPay: number;
    statusContract: string;
  }>;
}

export default async function getBookingMoneyByOneYear(
  startDate: string,
  endDate: string
) {
  const response = await fetch(
    `http://13.210.56.232/api/v1/bookings/datetime?StartDate=${startDate}&EndDate=${endDate}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch API Bookings");
  }

  const data: BookingData = await response.json();
  const extractedData = {
    totalPrice: data.totalPrice,
    bookings: data.listBookingData.map((booking) => ({
      id: booking.id,
      studentName: booking.studentName,
      paymentMethodName: booking.paymentMethodName,
      created: booking.created,
      totalPay: booking.totalPay,
      statusContract: booking.statusContract,
    })),
  };

  return extractedData;
}

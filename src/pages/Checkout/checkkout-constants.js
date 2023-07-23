export const MethodPayment = {
  MONEY: 0,
  CARD: 1,
};
export const ArrayMethodPayment = [
  {
    key: "0",
    methodCode: MethodPayment.CARD,
    label: "Thanh toán bằng thẻ",
    children: `Thanh toán bằng thẻ : Tính năng đang phát triển`,
  },
  {
    key: "1",
    methodCode: MethodPayment.MONEY,
    label: "Thanh toán khi nhận hàng",
    children: `Thanh toán khi nhận hàng: Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.`,
  },
];

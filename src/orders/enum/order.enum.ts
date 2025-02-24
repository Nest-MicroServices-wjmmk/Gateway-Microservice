export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PROCESSING = 'PROCESSING',  
    COMPLETED = 'COMPLETED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export const OrderStatusList = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PROCESSING,
    OrderStatus.COMPLETED,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED
]


export enum PaymentMethod {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    PAYPAL = 'PAYPAL',
    GOOGLE_PAY = 'GOOGLE_PAY',
    APPLE_PAY = 'APPLE_PAY',
    AMAZON_PAY = 'AMAZON_PAY',
    BITCOIN = 'BITCOIN'
}
export const PaymentMethodList = [
    PaymentMethod.CASH,
    PaymentMethod.CREDIT_CARD,
    PaymentMethod.DEBIT_CARD,
    PaymentMethod.PAYPAL,
    PaymentMethod.GOOGLE_PAY,
    PaymentMethod.APPLE_PAY,
    PaymentMethod.AMAZON_PAY,
    PaymentMethod.BITCOIN
]
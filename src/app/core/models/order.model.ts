export interface CreateOrderRequest {
  screening_id: number;
  seat_ids: number[];
  payment_method: 'credit_card' | 'debit_card' | 'pix';
}

export interface OrderResponse {
  message: string;
  data: {
    id: number;
    user_id: number;
    total_amount: string;
    payment_method: string;
    payment_status: string;
    paid_at: string;
    tickets: {
      id: number;
      code: string;
      unit_price: string;
      status: string;
      seat: { id: number; label: string };
      screening: {
        id: number;
        start_time: string;
        end_time: string;
        movie: { id: number; title: string; slug: string };
      };
    }[];
  };
}
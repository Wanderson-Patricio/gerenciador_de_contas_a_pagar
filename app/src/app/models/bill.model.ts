export interface Bill {
  id: number;
  bill_description: string;
  bill_value: number;
  is_paid: boolean;
  payment_date: string;
  due_date: string;
  reference_month: number;
  reference_year: number;
  category_id: number;
  observations: string;
}

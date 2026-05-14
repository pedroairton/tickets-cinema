import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

type PaymentMethod = 'credit_card' | 'debit_card' | 'pix';

interface PaymentOption {
  value: PaymentMethod;
  label: string;
}

@Component({
  selector: 'app-payment-form-component',
  imports: [],
  templateUrl: './payment-form-component.html',
  styleUrl: './payment-form-component.scss',
})
export class PaymentFormComponent {
  @Input({ required: true }) totalPrice!: number;
  @Input({required: true}) isSubmitting: boolean = false
  @Output() paymentSubmit = new EventEmitter<PaymentMethod>()
  @Output() goBack = new EventEmitter<void>()

  selectedMethod = signal<PaymentMethod | null>(null)
  paymentOptions: PaymentOption[] = [
    {
      value: 'pix',
      label: 'PIX',
    },
    {
      value: 'credit_card',
      label: 'Cartão de Crédito',
    },
    {
      value: 'debit_card',
      label: 'Cartão de Débito',
    },
  ]

  selectMethod(method: PaymentMethod) {
    this.selectedMethod.set(method);
  }

  onSubmit() {
    const method = this.selectedMethod()
    if(!method) return
    this.paymentSubmit.emit(method)
  }

  onGoBack() {
    this.goBack.emit()
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { Seat, SeatMap } from '../../../../core/models/seat.model';
import { ToastrService } from 'ngx-toastr';
import { CreateOrderRequest } from '../../../../core/models/order.model';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from '../components/payment-form-component/payment-form-component';
import { OrderSummaryComponent } from '../components/order-summary-component/order-summary-component';
import { SeatMapComponent } from '../components/seat-map-component/seat-map-component';
type Step = 'seats' | 'payment' | 'confirmation';
@Component({
  selector: 'app-screening-detail',
  imports: [CommonModule, PaymentFormComponent, OrderSummaryComponent, SeatMapComponent],
  templateUrl: './screening-detail.html',
  styleUrl: './screening-detail.scss',
})
export class ScreeningDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private toastr = inject(ToastrService);

  currentStep = signal<Step>('seats');
  isLoading = signal(true);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  screening = signal<any>(null);
  seatMap = signal<SeatMap>({})
  selectedSeats = signal<Seat[]>([]);

  orderResult = signal<any>(null);

  totalPrice = computed(() => {
    const price = parseFloat(this.screening()?.price || '0');
    return price * this.selectedSeats().length;
  })

  screeningId = 0

  ngOnInit(){
    this.screeningId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData()
  }

  private loadData(){
    this.isLoading.set(true);
    this.apiService.getScreening(this.screeningId).subscribe({
      next: (res: any) => {
        this.screening.set(res.data);
        if(res.data.has_started) {
          this.toastr.warning('O filme já começou');
          this.isLoading.set(false);
          return
        }

        this.loadSeatMap();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar o filme');
        this.isLoading.set(false);
      },
    });
  }
  private loadSeatMap(){
    this.apiService.getSeatMap(this.screeningId).subscribe({
      next: (res: any) => {
        this.seatMap.set(res.seat_map)
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar assentos');
        this.isLoading.set(false);
      }
    })
  }

  onSeatToggled(seat: Seat) {
    const current = this.selectedSeats()
    const index = current.findIndex((s) => s.id === seat.id);

    if(index > -1) {
      this.selectedSeats.set(current.filter((s) => s.id !== seat.id));
    } else {
      if(current.length >= 10) {
        this.toastr.error('Máximo de 10 assentos por pedido');
        return
      }
      this.selectedSeats.set([...current, seat]);
    }
    this.errorMessage.set(null);
  }

  goToPayment(){
    if(this.selectedSeats().length === 0) {
      this.errorMessage.set('Selecione pelo menos um assento');
      return
    }
    this.errorMessage.set(null);
    this.currentStep.set('payment');
  }

  goBackToSeats(){
    this.errorMessage.set(null);
    this.currentStep.set('seats');
  }

  onPaymentSubmit(paymentMethod: 'credit_card' | 'debit_card' | 'pix'){
    this.isSubmitting.set(true)
    this.errorMessage.set(null)

    const orderData: CreateOrderRequest = {
      screening_id: this.screeningId,
      seat_ids: this.selectedSeats().map((s) => s.id),
      payment_method: paymentMethod
    }

    this.apiService.createOrder(orderData).subscribe({
      next: (res: any) => {
        this.orderResult.set(res.data);
        this.currentStep.set('confirmation');
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set(err.error.message);
        this.toastr.error('Erro ao criar o pedido');
        this.isSubmitting.set(false);
      }
    })
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToTickets(){
    this.router.navigate(['/tickets']);
  }
}


import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment';  

export interface PriceUpdate {
  symbol: string;
  price: number;
  variation: number;
  timestamp: string;
}

export interface AlertTriggered {
  symbol: string;
  price: number;
  threshold: number;
}

@Injectable({ providedIn: 'root' })
export class PriceService {
  private hubConnection!: signalR.HubConnection;

  public prices$ = new BehaviorSubject<Map<string, PriceUpdate>>(new Map());
  public alerts$ = new BehaviorSubject<AlertTriggered[]>([]);

  public startConnection(token: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl, {          // ← plus de hardcode
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connexion au hub de prix établie'))
      .catch(err => console.error('Erreur de connexion SignalR:', err));

    this.hubConnection.on('PriceUpdate', (update: PriceUpdate) => {
      const current = this.prices$.value;
      current.set(update.symbol, update);
      this.prices$.next(new Map(current));
    });

    this.hubConnection.on('AlertTriggered', (alert: AlertTriggered) => {
      this.alerts$.next([...this.alerts$.value, alert]);
    });
  }

  public setAlert(symbol: string, threshold: number, triggerAbove: boolean): void {
    this.hubConnection.invoke('SetAlert', symbol, threshold, triggerAbove)
      .catch(err => console.error('Erreur lors de la création de l\'alerte:', err));
  }

  public stopConnection(): void {
    this.hubConnection?.stop();
  }
}
export interface IEvent {
  name: string;
  note: string | null;
  date: string;
  address: IEventAddress | null;
}

export interface IEventAddress {
  street: string;
  street_number: string;
  city: string;
  country: string; 
}

export interface IEvent {
  id: number;
  name: string;
  going: string[];
  interested: string[];
  address: IEventAddress | null;
  datetime: Date;
  creator: string;
  created_at: Date;
}

export interface IEventAddress {
  id: number;
  street: string;
  street_number: string;
  city: string;
  country: string;
}

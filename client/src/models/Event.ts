export interface IEvent {
  id: number;
  name: string;
  note: string | null;
  creator: string;
  allParticipants: IEventParticipant[];
  address: IEventAddress | null;
  proceedingsTime: string;
  createdAt: string;
}

export interface IEventAddress {
  id: number;
  eventId: number;
  street: string;
  streetNumber: string;
  city: string;
  country: string;
  createdAt: string;
}

export interface IEventParticipant {
  id: number;
  name: string;
  going: boolean;
}

export interface IEventStore {
  events: IEvent[];
}

export interface IEventPostData {
  name: string;
  note: string | null;
  date: string;
  address: IEventAddressPostData | null;
}

export interface IEventAddressPostData {
  street: string;
  streetNumber: string;
  city: string;
  country: string;
}

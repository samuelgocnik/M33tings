export interface IEvent {
  id: number;
  name: string;
  note: string | null;
  creator: string;
  all_participants: IEventParticipant[];
  address: IEventAddress | null;
  proceedings_time: string;
  created_at: string;
}

export interface IEventAddress {
  id: number;
  event_id: number;
  street: string;
  street_number: string;
  city: string;
  country: string;
  created_at: string;
}

export interface IEventParticipant {
  name: string;
  going: boolean;
}

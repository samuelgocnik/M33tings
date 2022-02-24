export interface IParticipantPost {
  userId: number;
  eventId: number;
  going: boolean;
}

export interface IParticipantUpdate {
  id: number;
  going: boolean;
}

export interface IParticipantDelete {
  id: number;
}
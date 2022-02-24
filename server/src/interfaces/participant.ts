export interface IParticipantCreate {
  user_id: number;
  event_id: number;
  going: boolean;
}

export interface IParticipantDelete {
  id: number;
}

export interface IParticipantUpdate {
  id: number;
  going: boolean;
}

export interface INotification {
  type: UiTypes;
  title: UiTitles;
  message: string;
}

export interface IUiSlice {
  notification: INotification;
}

export enum UiTypes {
  Error,
  Loading,
  Success,
  None,
}

export enum UiTitles {
  None,
  FetchingEvents,
  EventsSuccessfullyFetched,
  Registration,
  SuccessfullyRegistered,
  Login,
  SuccessfullyLoggedIn,
  CreatingEvent,
  EventSuccessfullyCreated,
  SuccessfullyLoggedOut,
  EditingEventParticipant,
  EventParticipantSuccessfullyEdited,
  NoMoreEventsToFetch,
}

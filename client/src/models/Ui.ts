export interface INotification {
  type: UiTypes;
  title: string;
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

export interface INotification {
  status: string;
  title: string;
  message: string;
}

export interface IUiSlice {
  notification: INotification | null;
}

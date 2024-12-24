export interface IAppError {
  message: string;
  statusCode: number;
}

export function AppError(message: string, statusCode = 400): IAppError {
  return { message, statusCode };
}

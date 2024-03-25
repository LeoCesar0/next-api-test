export type AppError = {
  message: string;
} | null;

export type AppModelResponse<T> =
  | {
      data: null;
      done: false;
      error: AppError;
    }
  | {
      data: T;
      done: true;
      error: null;
    };

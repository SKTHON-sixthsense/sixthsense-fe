export interface BaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

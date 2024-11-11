export type TBook = {
  title: string;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
};

export type TErrorResponse = {
  success: boolean;
  status: number;
  message: string;
};

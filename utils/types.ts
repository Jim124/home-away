export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string | null | undefined }>;

export type PropertyCardProps = {
  id: string;
  image: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

export type DateRangSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

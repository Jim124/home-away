'use client';
import { useState, useEffect } from 'react';
import { Calendar } from '../ui/calendar';
import { useToast } from '../ui/use-toast';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';

function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const current = new Date();

  useEffect(() => {
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode='range'
      defaultMonth={current}
      selected={range}
      onSelect={setRange}
      className='mb-4'
    />
  );
}
export default BookingCalendar;

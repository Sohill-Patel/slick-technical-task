import { Page, Locator } from '@playwright/test';
import { BookingsWindow } from './bookingsWindow';

export class HomePage {
  private page: Page;
  private newBtn: Locator;
  private appointmentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBtn = page.getByRole('button', { name: '+ NEW' });
    this.appointmentBtn = page.getByTestId('SchedulerHeaderGatedAddAppointmentItem.Button');
  }

  async newBookingFromMenu(): Promise<BookingsWindow> {
    await this.newBtn.click();
    await this.appointmentBtn.click();
    const newBookingsWindow = new BookingsWindow(this.page);

    await newBookingsWindow.isVisible()
    return newBookingsWindow;
  }
}
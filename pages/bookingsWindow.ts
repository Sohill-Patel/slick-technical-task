import { Page, Locator, expect } from '@playwright/test';
import { DeleteBookingsPrompt } from './deleteBookingPrompt';



export class BookingsWindow {
  private page: Page;
  private window: Locator;
  private walkInBtn: Locator;
  private logFooter: Locator;
  private deleteBookingBtn: Locator;
  private deleteBookingWindow: Locator;

  constructor(page:Page){
    this.page = page;
    this.window = page.getByText('New booking+ Add new');
    this.walkInBtn = page.getByRole('button', { name: 'Walk In' });
    this.logFooter = page.getByTestId('BookingLogFooter');
    this.deleteBookingBtn = this.logFooter.getByRole('button').filter({ hasText: /^$/ });
    this.deleteBookingWindow = this.page.locator('[data-tag*="DeleteAppointmentButton--single--no-card--no-deposit"]').first();
  }

  async isVisible() {
    await expect(this.window).toBeVisible();
  }

  async walkInBooking () {
    await this.walkInBtn.click();
  }

  async fillBookingDetails() {
    await this.page.getByRole('button', { name: 'Walk In' }).click();
    await this.page.getByRole('button', { name: 'CHANGE DATE', exact: true }).click();
    await this.page.getByRole('option', { name: 'day-30' }).click();
    await this.page.getByRole('button', { name: 'Nails' }).click();
    await this.page.getByRole('menuitem', { name: 'Shellac Manicure £30.00 - £45' }).click();
    await this.page.getByRole('button', { name: 'Staff Member Select Stylist EDIT', exact: true }).click();
    await this.page.getByRole('button', { name: 'Sohill' }).nth(2).click();
    await this.page.getByRole('button', { name: 'Start Time Select Time EDIT', exact: true }).click();
    await this.page.locator('#booking-sidebar').getByText('10:30 AM').click();        
  }

  async clickSaveBooking() {
    await this.page.getByRole('button', { name: 'SAVE BOOKING' }).click();
  }

  async rescheduleBooking() {
    await this.page.getByTestId('BookingLogFooter__edit-button--future').click();
    await this.page.getByRole('button', { name: 'Start Time 10:30 AM EDIT', exact: true }).click();
    await this.page.locator('#edit-booking-sticky-header').getByText('11:30 AM', { exact: true }).click();
    await this.page.getByRole('button', { name: 'SAVE BOOKING' }).click();
  }

  async deleteBooking(){
    // ADD VISIBILITY CHECK OF WINDOW
    await this.deleteBookingBtn.click();
    const deleteBookingsPrompt = new DeleteBookingsPrompt(this.page)
    await deleteBookingsPrompt.deleteBooking();
  }

}
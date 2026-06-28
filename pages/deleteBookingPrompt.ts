import { Page, Locator, expect } from '@playwright/test';



export class DeleteBookingsPrompt {
  private page: Page;
  private window: Locator;
  private deleteBtn: Locator;


  constructor(page:Page){
    this.page = page;
    this.window = page.locator('[data-tag*="DeleteAppointmentButton--single--no-card--no-deposit"]').first();
    this.deleteBtn = page.getByText('DELETE BOOKING');
  }

  async isVisible() {
    await expect(this.window).toBeVisible();
  }

  async deleteBooking() {
    await this.deleteBtn.click();
  }

}
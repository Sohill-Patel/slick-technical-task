import { Page } from '@playwright/test';
import { test, expect } from '../fixtures/loginFixture';
import { HomePage } from '../pages/homePage';
import { BookingsWindow } from '../pages/bookingsWindow';



test.describe('Fill details for a Walk In appointment from menu', () => {
  let page: Page;
  
  test.beforeEach(async ({loginPage}) => {
    page = loginPage.getPage();
    const homePage = new HomePage(page);
    const newBookingsWindow = await homePage.newBookingFromMenu();
    
    await newBookingsWindow.fillBookingDetails();
  })

  test.afterEach(async () => {
    await page.getByTestId('ScheduleProcedure__slideout-open').click();
    const bookingWindow = new BookingsWindow(page);
    await bookingWindow.deleteBooking()
    await expect(page.getByTestId('ScheduleProcedure__slideout-open')).not.toBeVisible()
  })

  test('Schedule booking', async ({ }) => {
    const bookingWindow = new BookingsWindow(page);
    await bookingWindow.clickSaveBooking();
    await expect(page.getByTestId('ScheduleProcedure__slideout-open')).toBeVisible();
  });

})

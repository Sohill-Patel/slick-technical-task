# Test Guide

## Overview
This repository contains Playwright automation for a salon booking flow. The current automated tests cover:

- `tests/scheduleBooking.spec.ts`
  - Create a new Walk In appointment from the menu
  - Verify a booking is visible in calendar after saving

- `tests/rescheduleBooking.spec.ts`
  - Create a new Walk In appointment from the menu
  - Reschedule the saved appointment to a later time
  - Verify a booking remains visible in the calendar

- `tests/cancelBooking.spec.ts`
  - Create a new Walk In appointment from the menu
  - Cancel the saved appointment
  - Verify a booking is removed after cancellation

## Prerequisites

- Node.js installed
- Repository dependencies installed via `npm install`
- Access to the staging environment at `https://staging-salon.getslick.com`
- VS Code editor `https://code.visualstudio.com/`
- Playwright extension for VS Code `https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright`

## Setup

1. Copy `.env.example` to `.env`.
2. Ensure you have set valid `USERNAME`, `PASSWORD` and `PIN` environment variables. Do not rely on the default values.
3. Ensure `./storageState.json` is present in the repository root. This file is used by Playwright to create an authenticated browser context.

If it is not present at root, 
 - Insert breakpoint in `./pages/loginPage.ts` line 45 
 - From `Testing` tab tick the project `SetupLoginState` 
 - Run in debugger mode the test in `global-setup > setup-login-state > global setup login session for tests` 
 - Manually enter the email verification code when test stops at breakpoint
 - Continue the test to competion success

If successful, `./storageState.json` is created in root and `SetupLoginState` project is no longer required, untick this project.


## Run tests

From `Testing` tab ensure the project `CoreTests` is ticked, you can run the tests from here or use the `CLI`

From the repository root:

- Run the full test suite:
  ```bash
  npm test --project coreTests
  npm test cancelBooking
  npm test rescheduleBooking
  npm test scheduleBooking
  ```

- Run Playwright directly:
  ```bash
  npx playwright test --project coreTests
  ```

- Open the HTML test report after running tests:
  ```bash
  npm run report
  ```

## Configuration details

- Playwright config: `playwright.config.ts`
- Tests are located in: `tests/`
- Custom fixture file: `fixtures/loginFixture.ts`
- Page object helpers are in: `pages/`
- Storage state path: `storageState.json`
- Base URL for tests: `https://staging-salon.getslick.com`

## Notes

- The tests use a persisted login state from `storageState.json` and then navigate directly to the salon page.
- The current implementation types a PIN on navigation. If the staging environment changes the PIN flow, the PIN may need to be updated in `.env`.
- The three automated tests focus on positive flow coverage for booking creation, rescheduling, and cancellation.


## Assumptions
- Bookings to take place on 30th June
- Simple assertions that check there is a booking somewhere in the calendar
- There are no bookings at start of test, otherwise tests may fail

## Suggestions

- Assertions for bookings should be specific and check on correct calendar entry with checks for:
  - date
  - time
  - service
  - stylist
- More data-ids e.g. for windows & menu
- Dynamic date selection for test
- Use of AI workflow to create the tests based on requirements
- Tests to use multiple ways to perform the same flow e.g. bookings from menu or via calendar click
- Test data setup/cleanup via DB or api
- Test with different local timezone for scheduling
- CI/CD integration (currently its the boiler plate)
- Parallel execution support
- The right hand window can overlap with another right hand window e.g. New Booking + Click an existing booking from calendar
/**
 * Copyright 2018 Google Inc. All rights reserved.
 * Modifications copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import './base.fixture';

it.skip(options.FFOX)('should work', async({playwright, browser, server}) => {
  const iPhone = playwright.devices['iPhone 6'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();
  await page.goto(server.PREFIX + '/mobile.html');
  expect(await page.evaluate(() => window.innerWidth)).toBe(375);
  expect(await page.evaluate(() => navigator.userAgent)).toContain('iPhone');
  await context.close();
});

it.skip(options.FFOX)('should support clicking', async({playwright, browser, server}) => {
  const iPhone = playwright.devices['iPhone 6'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();
  await page.goto(server.PREFIX + '/input/button.html');
  const button = await page.$('button');
  await page.evaluate(button => button.style.marginTop = '200px', button);
  await button.click();
  expect(await page.evaluate('result')).toBe('Clicked');
  await context.close();
});

it.skip(options.FFOX)('should scroll to click', async({browser, server}) => {
  const context = await browser.newContext({
    viewport: {
      width: 400,
      height: 400,
    },
    deviceScaleFactor: 1,
    isMobile: true
  });
  const page = await context.newPage();
  await page.goto(server.PREFIX + '/input/scrollable.html');
  const element = await page.$('#button-91');
  await element.click();
  expect(await element.textContent()).toBe('clicked');
  await context.close();
});
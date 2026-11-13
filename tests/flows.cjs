const { chromium, firefox } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto((process.env.BASE_URL || 'http://127.0.0.1:8765') + '/menu.html');
 await page.locator('[data-add-drink]').first().waitFor();
 for(let i=0;i<9;i++) await page.locator('[data-add-drink]').first().click();
 assert.equal(await page.locator('#open-cart [data-basket-count]').innerText(), '8');
 assert.match(await page.locator('#menu-status').innerText(), /maximum/);
 await page.locator('#open-cart').click();
 await page.locator('#order-name').fill('Әли Құдайберген');
 await page.locator('#order-phone').fill('87011234567');
 await page.locator('#order-form [type=submit]').click();
 await page.locator('#order-saved.show').waitFor();
 assert.match(await page.locator('#order-saved').innerText(), /Order saved/);
 await page.locator('#order-saved [data-bs-dismiss=toast]').click();
 await page.locator('#order-saved').waitFor({state:'hidden'});
 await page.goto((process.env.BASE_URL || 'http://127.0.0.1:8765') + '/booking.html');
 await page.locator('#booking-toggle').click();
 await page.locator('#book-date').fill('2027-12-01');
 await page.locator('#book-time').fill('12:30');
 await page.locator('#book-guests').fill('2');
 await page.locator('#book-name').fill('Әли Құдайберген');
 for(const phone of ['7701123','770112345678','a77011234567','67011234567']) {
  await page.locator('#book-phone').fill(phone);
  await page.locator('#booking-form [type=submit]').click();
  assert.equal(await page.locator('#book-phone').getAttribute('aria-invalid'),'true');
 }
 for(const phone of ['+7 (701) 123-45-67','87011234567']) {
  await page.locator('#book-phone').fill(phone);
  await page.locator('#booking-form [type=submit]').click();
  assert.match(await page.locator('#booking-status').innerText(), /Request summary/);
 }
 await page.goto((process.env.BASE_URL || 'http://127.0.0.1:8765') + '/feedback.html');
 await page.locator('[data-bs-target="#feedback-panel"]').click();
 await page.locator('#rating-score').selectOption('5');
 await page.locator('#review-comments').fill('Nice coffee and a quiet place.');
 await page.locator('#feedback-form [type=submit]').click();
 assert.equal(await page.locator('#review-list article').count(),4);
 await page.setViewportSize({width:375,height:812});
 await page.goto((process.env.BASE_URL || 'http://127.0.0.1:8765') + '/menu.html');
 assert.equal(await page.locator('#open-cart').isVisible(),true);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:'mobile-menu.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: menu limit, order, booking phone cases, Kazakh name, feedback, mobile basket, no JS exceptions');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});


const { chromium, firefox } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://127.0.0.1:8766';
(async () => {
 for (const engine of [chromium, firefox]) {
  const browser = await engine.launch();
  const page = await browser.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/account.html#orders');
  assert.equal(await page.locator('#orders').isVisible(),false);
  assert.equal(await page.locator('#orders-list article').count(),0);
  await page.locator('#show-register').click();
  await page.locator('#register-name').fill('Dana');
  await page.locator('#register-email').fill('dana@example.test');
  await page.locator('#register-phone').fill('77011234567');
  await page.locator('#register-password').fill('sample-pass');
  await page.locator('#register-confirm').fill('sample-pass');
  await page.locator('#register-form [type=submit]').click();
  await page.locator('#account-session').waitFor();
  assert.equal(await page.locator('#orders-empty').isVisible(),true);
  for (let i=0;i<2;i++) {
   await page.goto(base+'/menu.html');
   await page.locator('[data-add-drink]').first().click();
   await page.locator('#open-cart').click();
   await page.locator('#order-name').fill('Әли Құдайберген');
   await page.locator('#order-phone').fill('87011234567');
   await page.locator('#order-notes').fill('<script>test</script> oat milk');
   await page.locator('#order-form [type=submit]').click();
   await page.locator('#order-status a').waitFor();
   assert.equal(await page.locator('#cart-items > div').count(),0);
   await page.locator('#order-status a').click();
   await page.locator('#orders-list article').nth(i).waitFor();
   assert.equal(await page.locator('#orders-list article').count(),i+1);
   await page.locator('details[open]').waitFor();
   assert.equal(await page.locator('details[open]').count(),1);
   assert.match(await page.locator('details[open]').innerText(),/Әли Құдайберген/);
   assert.equal(await page.locator('#orders-list script').count(),0);
  }
  await page.reload();assert.equal(await page.locator('#orders-list article').count(),2);
  await page.setViewportSize({width:375,height:812});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'orders-'+engine.name()+'.png',fullPage:true});
  // A blocked write must not clear the basket or report success.
  await page.goto(base+'/menu.html');await page.locator('[data-add-drink]').first().click();await page.locator('#open-cart').click();
  await page.locator('#order-name').fill('Dana');await page.locator('#order-phone').fill('77011234567');
  await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new Error('blocked')};});
  await page.locator('#order-form [type=submit]').click();
  assert.equal(await page.locator('#order-status.is-error').count(),1);assert.equal(await page.locator('#cart-items > div').count(),1);
  await page.goto(base+'/account.html#orders');
  await page.evaluate(()=>{
   const old=JSON.parse(localStorage.getItem('coffi-orders'))[0];
   localStorage.setItem('coffi-order-plan',JSON.stringify(old));localStorage.removeItem('coffi-orders');
  });
  await page.reload();assert.equal(await page.locator('#orders-list article').count(),1);
  assert.match(await page.locator('#orders-list').innerText(),/Previously saved order/);
  await page.locator('#account-logout').click();
  assert.equal(await page.locator('#orders').isVisible(),false);
  assert.equal(await page.locator('#orders-list article').count(),0);
  await page.reload();
  assert.equal(await page.locator('#orders').isVisible(),false);
  await page.locator('#login-email').fill('dana@example.test');
  await page.locator('#login-password').fill('sample-pass');
  await page.locator('#login-form [type=submit]').click();
  await page.locator('#orders-list article').waitFor();
  assert.equal(await page.locator('#orders').isVisible(),true);
  assert.deepEqual(errors,[]);
  console.log('PASS '+engine.name()+': save two orders, reload, details, text safety, mobile, storage failure');
  await browser.close();
 }
})().catch(e=>{console.error(e);process.exit(1)});

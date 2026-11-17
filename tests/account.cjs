const fs=require('node:fs');
const {chromium,firefox}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{for(const engine of [chromium,firefox]){
 const browser=await engine.launch(); const page=await browser.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto((process.env.BASE_URL || 'http://127.0.0.1:8765') + '/account.html');
 assert.equal(await page.locator('#login-panel').isVisible(),true);
 assert.equal(await page.locator('#register-panel').isVisible(),false);
 const loginUrl=page.url();await page.locator('#login-form [type=submit]').click();await page.waitForFunction(()=>document.querySelector('#login-status').textContent.includes('Enter your email and password'));assert.equal(page.url(),loginUrl);assert.equal(await page.locator('#login-panel').isVisible(),true);
 await page.locator('#login-email').fill('not-an-email');await page.locator('#login-password').fill('sample-pass');await page.locator('#login-form [type=submit]').click();await page.waitForFunction(()=>document.querySelector('#login-status').textContent.includes('valid email'));assert.equal(page.url(),loginUrl);
 await page.locator('#show-register').click();
 await page.locator('#register-phone').fill('1234');
 assert.equal(await page.locator('#register-phone').inputValue(), '+7 (234)');
 await page.locator('#register-phone').fill('7555');
 await page.locator('#register-phone').press('Backspace');
 assert.equal(await page.locator('#register-phone').inputValue(), '+7 (55');
 await page.locator('#register-name').fill('Әли Құдайберген');await page.locator('#register-email').fill('demo@example.test');await page.locator('#register-phone').fill('+7 (701) 123-45-67');
 for(const weak of ['Ab1shrt','lowercase123','UPPERCASE123','NoDigitsHere']) {
  await page.locator('#register-password').fill(weak);await page.locator('#register-confirm').fill(weak);
  await page.locator('#register-form [type=submit]').click();
  assert.equal(await page.locator('#register-password').evaluate(field=>field.validity.valid),false);
  assert.equal(await page.evaluate(()=>localStorage.getItem('coffi-demo-account')),null);
 }
 await page.locator('#register-password').fill('SamplePass1');await page.locator('#register-confirm').fill('SamplePass1');
 await page.locator('#register-form [type=submit]').click();await page.locator('#account-session').waitFor({state:'visible'});
 const stored=await page.evaluate(()=>localStorage.getItem('coffi-demo-account'));assert.ok(!stored.includes('SamplePass1'));
 await page.reload();await page.locator('#account-session').waitFor({state:'visible'});
 await page.locator('#account-logout').click();assert.equal(await page.locator('#account-session').isVisible(),false);
 await page.locator('#login-email').fill('demo@example.test');await page.locator('#login-password').fill('bad-pass');await page.locator('#login-form [type=submit]').click();await page.waitForFunction(()=>document.querySelector('#login-status').textContent.includes('incorrect'));
 await page.locator('#login-password').fill('SamplePass1');await page.locator('#login-password').press('Enter');await page.locator('#account-session').waitFor({state:'visible'});
 for(const width of [375,768,1440]) {await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 assert.deepEqual(errors,[]);console.log('PASS account register/reload/logout/wrong password/keyboard login/responsive:',engine.name());await browser.close();
}})().catch(e=>{console.error(e);process.exit(1)});

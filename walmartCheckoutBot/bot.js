const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// **ENTER PAGE OF THE ITEM YOU WANT FOR EXAMPLE**
const product_url = "https://www.walmart.com/ip/3-5MM-Portable-Lavalier-Microphone-Clip-on-Omnidirectional-Mic-for-Smartphone/3014040882?from=/search"; // Item you want 
const proxyUrl = "http://192.241.114.212:2020"; // Replace with your proxy server URL and port

// Input Information below
const email = ""; // Your email
const password = ""; // Your password
const cc_number = ""; // Your credit card #
const expMonth = ""; // Expiration date
const expYear = ""; // Expiration year
const cvv = ""; // CVV


puppeteer.use(StealthPlugin());

// Displays the page
async function givePage() {
  process.env.HTTP_PROXY = proxyUrl;
  process.env.HTTPS_PROXY = proxyUrl;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  return page;
}

// Adds the item to the cart
async function addToCart(page) {
  await page.goto(product_url);
  await page.waitForSelector("button[class='w_hhLG w_8nsR w_jDfj']"); // Waits for the button to load in
  await page.click("button[class='w_hhLG w_8nsR w_jDfj']"); // Clicks on 'Add to cart'
  await page.click("button[id='cart-button-header']"); // Clicks on 'Shopping cart' so it redirects to the cart page
  await page.waitForSelector("button[class='w_hhLG w_8nsR w_lgOn w_jDfj']"); // Waits for the checkout button to load
  await page.click("button[class='w_hhLG w_8nsR w_lgOn w_jDfj']"); // Clicks the 'Continue to checkout' button
}

// Fills in the email field
async function fillEmail(page) {
  await page.waitForTimeout(2000);
  // Switch to the iframe
  const frames = await page.frames(); // Get all frames on the page
  const iframe = frames.find(frame => frame.url().includes('walmart.com/account/login')); // Find the iframe containing the login form

  await iframe.waitForSelector("input[type='email']"); // Waits for the email input field to appear in the iframe
  await iframe.click("input[type='email']"); // Clicks on the email input field in the iframe
  await iframe.type("input[type='email']", email); // Types the provided email into the email input field in the iframe
  await iframe.click("button[class='w_hhLG w_8nsR w_jDfj w-100 mv3']"); // Clicks the 'Continue' button **NOTE: This is for when the user ISN'T logged in**
}
// Fills in the password field
async function fillPass(page) {
  await page.waitForTimeout(2000);

  const frames = await page.frames(); // Get all frames on the page
  const iframe = frames.find(frame => frame.url().includes('walmart.com/account/signin')); // Find the iframe containing the login form

  await iframe.waitForSelector("input[type='password']");
  await iframe.click("input[type='password']");
  await iframe.type("input[type='password']", password);
  await iframe.click("button[class='w_hhLG w_8nsR w_jDfj w-100']");
  await page.waitForNavigation();
}

async function fillPayment(page) {
  await page.waitForTimeout(3000);

  const frames = await page.frames();
  const iframe = frames.find(frame => frame.url().includes('https://www.walmart.com/checkout'));

  await iframe.waitForSelector("input[id='cc-number']"); // Waits for the html to load
  await iframe.click("input[id='cc-number']"); // Clicks the credit card input box
  await iframe.type("input[id='cc-number']", cc_number); // Fills in credit card num
  await page.waitForTimeout(500);
  await iframe.select("select[id='react-aria-8']", expMonth); // Fills the expiration box
  await iframe.click("select[id='react-aria-9']"); // Clicks the year drop-down menu
  await page.waitForTimeout(500);
  await iframe.type("select[id='react-aria-9']", expYear); // Types in the year e.g.: '24';
  await iframe.click("input[id='ld_ui_textfield_0']"); // Clicks the cvv box
  await page.waitForTimeout(500);
  await iframe.type("input[id='ld_ui_textfield_0']", cvv); // Fills the cvv box
  await iframe.click("button[class='w_hhLG w_8nsR w_IETL mt3']"); // Clicks the submit button
}

// Completes the purchase
async function submitOrder(page) {
  await page.waitForTimeout(2000);
  const frames = await page.frames();
  const iframe = frames.find(frame => frame.url().includes('https://www.walmart.com/checkout'));
  await page.waitForTimeout(1000);
  await iframe.click("button[class='w_hhLG w_8nsR w_lgOn w_IETL']");
}

// Calls the functions
async function checkout() {
  try {
    const page = await givePage();
    await addToCart(page);
    await fillEmail(page);
    await fillPass(page);
    await fillPayment(page);
    await submitOrder(page);
  } catch (error) {
    console.error("An error occurred during the checkout:", error);
  }
} 

checkout();

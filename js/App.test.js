import { test } from 'node:test';
import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import { exec } from 'node:child_process';

// The Ollama server must be running dolphin-phi:latest
// TODO: Implement dummy server
const url = 'http://localhost:11434';
const model = 'dolphin-phi:latest';

function openScreenshot(filePath) {
  const openCommand =
    process.platform === 'win32'
      ? 'start'
      : process.platform === 'darwin'
        ? 'open'
        : 'xdg-open';
  exec(`${openCommand} ${filePath}`, (error) => {
    if (error) {
      console.error(`  ✔ Error opening screenshot: ${error}`);
    }
  });
}

const DEBUG = process.env.DEBUG === 'true' || false;
const DARK_MODE = process.env.DARK_MODE === 'true' || false;
const VIDEO = process.env.VIDEO === 'true' || false;
const MOBILE = process.env.MOBILE === 'true' || false;
const GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === 'true' || false;

class AppTest {
  async start() {
    const viewportSize = { width: 1280, height: 720 };
    const contextOptions = {};
    const launchOptions = {
      slowMo: 500, // Video slow motion value in milliseconds
    };
    if (DARK_MODE) {
      contextOptions.forcedColors = 'active'; // Enable forced colors mode
      contextOptions.colorScheme = 'dark'; // Set color scheme to dark
    }
    if (VIDEO) {
      contextOptions.recordVideo = {
        dir: 'recordings', // Directory to save videos
        size: viewportSize,
      };
    }
    this.browser = await chromium.launch(launchOptions);
    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();
    this.page.on('console', (message) => {
      if (DEBUG) {
        console.debug(message);
      }
      if (message.type() === 'error') {
        throw Error(`Console error: ${message.text()}`);
      }
    });
    if (MOBILE) {
      this.mobileDevice();
    }
    await this.page.goto('http://localhost:1234');
    this.sidebar = this.page.locator('#sidebar');
  }

  async mobileDevice() {
    const height = 375;
    const width = 667;
    await this.page.setViewportSize({ width, height });
  }

  async showSettings() {
    // await this.page.click('#chats-menu-button')
    await this.screenshot();
    await this.page.click('#settings-button');
    await expect(this.page.locator('#settings-dialog')).toBeVisible();
  }

  async updateSettings(url, model) {
    await this.showSettings();
    // Fill in URL
    const urlInput = this.page.locator('#settings-dialog #input-url');
    await urlInput.fill(url);
    if (model && model !== '') {
      // Refresh model list
      await this.page
        .locator('#settings-dialog .refresh-models-button')
        .click();
      // Select model from list
      // await this.screenshot()
      // this.page.locator('#model-list').getByText('mistral:latest').click()

      // Wait for the element to be visible
      const listItem = this.page.locator(
        '#settings-dialog #model-list .list-item',
        {
          hasText: model,
        },
      );
      await listItem.waitFor({ state: 'visible' });

      // Click the element
      await listItem.click();
    }

    // Save settings
    await this.page.locator('#settings-dialog .button-close').click();
  }

  async sendMessage(message) {
    await this.page.fill('#message-input', message);
    // await this.page.click('#send-button');
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator('#abort-button')).toBeVisible();
    // await this.screenshot('1.png');
    // Wait for response
    // await this.page.waitForTimeout(3000);
    await this.page.waitForSelector('#message-input', { state: 'visible' });
    //await this.page.waitForSelector('#send-button', { timeout: 180000 });
    // await this.screenshot('2.png');
  }

  async newChat(title) {
    await this.page.click('#new-chat-button');
    const newTitle = /Untitled/;
    await expect(
      this.page.locator('.chat-list-item.selected .chat-title'),
    ).toHaveText(newTitle);
    await expect(this.page.locator('#chat-title')).toHaveText(newTitle);
    await this.editChatTitle(title);
  }

  async editChatTitle(title) {
    await this.page.click('#chat-title');
    await this.page.fill('#chat-title', title);
    await this.pressEnter();
    // await this.screenshot();
    await expect(
      this.page.locator('.chat-list-item.selected .chat-title'),
    ).toHaveText(title);
    await expect(this.page.locator('#chat-title')).toHaveText(title);
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  async hover(selector) {
    await this.page.hover(selector);
  }

  async screenshot(path) {
    if (process.env.GITHUB_ACTIONS === 'true') {
      // console.log('Running in GitHub Actions, skipping screenshot')
      return false;
    }
    if (path === undefined) {
      path = 'screenshot.png';
    }
    if (MOBILE) {
      path = `mobile-${path}`;
    }
    if (DARK_MODE) {
      path = `darkmode-${path}`;
    }
    path = `screenshots/${path}`;
    await this.page.screenshot({ path });
    console.log(`  ✔ Screenshot ${path}`);
    if (process.env.OPEN_SCREENSHOT === 'true') {
      openScreenshot(path);
    }
  }

  async selectChat(title) {
    const selector = `.chat-list-item:has-text("${title}")`;
    await this.page.hover(selector);
    const listItem = this.page.locator(selector);
    await listItem.click();
    await expect(listItem).toHaveClass(/.*selected.*/);
    await expect(this.page.locator('#chat-title')).toHaveText(title);
  }

  async deleteChat(title) {
    const selector = `.chat-list-item:has-text("${title}")`;
    await this.page.locator(selector).click();
    await this.page.click('#chat-menu-button');
    await this.page.click('#delete-chat-button');
    await expect(this.page.locator(selector)).not.toBeVisible();
    await expect(this.page.locator('#chat-title')).toHaveText(/Untitled/);
  }

  async close() {
    await this.browser.close();
    const video = await this.page.video();
    if (video) {
      const path = await video.path();
      console.log(`  ✔ Video ${path}`);
    }
  }
}

test.describe('Application tests', { only: true }, () => {
  let app;

  test.beforeEach(async () => {
    app = new AppTest();
    await app.start();
  });

  test.afterEach(async ({ page, test }) => {
    // Taking a screenshot if a test fails
    if (test.status === 'failed') {
      await page.screenshot({ path: `${test.title}-failure.png` });
    }
    await app.close();
  });

  /*
  test('Send message (server down)', async () => {
    await app.updateSettings('http://localhost:999999')
    await app.page.fill('#message-input', 'What is the meaning of life?')
    await app.page.click('#send-button')
    await app.page.waitForTimeout(500) // Small delay to allow UI to update
    await expect(app.page.locator('#abort-button')).not.toBeVisible()
    await expect(app.page.locator('#send-button')).toBeVisible()
  })
  */

  test('New chat', async () => {
    await app.newChat('Happy Hamster');
  });

  test('Delete chat', { only: true }, async () => {
    await app.newChat('Happy Hamster');
    await app.deleteChat('Happy Hamster');
  });

  test('Clear chats', async () => {
    await app.newChat('Happy Hamster');
    await app.deleteChat('Happy Hamster');
  });

  test('Select chat', async () => {
    await app.newChat('Happy Hamster');
    await app.newChat('Smart Hamster');
    await app.newChat('Super Hamster');
    await app.selectChat('Happy Hamster');
    await app.selectChat('Super Hamster');
    await app.selectChat('Smart Hamster');
  });

  test('Edit chat title', async () => {
    await app.newChat('Happy Hamster');
    await app.editChatTitle('Super Hamster');
  });

  test('Search chats', async () => {
    // Create chats for each country
    for (const name of [
      'History of Finland',
      'History of Sweden',
      'History of Canada',
      'History of Norway',
      'History of Denmark',
    ]) {
      await app.newChat(name);
    }

    // Initiate search
    await app.page.click('#chats-menu-button');
    await app.page.click('#search-button');

    // Search for 'USA' and check that 'Sweden' and 'Finland' are not visible
    await app.page.type('#search-input', 'USA');
    await app.page.waitForTimeout(500); // Small delay to allow UI to update
    // Check if 'Sweden' is NOT visible
    let swedenVisible = await app.page
      .locator('.chat-list-item:has-text("Sweden")')
      .isVisible();
    expect(swedenVisible).not.toBeTruthy();
    // Check if 'Finland' is NOT visible
    let finlandVisible = await app.page
      .locator('.chat-list-item:has-text("Finland")')
      .isVisible();
    expect(finlandVisible).not.toBeTruthy();

    // Search for 'Sweden', and verify its visibility
    await app.page.fill('#search-input', '');
    await app.page.type('#search-input', 'w');
    await app.page.waitForTimeout(500); // Small delay to allow UI to update
    await app.screenshot('search.png');
    // Check if 'Sweden' is visible
    swedenVisible = await app.page
      .locator('.chat-list-item:has-text("Sweden")')
      .isVisible();
    expect(swedenVisible).toBeTruthy();
    // Check if 'Finland' is NOT visible
    finlandVisible = await app.page
      .locator('.chat-list-item:has-text("Finland")')
      .isVisible();
    expect(finlandVisible).toBeFalsy();
  });

  test('Collapse sidebar', async () => {
    for (const name of [
      'History of Finland',
      'History of Sweden',
      'History of Norway',
      'History of Denmark',
      'History of Germany',
      'History of Ukraine',
      'History of France',
    ]) {
      await app.newChat(name);
    }
    // Collapse sidebar
    await app.page.click('#hamburger-menu');
    await expect(app.sidebar).toHaveClass(/.*collapsed.*/);
    await app.page.reload();
    // Remembers collaped state
    await expect(app.sidebar).toHaveClass(/.*collapsed.*/);
  });

  if (GITHUB_ACTIONS === false) {
    test('Send message', async () => {
      await app.updateSettings(url, model);
      // Create chat
      await app.editChatTitle('Tell me a joke');
      await app.sendMessage('Tell me a joke');
      await app.sendMessage('Make it more ridiculous');
      await app.sendMessage('Make it even more ridiculous');
      await app.screenshot('chat.png');
      // Collapse
      await app.page.click('#hamburger-menu');
      await app.page.waitForTimeout(500); // Wait for 500 milliseconds to allow animation to complete
      await app.screenshot('chat-collapsed.png');
    });

    test('Show settings', async () => {
      await app.updateSettings(url, model);
      await app.showSettings();
      await app.screenshot('settings.png');
    });

    test('Update settings', async () => {
      await app.updateSettings(url, model);
    });
  }

  /*
  TODO:
  test('Download chat', async () => {
    await app.updateSettings(url, model)
    await app.sendMessage('What is 10+10?')

    // Set up a listener for the download event
    const [ download ] = await Promise.all([
      // It's important to set up the listener before triggering the download
      app.page.waitForEvent('download'),
      // Trigger the download here
      app.page.click('.download-button')
    ])

    // Wait for the download to complete
    const path = await download.path()

    // Verify the download (e.g., check file name, size, etc.)
    console.log(`Downloaded file: ${path}`)

    // Optional: Check the download's filename
    console.log(`Downloaded filename: ${download.suggestedFilename()}`)
  })
  */
});

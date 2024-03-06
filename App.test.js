const { test } = require('node:test');
const { chromium } = require('playwright');
const { expect } = require('playwright/test');
const { exec } = require('child_process');

const url = 'http://localhost:11434';
const model = 'mistral:latest';

function openScreenshot(filePath) {
  const openCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${openCommand} ${filePath}`, (error) => {
    if (error) {
      console.error(`Error opening screenshot: ${error}`);
      return;
    }
    console.log('Screenshot opened successfully.');
  });
}

class AppTest {
  constructor() {
  }

  async start() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto('http://localhost:1234');
  }

  async showSettings() {
    await this.page.click('#settings-button');
    await expect(this.page.locator('#settings-dialog')).toBeVisible();
  }

  async newChat(title) {
    await this.page.click('#new-chat-button');
    const newTitle = 'New chat';
    await expect(this.page.locator('.chat-list-item.selected')).toHaveText(newTitle);
    await expect(this.page.locator('#chat-title')).toHaveText(newTitle);
    await this.editChatTitle(title);
  }

  async editChatTitle(title) {
    await this.page.click('#chat-title');
    await this.page.fill('#chat-title', title);
    await this.pressEnter();
    //await this.screenshot();
    await expect(this.page.locator('.chat-list-item.selected')).toHaveText(title);
    await expect(this.page.locator('#chat-title')).toHaveText(title);
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  async hover(selector) {
    await this.page.hover(selector);
  }

  async screenshot(path) {
    if (path === undefined) {
      path = 'screenshot.png';
    }
    await this.page.screenshot({ path });
    openScreenshot('screenshot.png');
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
    await this.hover(selector);
    await this.page.click('.delete-chat-button');
    await expect(this.page.locator(selector)).not.toBeVisible();
    await expect(this.page.locator('#chat-title')).toHaveText('New chat');
  }

  async close() {
    await this.browser.close();
  }
}

test.describe('Application tests', () => {
  let app;

  test.beforeEach(async () => {
    app = new AppTest();
    await app.start();
  });

  test.afterEach(async () => {
    await app.close();
  });

  test('New chat', async () => {
    await app.newChat('Happy Hamster');
  });

  test('Delete chat', async () => {
    await app.newChat('Happy Hamster');
    await app.deleteChat('Happy Hamster');
  });

  test('Clear chats', async () => {
    await app.newChat('Happy Hamster');
    await app.deleteChat('Happy Hamster');
  });

  test('Select chat', async () => {
    await app.newChat('Happy Hamster');
    await app.newChat('Hurt Hamster');
    await app.newChat('Super Hamster');
    await app.selectChat('Happy Hamster');
    await app.selectChat('Super Hamster');
    await app.selectChat('Hurt Hamster');
    await app.screenshot('screenshots/main.png');
  });

  test('Edit chat title', async () => {
    await app.newChat('Happy Hamster');
    await app.editChatTitle('Super Hamster');
  });

  test('Show settings', async () => {
    await app.showSettings();
  });

  test('Update settings', async () => {
    await app.showSettings();
    const urlInput = app.page.locator('#input-url');
    const modelInput = app.page.locator('#input-model');
    await expect(urlInput).toHaveValue(url);
    await expect(modelInput).toHaveValue('');
    // Fill in URL
    await urlInput.fill(url)
    // Select model
    const modelItem = app.page.locator(`.list-item:has-text("${model}")`);
    await modelItem.click();
    await expect(modelItem).toBeVisible();
    await expect(modelInput).toHaveValue(model);
    await expect(urlInput).toHaveValue(url);
    await app.screenshot('screenshots/settings.png');
  });
});

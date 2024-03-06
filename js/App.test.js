const { test } = require('node:test')
const { chromium } = require('playwright')
const { expect } = require('playwright/test')
const { exec } = require('child_process')

const url = 'http://localhost:11434'
const model = 'mistral:latest'

function openScreenshot (filePath) {
  const openCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open'
  exec(`${openCommand} ${filePath}`, (error) => {
    if (error) {
      console.error(`  ✔ Error opening screenshot: ${error}`)
      return
    }
    console.log(`  ✔ Screenshot ${filePath}`)
  })
}

class AppTest {
  async start () {
    this.browser = await chromium.launch()
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()
    this.page.on('console', message => {
      if (message.type() === 'error') {
        throw Error(`Console error detected: ${message.text()}`)
      }
    })
    await this.page.goto('http://localhost:1234')
    this.sidebar = this.page.locator('#sidebar')
  }

  async showSettings () {
    await this.page.click('#settings-button')
    await expect(this.page.locator('#settings-dialog')).toBeVisible()
  }

  async updateSettings (url, model) {
    await this.showSettings()
    const urlInput = this.page.locator('#input-url')
    const modelInput = this.page.locator('#input-model')
    await expect(urlInput).toHaveValue(url)
    await expect(modelInput).toHaveValue('')
    // Fill in URL
    await urlInput.fill(url)
    // Select model
    const modelItem = this.page.locator(`.list-item:has-text("${model}")`)
    await modelItem.click()
    await expect(modelItem).toBeVisible()
    await expect(modelInput).toHaveValue(model)
    await expect(urlInput).toHaveValue(url)
    await this.page.locator('#button-save-settings').click()
  }

  async newChat (title) {
    await this.page.click('#new-chat-button')
    const newTitle = /Untitled/
    await expect(this.page.locator('.chat-list-item.selected')).toHaveText(newTitle)
    await expect(this.page.locator('#chat-title')).toHaveText(newTitle)
    await this.editChatTitle(title)
  }

  async editChatTitle (title) {
    await this.page.click('#chat-title')
    await this.page.fill('#chat-title', title)
    await this.pressEnter()
    // await this.screenshot();
    await expect(this.page.locator('.chat-list-item.selected')).toHaveText(title)
    await expect(this.page.locator('#chat-title')).toHaveText(title)
  }

  async pressEnter () {
    await this.page.keyboard.press('Enter')
  }

  async hover (selector) {
    await this.page.hover(selector)
  }

  async screenshot (path) {
    if (path === undefined) {
      path = 'screenshot.png'
    }
    await this.page.screenshot({ path })
    openScreenshot(path)
  }

  async selectChat (title) {
    const selector = `.chat-list-item:has-text("${title}")`
    await this.page.hover(selector)
    const listItem = this.page.locator(selector)
    await listItem.click()
    await expect(listItem).toHaveClass(/.*selected.*/)
    await expect(this.page.locator('#chat-title')).toHaveText(title)
  }

  async deleteChat (title) {
    const selector = `.chat-list-item:has-text("${title}")`
    await this.page.locator(selector).click()
    await this.page.click('#delete-chat-button')
    await expect(this.page.locator(selector)).not.toBeVisible()
    await expect(this.page.locator('#chat-title')).toHaveText(/Untitled/)
  }

  async close () {
    await this.browser.close()
  }
}

test.describe('Application tests', () => {
  let app

  test.beforeEach(async ({ test }) => {
    app = new AppTest()
    await app.start()
  })

  test.afterEach(async ({ page, test }) => {
    // Taking a screenshot if a test fails
    if (test.status === 'failed') {
      await page.screenshot({ path: `${test.title}-failure.png` })
    }
    await app.close()
  })

  test('New chat', async () => {
    await app.newChat('Happy Hamster')
  })

  test('Delete chat', async () => {
    await app.newChat('Happy Hamster')
    await app.deleteChat('Happy Hamster')
  })

  test('Clear chats', async () => {
    await app.newChat('Happy Hamster')
    await app.deleteChat('Happy Hamster')
  })

  test('Select chat', async () => {
    await app.newChat('Happy Hamster')
    await app.newChat('Smart Hamster')
    await app.newChat('Super Hamster')
    await app.selectChat('Happy Hamster')
    await app.selectChat('Super Hamster')
    await app.selectChat('Smart Hamster')
    await app.screenshot('screenshots/main.png')
  })

  test('Edit chat title', async () => {
    await app.newChat('Happy Hamster')
    await app.editChatTitle('Super Hamster')
  })

  test('Show settings', async () => {
    await app.showSettings()
  })

  test('Update settings', async () => {
    await app.updateSettings(url, model)
    await app.screenshot('screenshots/settings.png')
  })

  test('Search chats', async () => {
    // Create chats for each country
    for (const name of ['Finland', 'Sweden', 'Norway', 'Denmark']) {
      await app.newChat(name)
    }

    // Initiate search
    await app.page.click('#search-button')

    // Search for 'USA' and check that 'Sweden' and 'Finland' are not visible
    await app.page.type('#search-input', 'USA')
    await app.page.waitForTimeout(500) // Small delay to allow UI to update
    // Check if 'Sweden' is NOT visible
    let swedenVisible = await app.page.locator('.chat-list-item:has-text("Sweden")').isVisible()
    expect(swedenVisible).not.toBeTruthy()
    // Check if 'Finland' is NOT visible
    let finlandVisible = await app.page.locator('.chat-list-item:has-text("Finland")').isVisible()
    expect(finlandVisible).not.toBeTruthy()

    // Search for 'Sweden', and verify its visibility
    await app.page.fill('#search-input', '')
    await app.page.type('#search-input', 'Sweden')
    await app.page.waitForTimeout(500) // Small delay to allow UI to update
    await app.screenshot('screenshots/search.png')
    // Check if 'Sweden' is visible
    swedenVisible = await app.page.locator('.chat-list-item:has-text("Sweden")').isVisible()
    expect(swedenVisible).toBeTruthy()
    // Check if 'Finland' is NOT visible
    finlandVisible = await app.page.locator('.chat-list-item:has-text("Finland")').isVisible()
    expect(finlandVisible).toBeFalsy()
  })

  test('Collapse sidebar', async () => {
    // Create chats for each country
    for (const name of ['Finland', 'Sweden', 'Norway', 'Denmark']) {
      await app.newChat(name)
    }
    // Collapse sidebar
    await app.page.click('#hamburger-menu')
    await expect(app.sidebar).toHaveClass(/.*collapsed.*/)
    await app.page.reload()
    // Remembers collaped state
    await expect(app.sidebar).toHaveClass(/.*collapsed.*/)
  })

  test('Send message', async () => {
    await app.updateSettings(url, model)
    await app.editChatTitle('What is 10+10?')
    await app.page.fill('#message-input', 'What is 10+10?')
    await app.page.click('#send-button')
    await expect(app.page.locator('#abort-button')).toBeVisible()
    await app.page.waitForSelector('#send-button', { timeout: 60000 })
    await app.screenshot('screenshots/chat.png')
  })

  test('Send message (server down)', async () => {
    await app.page.fill('#message-input', 'Server is down')
    await app.page.fill('#message-input', 'What is 10+10?')
    await app.page.click('#send-button')
    await app.page.waitForTimeout(500) // Small delay to allow UI to update
    await app.screenshot('screenshots/chat-error.png')
    await expect(app.page.locator('#abort-button')).not.toBeVisible()
    await expect(app.page.locator('#send-button')).toBeVisible()
  })
})

export class LocalStorage {
  // Set a value in localStorage
  set(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Get a value from localStorage, return defaultValue if key doesn't exist
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return defaultValue;
    }
  }

  // Remove a value from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
}

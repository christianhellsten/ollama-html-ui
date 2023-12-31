export class Database {
  constructor (dbName, objectStores) {
    this.dbName = dbName
    this.objectStores = objectStores
    this.dbConnection = null // Initialized in open
  }

  async open (version) {
    if (this.dbConnection) {
      throw new Error('Connection already open')
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, version)

      request.onerror = event => reject(event.target.error)
      request.onupgradeneeded = event => {
        const db = event.target.result
        // Create the object store if it cannot be found
        //
        // TODO: More complex migrations could be done elsewhere
        //
        this.objectStores.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
          }
        })
      }
      request.onsuccess = event => {
        this.dbConnection = event.target.result
        resolve(this.dbConnection)
      }
    })
  }

  async _transaction (storeName, mode) {
    return this.dbConnection.transaction([storeName], mode).objectStore(storeName)
  }

  async add (storeName, data) {
    const store = await this._transaction(storeName, 'readwrite')
    return this.handleRequest('add', store.add(data))
  }

  async get (storeName, id) {
    const store = await this._transaction(storeName, 'readonly')
    return this.handleRequest('get', store.get(id))
  }

  async put (storeName, data) {
    const store = await this._transaction(storeName, 'readwrite')
    return this.handleRequest('put', store.put(data))
  }

  async delete (storeName, id) {
    const store = await this._transaction(storeName, 'readwrite')
    return this.handleRequest('delete', store.delete(id))
  }

  async getAll (storeName) {
    const store = await this._transaction(storeName, 'readwrite')
    return this.handleRequest('getAll', store.getAll())
  }

  async clear (storeName) {
    const store = await this._transaction(storeName, 'readwrite')
    return this.handleRequest('deleteAll', store.clear())
  }

  handleRequest (type, request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)

      request.onerror = event => {
        const error = `Database ${type} operation failed: ${event.target.error.message}`
        throw new Error(JSON.stringify(error))
        // reject(new Error(message))
      }
    })
  }
}

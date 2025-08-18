[![npm version](https://img.shields.io/npm/v/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
[![npm downloads](https://img.shields.io/npm/dm/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
[![license](https://img.shields.io/github/license/adhammenesy/multi.dbx.svg)](https://github.com/adhammenesy/multi.dbx/blob/main/LICENSE)

```js
const { JsonData, JsonWatcher } = require("multi.dbx");
import { JsonData, JsonWatcher } from "multi.dbx"
```

---

````markdown
# JsonDB 📂

**JsonDB** is a lightweight JSON database wrapper that works like a mini NoSQL database.  
It comes with built-in **file watcher** support for listening to changes (`add`, `update`, `remove`, `clear`).

---

## 📦 Installation

```bash
npm install multi.db
yarn add multi.db
bun add multi.db
```
````

---

## 🚀 Basic Usage

```js
const { JsonData } = require("multi.dbx");

// create instance
const db = new JsonData();

// connect to a JSON file
db.connect("database/pc.json");

// set a value
db.set("user1", { name: "Black", points: 100 });

// get value
console.log(db.get("user1"));

// get all
console.log(db.fetchAll());

// delete key
db.delete("user1");

// clear all
db.clear();
```

---

## 👂 Using Watcher (Events)

```js
const { JsonData, JsonWatcher } = require("multi.dbx");

const db = new JsonData();
db.connect("database/pc.json");

const watcher = new JsonWatcher(db);

// listen to any change
watcher.on("change", (evt) => {
  console.log("Database changed:", evt);
});

// listen to add
watcher.on("add", (evt) => {
  console.log("Added keys:", evt.diff?.added);
});

// listen to update
watcher.on("update", (evt) => {
  console.log("Updated keys:", evt.diff?.updated);
});

// listen to remove
watcher.on("remove", (evt) => {
  console.log("Removed keys:", evt.diff?.removed);
});

// listen to clear
watcher.on("clear", () => {
  console.log("Database cleared");
});

// start watching
watcher.start();
```

---

## 🛠️ API

### **JsonData**

| Method            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `connect(path)`   | Connect to a JSON file (creates it if not found) |
| `details()`       | Returns database details (path, connected)       |
| `fetchAll()`      | Returns all data as an object                    |
| `get(key)`        | Returns a specific key value                     |
| `set(key, value)` | Add or update a key with value                   |
| `delete(key)`     | Remove a key                                     |
| `clear()`         | Clear all data                                   |
| `has(key)`        | Check if key exists                              |
| `reset()`         | Force reset (truncate JSON file)                 |

---

### **JsonWatcher (extends EventEmitter)**

| Event      | Payload                             |
| ---------- | ----------------------------------- |
| `"change"` | `{ type: "change", data, diff? }`   |
| `"add"`    | `{ type: "add", data, diff }`       |
| `"update"` | `{ type: "update", data, diff }`    |
| `"remove"` | `{ type: "remove", data, diff }`    |
| `"clear"`  | `{ type: "clear", data }`           |
| `"error"`  | `{ type: "error", message, error }` |

---

## ⚡ Practical Example

```js
const { JsonData, JsonWatcher } = require("multi.dbx");

const db = new JsonData();
db.connect("database/pc.json");

const watcher = new JsonWatcher(db);

watcher.on("change", (e) => {
  console.log("Changed:", e);
});

watcher.start();

db.set("user1", { name: "Ali", points: 50 });
db.set("user2", { name: "Mona", points: 75 });

db.set("user1", { name: "Ali", points: 100 }); // update
db.delete("user2"); // remove
db.clear(); // clear
```

Events output:

```
Added keys: [ "user1", "user2" ]
Updated keys: [ "user1" ]
Removed keys: [ "user2" ]
Database cleared
```

---

## 📄 Notes

- **Local only**: Events are local with `EventEmitter`, no internet required.
- If you edit the JSON file manually, the watcher will still detect the changes.
- Best for bots, small projects, logging systems, or temporary data storage.
- Not a replacement for full databases like MongoDB or PostgreSQL.

---

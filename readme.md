# 📂 JsonDB (multi.dbx)

> A **lightweight JSON database wrapper** that feels like a mini NoSQL.  
> Supports **nested paths**, **deep filtering**, and **real-time file watching** with events.  
Perfect for **bots, logging, configs, and small projects**. 🚀
![MULTI.DBX LOGO](multi.dbx.png)
[![npm version](https://img.shields.io/npm/v/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
[![npm downloads](https://img.shields.io/npm/dm/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
[![license](https://img.shields.io/github/license/adhammenesy/multi.dbx.svg)](https://github.com/adhammenesy/multi.dbx/blob/main/LICENSE)
[![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289DA?logo=discord&logoColor=white)](https://discord.gg/Epe2t7YWqq)

---

## 📦 Installation

```bash
npm install multi.dbx
# or
yarn add multi.dbx
# or
bun add multi.dbx
```

---

## 🚀 Quick Start

```ts
import { JsonData } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

db.set("user1", { name: "Black", points: 100 });

console.log(db.fetch("user1")); 
// { name: "Black", points: 100 }

db.delete("user1");
db.reset();
```

---

## 🔎 Advanced `get()` Filters

```ts
interface User {
  name: string;
  age: number;
}

const db = new JsonData();
db.connect("database/pc.json");

db.set("users", {
  list: [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
  ],
  Alice: { name: "Alice", age: 25 }
});

// Simple filter
console.log(db.get<User>({ name: "Alice" }));
// { name: "Alice", age: 25 }

// Deep path filter
console.log(db.get<User>({ "Alice.name": "Alice" }));
// { name: "Alice", age: 25 }
```

---

## 👂 Real-time Events (Watcher)

```ts
import { JsonData, JsonWatcher } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

const watcher = new JsonWatcher(db);

watcher.on("add",    e => console.log("➕ Added:", e.diff?.added));
watcher.on("update", e => console.log("♻️ Updated:", e.diff?.updated));
watcher.on("remove", e => console.log("🗑️ Removed:", e.diff?.removed));
watcher.on("clear",  () => console.log("⚠️ Database cleared"));

watcher.start();
```

---

## 🛠️ API Reference

### **JsonData**
| Method | Description |
| ------ | ----------- |
| `connect(path)` | Connect to JSON file |
| `details()` | Database info (path, connected, line count) |
| `fetch(key)` | Get value at key/path |
| `fetchAll()` | Get entire DB |
| `get(filter)` | Find object by key-value filter (deep search) |
| `set(key, value)` | Add or update value |
| `delete(key)` | Remove key |
| `reset()` | Clear DB |
| `has(key)` | Check key exists |
| `push(key, value)` | Push into array (auto-creates) |
| `math(key, op, val)` | Math ops on numbers |

### **JsonWatcher**
| Event | Payload |
| ----- | ------- |
| `"change"` | `{ type, data, diff? }` |
| `"add"` | `{ type, data, diff }` |
| `"update"` | `{ type, data, diff }` |
| `"remove"` | `{ type, data, diff }` |
| `"clear"` | `{ type, data }` |
| `"error"` | `{ type, message, error }` |

---

## 🧪 Testing with Jest

Example Jest test:

```ts
import { JsonData } from "multi.dbx";

test("should store and fetch user", () => {
  const db = new JsonData();
  db.connect("test.json");

  db.set("user1", { name: "Test", points: 50 });
  expect(db.fetch("user1")).toEqual({ name: "Test", points: 50 });

  db.reset();
});
```

✅ Runs with **`jest`** or **`vitest`**.

---

## 🌍 TypeScript vs JavaScript Usage

**TypeScript**
```ts
import { JsonData } from "multi.dbx";

interface User { name: string; age: number; }
const db = new JsonData();

db.connect("db.json");
const user = db.get<User>({ name: "Alice" });
```

**JavaScript**
```js
const { JsonData } = require("multi.dbx");

const db = new JsonData();
db.connect("db.json");
const user = db.get({ name: "Alice" });
```

---

## 📊 Performance Notes

- ✅ Handles **small to medium JSON files** (up to a few MB) instantly.  
- ✅ `get()` uses optimized recursive search for deep filters.  
- ⚡ Fast enough for **configs, caches, logs, bots**.  

---

## 📄 Notes

- Local-only (no remote sync).  
- Event-driven with `EventEmitter`.  
- Perfect for **temporary storage**.  
- Not a replacement for full DBs.  

---

## ⚡ Example Use Case

```ts
const db = new JsonData();
db.connect("db.json");

db.set("users", {
  Alice: { name: "Alice", age: 25 },
  Bob:   { name: "Bob", age: 30 }
});

console.log(db.get({ name: "Alice" }));
// { name: "Alice", age: 25 }
```

---

## 📝 Changelog

### v1.1.0 – Major Update
- ✅ Deep `get()` search (Mongo-like filters)
- ✅ Nested path support in all ops
- ✅ `push()` auto-creates arrays
- ✅ `math()` for numeric operations
- ✅ `reset()` wipes database
- ✅ Full event watcher
- ✅ Improved TypeScript typings

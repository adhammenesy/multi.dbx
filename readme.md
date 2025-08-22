  ---
    
  [![npm version](https://img.shields.io/npm/v/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
  [![npm downloads](https://img.shields.io/npm/dm/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
  [![license](https://img.shields.io/github/license/adhammenesy/multi.dbx.svg)](https://github.com/adhammenesy/multi.dbx/blob/main/LICENSE)
  [![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289DA?logo=discord&logoColor=white)](https://discord.gg/Epe2t7YWqq)

---

## 📝 Changelog

### v1.1.0
**Major Update – Deep `get()` & Improved API**

- ✅ Added **deep search** support in `get()` using key-value objects (like `findOne` in MongoDB)
  - Example: `db.get({ name: "Alice" })`
  - Example: `db.get("users.Alice.name")`
- ✅ `get()` now **returns only the matched object**, not the entire database.
- ✅ Improved type support with generics `<T>` for `get()` and `fetch()`.
- ✅ Full support for nested paths in all database operations (`fetch`, `set`, `delete`, `push`, `math`).
- ✅ `push()` now safely adds values to arrays and auto-creates arrays if missing.
- ✅ `math()` allows basic arithmetic operations (`+`, `-`, `*`, `/`, `%`) on numeric keys.
- ✅ `reset()` clears the database completely.
- ✅ Event watcher (`JsonWatcher`) supports all events: `add`, `update`, `remove`, `change`, `clear`, `error`.
- ✅ Better internal handling of nested objects and paths.
- ✅ Updated TypeScript typings and improved JSDoc documentation.

**Previous Version Highlights:**

- Basic CRUD operations (`get`, `set`, `delete`, `fetchAll`)  
- Local JSON database support  
- Event-driven file watcher

---




````markdown
# JsonDB 📂

**JsonDB** is a lightweight JSON database wrapper that works like a mini NoSQL database.  
It comes with built-in **file watcher** support for listening to changes (`add`, `update`, `remove`, `clear`), and advanced `get()` filtering using key-value objects, similar to `findOne` in MongoDB.

---

## 📦 Installation

```bash
npm install multi.dbx
yarn add multi.dbx
bun add multi.dbx
````

---

## 🚀 Basic Usage

```ts
import { JsonData } from "multi.dbx";

const db = new JsonData();

// Connect to a JSON file
db.connect("database/pc.json");

// Set a key
db.set("user1", { name: "Black", points: 100 });

// Fetch by key/path
console.log(db.fetch("user1")); 
// Output: { name: "Black", points: 100 }

// Fetch all data
console.log(db.fetchAll());

// Delete a key
db.delete("user1");

// Clear all data
db.reset();
```

---

## 🔎 Using `get()` with Object Filters

The new `get()` supports searching nested objects using key-value filters:

```ts
interface User {
  name: string;
  age: number;
}

const db = new JsonData();
db.connect("database/pc.json");

const data = {
  users: {
    users: [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
    ],
    Alice: { name: "Alice", age: 25 },
    Bob: { name: "Bob", age: 30 }
  }
};

db.set("users", data.users);

// Search by simple key-value
const alice = db.get<User>({ name: "Alice" });
console.log(alice);
// Output: { name: "Alice", age: 25 }

// Search by nested path
const aliceNested = db.get<User>({ "users.Alice.name": "Alice" });
console.log(aliceNested);
// Output: { name: "Alice", age: 25 }
```

`get()` returns **only the matched object**, not the parent object.

---

## 👂 Using Watcher (Events)

```ts
import { JsonData, JsonWatcher } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

const watcher = new JsonWatcher(db);

watcher.on("change", (evt) => console.log("Database changed:", evt));
watcher.on("add", (evt) => console.log("Added keys:", evt.diff?.added));
watcher.on("update", (evt) => console.log("Updated keys:", evt.diff?.updated));
watcher.on("remove", (evt) => console.log("Removed keys:", evt.diff?.removed));
watcher.on("clear", () => console.log("Database cleared"));

watcher.start();

db.set("user1", { name: "Ali", points: 50 });
db.set("user2", { name: "Mona", points: 75 });
db.set("user1", { name: "Ali", points: 100 }); // update
db.delete("user2"); // remove
db.reset(); // clear
```

**Events Output Example:**

```
Added keys: [ "user1", "user2" ]
Updated keys: [ "user1" ]
Removed keys: [ "user2" ]
Database cleared
```

---

## 🛠️ API

### **JsonData**

| Method               | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `connect(path)`      | Connect to a JSON file (throws if file not found)        |
| `details()`          | Returns database details (path, connected, line count)   |
| `fetch(key)`         | Returns value at a key/path                              |
| `fetchAll()`         | Returns all data as an object                            |
| `get(filter)`        | Search for an object by key-value filter (deep search)   |
| `set(key, value)`    | Add or update a key                                      |
| `delete(key)`        | Delete a key                                             |
| `reset()`            | Clear all data                                           |
| `has(key)`           | Check if key exists                                      |
| `push(key, value)`   | Push a value into an array (creates array if not exists) |
| `math(key, op, val)` | Perform math operations on numeric keys                  |

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

## 📄 Notes

* **Local only**: Events are emitted locally using `EventEmitter`.
* Supports **deep search** with `get()` for nested objects.
* Ideal for **small projects, bots, logging, or temporary storage**.
* Not a replacement for full databases like MongoDB or PostgreSQL.

---

## ⚡ Example Use Case

```ts
import { JsonData } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

// Add users
db.set("users", {
  users: [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
  ],
  Alice: { name: "Alice", age: 25 },
  Bob: { name: "Bob", age: 30 }
});

// Find a specific user
const alice = db.get({ name: "Alice" });
console.log(alice); 
// { name: "Alice", age: 25 }

const nestedAlice = db.get({ "users.Alice.name": "Alice" });
console.log(nestedAlice); 
// { name: "Alice", age: 25 }
```


# 📂 JsonDB (multi.dbx)

> A **lightweight JSON database wrapper** that feels like a mini NoSQL.
> Supports **nested paths**, **deep filtering**, and **real-time file watching** with events.
> Perfect for **bots, logging, configs, and small projects**. 🚀
> ![MULTI.DBX LOGO](multi.dbx.png)
> [![npm version](https://img.shields.io/npm/v/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
> [![npm downloads](https://img.shields.io/npm/dm/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx)
> [![license](https://img.shields.io/github/license/adhammenesy/multi.dbx.svg)](https://github.com/adhammenesy/multi.dbx/blob/main/LICENSE)
> [![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289DA?logo=discord\&logoColor=white)](https://discord.gg/Epe2t7YWqq)
> [![Website](https://img.shields.io/badge/Documention-7289DA?logo=website\&logoColor=green)](https://multidbx.vercel.app/docs)

---

## [Documentation](https://multidbx.vercel.app/docs)

## 📦 Installation

```bash
npm install multi.dbx
# or
yarn add multi.dbx
# or
bun add multi.dbx
```

---

## 📝 Changelog

### v1.1.7 – Update

* ✅ Adding Json Schema `new Schema({ })`
* ✅ Adding Async Function For Schema `await usersSchema["find", "get", "create", "getById", "update", "delete", "push"]`

### v1.2.0 – Plugins & Utilities

* ✅ Added **Plugins System**
* ✅ Added **Hashing Utility**
* ✅ Added **JSON to CSV Export Function**

---

## 🚀 Quick Start

```ts
import { JsonData } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

db.set("user1", { name: "Black", points: 100 });
```

---

# Json Schema

* new Schema

```ts
import { Schema } from "multi.dbx";

const schema = new Schema(
  {
    user: { type: "string", required: true },
    age: { type: "number", default: 18 },
  },
  "./database/users.json"
);
```

* create a user

```ts
await schema.create({ user: "black" }); 
// Returns: { "user": "black", "age": 18 }
```

* find a user

```ts
await schema.findById(schema._dbid);

await schema.find({ user: "dev" });
```

* delete a user

```ts
await schema.delete(schema._dbid);
await schema.delete(schema._dbid, { age: 18 });
```

---

## 👂 Real-time Events (Watcher)

```ts
import { JsonData, JsonWatcher } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

const watcher = new JsonWatcher(db);

watcher.on("add", (e) => console.log("➕ Added:", e.diff?.added));
watcher.on("update", (e) => console.log("♻️ Updated:", e.diff?.updated));
watcher.on("remove", (e) => console.log("🗑️ Removed:", e.diff?.removed));
watcher.on("clear", () => console.log("⚠️ Database cleared"));

watcher.start();
```

---

## 🔌 Plugins

* You can extend `multi.dbx` functionality using plugins.
* Example: Add custom validation, logging, or transformations.

```ts
import { JsonData } from "multi.dbx";

const db = new JsonData();
db.connect("database/pc.json");

// Example plugin usage
db.use(pluginFunction);
```

---

## 🔐 Hash Utility

* Easily hash strings for passwords, IDs, or tokens.

```ts
import { hash } from "multi.dbx";

const hashed = hash("mySecretPassword");
console.log(hashed);
```

---

## 📄 JSON to CSV

* Export your JSON data to CSV files.

```ts
import { ExcellFile } from "multi.dbx";

const db = new JsonData();
db.connect("database/users.json");

ExcellFile("users.csv", Object.values(db.getAll()));
```
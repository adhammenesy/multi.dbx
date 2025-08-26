# 📂 JsonDB (multi.dbx)

> A **lightweight JSON database wrapper** that feels like a mini NoSQL.  
> Supports **nested paths**, **deep filtering**, and **real-time file watching** with events.  
> Perfect for **bots, logging, configs, and small projects**. 🚀
> ![MULTI.DBX LOGO](multi.dbx.png) > [![npm version](https://img.shields.io/npm/v/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx) > [![npm downloads](https://img.shields.io/npm/dm/multi.dbx.svg)](https://www.npmjs.com/package/multi.dbx) > [![license](https://img.shields.io/github/license/adhammenesy/multi.dbx.svg)](https://github.com/adhammenesy/multi.dbx/blob/main/LICENSE) > [![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289DA?logo=discord&logoColor=white)](https://discord.gg/Epe2t7YWqq) > [![Website](https://img.shields.io/badge/Documention-7289DA?logo=website&logoColor=green)](https://multidbx.vercel.app/docs)

---

## [Documention](https://multidbx.vercel.app/docs)

## 📦 Installation

```bash
npm install multi.dbx
# or
yarn add multi.dbx
# or
bun add multi.dbx
```

## 📝 Changelog

### v1.1.7 – Update

- ✅ Adding Json Schema `new Schema({  })`
- ✅ Adding Async Function For Schema `await usersSchema[ "find", "get", "create", "getById", "update", "delete", "push" ]`

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

- new Schema

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

- create a user

```ts
import { Schema } from "multi.dbx";

const userSchema = new Schema(
  {
    user: { type: "string", required: true },
    age: { type: "number", default: 18 },
  },
  "./database/users.json"
);

await userSchema.create({ user: "black" }); // { "user": "black", "age": 18 <default value>  }
```

- find a user by<value, id>

```ts
import { Schema } from "multi.dbx";

const userSchema = new Schema(
  {
    user: { type: "string", required: true },
    age: { type: "number", default: 18 },
  },
  "./database/users.json"
);

await userSchema.findById(userSchema._dbid);


await userSchema.find({ user: "dev" }); // change the key [user] to value: <black => dev>
```


- delete

```ts
import { Schema } from "multi.dbx";

const userSchema = new Schema(
  {
    user: { type: "string", required: true },
    age: { type: "number", default: 18 },
  },
  "./database/users.json"
);

await userSchema.delete(userSchema._dbid); // reset all database


await userSchema.delete(userSchema._dbid, { age: 18 }); // delete the key[age] === value <188>
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

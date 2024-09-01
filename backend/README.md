# backend

## Project Setup

```sh
pnpm install
```

## Run

modify `db/index.js`

```js
const db=mysql.createPool({
    host:'127.0.0.1',
    user:'user_name',
    password:'password',
    database:'financial'
});
```

run sql scripts in `sql/*.sql`

```sh
pnpm start
```

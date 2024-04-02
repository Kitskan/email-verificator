
## API Reference

#### Add email list

```http POST
  localhost:3000/email/add
```

| Body parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `emailList` | `string of array` | **Required**. Your email list |

#### Websocket event

```ws
    localhost:3000/
```

| Event name | Description                       |
| :-------- |  :-------------------------------- |
| `email_event` | Event return resolve data (email address) |


| Technology             | Version                                                                |
| ----------------- | ------- |
| Node.js | 21.6.2 |
| Nest.js | 10 |
| MongoDB | 7 latest |
| MysqlDB | 8 latest |
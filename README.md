# PSql





# PRISMA
- `npm install prisma`
- `npx prisma init`

 **Create model**

```

model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  age      Int
}

model todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  done        Boolean
  userId      Int
}
```
To genrate SQL from this schema  perform Migration

## Migrate 
Generate the SL command and Run the SQL command on database

```npx prisma migrate dev ```

## Generation the prisma client

```
import { PrismaClient } from "@prisma/client"
const client = new PrismaClient();

Create new user 
client.user.create({
    data:{username:"nitesh",
        password: "qewwerw242",
        age: 22,
    }
})



client.user.update({
    where:{username:"nitesh"},
    data: {username: "asdfih",password:"84958703"}
})

client.user.findFirst({
    where:{username:"nitesh"}
})

client.user.findMany({
    where:{username:"nitesh"}
})

client.user.delete({
    where:{username:"nitesh"
    }
})
```



`❯ npx prisma generate `


## RelationShip

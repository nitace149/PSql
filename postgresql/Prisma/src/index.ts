import { PrismaClient } from "@prisma/client"
const client = new PrismaClient();

client.user.create({
    data:{username:"nitesh",
        password: "qewwerw242",
        age: 22,
    }
})

client.user.delete({
    where:{username:"nitesh"
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
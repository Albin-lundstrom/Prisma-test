const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const prismaEdit = async(ids, changes) => {
console.log(ids);
console.log(changes);
try {
  const newUser = await prisma.user.update({
    where: { id: ids },
    data: changes
})

  console.log('User Edited:', newUser);
  return newUser;
} catch (error) {
  console.error('Error creating user:', error);
  throw error;
}
}

module.exports = {prismaEdit};


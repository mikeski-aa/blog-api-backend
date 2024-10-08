const { PrismaClient } = require("@prisma/client");

async function NewUser() {
  const prisma = new PrismaClient();

  await prisma.User.create({
    data: {
      username: "Mike",
      hash: "134has9djklz9",
    },
  });
}

async function newPost() {
  const prisma = new PrismaClient();

  await prisma.post.create({
    data: {
      title: "My first post",
      text: "This is my first blog post!",
      date: new Date(),
      published: true,
      userId: 5,
    },
  });

  await prisma.post.create({
    data: {
      title: "My second post",
      text: "This is my second ever blog post!",
      date: new Date(),
      published: true,
      userId: 5,
    },
  });
}

async function newComment() {
  const prisma = new PrismaClient();

  await prisma.Comment.create({
    data: {
      text: "Nice post!",
      date: new Date(),
      postId: 3,
      userId: 5,
    },
  });

  await prisma.Comment.create({
    data: {
      text: "I like your post here!",
      date: new Date(),
      postId: 3,
      userId: 5,
    },
  });
}

// NewUser();
// newPost();
// newComment();

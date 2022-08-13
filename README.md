# Notdown

> Notdown is a social media like platform for who loves to take notes with using markdown about their life, programming stuff and much more!

> Live demo [here](notdown.vercel.app).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Project Status](#project-status)
- [Contact](#contact)
- [Support](#show-your-support)
<!-- * [License](#license) -->

## General Information

Notdown is a social media like platform for who loves to take notes with using markdown about their life, programming stuff and much more!

Users can take notes about anything they want and save them. Also, they can publish them if they want to. They can follow the authors they love and read/bookmark/star their notes. Also, they can look for the notes which bookmarked/starred by the authors they followed.

## Technologies Used

- **React (with typescript)**
  - Next.js for SSR
  - Zustand as a state manager
  - MUI as a UI library
  - Apollo Graphql for handling client site GraphqQL
  - Apollo Server Micro to create handler for graphql server on Next.js api routes
  - React Hook Form to handle form states/validation
- **Graphql**
  - Graphql Nexus - fully typesafe, code-first graphql schemas
  - Graphql Codegen to achieve fully typescript support and react-hooks
  - Nexus Prisma - prisma adapter for Graphql Nexus
- **Prisma - Database ORM**
- **Jsonwebtoken/Bcrypt** - handle user login/register (auth)
- **Cloudinary** - To upload images/videos/audios

## Setup

First, clone the repository:

`git clone https://github.com/berkaycimsir/notdown.git <directory_name>`

Second, go to the project folder and install dependencies:

`yarn install`

Then, set your environment variables:

> This project uses postgresql as database. You can read more about databases in prisma from [here](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)

```ts
// .env

DATABASE_URL =
DATABASE_MIGRATE_URL =
PRISMA_CLIENT_ENGINE_TYPE = dataproxy
NO_PEER_DEPENDENCY_CHECK = true
JWT_SECRET =
NEXT_PUBLIC_SERVER_PROD_URL =
NEXT_PUBLIC_SERVER_LOCAL_URL =
```

Finally, you can start the project by running:

`yarn generate && yarn dev`

## Project Status

Project is: _not being worked on_

## Contact

Created by [@berkaycimsir](https://www.github.com/berkaycimsir) - feel free to contact me!

👤 **Berkay Çimşir**

- Website: [personal blog](https://berkaycimsir-personal-blog.deno.dev/)
- Twitter: [@berkaycimsir](https://twitter.com/berkaycimsir)
- Github: [@berkaycimsir](https://github.com/berkaycimsir)

## Show your support

Give a ⭐️ if this project helped you!

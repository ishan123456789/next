This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Also create a file with `.env.local` file name and content as follow
```
​MONGODB_URI​=mongod://localhost:27017/contcontact
​SENDGRID_EMAIL​=test@example.com
​SENDGRID_API_KEY​=sg####
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Project status

_Login flow_

New user trying to login would create a new account and send verification OTP

Old user trying to login would need right email/password combination

_In Progress:_
Form to add contact for logged in user

_TODO_

1. Integrate API to fetch contacts for logged in user
2. List the Contact of the user
3. API, UI option to delete contacts
4. Logout features

_TODO general structure_

1. Add prettier for code structuring
2. Add jest, unit tests for the existing code
3. Add linting
4. Add logger like Pino

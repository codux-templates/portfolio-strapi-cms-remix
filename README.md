# portfolio-strapi-cms

## first run

the client is initially configured to run with the wix strapi remote (deployed) server.

after git clone  
in the root run:  
`yarn`

`yarn start:client:dev`

and you can see the website.

or open codux

## run with local strapi server

run `node create-env.cjs` or provide a port, for example `node create-env.cjs 8080` to run strapi on port 8080. It runs on 5000 by default.

this script will create:

- `.env` file in the strapi package
- `.env.development.local` file in the client package (`.env` is pointing to the wix remote server, when you deploy your strapi server change to the appropriate domain )
- generate a rendom project id in the `strapi/package.json`

`yarn start:server:dev` to start the local strapi server
go the the strapi admin and follow strapi instructions

in a different terminal run  
`yarn start:client:dev` to start the client web app

### codux boards with local strapi

if you want to point the App codux board to work with local strapi server you need to change the env variables in [`codux.config.json`](codux.config.json) to be the same as in your `.env.local` file.

### seed local DB with data

if you want you can copy our content to your local strapi DB.
all you need to do is run

```
yarn workspace @portfolio/strapi run strapi transfer --from https://determined-vitality-9514a6552e.strapiapp.com/admin --from-token b87a8467b27822083506c041a3cd24c32107cea7999bd6a00c6c672268e4b7dd53fc7920d3ffeed9d30d029103230f297890d3ff5948fe13a9fdc9711e12094388f4ae901a4634f2f175c191a6cf7be7c664570afc33345f51dc0765b3e0b517860ab5efdda8737a86fa119c080ae7ed16ef73f8b432474349b90672abe8e0d7 --only content,files
```

in the root of the project.  
there are a few things to pay attention to

- it will work only if you made no changes to the strapi schemas locally
- it will delete all your existing data
- it won't transfer admin users or tokens, so your user should still work.
- you will probably see a warning: `warn: (Schema Integrity) Review workflows feature does not exist on destination` It's ok. there are no review workflows

## scrips

- `yarn verify` - will run lint and typescript on the project
- `yarn build` - will build both strapi and client
- `yarn test` - will run the tests in the client project (there are no tests in strapi)
- `yarn start:client:dev` - will run the client in dev mode
- `start:server:dev` - will run strapi in dev mode

\*\* you can run `yarn start:client:dev --mode production` for the app to use the values in the `.env` file instead of the `.env.development.local` file.  
see [vite docs](https://vitejs.dev/guide/env-and-mode#env-files)

this is a monorepo using yarn workspaces.
you can run a script in the strapi package with `yarn workspace @portfolio/strapi ...`
or run a script in the client package with `yarn workspace @portfolio/client ...`

please read the [docs](https://classic.yarnpkg.com/en/docs/workspaces) on yarn workspaces

## stack

- [strapi](https://docs.strapi.io/): to store our content and serve it to the client app
- [vite](https://vitejs.dev/): a front end development environment to build our client app
- [yarn](https://classic.yarnpkg.com/en/docs/workspaces): to create a monorepo and manage dependencies
- [eslint](https://eslint.org/): to avoid mistakes by static analysis of the code
- [scss](https://sass-lang.com/guide/) [modules](https://github.com/css-modules/css-modules): to write scoped css with more ease
- [classnames](https://github.com/JedWatson/classnames): to easily assign multiple classes to elements
- [vitest](https://vitest.dev/guide/): to write and run unit tests
- [faker](https://fakerjs.dev/): to generate mock content. both for codux boards and unit tests
- [remix](https://remix.run): to create multiple routes (pages) and navigate between them with server side rendering
- [radix-ui navigation menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu): to create an accessible site navigation menu. this component comes unstyled
- [floatin-ui](https://floating-ui.com/docs/react): to position floating elements, like sub-menus, tooltips, popovers, etc.
- [framer motion](https://www.framer.com/motion/animation/): to create animations

## concepts

### why use fake data in boards

most of our codux boards are wrapped in a context provider that returns mock data (using faker) instead of fetching it from Strapi.  
we do it for a few reasons

- it allows us to test and design components without adding data in Strapi (or anywhere else).
- we don't need to have Strapi hosted somewhere or running locally to work on the client app.
- it allows us to create boards for different scenarios: very long text, very short text, different numbers of items, etc.
- we can use our boards in tests

### using Strapi types in the client app

there are two reasons to use types generated from Strapi schemas in the client app

1. to avoid writing the types by hand
2. to guard against changes in Strapi schemas (typescript will fail if Strapi schema changed)

there are a few ways to achieve this. Unfortunately, there isn't an official one yet.  
We chose the way described in this [Strapi blog post](https://strapi.io/blog/improve-your-frontend-experience-with-strapi-types-and-type-script) with some changes.  
what happens:

1. Strapi auto generates a `contentTypes.d.ts` file. which has all the types but not in a way that is usable by the client app
2. we export it in the strapi module see `strapi/package.json` => `"types": "types/generated/contentTypes.d.ts"`
3. we added a `strapi-types.ts` file which imports the strapi module types and uses them to create the correct types for our app (this is code copy-pasted from the blog post + some fixes)
4. we can use the types exported by the `strapi-types.d.ts` across our client

The main problem with this approach is that it is our responsibility to maintain the code in `strapi-types.ts`...  
Hopefully, one day Strapi will add this feature

## boards

most of our components need a context to run in.  
one context for the router and another for the data.  
for that reason, we have to wrap our components in the boards with context providers

#### router

In the boards we use [`createRemixStub`](https://remix.run/docs/en/main/utils/create-remix-stub).

#### data

we have two options here:

1. to use the same API provider as the `App` that fetches the data from strapi (local server or remote depending on the env variables in the [codux config](codux.config.json) )
2. to use a fake API provider that generates fake data without actually fetching anything.

### board Wrapper components

so we have 3 types of board wrapper components:

1. [`ComponentWrapper`](packages/client/_codux/board-wrappers/component-wrapper.tsx) used for simple components. Can be provided with fake route data and it fakes routes (links won't throw but won't work either)
2. [`PageWrapper`](packages/client/_codux/board-wrappers/page-wrapper.tsx) used for page components. Uses real data and fakes routes (all links will navigate to provided page)

you can, of course, change/add wrappers as it is convenient for you.

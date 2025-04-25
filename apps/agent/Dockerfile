FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .
COPY nest-cli.json .
COPY tsconfig.json .
COPY apps/agent/package.json apps/agent/package.json

RUN npm install -g pnpm

RUN pnpm install -r

COPY apps/agent apps/agent
COPY libs libs

RUN pnpm run build agent


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install -r --prod

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/agent/main" ]
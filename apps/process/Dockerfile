FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .
COPY nest-cli.json .
COPY tsconfig.json .
COPY apps/process/package.json apps/process/package.json

RUN npm install -g pnpm

RUN pnpm install -r

COPY apps/process apps/process
COPY libs libs

RUN pnpm run build process


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install -r --prod

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/process/main" ]
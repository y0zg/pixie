ARG NODE_IMG_VER=10.15.3-alpine

FROM node:$NODE_IMG_VER AS base
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
  apk add --no-cache git; fi
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

FROM base AS development
RUN mkdir node_modules && \
  mkdir /home/node/.yarn-cache
ENV YARN_CACHE_FOLDER=/home/node/.yarn-cache
CMD [ "yarn", "install-start" ]

FROM base AS builder
COPY --chown=node:node package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY --chown=node:node . .
RUN \
  yarn build && \
  yarn --production --frozen-lockfile && \
  rm package.json yarn.lock && \
  rm -rf public && \
  mv build public && \
  mv src/server . && \
  rm -rf src && \
  find . -name '*.test.js*' -type f -delete && \
  find . -name '__snapshots__' -type d -delete

FROM base AS build
COPY --from=builder /home/node/app ./
ENV NODE_ENV production
CMD [ "node", "server/app.js" ]

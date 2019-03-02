# 
# Build image
# 
FROM node:10-alpine as build

WORKDIR /srv/app/client
COPY client/package.json client/yarn.lock ./
RUN yarn --audit
COPY client ./
RUN yarn build

WORKDIR /srv/app/server
COPY server/package.json server/yarn.lock ./
RUN yarn --audit
COPY server/ ./
RUN rm -rf public && mv ../client/build ./public

WORKDIR /srv/app/dist
COPY server/package.json server/yarn.lock ./
RUN yarn --production
RUN yarn audit
RUN rm package.json yarn.lock
COPY server/app.js ./
COPY server/src src/
RUN find src/ -name '*.test.js' -type f -delete
RUN mkdir public && cp -R ../server/public/* ./public

WORKDIR /srv/app/server
ENTRYPOINT [ "yarn" ]
CMD [ "start" ]

# 
# Release image
# 
FROM node:10-alpine AS release
WORKDIR /srv/app
COPY --from=build /srv/app/dist ./
USER node
ENTRYPOINT [ "node" ]
CMD [ "app.js" ]

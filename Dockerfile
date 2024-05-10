FROM ubuntu:22.04 AS base

ARG NODE_VERSION=18.x

RUN apt-get update \
  && apt-get install -y curl ca-certificates --no-install-recommends \
  && curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - \
  && apt-get install -y nodejs --no-install-recommends \
  && npm install -g yarn \
  && which yarn

FROM base AS development

WORKDIR /opt/app/frontend
COPY --chown=node:node ./frontend .
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn run build

# WORKDIR /opt/app/frontend
# COPY --chown=node:node ./frontend/package.json ./frontend/package-lock.json* ./ 
# RUN yarn install --frozen-lockfile && yarn cache clean
# ENV PATH /opt/app/frontend/node_modules/.bin:$PATH

# WORKDIR /opt/app/frontend/app
# COPY --chown=node:node ./frontend .
# RUN yarn run build

WORKDIR /opt/app/backend
COPY --chown=node:node ./backend .
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn remove bcrypt && yarn add bcrypt

# WORKDIR /opt/app/backend
# COPY --chown=node:node ./backend/package.json ./backend/package-lock.json* ./
# RUN yarn install --frozen-lockfile && yarn cache clean
# RUN yarn remove bcrypt && yarn add bcrypt
# ENV PATH /opt/app/backend/node_modules/.bin:$PATH

# WORKDIR /opt/app/backend/app
# COPY --chown=node:node ./backend .

EXPOSE 3000
HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/3000/ || exit 1

WORKDIR /opt/app/backend
ENTRYPOINT [ "yarn", "run" ]



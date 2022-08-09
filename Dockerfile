FROM node:14.15-alpine AS deps
RUN apk add --no-cache
WORKDIR /app
COPY package.json ./
#COPY .npmrc ./

RUN yarn install --silent


FROM node:14.15-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


FROM node:14.15-alpine AS runner

WORKDIR /app

ENV TZ=Asia/Bangkok
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

ARG build_number`
ARG version

COPY --from=builder /app/ ./

USER nodejs

EXPOSE 3000
ENV PORT 3000

CMD yarn serve
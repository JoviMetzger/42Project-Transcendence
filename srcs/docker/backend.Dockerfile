# Use Node.js LTS version
FROM node:23-alpine

# Set working directory
WORKDIR /app

COPY fastify .

#install sqlite

RUN apk add --no-cache sqlite sqlite-dev

#install pnpm
RUN npm install -g pnpm

RUN pnpm install fastify@5.1

RUN pnpm install tsx

RUN pnpm install --force

# Expose backend port
EXPOSE 3000

# CMD is defined in dockerfile to differentiate between dev and non-dev env

#CMD ["tail", "-f", "/dev/null"]
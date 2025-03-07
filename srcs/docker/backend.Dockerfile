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

#ENTRYPOINT SCRIPT FOR SQLITE DATABASE
COPY SQLite entrypoint
RUN chmod +x entrypoint/scripts/entrypoint.sh

ENTRYPOINT ["entrypoint/scripts/entrypoint.sh"]

# CMD is defined in dockerfile to differentiate between dev and non-dev env

#CMD ["tail", "-f", "/dev/null"]
# Use Node.js LTS version
FROM node:23-alpine

# Set working directory
WORKDIR /app

COPY . .

#install pnpm
RUN npm install -g pnpm

RUN pnpm install fastify

RUN pnpm install --force

# Copy the backend source code, comments back in when running the non-dev docker-compose
#COPY . .

# Expose backend port
EXPOSE 3000

# CMD is defined in dockerfile to differentiate between dev and non-dev env

#CMD ["tail", "-f", "/dev/null"]
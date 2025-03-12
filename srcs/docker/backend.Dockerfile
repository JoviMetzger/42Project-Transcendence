# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
# Set working directory
WORKDIR /app

RUN mkdir data

# Install necessary build dependencies
RUN apk add --no-cache sqlite sqlite-dev python3 make g++ gcc musl-dev

# Install pnpm
RUN npm install -g pnpm

# Copy package files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --force

# Copy rest of the application
COPY . .

# Rebuild better-sqlite3 for alpine
RUN pnpm rebuild better-sqlite3

RUN pnpm run db:generate

RUN pnpm run db:migrate

# Expose backend port
EXPOSE 3000

# CMD is defined in dockerfile to differentiate between dev and non-dev env

#CMD ["tail", "-f", "/dev/null"]
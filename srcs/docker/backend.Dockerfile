# Use Node.js LTS version
FROM node:23-alpine

# Set working directory
WORKDIR /app

#install pnpm
RUN npm install -g pnpm

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the backend source code
COPY . .

# Expose backend port
EXPOSE 3000

# CMD is defined in dockerfile to differentiate between dev and non-dev env

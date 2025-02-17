FROM node:23-alpine

WORKDIR /app

#install pnpm
RUN npm install -g pnpm

# Copy package.json and install dependencies
COPY . .

RUN pnpm install --force

RUN pnpm install tailwindcss @tailwindcss/vite

RUN pnpm install postcss --save-dev

# Build the frontend
#RUN pnpm run build

# CMD is defined in dockerfile to differentiate between dev and non-dev env

# ⚗️ Cathedral of Circuits - Dockerfile
# Magnum Opus Version 1.0
# Author: Rebecca Respawn

FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.23.0

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy all packages
COPY packages ./packages
COPY apps ./apps

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm build

# Production image
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.23.0

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start
CMD ["node", "dist/index.js"]

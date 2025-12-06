# ⚗️ Cathedral Worker - Dockerfile
# Replaces Cloudflare Workers

FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.23.0

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 8080

# Start
CMD ["node", "dist/index.js"]

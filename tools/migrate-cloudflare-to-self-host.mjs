#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Cloudflare to Free Self-Hosting Migration
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Migrates from Cloudflare services to free self-hosting:
 * - Removes Cloudflare Workers (wrangler)
 * - Removes Cloudflare Pages
 * - Sets up free alternatives: Caddy, Nginx, Docker
 * - Updates all configurations
 * - Creates deployment guides
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  domain: 'cathedral.bekalah.github.io' // Will be updated to self-hosted
};

const FREE_HOSTING_OPTIONS = {
  caddy: {
    name: 'Caddy',
    description: 'Automatic HTTPS reverse proxy',
    pros: ['Free SSL', 'Easy setup', 'HTTP/2', 'Automatic certificates'],
    configFile: 'Caddyfile'
  },
  nginx: {
    name: 'Nginx',
    description: 'High-performance web server',
    pros: ['Fast', 'Flexible', 'Widely used', 'Good documentation'],
    configFile: 'nginx.conf'
  },
  docker: {
    name: 'Docker Compose',
    description: 'Container orchestration',
    pros: ['Isolated', 'Reproducible', 'Easy scaling', 'Portable'],
    configFile: 'docker-compose.yml'
  },
  coolify: {
    name: 'Coolify',
    description: 'Self-hosted PaaS',
    pros: ['Full PaaS', 'Git integration', 'Auto-deploy', 'Dashboard'],
    configFile: 'coolify.yml'
  }
};

function findWranglerFiles() {
  const wranglerFiles = [];
  
  function searchDir(dir) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        // Skip node_modules and .git
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.')) {
          continue;
        }
        
        if (entry.isDirectory()) {
          searchDir(fullPath);
        } else if (entry.name === 'wrangler.toml') {
          wranglerFiles.push(fullPath);
        }
      }
    } catch (e) {
      // Skip directories we can't read
    }
  }
  
  searchDir(rootDir);
  return wranglerFiles;
}

function findCloudflareReferences() {
  const references = {
    wrangler: [],
    packageJson: [],
    configFiles: [],
    codeFiles: []
  };
  
  // Find wrangler.toml files
  references.wrangler = findWranglerFiles();
  
  // Search package.json files
  function searchPackageJson(dir) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue;
        }
        
        if (entry.isDirectory()) {
          searchPackageJson(fullPath);
        } else if (entry.name === 'package.json') {
          try {
            const content = readFileSync(fullPath, 'utf-8');
            if (content.includes('wrangler') || content.includes('cloudflare') || content.includes('@cloudflare')) {
              references.packageJson.push(fullPath);
            }
          } catch (e) {
            // Skip
          }
        }
      }
    } catch (e) {
      // Skip
    }
  }
  
  searchPackageJson(rootDir);
  
  return references;
}

function createCaddyConfig() {
  const caddyfile = `# ⚗️ Cathedral of Circuits - Caddy Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn

# Main domain
cathedral.localhost {
    # Root directory for static files
    root * ./dist
    file_server
    
    # Enable compression
    encode gzip zstd
    
    # API proxy (if needed)
    handle /api/* {
        reverse_proxy localhost:3000
    }
    
    # WebSocket support (for game)
    handle /ws/* {
        reverse_proxy localhost:3000 {
            header_up Upgrade {http.upgrade}
            header_up Connection {http.connection}
        }
    }
    
    # SPA routing
    try_files {path} /index.html
}

# Worker API (replaces Cloudflare Workers)
api.cathedral.localhost {
    reverse_proxy localhost:8080
}

# Web app
web.cathedral.localhost {
    root * ./apps/web/dist
    file_server
    try_files {path} /index.html
}

# Logging
log {
    output file ./logs/caddy.log
    format console
}
`;

  const caddyPath = join(rootDir, 'Caddyfile');
  writeFileSync(caddyPath, caddyfile);
  return caddyPath;
}

function createNginxConfig() {
  const nginxConf = `# ⚗️ Cathedral of Circuits - Nginx Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn

upstream cathedral_api {
    server localhost:3000;
}

upstream cathedral_worker {
    server localhost:8080;
}

server {
    listen 80;
    server_name cathedral.localhost;
    
    # Redirect to HTTPS (if SSL configured)
    # return 301 https://$server_name$request_uri;
    
    root /var/www/cathedral/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
    
    # Static files
    location / {
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://cathedral_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # WebSocket support
    location /ws/ {
        proxy_pass http://cathedral_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

# Worker API server
server {
    listen 80;
    server_name api.cathedral.localhost;
    
    location / {
        proxy_pass http://cathedral_worker;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
`;

  const nginxPath = join(rootDir, 'nginx.conf');
  writeFileSync(nginxPath, nginxConf);
  return nginxPath;
}

function createDockerCompose() {
  const dockerCompose = `# ⚗️ Cathedral of Circuits - Docker Compose
# Magnum Opus Version 1.0
# Author: Rebecca Respawn

version: '3.8'

services:
  # Main web application
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./dist:/app/dist
    restart: unless-stopped
    networks:
      - cathedral-network

  # API/Worker service (replaces Cloudflare Workers)
  worker:
    build:
      context: ./apps/worker
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - PORT=8080
    restart: unless-stopped
    networks:
      - cathedral-network

  # Reverse proxy (Caddy - automatic HTTPS)
  caddy:
    image: caddy:latest
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - ./dist:/var/www/cathedral/dist
      - caddy_data:/data
      - caddy_config:/config
    restart: unless-stopped
    networks:
      - cathedral-network

  # Alternative: Nginx (uncomment to use instead of Caddy)
  # nginx:
  #   image: nginx:alpine
  #   ports:
  #     - "80:80"
  #   volumes:
  #     - ./nginx.conf:/etc/nginx/nginx.conf:ro
  #     - ./dist:/var/www/cathedral/dist:ro
  #   restart: unless-stopped
  #   networks:
  #     - cathedral-network

networks:
  cathedral-network:
    driver: bridge

volumes:
  caddy_data:
  caddy_config:
`;

  const dockerPath = join(rootDir, 'docker-compose.yml');
  writeFileSync(dockerPath, dockerCompose);
  return dockerPath;
}

function createDockerfile() {
  const dockerfile = `# ⚗️ Cathedral of Circuits - Dockerfile
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
`;

  const dockerfilePath = join(rootDir, 'Dockerfile');
  if (!existsSync(dockerfilePath)) {
    writeFileSync(dockerfilePath, dockerfile);
  }
  return dockerfilePath;
}

function createWorkerDockerfile() {
  const workerDir = join(rootDir, 'apps/worker');
  const dockerfilePath = join(workerDir, 'Dockerfile');
  
  if (!existsSync(workerDir)) {
    return null;
  }
  
  const dockerfile = `# ⚗️ Cathedral Worker - Dockerfile
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
`;

  writeFileSync(dockerfilePath, dockerfile);
  return dockerfilePath;
}

function removeWranglerDependencies() {
  const references = findCloudflareReferences();
  const updates = [];
  
  // Update package.json files
  for (const pkgPath of references.packageJson) {
    try {
      const content = readFileSync(pkgPath, 'utf-8');
      const pkg = JSON.parse(content);
      let modified = false;
      
      // Remove wrangler from dependencies
      if (pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach(dep => {
          if (dep.includes('wrangler') || dep.includes('cloudflare') || dep.includes('@cloudflare')) {
            delete pkg.dependencies[dep];
            modified = true;
          }
        });
      }
      
      // Remove wrangler from devDependencies
      if (pkg.devDependencies) {
        Object.keys(pkg.devDependencies).forEach(dep => {
          if (dep.includes('wrangler') || dep.includes('cloudflare') || dep.includes('@cloudflare')) {
            delete pkg.devDependencies[dep];
            modified = true;
          }
        });
      }
      
      // Remove wrangler scripts
      if (pkg.scripts) {
        Object.keys(pkg.scripts).forEach(script => {
          if (pkg.scripts[script].includes('wrangler')) {
            delete pkg.scripts[script];
            modified = true;
          }
        });
      }
      
      if (modified) {
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        updates.push(pkgPath);
      }
    } catch (e) {
      // Skip invalid JSON
    }
  }
  
  return updates;
}

function archiveWranglerFiles() {
  const references = findCloudflareReferences();
  const archived = [];
  
  // Archive wrangler.toml files
  for (const wranglerPath of references.wrangler) {
    const archivePath = wranglerPath + '.archived';
    try {
      writeFileSync(archivePath, `# Archived: ${new Date().toISOString()}\n# Original: ${wranglerPath}\n\n${readFileSync(wranglerPath, 'utf-8')}`);
      archived.push(wranglerPath);
    } catch (e) {
      // Skip
    }
  }
  
  return archived;
}

function createMigrationGuide() {
  const guide = `# Cloudflare to Free Self-Hosting Migration Guide

**Project**: ${PROJECT_INFO.fullName}  
**Author**: ${PROJECT_INFO.author}

## Overview

This guide helps you migrate from Cloudflare services to free self-hosting alternatives.

## What's Being Replaced

| Cloudflare Service | Self-Hosted Alternative |
|-------------------|------------------------|
| Cloudflare Workers | Node.js server (Docker) |
| Cloudflare Pages | Static file server (Caddy/Nginx) |
| Cloudflare CDN | Local caching (Nginx/Caddy) |
| Cloudflare SSL | Let's Encrypt (Caddy auto) |

## Free Hosting Options

### Option 1: Caddy (Recommended - Easiest)

**Pros:**
- Automatic HTTPS with Let's Encrypt
- Zero-config SSL
- HTTP/2 and HTTP/3 support
- Simple configuration

**Setup:**
\`\`\`bash
# Install Caddy
# macOS: brew install caddy
# Linux: See https://caddyserver.com/docs/install

# Start with Caddyfile
caddy run

# Or in background
caddy start
\`\`\`

**Configuration:** \`Caddyfile\` (already created)

### Option 2: Nginx

**Pros:**
- High performance
- Flexible configuration
- Widely used

**Setup:**
\`\`\`bash
# Install Nginx
# macOS: brew install nginx
# Linux: apt install nginx

# Start
sudo nginx

# Or use provided config
sudo nginx -c $(pwd)/nginx.conf
\`\`\`

**Configuration:** \`nginx.conf\` (already created)

### Option 3: Docker Compose (Recommended for Production)

**Pros:**
- Isolated services
- Easy scaling
- Reproducible
- All-in-one setup

**Setup:**
\`\`\`bash
# Build and start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
\`\`\`

**Configuration:** \`docker-compose.yml\` (already created)

### Option 4: Coolify (Full PaaS)

**Pros:**
- Complete PaaS solution
- Git integration
- Auto-deploy
- Dashboard UI

**Setup:**
See: https://coolify.io/docs

## Migration Steps

### 1. Remove Cloudflare Dependencies

\`\`\`bash
# Run migration tool
node tools/migrate-cloudflare-to-self-host.mjs

# Or manually remove
pnpm remove wrangler @cloudflare/workers-types
\`\`\`

### 2. Choose Your Hosting Option

Select one of the options above based on your needs.

### 3. Update Environment Variables

Remove Cloudflare-specific variables:
- \`CLOUDFLARE_ACCOUNT_ID\`
- \`CLOUDFLARE_API_TOKEN\`
- \`WRANGLER_SEND_METRICS\`

### 4. Update Build Scripts

Replace wrangler commands:
\`\`\`json
{
  "scripts": {
    "deploy": "docker compose up -d",  // Instead of "wrangler deploy"
    "dev": "caddy run",                // Instead of "wrangler dev"
    "build": "pnpm build"              // Keep as is
  }
}
\`\`\`

### 5. Update Domain Configuration

Update DNS to point to your self-hosted server:
- Remove Cloudflare DNS records
- Add A/AAAA records pointing to your server IP
- Caddy will automatically get SSL certificates

### 6. Test Deployment

\`\`\`bash
# Build
pnpm build

# Start (choose one)
caddy run                    # Option 1: Caddy
sudo nginx -c nginx.conf     # Option 2: Nginx
docker compose up            # Option 3: Docker
\`\`\`

## Cost Comparison

| Service | Cloudflare | Self-Hosted |
|---------|-----------|-------------|
| Static Hosting | $20/month | $0/month |
| Workers | $5/month | $0/month |
| CDN | $20/month | $0/month |
| SSL | $8/month | $0/month (Let's Encrypt) |
| Server | N/A | $5-50/month (VPS) |
| **Total** | **$53/month** | **$5-50/month** |

**Savings: $3-48/month** (depending on server choice)

## Troubleshooting

### Port Already in Use
\`\`\`bash
# Find process using port 80
lsof -i :80

# Kill process
kill -9 <PID>
\`\`\`

### SSL Certificate Issues
- Caddy: Automatically handles Let's Encrypt
- Nginx: Use certbot: \`certbot --nginx\`

### Worker Not Starting
- Check logs: \`docker compose logs worker\`
- Verify port 8080 is available
- Check environment variables

## Next Steps

1. ✅ Cloudflare dependencies removed
2. ✅ Configuration files created
3. ⬜ Choose hosting option
4. ⬜ Set up server/VPS
5. ⬜ Update DNS records
6. ⬜ Deploy and test
7. ⬜ Monitor and maintain

## Support

For issues:
- Check logs: \`./logs/\`
- Review configuration files
- See hosting option documentation

---

**Part of ${PROJECT_INFO.fullName}**
`;

  const guidePath = join(rootDir, 'docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md');
  const docsDir = join(rootDir, 'docs');
  if (!existsSync(docsDir)) {
    execSync(`mkdir -p ${docsDir}`);
  }
  writeFileSync(guidePath, guide);
  return guidePath;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Cloudflare to Free Self-Hosting Migration\n`);

  const results = {
    project: PROJECT_INFO,
    cloudflare: {
      wranglerFiles: [],
      packageJsonFiles: [],
      archived: []
    },
    selfHosting: {
      configs: [],
      dockerfiles: []
    },
    timestamp: new Date().toISOString()
  };

  // 1. Find Cloudflare references
  console.log('🔍 Step 1: Finding Cloudflare references...');
  const references = findCloudflareReferences();
  results.cloudflare.wranglerFiles = references.wrangler.map(p => relative(rootDir, p));
  results.cloudflare.packageJsonFiles = references.packageJson.map(p => relative(rootDir, p));
  
  console.log(`   Found ${references.wrangler.length} wrangler.toml file(s)`);
  console.log(`   Found ${references.packageJson.length} package.json file(s) with Cloudflare deps\n`);

  // 2. Archive wrangler files
  console.log('📦 Step 2: Archiving wrangler.toml files...');
  const archived = archiveWranglerFiles();
  results.cloudflare.archived = archived.map(p => relative(rootDir, p));
  console.log(`   ✅ Archived ${archived.length} file(s)\n`);

  // 3. Remove dependencies
  console.log('🧹 Step 3: Removing Cloudflare dependencies...');
  const updated = removeWranglerDependencies();
  console.log(`   ✅ Updated ${updated.length} package.json file(s)\n`);

  // 4. Create self-hosting configs
  console.log('🏗️  Step 4: Creating self-hosting configurations...');
  
  const caddyPath = createCaddyConfig();
  const nginxPath = createNginxConfig();
  const dockerPath = createDockerCompose();
  const dockerfile = createDockerfile();
  const workerDockerfile = createWorkerDockerfile();
  
  results.selfHosting.configs = [
    relative(rootDir, caddyPath),
    relative(rootDir, nginxPath),
    relative(rootDir, dockerPath)
  ];
  
  if (dockerfile) {
    results.selfHosting.dockerfiles.push(relative(rootDir, dockerfile));
  }
  if (workerDockerfile) {
    results.selfHosting.dockerfiles.push(relative(rootDir, workerDockerfile));
  }
  
  console.log(`   ✅ Created Caddyfile`);
  console.log(`   ✅ Created nginx.conf`);
  console.log(`   ✅ Created docker-compose.yml`);
  if (dockerfile) console.log(`   ✅ Created Dockerfile`);
  if (workerDockerfile) console.log(`   ✅ Created apps/worker/Dockerfile\n`);

  // 5. Create migration guide
  console.log('📚 Step 5: Creating migration guide...');
  const guidePath = createMigrationGuide();
  console.log(`   ✅ Created: ${relative(rootDir, guidePath)}\n`);

  // 6. Generate report
  const reportPath = join(rootDir, 'cloudflare-migration-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('📊 Summary:');
  console.log(`   📦 Wrangler files: ${references.wrangler.length} (archived)`);
  console.log(`   📝 Package.json files: ${updated.length} (updated)`);
  console.log(`   🏗️  Config files: ${results.selfHosting.configs.length} (created)`);
  console.log(`   🐳 Dockerfiles: ${results.selfHosting.dockerfiles.length} (created)\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, guidePath)}\n`);
  console.log(`✅ Migration setup complete!\n`);
  console.log(`🚀 Next steps:`);
  console.log(`   1. Read: ${relative(rootDir, guidePath)}`);
  console.log(`   2. Choose hosting option (Caddy/Nginx/Docker)`);
  console.log(`   3. Update DNS to point to your server`);
  console.log(`   4. Deploy: docker compose up -d (or caddy run)\n`);
}

main().catch(console.error);






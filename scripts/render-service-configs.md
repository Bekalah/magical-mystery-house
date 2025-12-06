# Render Service Configuration Templates

## Cataract Book Scanner - Static Site Configuration

```yaml
Service Type: Web Service
Name: cataract-book-scanner
Runtime: Node.js 20
Build Command: cd packages/cataract-book-scanner && npm install && npm run build
Start Command: npx serve packages/cataract-book-scanner/dist -p $PORT
Health Check Path: /
Root Directory: /
```

**Environment Variables:**
```bash
NODE_ENV=production
PORT=10000
```

---

## Hall of Ateliers - Interactive Web App Configuration

```yaml
Service Type: Web Service
Name: hall-of-ateliers
Runtime: Node.js 20
Build Command: cd packages/hall-of-ateliers && npm install && npm run build
Start Command: npx serve packages/hall-of-ateliers/dist -p $PORT
Health Check Path: /
Root Directory: /
```

**Environment Variables:**
```bash
NODE_ENV=production
PORT=10001
```

---

## Cathedral Logo System - Interactive Web App Configuration

```yaml
Service Type: Web Service
Name: cathedral-logo-system
Runtime: Node.js 20
Build Command: cd packages/cathedral-logo-system && npm install && npm run build
Start Command: npx serve packages/cathedral-logo-system/dist -p $PORT
Health Check Path: /
Root Directory: /
```

**Environment Variables:**
```bash
NODE_ENV=production
PORT=10002
```

---

## GitLab CI/CD Environment Variables Template

Add these variables in GitLab → Settings → CI/CD → Variables:

```bash
# Required for Render deployment
RENDER_API_TOKEN=your_render_api_token_here

# Service IDs (get these after creating services in Render)
RENDER_SERVICE_ID_CATARACT=your_cataract_service_id
RENDER_SERVICE_ID_ATELIERS=your_ateliers_service_id  
RENDER_SERVICE_ID_LOGO=your_logo_service_id

# Optional: Notification webhooks
SLACK_WEBHOOK_URL=your_slack_webhook_for_notifications
```

---

## Quick Setup Instructions

1. **Create Render Services:**
   - Go to render.com dashboard
   - Click "New" → "Web Service"
   - Connect your GitLab repository
   - Use the configurations above for each service

2. **Get Service IDs:**
   - After creating services, copy the service IDs from the dashboard
   - Add them to GitLab CI/CD variables

3. **Generate API Token:**
   - Go to Render → Account Settings → API Tokens
   - Create a new API token
   - Add to GitLab CI/CD variables

4. **Test Deployment:**
   ```bash
   # Test locally first
   ./scripts/deploy-render.sh staging
   
   # Deploy to production
   ./scripts/deploy-render.sh production
   ```

---

## Expected Service URLs

After setup, your services will be available at:

- **Cataract Book Scanner:** `https://cataract-book-scanner.onrender.com`
- **Hall of Ateliers:** `https://hall-of-ateliers.onrender.com`
- **Cathedral Logo System:** `https://cathedral-logo-system.onrender.com`

Each service includes:
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Automatic deployments from GitLab
- ✅ Health monitoring
- ✅ Zero-downtime deployments
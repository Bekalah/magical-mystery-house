/**
 * Tesseract Bridge Hub Server
 * 
 * REST API server for Tesseract Bridge Hub
 * Provides endpoints for all systems
 * 
 * @license CC0-1.0 - Public Domain
 */

// @ts-ignore - Node.js built-in modules
import { createServer, IncomingMessage, ServerResponse } from 'http';
// @ts-ignore - Node.js built-in modules
import { URL } from 'url';
import TesseractHub from './TesseractHub';
import { DesignRequest } from '../../liber-arcanae-core/src/LiberArcanaeDesignMode';

// @ts-ignore - Node.js global
const PORT = (typeof process !== 'undefined' && process.env?.PORT) ? parseInt(process.env.PORT, 10) : 3000;
const hub = new TesseractHub();

interface Route {
  method: string;
  path: string | RegExp;
  handler: (req: IncomingMessage, res: ServerResponse, params: Record<string, string>) => void;
}

const routes: Route[] = [
  {
    method: 'GET',
    path: '/api/health',
    handler: (_req, res) => {
      const health = hub.getHealth();
      sendJSON(res, 200, health);
    }
  },
  {
    method: 'POST',
    path: '/api/egregores/consult',
    handler: async (req, res) => {
      try {
        const body = await readBody(req);
        const request: DesignRequest = JSON.parse(body);
        const response = hub.consultEgregores(request);
        if (response) {
          sendJSON(res, 200, response);
        } else {
          sendJSON(res, 404, { error: 'No egregore response available' });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        sendJSON(res, 500, { error: errorMessage });
      }
    }
  },
  {
    method: 'GET',
    path: /^\/api\/codexes\/(\d+)$/,
    handler: (_req, res, params) => {
      const nodeIndex = parseInt(params['0'] || '0', 10);
      const codex = hub.queryCodex(nodeIndex);
      if (codex) {
        sendJSON(res, 200, codex);
      } else {
        sendJSON(res, 404, { error: 'Codex not found' });
      }
    }
  },
  {
    method: 'GET',
    path: '/api/platforms/status',
    handler: (_req, res) => {
      const statuses = hub.getAllSystemStatuses();
      sendJSON(res, 200, { systems: statuses });
    }
  },
  {
    method: 'POST',
    path: /^\/api\/sync\/([^\/]+)\/([^\/]+)$/,
    handler: async (req, res, params) => {
      try {
        const sourceSystem = params['1'] || '';
        const targetSystem = params['2'] || '';
        const body = await readBody(req);
        const data = JSON.parse(body);
        const result = hub.syncSystems(sourceSystem, targetSystem, data);
        if (result) {
          sendJSON(res, 200, result);
        } else {
          sendJSON(res, 400, { error: 'Synchronization failed' });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        sendJSON(res, 500, { error: errorMessage });
      }
    }
  },
  {
    method: 'GET',
    path: '/api/library/query',
    handler: (req, res) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const query = url.searchParams.get('q') || '';
      const domain = url.searchParams.get('domain') || '';
      const results = hub.queryLivingLibrary(query, domain);
      sendJSON(res, 200, { results });
    }
  }
];

function sendJSON(res: ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: { toString(encoding?: string): string } | string) => {
      if (typeof chunk === 'string') {
        body += chunk;
      } else {
        body += chunk.toString('utf8');
      }
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', reject);
  });
}

function matchRoute(req: IncomingMessage): { route: Route; params: Record<string, string> } | null {
  const method = req.method || 'GET';
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const pathname = url.pathname;

  for (const route of routes) {
    if (route.method !== method) continue;

    if (typeof route.path === 'string') {
      if (route.path === pathname) {
        return { route, params: {} };
      }
    } else {
      const match = pathname.match(route.path);
      if (match) {
        const params: Record<string, string> = {};
        match.forEach((value: string, index: number) => {
          params[index.toString()] = value;
        });
        return { route, params };
      }
    }
  }

  return null;
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const matched = matchRoute(req);
  
  if (matched) {
    matched.route.handler(req, res, matched.params);
  } else {
    sendJSON(res, 404, { error: 'Not found' });
  }
});

server.listen(PORT, () => {
  console.log(`Tesseract Bridge Hub server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default server;


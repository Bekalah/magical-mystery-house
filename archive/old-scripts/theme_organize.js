#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * Node 25.2+ required
 * Usage: node theme_organize.js --dir ./workspace-root
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const argv = require('minimist')(process.argv.slice(2));
const GL_TOKEN = process.env.GITLAB_TOKEN;
const GL_NS = 'bekalah';

if(!GL_TOKEN){ 
  console.error('Set GITLAB_TOKEN'); 
  process.exit(1); 
}

async function fetch(url, options = {}) {
  const https = require('https');
  const http = require('http');
  const { URL } = require('url');
  
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      ...options,
      headers: {
        'PRIVATE-TOKEN': GL_TOKEN,
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ json: async () => JSON.parse(data), ok: res.statusCode >= 200 && res.statusCode < 300 });
        } catch (e) {
          resolve({ json: async () => ({}), ok: false });
        }
      });
    });
    
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

function readWorkspaces(root){
  const pkgPath = path.join(root, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return [];
  }
  
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const w = pkg.workspaces || [];
  const pkgs = [];
  
  w.forEach(ws => {
    const base = ws.replace('/*', '').replace('/*/', '');
    const d = path.join(root, base);
    if(fs.existsSync(d)){
      fs.readdirSync(d).forEach(name=>{
        const p = path.join(d, name);
        if(fs.existsSync(path.join(p, 'package.json'))){
          pkgs.push({name, path:p});
        }
      });
    }
  });
  
  return pkgs;
}

async function getNsId(){
  const r = await fetch(`https://gitlab.com/api/v4/namespaces?search=${GL_NS}`);
  const j = await r.json();
  return j[0]?.id;
}

async function ensureProject(name, desc, nsid){
  const check = await fetch(`https://gitlab.com/api/v4/projects?search=${name}`);
  const arr = await check.json();
  if(Array.isArray(arr) && arr.find(p=>p.path===name)) return;
  
  await fetch('https://gitlab.com/api/v4/projects', {
    method:'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ name, path:name, namespace_id: nsid, description: desc, visibility:'private' })
  });
}

async function createLabel(projectId, label){
  await fetch(`https://gitlab.com/api/v4/projects/${projectId}/labels`, {
    method:'POST', 
    headers: {'Content-Type':'application/json'}, 
    body: JSON.stringify({ name: label, color:'#6B4C3B' })
  }).catch(()=>{});
}

(async()=>{
  const root = argv.dir || process.cwd();
  const packages = readWorkspaces(root);
  
  if(packages.length===0){ 
    console.log('No workspaces found.'); 
    process.exit(0); 
  }
  
  const nsid = await getNsId();
  
  for(const p of packages){
    const themed = `${p.name}-arcana`;
    const desc = `MonaS Hieroglyphica — ${p.name} — creative artifact (auto-generated)`;
    
    await ensureProject(themed, desc, nsid);
    
    // find project id
    const proj = await fetch(`https://gitlab.com/api/v4/projects?search=${themed}`);
    const pr = await proj.json();
    const pid = Array.isArray(pr) ? pr.find(x=>x.path===themed)?.id : null;
    
    if(pid){
      const labels = ['hieroglyph:concept','alchemy:forge','arcana:design','priority:master','status:inspiration'];
      for(const l of labels) await createLabel(pid, l);
    }
    
    // annotate local README
    const readme = path.join(p.path, 'README.md');
    const fm = `---\n"title": "${p.name}",\n"tags": ["mona","hieroglyph","alchemy","dark-academia"],\n"aesthetic": "MonaS Hieroglyphica"\n---\n\n`;
    
    if(fs.existsSync(readme)){
      const old = fs.readFileSync(readme, 'utf8');
      fs.writeFileSync(readme, fm + old, 'utf8');
    } else {
      fs.writeFileSync(readme, fm + `# ${p.name}\n\nCreative artifact.`, 'utf8');
    }
    
    console.log('Processed', p.name);
  }
  
  console.log('Done.');
})();


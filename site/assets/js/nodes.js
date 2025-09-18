const DATA_URL = 'data/nodes.json';

/**
 * Fetch node registry data from disk.
 * The routine is pure: same input URL yields same JSON payload.
 */
async function fetchNodes(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load nodes: ${response.status}`);
  const payload = await response.json();
  return Array.isArray(payload.nodes) ? payload.nodes : [];
}

/**
 * Clone the node template and populate details for the calm reader.
 */
function createNodeCard(template, node) {
  const fragment = template.content.cloneNode(true);
  fragment.querySelector('.node-title').textContent = node.title;
  fragment.querySelector('.node-alignment').textContent = node.alignment;
  fragment.querySelector('.node-frequency').textContent = node.frequency;
  fragment.querySelector('.node-summary').textContent = node.summary;
  return fragment;
}

/**
 * Render the node cards into the target element or show the fallback notice.
 */
function renderNodes(target, nodes, template, fallback) {
  if (!target) return;
  const docFrag = document.createDocumentFragment();
  if (nodes.length === 0) {
    if (fallback) fallback.hidden = false;
    target.replaceChildren();
    return;
  }
  nodes.forEach((node) => {
    docFrag.appendChild(createNodeCard(template, node));
  });
  target.replaceChildren(docFrag);
  if (fallback) fallback.hidden = true;
}

(async function initNodeSystem() {
  const target = document.querySelector('[data-node-list]');
  const template = document.getElementById('node-template');
  const fallback = document.querySelector('.node-fallback');
  if (!target || !template) return;
  try {
    const nodes = await fetchNodes(DATA_URL);
    renderNodes(target, nodes, template, fallback);
  } catch (error) {
    console.error(error);
    if (fallback) fallback.hidden = false;
  }
})();

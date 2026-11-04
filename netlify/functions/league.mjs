import { getStore } from '@netlify/blobs';

const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const respond = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
const validId = (x) => Number.isInteger(x) && x >= 1 && x <= 28;

export default async function handler(request) {
  if (!['GET', 'POST'].includes(request.method)) return respond({ error: 'Method not allowed' }, 405);
  try {
    const blobs = getStore({ name: 'ddm-league-2026', consistency: 'strong' });
    if (request.method === 'GET') {
      const entries = await Promise.all(Array.from({ length: 28 }, (_, i) => blobs.get(`match-${i + 1}`, { type: 'json', consistency: 'strong' })));
      const results = {}, viewers = {};
      entries.forEach((entry, i) => {
        if (entry?.result) results[i + 1] = entry.result;
        if (entry?.viewers) viewers[i + 1] = entry.viewers;
      });
      return respond({ results, viewers });
    }
    const { id, field, value } = await request.json();
    if (!validId(id) || !['result', 'viewers'].includes(field)) return respond({ error: 'Invalid id/field' }, 400);
    if (field === 'result' && value !== null && (!Array.isArray(value) || value.length < 2 || value.length > 3 || value.some(x => !Array.isArray(x) || x.length !== 2 || x.some(n => !Number.isInteger(n) || n < 0 || n > 99) || x[0] === x[1]) || value.reduce((s,x)=>s+x[0]-x[1],0)===0)) return respond({ error: 'Invalid score' }, 400);
    if (field === 'viewers' && (!Array.isArray(value) || value.length !== 4 || value.some(x => typeof x !== 'string' || x.length > 10))) return respond({ error: 'Invalid viewers' }, 400);
    const key = `match-${id}`;
    const current = (await blobs.get(key, { type: 'json', consistency: 'strong' })) || {};
    if (field === 'result') current.result = value;
    else current.viewers = value;
    await blobs.setJSON(key, current);
    return respond({ ok: true });
  } catch (error) {
    console.error('League API error:', error);
    return respond({ error: 'Storage unavailable' }, 500);
  }
}

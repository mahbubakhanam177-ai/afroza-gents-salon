import fetch from 'node-fetch';
import fs from 'fs';

const url = 'https://ndfmlkqjuyeegelpewsh.supabase.co';
const key = 'sb_publishable_pukDkqoshCczu9cNNIR-Mw_2ss6_FXt';

const sql = fs.readFileSync('./supabase/migrations/20260809000000_schema.sql', 'utf8');

async function trySql() {
  console.log("Attempting SQL execution via Supabase REST API endpoints...");
  
  // Try RPC or query endpoints
  const endpoints = [
    '/rest/v1/rpc/exec_sql',
    '/pg/v1/query',
    '/sql'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${url}${ep}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': key,
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({ query: sql, sql: sql })
      });
      console.log(`Endpoint ${ep}: status ${res.status}`);
      const text = await res.text();
      console.log(`Response: ${text.substring(0, 200)}`);
    } catch (e) {
      console.log(`Endpoint ${ep} error: ${e.message}`);
    }
  }
}

trySql();

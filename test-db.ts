import { Client } from "pg";

const url = "postgresql://postgres.ijfnoayjcytlkajhgjas:DY7qJIdlxuIOsPDU@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres";

async function testConnection() {
  const client = new Client({
    connectionString: url,
  });

  try {
    console.log("Connecting to Supabase...");
    await client.connect();
    console.log("Successfully connected!");
    const res = await client.query("SELECT NOW()");
    console.log("Current Time from DB:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

testConnection();

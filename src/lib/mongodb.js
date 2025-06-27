import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) throw new Error("❌ MONGODB_URI tidak ditemukan di .env.local");

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Cegah koneksi ulang di hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((c) => {
      console.log("✅ Terhubung ke MongoDB [dev]");
      return c;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((c) => {
    console.log("✅ Terhubung ke MongoDB [prod]");
    return c;
  });
}

export default clientPromise;

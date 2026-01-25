import mongoose from "mongoose";

const conn1 =
  "mongodb+srv://yogeshwaran:x49WOcHJYVF62huv@cluster0.vtj9kzt.mongodb.net/textile";
const conn2 =
  "mongodb+srv://textile:textile1234@cluster0.mjdvu2r.mongodb.net/?appName=Cluster0";

const testConn = async (uri, name) => {
  try {
    console.log(`Testing ${name}...`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ ${name} connected successfully!`);
    await mongoose.disconnect();
    return true;
  } catch (err) {
    console.error(`❌ ${name} failed:`, err.message);
    return false;
  }
};

const runTests = async () => {
  const res1 = await testConn(conn1, "Yogeshwaran DB (from .env)");
  const res2 = await testConn(conn2, "Textile DB (from db.js)");

  console.log("\nSummary:");
  console.log(`Yogeshwaran DB: ${res1 ? "WORKING" : "FAILED"}`);
  console.log(`Textile DB: ${res2 ? "WORKING" : "FAILED"}`);
  process.exit(0);
};

runTests();

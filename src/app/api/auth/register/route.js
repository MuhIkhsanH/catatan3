import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ success: false, message: "Username dan password wajib diisi" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Myapp");
    const users = db.collection("Users");

    const userExists = await users.findOne({ username });

    if (userExists) {
      return Response.json({ success: false, message: "Username sudah digunakan" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // angka = salt rounds
    await users.insertOne({ username, password: hashedPassword });

    return Response.json({ success: true, message: "Berhasil registrasi user" });
  } catch (error) {
    console.error("REGISTER error:", error);
    return Response.json({ success: false, message: "Gagal registrasi user" }, { status: 500 });
  }
}

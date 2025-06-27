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

    const user = await users.findOne({ username });

    if (!user) {
      return Response.json({ success: false, message: "Login gagal. User tidak ditemukan." }, { status: 401 });
    }

    // 🔐 Bandingkan password input dengan hash di database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json({ success: false, message: "Password salah" }, { status: 401 });
    }

    return Response.json({
      success: true,
      message: "Login berhasil",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("LOGIN error:", error);
    return Response.json({ success: false, message: "Gagal login user" }, { status: 500 });
  }
}

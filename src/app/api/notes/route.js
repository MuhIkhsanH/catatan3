import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Myapp");
    const rawNotes = await db.collection("Name").find().toArray();

    const notes = rawNotes.map((note) => ({
      ...note,
      _id: note._id.toString(), // agar tidak error di React
    }));

    return Response.json({
      success: true,
      notes,
      message: `${notes.length} catatan ditemukan.`,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Gagal mengambil catatan",
      error: error.message,
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const client = await clientPromise;
    const db = client.db("Myapp");

    await db.collection("Name").insertOne({ title, content });

    return Response.json({ success: true, message: "Catatan disimpan" });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Gagal menyimpan catatan",
      error: error.message,
    }, { status: 500 });
  }
}

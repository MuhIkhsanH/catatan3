import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, content } = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("Myapp");

    await db.collection("Name").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content } }
    );

    return Response.json({ success: true, message: "Berhasil mengedit catatan" });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Gagal mengedit catatan",
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("Myapp");

    await db.collection("Name").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, message: "Berhasil menghapus catatan" });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Gagal menghapus catatan",
      error: error.message,
    }, { status: 500 });
  }
}

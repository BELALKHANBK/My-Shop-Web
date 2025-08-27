import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const image = formData.get("image"); // File object

    let imageBuffer = null;
    let imageType = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
      imageType = image.type;
    }

    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const result = await db.collection("products").insertOne({
      name,
      price,
      description,
      image: imageBuffer,
      imageType,
    });

    return NextResponse.json({ message: "Product added", result });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection("products").find({}).toArray();

    const formatted = products.map((p) => ({
      ...p,
      _id: p._id.toString(), // string এ রূপান্তর
      image: p.image
        ? `data:${p.imageType};base64,${p.image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE option
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // /api/products?id=xxxx

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Deleted", result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

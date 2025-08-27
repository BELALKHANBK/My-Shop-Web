/* import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.username === "test" && credentials.password === "1234") {
          return { id: 1, name: "Test User" };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/products";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
 */


import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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

    // imageBuffer কে base64 string এ রূপান্তর করব
    const formatted = products.map((p) => ({
      ...p,
      image: p.image
        ? `data:${p.imageType};base64,${p.image.toString("base64")}`
        : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

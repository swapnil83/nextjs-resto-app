import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function GET() {
    await mongoose.connect(connectionStr, {useNewUrlParser: true});
    const data = await restaurantSchema.find();
    console.log(data);
    return NextResponse.json({ result: data });
}
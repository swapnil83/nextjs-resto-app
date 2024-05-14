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

export async function POST(request) {
    const payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser: true});

    if(payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password });
        if(result) {
            success = true;
        }
    } else {
        const restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
        if(result) {
            success = true;
        }
    }

    return NextResponse.json({ result, success });
}
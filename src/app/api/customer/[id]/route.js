import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    let success = false;
    const id = content.params.id;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const restaurantDetails = await restaurantSchema.findOne({ _id: id });
    const foodItems = await foodSchema.find({ resto_id: id });

    if(restaurantDetails || foodItems) {
        success = true;
    }
    return NextResponse.json({ success, restaurantDetails, foodItems })
}
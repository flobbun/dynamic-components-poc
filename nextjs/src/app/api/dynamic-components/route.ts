export const dynamic = 'force-dynamic'
import DynamicComponents from "app/server/models/DynamicComponentsSchema";
import connectMongo from "app/server/utils/connectMongo"
import { DynamicComponentsData } from "app/types";

export async function GET() {
    await connectMongo();

    const res = (await DynamicComponents.find({}))[0]

    if (!res) {
        return Response.error();
    }

    return Response.json(res);
}

export async function PATCH(request: Request) {
    await connectMongo();

    const data = await request.json() as DynamicComponentsData;

    const dynamicComponents = (await DynamicComponents.find({}))[0];

    if (!dynamicComponents) {
        return Response.error();
    }

    dynamicComponents.components = data.components;

    const res = await dynamicComponents.save();

    return Response.json(res);
}
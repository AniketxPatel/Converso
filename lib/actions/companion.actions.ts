"use server"
import { auth } from "@clerk/nextjs/server";
import { createSupaBaseCLient } from "../supabase";

export const creatCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupaBaseCLient();

    const { data, error } = await supabase
        .from("companions")
        .insert({
            ...formData, author
        }).select();

    if (error || !data)
        throw new Error(error?.message || "Failed to create companion");
    return data[0];
}
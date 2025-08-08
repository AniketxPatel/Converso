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

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupaBaseCLient();

    let query = supabase
        .from("companions")
        .select();

    if (subject && topic) {
        query = query.ilike("subject", `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1)

    const { data: companions, error } = await query;
    if (error) throw new Error(error?.message || "Failed to fetch companions");

    return companions;
}
export const getCompanion = async (id: string) => {
    const supabase = createSupaBaseCLient();

    const { data, error } = await supabase
        .from("companions") // make sure the table name is correct — plural if needed
        .select("*")
        .eq("id", id)
        .single(); // ensures you get a single object instead of an array

    if (error) {
        console.error("Error fetching companion:", error.message);
        return null;
    }

    return data; // return the actual row
};

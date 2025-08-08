"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("topic") || "";

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {if (searchQuery) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "topic",
                value: searchQuery,
            });
            router.push(newUrl, { scroll: false });
        } else {
            if (pathname === "/companions") {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                });
                router.push(newUrl, { scroll: false });
            }
        } 
    }, 500 );
        
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className="relative border border-black rounded-lg flex items-center gap-2 px-2 py-1 h-fit">
            <Image src="/icons/search.svg" alt="search" height={15} width={15} />
            <input
                type="text"
                placeholder="Search Companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        router.push(`${pathname}?topic=${encodeURIComponent(searchQuery)}`);
                    }
                }}
            />
        </div>
    );
};

export default SearchInput;

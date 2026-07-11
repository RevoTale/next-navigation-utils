"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { RelativeURL } from "../types";
import createRelativeLink from "../utils/createRelativeLink";

const useRelativeLink = (): RelativeURL => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	return useMemo<RelativeURL>(
		() => createRelativeLink(pathname, searchParams),
		[pathname, searchParams],
	);
};

export default useRelativeLink;

"use client";
import { useCallback } from "react";
import type { Linker, RelativeURL } from "../types";
import createLinker from "../utils/createLinker";
import useRelativeLink from "./useRelativeLink";

const useLinker = (): (() => Linker<RelativeURL>) => {
	const link = useRelativeLink();
	return useCallback((): Linker<RelativeURL> => createLinker(link), [link]);
};

export default useLinker;

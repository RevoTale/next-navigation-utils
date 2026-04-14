import type { FunctionComponent } from "react";
import { ParameterOptions } from "@/dist-lib";
import { pageType } from "@/dist-lib/parameters";

const Page: FunctionComponent = () => {
	return <div data-testid="some_random_page">Some random page</div>;
};
export default Page;

import {Loader2Icon } from "lucide-react";
const Loading = () => {
	return ( 
		<div className="flex h-screen-minus-header justify-center items-center ">
			<Loader2Icon className="mr-2 h-48 w-48 animate-spin" />
		</div> 
	);
};
 
export default Loading;
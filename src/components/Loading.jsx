import {Loader2Icon } from "lucide-react";
const Loading = () => {
	return ( 
		<div className="flex h-screen-minus-header justify-center items-center ">
			<Loader2Icon className="h-32 w-32 animate-spin" />
		</div> 
	);
};
 
export default Loading;
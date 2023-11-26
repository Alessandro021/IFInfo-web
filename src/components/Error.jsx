import {XCircle } from "lucide-react";
const Error = ({messagem}) => {
	return ( 
		<div className="flex flex-col h-screen-minus-header justify-center items-center ">
			<XCircle className="mr-2 h-44 w-44 animate-bounce text-red-600" />
			<span className="text-xl font-bold">{messagem}</span>
		</div> 
	);
};
 
export default Error;
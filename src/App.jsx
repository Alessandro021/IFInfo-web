import { Rotas } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<Rotas />
			<ToastContainer autoClose={2600} position="top-center"  />
		</>

	);
};

export default App;

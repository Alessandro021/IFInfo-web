import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "../components/Header";
import Noticias from "../pages/noticias";
import Cursos from "../pages/cursos";
import Contatos from "../pages/contatos";
import Servidores from "../pages/servidores";
import Login from "../pages/login";
import Horarios from "../pages/horarios";
import VerNoticia from "../pages/noticias/verNoticia";
import AtualizarNoticia from "../pages/noticias/atualizarNoticia";
import { useLogado } from "../useHooks/useLogado";
import Perfil from "../pages/usuario";
import Calendario from "../pages/calendario";

export const Rotas = () => {
	const {logado, loading} = useLogado();

	if(loading){
		return <p>Carregando...</p>;
	}
	return (
		<BrowserRouter className="flex flex-col h-screen">
			{logado && <Header />}
			<Routes className="flex-grow">
				<Route  path="/" element={logado ? <Noticias /> : <Navigate to={"/login"} /> } />
				<Route  path="/:id" element={logado ? <VerNoticia /> : <Navigate to={"/login"} /> } />
				<Route  path="/atualizar/:id" element={logado ? <AtualizarNoticia /> : <Navigate to={"/login"} /> } />
				<Route  path="/perfil" element={logado ? <Perfil /> : <Navigate to={"/login"} /> } />
				<Route  path="/cursos" element={logado ? <Cursos /> : <Navigate to={"/login"} /> } />
				<Route  path="/calendario" element={logado ? <Calendario /> : <Navigate to={"/login"} /> } />
				<Route  path="/horarios" element={logado ? <Horarios /> : <Navigate to={"/login"} /> } />
				<Route  path="/contatos" element={logado ? <Contatos /> : <Navigate to={"/login"} /> } />
				<Route  path="/servidores" element={logado ? <Servidores /> : <Navigate to={"/login"} /> } />
				<Route  path="/login" element={!logado ? <Login /> : <Navigate to={"/"} /> } />
				
			</Routes>
		</BrowserRouter>
	);
};
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "../components/Header";
import Noticias from "../pages/noticias";
import Contatos from "../pages/contatos";
import Login from "../pages/login";
import Horarios from "../pages/horarios";
import VerNoticia from "../pages/noticias/verNoticia";
import AtualizarNoticia from "../pages/noticias/atualizarNoticia";
import { useLogado } from "../useHooks/useLogado";
import Perfil from "../pages/usuario";
import Calendario from "../pages/calendario";
import CursosTecnicos from "../pages/cursos/tecnicos";
import CursosSuperiores from "../pages/cursos/superiores";
import Administrador from "../pages/admin";
import { useUsuario } from "../store/useUsuario";
import ServidoresAdministrativo from "../pages/servidores/administrativo"; 
import ServidoresDocentes from "../pages/servidores/docente";
import Loading from "../components/Loading";

export const Rotas = () => {
	const {logado, loading} = useLogado();
	const user = useUsuario(state => state.user);
	if(loading){
		return <Loading />;
	}
	return (
		<BrowserRouter className="flex flex-col h-screen">
			{(logado && user) && <Header />}
			<Routes className="flex-grow">
				<Route  path="/" element={(logado && user) ? <Noticias /> : <Navigate to={"/login"} /> } />
				<Route  path="/admin" element={(logado && user) && user?.eAdmin ? <Administrador /> : <Navigate to={"/login"} /> } />
				<Route  path="/:id" element={(logado && user) ? <VerNoticia /> : <Navigate to={"/login"} /> } />
				<Route  path="/atualizar/:id" element={(logado && user) ? <AtualizarNoticia /> : <Navigate to={"/login"} /> } />
				<Route  path="/perfil" element={(logado && user) ? <Perfil /> : <Navigate to={"/login"} /> } />
				<Route  path="/calendario" element={(logado && user) ? <Calendario /> : <Navigate to={"/login"} /> } />
				<Route  path="/horarios" element={(logado && user) ? <Horarios /> : <Navigate to={"/login"} /> } />
				<Route  path="/contatos" element={(logado && user) ? <Contatos /> : <Navigate to={"/login"} /> } />
				<Route  path="/cursos/tecnicos" element={(logado && user) ? <CursosTecnicos /> : <Navigate to={"/login"} /> } />
				<Route  path="/cursos/superiores" element={(logado && user) ? <CursosSuperiores /> : <Navigate to={"/login"} /> } />
				<Route  path="/servidores/docente" element={(logado && user) ? <ServidoresDocentes /> : <Navigate to={"/login"} /> } />
				<Route  path="/servidores/administrativo" element={(logado && user) ? <ServidoresAdministrativo /> : <Navigate to={"/login"} /> } />
				<Route  path="/login" element={!(logado && user) ? <Login /> : <Navigate to={"/"} /> } />
				
			</Routes>
		</BrowserRouter>
	);
};
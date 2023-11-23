import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookUserIcon, CalendarClockIcon, CalendarDaysIcon, ChevronDown, ChevronsUpDownIcon, GraduationCapIcon, LogOutIcon, MenuIcon, NewspaperIcon, ShieldCheckIcon, Users2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useUsuario } from "../store/useUsuario";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Header = () => {
	const deslogarUsuario = useUsuario(state => state.deslogarUsuario);
	const user = useUsuario(state => state.user);

	const [abrirCurso, setAbrirCurso] = useState(false);
	const [abrirServidor, setAbrirServidor] = useState(false);
	return (
		<Card className="flex flex-row items-center justify-between p-4" >
			<Sheet>
				<SheetTrigger asChild >
					<Button size="icon" variant="outline">
						<MenuIcon color="black"/>
					</Button>
				</SheetTrigger>

				<SheetContent side={"left"} className="w-72" >
					<SheetHeader>
						<SheetTitle className="text-center text-lg font-semibo">Menu</SheetTitle>
					</SheetHeader>

					<ScrollArea  className="h-full">
						<div className="mt-4 flex flex-col gap-4">
							{user?.eAdmin && (
								<SheetClose asChild>
									<Link to="/admin">
										<Button
											variant={"outline"}
											className="w-full justify-start gap-2"
										>
											<ShieldCheckIcon size={16} /> Administrador
										</Button>
									</Link>
								</SheetClose>
							)}

							<SheetClose asChild>
								<Link to="/">
									<Button
										variant={"outline"}
										className="w-full justify-start gap-2"
									>
										<NewspaperIcon size={16} /> Notícias
									</Button>
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link to="/calendario">
									<Button
										variant={"outline"}
										className="w-full justify-start gap-2"
									>
										<CalendarDaysIcon size={16} /> Calendário
									</Button>
								</Link>
							</SheetClose>

							<Collapsible open={abrirCurso} onOpenChange={setAbrirCurso} className="w-full">
								<CollapsibleTrigger asChild>
									<Button variant="outline" className="w-full justify-between transition-all [&[data-state=open]>svg]:rotate-180">
										<div className="flex flex-row items-center gap-2">
											<GraduationCapIcon size={16} /> Cursos
										</div>
										<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />

									</Button>
								</CollapsibleTrigger>
	
								<CollapsibleContent className={`flex flex-col px-2 ${abrirCurso && "border"} rounded-lg mt-1`}>
									<SheetClose asChild onClick={() => setAbrirCurso(false)}>
										<Link to="/cursos/tecnicos">
											<Button variant={"link"} className="w-full">
										Tecnicos
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild onClick={() => setAbrirCurso(false)} >
										<Link to="/cursos/superiores">
											<Button variant={"link"} className="w-full">
										Superiores
											</Button>
										</Link>
									</SheetClose>
								</CollapsibleContent>
							</Collapsible>
					
							<SheetClose asChild>
								<Link to="/horarios">
									<Button
										variant={"outline"}
										className="w-full justify-start gap-2"
									>
										<CalendarClockIcon size={16} /> Horários
									</Button>
								</Link>
							</SheetClose>
					

							<SheetClose asChild>
								<Link to="/contatos">
									<Button
										variant={"outline"}
										className="w-full justify-start gap-2"
									>
										<BookUserIcon size={16} /> Contatos
									</Button>
								</Link>

							</SheetClose>

							<Collapsible open={abrirServidor} onOpenChange={setAbrirServidor} className="w-full">
								<CollapsibleTrigger asChild>
									<Button variant="outline" className="w-full justify-between transition-all [&[data-state=open]>svg]:rotate-180">
										<div className="flex flex-row items-center gap-2">
											<GraduationCapIcon size={16} /> Servidores
										</div>
										<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />

									</Button>
								</CollapsibleTrigger>
	
								<CollapsibleContent className={`flex flex-col px-2 ${abrirServidor && "border"} rounded-lg mt-1`}>
									<SheetClose asChild onClick={() => setAbrirServidor(false)} >
										<Link to="/servidores/docente">
											<Button variant={"link"} className="w-full">
										Docente
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild onClick={() => setAbrirServidor(false)}>
										<Link to="/servidores/administrativo">
											<Button variant={"link"} className="w-full">
										Administrativos
											</Button>
										</Link>
									</SheetClose>
								</CollapsibleContent>
							</Collapsible>
				
						</div>
					</ScrollArea>
				</SheetContent>
			</Sheet>

			<h1 className="text-3xl font-extrabold text-green-700">IF<span className="font-extrabold text-black">Info</span></h1>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="w-12 h-12 hover:outline cursor-pointer">
						<AvatarFallback>
							{user?.nome?.[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-4">
					<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<Link to="/perfil">
							<DropdownMenuItem>Minhas informações</DropdownMenuItem>
						</Link>
						<DropdownMenuItem onClick={() => deslogarUsuario()}>Sair da conta</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Card>
	);
};

export default Header;

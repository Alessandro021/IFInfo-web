import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookUserIcon, CalendarClockIcon, GraduationCapIcon, LogOutIcon, MenuIcon, NewspaperIcon, Users2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {

	return (
		<Card className="flex flex-row items-center justify-between p-5" >
			<Sheet defaultOpen={true}>
				<SheetTrigger asChild >
					<Button size="icon" variant="outline">
						<MenuIcon color="black"/>
					</Button>
				</SheetTrigger>

				<SheetContent side={"left"} className="bg-current w-60" >
					<SheetHeader>
						<SheetTitle className="text-center text-lg font-semibol text-white">Menu</SheetTitle>
					</SheetHeader>
					<div className="mt-4 flex flex-col gap-2">
						<Button
							variant={"outline"}
							className="w-full justify-start gap-2 mt-4"
						>
							<LogOutIcon size={16} /> Fazer Logout
						</Button>

						<SheetClose asChild>
							<Link to="/">
								<Button
									variant={"outline"}
									className="w-full justify-start gap-2 mt-4"
								>
									<NewspaperIcon size={16} /> Notícias
								</Button>
							</Link>
						</SheetClose>

						<SheetClose asChild>
							<Link to="/cursos">
								<Button
									variant={"outline"}
									className="w-full justify-start gap-2 mt-4"
								>
									<GraduationCapIcon size={16} /> Cursos
								</Button>
							</Link>
						</SheetClose>
					
						<SheetClose asChild>
							<Link to="/horarios">
								<Button
									variant={"outline"}
									className="w-full justify-start gap-2 mt-4"
								>
									<CalendarClockIcon size={16} /> Horários
								</Button>
							</Link>
						</SheetClose>
					

						<SheetClose asChild>
							<Link to="/contatos">
								<Button
									variant={"outline"}
									className="w-full justify-start gap-2 mt-4"
								>
									<BookUserIcon size={16} /> Contatos
								</Button>
							</Link>

						</SheetClose>
					
						<SheetClose asChild>
							<Link to="/servidores">
								<Button
									variant={"outline"}
									className="w-full justify-start gap-2 mt-4"
								>
									<Users2Icon size={16} /> Servidores
								</Button>
							</Link>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>

			<h1 className="text-2xl font-bold text-green-700">IFInfo</h1>

			<Link to="/login">
				<Button>
					<span>Sair</span>
				</Button>
			</Link>
		</Card>
	);
};

export default Header;

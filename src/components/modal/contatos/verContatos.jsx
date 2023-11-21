import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

import { DataTable } from "../../tabela/data-table";
import { colunasVerContatos } from "../../tabela/colunas/verContatos";
import { useState } from "react";

export function VerContatos({contatos}) {
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(current => !current)}>
			<DialogTrigger asChild>
				<Button>{contatos?.length} {contatos?.length > 1 ? "contatos" : "contato" }</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-screen-lg" >
				<DialogHeader>
					<DialogTitle >Ver cotatos</DialogTitle>
					<DialogDescription>
						Crie, edite ou exclua seu contato aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<DataTable columns={colunasVerContatos} data={contatos} />
			</DialogContent>
		</Dialog>
	);
}

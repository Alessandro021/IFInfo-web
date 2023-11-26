import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useCursos } from "@/src/store/useCursos";
import { useAtualizarCursoTecnico } from "@/src/queries/cursosTecnicos/atualizarCursoTecnico";
import { Loader2 } from "lucide-react";

export function AtualizarCursoTecnico({id, open, onClose}) {

	const pegarCursoTecnicoPorId = useCursos(state => state.pegarCursoTecnicoPorId);
	pegarCursoTecnicoPorId(id);
	const cursoTecnico = useCursos(state => state.cursoTecnico);

	const {mutate, isSuccess, status} = useAtualizarCursoTecnico();

	const formSchema = yup.object().shape({
		nome: yup.string().strict().optional().nonNullable().min(3),
		link: yup.string().url().optional().nonNullable().min(10),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: cursoTecnico?.nome || "",
			link: cursoTecnico?.link || "",
		}
	});
    

	const onSubmit = (values) => {
		// console.log(values);
		mutate({id,  values: values});
	};

	useEffect(() => {
		if(isSuccess) {
			onClose();
		}
	},[isSuccess]);

	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle >Editar curso tecnico</DialogTitle>
					<DialogDescription>
                    Faça alterações em seu curso tecnico aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Nome do curso</FormLabel>
									<FormControl>
										<Input placeholder="Nome do curso" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="link"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Url da pagina do curso</FormLabel>
									<FormControl>
										<Input placeholder="Url da pagina do curso" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={status === "pending" ? true : false}>
								{status === "pending" ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando...</>: "Salvar"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

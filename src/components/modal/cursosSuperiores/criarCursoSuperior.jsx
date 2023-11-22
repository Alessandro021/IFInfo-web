import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCriarCursoSuperior } from "@/src/queries/cursosSuperiores/criarCursoSuperior";

export function CriarCursoSuperior({open, onClose}) {
	const [loading, setLoading] = useState(false);
	const {mutate, isError, isSuccess, status} = useCriarCursoSuperior();


	const formSchema = yup.object().shape({
		nome: yup.string().strict().required().nonNullable().min(3),
		link: yup.string().url().required().nonNullable().min(10),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: "",
			link: "",
		}
	});

	const onSubmit = (values) => {
		setLoading(true);
		// console.log(values);

		mutate({values: values});

	};

	useEffect(() => {
		if(isError || isSuccess) {
			setLoading(false);
		}

		if(isSuccess) {
			onClose();
			form.reset();
		}
	},[isError, isSuccess]);

	

	// if(loading){
	// 	return <p>Carregando...</p>;
	// }
	return (
		<Dialog open={open} onOpenChange={() =>{ onClose();  form.reset();}}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle >Criar curso superior</DialogTitle>
					<DialogDescription>
                    Crie seu curso superior aqui. Clique em criar quando terminar.
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
							<Button type="submit">Criar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useCriarServidorDocente } from "@/src/queries/servidoresDocentes/criarServidorDocente";
import { Loader2 } from "lucide-react";

export function CriarServidorDocente({open, onClose}) {
	const {mutate, isError, isSuccess, status} = useCriarServidorDocente();

	const formSchema = yup.object().shape({
		nome: yup.string().strict().required().nonNullable().min(3),
		area: yup.string().strict().required().nonNullable().min(3),
		email: yup.string().email().transform(value => (value === "" ? null : value)).optional().nullable().min(3),
		curriculo: yup.string().url().transform(value => (value === "" ? null : value)).optional().nullable().min(10),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: "",
			area: "",
			email: "",
			curriculo: ""
		}
	});

	const onSubmit = (values) => {
		mutate({values: values});
	};

	useEffect(() => {
		if(isSuccess) {
			onClose();
			form.reset();
		}
	},[isSuccess]);

	return (
		<Dialog open={open} onOpenChange={() =>{ onClose();  form.reset();}}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle >Criar servidor docente</DialogTitle>
					<DialogDescription>
                    Crie servidor docente aqui. Clique em criar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Nome do servidor*</FormLabel>
									<FormControl>
										<Input placeholder="Nome do servidor" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="area"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Area de ensino*</FormLabel>
									<FormControl>
										<Input placeholder="Area de ensino" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="curriculo"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Url do curriculo lattes</FormLabel>
									<FormControl>
										<Input placeholder="Url do curriculo lattes" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold ml-8"><span className="text-xl font-extrabold">*</span> obrigatorio</p>
							<Button type="submit" disabled={status === "pending" ? true : false}>
								{status === "pending" ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando...</>: "Criar"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useCriarServidorAdministrativo } from "@/src/queries/servidortesAdministrativos/criarServidorAdministrativo";
import { Loader2 } from "lucide-react";

export function CriarServidorAdministrativo({open, onClose}) {
	const {mutate, isError, isSuccess, status} = useCriarServidorAdministrativo();

	const formSchema = yup.object().shape({
		nome: yup.string().strict().required().nonNullable().min(3),
		cargo: yup.string().strict().required().nonNullable().min(3),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: "",
			cargo: "",
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
					<DialogTitle >Criar servidor administrativo</DialogTitle>
					<DialogDescription>
                    Crie servidor administrativo aqui. Clique em criar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
							name="cargo"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Cargo do servidor*</FormLabel>
									<FormControl>
										<Input placeholder="cargo do servidor" {...field} />
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

import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";
import { useAtualizarServidorAdministrativo } from "@/src/queries/servidortesAdministrativos/atualizarServidorAdministrativo";

export function AtualizarServidorAdministrativo({open, onClose, id}) {
	const pegarServidoradministrativoPorId = useServidoresAdministrativos(state => state.pegarServidoradministrativoPorId);
	pegarServidoradministrativoPorId(id);
	const administrativo = useServidoresAdministrativos(state => state.administrativo);

	const {mutate, isError, isSuccess, status} = useAtualizarServidorAdministrativo();

	const [loading, setLoading] = useState(false);

	const formSchema = yup.object().shape({
		nome: yup.string().strict().optional().nonNullable().min(3),
		cargo: yup.string().strict().optional().nonNullable().min(3),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: administrativo?.nome || "",
			cargo: administrativo?.cargo || "",
		}
	});

	const onSubmit = (values) => {
		setLoading(true);
		// console.log(values);

		mutate({id: id,  values: values});

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
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle >Atulize servidor administrativo</DialogTitle>
					<DialogDescription>
                    Atualize servidor administrativo aqui. Clique em salvar quando terminar.
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
										<Input placeholder="Cargo do servidor" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Salvar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

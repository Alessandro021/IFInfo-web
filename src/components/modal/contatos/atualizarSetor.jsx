import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useContatos } from "@/src/store/useContatos";
import { useAtualizarSetor } from "@/src/queries/contatos/atualizarSetor";

export function AtualizarSetor({open, onClose, idSetor}) {

	const pegarSetorPorId = useContatos(state => state.pegarSetorPorId);
	pegarSetorPorId(idSetor);
	const setor = useContatos(state => state.setor);

	const {mutate, isError, isSuccess, status} = useAtualizarSetor();

	const [loading, setLoading] = useState(false);

	const formSchema = yup.object().shape({
		setor: yup.string().strict().optional().nonNullable().min(3),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			setor: setor?.setor,
		}
	});
    
	const onSubmit = (values) => {
		setLoading(true);
		mutate({values: values, idSetor: idSetor});
	};

	useEffect(() => {
		if(isError || isSuccess) {
			setLoading(false);
		}

		if(isSuccess) {
			onClose();
		}
	},[isError, isSuccess]);

	// if(loading){
	// 	return <p>Carregando...</p>;
	// }
	return (
		<Dialog open={open} onOpenChange={() => {onClose(); form.reset();}}>
			<DialogContent className="sm:max-w-screen-lg">
				<DialogHeader>
					<DialogTitle >Atualizar setor</DialogTitle>
					<DialogDescription>
                    Atualize o setor aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<Card className="p-4">
							<FormField
								control={form.control}
								name={"setor"}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg font-bold">Setor</FormLabel>
										<FormControl>
											<Input placeholder="Setor" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</Card>
						<DialogFooter>
							<Button type="submit">Salvar</Button>
							
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>

		</Dialog>
	);
}

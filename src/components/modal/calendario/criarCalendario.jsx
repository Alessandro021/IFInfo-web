import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { useCriarCalendario } from "@/src/queries/calendario/criarCalendario";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export function CriarCalendario({open, onClose}) {
	const fileInputRef = useRef();

	const formSchema = yup.object().shape({
		nome: yup.string().strict().required().nonNullable().min(3),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: "",
			pdf: "",
		}
	});

	const {mutate, isSuccess, status} = useCriarCalendario();

	const onSubmit = (values) => {
		const formData = new FormData();
		for (const key in values) {
			if (key !== "pdf") {
				formData.append(key, values[key]);
			}
		}
		if (fileInputRef.current.files[0]) {
			if (fileInputRef.current.files[0].type !== "application/pdf") {
				toast.warn("Por favor, carregue um arquivo PDF.");
				return;
			}
			formData.append("pdf", fileInputRef.current.files[0]);
		} else {
			toast.warn("Por favor, carregue um arquivo PDF.");
			return;
		}

		mutate({values: formData});

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
					<DialogTitle >Criar calendário</DialogTitle>
					<DialogDescription>
                    Crie seu calendário aqui. Clique em criar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Nome*</FormLabel>
									<FormControl>
										<Input placeholder="Nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem className="flex flex-col">
							<FormLabel className="text-lg font-bold">Pdf*</FormLabel>
							<FormControl className="border p-2 rounded-md text-sm">
								<input ref={fileInputRef} type="file" name="pdf" />
							</FormControl>
						</FormItem>

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

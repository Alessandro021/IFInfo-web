import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUsuario } from "@/src/store/useUsuario";
import { useEffect, useState } from "react";
import { useAtualizarUsuario } from "@/src/queries/usuario/atualizarUsuario";



export function AlterarSenha() {
	const user = useUsuario(state => state.user);
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const formSchema = yup.object().shape({
		senha: yup.string().optional().nonNullable().min(8),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			senha: "",
		}
	});

	const {mutate, isError, isSuccess} = useAtualizarUsuario(form.getValues());

	const onSubmit = () => {
		// setLoading(true);
		mutate();
		
	};

	useEffect(() => {
		if(isError || isSuccess) {
			setLoading(false);
			setIsOpen(false);
		}

		if(isSuccess) {
			form.reset();
			setIsOpen(false);
		}
	},[isError, isSuccess]);

	

	// if(loading){
	// 	return <p>Carregando...</p>;
	// }
	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(current => !current)}>
			<DialogTrigger asChild>
				<Button >Alterar senha</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle >Redefinir senha</DialogTitle>
					<DialogDescription>
                    Faça alteração da sua senha aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="senha"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Senha</FormLabel>
									<FormControl>
										<Input placeholder="Senha" {...field} />
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

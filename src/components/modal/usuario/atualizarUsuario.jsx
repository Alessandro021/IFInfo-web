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



export function AtualizUrusaurio() {
	const user = useUsuario(state => state.user);
	const [isOpen, setIsOpen] = useState(false);

	const formSchema = yup.object().shape({
		nome: yup.string().strict().optional().nonNullable().min(3),
		email: yup.string().email().optional().nonNullable().min(6),

	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: user?.nome,
			email: user?.email,
		}
	});

    
	const {mutate, isSuccess} = useAtualizarUsuario();

	const onSubmit = (values) => {
		mutate({values: values});
	};

	useEffect(() => {
		if(isSuccess) {
			setIsOpen(false);
		}
	},[isSuccess]);

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(current => !current)}>
			<DialogTrigger asChild>
				<Button >Atualizar</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle >Editar perfil</DialogTitle>
					<DialogDescription>
                    Faça alterações em seu perfil aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Nome</FormLabel>
									<FormControl>
										<Input placeholder="Nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem >
									<FormLabel className="text-lg font-bold">Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
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

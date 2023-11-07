/* eslint-disable no-undef */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

const Login = () => {
	const [senhaVisivel, setSenhaVisivel] = useState(false);
	
	const formSchema = z.object({
		email: z.string().email().min(6),
		senha: z.string().min(6),
	});

	const form = useForm({
		resolver: zodResolver(formSchema ),
		defaultValues: {
			email: "",
			senha: "",
		},
	});
	const onSubmit = (values) => {
		console.log(values);
		form.reset();
	};
	return ( 
		<div className="flex h-screen justify-center items-center bg-slate-400">
			<Card>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col w-96 h-auto gap-10 p-8">
						<FormField 
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField 
							control={form.control}
							name="senha"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl className="flex flex-row gap-4">
										<div className="flex flex-row gap-4">
											<Input {...field} type={senhaVisivel ? "text" : "password"} name="senha" placeholder="senha" />
											{!senhaVisivel && <button onClick={() => setSenhaVisivel(current => !current)}><EyeIcon/></button>}
											{senhaVisivel && <button onClick={() => setSenhaVisivel(current => !current)}><EyeOffIcon/></button>}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full max-w-sm">Entrar</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
};
 
export default Login;
// import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CarrotIcon, MoreHorizontal} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "amount",
		header: "Amount",
		// header: () => <div className="text-center">Amount</div>,
		cell: ({ row }) => {
			return <Button><CarrotIcon /></Button>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {     
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Escolha</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Selecione</DropdownMenuLabel>
						{/* <DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>Copy payment ID
						</DropdownMenuItem> */}
						<DropdownMenuSeparator />
						<DropdownMenuItem>Deletar</DropdownMenuItem>
						<DropdownMenuItem>Atualizar</DropdownMenuItem>
						<DropdownMenuItem>Ver</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
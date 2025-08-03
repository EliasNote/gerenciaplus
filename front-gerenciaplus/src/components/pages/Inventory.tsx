"use client";
import { useState } from "react";
import Navbar from "../Navbar";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";

const columns = [
	{ name: "ID", uid: "id", sortable: true },
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "AGE", uid: "age", sortable: true },
	{ name: "ROLE", uid: "role", sortable: true },
	{ name: "TEAM", uid: "team" },
	{ name: "EMAIL", uid: "email" },
	{ name: "ACTIONS", uid: "actions" },
];

const users = [
	{
		id: 1,
		name: "Tony Reichert",
		role: "CEO",
		team: "Management",
		status: "active",
		age: "29",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
		email: "tony.reichert@example.com",
	},
	{
		id: 2,
		name: "Zoey Lang",
		role: "Tech Lead",
		team: "Development",
		status: "paused",
		age: "25",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
		email: "zoey.lang@example.com",
	},
	{
		id: 3,
		name: "Jane Fisher",
		role: "Sr. Dev",
		team: "Development",
		status: "active",
		age: "22",
		avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
		email: "jane.fisher@example.com",
	},
	{
		id: 4,
		name: "William Howard",
		role: "C.M.",
		team: "Marketing",
		status: "vacation",
		age: "28",
		avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
		email: "william.howard@example.com",
	},
	{
		id: 5,
		name: "Kristen Copper",
		role: "S. Manager",
		team: "Sales",
		status: "active",
		age: "24",
		avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
		email: "kristen.cooper@example.com",
	},
	{
		id: 6,
		name: "Brian Kim",
		role: "P. Manager",
		team: "Management",
		age: "29",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
		email: "brian.kim@example.com",
		status: "active",
	},
	{
		id: 7,
		name: "Michael Hunt",
		role: "Designer",
		team: "Design",
		status: "paused",
		age: "27",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
		email: "michael.hunt@example.com",
	},
	{
		id: 8,
		name: "Samantha Brooks",
		role: "HR Manager",
		team: "HR",
		status: "active",
		age: "31",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
		email: "samantha.brooks@example.com",
	},
	{
		id: 9,
		name: "Frank Harrison",
		role: "F. Manager",
		team: "Finance",
		status: "vacation",
		age: "33",
		avatar: "https://i.pravatar.cc/150?img=4",
		email: "frank.harrison@example.com",
	},
	{
		id: 10,
		name: "Emma Adams",
		role: "Ops Manager",
		team: "Operations",
		status: "active",
		age: "35",
		avatar: "https://i.pravatar.cc/150?img=5",
		email: "emma.adams@example.com",
	},
];

const PlusIcon = ({ size = 24, width, height, ...props }) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height={size || height}
			role="presentation"
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			>
				<path d="M6 12h12" />
				<path d="M12 18V6" />
			</g>
		</svg>
	);
};

const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height={size || height}
			role="presentation"
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
				fill="currentColor"
			/>
		</svg>
	);
};

const SearchIcon = (props) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height="1em"
			role="presentation"
			viewBox="0 0 24 24"
			width="1em"
			{...props}
		>
			<path
				d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				d="M22 22L20 20"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
};

const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height="1em"
			role="presentation"
			viewBox="0 0 24 24"
			width="1em"
			{...otherProps}
		>
			<path
				d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "actions"];

export default function Invetory() {
	const [filterValue, setFilterValue] = useState("");
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = useState(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [sortDescriptor, setSortDescriptor] = useState({
		column: "age",
		direction: "ascending",
	});
	const [page, setPage] = useState(1);

	const pages = Math.ceil(users.length / rowsPerPage);

	return (
		<>
			<Navbar />
			<Table aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>ROLE</TableColumn>
					<TableColumn>STATUS</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>Tony Reichert</TableCell>
						<TableCell>CEO</TableCell>
						<TableCell>Active</TableCell>
					</TableRow>
					<TableRow key="2">
						<TableCell>Zoey Lang</TableCell>
						<TableCell>Technical Lead</TableCell>
						<TableCell>Paused</TableCell>
					</TableRow>
					<TableRow key="3">
						<TableCell>Jane Fisher</TableCell>
						<TableCell>Senior Developer</TableCell>
						<TableCell>Active</TableCell>
					</TableRow>
					<TableRow key="4">
						<TableCell>William Howard</TableCell>
						<TableCell>Community Manager</TableCell>
						<TableCell>Vacation</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	);
}

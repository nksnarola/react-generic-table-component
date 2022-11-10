import { useState } from "react";
import "./App.css";
import Table from "./components/Table";

const tableSelect = {
	id: 1,
	created_at: 1,
	first_name: 1,
	last_name: 1,
	age: 1,
	gender: 1,
};

const tablePopulate = [
	{
		path: "child",
		select: ["first_name", "last_name"],
	},
];

function App() {
	const [filterObj] = useState({
		query: {
			age: "23",
			range: {
				created_at: [null, null],
			},
		},
		search: {
			keys: ["first_name", "last_name"],
			value: "search value",
		},
	});

	// Note : Change query and search values of filterObj according to Form or other need

	const columns = [
		{
			name: "First Name",
			minWidth: "200px",
			selector: (row) => <div>{row.first_name}</div>,
		},
		{
			name: "Last Name",
			minWidth: "200px",
			wrap: true,
			center: true,
			selector: (row) => <div>{row.last_name}</div>,
		},
		{
			name: <div className="text-wrap">Age</div>,
			minWidth: "130px",
			selector: (row) => <div>{row.age}</div>,
			id: "age",
			sortable: true,
		},
		{
			name: <div className="text-wrap">Gender</div>,
			minWidth: "130px",
			selector: (row) => <div>{row.gender}</div>,
		},
	];

	return (
		<div className="App">
			<h3>React Table Component</h3>
			<Table
				columns={columns}
				dataURL={"dataURL"}
				filter={filterObj}
				selectValues={tableSelect}
				populateValue={tablePopulate}
				sorting={{
					age: -1,
				}}
			/>
		</div>
	);
}

export default App;

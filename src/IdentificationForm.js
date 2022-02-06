import React, { useEffect, useState } from "react";
import useInputState from "./hooks/useInputState";
import { TextField, Button } from "@mui/material";

export default function IdentificationForm({ updateAnalysis, nextStep }) {
	const [ name, updateName ] = useInputState("");
	const [ group, updateGroup ] = useInputState("");
	const [ emptyName, setEmptyName ] = useState(false);
	const [ emptyGroup, setEmptyGroup ] = useState(false);

	useEffect(
		() => {
			document.title = `Hello ${name}`;
		},
		[ name ]
	);

	const handleSubmit = () => {
		if (!!name) { setEmptyName(false) }
		else { setEmptyName(true) }

		if (!!group) { setEmptyGroup(false) }
		else { setEmptyGroup(true) }

		if (name && group) {
			updateAnalysis({ name, group });
			nextStep();
		}
	};

	return (
		<div className="form-container">
			<h1>Análise de Improvisações</h1>

			<div>
				<TextField
					id="name"
					type="text"
					value={name}
					onChange={updateName}
					label="Nome"
					variant="standard"
					color="secondary"
					sx={{ mr: 4 }}
					required
					error={emptyName}
				/>
				<TextField
					id="group"
					type="text"
					value={group}
					onChange={updateGroup}
					label="Grupo"
					variant="standard"
					color="secondary"
					required
					error={emptyGroup}
				/>
			</div>

			<Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ mt: 4 }}>
				Próximo
			</Button>
		</div>
	);
}

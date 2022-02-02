import React, { useEffect } from "react";
import useInputState from "./hooks/useInputState";
import { TextField, Button } from "@mui/material";

export default function IdentificationForm({ updateAnalysis, nextStep }) {
	const [ name, updateName ] = useInputState("");
	const [ group, updateGroup ] = useInputState("");

	useEffect(
		() => {
			document.title = `Hello ${name}`;
		},
		[ name ]
	);

	const handleSubmit = () => {
		updateAnalysis({ name, group });
		nextStep();
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
				/>
				<TextField
					id="group"
					type="text"
					value={group}
					onChange={updateGroup}
					label="Grupo"
					variant="standard"
					color="secondary"
				/>
			</div>

			<Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ mt: 4 }}>
				Próximo
			</Button>
		</div>
	);
}

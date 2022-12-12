import React, { useState, useEffect } from "react";
import IdentificationForm from "./IdentificationForm";
import SelectMusic from "./SelectMusic";
import PresentAnalysis from "./PresentAnalysis";
import AnalyzeMusic from "./analyzeMusic/AnalyzeMusic";
import axios from "axios";

export default function Formflow() {
	const [ step, setStep ] = useState(1);
	const [ analysis, setAnalysis ] = useState({});
	const [ songs, setSongs ] = useState([]);
	const [ musicId, setMusicId ] = useState("");

	const baseURL = "https://d8gfn7.deta.dev/"
	const getURL = baseURL + "musics";
	const postURL = baseURL + "analysis";

	const nextStep = () => {
		setStep(step + 1);
	};

	const firstStep = () => {
		setStep(1);
	};

	const getSongs = () => {
		axios
			.get(getURL, { headers: { "Content-Type": "application/json" } })
			.then(function(response) {
				setSongs(response.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const updateAnalysis = (newResponse) => {
		setAnalysis({ ...analysis, ...newResponse });
	};

	const postAnalysis = () => {
		axios
			.post(postURL, JSON.stringify(analysis), { headers: { "Content-Type": "application/json" } })
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	useEffect(() => {
		getSongs();
	}, []);

	useEffect(
		() => {
			const result = songs.find((song) => song.music === analysis.music);
			if (result) {
				setMusicId(result.path);
			}
		},
		[ analysis.music ]
	);

	switch (step) {
		case 1:
			return <IdentificationForm nextStep={nextStep} updateAnalysis={updateAnalysis} />;
		case 2:
			return <SelectMusic songs={songs} nextStep={nextStep} updateAnalysis={updateAnalysis} />;
		case 3:
			return <AnalyzeMusic musicId={musicId} nextStep={nextStep} updateAnalysis={updateAnalysis} />;
		case 4:
			return <PresentAnalysis firstStep={firstStep} analysis={analysis} postAnalysis={postAnalysis} />;
		default:
			return <IdentificationForm nextStep={nextStep} updateAnalysis={updateAnalysis} />;
	}
}

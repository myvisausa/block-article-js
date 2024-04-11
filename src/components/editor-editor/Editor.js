import React, { useState, useEffect, useRef, useCallback } from "react";
import HeaderEditor from "../header-editor/HeaderEditor";
import axios from "axios";

// import tools for editor config
import { createEditorTools } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { json2cleanjson, cleanjson2md, md2json} from "md-json-converter";

export default function EditorEditor({ data, setData, uploadEndPoint, lastUploadedEndPoint }) {
	const [title, setTitle]  = useState(data.metadata.title);
	const [imageUrl, setImageUrl] = useState(data.metadata.ogImage)
	const [caption, setCaption] = useState(data.metadata.ogImageCaption)
	const [altDescription, setAltDescription] = useState(data.metadata.ogImageAlt)

	let initialData = json2cleanjson(data).bodyBlocks;


	const [lastData, setLastData] = useState(data);
	const [count, setCount] = useState(0);

	const editorCore = useRef(null);
	const ReactEditorJS = createReactEditorJS();

	const handleInitialize = useCallback(async (instance) => {
		try {
			await instance._editorJS.isReady;
			// set reference to editor
			editorCore.current = instance;
		} catch (err) {
			console.log("An error occurred", err);
		}
	}, []);

	useEffect(() => {
		if (lastData === data) {
			return;
		}
	
		const fetchDataAndUpdate = async () => {
			// 1. Make a copy of data
			let dataCopy = JSON.parse(JSON.stringify(data));
	
			// Use a loop that supports async operations
			for (const block of dataCopy.content) {
				// 3. For each 'block' inside of the content array, check if the 'text' key contains the substring '(undefined)'
				if (block.text && block.text.includes('(undefined)')) {
					// 4. If it does, replace '(undefined)' with 'TEST'
					try {
						const response = await axios.get(lastUploadedEndPoint)
						if (response.status !== 200) {
							throw new Error(`Failed to fetch image URL: ${response.statusText}`);
						}
						const imageUrl = response.data.url; // 
						block.text = block.text.replace('(undefined)', `(${imageUrl})`);
					} catch (error) {
						console.error('Error fetching image URL:', error);
						// Handle the error appropriately
					}
				}
			}
			// 5. Set the data to be the updated copy
			setData(dataCopy);
			setLastData(dataCopy);
			setCount(count + 1);
		};
		let rawText = JSON.stringify(data);
		console.log('Raw Text:', rawText);
		if (!rawText.includes('(undefined)')) {
			console.log('No undefined found')
			return;
		} else {
			console.log('Undefined found')
			fetchDataAndUpdate();
		}
	}, [data]);

	const handleSave = useCallback(async () => {
		// retrieve data inserted
		const savedData = await editorCore.current.save();
		const markdown = cleanjson2md(savedData);
		const content = md2json(markdown);
		const newData = {
			...data,
			content: content,
		};
		setData(newData);
	}, [setData]);

	useEffect(() => {
		const updateData = {
		  ...data,
		  metadata: {
			...data.metadata,
			title: title,
			ogImage: imageUrl,
			ogImageCaption: caption,
			ogImageAlt: altDescription,
		  }
		};
	  
		// Only update if the data has actually changed
		if (JSON.stringify(data) !== JSON.stringify(updateData)) {
		  setData(updateData);
		}
	  }, [title, imageUrl, caption, altDescription]); 
	return (
		<div key={count} className="editor-container">
			<h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
			<HeaderEditor uploadEndPoint={uploadEndPoint} title={title} setTitle={setTitle} imageUrl={imageUrl} setImageUrl={setImageUrl} caption={caption} setCaption={setCaption} altDescription={altDescription} setAltDescription={setAltDescription}/>
			<ReactEditorJS
				onInitialize={handleInitialize}
				tools={createEditorTools(uploadEndPoint)}
				onChange={handleSave}
				defaultValue={initialData}
			/>
		</div>
	);
}

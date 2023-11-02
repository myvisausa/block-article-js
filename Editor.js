import EditorEditor from "./components/editor-editor/Editor";
import Renderer from "./Renderer";

export default function Editor({ onDataChange, data, setData, uploadEndPoint, isEditMode}) {
	const handleDataChange = (updatedData) => {
		setData(updatedData);
		if (onDataChange) {
			onDataChange(updatedData);
		}
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center mt-1 m-4">
			<div className="col-12 mt-4" style={{ maxWidth: '1000px' }}>
				{isEditMode ? (
					<EditorEditor data={data} setData={handleDataChange} uploadEndPoint={uploadEndPoint} />
				) : (
					<Renderer data={data} />
				)}
			</div>
		</div>
	);
}

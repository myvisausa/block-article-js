import React, { useRef } from 'react';
import ContentEditableDiv from './ContentEditableDiv';

const EditableImage = ({ url, uploadEndPoint, onImageChange, caption, setCaption, altDescription, setAltDescription }) => {
    const fileInputRef = useRef(null);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await fetch(uploadEndPoint, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success === 1) {
                onImageChange(data.file.url);
            } else {
                console.error('Failed to upload image:', data);
            }
        } catch (err) {
            console.error('Error uploading the image:', err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='container' style={{maxWidth: '800px'}}>
            {url ? (
                <div>
                    <div
                            className='d-flex justify-content-center'
                            onClick={handleClick} 
                            onDrop={handleDrop} 
                            onDragOver={(e) => e.preventDefault()} 
                            style={{ maxWidth: '100%', height: 'auto', border: '1px dashed #ccc', padding: '0px' }}
                        >
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                            <img src={url} alt={altDescription} style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    </div>
                </div>
                ) : (
                <div>
                    <div 
                            onClick={handleClick} 
                            onDrop={handleDrop} 
                            onDragOver={(e) => e.preventDefault()} 
                            style={{ maxWidth: '100%', height: 'auto', border: '1px dashed #ccc', padding: '10px' }}
                        >
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                                Click or Drag & Drop Image
                            </div>
                    </div>
                </div>
                )}
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <ContentEditableDiv label="Caption:" content={caption} setContent={setCaption} />
                <ContentEditableDiv label="Alt description:" content={altDescription} setContent={setAltDescription} />
            </div>
        </div>
    );
};


export default EditableImage;

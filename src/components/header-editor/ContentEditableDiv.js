// EditableDiv.js

import React from 'react';

const EditableDiv = ({ label, content, setContent }) => {
    return (
        <label className='d-flex align-items-center'>
            <p className='pt-3'>{label}</p>
            <div 
                contentEditable 
                onBlur={(e) => setContent(e.target.innerText)}
                onFocus={() => {
                    if (!content) {
                        setContent(''); 
                    }
                }}
                suppressContentEditableWarning={true}
                style={{ 
                    marginLeft: '5px', 
                    paddingRight: '5px', 
                    border: '1px solid #ccc', 
                    minWidth: '150px',
                    maxWidth: '100%',
                    display: 'inline-block', 
                    outline: 'none',
                    wordWrap: 'break-word',
                    maxHeight: '100px',
                    overflowY: 'auto'
                }}
            >
                {content}
            </div>
        </label>
    );
};

export default EditableDiv;

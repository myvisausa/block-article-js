import React, { useRef, useEffect } from 'react';

const EditableTitle = ({ title, setTitle }) => {
    const titleRef = useRef(null);

    const handleBlur = () => {
        setTitle(titleRef.current.innerText);
    };

    useEffect(() => {
        const el = titleRef.current;
        if (el) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStart(el.childNodes[0], title.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }, [title]);

    return (
        <h1
            ref={titleRef}
            contentEditable
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
            style={{ cursor: 'text', outline: 'none', border: 'none', padding: '4px' }}
            onFocus={() => {
                titleRef.current.style.border = '1px dashed #ccc';
            }}
        >
            {title}
        </h1>
    );
};

export default EditableTitle;

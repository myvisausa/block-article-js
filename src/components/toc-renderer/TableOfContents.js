import React from 'react';

function extractHeaders(blocks) {
    return blocks
        .filter(block => block.type === 'header' && block.data.level === 2)
        .map(block => ({ text: block.data.text, id: block.id }));
}

const handleClick = (e, id, scrollOffset) => {
    e.preventDefault();
    const headerElement = document.getElementById(id);
    if (headerElement) {
        const offsetPosition = headerElement.offsetTop - scrollOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

export default function TableOfContents({ data, title, scrollOffset, bulletPoints=true }) {
    const headers = extractHeaders(data.blocks);
    if (headers.length === 0) {
        return (<></>)
    }
    if (bulletPoints) {
        return (
            <div className="table-of-contents">
                <h2>{title}</h2>
                <ul>
                    {headers.map(header => (
                        <li key={header.id}>
                            <a 
                                href={`#${header.id}`} 
                                className="toc-item"
                                onClick={(e) => handleClick(e, header.id, scrollOffset)}
                            >
                                {header.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <div className="table-of-contents">
                <h2>{title}</h2>
                {headers.map(header => (
                    <a 
                        key={header.id} 
                        href={`#${header.id}`} 
                        className="toc-item"
                        style={{ display: 'block', marginBottom: '10px' }}
                        onClick={(e) => handleClick(e, header.id)}
                    >
                        {header.text}
                    </a>
                ))}
            </div>
        );
    }
}
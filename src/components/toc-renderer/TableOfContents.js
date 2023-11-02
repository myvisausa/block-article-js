
function extractHeaders(blocks) {
    return blocks
        .filter(block => block.type === 'header' && block.data.level === 2)
        .map(block => ({ text: block.data.text, id: block.id }));
}

export default function TableOfContents({ data, title, bulletPoints=true }) {
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
                            <a href={`#${header.id}`} className="toc-item">
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
                    >
                        {header.text}
                    </a>
                ))}
            </div>
        );
    }
}



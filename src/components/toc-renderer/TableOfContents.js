import React, { useState } from 'react';
import styles from './tableOfContents.module.css';

function extractHeaders(blocks) {
    return blocks
        .filter(block => block.type === 'header' && block.data.level === 2 && block.data.text !== "omit")
        .map(block => ({ text: block.data.text, id: block.id }));
}

const handleClick = (id, scrollOffset) => {
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
    const [isExpanded, setIsExpanded] = useState(false);
    const headers = extractHeaders(data.blocks);
    
    return (
        <div className={styles.tableOfContents}>
            <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
                {title}
                <span style={{ marginLeft: '5px' }}>{isExpanded ? '▲' : '▼'}</span>
            </div> 
            <ul className={`${styles.list} ${isExpanded ? styles.expanded : ''}`}>
                {headers.map(header => (
                    <li 
                        key={header.id} 
                        className={styles.listItem}
                        onClick={() => handleClick(header.id, scrollOffset)}
                    >
                        {header.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
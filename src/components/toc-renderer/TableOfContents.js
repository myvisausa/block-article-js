import React, { useState } from 'react';
import styles from './tableOfContents.module.css';

function extractHeaders(blocks) {
    return blocks
        .filter(block => block.type === 'header' && block.data.level === 2 && block.data.text !== "omit")
        .map(block => ({ text: block.data.text, id: block.id }));
}

const handleClick = (id, scrollOffset, setSelectedHeader) => {
    const headerElement = document.getElementById(id);
    if (headerElement) {
        const offsetPosition = headerElement.offsetTop - scrollOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        setSelectedHeader(id);
    }
};

export default function TableOfContents({ data, title, scrollOffset }) {
    const headers = extractHeaders(data.blocks);
    const [selectedHeader, setSelectedHeader] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.header} onClick={() => setIsCollapsed(!isCollapsed)}>
                {title}
                <span className={styles.toggleButton}>
                    {isCollapsed ? '▲' : '▼'}
                </span>
            </div>
            <ul className={`${styles.list} ${!isCollapsed ? styles.expanded : ''}`}>
                {headers.map(header => (
                    <li
                        key={header.id}
                        className={`${styles.listItem} ${selectedHeader === header.id ? styles.selected : ''}`}
                        onClick={() => handleClick(header.id, scrollOffset, setSelectedHeader)}
                    >
                        {header.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
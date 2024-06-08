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

export default function TableOfContents({ data, title, scrollOffset, bulletPoints = true }) {
    const headers = extractHeaders(data.blocks);
    const [selectedHeader, setSelectedHeader] = useState(null);

    return (
        <div>
            <div className={styles.header}>
                {title}
            </div>
            <ul className={`${styles.list} ${styles.expanded}`}>
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

const parseCodeBlock = (lines, currentIndex) => {
    if (lines[currentIndex].trim() === "```") {
        let codeLines = [];
        currentIndex++;  // Move to next line
        while (currentIndex < lines.length && lines[currentIndex].trim() !== "```") {
            codeLines.push(lines[currentIndex]);
            currentIndex++;
        }
        if (currentIndex < lines.length) {
            currentIndex++;  // Skip the ending ```
        }
        return {
            block: {
                type: "code",
                code: codeLines.join("\n")
            },
            newIndex: currentIndex  // return the updated index
        };
    }
    return null;  // Not a code block
};

export default parseCodeBlock;
const parseSteps = (line) => {
    const stepsMatch = line.match(/\|STEPS title=(.+)\s+items=(.+)\s+STEPS\|/);
    if (stepsMatch) {
        return {
            type: "steps",
            title: stepsMatch[1],
            items: stepsMatch[2].split(',').map(item => item.trim())
        };
    }
};

export default parseSteps;
const originalConsoleError = console.error;

console.error = (...args) => {
    originalConsoleError(...args);
    throw new Error(`Console error: ${args.join(' ')}`);
};

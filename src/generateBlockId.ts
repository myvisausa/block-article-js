/**
 * A simple hash function to create deterministic IDs
 */
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to alphanumeric string (base 36) and ensure positive number
  return Math.abs(hash).toString(36).substring(0, 12);
};

// Counter to ensure uniqueness within a single document
let idCounter = 0;

/**
 * Generate a stable ID based on block content and type
 * This ensures consistent IDs between server and client renders
 */
export const generateBlockId = (block?: any): string => {
  if (!block) {
    // If no block data is provided, use a counter-based approach
    const counterStr = (idCounter++).toString().padStart(6, '0');
    return 'block-' + hashString(counterStr);
  }
  
  // Create a string representation of the block to hash
  const blockString = block.type + '-' + JSON.stringify(block.data || {});
  return hashString(blockString);
};
  
  
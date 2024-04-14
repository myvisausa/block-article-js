import fs from 'fs';
import md2cleanjson from '../src/md2cleanjson.js';
import json2md from '../src/json2md.js';
import json2cleanjson from '../src/json2cleanjson.js';
import cleanjson2md from '../src/cleanjson2md.js';
import data from './json.json' assert { type: 'json' };
import cleanData from './clean_json.json' assert { type: 'json' };

// Initialize markdown variable
let markdown;

// ------------------------------------------------------------------------------------------------------
// Test MD to clean JSON
// ------------------------------------------------------------------------------------------------------
const markdownContent = fs.readFileSync(new URL('../test/markdown_text.md', import.meta.url), 'utf-8');
let result = md2cleanjson(markdownContent);
result = JSON.parse(result);
console.assert(result.blocks.length === 22, 'ERROR! MD to clean JSON failed!!!!!!!');


// ------------------------------------------------------------------------------------------------------
// Test JSON to MD
// ------------------------------------------------------------------------------------------------------
markdown = json2md(data);
console.assert(markdown.length === 9294, 'ERROR! JSON to MD failed!!!!!!!');


// ------------------------------------------------------------------------------------------------------
// Test JSON to clean JSON
// ------------------------------------------------------------------------------------------------------
const cleanJSON = json2cleanjson(data);
console.assert('titleBlocks' in cleanJSON, 'ERROR! titleBlocks not present in cleanJSON');
console.assert('bodyBlocks' in cleanJSON, 'ERROR! bodyBlocks not present in cleanJSON');
console.assert(cleanJSON.titleBlocks.blocks.length === 2, 'ERROR! titleBlocks length is not 2');
console.assert(cleanJSON.bodyBlocks.blocks.length === 30, 'ERROR! bodyBlocks length is not 30');

// ------------------------------------------------------------------------------------------------------
// Test Clean JSON to MD
// ------------------------------------------------------------------------------------------------------
markdown = cleanjson2md(cleanData);
console.assert(markdown.length === 3470, 'ERROR! Clean JSON to MD failed!!!!!!!');
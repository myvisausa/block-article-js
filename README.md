# block-article-js
> A Block-Based ReactJS Editor and Renderer for Blog Posts and News Articles


## Adding new tools
### Steps described below, but essentially just follow the pattern of this PR
https://github.com/myvisausa/block-article-js/pull/3/files
### In md-json-converter
1. First add a new item to the test/clean_json.json fixture
2. Update the BlockFactory (src/parsers/body/parseBlocks.js)
3. Update the convertFromJSON (src/core/cleanjson2md/convertFromJson.js)
4. Update blocksToMarkdown (src/core/cleanjson2md/blocksToMarkdown.js)
5. Create the parser and add it to src/parsers/body/parseLine.js

## In editorjs-renderer
1. Update src/transforms.ts to include the new type

## Editor
#### Main Features
1. Creates a JSON object that contains page meta data (title, description, createdTime, modifiedTime), as well as all post/article content (see JSON example below)
2. Supports a dozen primary block types that are common on Medium.com's editor (including image, simpleImage and code)
3. The Editor requires a REST API endpoint for Image upload if you wish to drag and drop or select images to upload
#### Using the Editor
The Editor requires the following props: 
- onDataChange: Callback from the parent component in your application that should be called when data is changed
- data: A stateful json object in the block-article-js schema(see example below)
- setData: Updates data state
- uploadEndPoint: The REST API endpoint where uploaded images should be loaded
- isEditMode: A boolean. If true, is in edit mode. If false, data is displayed with the Renderer component (so you see exactly what the final rendered version will look like)

Example:
```
import React, { useState, useEffect } from 'react';
import EditorPage from "../../../../block-article-js/src/Editor";
import EditMenuBar from './EditorBar';
import saveData from '@/hooks/saveData'; // persist JSON data obj to db

export default function EditorPage() {
    const [data, setData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const uploadEndPoint = 'http://localhost:5252/api/uploadImage';

    const handleDataChange = (updatedData) => {
        setData(updatedData);
    };

    function toggleEditMode() {
        setIsEditMode(prevState => !prevState);
        console.log(`Edit mode is now ${isEditMode ? 'disabled' : 'enabled'}`);
    }

    return (
        <div>
            <EditorMenuBar {/* Buttons to toggle edit mode, do other things, etc*/}
                ...
                ...
            />
            <div className="col-12">
                <EditorPage 
                    onDataChange={handleDataChange} 
                    data={data} 
                    setData={setData} 
                    uploadEndPoint={uploadEndPoint}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                />
            </div>
        </div>
    );
}
```

## Renderer
#### Main Features
1. Renders the title as an H1 Header at the top of the component
2. Renders the ogImage below the title with its caption (if given)
3. Creates a table-of-contents where every H2 section is an item in the table of contents
    - Clicking the item in the table-of-contents scrolls to that section
#### Using the Renderer
1. Just pass in a JSON object 

Example:
```
export default function BlogPage({ data }) {
	return (
        <div>
            <Renderer data={data} />
        </div>
	);
}

```

## JSON Schema Example
#### Note: the faq section block has not yet been implemented. Once implemented, the questions and answers lists can be rendered in a collapsable accordion or in a component with columns and rows
```
{
  "postId": "0503f7ef-48b4-4eeb-aefb-f8d6f0fa01d8",
  "metadata": {
    "title": "Title",
    "description": "",
    "createdTime": "2023-10-30T11:33:31.055034",
    "modifiedTime": "2023-10-30T11:33:31.055034",
    "ogImage": "http://localhost:5252/api/uploads/image-3a901964-8091-4f0c-8b5a-d608b0d7a3c8.png",
    "ogImageCaption": "Image Caption",
    "ogImageAlt": "Image Description"
  },
  "content": [
    {
      "sectionId": "5288db70-e98d-45f5-b7f3-e1511b300e8b",
      "type": "default",
      "header": "Section Header 1",
      "text": "Some paragraph text with **bolded text** and _italicized text_.\n\nAnd some text with a [hyperlink](https://your-link-here.com).\n\nHere is a list:\n- Item 1\n- Item 2\n- Item 3\n",
      "summary": "",
      "lastEdited": "2023-10-30T11:33:31.055034"
    },
    {
      "sectionId": "64f5e89b-12a8-458c-992b-27ac0738045b",
      "type": "default",
      "header": "Section Header 2",
      "text": "What about if we have a list inside of a list?\n- Item 1\n- Item 2\n\nLooks like we can't do that...\n\nThis is code:\n```\nbin/build.sh &&\npython3.9 -m src.app\n```\n",
      "summary": "",
      "lastEdited": "2023-10-30T11:33:31.055034"
    },
    {
      "sectionId": "3e37fe3e-bf45-4a88-b423-fc09bd9e5b4b",
      "type": "faq",
      "header": "Frequently Asked Questions",
      "text": "<question>What is the first question</question>\n\n<answer>\nThis is the first line\n\nof the first answer\n</answer>   \n<question>\nWhat is the second question?\n</question>\n\n<answer>\nThe second answer contains a list. Here are its items:\n- Item 1\n- Item 2\n</answer>",
      "summary": "",
      "lastEdited": "2023-10-30T11:33:31.055034",
      "questions": [
        "What is the first question",
        "What is the second question?"
      ],
      "answers": [
        "This is the first line\n\nof the first answer",
        "The second answer contains a list. Here are its items:\n- Item 1\n- Item 2"
      ]
    }
  ]
}
```
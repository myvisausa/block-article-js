const exampleData = {
  "time": 1698383181082,
  "blocks": [
    {
      "id": "sheNwCUP5A",
      "type": "header",
      "data": {
        "text": "3 Ways to Stop Generative A.I. Hallucinations (That Don’t Require Fine-Tuning)",
        "level": 1
      }
    },
    {
      "id": "T1QnnxYeO7",
      "type": "header",
      "data": {
        "text": "Hallucination in Large Language Models (LLMs)",
        "level": 2
      }
    },
    {
      "id": "anJRUasweh",
      "type": "paragraph",
      "data": {
        "text": "Large Language Models (LLMs) are all the rave in 2023, with new or improved models being introduced almost every week. These deep learning algorithms, also known as deep neural networks, are highly generalizable and are increasingly being used in various industries. Some of the popular models include OpenAI’s GPT-3 and GPT-4, Google’s BARD, Meta’s LLaMA, AWS’s Titanic/Jurassic, and Google’s PaLM2."
      }
    },
    {
      "id": "iadmIVYqi5",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/1*a1cla_8hXBtPN_nayCEjGg.png",
        "caption": "GPT-4, which was released on March 14th, 2023, is widely regarded as the most powerful AI model in existence today",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "Tu0ASAPSJp",
      "type": "paragraph",
      "data": {
        "text": "LLMs are capable of generating vast amounts of content but they also have a tendency to “hallucinate” or make up data. The term “hallucination” gained popularity after the release of ChatGPT which brought generative AI into the spotlight. In the context of generative A.I., hallucination refers to the generation of false but correct-sounding content by LLMs due to their tendency to deliver invented data or facts with complete conviction."
      }
    },
    {
      "id": "Kn2dc3-0Um",
      "type": "header",
      "data": {
        "text": "Reasons for Hallucination",
        "level": 3
      }
    },
    {
      "id": "y0NuhQJsZW",
      "type": "paragraph",
      "data": {
        "text": "A.I. hallucinations are caused by a variety of factors, spanning from the size of the model and the size and characteristics of the training dataset, to contemporary models’ inability to understand the meaning of words to the same extent that humans can."
      }
    },
    {
      "id": "Y1f5JA2vLx",
      "type": "paragraph",
      "data": {
        "text": "LLMs, despite their large size (often having 100s of billions of parameters and taking up 100s of Gigabytes on a computer), are unable to store exact copies of their training datasets within their ‘weights.’ This means that models are (usually) unable to copy text or facts directly from the data they were trained on — instead, they generate something similar, based upon what is statistically probable, according to the prompt and the information contained in their model weights. This results in the model mixing and matching different words or phrases together, which were present in the training dataset, and creating outputs that sound convincing but are factually incorrect."
      }
    },
    {
      "id": "UHpiJY2cCZ",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/0*ZXj_OFaRAx92mvC9.png",
        "caption": "An example of a ChatGPT hallucination. When prompted to summarize a non-existent article (with a fake URL), ChatGPT generates a seemingly valid summary.",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "iFmq1njweo",
      "type": "paragraph",
      "data": {
        "text": "Besides that, training datasets often contain inadequate information on specific topics or conflicting information on a topic. If the training dataset didn’t contain sufficient data on the topic, even an ideal model would output incorrect information. If there was conflicting information in the dataset, an ideal model could output its training data verbatim and it would still be incorrect because of inaccuracies in the training dataset."
      }
    },
    {
      "id": "7EQM6U-y_O",
      "type": "header",
      "data": {
        "text": "Barriers to Fixing Hallucination",
        "level": 3
      }
    },
    {
      "id": "nrDAi9j9mB",
      "type": "paragraph",
      "data": {
        "text": "The training process of top-performing LLMs like GPT-4 takes many months and costs dozens or hundreds of millions of dollars. Because of this, the information contained within a model's weights (its ‘copy’ of the digital world) is always out of date. LLMs by themselves are thus incapable of generating accurate responses about current events, and keeping them up-to-date through retraining is impractical due to the high time and financial costs involved."
      }
    },
    {
      "id": "3t7S2kfLIw",
      "type": "paragraph",
      "data": {
        "text": "Moreover, as mentioned before, models do not have the storage capacity to keep exact copies of their training data. This makes hallucinations a difficult problem to solve since even perfect datasets and frequent retraining are not the correct medicine."
      }
    },
    {
      "id": "LFoxX-8DFC",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:612/0*6j_p8MjUDFILFPt4",
        "caption": "Frequent Retraining? Mmm, no thanks!",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "CJb0GxBoNo",
      "type": "header",
      "data": {
        "text": "Is there a solution?",
        "level": 3
      }
    },
    {
      "id": "DXufEdrFC-",
      "type": "paragraph",
      "data": {
        "text": "Yes. Despite the inherent limitations of text generation models, there are a variety of ways to reduce and even eliminate A.I. hallucinations."
      }
    },
    {
      "id": "MfCql0ldGj",
      "type": "paragraph",
      "data": {
        "text": "In this article, I will present three techniques that I have been using during the development of&nbsp;<a href=\"https://my-visa-usa.com/en/news/my-visa-usa-announces-visa-gpt\" target=\"_blank\">VisaGPT</a>, a tool that&nbsp;<a href=\"https://my-visa-usa.com/\" target=\"_blank\">My-Visa-USA</a>&nbsp;plans to debut later this year. These techniques have been demonstrated to reduce hallucinations in A.I. research, and I’ve used them to great success thus far. In addition, these techniques don’t require that you retrain or fine-tune a model, which means that the capital expenditures you need to reduce hallucinations in your generative A.I. system are pretty low."
      }
    },
    {
      "id": "N8Wz9tzN08",
      "type": "header",
      "data": {
        "text": "Retrieval Augmented Generation (RAG)",
        "level": 2
      }
    },
    {
      "id": "MD6cwn-p7X",
      "type": "header",
      "data": {
        "text": "What is Retrieval Augmented Generation?",
        "level": 3
      }
    },
    {
      "id": "RD3iQvY25K",
      "type": "paragraph",
      "data": {
        "text": "Retrieval Augmented Generation (RAG) is an AI framework wherein facts are retrieved from external knowledge bases and are given to large language models so that they have the context they need to produce a factual response. It is one of the most effective techniques to reduce hallucinations in LLMs."
      }
    },
    {
      "id": "rTzQouclGw",
      "type": "paragraph",
      "data": {
        "text": "Companies can implement a RAG strategy with internet data with no investment through Internet-retrieval connectors like Bing search or via ChatGPT plugins. For more sensitive information or proprietary data, companies can implement their own in-house solutions where their information is stored in the vector database and retrieved through their own similarity search system."
      }
    },
    {
      "id": "mmyavcv8Ix",
      "type": "header",
      "data": {
        "text": "How does RAG Work?",
        "level": 3
      }
    },
    {
      "id": "G35Ia_nsIr",
      "type": "paragraph",
      "data": {
        "text": "In this framework, similar documents or data are retrieved from the database using vector search. These documents, or summaries of these documents, are combined with the original prompt or message to ‘ground’ the model and allow it to generate a more factual response."
      }
    },
    {
      "id": "2b2RoPoE9J",
      "type": "paragraph",
      "data": {
        "text": "An alternate approach within RAG incorporates fact-checking where the answer provided by the model is reviewed against data in the vector database. This adds an additional layer of validation and helps ensure that generated content is accurate and reliable."
      }
    },
    {
      "id": "Tbmoiy2hF2",
      "type": "header",
      "data": {
        "text": "The Two Phases of RAG",
        "level": 3
      }
    },
    {
      "id": "33owdrfpY-",
      "type": "paragraph",
      "data": {
        "text": "Phase 1: The Retrieval Phase"
      }
    },
    {
      "id": "FX23j-Uell",
      "type": "paragraph",
      "data": {
        "text": "The retrieval phase involves searching for and retrieving relevant information based on a user’s prompt or question. Sources can range from indexed documents on the internet in an open-domain setting to a narrower set of sources in a closed-domain setting for added security and reliability."
      }
    },
    {
      "id": "9xogyTCmVs",
      "type": "paragraph",
      "data": {
        "text": "RAG uses similarity search, which functions by creating a vector embedding from all, or a piece, of the prompt or message. The most similar embeddings in the knowledge base, or vector database, are then found, and their text is retrieved."
      }
    },
    {
      "id": "RGH6dpR0wC",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/0*Oxvfg1dldiY1uF-V.png",
        "caption": "Pinecone.io is a popular paid Vector DB service. In their schematic here, part or all of the prompt or user message is used as a query to the Embedding Model. The vector embedding is then compared against vectors in the vector database to return the most relevant pieces of text.",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "8mNwBOgpcQ",
      "type": "paragraph",
      "data": {
        "text": "Phase 2: The Generative Phase (Context Injection)"
      }
    },
    {
      "id": "8cRKnmmdKs",
      "type": "paragraph",
      "data": {
        "text": "In the generative phase, the text retrieved during the retrieval phase is then supplied or ‘injected’ as additional context information into the prompt. Lack of context is a primary reason for hallucinations in LLMs, and context injection improves the efficiency of LLMs by adding more information to the prompt."
      }
    },
    {
      "id": "y20gIuHAHY",
      "type": "paragraph",
      "data": {
        "text": "This technique can be used to feed more information about work such as text, code, or data into an LLM. RAG ensures access to current, reliable facts. Since responses to RAG are based upon retrieved text, the retrieved text can also be displayed or referenced in the output, allowing users to check the model’s sources and verify the response accuracy."
      }
    },
    {
      "id": "wA4y_cbu8v",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/1*LKiL5rumFSZwT_ZIaQMJSw.png",
        "caption": "Providing context to the model is as easy as appending the text to the prompt!",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "QPSxN7yWQL",
      "type": "header",
      "data": {
        "text": "Chain of Thought (CoT) Prompting",
        "level": 2
      }
    },
    {
      "id": "bXg-HBqBGR",
      "type": "header",
      "data": {
        "text": "What is Chain of Thought (CoT) Prompting?",
        "level": 3
      }
    },
    {
      "id": "hQRXm8v1Ab",
      "type": "paragraph",
      "data": {
        "text": "Chain of Thought (CoT) Prompting is a method developed by Google researchers to enhance the reasoning capabilities of large language models. It allows language models to tackle complex reasoning tasks that cannot be solved with standard prompting techniques. The enhanced performance provided through CoT prompting results in more factual outputs than traditional prompting strategies. It is a popular strategy because it doesn’t require the set-up of any additional systems, which means that anyone can use it no matter their A.I. or software engineering experience."
      }
    },
    {
      "id": "OFYFvU9q4d",
      "type": "header",
      "data": {
        "text": "How does CoT Work?",
        "level": 3
      }
    },
    {
      "id": "OfU1b-dSZL",
      "type": "paragraph",
      "data": {
        "text": "CoT works by breaking down multi-step problems into intermediate steps. By providing an LLM with both the problem and the method of solving it, the model can produce a more accurate answer and share the reasoning behind it. CoT encourages the model to follow a structured thought process that mimics human reasoning."
      }
    },
    {
      "id": "mMxHts9VMN",
      "type": "paragraph",
      "data": {
        "text": "The essence of CoT lies in decomposing multi-step problems into smaller steps. When you provide an LLM with both a problem and a method for solving it, it can produce an answer that is more likely to be accurate and also share its reasoning behind it."
      }
    },
    {
      "id": "Cmfq00vqAI",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/1*_xNLH1PkY_v5WWJ3qhmIYA.png",
        "caption": "In this example of CoT by Wei et al., the model is instructed to show the logic behind the calculation as an intermediate step before producing the result.",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "LWTe_Ugnx8",
      "type": "paragraph",
      "data": {
        "text": "Chain of Thought Prompting encourages the model to follow a structured thought process that mimics human reasoning. This structured approach helps in breaking down complex tasks into manageable chunks, thereby enhancing the accuracy and reliability of generated content."
      }
    },
    {
      "id": "aeeBRn2ci2",
      "type": "paragraph",
      "data": {
        "text": "In comparison with few-shot &amp; standard prompting methods, which provide a language model with examples of input-output pairs, CoT prompts the model to produce intermediate reasoning steps before delivering the final answer to a multi-step problem. This also makes it easier for users to understand how the model arrived at its conclusion, which increases user trust in the model’s outputs."
      }
    },
    {
      "id": "OXbko1m6bA",
      "type": "header",
      "data": {
        "text": "The Tie-Breaker Technique",
        "level": 2
      }
    },
    {
      "id": "cGHDdfFIHu",
      "type": "header",
      "data": {
        "text": "What is the Tie-Breaker Technique?",
        "level": 3
      }
    },
    {
      "id": "q-4_9Fg38w",
      "type": "paragraph",
      "data": {
        "text": "The Tie-Breaker Technique is a prompting method used to reduce hallucination in Large Language Models. To use this method, you first provide two distinct prompts to the model to evaluate the same piece of content. The first prompt ‘nudges’ the model to come to an affirmative response, and the other ‘nudges’ the model to come to a negative response. If initial prompts yield contradictory results, a third neutral prompt serves as a tie-breaker."
      }
    },
    {
      "id": "7sB4sd5ks8",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/1*fgnjHd_ezCoQsQO8XLGDzg.png",
        "caption": "Nudging is a technique to influence behavior. It’s at play all around us, but we hardly notice. Nudging a model is the same general concept!",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "O1LDAMmVwL",
      "type": "header",
      "data": {
        "text": "How Does the Tie-Breaker Technique Work?",
        "level": 3
      }
    },
    {
      "id": "1KgEV4aZiA",
      "type": "paragraph",
      "data": {
        "text": "The Tie-Breaker Technique works by eliminating factually incorrect responses through repetition and mitigation of biases. By using redundancy and validation through consistent results from different prompts, many low-level hallucinations can be eliminated."
      }
    },
    {
      "id": "fElj2x1HeD",
      "type": "paragraph",
      "data": {
        "text": "This method takes advantage of the tendency of LLM outputs to be impacted by the prompt they receive. This is played to the prompter’s advantage through prompts that ‘nudge’ the model in a certain direction. It’s similar to adjusting the sensitivity value on a traditional detection algorithm — when we increase the sensitivity, we’re more likely to get false positives but we’re less likely to miss positives. Similarly, if we nudge the model towards finding an inaccuracy, it’s more likely to find a true inaccuracy that exists (but at the risk of finding a false inaccuracy — which is why we use a contrasting prompt that nudges the model in the opposite direction)."
      }
    },
    {
      "id": "2Kh1y8s0lR",
      "type": "paragraph",
      "data": {
        "text": "By designing prompts that lean both towards affirming and negating the content’s accuracy, you’re exploiting the influence of the prompt on the output. The goal is to see if the model’s interpretation is consistent regardless of the way the question is framed."
      }
    },
    {
      "id": "9ieocXmwV6",
      "type": "paragraph",
      "data": {
        "text": "In systems that use GPT-4 alone, GPT-3.5 may be sufficient for the initial dual prompts, while GPT-4 should continue to be used for the tie-breaker. Since GPT-3.5 is about 1/60th the price of GPT-4 (and quite a bit faster), this technique can allow you to significantly reduce your GPT-4 usage, which makes your prompt chains run faster and saves a lot of money."
      }
    },
    {
      "id": "-OflLa8iqJ",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/1*kdL8MnhnDWyjaWRPPAtfBA.png",
        "caption": "Ian Fleming, the author of the James Bond series, once famously said, “Once is happenstance. Twice is coincidence. Three times is enemy action”.",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "lnOufCGzWy",
      "type": "paragraph",
      "data": {
        "text": "The rationale behind his statement was the same as the rationale behind the repeatability principle of the scientific method. That is, things that can be repeated are more likely to be ‘true’ rather than due to chance. When applied to LLMs, keep in mind that the ‘truth’ is relative to the training dataset and not to a objective truth."
      }
    },
    {
      "id": "6g-Nf-v2Zn",
      "type": "header",
      "data": {
        "text": "How do you use the Tie-Breaker Technique?",
        "level": 3
      }
    },
    {
      "id": "Upm9eUGEm-",
      "type": "paragraph",
      "data": {
        "text": "Using this technique involves three steps:"
      }
    },
    {
      "id": "fvJ--LtW0k",
      "type": "list",
      "data": {
        "style": "ordered",
        "items": [
          "Design contrasting prompts."
        ]
      }
    },
    {
      "id": "T-jO6e4Enf",
      "type": "code",
      "data": {
        "code": "Positive/Affirming Prompt = f\"Carefully analyze the text below, paying attention to every statement made and fact presented.\nCompare the text to other similar texts on {topic} from sources such as {official sources}.\n\n{text}\n\nList all inaccuracies contained in the text.\""
      }
    },
    {
      "id": "_HLtikwdnv",
      "type": "code",
      "data": {
        "code": "Negative/Negating Prompt = f\"Carefully analyze the text below, paying attention to every statement made and fact presented.\nCompare the text to other similar texts on {topic} from sources such as {official sources}.\n\n{text}\n\nIs there any incorrect information presented or is the text accurate?\""
      }
    },
    {
      "id": "uLJh5C283E",
      "type": "paragraph",
      "data": {
        "text": "2. Present both prompts to the model with the text."
      }
    },
    {
      "id": "D36XuFZh5h",
      "type": "paragraph",
      "data": {
        "text": "3. Use a neutral tie-breaker prompt if initial results are contradictory."
      }
    },
    {
      "id": "WmTJNRLJKN",
      "type": "code",
      "data": {
        "code": "Neutral/Tie-Breaker Prompt =f\"The statements below pertain to {topic}. Reliable sources of information on this topic include {sources}.\n\nFor each statement, return True if the statement is true or correct, or false if the statement is false or incorrect.\""
      }
    },
    {
      "id": "3aWpY21AbF",
      "type": "header",
      "data": {
        "text": "Considerations when using this Technique",
        "level": 3
      }
    },
    {
      "id": "CDte5tQgB6",
      "type": "paragraph",
      "data": {
        "text": "While this technique can significantly reduce hallucinations in LLMs, there are some considerations you need to keep in mind:"
      }
    },
    {
      "id": "Xw0wDUBxK1",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          "Neutrality of Tie-Breaker:&nbsp;The effectiveness of this technique depends on the neutrality of the tie-breaker, requiring careful framing to avoid bias.",
          "Complex Texts:&nbsp;Longer or intricate texts may challenge comprehensive processing, leading to potential inaccuracies. If you’re dealing with long texts, consider chunking them and processing them sequentially if using GPT-4, or parallel multiprocessing if using GPT-3.5 (because of its much higher rate limit).",
          "Still Model-Dependent:&nbsp;Despite risk reduction, the final decision remains model-dependent, which means there is still a risk of hallucination that is larger than the risk that remains when using RAG techniques."
        ]
      }
    },
    {
      "id": "LiQ9xx73Gw",
      "type": "header",
      "data": {
        "text": "Final Thoughts",
        "level": 2
      }
    },
    {
      "id": "AdbecNwGqK",
      "type": "paragraph",
      "data": {
        "text": "As you probably have discovered yourself, the inherent challenge with Large Language Models (LLMs) is their tendency to hallucinate. However, with the proper techniques and strategies, it’s possible to significantly reduce these hallucinations and increase the accuracy of generated content."
      }
    },
    {
      "id": "hfX2CBWn4H",
      "type": "paragraph",
      "data": {
        "text": "The importance of accurate information retrieval for various AI applications cannot be overstated. User trust in AI systems is directly linked to the accuracy and reliability of the information they provide. The three methods discussed in this article — Retrieval Augmented Generation (RAG), Chain of Thought (CoT) Prompting, and The Tie-Breaker Technique — can be used to ground LLMs on external knowledge sources, break down reasoning into structured, step-by-step processes, and use dual-prompting and neutral validation for accurate content evaluation."
      }
    },
    {
      "id": "n4wTPo55ck",
      "type": "paragraph",
      "data": {
        "text": "Remember — crafting effective prompt chains is both an art and a science. As models evolve, so too should our techniques. RAG, CoT, and the tie-breaker technique are scalable solutions to reduce or eliminate hallucinations that are more cost-effective than re-training an LLM on proprietary and third-party knowledge. Depending on the specific use case, they are often more cost-effective and accurate than fine-tuning as well."
      }
    },
    {
      "id": "8DmLM1qUcV",
      "type": "simpleImage",
      "data": {
        "url": "https://miro.medium.com/v2/resize:fit:700/1*r0BwsP-UGAOfEj3kBuxQDg.png",
        "caption": "Hey OpenAI! Can you stop breaking my prompt chains already?!",
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "JvIe5kzJr0",
      "type": "paragraph",
      "data": {
        "text": "As you create your prompt-chains, keep in mind that it is an iterative process involving constant evaluation, refinement, and adaptation due to changing models (or model updates) and changing information (the world keeps advancing). Take your time, try different prompts and strategies, and don’t forget to monitor your performance. Finally, don’t forget that tuning parameters like “temperature” can make a Large Language Model less imaginative while lowering top-p can make it only consider more probable responses."
      }
    },
    {
      "id": "WN8_k7_ssv",
      "type": "paragraph",
      "data": {
        "text": "As you explore and experiment, remember that reducing hallucination in LLMs is a critical step towards building more reliable and trustworthy AI systems. I wish you success on your Generative AI journey!"
      }
    }
  ],
  "version": "2.28.2"
};
  
  export default exampleData;
  
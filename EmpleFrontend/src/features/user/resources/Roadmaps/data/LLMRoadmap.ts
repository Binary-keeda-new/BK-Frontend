/**
 * Large Language Models (LLM) Roadmap
 * Includes both '3months' and '3 months' keys for UI compatibility.
 */

const mainContent = [
  {
    id: 1,
    week: 'Week 1',
    title: 'Transformer Architecture Deep Dive',
    points: 80,
    objectives: [
      'Understand self-attention mechanism',
      'Learn positional encoding',
      'Study encoder-decoder architecture'
    ],
    content: `<h3>The Transformer</h3><p>Every modern LLM is built on the transformer architecture introduced in "Attention is All You Need" (2017). Understanding it deeply is essential.</p><h4>Self-Attention:</h4><p>Each token attends to every other token in the sequence, computing a weighted sum based on relevance. Uses Query, Key, and Value matrices.</p><h4>Multi-Head Attention:</h4><p>Run attention multiple times in parallel with different learned projections, capturing different relationship types.</p><h4>Feed Forward Layers, Layer Norm, Residual Connections:</h4><p>These components stabilize training and allow very deep networks.</p>`,
    resources: {
      websites: [
        { title: 'The Illustrated Transformer — Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/' },
        { title: 'Attention is All You Need — Original Paper', url: 'https://arxiv.org/abs/1706.03762' }
      ],
      videos: [
        { title: 'Attention is All You Need Explained — Yannic Kilcher', url: 'https://www.youtube.com/embed/iDulhoQ2pro', dur: '1 hr' },
        { title: 'Andrej Karpathy — Lets Build GPT: from Scratch, in code, spelled out', url: 'https://www.youtube.com/embed/kCc8FmEb1nY', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w1-e1',
          question: 'What paper introduced the Transformer architecture in 2017?',
          type: 'mcq',
          options: ['Attention is All You Need', 'BERT: Pre-training of Deep Bidirectional Transformers', 'Language Models are Few-Shot Learners', 'Deep Residual Learning for Image Recognition'],
          ans: 0
        },
        {
          id: 'llm-w1-e2',
          question: 'Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w1-m1',
          question: 'What are the three core matrices used to calculate self-attention?',
          type: 'mcq',
          options: ['Input, Output, Hidden', 'Query, Key, Value', 'Weight, Bias, Activation', 'Encoder, Decoder, Attention'],
          ans: 1
        },
        {
          id: 'llm-w1-m2',
          question: 'Which of the following elements help stabilize gradient flow in deep Transformer architectures? (Select all that apply)',
          type: 'msq',
          options: ['Residual connections', 'Layer Normalization', 'Dropout', 'Recursive loops'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'llm-w1-h1',
          question: 'What is the primary purpose of positional encoding in Transformers?',
          type: 'mcq',
          options: [
            'To limit the length of input text sequences',
            'To inject information about the relative or absolute position of tokens in the sequence, since attention layers do not process tokens sequentially',
            'To translate tokens to foreign languages',
            'To calculate cross-entropy loss'
          ],
          ans: 1
        },
        {
          id: 'llm-w1-h2',
          question: 'What is a key difference between the Encoder and Decoder in the original Transformer architecture?',
          type: 'mcq',
          options: [
            'The Encoder processes tokens sequentially; the Decoder processes them in parallel',
            'The Decoder uses masked self-attention to prevent looking at future tokens during generation; the Encoder uses unmasked bidirectional self-attention',
            'The Encoder only handles numbers; the Decoder only handles text',
            'The Encoder does not contain feedforward layers'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 2,
    week: 'Week 2',
    title: 'Prompt Engineering Fundamentals',
    points: 70,
    objectives: [
      'Master zero-shot and few-shot prompting',
      'Apply chain-of-thought reasoning',
      'Use system prompts effectively'
    ],
    content: `<h3>Prompt Engineering</h3><p>Prompt engineering is the art of communicating with LLMs effectively. The quality of your prompt dramatically affects output quality.</p><h4>Core Techniques:</h4><ul><li><strong>Zero-shot:</strong> Just ask — no examples</li><li><strong>Few-shot:</strong> Provide examples in the prompt</li><li><strong>Chain-of-thought:</strong> "Let's think step by step" — improves reasoning</li><li><strong>System prompts:</strong> Set persona and constraints</li><li><strong>Structured output:</strong> Ask for JSON, markdown tables</li></ul><h4>Advanced:</h4><ul><li>ReAct (Reasoning + Acting)</li><li>Self-consistency — sample multiple times and vote</li><li>Tree of Thoughts</li></ul>`,
    resources: {
      websites: [
        { title: 'Prompt Engineering Guide — DAIR.AI', url: 'https://www.promptingguide.ai' },
        { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        { title: 'Chain-of-Thought Prompting — Google Paper', url: 'https://arxiv.org/abs/2201.11903' }
      ],
      videos: [
        { title: 'Prompt Engineering — Andrew Ng + OpenAI', url: 'https://www.youtube.com/embed/_ZvnD73m40o', dur: '1.5 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w2-e1',
          question: 'Which prompting technique provides a few examples in the prompt to show the model how to respond?',
          type: 'mcq',
          options: ['Zero-shot prompting', 'Few-shot prompting', 'Negative prompting', 'Instruction tuning'],
          ans: 1
        },
        {
          id: 'llm-w2-e2',
          question: '"Let\'s think step by step" is a simple phrase that triggers Chain-of-Thought prompting.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w2-m1',
          question: 'What is the role of a system prompt in chat completions?',
          type: 'mcq',
          options: [
            'It is where the user writes their query',
            'It configures the model\'s background persona, behavioral constraints, and instructions before user input begins',
            'It tracks server CPU usage',
            'It increases the temperature of the model'
          ],
          ans: 1
        },
        {
          id: 'llm-w2-m2',
          question: 'Which of the following are advanced prompting strategies? (Select all that apply)',
          type: 'msq',
          options: ['ReAct (Reasoning + Acting)', 'Self-Consistency voting', 'Tree of Thoughts', 'Random input concatenation'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'llm-w2-h1',
          question: 'How does Tree of Thoughts (ToT) expand upon Chain-of-Thought (CoT)?',
          type: 'mcq',
          options: [
            'By representing prompt templates as HTML trees',
            'By generating and exploring multiple reasoning paths (branches) in a tree structure, allowing self-evaluation and backtracking',
            'By translating prompts into programming languages',
            'ToT is a training model, not a prompting strategy'
          ],
          ans: 1
        },
        {
          id: 'llm-w2-h2',
          question: 'How does high temperature (e.g. 1.2) affect LLM generation?',
          type: 'mcq',
          options: [
            'It decreases token generation speed',
            'It flattens the probability distribution over potential next tokens, leading to more creative and diverse outputs',
            'It strictly forces the model to pick only the single highest-probability token',
            'It causes the model to throw out-of-memory errors'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 3,
    week: 'Week 3',
    title: 'OpenAI API & LangChain Basics',
    points: 70,
    objectives: [
      'Use OpenAI/Anthropic API',
      'Build chains with LangChain',
      'Work with chat history and memory'
    ],
    content: `<h3>Building with LLM APIs</h3><p>Rather than running models locally (expensive), you call APIs. OpenAI, Anthropic, and Google all offer powerful LLM APIs.</p><h4>LangChain:</h4><p>The most popular framework for building LLM applications. Provides abstractions for chains, agents, memory, and tool use.</p><h4>Key Concepts:</h4><ul><li>Chat completions API — messages array with role/content</li><li>Temperature (randomness) and max_tokens</li><li>Function calling / tool use</li><li>Streaming responses</li></ul>`,
    resources: {
      websites: [
        { title: 'OpenAI API Docs', url: 'https://platform.openai.com/docs' },
        { title: 'LangChain Official Docs', url: 'https://python.langchain.com/docs/get_started/introduction' }
      ],
      videos: [
        { title: 'LangChain Crash Course — Greg Kamradt', url: 'https://www.youtube.com/embed/_v_fgW2SkkQ', dur: '1.5 hr' },
        { title: 'Build LLM Apps — freeCodeCamp', url: 'https://www.youtube.com/embed/RoR4XJw8wIc', dur: '3 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w3-e1',
          question: 'Which API parameter limits the maximum length of generated text responses?',
          type: 'mcq',
          options: ['temperature', 'top_p', 'max_tokens', 'presence_penalty'],
          ans: 2
        },
        {
          id: 'llm-w3-e2',
          question: 'LangChain is a library primarily designed to build chains and orchestrate integrations between LLMs and external tools.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w3-m1',
          question: 'What is the purpose of "Function Calling" (or Tool Calling) in LLM APIs?',
          type: 'mcq',
          options: [
            'It enables the model to write and execute code inside the API server directly',
            'It allows the model to output a structured JSON object containing function parameters to call external functions in local application code',
            'It compiles the python code to javascript',
            'It runs SQL queries on the remote database'
          ],
          ans: 1
        },
        {
          id: 'llm-w3-m2',
          question: 'Which of the following are standard roles in a chat completions messages array? (Select all that apply)',
          type: 'msq',
          options: ['system', 'user', 'assistant', 'admin'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'llm-w3-h1',
          question: 'Which LangChain module is used to handle chat history and context retention across multiple turns in a conversation?',
          type: 'mcq',
          options: ['Prompts', 'Indexes', 'Memory', 'Document Loaders'],
          ans: 2
        },
        {
          id: 'llm-w3-h2',
          question: 'What is a key security concern when allowing an LLM to generate and run python code dynamically?',
          type: 'mcq',
          options: [
            'The code will compile too slowly',
            'Arbitrary Remote Code Execution (RCE) if the execution environment is not properly sandboxed and isolated',
            'The database queries will return duplicate records',
            'HTML code rendering conflicts'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 4,
    week: 'Week 4',
    title: 'RAG — Retrieval Augmented Generation',
    points: 80,
    objectives: [
      'Build a RAG pipeline from scratch',
      'Use vector databases (Pinecone, ChromaDB)',
      'Implement semantic search with embeddings'
    ],
    content: `<h3>Retrieval Augmented Generation</h3><p>RAG solves the "knowledge cutoff" and "hallucination" problem by giving the LLM access to your private data at query time.</p><h4>RAG Pipeline:</h4><ul><li><strong>Indexing:</strong> Chunk documents → create embeddings → store in vector DB</li><li><strong>Retrieval:</strong> Embed query → similarity search → get top-k relevant chunks</li><li><strong>Generation:</strong> Inject retrieved context into prompt → LLM generates answer</li></ul><h4>Vector Databases:</h4><ul><li><strong>Pinecone:</strong> Managed cloud vector DB</li><li><strong>ChromaDB:</strong> Open-source, easy local setup</li><li><strong>Weaviate, Qdrant:</strong> Other popular options</li></ul>`,
    resources: {
      websites: [
        { title: 'ChromaDB Docs', url: 'https://docs.trychroma.com' },
        { title: 'RAG Survey Paper', url: 'https://arxiv.org/abs/2312.10997' }
      ],
      videos: [
        { title: 'RAG from Scratch — LangChain', url: 'https://www.youtube.com/embed/sVcwVQRHIc8', dur: '1 hr' },
        { title: 'Vector Databases — Fireship', url: 'https://www.youtube.com/embed/klTvEwg3oJ4', dur: '7 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w4-e1',
          question: 'What does RAG stand for?',
          type: 'mcq',
          options: ['Random Access Generation', 'Retrieval Augmented Generation', 'Response Analysis Grid', 'Recurrent Attention Graph'],
          ans: 1
        },
        {
          id: 'llm-w4-e2',
          question: 'Vector databases perform similarity searches based on vector distance metrics like cosine similarity.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w4-m1',
          question: 'How does RAG help solve the LLM hallucination and knowledge cutoff problems?',
          type: 'mcq',
          options: [
            'By retraining the model weights every day',
            'By fetching relevant documents matching the query and injecting them as context into the prompt, grounding the model\'s response',
            'By increasing model parameter size dynamically',
            'By compressing the prompts'
          ],
          ans: 1
        },
        {
          id: 'llm-w4-m2',
          question: 'Which of the following are popular vector databases? (Select all that apply)',
          type: 'msq',
          options: ['Pinecone', 'ChromaDB', 'Redis', 'MongoDB'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'llm-w4-h1',
          question: 'What is a key difference between document chunking strategies (e.g. character-based vs recursive character text splitter)?',
          type: 'mcq',
          options: [
            'Character-based splits strictly at count; recursive character splits intelligently at paragraphs, sentences, and words to maintain semantic integrity',
            'Character-based is only for word files',
            'Recursive splitter is slower and not used in production',
            'There is no difference'
          ],
          ans: 0
        },
        {
          id: 'llm-w4-h2',
          question: 'What is semantic search in a RAG pipeline?',
          type: 'mcq',
          options: [
            'Searching text by matching exact keywords',
            'Searching text by converting the query into an embedding vector and finding database vectors with the closest angular similarity (meaning)',
            'Regular expression matching on text files',
            'Fuzzy string replacement'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 5,
    week: 'Week 5',
    title: 'LLM Fine-Tuning',
    points: 90,
    objectives: [
      'Understand when to fine-tune vs prompt',
      'Fine-tune with LoRA and QLoRA',
      'Use Hugging Face PEFT library'
    ],
    content: `<h3>Fine-Tuning LLMs</h3><p>Fine-tuning adapts a pretrained LLM to your specific task or style. Modern techniques make it possible on consumer GPUs.</p><h4>When to Fine-Tune:</h4><ul><li>Specific tone, format, or style required</li><li>Domain-specific knowledge (medical, legal)</li><li>When prompt engineering isn't enough</li></ul><h4>LoRA (Low-Rank Adaptation):</h4><p>Instead of updating all parameters (billions), LoRA trains small adapter matrices. Dramatically reduces memory and compute requirements.</p><h4>QLoRA:</h4><p>Quantized LoRA — run on even smaller GPUs by quantizing the base model to 4-bit.</p>`,
    resources: {
      websites: [
        { title: 'Hugging Face PEFT Docs', url: 'https://huggingface.co/docs/peft' },
        { title: 'LoRA Paper Explained', url: 'https://arxiv.org/abs/2106.09685' }
      ],
      videos: [
        { title: 'Fine-Tuning LLMs — Hugging Face', url: 'https://www.youtube.com/embed/eC6Hd1hFvos', dur: '1.5 hr' },
        { title: 'QLoRA Fine-Tuning — 1littlecoder', url: 'https://www.youtube.com/embed/Us5ZFp16PaU', dur: '40 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w5-e1',
          question: 'What does LoRA stand for in Parameter-Efficient Fine-Tuning?',
          type: 'mcq',
          options: ['Large Output Reduction Algorithm', 'Low-Rank Adaptation', 'Local Recurrent Attention', 'Language Output Reference Alignment'],
          ans: 1
        },
        {
          id: 'llm-w5-e2',
          question: 'QLoRA allows running fine-tuning jobs on consumer GPUs by quantizing the base model weights to 4-bit precision.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w5-m1',
          question: 'When is fine-tuning generally preferred over prompting or RAG? (Select all that apply)',
          type: 'msq',
          options: [
            'When you need to teach the model a highly specific formatting style or syntax output',
            'When you want to reduce prompt token size and latency for repetitive structured tasks',
            'When you want the model to dynamically load private customer records in real time',
            'When you want to adjust the model\'s core tone, dialect, or style'
          ],
          ans: [0, 1, 3]
        },
        {
          id: 'llm-w5-m2',
          question: 'What is Hugging Face PEFT library used for?',
          type: 'mcq',
          options: [
            'Deploying user interfaces',
            'Enabling Parameter-Efficient Fine-Tuning by injecting and training small adapter layers while freezing the base model',
            'Crawling websites',
            'Evaluating translation scores'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'llm-w5-h1',
          question: 'In LoRA, what represents the "rank" (r) parameter?',
          type: 'mcq',
          options: [
            'The ranking score of the model outputs',
            'The dimension of the low-rank factorization matrices used to update weights',
            'The number of layers in the model',
            'The training learning rate'
          ],
          ans: 1
        },
        {
          id: 'llm-w5-h2',
          question: 'Which of the following is true about LoRA adapters?',
          type: 'mcq',
          options: [
            'They modify the actual base weights permanently on disk',
            'They are separate lightweight weight matrices that are multiplied or added to the frozen base weights during inference',
            'They slow down model inference by 50%',
            'They only work with BERT models'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 6,
    week: 'Week 6',
    title: 'LLM Agents & Tool Use',
    points: 80,
    objectives: [
      'Build autonomous LLM agents',
      'Give LLMs tools (search, calculator, code)',
      'Implement multi-step reasoning loops'
    ],
    content: `<h3>LLM Agents</h3><p>Agents extend LLMs beyond text generation — they can take actions, use tools, browse the web, write and execute code, and complete multi-step tasks.</p><h4>Agent Loop:</h4><ul><li>Thought → Action → Observation → Thought ...</li><li>The LLM decides which tool to use and how</li><li>Terminates when the task is complete</li></ul><h4>Common Tools:</h4><ul><li>Web search (Serper, Tavily)</li><li>Code interpreter</li><li>Calculator</li><li>Database queries</li><li>Email/calendar APIs</li></ul><h4>Frameworks:</h4><ul><li>LangChain Agents, LangGraph</li><li>AutoGen (Microsoft)</li><li>CrewAI (multi-agent)</li></ul>`,
    resources: {
      websites: [
        { title: 'LangGraph Docs', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'ReAct: Synergizing Reasoning and Acting — Paper', url: 'https://arxiv.org/abs/2210.03629' }
      ],
      videos: [
        { title: 'LLM Agents — Andrew Ng', url: 'https://www.youtube.com/embed/sal78ACtGTc', dur: '20 min' },
        { title: 'Build AI Agents from Scratch — Piyush Garg', url: 'https://www.youtube.com/watch?v=vUYnRGotTbo&pp=ygUPYnVpbGQgYWkgYWdlbnRz', dur: '37 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w6-e1',
          question: 'What is the classic loop of an autonomous LLM agent?',
          type: 'mcq',
          options: ['Input → Output', 'Thought → Action → Observation', 'Query → Retrieval → Response', 'Prompt → Completion'],
          ans: 1
        },
        {
          id: 'llm-w6-e2',
          question: 'CrewAI is a framework used to design multi-agent systems where multiple agent personas collaborate.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w6-m1',
          question: 'How do agents know how and when to use a tool?',
          type: 'mcq',
          options: [
            'They are hardcoded in python chains',
            'By reading the tool\'s name and description provided in the system prompt context, selecting it when appropriate',
            'By executing brute force scans on available endpoints',
            'They do not use descriptions'
          ],
          ans: 1
        },
        {
          id: 'llm-w6-m2',
          question: 'Which of the following are common tools provided to agents? (Select all that apply)',
          type: 'msq',
          options: ['Web Search engines (e.g. Tavily)', 'Code execution engines', 'Relational database query systems', 'CSS layouts'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'llm-w6-h1',
          question: 'What is a key difference between LangChain and LangGraph for agent design?',
          type: 'mcq',
          options: [
            'LangGraph allows building stateful, cyclical agent architectures (with loops); LangChain is primarily for linear DAG-like structures',
            'LangGraph only works in Javascript',
            'LangChain does not support tool use',
            'LangGraph is slower than LangChain'
          ],
          ans: 0
        },
        {
          id: 'llm-w6-h2',
          question: 'What is the purpose of the ReAct (Reason-Act) framework in agents?',
          type: 'mcq',
          options: [
            'To compile React frontend components',
            'To combine reasoning (thoughts) and acting (actions) in a structured interleaving loop to solve multi-step problems',
            'To encrypt model communications',
            'To test database connectivity'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 7,
    week: 'Week 7-9',
    title: 'Build 3 LLM Applications',
    points: 100,
    objectives: [
      'Build a RAG-based Q&A chatbot over documents',
      'Create an AI agent with tool use',
      'Deploy an LLM app to production'
    ],
    content: `<h3>Project Phase</h3><p>Apply everything you've learned by building three real projects.</p><h4>Project 1: Document Q&A Bot</h4><p>Upload PDFs, chunk and embed them, store in ChromaDB, and answer questions with RAG.</p><h4>Project 2: AI Research Agent</h4><p>An agent that can search the web, summarize articles, and compile research reports.</p><h4>Project 3: Custom Chatbot</h4><p>Fine-tune a small LLM on custom data and deploy it as a chat interface.</p>`,
    resources: {
      websites: [
        { title: 'LlamaIndex Docs', url: 'https://docs.llamaindex.ai' }
      ],
      videos: [
        { title: 'LangChain RAG App — Tech With Tim', url: 'https://www.youtube.com/embed/tcqEUSNCn8I', dur: '1.5 hr' },
        { title: 'Build AI Agents — Greg Kamradt', url: 'https://www.youtube.com/embed/jSP-gSEyVeI', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w7-e1',
          question: 'Which framework is popular for loading data and building indexes in search applications?',
          type: 'mcq',
          options: ['TensorFlow', 'PyTorch', 'LlamaIndex / LangChain', 'Scikit-learn'],
          ans: 2
        },
        {
          id: 'llm-w7-e2',
          question: 'PDF documents must be parsed and chunked into text blocks before being converted to vector embeddings.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w7-m1',
          question: 'Why is chunk overlap important when chunking text files?',
          type: 'mcq',
          options: [
            'To double the database size',
            'To preserve semantic context across the boundaries of adjacent text blocks during search',
            'To slow down searches',
            'To satisfy JSON format rules'
          ],
          ans: 1
        },
        {
          id: 'llm-w7-m2',
          question: 'Which of the following are valid user interface tools for displaying python-based chatbot prototypes? (Select all that apply)',
          type: 'msq',
          options: ['Streamlit', 'Gradio', 'Tailwind', 'Pydantic'],
          ans: [0, 1]
        }
      ],
      hard: [
        {
          id: 'llm-w7-h1',
          question: 'What is the role of an embedding model (e.g. OpenAI\'s text-embedding-ada-002) in a RAG pipeline?',
          type: 'mcq',
          options: [
            'It translates files to different languages',
            'It maps text segments into high-dimensional coordinate vectors where proximity matches conceptual similarity',
            'It generates the final answer',
            'It compresses image inputs'
          ],
          ans: 1
        },
        {
          id: 'llm-w7-h2',
          question: 'In a multi-agent system, how do different agents communicate and collaborate?',
          type: 'mcq',
          options: [
            'By passing structured message payloads containing state and text through a central orchestrator or graph edge routing',
            'By saving files to local text databases',
            'By sharing local memory variables directly without serialization',
            'They do not communicate'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 8,
    week: 'Week 10-12',
    title: 'LLM Evaluation, Safety & Production',
    points: 100,
    objectives: [
      'Evaluate LLM outputs with RAGAS and LangSmith',
      'Understand LLM safety and alignment basics',
      'Deploy production LLM apps with cost optimization'
    ],
    content: `<h3>Production LLMs</h3><h4>Evaluation:</h4><ul><li><strong>RAGAS:</strong> Evaluate RAG pipelines (faithfulness, answer relevancy, context precision)</li><li><strong>LangSmith:</strong> Tracing, debugging, and evaluating LLM apps</li><li><strong>Human evaluation:</strong> Still the gold standard for nuanced tasks</li></ul><h4>Safety & Guardrails:</h4><ul><li>Input/output guardrails (NeMo Guardrails, Guardrails AI)</li><li>Prompt injection prevention</li><li>PII detection and redaction</li></ul><h4>Cost Optimization:</h4><ul><li>Caching frequent prompts</li><li>Choosing smaller models for simple tasks</li><li>Batch processing where possible</li></ul>`,
    resources: {
      websites: [
        { title: 'RAGAS Documentation', url: 'https://docs.ragas.io' },
        { title: 'OWASP Top 10 for LLMs', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { title: 'LangSmith Docs', url: 'https://docs.smith.langchain.com' }
      ],
      videos: [
        { title: 'Evaluation of LLMs & RAGs — AI Anytime', url: 'https://www.youtube.com/embed/97ftVtITKfo?list=PLrLEqwuz-mRI5ubqVJ7DpbHheCflJDDXk', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'llm-w8-e1',
          question: 'Which tool is widely used to inspect and trace execution steps of complex LLM chains in production?',
          type: 'mcq',
          options: ['Wireshark', 'LangSmith', 'Nmap', 'Docker'],
          ans: 1
        },
        {
          id: 'llm-w8-e2',
          question: 'Prompt injection is a vulnerability where an attacker crafts input to trick the model into ignoring its system prompt constraints.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'llm-w8-m1',
          question: 'What metrics are commonly evaluated using the RAGAS framework? (Select all that apply)',
          type: 'msq',
          options: ['Faithfulness', 'Answer Relevance', 'Context Recall', 'CSS Rendering Speed'],
          ans: [0, 1, 2]
        },
        {
          id: 'llm-w8-m2',
          question: 'What is the purpose of input/output guardrails in LLM systems?',
          type: 'mcq',
          options: [
            'To limit the speed of server responses',
            'To inspect, filter, and validate prompts and outputs to prevent harmful, toxic, or insecure data exchanges',
            'To compress network data packets',
            'To style the chatbot console interface'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'llm-w8-h1',
          question: 'What does the RAGAS metric "Faithfulness" measure?',
          type: 'mcq',
          options: [
            'How polite the chatbot is to the user',
            'Whether the generated answer is strictly grounded in and derived from the retrieved document chunks (no hallucinations)',
            'The spelling accuracy of the output',
            'The latency of the model generation'
          ],
          ans: 1
        },
        {
          id: 'llm-w8-h2',
          question: 'How can you optimize production API token costs for an application handling high traffic?',
          type: 'mcq',
          options: [
            'Implementing semantic prompt caching and routing simpler classification tasks to smaller models (e.g. GPT-4o-mini)',
            'Increasing temperature to 2.0',
            'Removing system prompts entirely',
            'Enforcing database indexes'
          ],
          ans: 0
        }
      ]
    }
  }
];

export const llmRoadmap = {
  id: 'llm',
  title: 'Large Language Models (LLM)',
  description: 'Deep dive into transformers, prompt engineering, RAG, fine-tuning, and building LLM-powered applications.',
  difficulty: 'Advanced',
  icon: '🧠',
  color: '#14B8A6',
  domain: 'Generative AI',
  category: 'Technical',
  enrolled: 856,
  targetUsers: ['Global BK'],
  durations: {
    '3months': { label: '3 Months', tagline: 'The complete LLM engineering track', weeks: 12, totalPoints: 900, sections: mainContent },
    '3 months': { label: '3 Months', tagline: 'The complete LLM engineering track', weeks: 12, totalPoints: 900, sections: mainContent }
  }
};

const getLLMRoadmap = () => llmRoadmap;
export default getLLMRoadmap;

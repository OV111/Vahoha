LAYER: ai-agents-1
```json
[
  {
    "stem": "In a chat-based LLM API, what is the primary purpose of assigning different roles to messages?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "To communicate the source and intended function of each message in the conversation",
      "To determine the number of tokens allocated to each message automatically",
      "To specify which model architecture processes each individual message",
      "To control the sampling temperature independently for every message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application sends a system message defining the assistant as a financial support agent. What is the main purpose of this message?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "To provide the assistant with historical conversations from other users",
      "To establish high-priority behavioral instructions that guide the assistant's responses",
      "To replace the user message with a predefined response template",
      "To guarantee that the model never produces incorrect financial information"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A conversation contains system, user, assistant, and tool messages. What does a tool message generally represent?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "An instruction that overrides all previous system messages",
      "A hidden reasoning trace generated before the assistant responds",
      "The result returned by an external tool after the assistant requested its execution",
      "A user-provided message that has been converted into structured JSON"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should an application preserve the appropriate role when sending conversation history back to an LLM API?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "Roles allow the API to calculate the user's subscription cost",
      "Roles guarantee that previous assistant responses are factually correct",
      "Roles determine whether the conversation can use streaming",
      "Roles help the model distinguish instructions, user input, assistant output, and external results"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer places an instruction in a user message saying to ignore the application's system instructions. What should the application expect?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "The user instruction automatically becomes a system-level instruction",
      "The model is designed to treat the user message as the highest-priority role",
      "The system instructions retain their higher priority, although prompt injection can still be a risk",
      "The API rejects every request containing conflicting instructions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application stores previous assistant replies and user messages. What is the most appropriate way to continue a multi-turn conversation?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "Send the relevant conversation history with its original roles alongside the new user message",
      "Send only the latest user message because the model permanently remembers previous API calls",
      "Convert all previous messages into a single system message to preserve context",
      "Send previous messages as tool outputs so the model can distinguish historical content"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary risk of placing user-controlled text directly inside a system prompt?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "The API automatically removes the user's original message role",
      "The model becomes unable to calculate the context window",
      "The system prompt stops being counted toward token usage",
      "Untrusted user content may become indistinguishable from trusted application instructions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants an assistant to answer only questions about a company's internal documentation. Where should the persistent behavioral constraint normally be defined?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "In the final assistant response",
      "In the system or developer-level instructions supported by the API",
      "In the HTTP request's connection timeout",
      "In the user's first message"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between an assistant message and a tool message in a typical tool-enabled conversation?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "Assistant messages are always private, while tool messages are always visible to users",
      "Assistant messages contain only text, while tool messages contain only binary data",
      "Assistant messages represent model output, while tool messages represent results returned by external execution",
      "Assistant messages are excluded from token accounting, while tool messages are included"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application receives a conversation containing a previous assistant response followed by a new user question referring to it. Why is preserving the assistant response useful?",
    "topic": "Chat messages, roles and system prompts",
    "choices": [
      "It allows the model to understand what response the user is referring to and maintain conversational continuity",
      "It guarantees the assistant will repeat the previous response without modification",
      "It prevents the new user message from consuming context-window capacity",
      "It converts the previous response into permanent model memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a token represent in the context of an LLM API?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "A complete word in every supported language",
      "A unit of text or other model input/output representation used during tokenization",
      "A single character in the original user message",
      "A complete message exchanged between the application and model"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An application sends a 20,000-token conversation to a model with a 16,000-token context window. What is the fundamental problem?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "The model automatically increases its context window to accommodate the conversation",
      "The API converts the conversation into a lower-resolution representation",
      "The model processes only the first message and ignores the remaining messages",
      "The request exceeds the model's supported context capacity unless the input is reduced or the model supports a larger window"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants to reduce API costs for a conversational application. Which change directly reduces input-token consumption?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "Remove irrelevant historical messages while retaining the context necessary for the current task",
      "Increase the temperature to reduce the number of generated tokens",
      "Convert every user message into a separate system message",
      "Increase the HTTP timeout so the model can process fewer tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A model charges separately for input and output tokens. An application sends 3,000 input tokens and receives 1,000 output tokens. What determines the API usage cost?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "Only the number of output tokens because input tokens are free",
      "Only the total character count of the conversation",
      "The applicable input-token and output-token rates multiplied by their respective token usage",
      "The number of HTTP requests multiplied by the model's output-token rate"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a short English sentence consume a different number of tokens than a sentence containing uncommon technical identifiers?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "Technical identifiers are always excluded from tokenization",
      "The model allocates tokens according to the importance of each sentence",
      "The API assigns one token per word regardless of language",
      "Tokenization depends on the model's vocabulary and text segmentation, not simply word count"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An application approaches its context-window limit during a long conversation. Which strategy is generally most appropriate?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "Increase the sampling temperature to compress the conversation",
      "Remove the system prompt so the model has more room for output",
      "Summarize less relevant history and retain important instructions and recent context",
      "Repeat the entire conversation in the output field instead of the input field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer sets a maximum output-token limit for an API request. What does this setting generally control?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "The maximum amount of generated output the model may produce for that request",
      "The maximum number of user messages accepted in a conversation",
      "The number of input tokens the tokenizer can recognize",
      "The maximum number of concurrent API requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application sends the same long conversation history with every new user message. What is the likely consequence?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "Historical messages are automatically cached without additional configuration",
      "The model stops counting previous messages after the first request",
      "Input-token consumption and associated costs can grow significantly with each request",
      "The model automatically converts previous messages into embeddings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should a developer estimate token usage before sending a large request to an LLM?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "To determine whether the model supports function calling",
      "To guarantee that the model's generated answer will be deterministic",
      "To avoid sending any requests containing more than one message",
      "To anticipate context-limit violations and manage expected usage costs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A model supports a context window of 128,000 tokens. Does this mean an application can always generate 128,000 output tokens from a request?",
    "topic": "Tokens, context windows and pricing",
    "choices": [
      "Yes, because context windows apply exclusively to generated output",
      "No, because input and output tokens share the available context capacity, and output limits may also apply",
      "Yes, provided the application enables streaming",
      "No, because context windows only count user messages and exclude system messages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the temperature parameter primarily influence during text generation?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "The randomness of token selection from the model's probability distribution",
      "The maximum number of tokens the model can remember",
      "The number of concurrent conversations supported by the API",
      "The time the model waits before generating its first token"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application generates structured classification labels and wants more consistent outputs. Which configuration is generally a sensible starting point?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "Use a high temperature and increase the output-token limit",
      "Use a low temperature and evaluate the resulting consistency on representative inputs",
      "Use a high temperature and set the timeout to zero",
      "Disable tokenization and allow unrestricted sampling"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when temperature approaches zero in a typical sampling-based generation setup?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "The model stops generating tokens after the first prediction",
      "The model assigns equal probability to every possible next token",
      "The model selects randomly from the entire vocabulary",
      "The model becomes more likely to select high-probability tokens, reducing sampling variability"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does setting temperature to zero not guarantee identical responses across every repeated API request?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "Temperature zero disables the model's learned parameters",
      "The context window changes randomly between requests",
      "Backend nondeterminism, model updates, infrastructure differences, or other generation settings may affect results",
      "The API automatically changes the system prompt after each request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer uses both temperature and top_p sampling controls. What is the most appropriate understanding of their relationship?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "Temperature changes probability distribution sharpness, while top_p restricts sampling to a cumulative probability mass",
      "Temperature limits output length, while top_p limits input length",
      "Temperature controls model speed, while top_p controls API concurrency",
      "Temperature determines the system role, while top_p determines the user role"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An LLM application produces creative marketing suggestions. Why might a developer choose a higher temperature?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "To force the model to return valid JSON in every response",
      "To increase variation in token selection and potentially produce more diverse suggestions",
      "To guarantee that every suggestion contains new factual information",
      "To reduce the number of generated tokens for each suggestion"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer wants to reproduce a previous model response during debugging. Which approach provides the strongest practical basis for reproduction?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "Store only the user's latest message and regenerate with any model",
      "Use a higher temperature to explore the same probability distribution",
      "Change the system prompt to describe the previous response",
      "Record the model identifier, full request configuration, input messages, and seed when supported"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the primary purpose of a random seed in an API that supports seeded generation?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "To specify the number of tokens available to the conversation",
      "To select which system prompt the model should load",
      "To provide a starting point for pseudorandom sampling, improving reproducibility under otherwise matching conditions",
      "To prevent the model from using its probability distribution"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application generates responses with temperature 0.2 and another with temperature 1.2. What is the most likely difference?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "The second configuration will generally produce more varied token selections",
      "The first configuration will always generate longer responses",
      "The second configuration will have a larger context window",
      "The first configuration will use fewer input tokens regardless of its messages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should developers avoid changing temperature and top_p simultaneously when investigating unexpected output variability?",
    "topic": "Sampling parameters and determinism",
    "choices": [
      "The API rejects requests that specify both parameters",
      "It becomes harder to isolate which sampling change caused the observed behavior",
      "The parameters cancel each other out and disable generation",
      "Both parameters control the same context-window limit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the defining characteristic of streaming an LLM response?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "The application sends multiple copies of the same request simultaneously",
      "The model generates the complete answer before the application receives any data",
      "The application receives generated response data incrementally as generation progresses",
      "The model stores each generated token permanently in the user's session"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application streams an assistant response to a web interface. What is the main user-facing benefit?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "The interface can display partial output before the complete response has finished generating",
      "The model no longer needs to process the conversation history",
      "The response is guaranteed to be more accurate than a non-streamed response",
      "The API automatically reduces the number of generated tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A client disconnects while an LLM response is streaming. What should a well-designed application consider doing?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "Continue every generation indefinitely because the original request was accepted",
      "Retry the same request immediately without checking its status",
      "Convert the partial response into a completed assistant message",
      "Propagate cancellation when appropriate so unnecessary generation and resource consumption can stop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a streaming client distinguish between a content chunk and the final completion signal?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "Content chunks always contain tool execution results",
      "The final signal confirms that generation has finished, allowing the client to finalize the response",
      "The final signal contains the complete conversation history",
      "Content chunks cannot be displayed until the final signal arrives"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A streaming API uses Server-Sent Events (SSE). What is SSE primarily used for in this scenario?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "Uploading large conversation histories to the model",
      "Executing Python functions inside the model runtime",
      "Delivering server-to-client event data over a persistent HTTP connection",
      "Maintaining a shared database transaction between the model and client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer accumulates streamed text chunks in memory before returning the response to the user. What is the main consequence?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "The application loses the main user-facing latency benefit of streaming because it waits for completion",
      "The model automatically switches to a higher temperature",
      "The API stops counting output tokens during generation",
      "The client receives the response before the model generates it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an application do if a network interruption occurs halfway through receiving a streamed response?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "Assume the partial response is complete and permanently store it as final",
      "Append an error message to the partial response and report success",
      "Retry automatically without considering whether the original generation completed",
      "Detect the interrupted stream and handle the partial result separately from a confirmed completed response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants to stop an ongoing generation after the user clicks a cancel button. Which mechanism is most appropriate?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "Change the temperature of the next API request",
      "Use a request cancellation mechanism, such as an abort signal, and propagate it to the underlying HTTP operation",
      "Delete the user's conversation history from the client",
      "Send an empty assistant message to terminate the current response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An LLM returns streamed content containing several fragments of a structured response. Why should the application avoid assuming that each fragment is independently valid JSON?",
    "topic": "Streaming responses and cancellation",
    "choices": [
      "JSON is incompatible with streaming protocols",
      "The model always generates invalid JSON when streaming is enabled",
      "Fragments may contain incomplete portions of a larger JSON document until the full response is assembled",
      "Streaming APIs automatically convert JSON fragments into plain text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer receives an HTTP 429 response from an LLM API. What does this status generally indicate?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "The request exceeded an applicable rate limit or usage quota",
      "The supplied JSON body contains invalid syntax",
      "The model identifier does not exist",
      "The client has successfully completed the generation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application receives a temporary HTTP 503 response from an LLM provider. What is a reasonable recovery strategy?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "Immediately repeat the request continuously until the provider responds",
      "Return the error as a successful assistant response",
      "Retry with bounded exponential backoff and jitter when the operation is safe to retry",
      "Increase the temperature and resend the request without delay"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should an application use exponential backoff when retrying requests after transient service failures?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "It increases the number of parallel requests during an outage",
      "It gives the service progressively more recovery time and reduces synchronized retry pressure",
      "It guarantees that the next request will be accepted",
      "It eliminates the need to inspect HTTP error codes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A request times out because the model takes longer than the configured client timeout. What does this timeout establish?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "The model definitely did not receive or process the request",
      "The model generated an empty response successfully",
      "The request exceeded the model's context window",
      "The client stopped waiting within its configured time limit, but the server may still have processed the request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An application retries every failed LLM request, including invalid-request errors such as HTTP 400. What is the main design problem?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "Permanent client errors generally require correcting the request rather than repeating it unchanged",
      "HTTP 400 responses should always be retried before HTTP 500 responses",
      "Retrying invalid requests automatically corrects their message roles",
      "Client errors are temporary by definition and disappear after a short delay"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An LLM provider returns a Retry-After header with a rate-limit response. How should a well-designed client use it?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "Interpret it as the maximum number of tokens allowed in the next request",
      "Use it to determine how many parallel requests to start",
      "Wait for the indicated retry interval before attempting another request, subject to applicable client policies",
      "Treat it as confirmation that the previous generation completed successfully"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it important to distinguish connection timeouts from read or response timeouts in an LLM application?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "They determine different stages of the request lifecycle and can indicate different failure conditions",
      "Connection timeouts affect only input tokens, while read timeouts affect only output tokens",
      "Read timeouts are always caused by incorrect API credentials",
      "Connection timeouts indicate that the model exceeded its maximum output length"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A user submits a request, but the client loses its connection before receiving the response. The application retries and receives a second generated answer. What is the key concern?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "The second request automatically invalidates the first model response",
      "The original request may have completed, potentially causing duplicate processing or cost",
      "The API cannot generate more than one response for a user",
      "The retry changes the original system message permanently"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An application experiences repeated HTTP 429 responses even though each individual user sends only a few requests. What is a likely explanation?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "The model is rejecting requests because their temperature is too low",
      "The API has exceeded its context-window capacity",
      "The application is sending too many assistant messages per conversation",
      "Aggregate traffic may be exceeding a shared organization, project, or model rate limit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer is implementing retry logic for a request that may trigger billable generation. What should the retry policy account for?",
    "topic": "Errors, retries, rate limits and timeouts",
    "choices": [
      "Whether the original operation may have been processed before the failure became visible",
      "Whether the temperature parameter is higher than zero",
      "Whether the conversation contains a system message",
      "Whether the user has previously received a streamed response"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the essential difference between a conventional deterministic workflow and an AI agent?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "A workflow always uses an API, while an agent must run locally",
      "An agent must use multiple language models, while a workflow uses one",
      "An agent can use model-driven decisions to select actions and adapt its execution toward a goal",
      "A workflow processes structured data, while an agent can only process natural language"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer creates a fixed pipeline that always summarizes a document, extracts keywords, and stores the results. Is this necessarily an AI agent?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "Yes, because every pipeline containing an LLM is an autonomous agent",
      "No, because fixed sequential execution alone does not require model-driven action selection",
      "Yes, because storing extracted keywords creates persistent agent memory",
      "No, because AI agents cannot execute sequential operations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which capability most clearly distinguishes an agent from a simple LLM-powered text-generation endpoint?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "The ability to generate text using a system prompt",
      "The ability to accept user messages through an HTTP endpoint",
      "The ability to return responses in JSON format",
      "The ability to decide on and execute actions based on intermediate observations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An agent receives the goal of finding a meeting time, checks calendar availability, and then proposes an available slot. What makes this behavior agent-like?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "It uses an LLM to generate a greeting before displaying the calendar",
      "It performs a single database query and always returns the first result",
      "It uses observations from an external system to determine an appropriate next action toward a goal",
      "It stores the user's meeting request as a permanent system prompt"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An autonomous agent repeatedly calls tools without checking whether the requested goal has been achieved. Which essential part of agent behavior is missing?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "A mechanism for observing results and evaluating whether to continue or stop",
      "A mechanism for increasing the model's context window after every call",
      "A mechanism for converting every tool result into an embedding",
      "A mechanism for replacing user messages with assistant messages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A team is deciding between a fixed workflow and an autonomous agent for processing customer refund requests. The refund policy is strict and the steps are predictable. Which design is generally more appropriate?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "An autonomous agent that freely chooses refund amounts and execution steps",
      "A deterministic workflow with explicit policy checks and controlled decision points",
      "A multi-agent architecture where each agent independently approves refunds",
      "An unconstrained LLM that directly modifies customer account balances"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of an observation in a typical agent execution loop?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "It permanently modifies the model's trained parameters",
      "It determines the API provider's pricing model",
      "It replaces the agent's original goal with a new system prompt",
      "It provides information from the environment or a tool that can inform the next decision"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An agent is asked to research a topic, searches the web, discovers missing information, and performs another search using a refined query. What does this behavior demonstrate?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "Adaptive execution based on intermediate results",
      "Strict execution of an entirely predetermined sequence",
      "Model training through reinforcement learning during the request",
      "Permanent storage of every search result in model parameters"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does adding tools to an LLM application not automatically make it a fully autonomous agent?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "Tools can only be used with models trained specifically for autonomous execution",
      "Tool-enabled applications cannot preserve conversation history",
      "Tools may simply be invoked through fixed application logic without model-driven planning or action selection",
      "An application becomes an agent only when it uses more than five tools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer builds an agent that can inspect task results, choose between available tools, and repeat actions until a completion condition is met. Which architecture characteristic is most important here?",
    "topic": "What makes something an agent versus a workflow",
    "choices": [
      "A fixed pipeline with no conditional execution",
      "A model-driven control loop that connects decisions, actions, and observations",
      "A single prompt that contains every possible tool result",
      "A background process that continuously generates text without evaluating results"
    ],
    "answerIdx": 1
  }
]
```

LAYER: ai-agents-2
```json
[
  {
    "stem": "A developer writes a prompt containing several instructions, but the model consistently misses an important requirement. Which improvement is most likely to help?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "Increase the temperature so the model explores more possible interpretations",
      "Move the important requirement into the middle of an unrelated example",
      "State the requirement explicitly, prioritize it, and separate it from background information",
      "Increase the maximum output tokens without changing the prompt"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are delimiters useful when a prompt contains both instructions and user-provided documents?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "They help distinguish trusted instructions from the content the model is expected to process",
      "They automatically prevent the model from generating incorrect information",
      "They reduce the number of tokens required to represent the document",
      "They guarantee that embedded instructions will never influence the model"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application asks a model to summarize a document, but the prompt does not specify the desired length or audience. What is the main weakness?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "The model cannot summarize documents without a JSON schema",
      "The model must use a higher temperature to interpret the request",
      "The application needs to provide the document as a system message",
      "The task leaves important output expectations unspecified, allowing inconsistent interpretations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants the model to classify customer messages using a fixed set of categories. Which instruction is most useful?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "Analyze the message carefully and choose whatever category seems interesting",
      "Choose exactly one category from the supplied list and return its identifier",
      "Generate several possible categories and explain each one in detail",
      "Classify the message using any terminology that best represents its meaning"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A prompt contains the instruction 'Return JSON' followed by a long explanation of the task. Why might this still produce unreliable output?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "JSON output is incompatible with natural-language task descriptions",
      "The model cannot follow instructions appearing before the final paragraph",
      "The output format may lack a precise structure, required fields, and explicit constraints",
      "The model requires a separate API request for each JSON field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application processes user-submitted email content. The email includes text saying to ignore previous instructions. What is the best prompt-design practice?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "Place the email inside clearly marked untrusted content and instruct the model to analyze it without following its embedded commands",
      "Move the email into the system message so its contents receive higher priority",
      "Remove all delimiters so the model can interpret the entire prompt as one instruction",
      "Increase temperature to make the model distinguish trusted and untrusted text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main advantage of assigning a specific role and task to a model in the prompt?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "It changes the model's underlying trained parameters for the current request",
      "It guarantees the model will use external tools when necessary",
      "It eliminates the need to provide task-specific input data",
      "It establishes behavioral context and clarifies the expected responsibility of the model"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants consistent responses from a prompt used by multiple application components. Which approach is most maintainable?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "Duplicate slightly different versions of the instructions in every API request",
      "Define reusable instructions with explicit input boundaries and output expectations",
      "Allow each component to construct its own unrestricted system message",
      "Store the instructions inside generated assistant responses"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A model receives a prompt with conflicting requirements: 'Answer in one sentence' and 'Provide five detailed paragraphs.' What should a developer do?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "Remove the conflict by defining one unambiguous output requirement",
      "Increase the context window so the model can satisfy both instructions",
      "Use a higher temperature to let the model select a preferred instruction",
      "Send the same prompt twice and combine both responses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application asks a model to extract information from a document. Why should it explicitly state what to do when a requested field is missing?",
    "topic": "Clear instructions, roles and delimiters",
    "choices": [
      "Missing fields automatically cause the API to reject the request",
      "The model cannot process documents containing incomplete information",
      "It reduces ambiguity and discourages unsupported guesses or invented values",
      "It forces the model to generate a longer explanation for every field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the primary purpose of a few-shot example in a prompt?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "To increase the model's context window for subsequent requests",
      "To demonstrate the expected input-output behavior through representative examples",
      "To permanently update the model's learned parameters",
      "To replace the need for instructions and output constraints"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer provides three examples of customer-message classification, all with the same category. What is a possible weakness?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "The model will automatically ignore every example after the first one",
      "The examples will permanently bias the model's training dataset",
      "The examples prevent the model from accepting new categories",
      "The examples may fail to demonstrate how different categories should be distinguished"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A few-shot prompt produces poor results on real customer messages despite performing well on the supplied examples. What should the developer investigate first?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "Whether the examples are representative of the real inputs and cover important edge cases",
      "Whether the model has enough training data to permanently memorize the examples",
      "Whether the examples use the same number of characters as the real messages",
      "Whether the API request uses a sufficiently large connection timeout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does chain-of-thought prompting generally encourage a model to do?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "Return only a final answer without intermediate reasoning",
      "Execute external tools before interpreting the user request",
      "Work through intermediate reasoning steps when solving a task",
      "Convert every response into a sequence of database operations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application uses an LLM to solve multi-step mathematical problems. Why might asking for a structured intermediate solution help?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "It guarantees mathematically correct results regardless of the input",
      "It can encourage a more organized solution process that is easier to inspect or validate",
      "It prevents the model from using learned mathematical patterns",
      "It automatically executes calculations in a trusted numerical runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer includes an example where an input contains a date and the expected output uses ISO date formatting. What does this example primarily teach?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "The model should always use the current system date",
      "The model should permanently store the supplied date",
      "The API should convert all future inputs into timestamps",
      "The model should follow the demonstrated transformation pattern for similar inputs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can adding too many few-shot examples be counterproductive?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "It can consume context capacity and increase input-token costs without proportionate improvement",
      "It disables the model's ability to understand system instructions",
      "It forces the model to switch to a smaller architecture",
      "It makes all subsequent API responses deterministic"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application needs a model to explain a complex decision, but its provider does not expose private internal reasoning. What is a reasonable design?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "Attempt to reconstruct the model's hidden internal reasoning from token probabilities",
      "Disable all output restrictions and request unrestricted internal reasoning",
      "Request a concise explanation with relevant evidence, assumptions, and conclusions",
      "Require the model to reveal every internal computation before returning an answer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer wants to test whether a few-shot example improves classification accuracy. Which experiment provides the strongest evidence?",
    "topic": "Few-shot examples and chain-of-thought",
    "choices": [
      "Compare the two prompts using different evaluation datasets and different grading criteria",
      "Run both prompt versions against the same representative test set and compare measured results",
      "Ask the model which prompt it prefers",
      "Use only the example included in the prompt as the evaluation input"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main advantage of requiring an LLM to produce output conforming to a JSON Schema?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "It guarantees that every value is factually correct",
      "It removes the need to handle API errors",
      "It allows the model to execute database queries directly",
      "It constrains the expected output structure and supported value types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer defines a schema requiring an object with a string property named 'email'. The model returns an object containing 'email' as a number. What is the issue?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "The returned value violates the declared property type",
      "The model exceeded its maximum context window",
      "The property name is invalid because JSON cannot contain strings",
      "The API requires every property to be represented as an array"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the 'required' constraint in a JSON Schema object?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "To specify which properties should be generated first",
      "To define the maximum number of characters in a property",
      "To identify properties that must be present in the object",
      "To prevent the model from returning nested objects"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application needs a response containing a status field limited to 'pending', 'approved', or 'rejected'. Which schema feature is most appropriate?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "A maximum numeric value",
      "An enumeration of allowed values",
      "A minimum string length",
      "An unrestricted object definition"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A JSON Schema defines a property as an array of objects. What does the 'items' definition generally specify?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "The total number of objects returned by the API",
      "The HTTP status code expected from the model",
      "The name of the property containing the array",
      "The schema that each array element must satisfy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a developer distinguish between syntactically valid JSON and schema-valid JSON?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "Valid JSON can still have missing fields, incorrect types, or values that violate the expected contract",
      "Schema-valid JSON cannot contain nested objects or arrays",
      "Syntactically valid JSON is always rejected by structured-output APIs",
      "JSON Schema checks only whether quotation marks are correctly escaped"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer wants the model to return either a successful result or a structured error result. Which schema design is suitable?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "A single unrestricted string property that describes every possible outcome",
      "An array containing an unknown number of unrelated response objects",
      "A discriminated union with separate success and error structures",
      "A numeric field that represents both the result and the error message"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An API supports strict structured output. What is the main difference between this capability and merely asking the model to return JSON in a prompt?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "Strict structured output makes the model's factual knowledge more accurate",
      "The API can enforce supported structural constraints during generation rather than relying only on textual instructions",
      "Prompt-based JSON cannot contain arrays or nested objects",
      "Strict structured output removes the need for application-level error handling"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer defines a property as a number with a minimum of 1 and a maximum of 10. What does this schema constraint achieve?",
    "topic": "Structured output with JSON schemas",
    "choices": [
      "It ensures the model generates exactly ten values",
      "It converts string representations into numbers automatically in every API",
      "It guarantees that the number represents a real-world measurement",
      "It restricts valid numeric values to the specified inclusive range"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A model returns a valid JSON object containing an account ID that does not exist in the application's database. What should the application do?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Perform application-level validation against the authoritative data source before trusting the identifier",
      "Accept the identifier because schema validation guarantees its existence",
      "Ask the model to repeat the same response until it produces the correct identifier",
      "Convert the identifier into a string and skip database validation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application receives malformed JSON from a model. What should its first response generally be?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Execute the malformed content as a Python expression",
      "Store it as a trusted application object without parsing",
      "Reject or quarantine the invalid output and apply a controlled repair or retry strategy",
      "Remove every character that is not an alphanumeric character"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer uses Pydantic to validate an LLM response. What is Pydantic primarily responsible for?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Training the model to produce the expected output structure",
      "Parsing and validating data against declared application models and constraints",
      "Reducing the model provider's token prices",
      "Executing external tools based on generated function names"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A model returns an empty string for a field that the application requires to contain a non-empty username. What should the validation layer do?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Accept the value because it is technically a string",
      "Convert the empty string into a randomly generated username",
      "Remove the field and assume the database will fill it",
      "Reject the output because it violates the application's non-empty value constraint"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is blindly repairing every malformed LLM response with string replacements dangerous?",
    "topic": "Validating and repairing model output",
    "choices": [
      "It may alter intended values or create a different structure that appears valid but has incorrect meaning",
      "String replacements always increase the model's context window",
      "It prevents the application from using JSON parsers",
      "It guarantees that the model will return the same output on retry"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application receives a model-generated date string. The string matches the required format but represents an impossible calendar date. Which validation is needed?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Only a check that the response contains valid quotation marks",
      "A check that the date string contains exactly ten characters",
      "Semantic validation that confirms the value represents a valid calendar date",
      "A check that the model used a temperature below 0.5"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer asks the model to repair its own invalid structured response. What is the safest general approach?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Accept the repaired result without checking it again",
      "Provide the validation errors and original output, then validate the repaired result independently",
      "Allow the model to modify the application's validation rules",
      "Remove all constraints from the schema before requesting a repair"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A model produces a valid object with a negative product quantity, while the application requires quantities to be positive. What is the appropriate response?",
    "topic": "Validating and repairing model output",
    "choices": [
      "Accept the quantity because the JSON object parsed successfully",
      "Change the product quantity to zero automatically",
      "Ask the model to explain why negative quantities are reasonable",
      "Apply business-rule validation and reject or correct the value through an explicit safe policy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should validation happen before model-generated data is persisted or used to trigger application actions?",
    "topic": "Validating and repairing model output",
    "choices": [
      "It prevents malformed or semantically invalid output from entering trusted application workflows",
      "It ensures that every model response is generated with zero temperature",
      "It eliminates the need for database constraints and authorization",
      "It converts model-generated text into permanently reliable knowledge"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer changes a system prompt used by a production agent. Why should the prompt be versioned?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "To make the model's underlying parameters immutable",
      "To ensure every user receives the same response regardless of input",
      "To identify which instruction set produced a result and support rollback or comparison",
      "To prevent the API provider from updating its model"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A team modifies a prompt and observes better results on three manually selected examples. What should it do before deploying the change?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "Deploy immediately because three successful examples establish reliability",
      "Evaluate the new prompt against a representative test dataset and compare it with the previous version",
      "Increase the temperature and assume the improvement will generalize",
      "Replace the old prompt permanently and delete its evaluation results"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of a prompt regression test?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "To verify that the model's training loss decreases after each request",
      "To measure how quickly a prompt is loaded from the database",
      "To ensure the prompt contains exactly the same number of tokens as before",
      "To detect whether a prompt change causes previously working behaviors to deteriorate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A production application stores prompt templates in source control. What is an important benefit?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "Prompt changes can be reviewed, tracked, tested, and associated with application releases",
      "The model automatically uses the newest prompt without an API request",
      "Source control guarantees that every prompt produces deterministic output",
      "The application no longer needs to record which model was used"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A team wants to compare two prompt versions fairly. Which testing approach is most appropriate?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "Use different user inputs for each prompt and compare response lengths",
      "Evaluate only the prompt that was written most recently",
      "Run both versions against the same dataset with consistent evaluation criteria and controlled settings",
      "Ask each prompt to grade the other prompt's performance without an independent rubric"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application changes its model provider while keeping the prompt unchanged. Why should the existing prompt evaluation suite still be executed?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "Prompt evaluation is unnecessary when the text remains identical",
      "Different models may interpret instructions and produce outputs differently, changing application behavior",
      "Model providers automatically preserve identical tokenization and generation behavior",
      "Changing providers only affects network latency and never output quality"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer introduces a prompt change that improves average accuracy but causes a substantial increase in harmful outputs on a sensitive test category. What is the best release decision?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "Deploy because average accuracy is the only meaningful evaluation metric",
      "Ignore the category because it contains fewer examples than the others",
      "Increase the output-token limit to compensate for the regression",
      "Investigate the safety regression and block or revise the release until the relevant acceptance criteria are met"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a team record the prompt version alongside an LLM application's evaluation results?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "To connect measured behavior to the exact instruction set being evaluated",
      "To allow the model to retrieve old prompts from its training data",
      "To reduce the output-token cost of subsequent requests",
      "To guarantee that a prompt version cannot be modified"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer wants to deploy a new prompt to only 5% of users before expanding rollout. What is the primary benefit?",
    "topic": "Prompt versioning and testing",
    "choices": [
      "The prompt receives additional training from the first 5% of users",
      "The application can bypass evaluation because fewer users receive the change",
      "The team can observe real-world behavior with limited exposure before broader deployment",
      "The model automatically disables unexpected outputs for the remaining users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is prompt caching primarily designed to improve?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "The factual accuracy of every generated response",
      "The cost and latency of repeatedly processing eligible prompt prefixes",
      "The maximum context window supported by the model",
      "The model's ability to execute external tools without permissions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An application sends the same long system instructions across thousands of requests. Why might prompt caching be beneficial?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "It permanently stores the model's generated answers for all future users",
      "It removes the need to send user messages to the model",
      "It guarantees that every request receives the same generated response",
      "It may reduce repeated processing costs and latency for eligible shared prompt prefixes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants to improve cache reuse for repeated prompts. Which design is generally most helpful?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Keep reusable prompt prefixes stable and place variable request-specific content after them",
      "Randomize the system instructions on every request",
      "Move the entire conversation into a new system prompt for every user",
      "Change the order of static instructions on every API call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer assumes that enabling prompt caching means cached tokens are always free. What is the problem with this assumption?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Caching never affects token processing costs",
      "Cached content is always billed at the full output-token rate",
      "Providers may charge for cached input tokens at different rates, and pricing depends on the provider's policy",
      "Prompt caching applies only to requests that contain no system messages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A long prompt contains stable application instructions followed by a frequently changing timestamp and user request. Which arrangement is generally preferable for cache reuse?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Place the timestamp before the stable instructions so the model prioritizes it",
      "Place stable reusable content first and variable content later, subject to the provider's caching rules",
      "Duplicate the stable instructions after every user message",
      "Move all stable instructions into the generated assistant response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An application generates unnecessarily long answers, increasing output-token costs. Which prompt change is most likely to help?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Increase the number of few-shot examples regardless of their relevance",
      "Increase the temperature to make the model more concise",
      "Remove all output constraints and allow unrestricted generation",
      "Specify a concise response format and an appropriate output-length constraint"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants to reduce LLM costs without significantly reducing answer quality. Which approach is generally sensible?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Remove irrelevant context, limit unnecessary output, and use a cheaper suitable model for simpler tasks",
      "Use the most expensive model for every request and disable all output limits",
      "Repeat every request twice and select the longer response",
      "Increase the temperature to reduce the number of tokens generated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A team notices that prompt caching is not being reused even though most requests contain identical instructions. What should it investigate?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Whether the model's temperature is exactly zero",
      "Whether all user requests contain the same number of words",
      "Whether changing prefixes, cache eligibility thresholds, cache expiration, or provider-specific cache rules prevent reuse",
      "Whether the application has disabled JSON parsing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An application has a large static knowledge section embedded in every prompt. What is a potential disadvantage of this design even when prompt caching is available?",
    "topic": "Prompt caching and cost control",
    "choices": [
      "Static content cannot be tokenized by modern language models",
      "The content still occupies context capacity and may be less efficient than retrieving only relevant information",
      "The application cannot send any user-specific instructions afterward",
      "Caching automatically removes the need to maintain the knowledge section"
    ],
    "answerIdx": 1
  }
]
```

LAYER: ai-agents-3
```json
[
  {
    "stem": "A developer defines a tool that allows an LLM to retrieve customer orders. Which tool definition is most useful to the model?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "A tool named 'execute' with no description and unrestricted input",
      "A tool named 'order_lookup' with a description explaining its purpose and required order identifier",
      "A tool named 'database' that accepts an arbitrary SQL statement",
      "A tool named 'customer' that accepts any text and decides internally what operation to perform"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a tool have a clear, specific description?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "It guarantees that the tool will always execute successfully",
      "It prevents the model from generating malformed natural-language responses",
      "It determines how many tokens the tool implementation can consume",
      "It helps the model understand when the tool is appropriate and what it does"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A tool requires an integer parameter named 'limit'. Which schema constraint helps prevent the model from providing a string value?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "Declare the parameter with an integer type",
      "Declare the parameter as an unrestricted string",
      "Add a natural-language example without specifying its type",
      "Mark the parameter as optional and accept every possible value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer exposes a tool called 'search_database' that accepts a free-form query. The model frequently generates invalid queries. What is a useful design improvement?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "Increase the temperature so the model explores more query formats",
      "Remove the tool description to reduce model bias",
      "Replace unrestricted query input with explicit parameters describing supported search criteria",
      "Allow the tool to execute arbitrary database commands generated by the model"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A tool accepts a parameter named 'user_id'. Which schema property communicates that the model must provide it?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "enum",
      "required",
      "description",
      "additionalProperties"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer creates two tools: 'get_weather' and 'create_invoice'. Why should their descriptions clearly distinguish read operations from write operations?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "Read operations always require more tokens than write operations",
      "Write operations cannot be represented using JSON Schema",
      "The model must execute read tools before every write tool",
      "The distinction helps the model select the appropriate operation and supports safer action handling"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A tool accepts a currency parameter. The application supports only USD, EUR, and AMD. Which schema feature is most appropriate?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "An enum restricting the currency to the supported values",
      "A numeric maximum of three",
      "A free-form string with no additional constraints",
      "An array requiring multiple currency values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A model repeatedly confuses a tool named 'process' with another tool named 'execute'. What is the most useful improvement?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "Rename both tools using shorter, less descriptive names",
      "Merge both tools into one unrestricted function",
      "Use names and descriptions that communicate each tool's distinct responsibility",
      "Increase the model's maximum output-token limit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer exposes an API operation as a tool and includes an optional parameter called 'sort_order'. What should the schema communicate?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "That the model must always provide the parameter",
      "That the parameter may be omitted and what values are supported when it is supplied",
      "That the parameter determines which model provider is selected",
      "That the parameter is ignored whenever another argument is present"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a tool schema expose only the parameters that the model needs to control?",
    "topic": "Defining tools: names, descriptions and input schemas",
    "choices": [
      "To ensure that every tool call contains exactly one parameter",
      "To eliminate the need for backend authorization",
      "To prevent the model from calling the tool more than once",
      "To reduce ambiguity, limit invalid inputs, and avoid exposing unnecessary implementation details"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the first step in a typical tool-use interaction?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "The application executes every available tool before contacting the model",
      "The model requests a tool by producing a structured tool call in its response",
      "The tool sends its result directly to the user without application involvement",
      "The application assumes which tool the model needs based on the user's message"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After receiving a model-generated tool call, what should the application generally do?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "Execute the requested operation after validating its name, arguments, and permissions",
      "Send the tool call directly to the user as the final answer",
      "Modify the model's system prompt to include the tool implementation",
      "Return an empty assistant message and wait for another user request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A tool successfully retrieves an order record. What should happen next in a typical tool-use loop?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "The application permanently modifies the model's training parameters",
      "The application starts a new unrelated conversation",
      "The model automatically receives the result without another API request in every API architecture",
      "The application returns the tool result to the model using the appropriate tool-result message"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does a tool-use loop often require multiple model API requests?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "Each tool requires a separate system prompt and a separate model",
      "The application must repeat the original user message after every tool call",
      "The model may need to inspect tool results before deciding what to do next or producing its final response",
      "Tool execution cannot occur between two assistant messages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer receives a tool call with an identifier and executes it. Why should the application preserve and use the corresponding call identifier when returning the result?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "It allows the API to match the returned result to the specific tool call",
      "It determines the number of retries allowed for the conversation",
      "It identifies which database table the tool should access",
      "It converts the tool result into a system message automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A model requests a tool, but the application returns the result without making another model request. What is the likely limitation?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "The tool result is automatically discarded by the API",
      "The model cannot use the tool result to formulate or refine its final response",
      "The application cannot store the tool result in its database",
      "The original user message becomes invalid after tool execution"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A tool-enabled assistant returns a final answer immediately after requesting a tool, without waiting for execution. What is the primary problem?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "The model cannot generate final answers after tool calls",
      "The API automatically rejects every assistant response containing a tool call",
      "The tool must be executed by the model's internal runtime",
      "The answer may claim results that have not yet been obtained from the tool"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An application supports multiple rounds of tool use. Which condition should normally terminate the tool-use loop?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "The application has executed exactly one tool",
      "The conversation contains more than two assistant messages",
      "The model returns a final response or the application reaches a defined execution limit",
      "The model generates a response containing more than 100 tokens"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should an application maintain a clear distinction between assistant tool-call messages and tool-result messages?",
    "topic": "The tool-use loop: request, execute, return result",
    "choices": [
      "They represent different stages of execution and must be associated correctly for the model to interpret the interaction",
      "Tool-call messages are excluded from the context window, while results are always included",
      "Assistant messages can only contain natural language, while tool results can only contain numbers",
      "Tool results automatically become permanent application memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A model requests two independent operations: retrieving a user's profile and retrieving current weather. Which execution strategy is most appropriate?",
    "topic": "Parallel tool calls",
    "choices": [
      "Execute the profile request, then wait for a new user message before retrieving weather",
      "Run both operations concurrently because neither depends on the other's result",
      "Merge both operations into one tool call with an arbitrary combined parameter",
      "Execute only the operation appearing first in the model response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is sequential tool execution preferable to parallel execution?",
    "topic": "Parallel tool calls",
    "choices": [
      "Whenever two tools use different API providers",
      "Whenever the application contains more than one available tool",
      "When each operation must be performed by a different worker",
      "When a later operation depends on the result of an earlier operation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An agent needs to retrieve three independent documents from separate services. What is a potential advantage of parallel tool calls?",
    "topic": "Parallel tool calls",
    "choices": [
      "They eliminate the need to validate the returned documents",
      "They guarantee that every service responds successfully",
      "They can reduce total waiting time compared with executing the requests sequentially",
      "They guarantee that the documents will be returned in chronological order"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A model requests two tool calls in parallel, but the second operation requires the identifier returned by the first. What should the application do?",
    "topic": "Parallel tool calls",
    "choices": [
      "Execute the first operation, obtain its result, and then execute the dependent second operation",
      "Execute both operations simultaneously and assume the identifier will be available",
      "Cancel the first operation and generate an identifier locally",
      "Return fabricated results for both operations to preserve the conversation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An application executes several parallel tool calls. One fails while the others succeed. What is a reasonable handling strategy?",
    "topic": "Parallel tool calls",
    "choices": [
      "Discard every successful result and restart all operations indefinitely",
      "Preserve successful results, represent the failure explicitly, and let the application or model decide whether recovery is needed",
      "Treat the failed operation as successful because the other operations completed",
      "Return only the failed operation and permanently discard the remaining results"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A model requests five tool calls, but the application allows a maximum of two concurrent operations. What should the application do?",
    "topic": "Parallel tool calls",
    "choices": [
      "Reject the entire conversation because the model exceeded its concurrency limit",
      "Increase the model temperature until it requests fewer tools",
      "Execute all five simultaneously because the model controls concurrency",
      "Schedule the calls in batches while respecting the configured concurrency limit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should an application consider dependencies and side effects before executing tool calls concurrently?",
    "topic": "Parallel tool calls",
    "choices": [
      "Parallel calls always consume fewer tokens than sequential calls",
      "Concurrent execution guarantees consistent database snapshots",
      "Operations may conflict, depend on each other, or produce unsafe execution ordering",
      "The model cannot interpret results from concurrent operations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Two tool calls update the same account balance concurrently. What is the main engineering concern?",
    "topic": "Parallel tool calls",
    "choices": [
      "A race condition or lost update may occur without appropriate transactional coordination",
      "The model will automatically merge both balances into a single result",
      "The API will convert both operations into read-only requests",
      "The account identifier will become invalid after the first update"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer executes independent read-only tools concurrently. Which implementation detail is important when returning their results to the model?",
    "topic": "Parallel tool calls",
    "choices": [
      "Return only the result of the slowest operation",
      "Associate each result with its corresponding tool-call identifier",
      "Convert all results into a single system message",
      "Return results in the same order as they complete, without preserving call identifiers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A model requests multiple tools, but one operation must complete before another begins. What does this imply about the orchestration design?",
    "topic": "Parallel tool calls",
    "choices": [
      "All operations must be executed simultaneously",
      "The application should ignore the dependency and trust the model",
      "The tools must be combined into one unrestricted function",
      "The application must represent dependencies and schedule execution accordingly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A tool fails because an external service is temporarily unavailable. What should the application return to the model?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "A clear, structured error indicating the failed operation and whether retrying may help",
      "A successful result containing an empty object",
      "An unrelated response from another available tool",
      "A message claiming that the requested operation completed successfully"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is returning a useful error to the model preferable to returning only 'Something went wrong'?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "The model can automatically repair the external service without application code",
      "The model can use the failure details to select a reasonable recovery action or communicate the limitation",
      "A detailed error guarantees that the tool will succeed on the next attempt",
      "The model requires the complete server stack trace to understand every failure"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A tool receives an invalid order identifier and returns an error. What should the application communicate?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "The external database is temporarily unavailable",
      "The order has been successfully deleted",
      "The request failed because the supplied order identifier is invalid or does not match an existing order",
      "The model should generate a random order identifier and repeat the operation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An external service returns HTTP 503 during tool execution. Which error classification is most appropriate?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "A permanent authorization failure",
      "A successful tool result with missing fields",
      "A validation error caused by malformed model arguments",
      "A potentially transient service-availability failure"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A tool returns a raw internal database exception containing connection strings and credentials. What should the application do before returning the error to the model?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "Sanitize sensitive implementation details and return a safe, actionable error description",
      "Return the full exception because the model needs internal infrastructure details",
      "Convert the exception into a system message with higher priority",
      "Remove the error and pretend the tool returned an empty successful result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A tool fails because the requested resource does not exist. Should the application retry the same request automatically?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "Yes, because every failed tool operation is a temporary failure",
      "Yes, but only after increasing the model temperature",
      "No, because retrying unchanged arguments is unlikely to resolve a permanent resource-not-found condition",
      "No, because tool execution errors must never be communicated to the model"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A model receives a tool error indicating that an argument is outside the supported range. What is a reasonable next action?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "Repeat the same tool call indefinitely",
      "Revise the argument based on the error and retry if the correction is justified",
      "Ignore the error and tell the user the operation succeeded",
      "Change the tool implementation automatically without authorization"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A tool returns a partial result because one of several requested records could not be retrieved. How should this result be represented?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "As a complete success with no indication of missing records",
      "As a total failure with all successfully retrieved records removed",
      "As a fabricated complete dataset using estimated values",
      "As a partial result that identifies successful data and explicitly reports missing or failed items"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An agent repeatedly retries a failed tool call with identical arguments. Which safeguard is most appropriate?",
    "topic": "Tool errors and returning useful failures",
    "choices": [
      "Set retry limits and classify errors so permanent failures do not create endless loops",
      "Increase the context window after each retry",
      "Allow retries to continue until the model produces a final answer",
      "Remove error details from tool responses to simplify model interpretation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer is designing a tool for an LLM that retrieves user orders. Which interface is generally preferable?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "A tool requiring the model to construct SQL joins across every database table",
      "A tool accepting an unrestricted command string for every possible operation",
      "A focused tool accepting clear parameters such as user ID, status, and pagination limit",
      "A generic tool accepting an entire database connection configuration"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should tool interfaces expose domain-level operations instead of requiring the model to understand internal infrastructure?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "Domain-level tools eliminate the need for backend business logic",
      "They reduce the model's reasoning burden and isolate infrastructure details behind stable interfaces",
      "They allow the model to access the application's database without restrictions",
      "They guarantee that all external services use identical response formats"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An application provides a tool named 'update_customer' that can modify names, email addresses, payment settings, and account permissions. What is a potential design problem?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "The tool contains too few parameters to support realistic operations",
      "The tool cannot be represented by a JSON Schema",
      "The tool must always be executed in parallel with a read operation",
      "The broad interface combines operations with different permissions and risks, making safe tool selection harder"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer wants the model to find an order by its public reference. Which tool interface is most appropriate?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "A lookup operation accepting a clearly named order reference",
      "A tool requiring a complete database query written in SQL",
      "A tool accepting a raw HTTP request with arbitrary headers and body",
      "A generic tool that accepts a Python script to search the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should a tool return concise, relevant, structured results instead of an entire database record?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "Large tool results are automatically rejected by every LLM provider",
      "Structured results prevent the model from using previous conversation context",
      "Relevant results reduce token consumption and limit exposure of unnecessary information",
      "Concise results guarantee that the model will never misunderstand the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A tool accepts a free-form date string, and the model frequently supplies ambiguous dates such as 'next Friday'. What is a useful interface improvement?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "Allow the model to generate any date representation without validation",
      "Define a clear date format and timezone requirement in the schema and description",
      "Remove the date parameter and infer the intended date from the user's account name",
      "Convert all dates into random Unix timestamps before execution"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A developer exposes a tool that can search all company documents. What is a useful way to improve the tool's usability?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "Require the model to supply the physical storage location of every document",
      "Return every document in the company's database on every request",
      "Allow arbitrary filesystem commands as search parameters",
      "Provide clear filters such as document type, date range, and search query"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should tool names and parameter names use consistent domain terminology?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "Consistent terminology helps the model map user requests to the intended tool and arguments",
      "Consistent naming makes backend authorization unnecessary",
      "The model uses parameter names as database indexes automatically",
      "The API requires every tool parameter to have the same name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A developer creates a tool that accepts a user's entire natural-language request and decides internally which of twenty unrelated operations to execute. What is a potential disadvantage?",
    "topic": "Designing tools for models, not humans",
    "choices": [
      "The tool becomes impossible to implement using Python",
      "The tool cannot return structured results to an LLM",
      "The interface hides operation boundaries and makes behavior, validation, and permissions harder to control",
      "The model automatically executes all twenty operations whenever the tool is available"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An agent has a tool that sends an email to a customer. Why is this operation different from a tool that searches email messages?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Searching email always requires a higher permission level than sending it",
      "Sending email creates an external side effect that may be difficult or impossible to reverse",
      "Sending email cannot be represented as a model tool call",
      "Searching email changes the customer's account state automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A model requests a tool call to transfer money between accounts. What should the backend verify before executing the operation?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Whether the model generated a sufficiently detailed explanation",
      "Whether the model used a temperature below 0.2",
      "Whether the tool call appears before other calls in the assistant message",
      "Whether the authenticated user is authorized and all business rules and required confirmations are satisfied"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it unsafe to rely on the model's decision alone to determine whether a user has permission to access a resource?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Model-generated decisions are not a substitute for authoritative backend authentication and authorization checks",
      "Models cannot understand user identifiers",
      "Models always return permission decisions as invalid JSON",
      "Authorization can only be performed by an external LLM provider"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An agent prepares a bank transfer but has not yet executed it. What is an appropriate human-in-the-loop design?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Execute the transfer immediately because the model selected the correct account",
      "Ask the model to confirm its own previous decision and then execute automatically",
      "Present the transfer details to the authorized user and require approval before execution",
      "Store the transfer request as a completed transaction until the user objects"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A tool creates a new customer account. The model accidentally requests the operation twice after a network timeout. Which design helps prevent duplicate account creation?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Increase the model's maximum output-token limit",
      "Use idempotency keys or equivalent deduplication controls for the operation",
      "Disable all tool-result messages after execution",
      "Allow the model to select a new customer identifier for each retry"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An application allows an agent to delete user records. Which permission design is most appropriate?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Grant the agent administrator access so it can handle every possible request",
      "Allow deletion whenever the model produces a valid JSON object",
      "Share the database root credentials with the tool implementation",
      "Restrict deletion to explicitly authorized operations and enforce the user's permissions in the backend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An agent can read calendar events and create new meetings. A user asks it to find available times. Which tool should normally be used first?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "The read-only availability or calendar-search tool",
      "The meeting-creation tool with a placeholder time",
      "The calendar-deletion tool to clear conflicting events",
      "The permission-management tool to grant additional calendar access"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A model requests a tool that sends a payment, but the user's application session has expired. What should the backend do?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Execute the payment because the model already selected the tool",
      "Use the last authenticated user's identity from the server logs",
      "Reject the operation until valid authentication and authorization are established",
      "Ask the model to generate a replacement access token"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A developer exposes an administrative tool that can change account permissions. Which design provides the strongest protection against misuse?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Allow every authenticated user to invoke the tool but log the calls",
      "Enforce strict authorization, validate the target and requested changes, and require appropriate approval",
      "Hide the tool description from the model while keeping unrestricted execution available",
      "Allow the model to determine whether the requesting user is an administrator"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An agent is allowed to send messages externally. Why should the application distinguish between drafting a message and sending it?",
    "topic": "Side effects, permissions and confirmation",
    "choices": [
      "Drafting requires administrator access, while sending requires no permissions",
      "The model cannot generate a message without first sending it",
      "Drafts always create irreversible external effects",
      "Sending causes an external side effect, so it may require additional authorization or explicit user confirmation"
    ],
    "answerIdx": 3
  }
]
```

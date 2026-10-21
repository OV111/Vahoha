LAYER: grpc-dev-1

```json
[
  {
    "stem": "What is the core idea behind a remote procedure call?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "Invoking code on another machine as if it were a local function",
      "Copying a function's source to the caller so it runs in the caller's process",
      "Streaming database rows straight into the caller's memory over a socket",
      "Compiling client and server into one shared binary that is deployed twice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement best contrasts RPC style with REST style?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "RPC exposes resources addressed by URLs, REST exposes actions to invoke",
      "RPC runs only inside one process, while REST is the only style usable across networks",
      "RPC returns only plain text payloads, while REST returns only binary payloads",
      "RPC exposes actions to invoke, REST exposes resources addressed by URLs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In RPC, what does a client stub do?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "Caches every response the server has ever sent so repeats are answered locally",
      "Validates the server's certificate chain against a trusted root store",
      "Looks like a local function but serializes the call and sends it",
      "Spreads incoming requests across the server's pool of worker threads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do RPC frameworks usually rely on an interface definition language (IDL)?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "It replaces the transport layer so no network protocol is needed at all",
      "The contract is written once and code is generated per language",
      "It encrypts every message automatically without certificates or keys",
      "It lets servers change method signatures freely without clients noticing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In gRPC, how is the operation to perform selected on the wire?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "By the HTTP verb, with GET for reads and DELETE for removals",
      "By a query-string parameter named action added to the URL",
      "By the value of the Accept header the client sends",
      "By the method path, such as /package.Service/Method"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a developer not treat a remote call exactly like a local function call?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "The network adds latency and failure modes such as timeouts",
      "Remote calls can only return numeric status codes, never data",
      "Remote calls always run on the caller's thread and block it forever",
      "Remote calls skip argument type checking on the server side entirely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "gRPC is best described as which kind of software?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "A relational database engine with a built-in query planner",
      "A front-end rendering library for building user interfaces",
      "A high-performance RPC framework",
      "A durable message queue broker with persistent topics"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does contract-first API design mean in the gRPC world?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "Write the server handlers first and extract a schema from them at runtime",
      "Write the .proto first, then generate client and server code from it",
      "Sign a legal agreement with API consumers before the first release ships",
      "Let clients send any data shape and validate it after the fact"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is REST over JSON often chosen for public browser-facing APIs instead of raw gRPC?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "Browsers lack the HTTP/2 framing and trailer control that native gRPC needs",
      "Browsers refuse to parse any binary data received over HTTP connections",
      "Raw gRPC cannot be carried over HTTPS, only over plain HTTP",
      "JSON is the only body format that the HTTP specification permits"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a common tradeoff of RPC compared with REST?",
    "topic": "What RPC is & how it differs from REST",
    "choices": [
      "Responses can no longer be delivered back to the original caller in order",
      "Servers lose the ability to push data, so clients must always poll",
      "Tighter coupling between client and server through a shared schema",
      "Every service in the system must be written in the same language"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a main reason Protobuf payloads are usually smaller than JSON?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Every message is automatically gzip-compressed before it leaves the sender",
      "Whitespace is stripped, but key names are still sent as full text",
      "Only fields holding string values are included in the output",
      "Numeric field tags and compact binary values replace key names"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you open a raw Protobuf message in a text editor?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "You read clear text because field names are stored as plain-text keys",
      "You see unreadable bytes unless you have the schema or a decoder",
      "You read clear text because the payload is base64-encoded JSON",
      "You read clear lines because each field sits on its own row"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about schemas is correct?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Protobuf needs a .proto schema to decode, while JSON describes itself",
      "JSON needs a compiled schema, while Protobuf describes itself",
      "Neither format can ever be used together with a schema file",
      "Both formats embed their full schema inside every message they send"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What type-safety benefit does Protobuf give over hand-parsed JSON?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "The server rejects any message that is larger than a few kilobytes",
      "Types are guessed at runtime from whatever values happen to arrive",
      "String fields are automatically validated as well-formed email addresses",
      "Generated classes enforce field types at compile time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is decoding Protobuf generally faster than parsing JSON?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Protobuf messages are cached on disk as already-parsed object trees",
      "The CPU reads the incoming bytes directly as objects, with no decoding step",
      "Fields are read by tag and length with no text tokenizing",
      "Protobuf stores every value as a 64-bit integer so no conversion is ever needed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In which situation is JSON usually still the better choice than Protobuf?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "High-volume traffic between internal microservices in one data center",
      "A public API where third parties hand-write and inspect payloads",
      "Mobile clients on slow links sending frequent small updates",
      "Backend telemetry streams carrying very high message rates"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Protobuf decoder typically do when it meets a field number it does not know?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Rejects the entire message with a parse error",
      "Keeps it as an unknown field",
      "Overwrites the nearest known field with the received value",
      "Converts the value to a string and stores it under an extra key"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do number types differ between JSON and Protobuf?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Protobuf has a single number type, while JSON has int32 and double",
      "Both formats store every number as decimal text digits",
      "JSON numbers are always 64-bit signed integers with no fractions",
      "Protobuf has int32, double and others, while JSON has one number type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A team sends the same data once as REST+JSON and once as gRPC+Protobuf. What is the most likely measurable gain?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Automatic browser caching of every response without any headers",
      "Built-in encryption that makes TLS setup unnecessary",
      "Less bandwidth and less CPU spent on serialization",
      "Removal of the need for a running server process"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can one .proto schema be used to generate code in several programming languages?",
    "topic": "Protocol Buffers vs JSON",
    "choices": [
      "Yes, each language has its own protoc plugin",
      "No, each language requires its own dialect of the schema language",
      "Only for languages that run on the JVM and share its bytecode",
      "Only for languages that provide a built-in garbage collector"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is serialization?",
    "topic": "Binary serialization basics",
    "choices": [
      "Turning an in-memory structure into bytes for storage or transport",
      "Sorting records by primary key before they are written to disk",
      "Splitting a message into numbered network packets for sending",
      "Encrypting data with a shared symmetric key before storing it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is deserialization?",
    "topic": "Binary serialization basics",
    "choices": [
      "Removing duplicate records from a stored data set",
      "Reassembling TCP packets into the correct order",
      "Decrypting stored data with a private key",
      "Rebuilding an in-memory object from bytes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main idea of a varint?",
    "topic": "Binary serialization basics",
    "choices": [
      "Every integer takes exactly four bytes so sizes are predictable",
      "Small numbers take fewer bytes",
      "Integers are stored as decimal text with one digit per byte",
      "Large integers are split across several separate messages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In the Protobuf wire format, what does the key before each field value contain?",
    "topic": "Binary serialization basics",
    "choices": [
      "The field name and its declared type name",
      "The field's byte offset within the message and a checksum",
      "The field number and a wire type",
      "The total message length and a schema version number"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How is a string field encoded on the Protobuf wire?",
    "topic": "Binary serialization basics",
    "choices": [
      "The characters followed by a null terminator byte",
      "A fixed 256-byte slot padded out with zero bytes",
      "A length prefix, then UTF-8 bytes",
      "Base64 text wrapped in double quotes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Fixed-width Protobuf types such as fixed32 use which byte order?",
    "topic": "Binary serialization basics",
    "choices": [
      "Little-endian",
      "Big-endian",
      "Network byte order, with the most significant byte first",
      "Whatever byte order the sending CPU happens to use natively"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does Protobuf offer sint32 and sint64 in addition to int32 and int64?",
    "topic": "Binary serialization basics",
    "choices": [
      "sint types store the sign in a separate extra message field",
      "ZigZag keeps small negative numbers short, while negative int32 values take many bytes",
      "int32 cannot represent any negative number at all",
      "sint types are compressed with gzip before they are sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Binary formats like Protobuf are not self-describing. What does that imply?",
    "topic": "Binary serialization basics",
    "choices": [
      "Readers must run on the same CPU architecture as the sender",
      "The bytes can only be read by the exact program that wrote them",
      "Readers must stay connected to the sender to decode each message",
      "Readers need the schema to interpret the bytes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In proto3, what usually happens to a plain scalar field holding its default value, such as 0, when serialized?",
    "topic": "Binary serialization basics",
    "choices": [
      "It is written as an explicit zero value with its tag",
      "It is left out of the encoded bytes",
      "It makes the serializer raise a validation error",
      "It is replaced by a special null marker in the output"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does the order of fields on the wire matter to a Protobuf parser?",
    "topic": "Binary serialization basics",
    "choices": [
      "No, each field carries its own tag",
      "Yes, fields must appear in alphabetical order of their names",
      "Yes, fields must follow the exact declaration order of the .proto file",
      "Yes, but only for repeated fields, which must be sorted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the protoc command do?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "Runs a gRPC server directly from a .proto file",
      "Converts JSON files into binary on the fly",
      "Compiles .proto files and generates code through plugins",
      "Starts a proxy that forwards gRPC calls to backends"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a gRPC plugin needed alongside protoc for service stubs?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "protoc cannot read service definitions in any form",
      "Plugins make protoc compile faster on large schemas",
      "Plugins convert the .proto file to JSON before protoc reads it",
      "A language-specific plugin that protoc invokes emits the service code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When you pass --go_out to protoc, how does it find the generator?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "It downloads the plugin from the gRPC website at run time",
      "It reads a plugin list from the header of the .proto file",
      "It loads a class named Go from the Java classpath",
      "It looks for an executable named protoc-gen-go on the PATH"
    ],
    "answerIdx": 3
  },
  {
    "stem": "protoc reports that it cannot find an imported .proto file. What is the likely fix?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "Rename the import path so it uses backslashes",
      "Add the file's directory to protoc's proto path",
      "Install the gRPC runtime library in the project",
      "Regenerate the plugin binary using a newer compiler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does --go_out=. tell protoc to do?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "Use the current directory as the import search path",
      "Print the generated Go code to standard output only",
      "Run the Go generator and write output under the current directory",
      "Compile every Go file found in the current directory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must the protoc plugin version and the runtime library stay roughly compatible?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "Generated code calls the runtime, so a big mismatch can break build or run",
      "protoc encrypts generated code with a version-specific key",
      "The runtime library rewrites the .proto file at startup",
      "A mismatch only changes how comments are formatted in output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does running protoc with the Go plugin on user.proto typically produce?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "A .class file that runs on the JVM",
      "A single binary executable for the service",
      "A .pb.go file with Go types and serialization code",
      "A Dockerfile that builds the service image"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do teams pin protoc and plugin versions, for example in CI?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "protoc refuses to run without a license file present",
      "Every machine then regenerates identical code",
      "Plugin versions change the wire format of messages",
      "Unpinned plugins cannot read comments in .proto files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After installing protoc, what is the quickest check that it is available?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "Run protoc --serve and look for an open port",
      "Open a .proto file in a browser and check it renders",
      "Run grpcurl list against localhost",
      "Run protoc --version"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tool can replace direct protoc calls and also manage plugins and linting?",
    "topic": "Installing protoc & plugins",
    "choices": [
      "The Buf CLI",
      "The Webpack bundler",
      "Terraform",
      "Postman collections"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP/2 feature lets many requests share one TCP connection at the same time?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "Pipelining of text lines",
      "Connection pooling on the server",
      "Multiplexing of streams",
      "Chunked transfer coding"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does HTTP/2 carry data on the wire?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "As newline-delimited text lines like HTTP/1.1",
      "As UDP datagrams with no framing at all",
      "As XML envelopes wrapped around each request",
      "As binary frames"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does HPACK do in HTTP/2?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "Compresses the request body with gzip before sending",
      "Compresses headers so repeated fields cost fewer bytes",
      "Encrypts headers with the TLS session key",
      "Splits headers across several parallel TCP connections"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which HTTP/1.1 problem does HTTP/2 multiplexing reduce?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "Needing many connections or waiting behind earlier requests on one",
      "Slow DNS lookups before the first request can be sent",
      "Unencrypted TLS handshakes exposing the request line",
      "Servers being unable to set cookies on responses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a stream in HTTP/2?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "An independent bidirectional sequence of frames inside one connection",
      "A TCP connection between two hosts",
      "A file stored on the server's disk",
      "A single HTTP header line"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does gRPC require HTTP/2?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "HTTP/2 is the only protocol that is able to carry JSON",
      "HTTP/1.1 cannot carry binary data in a request body at all",
      "HTTP/2 removes the need for TLS in every situation",
      "It builds on streams, binary framing, flow control and trailers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does gRPC place the final call status in HTTP/2 terms?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "In the first line of the response",
      "In a cookie set on the response",
      "In trailers after the response body",
      "In the query string of the request URL"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does HTTP/2 flow control work?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "Senders pause for a fixed 100 ms between frames",
      "Receivers advertise window sizes that cap data a sender may have in flight",
      "Servers drop the oldest frame whenever a buffer fills up",
      "Clients must open a fresh connection after every 64 KB sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How many TCP connections does a typical HTTP/2 client open to one origin?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "One per request",
      "Usually one",
      "One per header field",
      "Always exactly six"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is ALPN used for when HTTP/2 runs over TLS?",
    "topic": "HTTP/2 fundamentals",
    "choices": [
      "It compresses the certificate chain to speed up connection setup",
      "It selects the key length of the negotiated cipher suite",
      "Both sides agree on the application protocol, such as h2, during the handshake",
      "It resolves the server's IP address before connecting"
    ],
    "answerIdx": 2
  },
  {
    "stem": "gRPC was created at Google and is now hosted by which foundation?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "The Cloud Native Computing Foundation",
      "The Apache Software Foundation",
      "The Eclipse Foundation",
      "The OpenJS Foundation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does gRPC's multi-language support matter for microservices?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "All services are automatically rewritten into a single common language",
      "Each language needs its own separate transport protocol to interoperate",
      "Languages can share process memory directly across service boundaries",
      "A Go service and a Node service can share one .proto contract"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are the four kinds of RPC that gRPC supports?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "Unary, server streaming, client streaming and bidirectional streaming",
      "GET, POST, PUT and DELETE",
      "Query, mutation, subscription and event",
      "Request, response, publish and subscribe"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is grpcurl?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "A library that lets browsers speak gRPC natively without a proxy",
      "A load balancer built specifically for gRPC traffic",
      "A compiler that turns .proto files into native binaries",
      "A command-line tool for calling gRPC services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is gRPC-Web for?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "Serving static web pages directly from a gRPC server",
      "Letting browsers call gRPC services, usually through a proxy",
      "Replacing TLS for web traffic with a lighter protocol",
      "Compiling .proto files into HTML forms"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does grpc-gateway generate?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "A browser client library with typed React hooks",
      "A database schema derived from message definitions",
      "A reverse proxy exposing a gRPC service as REST/JSON",
      "A Kubernetes manifest for each service in the proto"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool offers linting, breaking-change detection and a schema registry for .proto files?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "Envoy",
      "Prometheus",
      "Buf",
      "Jaeger"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Envoy's role in the gRPC ecosystem?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "A code generator that turns .proto files into Go sources",
      "A Protobuf compiler plugin for the Node ecosystem",
      "A JSON schema validator for REST request bodies",
      "A proxy that routes and load balances gRPC and can translate gRPC-Web"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which cross-cutting features does gRPC provide out of the box?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "Relational storage with automatic schema migrations",
      "Deadlines, cancellation, metadata, interceptors and pluggable auth",
      "Server-side HTML templating with cookie sessions",
      "A durable message broker with persistent queues"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are gRPC's default transport and serialization pair?",
    "topic": "The gRPC ecosystem overview",
    "choices": [
      "HTTP/2 and Protocol Buffers",
      "HTTP/1.1 and JSON",
      "WebSocket and MessagePack",
      "UDP and Avro"
    ],
    "answerIdx": 0
  }
]
```

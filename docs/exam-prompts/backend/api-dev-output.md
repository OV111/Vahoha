LAYER: api-dev-1

```json
[
  {
    "stem": "What does a router do with an incoming packet?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "Reads the destination IP address and forwards the packet toward the next hop",
      "Reads the destination domain name and asks the website to accept the packet",
      "Holds the whole message until every packet has arrived, then forwards it",
      "Opens a TCP connection to the destination and relays the data over it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is data split into packets before it crosses the internet?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "Each packet is encrypted on its own, which is what makes the internet secure",
      "Routers can only forward data in fixed-size chunks set by the ISP contract",
      "A packet carries one full HTTP request so servers never wait for more data",
      "Packets can take different routes and be resent individually if one is lost"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main role of an ISP?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "Hosts the websites that you visit and keeps the DNS records that point to them",
      "Registers domain names and renews them for website owners each year",
      "Connects your network to the wider internet and carries your traffic onward",
      "Encrypts all traffic between your device and the sites you visit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an IP address identify?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "The application on a host that should receive the traffic",
      "A network interface, so packets can be delivered to the right device",
      "The person or company that owns the website being visited",
      "The type of content, such as HTML or JSON, inside the packet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a port number identify on a host?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "Which physical network card the data should leave through",
      "Which router along the path should forward the packet next",
      "Which domain name the client originally typed into the browser",
      "Which application or service should receive the incoming traffic"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Each IP packet carries a hop limit (often called TTL) that routers decrement. What is it for?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "It stops packets stuck in a routing loop from circulating forever",
      "It tells caches how many seconds they may keep the packet's data",
      "It caps the packet size before it has to be fragmented",
      "It tells the receiver how many packets are still to come"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A video call looks sharp but there is a long delay between speaking and being heard. Which network property is the likely problem?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "Low bandwidth, the maximum data the link can carry per second",
      "High packet loss, the share of packets that never arrive",
      "High latency, the time data takes to travel between the two ends",
      "Low throughput, the total amount of data moved over the session"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the traceroute tool show?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "The chain of DNS servers that were consulted to resolve the domain name",
      "The routers (hops) a packet passes through on its way to a destination",
      "The list of TCP ports that are currently open on the destination host",
      "The ISP that owns the destination server's IP address block"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A packet's destination is outside your local network. Where does your device send it?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "To the default gateway, which forwards it toward the destination",
      "Broadcast to every local device until one of them claims it",
      "Directly to the destination server's hardware (MAC) address on that network",
      "To your DNS server, which relays it to the destination"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In the TCP/IP model, at which layer do HTTP and DNS operate?",
    "topic": "How the internet works — packets, routers, ISPs",
    "choices": [
      "Transport layer",
      "Internet layer",
      "Application layer",
      "Link layer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the primary job of DNS?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "Encrypt requests between the browser and the server",
      "Assign IP addresses to devices joining a network",
      "Verify that a website's certificate was issued by a trusted authority",
      "Translate human-readable domain names into IP addresses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a DNS A record do?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "Maps a hostname to an IPv6 address",
      "Maps a hostname to an IPv4 address",
      "Points one hostname at another hostname as an alias",
      "Names the mail servers that accept email for a domain"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which DNS record type maps a hostname to an IPv6 address?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "AAAA",
      "A",
      "CNAME",
      "PTR"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a CNAME record do?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "Maps a hostname directly to an IPv4 address",
      "Lists the nameservers that are authoritative for the zone",
      "Stores arbitrary text, such as a domain verification token",
      "Makes one hostname an alias that points to another hostname"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the TTL on a DNS record control?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "How many hops the DNS query may take before it is dropped",
      "How long the domain registration stays valid before renewal",
      "How long resolvers may cache the answer before asking again",
      "How many times a client may retry a failed lookup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "You will move your API to a new server IP tomorrow. What should you do today so the change reaches users quickly?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "Raise the TTL on the A record so more resolvers cache it",
      "Lower the TTL on the A record so cached copies expire sooner",
      "Replace the A record with a CNAME so it updates instantly",
      "Restart the old server so it flushes resolvers' caches"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a recursive resolver do?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "Stores the master copy of the records for a domain it owns",
      "Queries other DNS servers for the client and caches the answers",
      "Redirects the browser to another domain when a name is missing",
      "Signs DNS responses so clients can confirm they are authentic"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an authoritative nameserver?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "A resolver run by your ISP that caches DNS answers for all of its customers",
      "The server that tells browsers which certificates to trust",
      "A server that forwards queries to the root servers on request",
      "Holds the real records for a domain and gives the definitive answer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "With an empty cache, in what order does a resolver query servers to resolve api.example.com?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "Authoritative server first, then the .com TLD server, then a root server",
      "The .com TLD server, then the root server, then the authoritative server",
      "Root server, then the .com TLD server, then example.com's authoritative server",
      "Root server first, then straight to example.com's authoritative server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which DNS record type tells other servers where to deliver email for a domain?",
    "topic": "DNS — domain resolution, A records, TTL",
    "choices": [
      "MX",
      "TXT",
      "NS",
      "SRV"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP method is meant for retrieving a resource without changing server state?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "GET",
      "POST",
      "PUT",
      "PATCH"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a 404 status code tell the client?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "The request was understood but the user lacks permission",
      "The server failed while handling an otherwise valid request",
      "The client must authenticate before it can continue",
      "The server could not find a resource at the requested URL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A request arrives with missing or invalid credentials. Which status code is the correct response?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "403 Forbidden",
      "401 Unauthorized",
      "400 Bad Request",
      "405 Method Not Allowed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which status code best fits a POST request that successfully created a new resource?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "200 OK",
      "202 Accepted",
      "201 Created",
      "204 No Content"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a status code in the 5xx range mean?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "The client sent a bad request",
      "The resource moved to another location",
      "The server failed to handle the request",
      "The request succeeded but has no body"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After a timeout, a client retries its request. Which request is most likely to create a duplicate order?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "POST /orders",
      "PUT /orders/42",
      "DELETE /orders/42",
      "GET /orders/42"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Content-Type header describe?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "The character set the client prefers for the response",
      "The media type of the body in the message that carries it",
      "The compression algorithm applied to the body",
      "The length of the body in bytes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which request header tells the server which response formats the client can handle?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "Content-Type",
      "Allow",
      "Content-Encoding",
      "Accept"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does HTTPS add on top of plain HTTP?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "Faster delivery through compression of every response",
      "TLS encryption and server authentication through a certificate",
      "Automatic retries of requests that fail in transit",
      "A guarantee that the server's application code is free of bugs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 304 Not Modified response tell the client?",
    "topic": "HTTP/HTTPS — methods, status codes, headers",
    "choices": [
      "Its cached copy is still valid, so no body is sent",
      "The resource has moved permanently to a new URL",
      "The request was malformed and must be corrected",
      "The server refused to change the resource"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the sequence of the TCP three-way handshake?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "SYN, ACK, FIN",
      "ACK, SYN, SYN-ACK",
      "SYN, SYN-ACK, ACK",
      "SYN, SYN, ACK"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which transport protocol guarantees ordered delivery and retransmits lost data?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "UDP",
      "IP",
      "ICMP",
      "TCP"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which workload suits UDP best?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "A bank transfer where every single byte must arrive intact and in order",
      "A large software download that must be verified byte for byte at the end",
      "A git push where losing a single commit would corrupt the repository",
      "A live game sending position updates every frame, where old data is useless"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What transport does HTTP/3 run on?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "TCP with TLS 1.3",
      "QUIC, which is built on top of UDP",
      "SCTP with multiple streams",
      "Raw IP packets with no transport layer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does opening a new TCP connection add latency to the first request?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "The server must compile the handler before it can reply",
      "The client must wait for DNS to refresh before each request",
      "The handshake needs a round trip before application data can flow",
      "The operating system must reserve bandwidth for the connection first"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is TCP flow control for?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "Stops a fast sender from overwhelming a slow receiver",
      "Stops routers from becoming congested by many senders",
      "Chooses the quickest route through the network",
      "Encrypts segments so they cannot be read in transit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do HTTP clients reuse connections with keep-alive?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "To keep the server's session data alive between requests",
      "To make sure each request is sent over the same route",
      "To avoid repeating the TCP (and TLS) handshake for every request",
      "To stop the server from closing idle sockets for security reasons"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that UDP is connectionless?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "Datagrams are sent over a dedicated circuit that is kept open",
      "There is no handshake, and each datagram is sent independently",
      "Both sides must agree on a packet size before sending",
      "The receiver acknowledges each datagram before the next is sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does TCP do when a segment is not acknowledged before a timeout?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "Drops the connection immediately",
      "Skips it and continues with the next segment",
      "Asks the application to resend the whole message",
      "Retransmits the segment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are DNS queries usually sent over UDP?",
    "topic": "TCP vs UDP — connections, handshakes, reliability",
    "choices": [
      "A small single request and reply does not need a connection's overhead",
      "UDP encrypts each query so that intermediate resolvers cannot read it",
      "UDP guarantees that the reply will always arrive in the right order",
      "DNS answers are always too large to fit inside a single TCP segment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean that REST APIs are stateless?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "The server never stores any data in a database or file between requests",
      "Responses never change once they have been created and sent to a client",
      "Each request carries all the information the server needs to handle it",
      "Clients are not allowed to send cookies or custom headers with requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which URL best follows REST resource naming?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "GET /getUserOrders?id=42",
      "POST /deleteUser/42",
      "GET /user/orders/fetch/42",
      "GET /users/42/orders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the uniform interface constraint mean?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "Every endpoint must return exactly the same JSON shape for every resource",
      "Resources are handled through the same standard methods and formats",
      "All requests must go through a single URL and a single HTTP method",
      "Clients and servers must be implemented in the same programming language"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between PUT and PATCH?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "PUT replaces the whole resource, while PATCH changes only the fields sent",
      "PUT creates a resource, while PATCH deletes part of it",
      "PUT is cacheable, while PATCH is not",
      "PUT is used for collections, while PATCH is used for single items"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code is the usual reply to a successful DELETE that returns no body?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "204 No Content",
      "200 OK with an empty array",
      "202 Accepted",
      "410 Gone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does statelessness help an API scale?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "The server needs no database at all to be able to answer a request",
      "Responses can never be stale because nothing is remembered by the server",
      "Clients no longer need to send credentials or tokens on each call",
      "Any server instance can handle any request, so instances can be added freely"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it acceptable that a second DELETE /users/7 returns 404 when the first returned 204?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "It is not acceptable, since DELETE must return 204 every time to be idempotent",
      "The second call is invalid because a deleted resource cannot be addressed by a client",
      "Idempotency concerns the server state afterwards, which is the same, not the response",
      "The 404 proves that the first DELETE call failed to actually remove the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In REST, what is a representation?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "The database row or document that stores the resource on the server",
      "A document, such as JSON, describing a resource's current state",
      "The URL that uniquely identifies the resource on the server",
      "The HTTP method that a client uses to act on the resource"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which separation does the client-server constraint give you?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "The client and server must share one codebase",
      "The UI and the data storage can evolve independently",
      "The server must keep a session for every client",
      "The client must know the server's database schema"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A server keeps the user's current page number in memory and uses it on the next request. Which REST constraint does this break?",
    "topic": "REST architecture — resources, statelessness, uniform interface",
    "choices": [
      "Cacheability",
      "Layered system",
      "Statelessness",
      "Code on demand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is curl?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "A command-line tool for making HTTP requests",
      "A browser extension that renders JSON as a tree",
      "A server framework for building REST APIs",
      "A library that converts HTTP to HTTPS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A request works in Postman but fails in the browser with a CORS error. Why?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "Postman skips TLS verification, so the server accepts it",
      "The server only accepts requests coming from Postman's published IP range",
      "Browsers always send a different HTTP method than Postman does for the same call",
      "CORS is enforced by browsers, not by API clients such as Postman"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which curl flag sets a custom request header such as Content-Type?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "-H",
      "-d",
      "-X",
      "-o"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does curl -i add to the output?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "The request headers that curl sent",
      "Timing information for each phase of the request",
      "Verbose details of the TLS handshake",
      "The response status line and headers before the body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Postman environment variable like {{baseUrl}} useful for?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "Storing the response body of every call permanently for later runs",
      "Switching the same requests between local, staging and production",
      "Encrypting the requests that Postman sends over the network",
      "Generating documentation for the server's source code automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Network tab in browser DevTools let you do?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "Edit the server's source code and reload it live on the page",
      "Run curl commands from inside the page against its own server",
      "Inspect each request and response, with headers, status and timing",
      "Block the page from using DNS to look up its servers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the browser address bar a poor way to test a POST endpoint?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "It refuses to send any request to a URL that returns JSON",
      "It always sends requests without TLS encryption enabled",
      "It sends GET requests and cannot easily set a body or headers",
      "It strips the response body before it shows the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do cookies differ between a browser and an API client like curl?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "A browser never sends cookies on API calls, while curl always sends them",
      "Both ignore cookies unless the server's CORS policy explicitly permits them",
      "Curl stores cookies automatically, while a browser needs them set by hand each time",
      "A browser stores and sends matching cookies by itself, while curl must be told to"
    ],
    "answerIdx": 3
  },
  {
    "stem": "By default, what does curl do when it receives a 301 redirect?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "Follows the redirect automatically, up to a fixed redirect limit",
      "Shows the redirect response and does not follow it unless -L is used",
      "Retries the request as a POST to the redirected location",
      "Stops with an error because redirects are unsupported"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a browser show a rendered page while curl shows raw markup for the same URL?",
    "topic": "Browsers vs API clients — curl, Postman, Insomnia",
    "choices": [
      "The browser interprets the body by its Content-Type, while curl prints bytes",
      "The server always sends different data to curl than it sends to browsers",
      "Curl strips the styling and scripts from every page it downloads",
      "The browser downloads the page twice and merges the copies"
    ],
    "answerIdx": 0
  }
]
```

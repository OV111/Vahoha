LAYER: kubernetes-1

```json
[
  {
    "stem": "What is the main difference between a container and a virtual machine?",
    "topic": "Container versus virtual machine",
    "choices": [
      "A container runs its own guest kernel, while a virtual machine shares the kernel of the host",
      "A container needs a hypervisor to run, while a virtual machine does not need any",
      "A container shares the kernel of the host, while a virtual machine runs its own guest operating system",
      "A container can only run Windows programs, while a virtual machine runs Linux only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do containers usually start faster than virtual machines?",
    "topic": "Container versus virtual machine",
    "choices": [
      "They do not boot a whole operating system, because they use the running kernel of the host",
      "They keep a copy of the operating system in memory that is ready to be used",
      "They skip all network setup, so that they are able to start at once",
      "They run on special hardware that is built into every processor chip"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a hypervisor do?",
    "topic": "Container versus virtual machine",
    "choices": [
      "It builds container images from the source code of an application",
      "It schedules containers on the nodes of a cluster for an orchestrator",
      "It stores the images of containers in a registry for the team",
      "It creates and runs virtual machines by sharing the hardware of the host between them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which workload fits a virtual machine better than a container?",
    "topic": "Container versus virtual machine",
    "choices": [
      "One that is a small stateless web service with fast start up times",
      "One that needs a different operating system kernel or stronger isolation from the host",
      "One that is scaled up and down many times a day by an autoscaler",
      "One that is built and shipped as a single image by a pipeline"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is isolation of containers weaker than that of virtual machines?",
    "topic": "Container versus virtual machine",
    "choices": [
      "Containers have no network or file system of their own at all",
      "All containers share the host kernel, so a kernel flaw can affect several of them",
      "Containers can read the memory of all other processes by default",
      "Containers run as the administrator of the host without any limits"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of containers for developers?",
    "topic": "Container versus virtual machine",
    "choices": [
      "Programs do not need any libraries because the host provides all of them",
      "Applications no longer need configuration, since images hold all settings",
      "Code is compiled automatically each time the container receives a request",
      "The same image runs the same way on a laptop, in testing and in production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can containers and virtual machines be used together?",
    "topic": "Container versus virtual machine",
    "choices": [
      "Yes, containers often run inside virtual machines in the cloud",
      "No, a host can run only one of the two kinds of technology",
      "Yes, but only when both use exactly the same operating system",
      "No, because containers cannot start inside a virtual machine"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does immutable infrastructure mean for containers?",
    "topic": "Container versus virtual machine",
    "choices": [
      "Containers can be edited by hand through a shell while they are running",
      "Containers keep their state forever in their own writable layer",
      "Running containers are replaced by new ones from a new image, not changed in place",
      "Images are edited on the registry when a bug has been found"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a container runtime?",
    "topic": "Container versus virtual machine",
    "choices": [
      "The tool that writes a Dockerfile from the source code of an application",
      "The service that stores and serves images to the hosts of a cluster",
      "The software that creates and runs containers on a host, such as containerd",
      "The scheduler that decides on which node a container will run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the OCI?",
    "topic": "Container versus virtual machine",
    "choices": [
      "The Open Container Initiative, which defines standards for images and runtimes",
      "A company that sells containers to enterprises in the cloud",
      "A tool for scanning images for security problems before they run",
      "A programming language for writing container definitions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Docker image?",
    "topic": "Images, layers, and registries",
    "choices": [
      "A running instance of an application with its own process, network and filesystem",
      "A virtual machine with a full guest operating system inside of it",
      "A backup of a database that is stored as a compressed archive",
      "A read only template with the app and its dependencies that containers start from"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Docker container?",
    "topic": "Images, layers, and registries",
    "choices": [
      "A file that lists all of the packages that the application needs to run on the host",
      "A running instance of an image that is isolated from other processes on the host",
      "A registry where images are stored and shared between teams",
      "A tool that compiles the source code of the app into a binary"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a layer in a Docker image?",
    "topic": "Images, layers, and registries",
    "choices": [
      "A copy of the whole host operating system that is added on top",
      "A read only filesystem change that is created by one instruction and can be cached",
      "A folder in which the source code of the project is stored",
      "A network that connects two containers on the same host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Docker cache image layers?",
    "topic": "Images, layers, and registries",
    "choices": [
      "Layers are deleted after the build to save disk space",
      "Layers must be rebuilt from scratch on every single build",
      "Caching is required for the registry to accept an image",
      "Unchanged layers are reused, so rebuilds are much faster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do containers differ from virtual machines?",
    "topic": "Images, layers, and registries",
    "choices": [
      "Containers share the host kernel",
      "Containers include a full guest operating system with its own kernel",
      "Containers can only run on the same hardware as virtual machines do",
      "Containers cannot be isolated from the processes of the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Docker registry?",
    "topic": "Images, layers, and registries",
    "choices": [
      "A table in which the running containers are counted",
      "A file with the settings of the Docker daemon",
      "A service that stores and distributes images",
      "A log of the commands that were typed in the terminal"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does docker run do?",
    "topic": "Images, layers, and registries",
    "choices": [
      "Builds an image from the Dockerfile in the current folder",
      "Pushes an image to a registry of the team",
      "Creates and starts a container from an image",
      "Deletes all stopped containers on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to files that are written inside a container when it is removed?",
    "topic": "Images, layers, and registries",
    "choices": [
      "They are lost unless they were stored in a volume",
      "They are saved in the image for the next container",
      "They are copied to the git repository of the project",
      "They are moved to the registry together with the image"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between an image tag and its digest?",
    "topic": "Images, layers, and registries",
    "choices": [
      "A digest is a movable label that points at the newest build, while a tag is exact",
      "They are two names for the same value",
      "A tag is used only for containers and a digest only for volumes",
      "A tag is a movable label such as latest, a digest identifies the exact content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid relying on the latest tag in production?",
    "topic": "Images, layers, and registries",
    "choices": [
      "It is slower to download than any other tag",
      "It can point to a different image over time",
      "It is not allowed by Docker for production hosts",
      "It always refers to the oldest version of an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Dockerfile?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "A file that lists the containers that run together as one single application",
      "A text file with instructions for building an image",
      "A file that stores the secrets of the application",
      "A script that starts the Docker daemon"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the FROM instruction set?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "The folder that is copied into the image",
      "The registry that the image is pushed to",
      "The command that the container runs as soon as it has been started",
      "The base image on which the new image is built"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the COPY instruction do?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "Copies files from the build context into the image",
      "Copies the running container into a brand new image of the application",
      "Copies the image to another registry",
      "Copies environment variables to the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the RUN instruction do?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "Starts the container when the image is pulled",
      "Runs the tests of the app after every start",
      "Executes a command during the build and stores the result as a layer",
      "Runs a command on the host operating system"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between CMD and ENTRYPOINT?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "ENTRYPOINT can always be overridden by docker run, CMD cannot be",
      "They are the same instruction under two names",
      "CMD gives the default command that can be overridden, ENTRYPOINT sets the main executable",
      "CMD runs at build time and ENTRYPOINT runs on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why copy package.json and install dependencies before copying the rest of the code?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "Docker caches the install layer",
      "The installer cannot read package.json after the code is copied",
      "Node refuses to start unless the dependencies exist first",
      "Docker deletes the code if it is copied before the packages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the WORKDIR instruction do?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "Creates a volume that is shared with the host",
      "Sets the user that owns all of the files of the image in the container",
      "Defines the port that the container listens on",
      "Sets the working directory for the instructions that follow"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does EXPOSE do?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "Opens the port to the internet on the host machine",
      "Documents the port that the app listens on",
      "Maps the container port to a random port of the host",
      "Closes every other port of the container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the build context?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "The list of instructions that the Dockerfile contains",
      "The set of files that is sent to the Docker daemon when an image is built",
      "The network that the build runs in",
      "The registry that provides the base image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of a .dockerignore file?",
    "topic": "Writing Dockerfiles",
    "choices": [
      "Hiding the Dockerfile from the other users of the repository",
      "Making the container start faster by skipping its command",
      "Telling the registry which images to remove after a week",
      "Keeping files such as node_modules and .env out of the build context and the image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Docker volume?",
    "topic": "Container networking and volumes",
    "choices": [
      "Storage that is managed by Docker and outlives the container",
      "A copy of the image that is stored on the host for faster starts",
      "A limit on how much memory a container may use",
      "A network between two containers on one host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a volume and a bind mount?",
    "topic": "Container networking and volumes",
    "choices": [
      "A volume maps a host path into the container, a bind mount is managed by Docker",
      "They are identical and only the names differ",
      "A bind mount maps a host path into the container, a volume is managed by Docker",
      "A bind mount is read only and a volume is write only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a volume for a database container?",
    "topic": "Container networking and volumes",
    "choices": [
      "The database needs a volume to start at all",
      "Volumes make queries faster than the filesystem of the container does",
      "The data survives when the container is removed or replaced",
      "Volumes encrypt the data of the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a bind mount useful in development?",
    "topic": "Container networking and volumes",
    "choices": [
      "Source code changes on the host show up inside the container without a rebuild",
      "It makes the production image smaller",
      "It hides the files of the container from the host",
      "It replaces the need for a Dockerfile"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do containers on the same user defined network reach each other?",
    "topic": "Container networking and volumes",
    "choices": [
      "Only by the IP address of the host machine",
      "Only through the public internet",
      "They cannot reach each other without a volume",
      "By container or service name"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the option -p 8080:80 do?",
    "topic": "Container networking and volumes",
    "choices": [
      "Publishes port 8080 of the container on port 80 of the host",
      "Publishes port 80 of the container on port 8080 of the host",
      "Limits the container to 80 processes and 8080 files",
      "Sets the user and the password of the container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the default network driver for a single host?",
    "topic": "Container networking and volumes",
    "choices": [
      "overlay",
      "bridge",
      "host only",
      "macvlan"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a database port usually not be published to the whole internet?",
    "topic": "Container networking and volumes",
    "choices": [
      "Databases cannot be reached from outside of a container",
      "Published ports slow the database down",
      "Docker refuses to publish database ports",
      "Anyone could reach the database"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does docker network create do?",
    "topic": "Container networking and volumes",
    "choices": [
      "Creates a user defined network that containers can join",
      "Creates a new image from the network settings",
      "Creates a firewall rule on the host router",
      "Creates a volume that is shared by every container of the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a sign that two containers cannot talk to each other?",
    "topic": "Container networking and volumes",
    "choices": [
      "The image is larger than one gigabyte",
      "The container exits with code zero",
      "Connection refused or name resolution errors, often because they are on different networks",
      "The registry is down"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Linux namespace?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "A folder in the file system that holds the files of one container only",
      "A name that is given to a group of containers by an orchestrator",
      "A kernel feature that gives a process its own view of a resource, such as processes or network",
      "A limit on the memory that a process may use on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which namespace isolates the process ids that a container can see?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "The PID namespace",
      "The network namespace",
      "The mount namespace",
      "The user namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the network namespace give a container?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "Its own copy of the files of the host in a separate folder",
      "Its own view of the process list of the host machine",
      "Its own limit on CPU time for each process in the container",
      "Its own network interfaces, routes and ports"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are cgroups used for?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "Giving each process its own view of the file system of the host",
      "Limiting and accounting resources such as CPU and memory for groups of processes",
      "Encrypting the traffic between containers on the same host",
      "Storing the layers of images on the disk in a compact form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a container exceeds its memory limit in a cgroup?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "The kernel gives the container more memory from the host at once",
      "The kernel can kill a process of the container, which is an out of memory kill",
      "The container is moved to a host that has more memory automatically",
      "The kernel pauses the container until some memory is freed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the mount namespace provide?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "A private view of the processes that are running on the host",
      "A private network card that is used only by one container",
      "A private set of users that is not visible to the host",
      "A private view of the file system mounts, so a container sees its own root"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the user namespace allow?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "Mapping the root user inside a container to an unprivileged user on the host",
      "Giving all users of the host access to the files of the container",
      "Removing the need for any passwords inside of a container",
      "Sharing the user list of the host with every container at once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a container not need its own kernel?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "The container image already includes a complete copy of the kernel",
      "The container runs on the graphics processor of the host machine",
      "Namespaces and cgroups let it share the host kernel while staying isolated",
      "The hypervisor of the host provides a kernel for each container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a chroot like feature in containers?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "The process can read the root files of the host in a read only mode",
      "The process runs as the root user of the host with all of its rights",
      "The process sees a different root directory, which limits the files that it can reach",
      "The process is moved to a different machine in the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why drop Linux capabilities in a container?",
    "topic": "Namespaces and cgroups",
    "choices": [
      "It reduces what a compromised process can do, following least privilege",
      "It makes the container start faster because it needs less memory",
      "It lets the container use the network without any restrictions",
      "It is required by every container runtime before a container starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Docker Compose do?",
    "topic": "Running multi-container apps",
    "choices": [
      "Builds the Docker daemon from source code",
      "Compresses images to a smaller size",
      "Replaces the Dockerfile of each service",
      "Defines and runs multi container apps from a single YAML file"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a service in a compose file?",
    "topic": "Running multi-container apps",
    "choices": [
      "A system service of the host that starts at boot",
      "A named container definition, with an image or build, ports and settings",
      "A cloud provider offering that hosts the app",
      "A group of volumes that share a name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command starts all services of a compose file?",
    "topic": "Running multi-container apps",
    "choices": [
      "docker compose run all",
      "docker compose up",
      "docker start compose",
      "docker compose build only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does depends_on control?",
    "topic": "Running multi-container apps",
    "choices": [
      "Which services may read each other data",
      "Which services share a volume",
      "Which services are published to the internet",
      "The start order of the services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does depends_on alone guarantee that a database is ready for connections?",
    "topic": "Running multi-container apps",
    "choices": [
      "No, it only waits for the container to start",
      "Yes, it waits for the database to finish its startup",
      "Yes, but only on Linux hosts",
      "No, it never starts the database at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do services in one compose file reach each other?",
    "topic": "Running multi-container apps",
    "choices": [
      "By the IP address of the host machine and a random port number",
      "Only through the public internet",
      "By service name on the default network that compose creates",
      "By copying files between their containers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you keep database data between compose runs?",
    "topic": "Running multi-container apps",
    "choices": [
      "Copy the data folder into the image at build time of the database",
      "Keep the data in the memory of the container",
      "Declare a named volume and mount it in the database service",
      "Store the data in the compose file as text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a health check in a compose service?",
    "topic": "Running multi-container apps",
    "choices": [
      "Docker can tell whether the service works, and others can wait for it",
      "It restarts the host when a service is slow",
      "It encrypts the traffic of the service",
      "It removes unused images from the registry"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command stops and removes the containers and networks of a compose project?",
    "topic": "Running multi-container apps",
    "choices": [
      "docker compose pause",
      "docker compose stop all",
      "docker compose clean",
      "docker compose down"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is compose useful for local development?",
    "topic": "Running multi-container apps",
    "choices": [
      "It replaces the need for any images",
      "One command starts the whole stack",
      "It deploys the app to production automatically",
      "It makes the code run faster than on the host"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-2

```json
[
  {
    "stem": "What are the main components of the Kubernetes control plane?",
    "topic": "Cluster architecture and components",
    "choices": [
      "The kubelet, the container runtime and the kube proxy of each node",
      "The registry, the build server and the pipeline runner of the cluster",
      "The API server, etcd, the scheduler and the controller manager",
      "The load balancer, the firewall and the DNS server of the data center"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the API server do?",
    "topic": "Cluster architecture and components",
    "choices": [
      "It exposes the Kubernetes API and is the front door for all changes to the cluster",
      "It runs the containers of the applications on the worker nodes of the cluster itself",
      "It stores the images of the containers for all of the nodes of the cluster",
      "It schedules the pods on nodes with the most free memory in the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is etcd used for in a cluster?",
    "topic": "Cluster architecture and components",
    "choices": [
      "A cache that stores the images of the containers for faster starts",
      "A registry for the users and groups of the whole company",
      "A queue that carries the messages between the pods of the services",
      "A consistent key value store that holds the state of the cluster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the scheduler decide?",
    "topic": "Cluster architecture and components",
    "choices": [
      "Which user may create a new pod in a namespace of the cluster and with what rights",
      "Which node a new pod should run on, based on resources and constraints",
      "When a pod must be deleted because of a timeout of a minute",
      "Which image a pod should use when it is created by a team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the kubelet do on a node?",
    "topic": "Cluster architecture and components",
    "choices": [
      "It stores the state of the whole cluster in a database on the node",
      "It makes sure that the containers of the pods assigned to the node are running",
      "It decides which pods are placed on which nodes of the cluster",
      "It routes external traffic to the services that run in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does kube proxy do?",
    "topic": "Cluster architecture and components",
    "choices": [
      "It authenticates the users who call the API server of the cluster",
      "It builds the images of the pods for the nodes of the cluster",
      "It collects the logs of all of the containers of the nodes",
      "It maintains network rules on nodes so that traffic to a service reaches its pods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the controller manager?",
    "topic": "Cluster architecture and components",
    "choices": [
      "It runs controllers that move the actual state of the cluster toward the desired state",
      "It stores the desired state of the cluster in a file on each node",
      "It decides which nodes may join the cluster on the network",
      "It collects the metrics of the pods for the monitoring tools"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a node in Kubernetes?",
    "topic": "Cluster architecture and components",
    "choices": [
      "A group of pods that belong to the same application of a team",
      "A virtual partition of a cluster for one project of a company",
      "A machine, physical or virtual, that runs pods",
      "A configuration file that lists the services of the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is etcd usually run with several replicas and backups?",
    "topic": "Cluster architecture and components",
    "choices": [
      "It stores the images of the containers, which are large and slow to load",
      "It is the only component that runs the application containers",
      "It holds the whole state of the cluster",
      "Several replicas are needed so that the nodes can speak to each other"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a control loop?",
    "topic": "Cluster architecture and components",
    "choices": [
      "A controller watches the actual state and acts until it matches the desired state",
      "A loop in the code of an application that never stops running",
      "A network cable that connects two nodes in the data center",
      "A schedule that restarts the cluster every night at the same hour"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Pod?",
    "topic": "Pods and containers",
    "choices": [
      "A virtual machine that runs one container with its own operating system",
      "A group of nodes that share one network inside of a cluster",
      "A copy of an image that is kept in the registry of the cluster",
      "The smallest deployable unit, with one or more containers that share network and storage"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might a pod contain more than one container?",
    "topic": "Pods and containers",
    "choices": [
      "Each pod must have two containers, or it cannot be scheduled by Kubernetes",
      "They are tightly coupled and need to share network and storage",
      "One container holds the data and the other holds all of the logs",
      "Pods with several containers start faster than pods with one container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do containers in the same pod share?",
    "topic": "Pods and containers",
    "choices": [
      "The memory limit of the node, which they split between them equally",
      "The network namespace, so they can reach each other on localhost, and volumes",
      "The image layers of the registry, which are copied to each of them",
      "The users of the host, which are mapped to the pod on start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Are pods meant to be long lived and edited by hand?",
    "topic": "Pods and containers",
    "choices": [
      "Yes, administrators log in and fix each pod by hand when it fails or is slow",
      "Yes, a pod keeps its IP address and its changes for years",
      "No, a pod can only run for one minute before it is removed",
      "No, they are ephemeral, and controllers replace them when they fail"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a bare pod that is not managed by a controller if its node fails?",
    "topic": "Pods and containers",
    "choices": [
      "It is not recreated elsewhere, so it is lost",
      "It is moved to another node automatically within a few seconds",
      "It is restored from the backup of the etcd database at once",
      "It keeps running on the failed node with no changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the pod lifecycle phase Pending?",
    "topic": "Pods and containers",
    "choices": [
      "The pod has finished its work and its containers have stopped",
      "The pod is running and all of its containers are healthy",
      "The pod is accepted but its containers are not running yet",
      "The pod has been deleted and is waiting to be removed from etcd"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a restartPolicy of Always mean?",
    "topic": "Pods and containers",
    "choices": [
      "The pod is never restarted after it has stopped for any reason",
      "The pod is restarted only if it exits with an error code",
      "The kubelet restarts a container whenever it stops",
      "The pod is restarted once a day at a fixed time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between a container image and a container in a pod?",
    "topic": "Pods and containers",
    "choices": [
      "The image is a template, and the container is a running instance of it",
      "The container is a template, and the image is a running instance of it",
      "They are the same thing, and the name depends on the tool that you use",
      "The image is the pod specification and the container is a node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a pause container in a pod?",
    "topic": "Pods and containers",
    "choices": [
      "A container that stops the other containers when a limit is reached",
      "A container that pauses the deployment during an update",
      "A container that stores the logs of the pod for a week",
      "A small container that holds the network namespace of the pod"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you run a one off command inside a running container?",
    "topic": "Pods and containers",
    "choices": [
      "With kubectl create, which makes a new container in the pod",
      "With kubectl exec, which runs a command in the container",
      "With kubectl scale, which changes the number of pods",
      "With kubectl label, which adds a label to the container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you scale a deployment to five replicas?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "Copy the pod five times by hand on each worker node",
      "Set replicas to five, for example with kubectl scale or the manifest",
      "Increase the memory of the node until five pods can fit",
      "Create five clusters with one pod in each of them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a HorizontalPodAutoscaler do?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "It makes each pod larger by adding CPU and memory to it",
      "It moves pods from one cluster to another one in a different region of the cloud",
      "It deletes pods that have not received any requests for an hour",
      "It changes the number of replicas based on metrics such as CPU use"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a rolling update?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "Pods are replaced gradually, so the service stays available during the release",
      "All pods are stopped and then new ones are started at the same moment",
      "A new cluster is created and the old one is deleted after a week",
      "Pods are updated only when the traffic is zero, at night"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which settings control how fast a rolling update proceeds?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "replicas and namespace in the metadata of the object",
      "image and tag in the container specification of the pod",
      "maxSurge and maxUnavailable in the update strategy",
      "port and protocol in the service definition"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you roll back a bad deployment?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "Delete the cluster and create it again from the backup",
      "Edit the image of each pod by hand on each of the nodes of the cluster",
      "kubectl rollout undo, which returns to the previous revision",
      "Wait until the pods have crashed and restart the nodes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does kubectl rollout status show?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "The progress of a rollout, until it completes or fails",
      "The logs of all of the pods in the cluster in one stream",
      "The list of nodes with their free memory and disk space",
      "The history of the changes that were made to the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must a service be stateless to scale horizontally with ease?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "Stateless services use less CPU than every stateful service",
      "Stateless services can only run in a single replica at a time",
      "Kubernetes refuses to scale services that have state at all",
      "Any replica can handle any request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Recreate strategy do in a Deployment?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "It starts the new pods before the old ones are stopped",
      "It stops all old pods first and then starts the new ones, causing downtime",
      "It updates pods one at a time without any downtime",
      "It copies the old pods to a new namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a StatefulSet used for?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "Stateless web services that can be replaced at any moment",
      "Workloads that need stable identity and storage",
      "Jobs that run once and then stop for good",
      "Services that need to run on every node of the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a DaemonSet used for?",
    "topic": "ReplicaSets and Deployments",
    "choices": [
      "Running a database with a fixed number of replicas",
      "Running a task once at a set time of the day",
      "Running pods only on the master nodes of the cluster",
      "Running a copy of a pod on every node"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Service?",
    "topic": "Services and basic networking",
    "choices": [
      "A stable network address and name for a group of pods, with load balancing",
      "A system service of the host that starts at boot of the machine",
      "A container that runs the code of a single microservice",
      "A cloud offering that is billed for each request that it serves"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a Service choose its pods?",
    "topic": "Services and basic networking",
    "choices": [
      "With a fixed list of pod names that is written in the service",
      "With the node name on which the pods are scheduled",
      "With a label selector that matches the labels of the pods",
      "With a random choice from all pods of the namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a ClusterIP service?",
    "topic": "Services and basic networking",
    "choices": [
      "An address that is reachable from the internet through a cloud load balancer",
      "An address that is reachable on a port of every node of the cluster",
      "A virtual address that is reachable only inside the cluster",
      "An address that belongs to a single pod and moves with it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a NodePort service do?",
    "topic": "Services and basic networking",
    "choices": [
      "It exposes the service on a port of each node",
      "It hides the service from all of the nodes of the cluster",
      "It assigns one port to each pod of the service",
      "It blocks all of the ports that the node uses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a LoadBalancer service do in a cloud cluster?",
    "topic": "Services and basic networking",
    "choices": [
      "It balances the CPU load of the nodes by moving pods between them",
      "It limits the number of requests that the service accepts",
      "It copies the service to all of the regions of the provider",
      "It asks the cloud provider for an external load balancer that forwards to the service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are endpoints of a service?",
    "topic": "Services and basic networking",
    "choices": [
      "The URLs of the documentation pages for the service",
      "The IP addresses and ports of the pods that currently back the service",
      "The names of the users who may call the service",
      "The nodes on which the control plane runs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do clients call a Service and not a pod directly?",
    "topic": "Services and basic networking",
    "choices": [
      "Pods cannot be reached from other pods inside of the cluster",
      "Pods change and have changing addresses",
      "Pods only accept connections from the API server of the cluster",
      "Services are faster than pods for all kinds of traffic"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a headless service?",
    "topic": "Services and basic networking",
    "choices": [
      "A service that has no pods behind it and so never answers",
      "A service that is hidden from kubectl and from the API",
      "A service that is exposed only to the control plane",
      "A service without a cluster IP"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a pod reach a service in the same namespace by name?",
    "topic": "Services and basic networking",
    "choices": [
      "Through DNS, using the service name as the host name",
      "By reading the IP address from a file in the image",
      "By asking the API server for the address on every request",
      "By using the node name and a random port number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to traffic when a pod behind a service becomes unready?",
    "topic": "Services and basic networking",
    "choices": [
      "It keeps receiving traffic until the pod is deleted by hand",
      "It receives all traffic from the other pods as a priority",
      "It is removed from the endpoints, so it no longer receives traffic",
      "The service stops answering for all clients until the pod is ready"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a namespace?",
    "topic": "Namespaces and labels",
    "choices": [
      "A physical machine that is dedicated to one team",
      "A name that is given to each container image in the registry of the company",
      "A virtual partition of a cluster that groups and isolates resources",
      "A list of the users that may use the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use namespaces?",
    "topic": "Namespaces and labels",
    "choices": [
      "To separate teams, environments or applications, and to apply quotas and access rules",
      "To make the cluster faster by splitting its memory into parts",
      "To give each pod a separate kernel of its own on the host",
      "To store the logs of the cluster in separate files on each node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which namespaces exist by default?",
    "topic": "Namespaces and labels",
    "choices": [
      "dev, test, staging and production",
      "system, user, admin and guest",
      "app, data, cache and queue",
      "default, kube-system, kube-public and kube-node-lease"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a label?",
    "topic": "Namespaces and labels",
    "choices": [
      "A comment that is shown in the logs for an object only",
      "A key value pair that is attached to an object and used to select groups of objects",
      "A password that protects an object from being deleted",
      "A name that is unique in the whole cluster for each object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between labels and annotations?",
    "topic": "Namespaces and labels",
    "choices": [
      "Annotations are used for selection, labels hold non identifying metadata",
      "Labels are used for selection, annotations hold non identifying metadata",
      "They are the same, and the two names are used for historical reasons",
      "Labels are for pods only, and annotations are for services only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a label selector?",
    "topic": "Namespaces and labels",
    "choices": [
      "A tool that adds labels to all objects in a namespace",
      "A rule that prevents labels from being changed after creation",
      "A report that lists all labels in the cluster",
      "A query that picks the objects that have matching labels"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does kubectl get pods -l app=web show?",
    "topic": "Namespaces and labels",
    "choices": [
      "Pods in the namespace that carry the label app with the value web",
      "Pods that were created by the user with the name web",
      "Pods that run on a node with the name web",
      "All pods of the cluster, whatever their labels are"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can objects with the same name exist in different namespaces?",
    "topic": "Namespaces and labels",
    "choices": [
      "No, every name must be unique across the whole cluster",
      "Yes, but only for pods and never for services",
      "Yes, names must be unique only within a namespace for a given kind",
      "No, unless the namespaces belong to the same team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a ResourceQuota do?",
    "topic": "Namespaces and labels",
    "choices": [
      "It limits the resources that a single container may use",
      "It reserves a node for a namespace, so no one else can use it",
      "It limits the total resources that a namespace may use",
      "It sets the number of namespaces that a team may create"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are labels important for Deployments and Services?",
    "topic": "Namespaces and labels",
    "choices": [
      "They connect the controller and the service to the pods that they manage or expose",
      "They set the version of the image that the pod will pull",
      "They define the network address of each pod in the cluster",
      "They decide which node will run the pod at scheduling time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does kubectl apply -f deployment.yaml do?",
    "topic": "kubectl basics",
    "choices": [
      "It deletes the objects that are described in the file",
      "It prints the logs of the objects that are named in the file to the terminal",
      "It builds the image that is named in the file",
      "It creates or updates the objects described in the file"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does kubectl get pods show?",
    "topic": "kubectl basics",
    "choices": [
      "The logs of all pods in the current namespace",
      "The pods in the current namespace with their status",
      "The nodes of the cluster and their free memory and the pods that run on them",
      "The history of the changes to the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command shows detailed information and events for a pod?",
    "topic": "kubectl basics",
    "choices": [
      "kubectl get pod name only",
      "kubectl describe pod name",
      "kubectl run pod name",
      "kubectl scale pod name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the logs of a pod?",
    "topic": "kubectl basics",
    "choices": [
      "kubectl show logs name",
      "kubectl events name",
      "kubectl output name",
      "kubectl logs name"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does kubectl port-forward do?",
    "topic": "kubectl basics",
    "choices": [
      "It forwards a local port to a pod or service for debugging",
      "It opens a port on every node of the cluster",
      "It changes the port of the service in the manifest of the deployment on disk",
      "It blocks a port in the network policy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does kubectl delete pod name do to a pod that belongs to a Deployment?",
    "topic": "kubectl basics",
    "choices": [
      "The pod is deleted and the Deployment is deleted too, with all of its replicas",
      "The pod is moved to another node of the cluster",
      "The pod is deleted and the Deployment creates a replacement",
      "Nothing happens, because the pod is protected"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a kubeconfig file?",
    "topic": "kubectl basics",
    "choices": [
      "A file with the manifests of all of the services that run in the cluster",
      "A file with the logs of the commands that were run",
      "A file with the clusters, users and contexts that kubectl uses",
      "A file with the images that the cluster may use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a context in kubectl?",
    "topic": "kubectl basics",
    "choices": [
      "A combination of a cluster, a user and a namespace that kubectl uses",
      "A description of what a pod does for new team members",
      "A text that is added to every log line of a pod",
      "A saved copy of the state of the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does kubectl diff -f file.yaml help with?",
    "topic": "kubectl basics",
    "choices": [
      "It compares two clusters and lists all of the differences",
      "It lists the differences between two images in the registry that are named",
      "It shows the lines that changed in the logs of the pod",
      "It shows what would change in the cluster if the file were applied"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of the declarative approach with kubectl apply?",
    "topic": "kubectl basics",
    "choices": [
      "You list each step that must be done, in the correct order",
      "The file describes the desired state, and Kubernetes works out the changes",
      "The cluster ignores the file and keeps its current state",
      "Each command runs immediately and cannot be repeated"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-3

```json
[
  {
    "stem": "What is a ConfigMap?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "An object that holds the passwords and the keys of the cluster",
      "An object that maps the names of services to IP addresses",
      "An object that holds non secret configuration data for pods",
      "An object that describes how many nodes the cluster should have"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Secret in Kubernetes?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "An object for sensitive data",
      "An object that encrypts all the traffic between the pods with strong keys",
      "An object that hides the pods from the users of the cluster",
      "An object that is deleted automatically after the first read by a pod"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Is a Kubernetes Secret encrypted by default?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "Yes, it is encrypted with a key that only the pod can read",
      "Yes, but only in clusters that use more than three nodes",
      "No, it is stored in plain text files on each of the worker nodes of the cluster",
      "No, it is only base64 encoded unless encryption at rest is enabled"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a pod consume a ConfigMap?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "By reading the etcd database of the cluster directly at runtime",
      "As environment variables or as files in a mounted volume",
      "By copying the data into the image of the container at build time",
      "By asking the kubelet through a special command line option"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a running pod when a ConfigMap changes?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "Both the files and the environment variables update at the same moment",
      "Mounted files may update, but environment variables are not updated until restart",
      "The pod is deleted and replaced by the control plane at once",
      "Nothing changes until the node is rebooted by an administrator"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep configuration out of the container image?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "Images cannot hold any text files, so the configuration is impossible",
      "Configuration inside an image is always encrypted and cannot be read",
      "Smaller images cannot be pulled over slow networks in clusters",
      "The same image can run in many environments with different settings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should secrets not be committed to git in plain form?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "Anyone with access to the repository could read them",
      "Git cannot store files that are smaller than one kilobyte",
      "Secrets are generated by the cluster, so they are not needed in git",
      "Repositories reject files that contain random characters"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What tools help to manage secrets safely with Kubernetes?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "A public bucket that stores them in plain text for the whole team",
      "A chat message to each developer that contains the secret values",
      "External secret managers or sealed or encrypted secrets with controlled access",
      "A comment in the manifest that explains how to guess the secret"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is RBAC in Kubernetes?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "A way to balance the load across the nodes of a cluster",
      "A backup system for the etcd database of the cluster",
      "Role based access control that limits what users and services can do in the cluster",
      "A tool for scanning images for vulnerabilities before they run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a ServiceAccount?",
    "topic": "ConfigMaps and Secrets",
    "choices": [
      "An identity for pods to use when they call the Kubernetes API",
      "A user account for the people that log in to the cloud console",
      "A billing account for a team in a cloud provider",
      "A tool that restarts services when they have crashed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a ConfigMap value be exposed to a container as an environment variable?",
    "topic": "Environment and volume injection",
    "choices": [
      "By copying the value into the image with a COPY instruction at build time of the image",
      "By writing the value into the labels of the pod in its manifest",
      "By asking the API server for the value on every request from the code",
      "With env valueFrom configMapKeyRef, or envFrom with the name of the ConfigMap"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a ConfigMap be mounted as files?",
    "topic": "Environment and volume injection",
    "choices": [
      "As an image layer that is built from the keys of the ConfigMap",
      "As a volume of type configMap, with one file for each key",
      "As a network share that is mounted by the node on boot",
      "As a secret that is encoded in base64 on the host disk"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to the files of a mounted ConfigMap when the ConfigMap changes?",
    "topic": "Environment and volume injection",
    "choices": [
      "They are updated at once and the application reloads them by itself",
      "They are updated eventually, though applications must reload them",
      "They are deleted until the pod is restarted by the administrator",
      "They stay as they were until the node is rebooted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to environment variables from a ConfigMap when it changes?",
    "topic": "Environment and volume injection",
    "choices": [
      "They are updated in running containers within a few seconds of the change",
      "They are removed from the pod until the next deployment",
      "They are copied to every other pod in the namespace",
      "They are not updated in running containers until the pod is restarted"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When should a value be mounted as a file and not as an environment variable?",
    "topic": "Environment and volume injection",
    "choices": [
      "For larger or structured configuration, and when it should be reloadable",
      "For very small values, since files are slower for the application to read",
      "For values that must never change during the life of the pod",
      "For values that are needed before the container starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does subPath do when mounting a volume?",
    "topic": "Environment and volume injection",
    "choices": [
      "It hides the volume from all other containers of the pod",
      "It changes the mount path to the root of the node file system",
      "It mounts a single file or folder of the volume",
      "It makes the mounted volume writable by every container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of mounting a ConfigMap with subPath?",
    "topic": "Environment and volume injection",
    "choices": [
      "The file can be read only by the root user of the node that runs the pod",
      "The file is deleted whenever a second pod starts",
      "The file does not receive updates when the ConfigMap changes",
      "The mount can be used only on Windows nodes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the immutable field of a ConfigMap do?",
    "topic": "Environment and volume injection",
    "choices": [
      "The data cannot be changed after creation",
      "The ConfigMap cannot be read by any pod of the cluster",
      "The ConfigMap is copied to all namespaces automatically",
      "The ConfigMap is deleted when the pod that uses it stops"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the downward API values used for?",
    "topic": "Environment and volume injection",
    "choices": [
      "Sending the logs of a container to the API server of the cluster for storage",
      "Downloading images from the registry to the node faster",
      "Reporting the node memory to the control plane",
      "Exposing pod information, such as its name or labels, to the container"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a projected volume?",
    "topic": "Environment and volume injection",
    "choices": [
      "A volume that is copied to another cluster in a different region",
      "A volume that combines several sources",
      "A volume that shows the screen of a container on a projector",
      "A volume that is read only and is deleted after one read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a PersistentVolume?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "A copy of a pod that is kept for backup in the same cluster",
      "A piece of storage in the cluster that exists independently of any pod",
      "A volume that is created inside a container and removed together with it",
      "A network address that is reserved for a database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a PersistentVolumeClaim?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "A bill that is sent to the team for the storage that it has used",
      "A rule that deletes unused volumes after a week of inactivity",
      "A claim that a pod makes about the data that it owns",
      "A request for storage by a user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a pod use a persistent volume claim?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "It lists the claim in its volumes and mounts it in the container",
      "It copies the claim into the image of the container at build time",
      "It sends the claim to the node in the name of the pod",
      "It asks the API server for a new node with the volume attached"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the access mode ReadWriteOnce mean?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "The volume can be read and written once by one pod",
      "The volume can be written only once and then it is read only",
      "The volume can be mounted read write by a single node at a time",
      "The volume can be mounted by all nodes at the same time for writing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ReadWriteMany allow?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "The volume can be written by many pods but only inside of one node",
      "The volume can be read by many users but written by one",
      "The volume can be mounted read write by many nodes at once",
      "The volume can be mounted only by a StatefulSet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the reclaim policy Retain?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "The volume and its data are kept after the claim is deleted",
      "The volume and its data are deleted when the claim is deleted",
      "The volume is reused by the next claim with the data erased",
      "The volume is moved to another cluster for storage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the reclaim policy Delete?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "The storage is kept for ever after the claim has been deleted by the user",
      "The storage is copied to a backup before it is deleted",
      "The storage is deleted only when the cluster is deleted",
      "The underlying storage is deleted when the claim is deleted"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why separate volumes from pods?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "Volumes make pods start faster by caching their images",
      "Data can outlive pods and be reattached to a new pod after a failure",
      "Pods cannot write any file that is not part of an image",
      "Volumes are required for pods to be scheduled on nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to data in an emptyDir volume when the pod is removed?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "It is kept on the node until it is deleted by an administrator",
      "It is deleted with the pod",
      "It is copied to a persistent volume automatically",
      "It is moved to the next pod of the same deployment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a claim get bound to a volume?",
    "topic": "PersistentVolumes and claims",
    "choices": [
      "The user chooses the node on which the volume must be created",
      "The pod sends a request to the cloud provider on its own",
      "The claim is bound to the first volume that has been created",
      "The control plane matches the claim to a volume of sufficient size, access mode and class"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a StorageClass?",
    "topic": "Storage classes",
    "choices": [
      "A description of a type of storage and how to provision it",
      "A limit on how much storage a namespace may use in total over its lifetime",
      "A label that is added to volumes that hold secrets",
      "A backup schedule for all of the volumes of a cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is dynamic provisioning?",
    "topic": "Storage classes",
    "choices": [
      "An administrator creates every volume by hand before any claim is made for it",
      "Volumes are created at night when the load on the cluster is low",
      "A volume is created automatically when a claim asks for a storage class",
      "Volumes are copied from one cluster to another whenever needed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does volumeBindingMode WaitForFirstConsumer do?",
    "topic": "Storage classes",
    "choices": [
      "It waits until the first user logs in to the cluster before it creates volumes",
      "It binds the volume at once to any node that is free",
      "It delays volume creation until a pod is scheduled",
      "It binds the volume only after the pod has been deleted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default storage class used for?",
    "topic": "Storage classes",
    "choices": [
      "Claims that do not name a class use it",
      "The first volume that is created in each cluster",
      "The volume that stores the logs of the control plane",
      "The class that is used for the system namespaces only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does allowVolumeExpansion allow?",
    "topic": "Storage classes",
    "choices": [
      "The volume can be moved to a different zone",
      "The volume can be shared by more than one namespace of the same cluster",
      "The volume can be mounted by more than one pod",
      "A claim can ask for more storage after it was created"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a CSI driver?",
    "topic": "Storage classes",
    "choices": [
      "A tool that builds the images for the pods of the cluster",
      "A plugin that lets Kubernetes use a storage system through a standard interface",
      "A driver that connects the nodes to the network of the data center",
      "A scheduler plugin for choosing the node for a pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why might different workloads use different storage classes?",
    "topic": "Storage classes",
    "choices": [
      "Each workload needs a different version of Kubernetes to run",
      "They need different performance, cost or replication",
      "Storage classes decide which namespace a pod belongs to",
      "A storage class is required to set the name of a container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can go wrong if a volume is created in a different zone than the pod?",
    "topic": "Storage classes",
    "choices": [
      "The pod runs faster because the volume is far from the cache",
      "The data is copied to both zones at the same time",
      "The volume is deleted by the cloud provider at once",
      "The pod cannot attach the volume and stays pending"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does reclaimPolicy on a StorageClass set?",
    "topic": "Storage classes",
    "choices": [
      "What happens to dynamically provisioned volumes when their claims are deleted",
      "How long a claim waits for a volume before it fails",
      "How many claims can use the class at the same time",
      "How often the volumes are backed up by the provider"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it important to back up data in persistent volumes?",
    "topic": "Storage classes",
    "choices": [
      "Persistent volumes are always lost when a node is rebooted",
      "Backups are required before a pod is allowed to mount a volume",
      "Replication of pods does not protect against deletion or corruption of the data",
      "Kubernetes deletes unused volumes every night"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a StatefulSet?",
    "topic": "StatefulSets",
    "choices": [
      "A controller that keeps a number of identical stateless pods running",
      "A controller that runs one pod on every node of the cluster",
      "A controller for stateful applications that gives pods stable names and storage",
      "A controller that runs a task once and then stops"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What identity does a StatefulSet pod have?",
    "topic": "StatefulSets",
    "choices": [
      "A stable, ordered name such as db-0, db-1, and a stable network identity",
      "A random name that changes on each restart of the pod",
      "The name of the node on which it runs at that time",
      "A name that is picked by the user for each pod by hand"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a StatefulSet handle storage?",
    "topic": "StatefulSets",
    "choices": [
      "With one volume that is shared by all pods at the same time",
      "With temporary storage that is deleted when a pod restarts",
      "With storage that is copied from the first pod at start up",
      "With volumeClaimTemplates, so each pod gets its own persistent volume claim"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a StatefulSet pod is rescheduled?",
    "topic": "StatefulSets",
    "choices": [
      "It gets a new name and an empty volume from the class",
      "It keeps its name and reattaches to its own volume",
      "It is replaced by a pod of a deployment with the same name",
      "It loses its data but keeps its IP address"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In what order does a StatefulSet start its pods by default?",
    "topic": "StatefulSets",
    "choices": [
      "All at the same moment, in a random order",
      "One by one in order, from the lowest index, waiting for each to be ready",
      "From the highest index to the lowest, in reverse order",
      "In the order of the alphabet of the node names"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a StatefulSet use a headless service?",
    "topic": "StatefulSets",
    "choices": [
      "It hides the pods from the other services of the cluster and from users",
      "It makes the pods share a single virtual IP address",
      "It limits the traffic that can reach the pods",
      "It gives each pod a stable DNS name for direct addressing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is a Deployment better than a StatefulSet?",
    "topic": "StatefulSets",
    "choices": [
      "For stateless applications where pods are interchangeable",
      "For databases that need stable storage and identity",
      "For applications that need ordered start up and ordered shutdown of their pods",
      "For clusters that must keep every pod name for years"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does podManagementPolicy Parallel do?",
    "topic": "StatefulSets",
    "choices": [
      "Pods are started one at a time in the order of their index in the set",
      "Pods are started only on nodes in parallel zones",
      "Pods are started and stopped without waiting for each other",
      "Pods are deleted in parallel when the set is scaled up"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of running a database as a StatefulSet without care?",
    "topic": "StatefulSets",
    "choices": [
      "Kubernetes deletes the data of every database each night",
      "Pods of a StatefulSet cannot use persistent volumes at all",
      "Replication, backups and failover must still be handled",
      "The database cannot be reached by other pods of the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to the volumes when a StatefulSet is deleted?",
    "topic": "StatefulSets",
    "choices": [
      "The claims are kept by default",
      "The claims and the volumes are deleted at the same time",
      "The data is copied to a new StatefulSet with the same name",
      "The data is moved to the default namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an init container?",
    "topic": "Init containers",
    "choices": [
      "A container that starts after the others and stops them at the end of the pod",
      "A container that runs forever beside the main application",
      "A container that is created by the scheduler to test a node",
      "A container that runs to completion before the app containers start"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does a pod start its main containers when it has init containers?",
    "topic": "Init containers",
    "choices": [
      "At the same time as the init containers, to save time",
      "After all init containers have completed successfully, in order",
      "Before the init containers, which then run in the background of the pod",
      "Only after the pod has been restarted once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a typical use of an init container?",
    "topic": "Init containers",
    "choices": [
      "Serving the traffic of the application while it is being updated",
      "Waiting for a dependency, running a migration or preparing files for the app",
      "Collecting logs from the app container and sending them away",
      "Monitoring the memory use of the other containers of the pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if an init container fails?",
    "topic": "Init containers",
    "choices": [
      "The pod starts anyway and ignores the failed container",
      "The pod is deleted and the deployment is removed",
      "The next init container runs and the failure is logged only",
      "Kubernetes restarts it according to the restart policy, and the pod does not start"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Do init containers share volumes with app containers?",
    "topic": "Init containers",
    "choices": [
      "Yes, they can write files to a shared volume that the app then reads",
      "No, they run in a separate pod and cannot share anything",
      "Yes, but only when the volume is an image layer",
      "No, because they stop before the volume is created"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do init containers differ from sidecar containers?",
    "topic": "Init containers",
    "choices": [
      "Sidecars finish before the app starts, init containers run alongside the app",
      "They are the same, and only the name differs between versions",
      "Init containers finish before the app starts, sidecars run alongside the app",
      "Init containers are only for databases, and sidecars are for web servers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can init containers have different images and resource settings from the app container?",
    "topic": "Init containers",
    "choices": [
      "No, all containers in a pod must use the same image",
      "Yes, but only when they run as the administrator",
      "Yes, each container in the pod has its own image and resources",
      "No, because init containers cannot have resource limits of their own"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is waiting for a database in an init container not always enough?",
    "topic": "Init containers",
    "choices": [
      "The database can become unavailable later",
      "Init containers cannot connect to any network from a pod",
      "The database never starts before the init container ends",
      "Init containers run only after the app has started"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a native sidecar container, in recent Kubernetes versions?",
    "topic": "Init containers",
    "choices": [
      "A container that is built into the kubelet of each node",
      "A container that is created by the scheduler on every node",
      "A container that stops when the main app container stops",
      "An init container with restart policy Always that keeps running beside the app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you check why a pod is stuck in Init status?",
    "topic": "Init containers",
    "choices": [
      "By deleting the pod and watching whether it comes back with the same status",
      "With kubectl describe and the logs of the init container",
      "By restarting the node that runs the pod",
      "By editing the image of the app container"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-4

```json
[
  {
    "stem": "What is Helm?",
    "topic": "Charts and templates",
    "choices": [
      "A tool that builds container images from the source code of the services",
      "A monitoring system for the nodes of the cluster",
      "A package manager for Kubernetes that installs applications from charts",
      "A service that routes traffic between the clusters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Helm chart?",
    "topic": "Charts and templates",
    "choices": [
      "A package of templates and default values that describes a Kubernetes application",
      "A diagram of the services that is drawn by the monitoring system",
      "A log of the changes that were made to the cluster over time",
      "A list of the nodes and the pods that run on them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Helm release?",
    "topic": "Charts and templates",
    "choices": [
      "A new version number of the Helm tool that is published by its authors",
      "A copy of the chart that is stored in a public registry",
      "A report that lists the images that a chart uses",
      "An installed instance of a chart in a cluster, with its own configuration and history"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is values.yaml used for in a chart?",
    "topic": "Charts and templates",
    "choices": [
      "The list of nodes on which the chart is allowed to run",
      "Default configuration values that can be overridden per environment",
      "The source code of the services that the chart installs",
      "The secrets that the chart needs, which are encrypted on disk by the tool"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use Helm templates instead of copying manifests for each environment?",
    "topic": "Charts and templates",
    "choices": [
      "Templates run faster than manifests in the cluster",
      "One template with different values avoids duplication and drift between environments",
      "Manifests cannot be applied to more than one environment",
      "Templates encrypt the manifests when they are stored"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you roll back a Helm release?",
    "topic": "Charts and templates",
    "choices": [
      "Delete the chart from the registry and install it again",
      "Edit the pods one by one with kubectl exec on the nodes",
      "Restart the Helm tool on the laptop of the developer",
      "helm rollback to a previous revision of the release"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does helm upgrade do?",
    "topic": "Charts and templates",
    "choices": [
      "Applies a new chart version or new values to an existing release",
      "Installs a new version of the kubectl tool on the laptop",
      "Upgrades the nodes of the cluster to a new operating system and restarts them",
      "Removes the release and deletes its history"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of heavy templating in charts?",
    "topic": "Charts and templates",
    "choices": [
      "Templates cannot use any variables from the values file",
      "Templates prevent the chart from being installed",
      "Templates can become hard to read and test",
      "Templates make the images larger than before"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does helm template do?",
    "topic": "Charts and templates",
    "choices": [
      "Creates a new chart from the running resources of the cluster",
      "Installs the chart into a temporary namespace for tests",
      "Renders the manifests locally, without installing them",
      "Uploads the chart to a remote registry for sharing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an alternative to Helm for customising manifests?",
    "topic": "Charts and templates",
    "choices": [
      "Kustomize, which patches base manifests with overlays",
      "Docker Compose, which runs pods on a single host",
      "Terraform modules, which build the images for the nodes of the cluster",
      "A shell script that edits files with random changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of values.yaml in a Helm chart?",
    "topic": "Values and overrides",
    "choices": [
      "It lists the Kubernetes nodes on which the chart may be installed",
      "It stores the source code of the application that the chart deploys",
      "It contains the secrets of the chart in an encrypted form",
      "It holds default configuration values that users can override for a release"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you override a value when installing a chart?",
    "topic": "Values and overrides",
    "choices": [
      "By editing the chart in the public repository directly",
      "With --set on the command line or with a values file given by -f",
      "By renaming the template files of the chart before the installation is started",
      "By deleting the defaults from values.yaml in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In which order are values merged when several sources are given?",
    "topic": "Values and overrides",
    "choices": [
      "The first source always wins, and later ones are ignored",
      "Later sources override earlier ones, and --set wins over files",
      "The order is random and changes at every install",
      "All sources are combined in the alphabetical order of their names"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep one values file per environment?",
    "topic": "Values and overrides",
    "choices": [
      "Each environment needs its own copy of the chart in a registry",
      "Values files are required by Kubernetes for each namespace",
      "Helm refuses to install a chart without more than one values file",
      "The same chart can be configured for dev, test and prod without changing the templates"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice for secrets in values files?",
    "topic": "Values and overrides",
    "choices": [
      "Do not commit them, and use a secrets manager or encrypted values",
      "Store them in plain text in the repository for convenience",
      "Put them into the default values of the chart for all users",
      "Encode them in base64 and commit them to a public repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does helm install --dry-run do?",
    "topic": "Values and overrides",
    "choices": [
      "It installs the release in a temporary namespace that is removed",
      "It installs the release and rolls it back after a minute",
      "It renders and validates the release without installing it",
      "It lists all releases that are installed in the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you see the values that were used for a release?",
    "topic": "Values and overrides",
    "choices": [
      "helm show chart release-name",
      "helm list release-name",
      "helm get values release-name",
      "helm repo values release-name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does helm show values chart do?",
    "topic": "Values and overrides",
    "choices": [
      "It prints the default values of a chart",
      "It prints the values that are used by the running pods",
      "It lists the nodes that match the values of a chart",
      "It deletes the values of a chart from the repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of too many configurable values in a chart?",
    "topic": "Values and overrides",
    "choices": [
      "The chart cannot be installed more than once",
      "Kubernetes limits the number of values in a chart to ten for each release",
      "Helm deletes the values that are not used",
      "The chart becomes hard to understand and to test"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why document each value in values.yaml with comments?",
    "topic": "Values and overrides",
    "choices": [
      "Comments are required by Helm to parse the file",
      "Users learn what each setting does and what the defaults mean",
      "Helm uses comments to generate the manifests",
      "Comments make the chart install faster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to the pods of a release when helm uninstall is run?",
    "topic": "Releases and upgrades",
    "choices": [
      "The pods are moved to the default namespace and kept running",
      "The resources created by the chart are removed, including its pods",
      "Only the release record is removed, and the pods are kept for ever",
      "The pods are restarted with the previous revision of the chart"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command installs a chart?",
    "topic": "Releases and upgrades",
    "choices": [
      "helm create name chart, which makes a new chart in the folder of the project",
      "helm apply name chart",
      "helm start name chart",
      "helm install name chart"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a release be inspected after it is installed?",
    "topic": "Releases and upgrades",
    "choices": [
      "With helm status and helm get manifest, which show its state and the rendered resources",
      "With kubectl cluster-info, which lists the charts in the registry",
      "With helm repo list, which prints the manifests of the release",
      "With kubectl top release, which reports the memory of the chart"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does helm rollback do?",
    "topic": "Releases and upgrades",
    "choices": [
      "It deletes the last revision of the chart from the repository",
      "It restores the nodes of the cluster from a backup",
      "It returns a release to a previous revision",
      "It undoes the last command that was typed in the shell"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you list the revisions of a release?",
    "topic": "Releases and upgrades",
    "choices": [
      "helm versions release-name",
      "helm log release-name",
      "helm history release-name",
      "helm revisions release-name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the --atomic flag do on upgrade?",
    "topic": "Releases and upgrades",
    "choices": [
      "It rolls back automatically if the upgrade fails",
      "It upgrades all releases in all namespaces at the same time",
      "It stops all pods of the release before the upgrade starts",
      "It locks the release so that nobody else can upgrade"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does helm uninstall do?",
    "topic": "Releases and upgrades",
    "choices": [
      "It removes the Helm tool from the laptop of the user",
      "It removes the chart from the repository where it is stored",
      "It stops the cluster and deletes all of the namespaces",
      "It removes the release and the resources that it created"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the --wait flag do?",
    "topic": "Releases and upgrades",
    "choices": [
      "Helm waits for a human to approve the release before it starts",
      "Helm waits until resources are ready before it marks the release as successful",
      "Helm waits one hour between each resource that it creates",
      "Helm waits for the next chart version to be published"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does Helm 3 store release information?",
    "topic": "Releases and upgrades",
    "choices": [
      "In a database on the laptop of the person who installed the chart",
      "As Secrets in the namespace of the release by default",
      "In a server called Tiller that runs in the cluster",
      "In the chart repository that the release came from"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use upgrade --install in pipelines?",
    "topic": "Releases and upgrades",
    "choices": [
      "It installs the chart twice to be sure that it works",
      "It upgrades the chart repository before it installs",
      "It skips the templates and applies only the values",
      "The same command works for the first install and for later upgrades"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What language are Helm templates written in?",
    "topic": "Template functions and helpers",
    "choices": [
      "The Go template language with extra functions",
      "Python with a small set of Helm libraries",
      "JavaScript run by the kubectl tool",
      "YAML only, with no logic or variables"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the include function do in a template?",
    "topic": "Template functions and helpers",
    "choices": [
      "It includes a whole other chart inside the current one",
      "It includes a file from the internet when the chart is installed",
      "It renders a named template and lets you pipe the result to other functions",
      "It adds a new line to the end of the values file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the file _helpers.tpl for?",
    "topic": "Template functions and helpers",
    "choices": [
      "The list of helper charts that must be installed together",
      "A test that checks the chart before it is packaged",
      "Named templates and helper functions that other templates can reuse",
      "A file that holds the secrets for the chart"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the default function do in {{ .Values.name | default \"web\" }}?",
    "topic": "Template functions and helpers",
    "choices": [
      "It uses the value of name, or web if the value is empty",
      "It sets the default namespace to web for all of the resources in the release",
      "It makes web the name of the chart in the repository",
      "It deletes the value of name when it equals web"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the toYaml function with nindent do?",
    "topic": "Template functions and helpers",
    "choices": [
      "It converts YAML to JSON and sends it to the API server",
      "It converts the template to a Python script",
      "It copies the YAML into the values file of the release",
      "It converts a structure to YAML and indents it correctly inside the template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the required function do?",
    "topic": "Template functions and helpers",
    "choices": [
      "It makes a value optional for all of the templates",
      "It stops rendering with an error if a value is missing",
      "It adds a required label to every resource",
      "It requires the user to confirm each installation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a template change its output depending on a value?",
    "topic": "Template functions and helpers",
    "choices": [
      "With a separate chart for each possible value of the setting",
      "With if and else blocks, or with with and range actions",
      "With a shell script that edits the files before they install",
      "With a command line flag that is not part of Helm"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does helm lint do?",
    "topic": "Template functions and helpers",
    "choices": [
      "It lists the releases that use too many resources",
      "It formats the YAML files of a chart automatically",
      "It removes unused values from values.yaml",
      "It checks a chart for problems and bad practice"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the lookup function do?",
    "topic": "Template functions and helpers",
    "choices": [
      "It reads existing resources from the cluster during rendering",
      "It looks up the latest version of the chart in the repository",
      "It searches the values file for spelling mistakes",
      "It finds the nodes that have free memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid putting complex logic in templates?",
    "topic": "Template functions and helpers",
    "choices": [
      "Helm refuses to render templates with more than one if",
      "Complex logic makes the chart larger than the limit of 1 MB",
      "Templates become hard to read, test and debug",
      "Logic in templates is blocked by the API server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a chart dependency?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "A library that is compiled into the application image",
      "A node that must exist before the chart can be installed on the cluster",
      "Another chart that this chart needs, declared in Chart.yaml",
      "A secret that the chart needs to be able to run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command downloads the dependencies of a chart?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "helm dependency update",
      "helm dependency start, which starts the pods of the chart that are needed",
      "helm repo pull",
      "helm chart fetch"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a subchart?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "A chart that has fewer templates than the usual chart",
      "A chart that is installed only in sub namespaces",
      "A smaller copy of the chart for testing",
      "A chart that is included as a dependency inside another chart"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you configure a subchart from the parent chart?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "By editing the templates of the subchart in the registry before it is used",
      "With values under the key that has the name of the subchart",
      "By running helm install separately for the subchart",
      "By renaming the subchart in the repository"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the condition field of a dependency do?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "It sets a time condition for when the dependency is installed",
      "It enables or disables the dependency with a value in the parent chart",
      "It checks that the dependency has no vulnerabilities",
      "It limits the dependency to one namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a library chart?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "A chart that stores the documentation of other charts in a library",
      "A chart that is installed once for the whole cluster",
      "A chart that is used only for books and similar content",
      "A chart that holds shared helper templates and cannot be installed on its own"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of Chart.lock?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "It records the exact versions of dependencies",
      "It prevents anyone from changing the chart in the repository",
      "It locks the release so that no upgrade is possible",
      "It stores the secrets of the chart in an encrypted file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are global values?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "Values that are applied to all clusters of the company",
      "Values that cannot be changed after the first install",
      "Values under global that are shared by the parent and all subcharts",
      "Values that are stored only in the API server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why pin dependency versions with a range carefully?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "Ranges are not allowed in Chart.yaml by Helm",
      "Pinned versions are slower to download than ranges",
      "A wide range can bring in a breaking change when the chart is updated",
      "Helm cannot resolve more than one version for each chart"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can go wrong with subcharts that use the same resource names?",
    "topic": "Dependencies and subcharts",
    "choices": [
      "Names can collide, so charts need good naming and release prefixes",
      "Kubernetes merges the resources into one automatically",
      "Helm renames all resources with a random suffix at install",
      "The subchart is deleted by the parent at install"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a chart repository?",
    "topic": "Chart repositories",
    "choices": [
      "A folder with the Dockerfiles of all of the services that run in the cluster",
      "A database that stores the releases of all clusters",
      "A tool that builds charts from the source code of the services",
      "A server that stores packaged charts and an index file that lists them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command adds a chart repository?",
    "topic": "Chart repositories",
    "choices": [
      "helm repo create name url",
      "helm repo add name url",
      "helm chart add name url",
      "helm source add name url"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does helm search repo do?",
    "topic": "Chart repositories",
    "choices": [
      "It searches the cluster for installed releases",
      "It searches the added repositories for charts",
      "It searches the source code of a chart for a text",
      "It searches Docker Hub for images by name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are OCI registries used for in Helm?",
    "topic": "Chart repositories",
    "choices": [
      "Charts are converted into container images at install time",
      "Charts are signed by the registry for every user",
      "Registries replace the need for a values file",
      "Charts can be stored and pulled like container images"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why sign charts and verify provenance?",
    "topic": "Chart repositories",
    "choices": [
      "Users can check that a chart came from a trusted source and was not changed",
      "Signing makes the chart install faster in the cluster",
      "Signed charts do not need a values file to be installed",
      "Provenance files are required by Kubernetes for every pod"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you package a chart for publishing?",
    "topic": "Chart repositories",
    "choices": [
      "helm build chart-dir",
      "helm zip chart-dir",
      "helm package chart-dir",
      "helm publish chart-dir"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the repository index.yaml contain?",
    "topic": "Chart repositories",
    "choices": [
      "The values of all of the releases that are installed from the repository so far",
      "The passwords of the users who may download the charts",
      "The list of charts and their versions with download urls and digests",
      "The list of clusters that use the repository"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a private repository for internal charts?",
    "topic": "Chart repositories",
    "choices": [
      "Internal applications and their settings are not exposed to the public",
      "Public repositories do not allow charts that have more than one template",
      "Private repositories make the charts install faster in any case",
      "Charts must be private for the API server to accept them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good practice for chart versions?",
    "topic": "Chart repositories",
    "choices": [
      "Keep the same version for every change so that nothing breaks",
      "Use the date as the version without any numbers",
      "Never change the version after the first release",
      "Use semantic versions and bump them for every change to the chart"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between the chart version and the app version?",
    "topic": "Chart repositories",
    "choices": [
      "The app version tracks the packaging, the chart version tracks the application",
      "The chart version tracks the packaging, the app version tracks the application inside",
      "They must always be the same number",
      "The chart version is secret and the app version is public"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-5

```json
[
  {
    "stem": "What does the Kubernetes network model require?",
    "topic": "Cluster networking model",
    "choices": [
      "Every pod must use the IP address of its node together with a unique port number",
      "Pods can talk only to pods in the same namespace by default",
      "Every pod can reach every other pod without NAT, using its own IP address",
      "Every pod gets a public IP address from the cloud provider"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a CNI plugin?",
    "topic": "Cluster networking model",
    "choices": [
      "A plugin that sets up pod networking",
      "A plugin that stores container images for the nodes of the cluster",
      "A plugin that signs the certificates for the API server",
      "A plugin that schedules pods on nodes with free memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a pod IP address belong to?",
    "topic": "Cluster networking model",
    "choices": [
      "Each container in the pod, with a separate address for each one",
      "The node that runs the pod, with a different port for each pod",
      "The service that selects the pod through its labels",
      "The pod, and it is shared by all containers in the pod"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can pods on different nodes talk to each other?",
    "topic": "Cluster networking model",
    "choices": [
      "Each node has a direct cable to every other node of the cluster in the rack",
      "The CNI builds an overlay or routed network that connects the nodes",
      "The API server forwards every packet between the pods",
      "Pods use the public internet to reach pods on other nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the pod CIDR?",
    "topic": "Cluster networking model",
    "choices": [
      "The range of ports that services may use on all nodes",
      "The range of IP addresses that is used for pods on a node or in the cluster",
      "The list of domains that pods are allowed to resolve",
      "The size of the memory that is reserved for pod networking"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the service CIDR?",
    "topic": "Cluster networking model",
    "choices": [
      "The range of IP addresses that are given to the nodes of the cluster by the cloud",
      "The range of public addresses of the load balancers",
      "The range of ports that are open to the internet",
      "The range of virtual IP addresses that is used for services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean that Kubernetes networking is flat?",
    "topic": "Cluster networking model",
    "choices": [
      "There is one address space where pods can reach each other without translation",
      "All pods run on a single node to avoid network hops",
      "All pods share the same IP address in the cluster",
      "Only one pod can use the network at a time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which component programs the rules for service virtual IPs on each node?",
    "topic": "Cluster networking model",
    "choices": [
      "the scheduler",
      "the kubelet",
      "kube proxy",
      "etcd"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an overlay network?",
    "topic": "Cluster networking model",
    "choices": [
      "A network that is created only for the control plane traffic",
      "A network that replaces DNS in the cluster",
      "A virtual network that is built on top of the physical network, often with encapsulation",
      "A network cable that connects the racks of the data center"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can limit the number of pods on a node besides CPU and memory?",
    "topic": "Cluster networking model",
    "choices": [
      "The number of IP addresses that are available for pods on that node",
      "The number of namespaces that exist in the cluster",
      "The number of labels that are set on the node",
      "The number of users that have access to the node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main difference between ClusterIP and headless services?",
    "topic": "Service types in depth",
    "choices": [
      "Headless has a virtual IP that load balances, ClusterIP returns pod IPs through DNS",
      "They are identical, and only the manifest field differs between them",
      "ClusterIP works for pods and headless works for nodes only",
      "ClusterIP has a virtual IP that load balances, headless returns pod IPs through DNS"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an ExternalName service do?",
    "topic": "Service types in depth",
    "choices": [
      "It exposes the service on an external IP address of the node that runs the pod",
      "It maps the service name to an external DNS name with a CNAME record",
      "It creates an external load balancer for the cluster",
      "It hides the service from internal clients"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is a NodePort service used?",
    "topic": "Service types in depth",
    "choices": [
      "For traffic between containers in the same pod only",
      "For simple external access or as a building block for load balancers",
      "For storing data on the node file system",
      "For assigning IP addresses to nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the default range of NodePort ports?",
    "topic": "Service types in depth",
    "choices": [
      "1 to 1024",
      "8000 to 8999",
      "49152 to 65535",
      "30000 to 32767"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does externalTrafficPolicy Local do?",
    "topic": "Service types in depth",
    "choices": [
      "It sends traffic only to pods on the node that received it, and keeps the client IP",
      "It sends traffic to pods on all of the nodes of the cluster, whatever the load is",
      "It blocks traffic that comes from outside of the cluster",
      "It sends traffic only to pods in the same zone as the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is session affinity on a service?",
    "topic": "Service types in depth",
    "choices": [
      "Requests are spread equally over all of the pods without any memory of the client",
      "Requests are always sent to the oldest pod of the service",
      "Requests from the same client IP are sent to the same pod for a time",
      "Requests from different clients are merged into one stream"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of a LoadBalancer service for every application?",
    "topic": "Service types in depth",
    "choices": [
      "Load balancers can serve only a single pod at a time",
      "Load balancers cannot handle HTTPS traffic",
      "Each one creates a cloud load balancer",
      "Services of that type can exist in one namespace only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a service port and a targetPort mean?",
    "topic": "Service types in depth",
    "choices": [
      "The service listens on port, and traffic is forwarded to targetPort on the pod",
      "The port is on the node and the targetPort is on the external load balancer",
      "Both values must always be equal, or the service does not start",
      "The targetPort is the port that kube proxy uses on the node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a service without a selector used for?",
    "topic": "Service types in depth",
    "choices": [
      "Selecting all of the pods in the cluster that have no labels on them at all",
      "Hiding the service from the DNS of the cluster",
      "Creating a service that has no ports defined",
      "Pointing a service at endpoints that you manage by hand"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you find out which pods back a service?",
    "topic": "Service types in depth",
    "choices": [
      "kubectl get nodes for the service name",
      "kubectl get endpoints or endpointslices for the service",
      "kubectl logs service name",
      "kubectl top service name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an Ingress?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "A tool that scans the images in a cluster for known vulnerabilities and reports them",
      "A set of rules that route external HTTP traffic to services inside the cluster",
      "A network cable between two nodes of the cluster",
      "A database that stores the routes of all services of the company"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an Ingress controller?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "A person who approves the changes to the cluster network each week",
      "A tool that builds the container images for the services",
      "A service that keeps the logs of every request for a year",
      "A component that implements the rules of Ingress resources"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an Ingress allow that a LoadBalancer service alone does not?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "Host and path based routing for many services behind one entry point",
      "Encryption of data at rest for the database volumes",
      "Automatic scaling of the pods based on the CPU load",
      "Faster image pulls from the registry for the nodes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does DNS work for services inside a cluster?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "Each pod must register its name in an external DNS provider by hand",
      "Pods use only IP addresses, since names are not supported",
      "A service gets a name such as my-service.my-namespace that resolves to its address",
      "DNS is turned off in clusters for performance reasons"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the ingress class decide?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "Which namespace the ingress rules are applied in",
      "Which TLS certificate is used for every host in the cluster",
      "Which ingress controller handles the rules of an Ingress resource",
      "Which service type is created for the ingress by default"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default network behaviour between pods in a namespace?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "All pods can talk to each other unless a policy restricts it",
      "No pod can talk to any other pod until it is allowed in writing",
      "Only pods from different namespaces can talk to each other",
      "Pods can talk only to the database of their own namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does TLS termination at the Ingress mean?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "The Ingress deletes all of the certificates of the services",
      "The Ingress stops all connections that use TLS and uses HTTP only",
      "The Ingress forwards TLS to the client unchanged without reading it",
      "The Ingress handles the TLS connection, and forwards plain or re encrypted traffic inside"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a NodePort service do?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "It stores the port numbers of all pods in a text file",
      "It opens a port on every node that forwards to the service",
      "It assigns a different port to each pod of the service",
      "It blocks the ports that are used by the cluster itself for its own traffic"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do you not usually expose each service with its own cloud load balancer?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "Cloud providers do not allow more than one load balancer",
      "It is costly, so an Ingress can share one entry point for many services",
      "Services cannot be reached by load balancers in any way",
      "Each load balancer must be created by hand in a console"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can traffic be restricted so that only the gateway talks to a service?",
    "topic": "Ingress controllers and rules",
    "choices": [
      "By hiding the name of the service in the DNS server of the cluster so nobody finds it",
      "By setting a long random password on each service",
      "By removing the service from the namespace",
      "With NetworkPolicy rules that allow only the gateway pods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does DNS in a cluster resolve a service name?",
    "topic": "DNS and service discovery",
    "choices": [
      "CoreDNS answers queries for names such as service.namespace.svc.cluster.local",
      "The node file system holds a hosts file with all service names",
      "The API server answers each DNS query from its own cache",
      "The cloud provider resolves the names of the services for the cluster over the internet"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which component usually provides cluster DNS?",
    "topic": "DNS and service discovery",
    "choices": [
      "kube proxy",
      "the scheduler",
      "CoreDNS",
      "the controller manager"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the search domain in a pod resolv.conf allow?",
    "topic": "DNS and service discovery",
    "choices": [
      "Names to resolve only through the public internet and never inside the cluster",
      "Names that are longer than 255 characters",
      "Short names such as my-service to resolve within the namespace",
      "Pods to use IP addresses only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a pod in another namespace reach a service by name?",
    "topic": "DNS and service discovery",
    "choices": [
      "With service.namespace, or the full service.namespace.svc.cluster.local",
      "With the node name and the port of the service",
      "With the pod name of the service in the other namespace",
      "It cannot reach services of other namespaces at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What DNS record does a headless service return?",
    "topic": "DNS and service discovery",
    "choices": [
      "One virtual IP address for the whole service",
      "The address of the node that has the most pods running on it at the time",
      "No record, so the name does not resolve",
      "The IP addresses of the pods that match the selector"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is service discovery in Kubernetes?",
    "topic": "DNS and service discovery",
    "choices": [
      "Services find clients by scanning the network for open ports",
      "Clients find services by DNS names or environment variables, not by fixed addresses",
      "The API server tells each client the address of each pod",
      "Administrators send a list of addresses to each team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are service environment variables?",
    "topic": "DNS and service discovery",
    "choices": [
      "Variables that hold the secrets of the service for its pods",
      "Variables such as MY_SERVICE_SERVICE_HOST that are injected into pods at start",
      "Variables that are set by the cloud provider for each node",
      "Variables that name the owner of each service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is DNS preferred to environment variables for discovery?",
    "topic": "DNS and service discovery",
    "choices": [
      "Environment variables are slower than DNS to read",
      "Environment variables are removed by the kubelet after the pod has started",
      "DNS is the only way to reach services in other nodes",
      "DNS names work for services that are created after the pod started"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is DNS caching in the cluster and why can it matter?",
    "topic": "DNS and service discovery",
    "choices": [
      "Cached answers can delay changes",
      "Caching stops DNS from resolving any name in the cluster",
      "Caching copies the DNS records to all clusters of the company",
      "Caching is needed for pods to get an IP address"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the ndots setting influence in pod DNS?",
    "topic": "DNS and service discovery",
    "choices": [
      "How many pods may share a DNS name",
      "How many requests a pod may send per second",
      "How many search domains are tried before a name is treated as absolute",
      "How many nodes answer DNS queries"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a NetworkPolicy?",
    "topic": "Network policies",
    "choices": [
      "A rule that sets the bandwidth of the network between two nodes",
      "A list of the DNS servers that pods may use for lookups",
      "A set of rules that control which pods can talk to which other pods and endpoints",
      "A policy that chooses the cloud region for the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default behaviour of pods without any network policy?",
    "topic": "Network policies",
    "choices": [
      "All traffic is allowed to and from the pods",
      "All traffic is blocked until a policy allows it",
      "Only traffic inside of the same namespace is allowed",
      "Only traffic from the control plane is allowed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens once a policy selects a pod for ingress?",
    "topic": "Network policies",
    "choices": [
      "All traffic is still allowed, and the policy is only a hint",
      "All traffic is blocked for every pod in the namespace",
      "The pod is removed from the service of the namespace",
      "Only the traffic that the policies allow can reach that pod"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which component must support NetworkPolicy for it to work?",
    "topic": "Network policies",
    "choices": [
      "The kubelet",
      "The CNI plugin",
      "The scheduler",
      "The container runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a default deny policy?",
    "topic": "Network policies",
    "choices": [
      "A policy that denies access to the API server for all users",
      "A policy that selects all pods and allows no traffic",
      "A policy that blocks all images from untrusted registries",
      "A policy that denies the creation of pods in a namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a policy allow traffic only from the frontend pods?",
    "topic": "Network policies",
    "choices": [
      "With a rule that lists the IP address of each frontend pod by hand in the policy",
      "With a label on the service that says frontend only",
      "With a namespace quota for the frontend pods",
      "With an ingress rule that has a podSelector for the labels of the frontend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Do network policies restrict egress traffic too?",
    "topic": "Network policies",
    "choices": [
      "Yes, policies can control both ingress and egress",
      "No, they only control traffic that enters pods",
      "Yes, but only for traffic to the internet",
      "No, egress is controlled only by the node firewall"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a namespaceSelector in a policy match?",
    "topic": "Network policies",
    "choices": [
      "Pods that have the same name as the namespace in which the policy is written",
      "Namespaces that have no pods running in them",
      "Traffic from pods in namespaces that carry the given labels",
      "Nodes that belong to the given namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a network policy part of defence in depth?",
    "topic": "Network policies",
    "choices": [
      "It replaces authentication and authorization in the cluster, so those can be dropped",
      "It encrypts all traffic between the pods by default",
      "It limits the lateral movement of an attacker who got into one pod",
      "It makes the network faster for the pods that it selects"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a common mistake with default deny policies?",
    "topic": "Network policies",
    "choices": [
      "Forgetting to allow DNS egress",
      "Forgetting to give the pods a name, which blocks their start",
      "Using too many labels on the pods in the namespace",
      "Applying the policy to nodes and not to pods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does TLS termination at an ingress mean?",
    "topic": "TLS termination",
    "choices": [
      "The ingress deletes the certificates of the services at night",
      "The ingress stops all connections that use TLS and allows HTTP only",
      "The ingress passes TLS to the client without reading it",
      "The ingress controller handles the TLS connection and forwards traffic inside the cluster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the certificate for an ingress host usually stored?",
    "topic": "TLS termination",
    "choices": [
      "In the image of the ingress controller as a file",
      "In a Secret of type kubernetes.io/tls that the ingress refers to",
      "In the ConfigMap of the namespace as plain text",
      "In the labels of the ingress resource"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does cert manager do?",
    "topic": "TLS termination",
    "choices": [
      "It stores the passwords of the cluster in an encrypted vault",
      "It requests and renews certificates",
      "It checks the certificates of the nodes at start",
      "It converts certificates to base64 for Secrets"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is TLS passthrough at an ingress?",
    "topic": "TLS termination",
    "choices": [
      "The ingress decrypts the traffic and re encrypts it with another key",
      "The ingress blocks all encrypted traffic to the cluster",
      "The ingress stores the traffic in a secret for later",
      "The ingress forwards the encrypted traffic to the backend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why re encrypt traffic from the ingress to the pods?",
    "topic": "TLS termination",
    "choices": [
      "Traffic inside the cluster stays encrypted",
      "Re encryption makes responses smaller for the client",
      "It is required for the ingress to start",
      "It removes the need for any certificate for the pods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an ACME challenge?",
    "topic": "TLS termination",
    "choices": [
      "A test that checks the speed of the TLS handshake",
      "A tool that scans the cluster for weak ciphers",
      "A proof of control of a domain, used to get a certificate automatically",
      "A password check for the ingress controller"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when an ingress certificate expires?",
    "topic": "TLS termination",
    "choices": [
      "Nothing changes, since certificates are only decorative",
      "The ingress controller restarts and renews it by itself always",
      "Clients see warnings or failures",
      "The cluster generates a new key pair at once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can HTTP be redirected to HTTPS at the ingress?",
    "topic": "TLS termination",
    "choices": [
      "With an annotation or a rule of the ingress controller",
      "By blocking port 80 on the nodes of the cluster",
      "By renaming the service to a name that has https in it",
      "By deleting the HTTP service of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is mutual TLS at the edge?",
    "topic": "TLS termination",
    "choices": [
      "Only the server is verified by the client with a certificate and nothing more",
      "Neither side uses a certificate, only a shared password",
      "Traffic is sent twice, once over HTTP and once over HTTPS",
      "Clients also present certificates, so the server can verify them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the host field in an ingress rule do?",
    "topic": "TLS termination",
    "choices": [
      "It sets the name of the node that runs the ingress",
      "It routes requests with that host name to the backend of the rule",
      "It chooses the namespace of the services in the rule",
      "It hides the ingress from the other hosts of the cluster and from the internet"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-6

```json
[
  {
    "stem": "What is a service mesh?",
    "topic": "Service mesh architecture",
    "choices": [
      "A tool that builds the images of services in a pipeline",
      "A database that stores the relationships between services",
      "An infrastructure layer that handles service to service communication, usually with sidecar proxies",
      "A group of servers that run the services of a single team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do sidecar proxies do in a mesh?",
    "topic": "Service mesh architecture",
    "choices": [
      "They sit next to each service and handle traffic, security and telemetry",
      "They run before the service starts and then stop",
      "They store the data of the service in a backup location",
      "They replace the container runtime of the node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the control plane of a mesh?",
    "topic": "Service mesh architecture",
    "choices": [
      "The part that carries the actual requests between services",
      "The part that stores all of the logs of the services",
      "The part that builds the code of the services",
      "The part that configures the proxies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the data plane of a mesh?",
    "topic": "Service mesh architecture",
    "choices": [
      "The database that stores the policies of the mesh",
      "The proxies that carry the traffic between services",
      "The dashboard that shows the graphs of the services",
      "The server that issues the certificates to the nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Name a popular service mesh.",
    "topic": "Service mesh architecture",
    "choices": [
      "Docker Compose or Swarm",
      "Istio or Linkerd",
      "Terraform or Ansible",
      "Prometheus or Grafana"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem does a mesh solve for many services?",
    "topic": "Service mesh architecture",
    "choices": [
      "The code of each service becomes smaller because it has no logic",
      "The services no longer need a network between them",
      "It removes the need to write any tests for the services",
      "Retries, timeouts, security and metrics are handled outside of application code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a cost of adding a service mesh?",
    "topic": "Service mesh architecture",
    "choices": [
      "Extra complexity and resource use",
      "The services can no longer talk to databases",
      "The mesh forces all services to use the same language",
      "The cluster can no longer run more than ten pods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When may a mesh be unnecessary?",
    "topic": "Service mesh architecture",
    "choices": [
      "For hundreds of services that need uniform security and telemetry across all of the teams",
      "For an organisation that needs mutual TLS between every service",
      "For a small number of services where libraries and the platform are enough",
      "For teams that want traffic splitting for canary releases"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between a gateway and a mesh?",
    "topic": "Service mesh architecture",
    "choices": [
      "A gateway handles east west traffic between services, a mesh handles traffic from outside",
      "They are two names for the same component in different products",
      "A gateway handles north south traffic from outside, a mesh handles east west traffic between services",
      "A gateway stores data, and a mesh only routes requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an ambient mesh, in modern Istio?",
    "topic": "Service mesh architecture",
    "choices": [
      "A mode that moves mesh functions out of per pod sidecars into shared node components",
      "A mode in which the mesh only works at night, when there is little traffic in the cluster",
      "A mesh that is installed by default in every cluster of a cloud",
      "A mesh that is used only for storage traffic"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Envoy in an Istio mesh?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "The control plane component that stores the configuration of the mesh",
      "A database that holds the routes of all of the services",
      "A tool that builds the images for the mesh components",
      "The proxy that runs as a sidecar and handles the traffic of each pod"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Istio inject a sidecar into a pod?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "By editing the image of each application at build time by hand",
      "With an admission webhook that adds the proxy container when labelled namespaces create pods",
      "By running the proxy on the node as a single shared process",
      "By copying the proxy to each pod through the kubelet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the init container of an injected pod do in a classic Istio setup?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "It downloads the certificates for the application from a registry at the start",
      "It sets up iptables rules that redirect the traffic through the proxy",
      "It runs the database migrations for the application at start",
      "It scans the application container for vulnerabilities"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is xDS?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "A file format for storing the logs of the proxies",
      "A tool that checks the speed of the mesh network",
      "A protocol for sending emails between the proxies",
      "The set of discovery APIs that the control plane uses to configure Envoy proxies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is Istiod?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "The control plane of Istio",
      "The data plane proxy that handles each request in the cluster",
      "A dashboard that shows the traffic of the services",
      "A command line tool for creating clusters"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the sidecar proxy intercept?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "The disk writes of the application container to its volumes on the node",
      "The memory allocation of the processes in the pod",
      "The inbound and outbound network traffic of the application container",
      "The logs of the kubelet on the node"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What overhead do sidecars add?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "A second copy of the database for each of the pods that are in the mesh",
      "More nodes for the control plane of the cluster",
      "Extra CPU, memory and a small latency for each hop of the traffic",
      "A larger image for each of the application containers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can an application be excluded from injection?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "With an annotation or a label that disables injection for the pod",
      "By deleting the namespace where the pod runs",
      "By renaming the pod so that it does not match the admission webhook any more",
      "By running the pod on the master node only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Envoy admin interface help with?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "Creating new users for the mesh in the cluster",
      "Editing the source code of the application in a pod",
      "Changing the nodes where the proxy runs",
      "Inspecting the configuration, clusters and stats of a proxy for debugging"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a typical reason to restart pods after enabling injection in a namespace?",
    "topic": "Sidecar proxies and Envoy",
    "choices": [
      "Injection works only when the node is rebooted at the same time",
      "Existing pods do not get a sidecar until they are recreated",
      "The mesh deletes pods that have no sidecar after an hour",
      "The webhook removes the pods without sidecars from the namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a VirtualService define in Istio?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "The virtual machine that runs the service in the cluster",
      "Routing rules that decide how requests to a host are sent to destinations",
      "A copy of a service that is used only for testing",
      "The list of users that may call the service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a DestinationRule define in Istio?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "The address of the database that a service must use",
      "The roles of users in the mesh",
      "The names of the namespaces that exist in the cluster",
      "Policies that apply after routing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a subset of a service defined in a DestinationRule?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "By labels of the pods, such as version v2",
      "By the name of the node on which the pods run",
      "By the IP address of each of the pods in the subset",
      "By a number that the user chooses for each pod"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How would you send 90 percent of traffic to v1 and 10 percent to v2?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "With two separate clusters that each take half of the users",
      "With a label on each pod that sets its share of traffic",
      "With weights on the destinations of a VirtualService route",
      "With a rate limit of ten requests for v2"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a VirtualService route match on?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "Only the IP address of the node where the client of the request is running",
      "Only the name of the namespace of the client pod",
      "The URI, headers, method and other parts of the request",
      "Only the time of the day when the request arrives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Gateway resource in Istio?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "The configuration of an edge proxy that accepts traffic into the mesh",
      "A pod that stores the routes of the services",
      "A virtual machine that runs the control plane",
      "A rule that blocks traffic to the mesh"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a retry setting in a VirtualService do?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "It retries the deployment of the service when it fails",
      "It restarts the pod when a request fails",
      "It deletes the failed request from the logs",
      "It resends a failed request to another healthy instance, a limited number of times"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a mirror or shadow route used for?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "Making a second copy of the database for backups",
      "Copying live traffic to a new version for testing without affecting users",
      "Reflecting the traffic of the mesh back to the sender",
      "Hiding a route from the monitoring tools"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a fault injection rule used for?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "Fixing faults of the proxies automatically",
      "Adding delays or errors on purpose to test how clients behave",
      "Finding bugs in the code of the control plane",
      "Reducing the number of errors in the logs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is traffic splitting useful for releases?",
    "topic": "Traffic routing and splitting",
    "choices": [
      "The new version replaces the old one on all of the pods at the same time",
      "The old version is deleted before the new one is started",
      "All users are moved to the new version at midnight",
      "A new version can receive a small share of traffic first and be watched"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does mutual TLS provide?",
    "topic": "Mutual TLS and security",
    "choices": [
      "Both sides prove their identity with certificates, and the traffic is encrypted",
      "Only the client proves its identity, and the traffic between the two is not encrypted",
      "The traffic is encrypted, but nobody is authenticated",
      "Passwords are exchanged in plain text between the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is mTLS useful between services?",
    "topic": "Mutual TLS and security",
    "choices": [
      "It makes each request faster because the data is compressed more",
      "It removes the need for any firewall in the cluster",
      "It protects traffic inside the network and verifies which service is calling",
      "It lets the services share one password between them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a mesh usually manage service certificates?",
    "topic": "Mutual TLS and security",
    "choices": [
      "It asks each developer to create a certificate by hand",
      "It uses one certificate for all services for ever",
      "It issues and rotates short lived certificates automatically",
      "It stores the certificates in the source code of each service so they are easy to find"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is traffic shifting?",
    "topic": "Mutual TLS and security",
    "choices": [
      "Sending a percentage of the requests to a new version of a service",
      "Moving the servers from one data center to another one",
      "Changing the speed of the network between two clusters",
      "Deleting the traffic logs of the last week from the cluster to save disk space"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a virtual service in Istio?",
    "topic": "Mutual TLS and security",
    "choices": [
      "A service that runs on a virtual machine in the cloud and is billed by the hour",
      "A copy of a service that is used only in tests",
      "A database for the rules of the mesh",
      "A set of routing rules that define how requests reach a service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a destination rule define in Istio?",
    "topic": "Mutual TLS and security",
    "choices": [
      "The address of the database that a service must use",
      "Policies for traffic after routing",
      "The list of users that may call a service",
      "The names of the namespaces in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is fault injection in a mesh used for?",
    "topic": "Mutual TLS and security",
    "choices": [
      "Repairing faults in the code of the services automatically",
      "Testing resilience by adding delays or errors on purpose",
      "Reducing the number of errors in the logs of the services",
      "Injecting a new version of the code into a running pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a circuit breaking setting in a mesh?",
    "topic": "Mutual TLS and security",
    "choices": [
      "A switch that turns off the power of a rack in the data center",
      "A rule that blocks users who send many requests",
      "A tool that repairs broken certificates",
      "A limit on connections or failures after which calls are stopped for a time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do authorization policies in a mesh matter?",
    "topic": "Mutual TLS and security",
    "choices": [
      "They define which services may call which others, beyond just encryption",
      "They set the password policy of the human users of the whole system",
      "They decide which developers may deploy to the cluster",
      "They check that the code has been reviewed by two people"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of enabling strict mTLS everywhere without planning?",
    "topic": "Mutual TLS and security",
    "choices": [
      "All of the traffic becomes unencrypted for security reasons in the mesh",
      "The control plane refuses to start in strict mode",
      "Services that are not in the mesh can no longer call the ones that are",
      "Certificates are never rotated again after they are issued"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What telemetry does a mesh usually provide without code changes?",
    "topic": "Observability and telemetry",
    "choices": [
      "The source code coverage of the tests of each service",
      "The list of developers who changed a service during the last week, with their commits",
      "Metrics, traces and access logs for the traffic between services",
      "The size of the images of each service in the registry"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the golden signals that a mesh can report?",
    "topic": "Observability and telemetry",
    "choices": [
      "Latency, traffic, errors and saturation",
      "Memory, disk, CPU and network cables, which are the physical parts of each server",
      "Commits, builds, tests and releases",
      "Users, sessions, pages and clicks"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a mesh help with distributed tracing?",
    "topic": "Observability and telemetry",
    "choices": [
      "Proxies fully trace every request with no help from the services",
      "The mesh replaces the need for trace ids completely",
      "The mesh stores traces in the source code repository",
      "Proxies create and propagate trace headers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must applications still propagate trace headers in a mesh?",
    "topic": "Observability and telemetry",
    "choices": [
      "Headers are needed to authenticate the user with the mesh",
      "Proxies cannot link incoming and outgoing calls without the headers being passed on",
      "Without headers the proxy cannot start in the pod",
      "The mesh stops working if headers are not copied by hand"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What tool is often used with a mesh to visualise the service graph?",
    "topic": "Observability and telemetry",
    "choices": [
      "Postman",
      "Kiali, for Istio",
      "Jenkins",
      "SonarQube, which analyses the quality of the source code of each service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a service graph show?",
    "topic": "Observability and telemetry",
    "choices": [
      "The folder structure of the source code of each service and its dependencies",
      "The employees of each team and their roles",
      "The network cables between the racks of the data center",
      "Which services call which others, with traffic and error rates"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can access logs from the proxies show?",
    "topic": "Observability and telemetry",
    "choices": [
      "Each request, with the source, the destination, the status and the duration",
      "The internal variables of the code of each service",
      "The passwords of the users who call the services",
      "The history of the commits of the service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is mesh telemetry useful for finding the source of slowness?",
    "topic": "Observability and telemetry",
    "choices": [
      "It tells which developer wrote the slow function",
      "It replaces the need for any monitoring of databases",
      "It shows latency per hop",
      "It makes slow requests faster by caching them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of high cardinality labels in mesh metrics?",
    "topic": "Observability and telemetry",
    "choices": [
      "They stop the mesh from collecting any metric",
      "They make the dashboards show wrong numbers on purpose",
      "They create a huge number of time series",
      "They are blocked by the proxy for security reasons"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can metrics from the mesh be collected?",
    "topic": "Observability and telemetry",
    "choices": [
      "Prometheus scrapes the proxies, and Grafana shows the graphs",
      "The services write the metrics into a spreadsheet by hand every day for the managers",
      "Each proxy emails a report to the operations team daily",
      "A developer reads the logs of each pod and counts them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is outlier detection in a mesh?",
    "topic": "Resilience features",
    "choices": [
      "Detecting users that send an unusual number of requests",
      "Finding pods that use more memory than the average",
      "Detecting nodes that are in a different zone",
      "Ejecting instances that return errors from the load balancing pool for a time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a connection pool setting limit?",
    "topic": "Resilience features",
    "choices": [
      "The number of users that may log in to the mesh",
      "The number of connections and pending requests to a service",
      "The number of pods that run in a namespace",
      "The number of certificates that a proxy of the mesh may hold at one time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a timeout in a VirtualService?",
    "topic": "Resilience features",
    "choices": [
      "The time after which a pod is deleted by the scheduler",
      "The longest time that the proxy waits for a response before it fails the request",
      "The time that a certificate is valid for in the mesh",
      "The time that the control plane takes to push a change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do retries and timeouts combine in a mesh?",
    "topic": "Resilience features",
    "choices": [
      "Retries run for ever, whatever the timeout of the request",
      "Timeouts are ignored when retries are set on a route",
      "Retries restart the timeout for the whole mesh",
      "Retries must fit inside the overall timeout, or the client gives up before they finish"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can retries at several layers cause a retry storm?",
    "topic": "Resilience features",
    "choices": [
      "Each layer multiplies the number of attempts",
      "Retries are always limited to one attempt in total",
      "Retries stop the failing service from receiving any load",
      "Layers share a single retry counter in all cases"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a circuit breaker in Istio terms?",
    "topic": "Resilience features",
    "choices": [
      "A physical switch that cuts the power of a node",
      "A rule that stops all traffic to the mesh",
      "Limits on connections and ejection of failing hosts, set in a DestinationRule",
      "A tool that repairs the sidecars automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a rate limit in the mesh protect?",
    "topic": "Resilience features",
    "choices": [
      "The database from too many writes of the application",
      "The certificates from being used too often",
      "A service from being overloaded by too many requests from callers",
      "The control plane from too many nodes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for resilience settings in a mesh?",
    "topic": "Resilience features",
    "choices": [
      "Set sensible timeouts and limited retries, and test them with fault injection",
      "Retry every request ten times without any delay",
      "Disable all timeouts so that no request fails",
      "Apply the same settings to all services without looking at them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is resilience in the mesh not a replacement for good application design?",
    "topic": "Resilience features",
    "choices": [
      "The mesh stops all failures of any application at runtime",
      "Applications must not handle any errors at all when a mesh is used",
      "Meshes only work for applications that have no dependencies",
      "The mesh cannot fix business logic errors or data inconsistencies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the mesh give to teams who use many languages?",
    "topic": "Resilience features",
    "choices": [
      "A single programming language for all of the services",
      "Uniform retries, timeouts and telemetry without code changes in each language",
      "A shared library that all services must import",
      "A faster compiler for every language in use"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-7

```json
[
  {
    "stem": "What is the difference between authentication and authorization in Kubernetes?",
    "topic": "Authentication and authorization",
    "choices": [
      "Authorization proves who you are, authentication decides what you may do",
      "They are two names for the same step in the API request flow",
      "Authentication proves who you are, authorization decides what you may do",
      "Authentication is done by the scheduler and authorization by the kubelet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the stages that an API request goes through?",
    "topic": "Authentication and authorization",
    "choices": [
      "Authentication, authorization and admission control",
      "Scheduling, scaling and admission control of the objects that are created in the cluster",
      "Routing, caching and authorization",
      "Parsing, compiling and validation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which methods can the API server use to authenticate users?",
    "topic": "Authentication and authorization",
    "choices": [
      "Only user names and passwords stored in etcd",
      "Only the IP address of the machine that sends the request to the API server",
      "Only the labels of the pods that make the request",
      "Client certificates, bearer tokens and OpenID Connect, among others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does Kubernetes store user accounts for people as objects?",
    "topic": "Authentication and authorization",
    "choices": [
      "Yes, each person is stored as a User object in etcd",
      "No, it relies on external identity such as certificates or an identity provider",
      "Yes, but only for administrators of the cluster",
      "No, since people cannot access the API at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of OIDC integration with the API server?",
    "topic": "Authentication and authorization",
    "choices": [
      "The nodes use OIDC to join the cluster and to exchange their keys with it",
      "People sign in through a company identity provider and receive tokens",
      "Pods use OIDC to pull images from the registry",
      "OIDC replaces etcd as the store of the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to an unauthenticated request?",
    "topic": "Authentication and authorization",
    "choices": [
      "It is always allowed with full access to the API of the cluster for any caller",
      "It is queued until the user logs in to the cluster",
      "It is forwarded to the kubelet of the nearest node",
      "It is treated as anonymous, and RBAC decides whether anonymous access is allowed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why disable anonymous access on production clusters?",
    "topic": "Authentication and authorization",
    "choices": [
      "Unauthenticated callers should not reach the API at all",
      "Anonymous access is slower than authenticated access",
      "Anonymous requests cannot be logged by the API server in any of its modes",
      "Anonymous access is required only for the dashboard"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a user and a service account?",
    "topic": "Authentication and authorization",
    "choices": [
      "Service accounts are people, and users are identities for processes that run in pods",
      "They are the same, and the difference is only in the name",
      "Users are people, service accounts are identities for processes that run in pods",
      "Users belong to namespaces, and service accounts are cluster wide"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can the authorization mode be set on the API server?",
    "topic": "Authentication and authorization",
    "choices": [
      "With a label on the nodes that run the control plane",
      "With a ConfigMap in the kube-system namespace",
      "With the authorization mode flag",
      "With an annotation on each user account"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do audit logs of the API server record?",
    "topic": "Authentication and authorization",
    "choices": [
      "Requests to the API, with who made them and what happened",
      "The logs of the applications that run in the pods",
      "The performance metrics of the nodes of the cluster",
      "The images that were pulled by the container runtime on each of the nodes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is role based access control, or RBAC?",
    "topic": "Role-based access control",
    "choices": [
      "Permissions are decided for each request by a long list of attributes of the user",
      "Permissions are granted by the owner of each single object in the system",
      "Every user receives all permissions until an administrator removes the ones they should not have",
      "Permissions are assigned to roles, and users get access through the roles they have"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is attribute based access control, or ABAC?",
    "topic": "Role-based access control",
    "choices": [
      "Decisions use only the name of the role of the user, such as editor or admin",
      "Decisions use attributes of the user, the resource and the context",
      "Decisions are made by the owner of the file that is being accessed at the time",
      "Decisions are fixed in the database and never change after the account is created"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is relationship based access control, or ReBAC?",
    "topic": "Role-based access control",
    "choices": [
      "Access depends on the network from which the request is sent to the server",
      "Access follows relationships between objects",
      "Access is given by the age of the account of the user in the system",
      "Access is granted to everyone who knows the url of the object that they want"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of pure RBAC in large systems?",
    "topic": "Role-based access control",
    "choices": [
      "Roles cannot be assigned to users, so every permission must be given directly to them",
      "It cannot express any kind of permission, so another model is always needed",
      "It needs no administration at all, so the roles never have to be reviewed",
      "Role explosion, with many special roles created to handle small differences"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is ABAC a better fit than RBAC?",
    "topic": "Role-based access control",
    "choices": [
      "When rules depend on context",
      "When there are only two kinds of users in the system and rules never change",
      "When nobody needs to audit who can do what in the application",
      "When the system has no resources that need to be protected from users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which model fits sharing a document with a specific person, like in a document editor?",
    "topic": "Role-based access control",
    "choices": [
      "RBAC with one role for each document, created when the document is shared",
      "A single global admin role for all users, so that sharing is always possible",
      "ReBAC, since access follows the relation between the user and the document",
      "No access control at all, because documents are shared by their own links"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a permission in an RBAC system?",
    "topic": "Role-based access control",
    "choices": [
      "A person who works in the company and is allowed to enter the building",
      "A password of a user that is stored in the directory of the system",
      "A specific allowed action on a resource, such as read invoice",
      "A network address from which the requests of a user are accepted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is role inheritance?",
    "topic": "Role-based access control",
    "choices": [
      "A role gets the permissions of another role, such as admin including editor",
      "A user takes the password of the manager when they are promoted in the team",
      "A role is deleted when the last user leaves the team that used it",
      "A role is copied to every new user who joins the company"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of giving a user several roles with overlapping permissions?",
    "topic": "Role-based access control",
    "choices": [
      "The user cannot log in any more, because the roles conflict with each other",
      "The roles stop working in the database when two of them share a permission",
      "The user will always be blocked, since the system cannot decide which role wins",
      "The effective permissions can be larger than intended and hard to review"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it useful to log access decisions?",
    "topic": "Role-based access control",
    "choices": [
      "Logs make the access checks faster, because decisions are cached in the log file",
      "You can audit who accessed what and investigate misuse",
      "Logs remove the need for roles, since the history shows who may do what",
      "Logs prevent users from sharing passwords with each other in the company"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a ServiceAccount used for?",
    "topic": "Service accounts",
    "choices": [
      "It gives a person access to the cluster from a laptop",
      "It gives a pod an identity to call the Kubernetes API or other services",
      "It stores the secrets of an application in a namespace",
      "It sets the resource limits of the pods that use it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which service account does a pod use if none is set?",
    "topic": "Service accounts",
    "choices": [
      "The administrator account of the cluster",
      "An account that is created for the pod at start with all rights",
      "No account, since pods cannot have an identity",
      "The default service account of its namespace"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why create a dedicated service account for each application?",
    "topic": "Service accounts",
    "choices": [
      "Permissions can be limited to what each application needs",
      "Each account makes the application start faster",
      "Kubernetes needs a separate account for each image that runs in the cluster",
      "The default account is deleted by the scheduler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does automountServiceAccountToken false do?",
    "topic": "Service accounts",
    "choices": [
      "It deletes the service account when the pod is created",
      "It makes the token valid for ever for the pod",
      "It stops the token from being mounted into the pod, if the pod does not need the API",
      "It encrypts the token with a key of the node"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are modern service account tokens different from the old ones?",
    "topic": "Service accounts",
    "choices": [
      "They are stored as secrets for ever and never expire",
      "They are shared by all pods of the namespace",
      "They are short lived, bound to the pod and audience, and requested through the API",
      "They are generated by the user and copied by hand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you give a service account permission to list pods?",
    "topic": "Service accounts",
    "choices": [
      "Create a Role with that rule and a RoleBinding to the service account",
      "Add the service account name to the pod specification and the rule to the image",
      "Set a label on the service account that says pods",
      "Edit the kubelet configuration on each node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is workload identity for cloud services?",
    "topic": "Service accounts",
    "choices": [
      "A pod stores the cloud keys in its image for easy access",
      "Each node holds the cloud keys for all of its pods",
      "A pod uses the keys of the person who deployed it",
      "A pod can use its service account to get cloud permissions without stored keys"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What risk does a token with broad permissions in a pod create?",
    "topic": "Service accounts",
    "choices": [
      "The pod would start more slowly on the nodes",
      "A compromised pod could use it to read or change cluster resources",
      "The token would expire at once and stop the pod",
      "The pod would be moved to the master node"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you check what a service account can do?",
    "topic": "Service accounts",
    "choices": [
      "kubectl describe node for the service account that is used by the pod",
      "kubectl auth can-i with the as option for the service account",
      "kubectl logs on the service account",
      "kubectl top for the service account"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should workloads that do not call the API avoid having tokens?",
    "topic": "Service accounts",
    "choices": [
      "Tokens make pods larger and slower to start",
      "Tokens are required to be rotated by every pod each day, so fewer tokens are easier",
      "Pods with tokens cannot be scheduled",
      "Fewer credentials in pods means less to steal in an attack"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are the Pod Security Standards?",
    "topic": "Pod security standards",
    "choices": [
      "Three policies, privileged, baseline and restricted, that describe how secure pods must be",
      "A list of images that pods may use in a cluster",
      "A set of rules for naming pods and namespaces",
      "A score that grades the speed of pods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the restricted Pod Security Standard?",
    "topic": "Pod security standards",
    "choices": [
      "A profile that allows everything for easier development",
      "A profile that blocks all pods from starting",
      "The strictest profile, which follows current hardening practice for pods",
      "A profile that applies only to system namespaces"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are Pod Security Standards enforced?",
    "topic": "Pod security standards",
    "choices": [
      "By the scheduler when it selects a node for each pod",
      "By the kubelet when it pulls the image",
      "By Pod Security Admission, with labels on namespaces",
      "By the container runtime at the moment of start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does securityContext runAsNonRoot do?",
    "topic": "Pod security standards",
    "choices": [
      "It makes the container fail to start if it would run as root",
      "It runs the container as root with fewer capabilities",
      "It runs the container as the user of the person who deployed it",
      "It prevents the container from using the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does readOnlyRootFilesystem do?",
    "topic": "Pod security standards",
    "choices": [
      "The container cannot read any file of its own image",
      "The container can write only to the volumes of other pods",
      "The container is removed after it writes a file",
      "The container cannot write to its root filesystem"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why drop all capabilities and add only the needed ones?",
    "topic": "Pod security standards",
    "choices": [
      "It makes the container use less memory while it runs",
      "It reduces what a compromised process can do on the host",
      "It is required for containers to be able to use volumes",
      "It makes the pod start faster than a pod with capabilities"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does allowPrivilegeEscalation false prevent?",
    "topic": "Pod security standards",
    "choices": [
      "A user gaining access to a namespace of another team",
      "A process gaining more privileges than its parent",
      "A pod using more CPU than its limit allows",
      "A node joining the cluster without a certificate"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a privileged container dangerous?",
    "topic": "Pod security standards",
    "choices": [
      "It uses all of the memory of the node at once",
      "It can only be run by the control plane of the cluster",
      "It cannot be stopped by the kubelet",
      "It has almost the same access to the host as a process that runs on the host"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the risk of mounting hostPath volumes?",
    "topic": "Pod security standards",
    "choices": [
      "The pod gets access to files of the node",
      "The pod loses access to its own file system",
      "The volume is deleted when the pod restarts",
      "The volume can be used by only one pod in the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does seccomp do for a container?",
    "topic": "Pod security standards",
    "choices": [
      "It limits the network speed of the process",
      "It encrypts the files that the process writes to its volumes on the node",
      "It filters the system calls that the process may make",
      "It checks the signatures of the images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an admission controller?",
    "topic": "Admission control and policies",
    "choices": [
      "A person who approves each change to the cluster",
      "A component that admits new nodes into the cluster",
      "A step that can validate or change API requests after authorization and before they are stored",
      "A tool that scans images after they have been pulled"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between mutating and validating admission?",
    "topic": "Admission control and policies",
    "choices": [
      "Mutating can change the object, validating can only accept or reject it",
      "Validating can change the object, mutating can only accept or reject it",
      "They are the same stage, with two names in different versions",
      "Mutating runs after the object is stored in etcd"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are admission webhooks?",
    "topic": "Admission control and policies",
    "choices": [
      "Hooks in the source code of the application",
      "Web pages that show the state of the cluster",
      "Messages that the kubelet sends to the scheduler",
      "Calls from the API server to external services that validate or mutate objects"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of a failing admission webhook?",
    "topic": "Admission control and policies",
    "choices": [
      "The cluster deletes all pods when a webhook is slow",
      "If it is set to fail closed, requests can be blocked when the webhook is down",
      "The webhook can read the memory of all nodes",
      "Webhooks cannot be removed once they are created"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a policy engine such as Kyverno or OPA Gatekeeper used for?",
    "topic": "Admission control and policies",
    "choices": [
      "Scheduling pods on the cheapest nodes of the cluster",
      "Enforcing rules on resources, such as required labels or allowed registries",
      "Backing up etcd to a remote storage on a schedule",
      "Collecting the metrics of all pods in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Give an example of a useful admission policy.",
    "topic": "Admission control and policies",
    "choices": [
      "Reject all pods that have more than one container",
      "Reject all namespaces that were created on a weekend",
      "Reject pods that have a name that is longer than ten letters in a namespace",
      "Reject pods that run as root or use images from untrusted registries"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are ValidatingAdmissionPolicies?",
    "topic": "Admission control and policies",
    "choices": [
      "Built in policies written with CEL expressions that run in the API server",
      "Policies that run in a separate cluster for all of the clusters of the company",
      "Policies for validating the DNS records of services",
      "Policies that only apply to nodes and not to pods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why test policies in audit or warn mode first?",
    "topic": "Admission control and policies",
    "choices": [
      "Audit mode makes the policy faster than enforce mode",
      "Policies cannot be created directly in enforce mode",
      "You can see what would be blocked before the policy breaks real workloads",
      "It lets the policy delete the violating pods automatically while it is tested"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a mutating webhook commonly do?",
    "topic": "Admission control and policies",
    "choices": [
      "Delete pods that use too much memory",
      "Rename the pods to a unique name",
      "Inject sidecars or default values into pods when they are created",
      "Move the pods to another namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should be excluded from strict policies with care?",
    "topic": "Admission control and policies",
    "choices": [
      "System namespaces and components that need special rights to run the cluster",
      "All application namespaces of the company",
      "Every namespace that has more than ten pods",
      "The namespace that is called default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is the default Secret storage not enough protection?",
    "topic": "Secrets management",
    "choices": [
      "Secrets are encrypted with a key that is the same for all of the clusters",
      "Secrets are deleted after they are read by one pod",
      "Secrets are stored in plain text in the image of the pod",
      "Secrets are only base64 encoded in etcd unless encryption at rest is configured"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does encryption at rest for Secrets protect against?",
    "topic": "Secrets management",
    "choices": [
      "Reading secrets through the API with a valid token",
      "Reading secrets directly from etcd data or backups",
      "Reading secrets from the memory of running pods",
      "Reading secrets from the logs of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an external secrets operator?",
    "topic": "Secrets management",
    "choices": [
      "A person who looks after the secrets of the company by hand in a vault",
      "A controller that syncs secrets from an external manager into the cluster",
      "A tool that deletes secrets from etcd at night",
      "A policy that forbids secrets in a cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why limit RBAC permissions on secrets?",
    "topic": "Secrets management",
    "choices": [
      "Secrets can be read only by the administrators by design",
      "Secrets cannot be listed by any user of the cluster",
      "RBAC does not apply to secrets in any case",
      "Anyone who can read a secret can use it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a sealed secret?",
    "topic": "Secrets management",
    "choices": [
      "An encrypted secret that is safe to store in Git and is decrypted only inside the cluster",
      "A secret that cannot be read by the pod that needs it",
      "A secret that is sealed with a time limit of one minute",
      "A secret that is stored on paper in a safe"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of passing secrets as environment variables?",
    "topic": "Secrets management",
    "choices": [
      "They are not supported by the container runtime, so they never reach the process",
      "They are deleted after the container starts",
      "They can leak through logs, crash dumps or child processes",
      "They are visible to all pods in the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefer mounted secret files in some cases?",
    "topic": "Secrets management",
    "choices": [
      "Files are faster to read than variables for all programs",
      "Mounted files are encrypted by the kubelet on the disk",
      "Files can be updated and have permissions, and they are less likely to appear in dumps",
      "Variables cannot hold more than ten characters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen to a secret after a suspected leak?",
    "topic": "Secrets management",
    "choices": [
      "Rotate it and review where it was used",
      "Delete the namespace and create it again with the same secret",
      "Rename the secret and keep its value",
      "Ask the pods to forget the secret"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a secrets manager with dynamic secrets help?",
    "topic": "Secrets management",
    "choices": [
      "Secrets never change, which makes them easier to remember",
      "Pods share a single credential for all of their needs",
      "Credentials are copied into the image for every release",
      "Short lived credentials are created on demand"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid secrets in Git, even encrypted ones, without clear access rules?",
    "topic": "Secrets management",
    "choices": [
      "Git cannot store encrypted files in any case",
      "Access to the repository history can expose them or the keys that unlock them",
      "Encrypted files are too large for any repository",
      "Git removes secrets that it finds in files"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-8

```json
[
  {
    "stem": "What does the metrics server provide?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "Long term storage of all application metrics for dashboards",
      "A tracing backend for the requests between services",
      "Resource metrics such as CPU and memory use of nodes and pods, for autoscaling and kubectl top",
      "A log collector for all of the containers of the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command uses the metrics server to show pod resource use?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "kubectl top pods",
      "kubectl get metrics",
      "kubectl describe usage",
      "kubectl logs metrics"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Is the metrics server meant to be a full monitoring system?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "Yes, it replaces Prometheus for all monitoring tasks",
      "Yes, it stores metrics for a year for every pod",
      "No, it only reports the version of the nodes",
      "No, it holds short term data for autoscaling, not history or alerting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does the metrics server get its data?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "From the API server, which stores the metrics in etcd",
      "From the kubelet of each node",
      "From the applications, which push metrics to it",
      "From the cloud provider, which measures the nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to HPA if the metrics server is missing?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "It scales on the number of nodes of the cluster instead",
      "It cannot read the resource metrics",
      "It scales to the maximum number of replicas at once",
      "It falls back to scaling on the time of the day"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a metrics API give to controllers?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "A standard way to read logs from the pods",
      "A way to change the limits of running pods",
      "A list of the images that run in the cluster",
      "A standard way to read resource usage"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the custom metrics API allow?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "Scaling on application metrics such as requests per second, through an adapter",
      "Creating new kinds of resources in the cluster",
      "Changing the metrics server configuration at runtime",
      "Sending the metrics to a third party by email"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can CPU use alone be a poor scaling signal?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "CPU use is the same for all applications at all times, so it is always enough",
      "CPU cannot be measured for containers by the kubelet",
      "Some workloads are limited by queues or latency, not by CPU",
      "CPU use is always zero for stateless services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a scrape interval mean for metrics freshness?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "Metrics are always real time with no delay of any kind",
      "Metrics are collected only when a pod is created",
      "Data is only as fresh as the last collection",
      "Metrics are collected once a day at midnight"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical output unit of CPU in kubectl top?",
    "topic": "Metrics server and resource metrics",
    "choices": [
      "Millicores, such as 250m for a quarter of a core",
      "Percent of the node, such as 25 percent of all of the CPUs of the machine",
      "Seconds of CPU time since the pod started",
      "Gigahertz of the processor of the node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Horizontal Pod Autoscaler do?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "It changes the CPU and memory of each pod while it is running",
      "It adds new nodes to the cluster when pods are pending",
      "It moves pods between zones to balance the load of the cluster",
      "It changes the number of replicas of a workload based on observed metrics"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which metric does an HPA commonly use by default?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "Disk use of the nodes that run the pods",
      "CPU utilisation relative to the requests of the pods",
      "The number of namespaces that exist in the cluster",
      "The number of users that have logged in to the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must pods have resource requests for CPU based HPA?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "Requests set the maximum number of replicas for the HPA to create at any time",
      "Utilisation is calculated as a percentage of the requested CPU",
      "Pods without requests are deleted by the scheduler",
      "Requests decide which node the HPA runs on"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do minReplicas and maxReplicas do?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "They set the memory limits for the smallest and the largest pod of the workload",
      "They set the lowest and highest version of the image",
      "They set the first and last node that the pods can use",
      "They set the lower and upper limits for the number of replicas"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the stabilization window for scale down?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "A period during which the HPA keeps the highest recent recommendation to avoid flapping",
      "The time that a new pod needs to start and become ready",
      "The time that a node needs to be removed from a cluster",
      "The time that metrics need to travel to the API server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can an HPA flap between sizes?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "The scheduler moves the HPA to a different node each minute",
      "The API server deletes old pods without warning",
      "Metrics fluctuate, so scaling too eagerly adds and removes pods repeatedly",
      "Pods change their names every few seconds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can an HPA scale on custom or external metrics?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "No, it can only use the CPU of the pods in the same namespace as the HPA",
      "Yes, but only when the application is written in Go",
      "Yes, through the custom and external metrics APIs with an adapter",
      "No, because metrics are not available for scaling"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is KEDA?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "An event driven autoscaler that can scale workloads, even to zero, based on events and queues",
      "A tool for building container images in a pipeline",
      "A policy engine for validating manifests",
      "A network plugin for the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if CPU and memory targets are both set on an HPA?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "The HPA uses the smaller of the two sizes only",
      "The HPA picks a metric at random for each decision that it has to make",
      "The HPA stops scaling and reports an error",
      "The HPA computes a size for each and uses the largest"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the application start quickly for effective scaling?",
    "topic": "Horizontal pod autoscaling",
    "choices": [
      "Slow start ups make the HPA use fewer metrics",
      "New pods must become ready before they can take the load",
      "The HPA can scale only applications with start times under a second",
      "Kubernetes limits the start time to one minute"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the Vertical Pod Autoscaler?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "It changes the number of replicas of a deployment",
      "It adjusts the CPU and memory requests of pods based on use",
      "It adds nodes to the cluster when pods cannot be placed on the existing ones",
      "It moves pods to nodes in a different zone"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main difference between HPA and VPA?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "VPA changes the number of pods, HPA changes the size of each pod",
      "They are the same, but they run on different nodes",
      "HPA works on nodes and VPA works on namespaces",
      "HPA changes the number of pods, VPA changes the size of each pod"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Cluster Autoscaler do?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "It adds or removes nodes when pods cannot be scheduled or nodes are underused",
      "It changes the number of replicas of each deployment",
      "It adjusts the memory limits of the containers",
      "It restarts the pods that are using too much CPU"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What triggers the Cluster Autoscaler to add a node?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "A high CPU use on the existing nodes only",
      "A request from an administrator through the console",
      "Pods that are pending because no node has enough free resources",
      "A new namespace that is created in the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What triggers it to remove a node?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "A node that has been running for more than a week",
      "A node that is in a different zone from the control plane",
      "A node that is underused and whose pods can run elsewhere",
      "A node that has more than ten pods on it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Karpenter, in the context of node scaling?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "A node provisioner that launches nodes that fit the pending pods",
      "A tool for building images for the nodes of the cluster from a golden base",
      "A log shipper that runs on every node",
      "A policy engine for namespaces"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should VPA in auto mode be used with care?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "It changes the number of replicas without limits",
      "It deletes the pods that do not use the CPU",
      "It changes the images of the pods without notice",
      "It restarts pods to change their resources"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can pod disruption budgets do for scale down?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "They set the maximum number of pods in a namespace",
      "They limit how many pods may be removed at once, to protect availability",
      "They define the budget of money for each team",
      "They stop pods from being scheduled on nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do pending pods with large requests block scale up on a small node type?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "Nodes cannot be added when pods have limits",
      "A node can be added only if one node can fit the pod",
      "Pending pods are removed after a minute by the scheduler",
      "Large pods are always scheduled on the control plane"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is overprovisioning with low priority pods used for?",
    "topic": "Vertical and cluster autoscaling",
    "choices": [
      "Wasting resources so that nodes are always full",
      "Testing the speed of the scheduler",
      "Reducing the cost of the cluster at night",
      "Keeping spare capacity that can be freed at once when real workloads need it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is Prometheus?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "A monitoring system that collects metrics as time series, usually by scraping endpoints",
      "A tool that stores the logs of every service in text files for search",
      "A tracing system that follows requests across services in a cluster",
      "A service that sends alerts to users by text message for each error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Prometheus usually collect metrics?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "Services push each metric to it every time that a request is made by a client",
      "It reads them from the log files on the disk of each server",
      "It pulls them over HTTP from the metrics endpoints of the services",
      "It receives them by email from each developer on the team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a counter metric?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "A value that goes up and down, such as the current memory use",
      "A value that stores the time of the last request that was served",
      "A value that only goes up, such as the total number of requests",
      "A value that is reset by the user at the start of each day"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a gauge metric?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "A value that can go up and down",
      "A value that only increases for as long as the process runs",
      "A value that records the distribution of request durations",
      "A value that holds the version of the code that is running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a histogram used for?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "Counting how many times an error happened in total",
      "Storing the last value that a service has reported",
      "Measuring how many users are logged in to the system at the present moment",
      "Recording the distribution of values such as latency in buckets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is PromQL?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "A language for writing the alert messages for the team",
      "The query language of Prometheus for selecting and aggregating time series",
      "A language for describing the layout of Grafana dashboards",
      "A format for storing metrics in a relational database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Grafana do in a monitoring stack?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "It collects metrics from the services by scraping their endpoints at a fixed interval",
      "It builds dashboards and graphs from data sources such as Prometheus",
      "It stores the logs of the services in a searchable index",
      "It routes alerts to the on call person of the team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why avoid labels with unbounded values, such as a user id, on metrics?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "Labels are not allowed to contain more than ten characters",
      "Labels with ids are removed by Prometheus at each scrape",
      "User ids are secret and cannot be stored in any metric",
      "Each value creates a new time series"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the RED method?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "Rate, errors and duration for each service",
      "Read, edit and delete for each database table",
      "Restart, extend and deploy for each cluster",
      "Request, encrypt and decrypt for each message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the USE method?",
    "topic": "Monitoring with Prometheus",
    "choices": [
      "Users, sessions and events for each application",
      "Upgrade, scale and evict for each node of the cluster",
      "Utilisation, saturation and errors for each resource",
      "Uptime, speed and efficiency for each developer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the common ways to collect logs in a cluster?",
    "topic": "Logging in clusters",
    "choices": [
      "Logging in to each node and reading the files by hand",
      "Sending logs by email from each pod",
      "A node level agent such as Fluent Bit, or sidecars that ship the logs",
      "Writing logs only to the memory of the pod"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do container logs go by default?",
    "topic": "Logging in clusters",
    "choices": [
      "To files on the node, written from the standard output and error of the container",
      "To etcd, where they are kept for ever",
      "To the API server, which stores them in a table",
      "To the registry together with the image"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to the logs of a pod when it is deleted?",
    "topic": "Logging in clusters",
    "choices": [
      "They are moved to the control plane for a year",
      "They are sent to the next pod of the deployment",
      "They are stored in the image of the pod",
      "The node logs are removed with it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why write logs to standard output in containers?",
    "topic": "Logging in clusters",
    "choices": [
      "Standard output is the only place that supports JSON",
      "The platform can collect them without extra files or agents in the container",
      "Files are not allowed in containers by Kubernetes",
      "It makes the application faster than writing files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a DaemonSet log agent do?",
    "topic": "Logging in clusters",
    "choices": [
      "One agent runs on the control plane and reads all of the etcd data of the cluster",
      "One agent runs on every node and forwards the logs of all pods on it",
      "One agent runs for each namespace and stores the secrets",
      "One agent runs for each user and counts the requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of structured logs in a cluster?",
    "topic": "Logging in clusters",
    "choices": [
      "They take less disk space than any other format",
      "They are encrypted by default in the file",
      "They can be read only by the tool that wrote them",
      "Fields such as pod, namespace and level can be searched and filtered easily"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What stack is often used for cluster logs?",
    "topic": "Logging in clusters",
    "choices": [
      "Fluent Bit or Fluentd with Elasticsearch, Loki or a cloud logging service",
      "Prometheus with Alertmanager only",
      "etcd with the scheduler",
      "kubectl with a text editor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of very verbose application logging?",
    "topic": "Logging in clusters",
    "choices": [
      "Pods will refuse to start if they log too much",
      "The API server stops answering",
      "High cost and noise, and sometimes a leak of sensitive data",
      "Logs become encrypted and unreadable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you see the logs of a crashed container?",
    "topic": "Logging in clusters",
    "choices": [
      "kubectl describe node of the node that ran it",
      "kubectl top pod for the crashed pod",
      "kubectl logs with the previous option",
      "kubectl exec into the crashed container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add pod and namespace labels to logs?",
    "topic": "Logging in clusters",
    "choices": [
      "You can find the logs of a service across restarts and nodes",
      "Labels make the log files smaller on the node",
      "Labels are needed for the logs to be written",
      "They hide the logs from other teams"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a liveness probe?",
    "topic": "Resource requests and limits",
    "choices": [
      "A check that tells whether a container is ready to receive traffic from the service",
      "A check that measures how many requests a container serves",
      "A check that counts the users that are logged in to a service",
      "A check that tells Kubernetes whether to restart a container that is stuck"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a readiness probe?",
    "topic": "Resource requests and limits",
    "choices": [
      "A check that restarts the pod whenever it is slow to answer",
      "A check that tells whether a pod can receive traffic, and removes it from the service if not",
      "A check that scans the container image for vulnerabilities",
      "A check that counts the number of restarts of a pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a startup probe for?",
    "topic": "Resource requests and limits",
    "choices": [
      "Checking that the node has started and has enough free disk",
      "Slow starting containers, so the other probes do not kill them too early",
      "Starting the pod in a specific order after other pods",
      "Measuring how long it takes to build an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a liveness probe fails repeatedly?",
    "topic": "Resource requests and limits",
    "choices": [
      "The pod is moved to a different cluster in another region",
      "The service is deleted from the namespace",
      "The node that runs it is turned off",
      "The container is restarted by the kubelet"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a readiness probe fails?",
    "topic": "Resource requests and limits",
    "choices": [
      "The pod stays running but receives no traffic from the service",
      "The container is killed and replaced right away",
      "The deployment is rolled back to the earlier revision by the controller of the cluster",
      "The cluster sends an email to the owner of the pod"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a resource request mean for a container?",
    "topic": "Resource requests and limits",
    "choices": [
      "The maximum that the container may ever use before it is stopped",
      "The price that the team pays for the use of the container",
      "The amount of CPU or memory that the scheduler reserves for it",
      "The number of replicas that the service requires to start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a resource limit do?",
    "topic": "Resource requests and limits",
    "choices": [
      "It reserves the amount for the container at scheduling time",
      "It sets the minimum amount of CPU that the container may use",
      "It caps the use, and a container above its memory limit can be killed",
      "It limits the number of images in the registry for the team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a container uses more memory than its limit?",
    "topic": "Resource requests and limits",
    "choices": [
      "It is terminated, often shown as OOMKilled",
      "It is slowed down but kept alive for as long as it needs",
      "It is moved to a node that has more memory available",
      "It receives a warning and the limit is raised automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why set requests and limits for every container?",
    "topic": "Resource requests and limits",
    "choices": [
      "Kubernetes refuses to start any pod that has no limits at all",
      "Requests and limits make the images smaller and faster to pull",
      "They are used to name the pods in the logs of the cluster",
      "The scheduler can place pods well, and one pod cannot starve the others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can a very slow liveness probe cause an outage?",
    "topic": "Resource requests and limits",
    "choices": [
      "It marks the whole cluster as unhealthy and shuts it down",
      "It may kill healthy pods that are only busy, causing restarts and a lack of capacity",
      "It blocks the deployment of new versions for the next hour",
      "It forces all pods to restart at the same time every night"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-9

```json
[
  {
    "stem": "What is GitOps?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "Developers run commands on the cluster by hand and then commit the result",
      "Git is used only to store the source code of the services and not their configuration files",
      "The desired state of the system is stored in Git, and an agent applies it to the cluster",
      "The cluster is edited through a web console and Git stores the screenshots"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ArgoCD do?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "It watches a Git repository and keeps the cluster in sync with the manifests there",
      "It builds the container images of services from their source code",
      "It collects metrics and traces from the services of the cluster",
      "It routes external traffic to the services of the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the pull model of GitOps?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "The pipeline pushes changes into the cluster using powerful admin credentials",
      "Developers copy files to the nodes by hand through a shell",
      "The cluster sends its configuration to Git each hour for backup",
      "An agent in the cluster pulls changes from Git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of the pull model for security?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "The cluster can no longer be reached from the internet at all",
      "Credentials to the cluster stay inside it and are not stored in the CI system",
      "No authentication is needed for any request to the cluster",
      "Git stores the passwords for the cluster in clear text for convenience of the team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is configuration drift?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "The slow growth of the size of the configuration files over time",
      "The live state differs from the declared state",
      "The movement of pods between nodes by the scheduler",
      "The change of the name of a service in the repository"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does GitOps handle drift?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "The agent deletes the repository and creates it again",
      "The agent ignores the difference and writes a short note about it into the logs",
      "The agent asks the user to run a command to fix it",
      "The agent detects it and can revert the cluster to the declared state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an advantage of GitOps for audit and rollback?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "Every change is a commit with an author, and a revert returns to an earlier state",
      "Changes are not recorded, so nobody can be blamed for a failure",
      "Rollbacks need a new build of every image each time",
      "The history is stored in the memory of the agent only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an ArgoCD Application resource define?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "The list of users who may log in to the ArgoCD web page",
      "The container image that must be built for a service",
      "The source repository and path, and the target cluster and namespace to sync",
      "The network rules between the pods of a namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does sync mean in ArgoCD?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "Copying the logs of the cluster to Git",
      "Synchronising the clocks of all nodes of the cluster",
      "Applying the desired state from Git to the cluster",
      "Merging two branches of the repository automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why separate the application code repository from the configuration repository?",
    "topic": "GitOps workflow for clusters",
    "choices": [
      "Code changes and deploy changes have different reviews and lifecycles",
      "Git does not allow code and configuration to be stored in the same repository",
      "Configuration repositories are required by ArgoCD to start",
      "It makes the code compile faster in the pipeline"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does declarative application delivery mean?",
    "topic": "Declarative app delivery",
    "choices": [
      "You run a list of commands in a fixed order on each cluster by hand",
      "You send changes to the cluster directly from the laptop of a developer with kubectl",
      "You copy the live state of the cluster into a file after each change",
      "You describe the desired state in files, and a controller makes the cluster match it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of keeping manifests in Git for delivery?",
    "topic": "Declarative app delivery",
    "choices": [
      "Manifests are encrypted automatically when they are committed to the repository",
      "Changes are reviewed, versioned and can be rolled back with a revert",
      "Git applies the manifests to the cluster by itself",
      "Git stores the running pods of the cluster in a table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an ArgoCD Application?",
    "topic": "Declarative app delivery",
    "choices": [
      "A container image of the application that is stored in a registry",
      "A resource that links a Git path to a cluster and namespace and keeps them in sync",
      "A user account of the person who deploys the application",
      "A network rule between two namespaces"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does automated sync with prune do?",
    "topic": "Declarative app delivery",
    "choices": [
      "It deletes the Git repository after the changes have been applied to the cluster",
      "It prunes the unused container images from the registry",
      "It removes the oldest pods of each deployment",
      "It applies changes from Git and deletes resources that are no longer in Git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does self heal do in ArgoCD?",
    "topic": "Declarative app delivery",
    "choices": [
      "It reverts manual changes in the cluster back to the state in Git",
      "It repairs broken nodes of the cluster by restarting them",
      "It fixes errors in the manifests before they are committed by the developers",
      "It heals the network between the pods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Flux?",
    "topic": "Declarative app delivery",
    "choices": [
      "A tool for building container images from the source code of the services",
      "A database for the secrets of the cluster",
      "Another GitOps tool that syncs a cluster with Git using controllers",
      "A service mesh for the traffic between pods"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a GitOps tool know that the cluster has changed?",
    "topic": "Declarative app delivery",
    "choices": [
      "It reads the audit log of the cluster for each change that was made by users",
      "It asks the users to report their manual changes",
      "It compares the live state with the desired state from Git",
      "It counts the number of pods in each namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical repository layout for GitOps?",
    "topic": "Declarative app delivery",
    "choices": [
      "Folders for environments or apps with manifests, Helm charts or Kustomize overlays",
      "One file for all of the clusters of the company",
      "Only the source code of the applications",
      "The secrets of each cluster in plain text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why separate environment configuration from application source code?",
    "topic": "Declarative app delivery",
    "choices": [
      "Git cannot store code and configuration together",
      "Configuration files must be stored on the nodes only",
      "Environments cannot share any repository",
      "Releases and config changes are reviewed and promoted on their own lifecycle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does app of apps mean in ArgoCD?",
    "topic": "Declarative app delivery",
    "choices": [
      "An application that has more than one container image",
      "One application that defines other applications",
      "An application store where users can download applications",
      "A way of installing many clusters from one pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can Helm charts be used with a GitOps tool?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "The tool replaces Helm with its own template language",
      "The tool renders the chart with values from Git and applies the result",
      "The tool uploads the chart to the registry of the cluster and installs it from there",
      "The tool runs helm install by hand on each node"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why not run helm install from a laptop in a GitOps setup?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "Laptops cannot reach the API server of any cluster",
      "Helm cannot render charts outside of the cluster",
      "The result would be deleted by the scheduler",
      "The cluster changes would not be recorded in Git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How are values for different environments stored with Helm and GitOps?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "As values files in Git, one for each environment, referenced by the application",
      "As secrets in the namespace of each release",
      "As labels on the nodes of the cluster",
      "As annotations in the Helm chart repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Kustomize?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "A tool that builds container images from a Dockerfile in the repository",
      "A service for storing the secrets of an application",
      "A tool that customises Kubernetes manifests with overlays and patches",
      "A scheduler plugin for choosing the nodes of pods"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might you choose Kustomize instead of Helm?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "When you need to package an application for many different users and teams",
      "When you need a public repository of charts",
      "When you want to patch plain manifests without a template language",
      "When you want to render manifests inside of the pod"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a Helm chart version in Git give in a GitOps flow?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "A reproducible deployment, since the version and values are recorded",
      "A faster rollout because the chart is cached on each of the nodes of the cluster",
      "A way to skip the review of the manifests",
      "An automatic backup of the namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of using the latest tag in manifests under GitOps?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "The image is always deleted by the registry",
      "The cluster refuses to apply a manifest that has latest",
      "The tag is too long for the API server",
      "The state in Git does not describe what really runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why pin image tags or digests in manifests?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "Pinned tags make images smaller in the registry",
      "Git then shows exactly which version runs, and a revert returns to it",
      "Pinned tags are required for pods to start",
      "The scheduler needs digests to place the pods"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of rendering Helm charts in CI before a change is merged?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "The rendered manifests are deployed to production at the same moment as the merge",
      "Errors in templates and values are found before they reach the cluster",
      "It removes the need to review the pull request of the change",
      "It lets Helm store the release history of the cluster in Git"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can image updates be automated with GitOps?",
    "topic": "Helm with GitOps tools",
    "choices": [
      "The cluster pulls a new image by itself and does not record the change",
      "A person copies the new tag into the cluster each morning",
      "The registry applies the new image to the pods directly",
      "A tool watches the registry and commits a new tag to Git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is progressive delivery?",
    "topic": "Progressive delivery",
    "choices": [
      "Releasing a change to a growing share of users while watching the results",
      "Releasing all changes to all users at once on the first day",
      "Releasing changes only when no one is using the system",
      "Releasing changes in the alphabetical order of the names of the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a canary release?",
    "topic": "Progressive delivery",
    "choices": [
      "A new version is installed on the developer laptop only",
      "A new version replaces the old one on all servers at once",
      "A new version gets a small share of traffic first, to detect problems early",
      "A new version is released only to the managers of the company for approval"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a blue green deployment?",
    "topic": "Progressive delivery",
    "choices": [
      "Two versions run on the same server and share the same memory and disk",
      "A deployment that uses blue and green log colours",
      "Two environments run, and traffic is switched from the old one to the new one",
      "A deployment that is made on Mondays and Thursdays"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main benefit of blue green for rollback?",
    "topic": "Progressive delivery",
    "choices": [
      "Switching traffic back to the old environment is quick",
      "The old version is deleted so there is nothing to roll back",
      "Rollbacks need a new build, which is slower than in other models",
      "There is no rollback in blue green, only a fix forward"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of blue green deployments?",
    "topic": "Progressive delivery",
    "choices": [
      "They cannot be used with containers or Kubernetes at all",
      "They make every release take at least a full day",
      "They need all users to log out before the switch is made",
      "They need double the capacity during the switch and care with the database changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a tool such as Argo Rollouts or Flagger help?",
    "topic": "Progressive delivery",
    "choices": [
      "It builds the image for the release and signs it for the registry",
      "It automates traffic shifting and analyses metrics to promote or roll back a release",
      "It writes the release notes for the new version automatically",
      "It stores the passwords for the cluster in a secure vault"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What metrics are often used to decide whether to continue a canary?",
    "topic": "Progressive delivery",
    "choices": [
      "The number of commits in the release and the names of their authors",
      "Error rate and latency compared with the stable version",
      "The size of the image and the number of layers in it",
      "The number of developers who have approved the release"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a feature flag?",
    "topic": "Progressive delivery",
    "choices": [
      "A label that marks the branch of a feature in Git",
      "A comment in the code that explains why a feature exists in the product",
      "A report that lists the features of a release",
      "A switch that turns a feature on or off without a new deployment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do feature flags help progressive delivery?",
    "topic": "Progressive delivery",
    "choices": [
      "Code can be deployed dark and enabled for a few users first",
      "Flags make the deploy faster by skipping the tests",
      "Flags remove the need to monitor a release after it has been put out",
      "Flags store the data of the users who use each feature"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a shadow or dark launch?",
    "topic": "Progressive delivery",
    "choices": [
      "The new version is released at night when nobody is using it",
      "The new version is released without telling the team",
      "Real traffic is copied to the new version",
      "The new version is hidden from the monitoring tools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does multi cluster delivery mean?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "One cluster is split into several smaller clusters automatically",
      "Several teams share one cluster with separate namespaces",
      "The same or related applications are deployed to several clusters from one source of truth",
      "The nodes of a cluster are spread over several regions of a provider"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why deploy to several clusters?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Isolation, regional latency, resilience and separate environments",
      "A single cluster cannot run more than ten pods",
      "Clusters must be replaced by new ones every month",
      "Several clusters make the control plane cheaper"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does ArgoCD manage several clusters?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "It must be installed again in each cluster with a separate repository",
      "It can only manage the cluster where it runs",
      "It creates a new Git repository for each cluster",
      "It registers each cluster and can deploy applications to any of them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an ApplicationSet used for?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Grouping the secrets of several applications",
      "Generating many applications from a template",
      "Listing the nodes of all clusters in one table",
      "Defining the network between applications"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good way to handle differences between clusters?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Copy and edit all of the manifests by hand for each of the clusters",
      "Share a base and apply small overlays or values for each cluster",
      "Use a different tool and repository for each cluster",
      "Ignore the differences, since clusters are always the same"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of a single GitOps control point for many clusters?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "It makes each cluster slower for its own users",
      "It removes the need for any access control",
      "It prevents the clusters from running any workload",
      "A compromise or outage of that control plane affects all of the clusters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can rollouts to several clusters reduce risk?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Roll out in waves, starting with a low risk cluster, and check before the next wave",
      "Roll out to all clusters at the same second to save time",
      "Roll out to the production cluster first and test afterwards",
      "Roll out by hand on the day of a holiday"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What identity does a central tool need to deploy to remote clusters?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Full administrator access to every cluster of the company",
      "No credentials, because clusters trust each other",
      "Credentials with limited rights for each target cluster",
      "The password of the person who created the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does fleet management mean?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Managing the vehicles of a company with software",
      "Managing a single node with many pods",
      "Managing many clusters with common policy, configuration and lifecycle",
      "Managing the images in many registries"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep cluster specific secrets out of the shared base?",
    "topic": "Multi-cluster delivery",
    "choices": [
      "Each cluster has its own credentials, and leaks should stay contained",
      "Secrets cannot be stored in a base in any tool",
      "Bases are copied to public repositories automatically",
      "Secrets make a base too large to sync"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is drift in GitOps?",
    "topic": "Drift detection and sync",
    "choices": [
      "A change of the Git branch name in the repository",
      "A slow growth of the size of manifests",
      "A change in the speed of the network",
      "A difference between the live state of the cluster and the desired state in Git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can drift appear?",
    "topic": "Drift detection and sync",
    "choices": [
      "Git commits are deleted by the cluster at night",
      "Someone changes a resource by hand, or another controller modifies it",
      "The scheduler moves pods to other nodes by random",
      "The registry changes the tag of an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does ArgoCD show an application that has drifted?",
    "topic": "Drift detection and sync",
    "choices": [
      "As Healthy with no extra information about the change that was found",
      "As OutOfSync, with a diff between the live and desired state",
      "As Deleted, and removes the application from the list",
      "As Progressing for as long as the drift exists"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between sync status and health status?",
    "topic": "Drift detection and sync",
    "choices": [
      "Health says whether live matches Git, sync says whether the resources work",
      "They are the same status with two names in the interface",
      "Sync is for pods and health is for services only",
      "Sync says whether live matches Git, health says whether the resources work"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can automatic self heal be a problem during an incident?",
    "topic": "Drift detection and sync",
    "choices": [
      "It may revert an emergency manual fix",
      "It deletes the logs that are needed for the incident",
      "It restarts all nodes of the cluster each time",
      "It stops the pods from running while the fix is applied"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are sync waves used for?",
    "topic": "Drift detection and sync",
    "choices": [
      "Spreading syncs over time so the cluster is never busy",
      "Waving a flag when a sync has finished",
      "Ordering the creation of resources",
      "Choosing which cluster is synced first"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are resource hooks in a sync?",
    "topic": "Drift detection and sync",
    "choices": [
      "Hooks that are added to the source code of the application",
      "Rules that block resources from being deleted",
      "Jobs that run at points of the sync",
      "Webhooks that send alerts to a chat tool"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can some fields be ignored when diffing?",
    "topic": "Drift detection and sync",
    "choices": [
      "With ignore differences rules, for fields that controllers change on purpose",
      "By deleting the fields from the live objects",
      "By setting the sync to manual for ever",
      "By moving the fields to another namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why alert on persistent OutOfSync?",
    "topic": "Drift detection and sync",
    "choices": [
      "It shows that Git is out of disk space",
      "It means that the nodes need more memory",
      "It is required by the API server for audits",
      "It can mean that a change is blocked or that something modifies the cluster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a safe way to apply an urgent manual fix?",
    "topic": "Drift detection and sync",
    "choices": [
      "Make the change by hand and never write it down",
      "Make the change, then record it in Git quickly so that live and Git match again",
      "Disable the GitOps tool for the rest of the week",
      "Delete the application and recreate it from memory"
    ],
    "answerIdx": 1
  }
]
```

LAYER: kubernetes-10

```json
[
  {
    "stem": "Why does Kubernetes support only a limited number of minor versions at a time?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "Older versions are deleted from the registry by the project every week",
      "Each release needs a new cluster, which replaces the old one entirely",
      "Fixes and security patches are given only to recent releases",
      "Minor versions are made by the cloud provider and cannot be chosen"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the version skew policy?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "It limits how far apart the versions of components",
      "It limits how many nodes may run in a cluster at one time",
      "It limits how often a cluster may be upgraded per year",
      "It limits the number of namespaces that a cluster can hold"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In what order are cluster components upgraded?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "The nodes first, then the control plane",
      "All components at the same time to avoid skew",
      "The order does not matter for a cluster",
      "The control plane first, then the nodes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why drain a node before upgrading it?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "Draining deletes the node from the cluster for ever",
      "Pods are moved away safely",
      "Draining resets the data of all pods on the node",
      "The node cannot be restarted without being drained first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does kubectl cordon do?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "It deletes all pods on the node at once",
      "It marks a node as unschedulable",
      "It copies the node to a different zone",
      "It restarts the kubelet of the node"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do PodDisruptionBudgets protect during upgrades?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "The data of pods in persistent volumes during the drain",
      "The API server from too many requests that arrive during the upgrade window",
      "The nodes from being scheduled while drained",
      "A minimum number of available pods while nodes are drained"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why read the release notes and deprecations before upgrading?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "APIs can be removed, and manifests or tools may need changes",
      "Release notes decide which version the cluster upgrades to without any other input",
      "Deprecations are applied automatically to all resources",
      "Upgrades cannot start without a signed release note"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safe way to upgrade nodes with little risk?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "Upgrade all nodes at the same moment during the day",
      "Upgrade the nodes in a random order without checks",
      "Use rolling or surge upgrades, with new nodes created before old ones are removed",
      "Delete the nodes and wait for them to come back"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why test an upgrade in a non production cluster first?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "Test clusters always have the same data as production",
      "Upgrades are not allowed in production without a test run on a staging cluster",
      "You can find broken APIs, add ons and workloads before they affect users",
      "A test cluster makes the upgrade faster in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that an API version is removed?",
    "topic": "Cluster upgrades and versioning",
    "choices": [
      "Manifests that use it fail until they are migrated to a newer version",
      "The resource data is deleted from etcd at once",
      "The API server stops all requests for that cluster",
      "The version is hidden from kubectl but still works"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is stored in etcd?",
    "topic": "etcd backup and restore",
    "choices": [
      "The container images of every application that runs in the cluster at that time",
      "The logs of all pods and nodes of the cluster",
      "The metrics that autoscalers use to scale pods",
      "The state of the cluster, including all objects and their specifications"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is an etcd backup usually taken?",
    "topic": "etcd backup and restore",
    "choices": [
      "By copying the pod logs of the control plane to a folder",
      "With etcdctl snapshot save, or the snapshot features of a managed service",
      "By exporting the list of pods with kubectl once a week",
      "By stopping the cluster and copying the disk images of all of the nodes to storage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do you need to restore a cluster from an etcd snapshot?",
    "topic": "etcd backup and restore",
    "choices": [
      "Only the list of namespaces, since etcd holds nothing more",
      "The snapshot and the procedure to restore it, with matching certificates and configuration",
      "A running API server that can read the snapshot at once",
      "The container images of each application in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why test restores and not only backups?",
    "topic": "etcd backup and restore",
    "choices": [
      "Restores are faster than backups, so they must be tested",
      "Backups are always valid when the command ends with no output",
      "Testing restores is required by the etcd software to start",
      "A backup that cannot be restored is useless, and problems show up only in a test"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Do etcd backups include the data in persistent volumes?",
    "topic": "etcd backup and restore",
    "choices": [
      "No, volumes need their own backup",
      "Yes, etcd stores the contents of all volumes in the cluster",
      "Yes, but only for volumes of the default namespace",
      "No, because volumes are deleted when etcd is backed up"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What tool is often used to back up cluster resources and volumes?",
    "topic": "etcd backup and restore",
    "choices": [
      "Helm",
      "kubectl top",
      "Velero",
      "CoreDNS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should etcd backups be stored?",
    "topic": "etcd backup and restore",
    "choices": [
      "On the same node as etcd, to make restores quick",
      "In a public bucket so that they are easy to find",
      "Off the cluster and off the same failure domain, with access control",
      "In the container image of the API server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of a cluster with a single etcd member?",
    "topic": "etcd backup and restore",
    "choices": [
      "Losing that member loses the state of the cluster",
      "It makes the cluster slower than a cluster with more members",
      "It prevents the API server from using certificates",
      "It limits the number of pods to ten"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is an odd number of etcd members used?",
    "topic": "etcd backup and restore",
    "choices": [
      "Etcd refuses to start with an even number of members",
      "Odd numbers make the members use less memory",
      "Each member needs an odd port number",
      "A majority can still be reached, and even numbers add no extra fault tolerance"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can happen if etcd runs out of disk or latency is high?",
    "topic": "etcd backup and restore",
    "choices": [
      "Pods keep running and nothing else is affected at all",
      "The API becomes slow or read only, and the cluster can stop working properly",
      "The scheduler moves etcd to another node",
      "Etcd deletes old pods to free space"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a disaster recovery plan for a cluster?",
    "topic": "Disaster recovery",
    "choices": [
      "A list of the employees who may enter the data center",
      "A tested plan to restore the service after a major failure, with defined targets",
      "A rule that clusters must be deleted every year",
      "A diagram of the network of the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do RTO and RPO mean?",
    "topic": "Disaster recovery",
    "choices": [
      "Request time objective and read performance objective",
      "Replica target option and retry policy option",
      "Release timing order and rollout plan order",
      "Recovery time objective, and recovery point objective"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep infrastructure and applications as code in Git for recovery?",
    "topic": "Disaster recovery",
    "choices": [
      "A new cluster can be rebuilt quickly and consistently from the code",
      "Code is faster to copy than any backup of data",
      "Git stores the data of the databases of the cluster, so no backup is needed for them",
      "Code removes the need for any backup of volumes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of multiple zones for a cluster?",
    "topic": "Disaster recovery",
    "choices": [
      "Zones make the cluster use less money",
      "All pods run on one node in one zone for speed",
      "The cluster can survive the loss of one zone if workloads are spread across zones",
      "Zones are required by the API server to start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can pods be spread across zones?",
    "topic": "Disaster recovery",
    "choices": [
      "With a label that names the zone on each pod",
      "With a service that has exactly one pod for each zone of the cloud region",
      "With topology spread constraints or anti affinity rules",
      "With a node selector on the control plane"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an active passive setup across regions?",
    "topic": "Disaster recovery",
    "choices": [
      "One region serves traffic, and another stands ready to take over",
      "Both regions serve traffic at the same time all of the time with no standby",
      "One region holds the data and the other holds the code",
      "The second region is started only for the tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is state the hard part of disaster recovery?",
    "topic": "Disaster recovery",
    "choices": [
      "State is stored in the images, so it is easy to copy",
      "State is deleted when a cluster is rebuilt, which is expected",
      "Only the control plane has state, and it is easy to recreate",
      "Stateless pods are easy to recreate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a DR exercise include?",
    "topic": "Disaster recovery",
    "choices": [
      "Only a written review of the plan by managers",
      "A real or simulated failover and a check against the recovery targets",
      "A shutdown of the monitoring for the length of the test so that no alerts fire",
      "A copy of the plan stored on the same cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is chaos engineering in this context?",
    "topic": "Disaster recovery",
    "choices": [
      "Making the cluster random so that attackers cannot understand how it is built",
      "Injecting failures on purpose to find weaknesses before they cause outages",
      "Deleting all pods of a cluster once a month",
      "Running pods without any resource limits"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why document runbooks for recovery steps?",
    "topic": "Disaster recovery",
    "choices": [
      "Runbooks replace the need for backups",
      "Runbooks make the cluster restore itself",
      "Only automated tools may use them",
      "People under stress can follow tested steps and recover faster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is multi tenancy in a cluster?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "Several teams or customers share one cluster with isolation between them",
      "One team owns a cluster with several nodes",
      "A cluster is used by one application in many regions",
      "Several clusters share one control plane"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a ResourceQuota?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "A limit on the resources of one single container, such as its CPU and memory",
      "A rule that sets the price of each namespace",
      "A limit on the total resources that a namespace may use",
      "A list of the users in the namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a LimitRange?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "A range of IP addresses for the pods of a namespace",
      "A range of ports that services in the namespace can use",
      "Default and maximum resource values for containers or pods in a namespace",
      "A time range in which pods may be deleted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do quotas matter in a shared cluster?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "One team cannot use up the capacity that others need",
      "Quotas make all workloads run faster than they did before they were applied",
      "Quotas encrypt the data of each namespace",
      "They are required for namespaces to be created"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are soft and hard multi tenancy?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "Soft means small clusters and hard means big clusters",
      "Hard tenancy uses only one namespace for all tenants",
      "Soft tenancy deletes data after a day",
      "Soft assumes trusted tenants, hard assumes untrusted ones and needs stronger isolation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What controls isolate tenants beyond namespaces?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "A single shared password for all tenants of the cluster",
      "RBAC, network policies, pod security, quotas and sometimes separate nodes",
      "A naming convention for pods that tenants must follow",
      "Only the namespace labels that tenants choose"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When might separate clusters be better than namespaces for tenants?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "When tenants want to share all of their data",
      "When tenants do not trust each other or need strong isolation and different upgrades",
      "When the cluster has too few nodes to run pods",
      "When namespaces are not available in the cloud"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a virtual cluster?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "A cluster that runs on a developer laptop only",
      "A cluster that has no nodes and no workloads",
      "A backup copy of a cluster in another region",
      "A lightweight control plane for a tenant that runs inside a host cluster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a priority class do?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "It sets the importance of pods",
      "It sets the order of images in the registry",
      "It sets the priority of network packets between nodes",
      "It chooses the namespace in which a pod will run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why set default requests and limits for tenants?",
    "topic": "Multi-tenancy and quotas",
    "choices": [
      "Defaults make pods start faster than pods without them",
      "Defaults are needed for pods to receive an IP address",
      "The scheduler can place pods well, and noisy workloads cannot starve the others",
      "They set the names of the pods automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why track the cost of a cluster?",
    "topic": "Capacity and cost management",
    "choices": [
      "Costs are shown by the API server in each response",
      "Cost tracking makes pods run faster on nodes",
      "Unused or oversized resources are common, and cost grows quietly",
      "Billing is the same for every cluster and cannot change over time for any team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is rightsizing?",
    "topic": "Capacity and cost management",
    "choices": [
      "Adjusting requests and limits to match real use",
      "Making the images of the pods smaller",
      "Choosing a smaller cluster for the test environment only",
      "Reducing the number of namespaces to ten"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if requests are much higher than real use?",
    "topic": "Capacity and cost management",
    "choices": [
      "Pods run faster than pods with lower requests",
      "Nodes are removed from the cluster at once",
      "The scheduler cannot place any pod",
      "Capacity is reserved but not used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of spot or preemptible nodes?",
    "topic": "Capacity and cost management",
    "choices": [
      "Higher reliability than normal nodes, which makes them the best choice for databases",
      "Much lower cost for workloads that can handle interruption",
      "No need for any autoscaling in the cluster",
      "Longer node lifetime than any other type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which workloads suit spot nodes?",
    "topic": "Capacity and cost management",
    "choices": [
      "Single replica databases without backups",
      "Stateless, fault tolerant and batch work",
      "Control plane components of the cluster",
      "Workloads that cannot be restarted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is bin packing in scheduling?",
    "topic": "Capacity and cost management",
    "choices": [
      "Putting each pod on its own node for isolation",
      "Packing the images of pods into archives for transfer",
      "Sorting pods by name before they are scheduled",
      "Placing pods so that nodes are used fully"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why label resources for cost allocation?",
    "topic": "Capacity and cost management",
    "choices": [
      "Costs can be broken down by team, application and environment",
      "Labels reduce the price of each resource",
      "Labels are required by the cloud providers before they will bill for resources",
      "Labels delete unused resources automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What tools help to see cost per namespace or workload?",
    "topic": "Capacity and cost management",
    "choices": [
      "Tools that scan images for vulnerabilities",
      "Tools that rewrite the manifests of the cluster",
      "Tools such as OpenCost or Kubecost, or the billing data of the provider",
      "Tools that restart nodes at night"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to avoid forgotten resources?",
    "topic": "Capacity and cost management",
    "choices": [
      "Keep all environments running for ever just in case",
      "Hide the costs from the teams that create them",
      "Set TTLs or automated cleanups for temporary environments and review idle resources",
      "Stop monitoring them after a month"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why balance cost savings against reliability?",
    "topic": "Capacity and cost management",
    "choices": [
      "Cutting too far can cause outages and cost more in lost service",
      "Reliability and cost are always the same thing",
      "Savings are required before any workload can run",
      "Reliable systems must always use the biggest nodes that the provider offers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the first steps in a cluster incident?",
    "topic": "Incident response for clusters",
    "choices": [
      "Delete all pods and recreate the cluster at once",
      "Wait until a customer reports the incident",
      "Restart the control plane before anything else",
      "Assess the impact, communicate, and stabilise the service before looking for the root cause"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kubectl commands help to diagnose a failing pod?",
    "topic": "Incident response for clusters",
    "choices": [
      "delete, apply, scale and label",
      "describe, logs, events and get with wide output",
      "top, cordon, drain and taint",
      "port-forward, exec and cp only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does CrashLoopBackOff mean?",
    "topic": "Incident response for clusters",
    "choices": [
      "A container is waiting for a node to become free before it can be started",
      "A container keeps crashing and Kubernetes delays each restart",
      "A container is being deleted by the controller",
      "A container has finished and will not restart"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can cause ImagePullBackOff?",
    "topic": "Incident response for clusters",
    "choices": [
      "A shortage of memory on the node",
      "A failing liveness probe",
      "A missing service account",
      "A wrong image name or tag, or missing credentials for a private registry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a pod stuck in Pending often mean?",
    "topic": "Incident response for clusters",
    "choices": [
      "The scheduler cannot place it",
      "The pod is running but is not ready",
      "The pod was deleted and is waiting to be removed",
      "The pod finished its work successfully"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does OOMKilled mean?",
    "topic": "Incident response for clusters",
    "choices": [
      "The container ran out of disk space on the node and was stopped by the kubelet",
      "The container had a network timeout",
      "The container used more memory than its limit and was killed",
      "The container was deleted by the scheduler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why look at events with kubectl get events?",
    "topic": "Incident response for clusters",
    "choices": [
      "They list the users who changed the cluster last week with the time of each change",
      "They show the performance metrics of each pod",
      "They show recent scheduling, pull and probe problems for the objects",
      "They show the content of the Secrets in the namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice during an incident for changes to the cluster?",
    "topic": "Incident response for clusters",
    "choices": [
      "Record what you change, preferably through the normal process",
      "Make changes by hand and tell nobody about them until the next day",
      "Change several things at once so that one of them works",
      "Disable all monitoring during the repair"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a post incident review produce?",
    "topic": "Incident response for clusters",
    "choices": [
      "A list of the people who made mistakes",
      "A new cluster with a different name",
      "A report that is kept secret from other teams",
      "Causes, timeline and concrete actions with owners, without blaming people"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why practise incident drills for clusters?",
    "topic": "Incident response for clusters",
    "choices": [
      "Drills make the cluster more stable at the time of the drill",
      "Teams learn the tools and steps before a real outage happens",
      "They replace the need for monitoring and alerts",
      "They are required by the API server for each upgrade"
    ],
    "answerIdx": 1
  }
]
```


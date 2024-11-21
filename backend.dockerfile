FROM golang:1.23.1

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code.
COPY *.go ./

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-backend-image

# Bind to a TCP port
EXPOSE 4000

# Run
CMD ["/docker-backend-image"]
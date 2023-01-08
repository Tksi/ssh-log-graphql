FROM golang:1.16-alpine as builder
WORKDIR /usr/src
COPY go.mod go.sum main.go ./
RUN go mod download
RUN go build -o log2mutation main.go

FROM node:17-alpine
COPY --from=builder /usr/src/log2mutation /usr/bin/log2mutation
RUN mkdir -p /var/log
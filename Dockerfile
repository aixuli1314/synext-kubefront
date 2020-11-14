FROM node:12-alpine
RUN adduser -D -g kubeSphere -u 1002 kubeSphere && \
    mkdir -p /opt/kubeSphere/console && \
    chown -R kubeSphere:kubeSphere /opt/kubeSphere/console
WORKDIR /opt/kubeSphere/console
COPY . /opt/kubeSphere/console
RUN mv dist/server.js server/server.js \
    && mv dist/fonts fonts
USER kubeSphere
EXPOSE 8000
CMD ["npm", "run", "serve"]
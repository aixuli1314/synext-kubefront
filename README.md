# kubeSphere Console

![](https://github.com/kubeSphere/console/workflows/Main/badge.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

kubeSphere Console is the web-based UI for [kubeSphere](https://github.com/kubeSphere/kubeSphere) clusters.

![kubeSphere Console](docs/images/dashboard-ui.png)

## Getting Started

A kubeSphere cluster is required before getting started.

Read [Installation](https://github.com/kubeSphere/kubeSphere#installation) guide to install a cluster.

Read [the guide](https://github.com/kubeSphere/kubeSphere#to-start-using-kubeSphere) to start using kubeSphere.

Features Map:

![Features Map](docs/images/module-map.jpg)

## Developer Guide

### Preparation

Make sure the following software is installed and added to the \$PATH variable:

- A kubeSphere cluster ([Installation](https://github.com/kubeSphere/kubeSphere#installation))
- Node.js 12.18+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.22.4+

Install yarn with npm:

```sh
npm install -g yarn
```

Fork the repository, then clone your repository and install the dependencies:

```sh
yarn
```

Note: If you are in China Mainland, execute the following command before running the command above for faster installation.

```sh
yarn config set registry https://registry.npm.taobao.org
```

Alternatively you can start development using docker. See [Development with Docker](/docs/development-with-docker.md).

### Access the backend services of kubeSphere

Follow [the guide](/docs/access-backend.md) to configure the backend services.

### Start kubeSphere Console for development

```sh
yarn lego
yarn start
```

Now, you can access http://localhost:8000 to view the console using the default account admin / P@88w0rd.

### Run tests

```sh
yarn test
```

### Build kubeSphere Console for production

The project can be built for production by using the following task:

```sh
yarn build
```

To build and serve from dist, using the following task:

```sh
yarn serve
```

To build kubeSphere console to an image, run the following task after `yarn build`:

```sh
docker build -t ks-console .
```

Test kubeSphere console image by run:

```sh
./docker-run
```

## Development Workflow

Follow [Development Workflow](/docs/development-workflow.md) to commit your codes.

## Support, Discussion, and Community

If you need any help with kubeSphere, please join us at [Slack Channel](https://join.slack.com/t/kubeSphere/shared_invite/enQtNTE3MDIxNzUxNzQ0LTZkNTdkYWNiYTVkMTM5ZThhODY1MjAyZmVlYWEwZmQ3ODQ1NmM1MGVkNWEzZTRhNzk0MzM5MmY4NDc3ZWVhMjE).

Please submit any kubeSphere Console bugs, issues, and feature requests to [kubeSphere Console GitHub Issue](https://github.com/kubeSphere/console/issues).

## Contributing to the project

Welcome to contribute to kubeSphere Console, see [Contributing Guide](CONTRIBUTING.md).

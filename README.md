# Openchat

## Dependencies

You need to have installed the node version specified on `.nvmrc` and [yarn](https://yarnpkg.com/lang/en/).

To manage node versions, it is recommended to use a version manager like [nvm](https://github.com/creationix/nvm) on linux or [n](https://github.com/tj/n) on macOS.

To install the project dependencies you need to use `yarn install`.

If you are in mac, additionaly run `brew install watchman`.

## Environments

You have the environment variables on `.env`, you can change them to suit your needs.

## Development server

Run `yarn start` for a dev server.

## Running unit tests

Run `yarn test` to execute every test.
Run `yarn unit` to execute unit tests.
Run `yarn integration` to execute integration tests.

## Linting

You can test for linting issues with `yarn lint`.

Some issues can be automatically fixed with `yarn lint --fix`.

## Build

You can run `yarn build` to build the project.
The build artifacts will be stored in the `dist/` directory.

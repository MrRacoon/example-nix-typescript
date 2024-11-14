# example-nix-typescript

This repo helps me rememeber the pattern for doing typescript in nix.

It comes with configurations for eslint, prettier, and jest.

### Building w/o nix

This pattern will work without nix in the traditional ways

```shell
# Allow direnv to create the dev environment
$ direnv allow

# Get the node_modules
$ yarn

# run tests, formatting, and linting checks
$ yarn run test
$ yarn run pretty # add `--write` to fix files
$ yarn run lint

# Build the app
$ yarn run build

# Run the app
$ yarn run start
```

### Building w/ nix

Nix takes care of the `node_modules` and our flake has checks for each of the
test/lint/formatting commands

```shell
# Run tests, formatter and linter
$ nix flake check

# Build the app
$ nix build .

# Run the app
$ ./result/bin/example-nix-typescript
```


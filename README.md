# example-nix-typescript

This repo helps me rememeber the pattern for doing typescript in nix. 

### Build w/ nix

Nix takes care of the `node_modules` and building the app in one fell swoop

```shell
# Build the app
$ nix build .

# Run the app
$ ./result/bin/example-nix-typescript
```

### Build w/o nix

This pattern still works if you want to develop the old fashioned way. 

```shell
# Allow direnv to create the dev environment
$ direnv allow

# Get the node_modules
$ yarn

# Build the app
$ yarn run build

# Run the app
$ yarn run start
```

{
  description = "Example of a project that integrates nix flake with yarn and typescript.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        name = "example-nix-typescript";

        pkgs = nixpkgs.legacyPackages.${system};

        node-modules = pkgs.mkYarnPackage {
          name = "node-modules";
          src = ./.;
        };

        deps = [
          pkgs.typescript
          pkgs.yarn
          pkgs.nodejs
          node-modules
        ];

        yarnRun = cmd: pkgs.stdenv.mkDerivation {
          name = "yarn-run-${cmd}";
          src = ./.;
          doCheck = true;
          nativeBuildInputs = deps;
          checkPhase = ''
            ln -s ${node-modules}/libexec/${name}/node_modules node_modules
            ${pkgs.yarn}/bin/yarn run ${cmd}
          '';
          installPhase = "touch $out";
        };

        example-nix-typescript = pkgs.stdenv.mkDerivation {
          inherit name;
          src = ./.;
          buildInputs = deps;
          buildPhase = ''
            ln -s ${node-modules}/libexec/${name}/node_modules node_modules
            ${pkgs.yarn}/bin/yarn build
          '';
          installPhase = ''
            mkdir $out
            mv package.json $out/
            mv dist $out/
            mv bin $out/
            mv node_modules $out/
          '';
        };
      in
      {
        checks = {
          jest = yarnRun "test";
          lint = yarnRun "lint";
          pretty = yarnRun "pretty --check";
        };
        packages = {
          node-modules = node-modules;
          default = example-nix-typescript;
        };
        devShell = pkgs.mkShell {
          buildInputs = deps;
        };
      }
    );
}


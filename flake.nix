{
  description = "Example of a project that integrates nix flake with yarn and typescript.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        deps = [
          pkgs.typescript
          pkgs.yarn
          pkgs.nodejs
        ];

        node-modules = pkgs.mkYarnPackage {
          name = "node-modules";
          src = ./.;
        };

        example-nix-typescript = pkgs.stdenv.mkDerivation rec {
          name = "example-nix-typescript";
          src = ./.;
          buildInputs = deps ++ [ node-modules ];
          buildPhase = ''
            ln -s ${node-modules}/libexec/${name}/node_modules node_modules
            ${pkgs.yarn}/bin/yarn build
          '';
          installPhase = ''
            mkdir $out
            mv dist $out/dist
            mv bin $out/bin
            mv node_modules $out/node_modules
          '';
        };
      in
      {
        packages = {
          node-modules = node-modules;
          default = example-nix-typescript;
        };
        devShell = with pkgs; mkShell {
          buildInputs = deps ++ [ node-modules ];
        };
      }
    );
}


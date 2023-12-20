{
    description= "React web components implementation POC";

    inputs = {
        nixpkgs.url = "github:NixOS/nixpkgs";
    };

    outputs = {nixpkgs, ...}:
    let
        system = "x86_64-linux";
        pkgs = nixpkgs.legacyPackages.${system};
    in {
        devShells.${system}.default = (import ./shell.nix { inherit pkgs; });
    };
}

# php-extensions-overlay.nix

self: super:

let
  # List of enabled PHP extensions based on the environment variable PHP_EXTENSIONS.
  # If the variable is not set, default to an empty list.
  enabledExtensions = (builtins.getEnv "PHP_EXTENSIONS" or "") // "php81Extensions.grpc";

  # Function to enable PHP extensions.
  enableExtension = extension: if (builtins.elem extension enabledExtensions) then extension else null;

in
{
  phpWithExtensions = self.phpWithExtensions.override {
    extensions = pkgs: with pkgs; [
      enableExtension php81Extensions.grpc
      # Add other extensions here
    ];
  };
}

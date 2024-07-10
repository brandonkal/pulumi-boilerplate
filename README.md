# Pulumi Boilerplate

This repository contains a TypeScript Boilerplate for Pulumi. It contains

-   Biome.js for linting and automated style formatting
-   TypeScript to assist in development and avoid certain runtime errors
-   SWC configured for extremely fast TypeScript compilation
-   Prettier configured for formatting files that Biome.js does not yet support (mainly YAML)
-   yamllint for linting YAML configured to not report on style violations (handled by Prettier)
-   [typos](https://github.com/crate-ci/typos) is used to keep your code free from those
-   gitleaks configured. Don't commit those secrets to git in plain text!
-   [Lefthook](https://github.com/evilmartians/lefthook) aka the fastest Git Hooks manager configured with a pre-commit hook that ensures all commits pass these tests
-   VSCode settings for both Biome and Prettier and to disable auto port forwarding (Pulumi CLI opens a lot of local servers during its work)
-   VSCode is also configured to fold most of the boilerplate files under package.json, for a cleaner explorer workspace
-   pnpm is used for a better developer experience
-   an [Inkjet](https://github.com/brandonkal/inkjet) file with a few basic commands
-   Support for running via Pulumi CLI and Automation API

You will need to install [typos](https://github.com/crate-ci/typos) CLI in your environment. Leftook is installed through NPM, but you can also install it globally as well (left).

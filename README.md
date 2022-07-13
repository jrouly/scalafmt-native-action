# scalafmt-native GitHub Action

[![CI status badge](https://github.com/jrouly/scalafmt-native-action/actions/workflows/ci.yml/badge.svg)](https://github.com/jrouly/scalafmt-native-action/actions/workflows/ci.yml)
[![Release status badge](https://github.com/jrouly/scalafmt-native-action/actions/workflows/release.yml/badge.svg)](https://github.com/jrouly/scalafmt-native-action/actions/workflows/release.yml)

GitHub action to run [scalafmt-native](https://scalameta.org/scalafmt).

> Spend more time discussing important issues in code review and less time on code style.
> Scalafmt formats code so that it looks consistent between people on your team.

Integrate Scala code formatting in your GitHub actions workflows.
By using the native scalafmt image, this action typically completes in two to three seconds for moderately sized codebases.

## Usage

```yaml
- uses: jrouly/scalafmt-native-action@v2
  with:
    # Optional: Which version of scalafmt-native to use.
    # Default: 3.5.8
    version: '3.5.8'

    # Optional: Arguments to be passed to scalafmt-native.
    # Default: --list
    arguments: '--list'
```

#### Default usage

Without any parameters, this action will run `scalafmt-native --list`.
If any non-conforming files are present, they will be printed and the command will exit with a failure.
Otherwise it will silently exit with success.

```yaml
- uses: jrouly/scalafmt-native-action@v2
```

#### OS compatibility

[scalafmt-native](https://scalameta.org/scalafmt) is [not available for Windows](https://github.com/scalameta/scalafmt/issues/1569).
Can only be run on Linux and MacOS.

## Credits

Inspired by the design and usage patterns of [olafurpg/setup-scala](https://github.com/olafurpg/setup-scala).

Similar to [openlawteam/scalafmt-ci](https://github.com/openlawteam/scalafmt-ci) but does not pin the version of the action to a specific version of scalafmt.

Similar to [AvaPL/scalafmt-native-formatter](https://github.com/AvaPL/scalafmt-native-formatter) but leverages the GitHub actions TypeScript SDK for logging and testing.

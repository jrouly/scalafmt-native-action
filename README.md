# scalafmt-native GitHub Action

[![CI status badge](https://github.com/jrouly/scalafmt-native-action/actions/workflows/ci.yml/badge.svg)](https://github.com/jrouly/scalafmt-native-action/actions/workflows/ci.yml)
[![Release status badge](https://github.com/jrouly/scalafmt-native-action/actions/workflows/release.yml/badge.svg)](https://github.com/jrouly/scalafmt-native-action/actions/workflows/release.yml)

GitHub action to run [scalafmt-native](https://scalameta.org/scalafmt).

## Usage

```yaml
- uses: actions/scalafmt-native-action@v1
  with:
    # Optional: Which version of scalafmt-native to use.
    # Default: 2.7.5
    version: '2.7.5'

    # Optional: Arguments to be passed to scalafmt-native.
    # Default: --list
    arguments: '--list'
```

#### Default usage

Without any parameters, this action will run `scalafmt-native --list`.
If any non-conforming files are presnt, this will print the list of them and exit with a failure.
Otherwise it will silently exit with success.

```yaml
- uses: actions/scalafmt-native-action@v1
```

#### OS compatibility

scalafmt-native is [not available for Windows](https://github.com/scalameta/scalafmt/issues/1569).
Can only be run on Linux and MacOS.

# scalafmt-native GitHub Action

<a href="https://github.com/jrouly/scalafmt-native-action/actions"><img alt="scalafmt-native-action status" src="https://github.com/jrouly/scalafmt-native-action/workflows/CI/badge.svg"></a>

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

#### OS compatibility

scalafmt-native is [not available for Windows](https://github.com/scalameta/scalafmt/issues/1569).
Can only be run on Linux and MacOS.

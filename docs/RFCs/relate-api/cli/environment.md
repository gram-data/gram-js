# `relate environment`

Wrapper that defines how to interact with DBMSs.

-   [`relate environment`](#relate-environment)
-   [`relate environment:add NAME PATH`](#relate-environmentadd-name-path)
-   [`relate environment:current`](#relate-environmentcurrent)
-   [`relate environment:edit-config IDENTIFIER`](#relate-environmentedit-config-identifier)
-   [`relate environment:list`](#relate-environmentlist)
-   [`relate environment:remove [IDENTIFIERS...]`](#relate-environmentremove-identifiers)
-   [`relate environment:use IDENTIFIER`](#relate-environmentuse-identifier)

## `relate environment`

Wrapper that defines how to interact with DBMSs.

```
USAGE
  $ relate environment
```

_See code: [dist/commands/environment/index.ts](dist/commands/environment/index.ts)_

## `relate environment:add NAME PATH`

Add an environment called NAME for the configuration at PATH.

```
USAGE
  $ relate environment:add NAME PATH

ARGUMENTS
  NAME
  PATH  Path or URL to the configuration file for the environment.

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ deadalus environment:add LocalEnvironment ./path/to/environment.conf
  $ deadalus environment:add SSHEnvironment https://myhosted.environment.conf
```

_See code: [dist/commands/environment/add.ts](dist/commands/environment/add.ts)_

## `relate environment:current`

Return information about the selected environment.

```
USAGE
  $ relate environment:current

OPTIONS
  -f, --format=format  Specify in which format to log the information.
  -j, --json           Log the information in JSON output.
```

_See code: [dist/commands/environment/current.ts](dist/commands/environment/current.ts)_

## `relate environment:edit-config IDENTIFIER`

Open the configuration of the specified environment in the default editor.

```
USAGE
  $ relate environment:edit-config IDENTIFIER

ARGUMENTS
  IDENTIFIER  Can be a name or ID.
```

_See code: [dist/commands/environment/edit-config.ts](dist/commands/environment/edit-config.ts)_

## `relate environment:list`

List saved environments.

```
USAGE
  $ relate environment:list

OPTIONS
  -f, --format=format  Specify in which format to log the information.
  -j, --json           Log the information in JSON output.
  --ids                Return only IDs. Useful for scripting.

ALIASES
  $ relate ls
```

_See code: [dist/commands/environment/list.ts](dist/commands/environment/list.ts)_

## `relate environment:remove [IDENTIFIERS...]`

Remove one or more environments.

```
USAGE
  $ relate environment:remove [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN

ALIASES
  $ relate rm

EXAMPLES
  relate environment:remove 4e3efc84
  relate environment:list --ids | relate environment:remove # remove all environment
  relate environment:list | fzf | awk '{print $2}' | relate environment:remove # fuzzy search by name and delete
```

_See code: [dist/commands/environment/remove.ts](dist/commands/environment/remove.ts)_

## `relate environment:use IDENTIFIER`

Set the environment in use for the current session.

```
USAGE
  $ relate environment:use IDENTIFIER

ARGUMENTS
  IDENTIFIER  Can be a name or ID.
```

_See code: [dist/commands/environment/use.ts](dist/commands/environment/use.ts)_

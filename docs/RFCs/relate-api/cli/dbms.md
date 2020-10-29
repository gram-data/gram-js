`relate dbms`
===============



* [`relate dbms`](#relate-dbms)
* [`relate dbms:clone IDENTIFIER PATH`](#relate-dbmsclone-identifier-path)
* [`relate dbms:create NAME`](#relate-dbmscreate-name)
* [`relate dbms:current`](#relate-dbmscurrent)
* [`relate dbms:delete [IDENTIFIERS...]`](#relate-dbmsdelete-identifiers)
* [`relate dbms:edit-config`](#relate-dbmsedit-config)
* [`relate dbms:list`](#relate-dbmslist)
* [`relate dbms:logs`](#relate-dbmslogs)
* [`relate dbms:new-password`](#relate-dbmsnew-password)
* [`relate dbms:start [IDENTIFIERS...]`](#relate-dbmsstart-identifiers)
* [`relate dbms:stop [IDENTIFIERS...]`](#relate-dbmsstop-identifiers)
* [`relate dbms:upgrade [IDENTIFIERS...]`](#relate-dbmsupgrade-identifiers)
* [`relate dbms:use IDENTIFIER`](#relate-dbmsuse-identifier)

## `relate dbms`

```
USAGE
  $ relate dbms
```

_See code: [dist/commands/dbms/index.ts](dist/commands/dbms/index.ts)_

## `relate dbms:clone IDENTIFIER PATH`

Clone a DBMS to the specified path.

```
USAGE
  $ relate dbms:clone IDENTIFIER PATH

ARGUMENTS
  IDENTIFIER  It can be a name or ID.
  PATH        It can be a filepath or URL.

EXAMPLES
  $ deadalus dbms:clone MyDBMS ./path/to/dbms
  $ deadalus dbms:clone MyDBMS https://myhosted.dbms
```

_See code: [dist/commands/dbms/clone.ts](dist/commands/dbms/clone.ts)_

## `relate dbms:create NAME`

Create a new DBMS.

```
USAGE
  $ relate dbms:create NAME

OPTIONS
  -s, --source=source  DBMS version, path to DBMS archive, or URL.
```

_See code: [dist/commands/dbms/create.ts](dist/commands/dbms/create.ts)_

## `relate dbms:current`

Return information about the DBMS in use.

```
USAGE
  $ relate dbms:current

OPTIONS
  -f, --format=format  Specify in which format to log the information.
  -j, --json           Log the information in JSON output.
```

_See code: [dist/commands/dbms/current.ts](dist/commands/dbms/current.ts)_

## `relate dbms:delete [IDENTIFIERS...]`

Delete one or more DBMSs.

```
USAGE
  $ relate dbms:delete [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN

ALIASES
  $ relate rm
```

_See code: [dist/commands/dbms/delete.ts](dist/commands/dbms/delete.ts)_

## `relate dbms:edit-config`

Edit the configuration for the DBMS in use.

```
USAGE
  $ relate dbms:edit-config
```

_See code: [dist/commands/dbms/edit-config.ts](dist/commands/dbms/edit-config.ts)_

## `relate dbms:list`

List available DBMSs.

```
USAGE
  $ relate dbms:list

OPTIONS
  -f, --format=format  Specify in which format to log the information.
  -j, --json           Log the information in JSON output.
  --ids                Return only IDs. Useful for scripting.

ALIASES
  $ relate ls
```

_See code: [dist/commands/dbms/list.ts](dist/commands/dbms/list.ts)_

## `relate dbms:logs`

Show logs from the DBMS in use.

```
USAGE
  $ relate dbms:logs

OPTIONS
  -F, --filter=filter
```

_See code: [dist/commands/dbms/logs.ts](dist/commands/dbms/logs.ts)_

## `relate dbms:new-password`

Change password for the DBMS in use.

```
USAGE
  $ relate dbms:new-password
```

_See code: [dist/commands/dbms/new-password.ts](dist/commands/dbms/new-password.ts)_

## `relate dbms:start [IDENTIFIERS...]`

Start one or more DBMSs.

```
USAGE
  $ relate dbms:start [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN
```

_See code: [dist/commands/dbms/start.ts](dist/commands/dbms/start.ts)_

## `relate dbms:stop [IDENTIFIERS...]`

Stop one or more DBMSs.

```
USAGE
  $ relate dbms:stop [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN
```

_See code: [dist/commands/dbms/stop.ts](dist/commands/dbms/stop.ts)_

## `relate dbms:upgrade [IDENTIFIERS...]`

Upgrade one or more DBMSs.

```
USAGE
  $ relate dbms:upgrade [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN

OPTIONS
  -s, --source=source  DBMS version, path to DBMS archive, or URL.
```

_See code: [dist/commands/dbms/upgrade.ts](dist/commands/dbms/upgrade.ts)_

## `relate dbms:use IDENTIFIER`

Select a DBMS to use.

```
USAGE
  $ relate dbms:use IDENTIFIER

ARGUMENTS
  IDENTIFIER  Identifier can be a name or ID.
```

_See code: [dist/commands/dbms/use.ts](dist/commands/dbms/use.ts)_

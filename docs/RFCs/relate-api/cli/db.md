`relate db`
=============



* [`relate db`](#relate-db)
* [`relate db:backup [IDENTIFIERS...]`](#relate-dbbackup-identifiers)
* [`relate db:copy SOURCE DESTINATION`](#relate-dbcopy-source-destination)
* [`relate db:create NAME`](#relate-dbcreate-name)
* [`relate db:drop [IDENTIFIERS...]`](#relate-dbdrop-identifiers)
* [`relate db:exec IDENTIFIER [QUERY]`](#relate-dbexec-identifier-query)
* [`relate db:list`](#relate-dblist)
* [`relate db:list-backups [SOURCE]`](#relate-dblist-backups-source)
* [`relate db:restore SOURCE DESTINATION`](#relate-dbrestore-source-destination)
* [`relate db:start [IDENTIFIERS...]`](#relate-dbstart-identifiers)
* [`relate db:stop [IDENTIFIERS...]`](#relate-dbstop-identifiers)
* [`relate db:truncate [IDENTIFIERS...]`](#relate-dbtruncate-identifiers)

## `relate db`

```
USAGE
  $ relate db
```

_See code: [dist/commands/db/index.ts](dist/commands/db/index.ts)_

## `relate db:backup [IDENTIFIERS...]`

Backup one or more DBs.

```
USAGE
  $ relate db:backup [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN

OPTIONS
  -t, --target=target  Directory to store backups. Can be a path or URL.
```

_See code: [dist/commands/db/backup.ts](dist/commands/db/backup.ts)_

## `relate db:copy SOURCE DESTINATION`

Copy a database.

```
USAGE
  $ relate db:copy SOURCE DESTINATION

ARGUMENTS
  SOURCE       Name or ID of the database to copy from.
  DESTINATION  Name or ID of the destination database.
```

_See code: [dist/commands/db/copy.ts](dist/commands/db/copy.ts)_

## `relate db:create NAME`

Create a DB within the DBMS in use.

```
USAGE
  $ relate db:create NAME
```

_See code: [dist/commands/db/create.ts](dist/commands/db/create.ts)_

## `relate db:drop [IDENTIFIERS...]`

```
USAGE
  $ relate db:drop [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN
```

_See code: [dist/commands/db/drop.ts](dist/commands/db/drop.ts)_

## `relate db:exec IDENTIFIER [QUERY]`

Executes Cypher on a selected database.

```
USAGE
  $ relate db:exec IDENTIFIER [QUERY]

ARGUMENTS
  IDENTIFIER  Can be a name or ID.
  QUERY       The Cypher query can also be passed via STDIN.

OPTIONS
  -f, --file=file  File path to be executed.

EXAMPLE
```

_See code: [dist/commands/db/exec.ts](dist/commands/db/exec.ts)_

## `relate db:list`

List all available databases.

```
USAGE
  $ relate db:list

OPTIONS
  -f, --format=format  Specify in which format to log the information.
  -j, --json           Log the information in JSON output.
  --ids                Return only IDs. Useful for scripting.

ALIASES
  $ relate ls
```

_See code: [dist/commands/db/list.ts](dist/commands/db/list.ts)_

## `relate db:list-backups [SOURCE]`

```
USAGE
  $ relate db:list-backups [SOURCE]

ARGUMENTS
  SOURCE  Can be a path or url.

OPTIONS
  -f, --format=format  Specify in which format to log the information.
  -j, --json           Log the information in JSON output.
  --ids                Return only IDs. Useful for scripting.
```

_See code: [dist/commands/db/list-backups.ts](dist/commands/db/list-backups.ts)_

## `relate db:restore SOURCE DESTINATION`

```
USAGE
  $ relate db:restore SOURCE DESTINATION

ARGUMENTS
  SOURCE       Can be a path, url, or name
  DESTINATION  Name of the destination database.
```

_See code: [dist/commands/db/restore.ts](dist/commands/db/restore.ts)_

## `relate db:start [IDENTIFIERS...]`

Start or stop one or more databases.

```
USAGE
  $ relate db:start [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN
```

_See code: [dist/commands/db/start.ts](dist/commands/db/start.ts)_

## `relate db:stop [IDENTIFIERS...]`

Stop one or more databases.

```
USAGE
  $ relate db:stop [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN
```

_See code: [dist/commands/db/stop.ts](dist/commands/db/stop.ts)_

## `relate db:truncate [IDENTIFIERS...]`

Truncate one or more databases.

```
USAGE
  $ relate db:truncate [IDENTIFIERS...]

ARGUMENTS
  IDENTIFIERS...  Identifiers can be names or IDs. If omitted they will be retrieved via STDIN
```

_See code: [dist/commands/db/truncate.ts](dist/commands/db/truncate.ts)_

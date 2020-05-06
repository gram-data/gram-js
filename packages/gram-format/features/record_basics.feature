Feature: Records store content attached to either nodes or relationships.

  Nodes are anchor points.
  Relationships connect nodes to create structure.
  
  In order to store information in a graph
  As a data expert
  I want to attach data records to nodes and relationships.

  Scenario Outline: a record attached to a node
    Given a gram written as <gram>
    Then the node should have a property named "<name>" of type "<type>"

    Examples:
      | gram                  | name | type        |
      |'({k:"A"})'            |    k | string      |
      |'({k:"aye",b:"bee"})'  |    k | string      |
      |'({k:true})'           |    k | boolean     |
      |'({k:false})'          |    k | boolean     |
      |'({k:TRUE})'           |    k | boolean     |
      |'({k:FALSE})'          |    k | boolean     |
      |'({k:1})'              |    k | integer     |
      |'({k:1.0})'            |    k | decimal     |
      |'({k:1.0e1})'          |    k | decimal     |
      |'({k:0xc0d3})'         |    k | hexadecimal |
      |'({k:01372})'          |    k | octal       |


  Scenario Outline: a record attached to a relationship
    Given a gram written as <gram>
    Then the relationship should have a property named "<name>" of type "<type>"

    Examples:
      | gram                        | name | type        |
      |'()-[{k:"A"}]-()'            |    k | string      |
      |'()-[{k:"aye",b:"bee"}]-()'  |    k | string      |
      |'()-[{k:true}]-()'           |    k | boolean     |
      |'()-[{k:false}]-()'          |    k | boolean     |
      |'()-[{k:1}]-()'              |    k | integer     |
      |'()-[{k:1.0}]-()'            |    k | decimal     |
      |'()-[{k:1.0e1}]-()'          |    k | decimal     |
      |'()-[{k:0xc0d3}]-()'         |    k | hexadecimal |
      |'()-[{k:01372}]-()'          |    k | octal       |





  Scenario Outline: string literals
    Given a gram written as <gram>
    Then the node should have a property named "<name>" of type "<type>"

    Examples:
      | gram                      | name | type        |
      |'({a:"double quoted"})'    |    a | string      |
      |"({a:'single quoted'})"    |    a | string      |
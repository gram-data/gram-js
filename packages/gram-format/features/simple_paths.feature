Feature: Nodes and relationships form paths.

  Nodes are anchor points.
  Relationships connect nodes to create structure.
  
  In order to define a simple graph
  As a data expert
  I want to start by specifying nodes

  Scenario: a single node
    Given a gram written as '()'
    Then the path should contain 1 node

  Scenario: nodes with arbitrary whitespace
    Given a gram written as
      """
      ()
      ( )
      ()  ()
      """
    Then the stream should contain 4 paths 
    And the paths should contain 4 nodes

  Scenario: pair nodes with a relationship
    Given a gram written as
      """
      ()--()
      ()-->()
      ()<--()
      ()-->() ()--() ()<--()
      """
    Then the stream should contain 6 paths 
    And the paths should contain 12 nodes
    And the paths should contain 6 relationships

  Scenario: relationships with empty records
    Given a gram written as
      """
      ()-[]-()
      ()-[]->()
      ()<-[]-()
      ()-[]->() ()-[]-() ()<-[]-()
      """
    Then the stream should contain 6 paths 
    And the paths should contain 12 nodes
    And the paths should contain 6 relationships
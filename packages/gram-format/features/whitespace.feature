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
      (1:Person  { name: 'Lukas Legros', email: 'Hester18@gmail.com'})
      (2:Person  { name: "Lukas Legros", email: "Hester18@gmail.com"})
      """
    Then the stream should contain 2 paths
    And the paths should contain 2 nodes


Feature: Identified nodes and relationships. 
  
  In order to form a graph, multiple relationships can connect to the same node.
  As a data expert
  I want to refer to a previous node when specifying a new relationship

  Scenario: a single identified node
    Given a gram written as '(a)'
    Then the path should contain 1 node

  Scenario: Identified nodes
    Given a gram written as
      """
      ()
      (a)
      (_1)
      (a1)  (b2)
      (`spaces & punctuation ^.! isolated by backticks`)
      (`'single quotes' "double quotes"`)
      """
    Then the stream should contain 7 paths 
    And the paths should contain 7 nodes
    And the nodes should have 6 identifiers

  Scenario: Identified nodes with a relationship
    Given a gram written as
      """
      (a)--()
      ()--(b)
      (a)--(b)
      (_1)-->()
      ()-->(_2)
      (_1)-->(_2)
      (a1)<--()
      ()<--(b2)
      (a1)<--(b2)
      """
    Then the stream should contain 9 paths 
    And the paths should contain 18 nodes
    And the paths should contain 9 relationships
    And the nodes should have 6 identifiers

  Scenario: Identified relationships
    Given a gram written as
      """
      ()-[]-()
      ()-[a]-()
      ()-[_1]->()
      ()<-[a1]-()
      """
    Then the stream should contain 4 paths 
    And the paths should contain 8 nodes
    And the paths should contain 4 relationships
    And the relationships should have 3 identifiers

  Scenario: Identified nodes and relationships
    Given a gram written as
      """
      ()-[]-()
      (a)-[_1]-(b)
      (c)-[_2]->(d)
      (e)<-[_3]-(f)
      """
    Then the stream should contain 4 paths 
    And the paths should contain 8 nodes
    And the paths should contain 4 relationships
    And the nodes should have 6 identifiers
    And the relationships should have 3 identifiers

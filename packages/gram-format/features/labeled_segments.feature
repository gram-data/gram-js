Feature: Labels on nodes and relationships. 
  
  Scenario: a single labeled node
    Given a gram written as '(a:Aye)'
    Then the path should contain 1 node
    And the nodes should have 1 label

  Scenario: Labeled nodes
    Given a gram written as
      """
      ()
      (a:Aye)
      (a1:Aye:Won)
      (a :Aye)
      (:Unidentified)
      """
    Then the stream should contain 5 paths 
    And the paths should contain 5 nodes
    And the nodes should have 2 identifiers
    And the nodes should have 3 labels

  Scenario: Labeled nodes with a relationship
    Given a gram written as
      """
      (a:Aye)--()
      ()--(b:Bee)
      (:Aye)--(:Bee)
      (_1:Won)-->()
      ()-->(_2:Too)
      (:Won)-->(:Too)
      (a:Aye)<--()
      ()<--(b:Bee)
      (:Aye)<--(:Bee)
      """
    Then the stream should contain 9 paths 
    And the paths should contain 18 nodes
    And the paths should contain 9 relationships
    And the nodes should have 4 identifiers
    And the nodes should have 4 labels

  Scenario: Labeled relationships
    Given a gram written as
      """
      ()-[]-()
      ()-[a:AYE]-()
      ()-[:AYE:BEE]-()
      ()-[a :AYE]-()
      ()-[_1:Won]->()
      ()-[_12:Won:Too]->()
      ()<-[b:Bee]-()
      ()<-[bc:Bee:See]-()
      """
    Then the stream should contain 8 paths 
    And the paths should contain 16 nodes
    And the paths should contain 8 relationships
    And the relationships should have 5 identifiers
    And the relationships should have 6 labels

  Scenario: Labeled nodes and relationships
    Given a gram written as
      """
      (:Aye)-[:TO]-(:Bee)
      """
    Then the stream should contain 1 path
    And the paths should contain 2 nodes
    And the paths should contain 1 relationships
    And the nodes should have 0 identifiers
    And the nodes should have 2 labels
    And the relationships should have 0 identifiers
    And the relationships should have 1 label

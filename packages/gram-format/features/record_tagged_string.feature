Feature: Tagged strings indicate content type.

  Nodes are anchor points.
  Relationships connect nodes to create structure.
  
  In order to store information in a graph
  As a data expert
  I want to attach data records to nodes and relationships.

  Scenario Outline: ISO 8601 compatible https://en.wikipedia.org/wiki/ISO_8601
    Given a gram written as <gram>
    When the first node is examined
    Then property "<name>" is tagged as a "<tag>"
    And property "<name>" has the value "<value>"

    Examples:
      | gram                                | name         | tag  | value       | format     |
      | '({year:date`1972`})'               | year         | date  | 1972       | YYYY       |
      | '({yearMonth:date`2020-01`})'       | yearMonth    | date | 2020-01     | YYYY-MM    |
      | '({yearMonthDay:date`2020-01-01`})' | yearMonthDay | date | 2020-01-01  | YYYY-MM-DD |
      | '({yearMonthDay:date`20200101`})'   | yearMonthDay | date | 20200101    | YYYYMMDD   |
      | '({monthDay:date`--12-30`})'        | monthDay     | date | --12-30     | --MM-DD    | 
      | '({monthDay:date`--1230`})'         | monthDay     | date | --1230      | --MMDD     | 
      | '({weekDate:date`2020-W10`})'       | weekDate     | date | 2020-W10    | YYYY-Www   |
      | '({weekDate:date`2020W10`})'        | weekDate     | date | 2020W10     | YYYYWww    |
      | '({weekDate:date`2020-W10-3`})'     | weekDate     | date | 2020-W10-3  | YYYY-Www-D |
      | '({weekDate:date`2020W103`})'       | weekDate     | date | 2020W103    | YYYYWwwD   |
      | '({ordinalDate:date`2020-001`})'    | ordinalDate  | date | 2020-001    | YYYY-DDD   |
      | '({ordinalDate:date`2020001`})'     | ordinalDate  | date | 2020001     | YYYYDDD    |

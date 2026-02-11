Feature: Borrowing Calculator
  As a user
  I want to calculate my borrowing power
  So that I can understand how much I can borrow

  Background:
    Given I navigate to the borrowing calculator page

  Scenario: Calculate borrowing estimate for a single person with specific financial details
    When I select "Single" as application type
    And I enter "0" dependants
    And I select "Home to live in" as property type
    And I enter "$100,000" as income
    And I enter "$10,000" as other income
    And I enter "$2,000" as living expenses
    And I enter "$0" as current home loan repayments
    And I enter "$100" as other loan repayments
    And I enter "$0" as other commitments
    And I enter "$10,000" as total credit card limit
    And I click the calculate button
    Then I should see the borrowing estimate of "$530,000"

  Scenario: Clear form using start over button
    When I select "Joint" as application type
    And I enter "3" dependants
    And I select "Residential investment" as property type
    And I enter "$100,000" as income
    And I enter "$10,000" as other income
    And I enter "$2,000" as living expenses
    And I enter "$500" as current home loan repayments
    And I enter "$100" as other loan repayments
    And I enter "$200" as other commitments
    And I enter "$10,000" as total credit card limit
    And I click the start over button
    Then all form fields should be cleared

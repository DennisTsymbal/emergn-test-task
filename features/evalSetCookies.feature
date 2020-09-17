Feature: To Set Cookies 
@SetCookiesScenario
Scenario: Set and Delete Cookies
Given A set of three cookies
When Making a GET call that appends cookies
When One Cookie is deleted
Then Two Cookies left
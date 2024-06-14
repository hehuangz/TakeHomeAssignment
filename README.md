# Ranking Nurses

This module provides functionality to rank nurses based on various factors such as years of experience, location, acceptance rate, cancellation rate, and reply time.

## Getting Started

```bash
# install all packages
npm i
# to start
npm run dev
# to build
npm run build
# try this demo
npm run demo
# test
npm run test
```

## Functions

### parseNurses

This function parses the raw nurse data, cleans it, and returns an array of `Nurse` objects.

### calculateScore

This function calculates a score for each nurse based on their attributes and the facility location.

### getRankingNurses

This function ranks the nurses based on their scores and returns an array of `Nurse` objects in descending order of their scores.


# Kuzushi Technical Interview

## Problem Definition

A busy hospital has a list of nurses waiting to be assigned to a doctor. The list is created sequentially (e.g., nurses are added in a FIFO order) from the time they are available. Once there is a requirement, the front desk calls each nurse to offer the assignment in the order they were added to the list. The scheduler has noticed that she wastes a lot of time trying to find a nurse from the list since they're often not available, don't pick up the phone, etc. She would like to generate a better list that will increase her chances of finding a nurse in the first few calls.

## Interview Task

Given nurse demographics and behavioral data (see sample-data/clinician.json), create an algorithm that will process a set of historical nurse data and compute a score for each nurse (1 as the lowest, 10 as the highest) that represents the chance of a nurse accepting the assignment offer. Consider that nurses who have little behavior data should be randomly added to the top list to give them a chance to be selected. Additionally, be aware that the data may contain irregularities such as non-numeric age values (e.g., "five" instead of 5), null values, and other anomalies. Your solution should robustly handle these edge cases. Expose an API that takes a facility's location as input and returns an ordered list of 10 nurses who will most likely accept the assignment offer.

## Weighting Categories

Demographic

- year of experience  (weighted 10%)
- distance to practice (weighted 10%)

Behavior

- number of accepted offers (weighted 30%)
- number of cancelled offers (weighted 30%)
- reply time (how long it took for nurses to reply) (weighted 20%)

## Nurse Model

- ID

- Year of Experience (in years)

- location
  - Lat
  - long
  
- acceptedOffers (integer)

- canceledOffers (integer)

  averageReplyTime (integer, in seconds)

## Libraries Allowed

Anything else outside of the ones listed above is not allowed.

- Any testing libraries
- Libraries to compare the distances between coordinates
- Any JSON / file parising libraries

## Deliverables

The code should be written in **TypeScript** as **a Node.js library** that anyone can import and use. It should contain documentation and unit tests that demonstrate your understanding of the problem and your ability to handle data irregularities effectively. Adequate testing is crucial to ensure the robustness of your solution against data anomalies.
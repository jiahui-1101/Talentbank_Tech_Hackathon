const employees2 = [
  {
    "id": "emp_004",
    "name": "Tan Mei Ling",
    "role": "UX Designer",
    "department": "Design",
    "level": "Mid",
    "joinDate": "2021-11-08",
    "salary": "Band 3",
    "promotionLastDate": "2022-10-10",
    "riskScore": 76,
    "riskLevel": "High",
    "riskDrivers": [
      {
        "label": "Repeated late-stage design changes",
        "detail": "Three releases required major rework after sign-off."
      },
      {
        "label": "Limited portfolio visibility",
        "detail": "Design impact is not being presented in business reviews."
      },
      {
        "label": "Mentorship gap",
        "detail": "No senior design mentor assigned since team restructure."
      }
    ],
    "trajectory": "At risk of disengaging from product teams if her design authority remains inconsistent.",
    "suggestedActions": [
      "Create design sign-off guardrails",
      "Pair with principal designer for mentoring",
      "Showcase her workflow improvements at review"
    ],
    "activeProjects": 3,
    "completionRate": 81,
    "recognitionCount": 2,
    "managerComment": "Mei Ling is still thoughtful and collaborative, but the rework cycles are wearing her down. She needs stronger process backing, not just encouragement."
  },
  {
    "id": "emp_005",
    "name": "Muhammad Hafiz",
    "role": "Growth Marketing Manager",
    "department": "Marketing",
    "level": "Senior",
    "joinDate": "2020-06-01",
    "salary": "Band 4",
    "promotionLastDate": "2022-04-01",
    "riskScore": 79,
    "riskLevel": "High",
    "riskDrivers": [
      {
        "label": "Campaign ownership expanded",
        "detail": "Now covers acquisition, lifecycle, and analytics without added headcount."
      },
      {
        "label": "Recognition dropped 50% last quarter",
        "detail": "High-performing campaigns received limited leadership visibility."
      },
      {
        "label": "No career conversation in 7 months",
        "detail": "Last development discussion was postponed twice."
      }
    ],
    "trajectory": "Likely to seek a broader growth role elsewhere if ownership remains high but influence stays flat.",
    "suggestedActions": [
      "Schedule career discussion this week",
      "Assign analytics support for campaign reporting",
      "Nominate him for leadership demo"
    ],
    "activeProjects": 5,
    "completionRate": 86,
    "recognitionCount": 3,
    "managerComment": "Hafiz is proud of the numbers, but he is questioning whether the organization sees the strategic work behind them. A timely conversation would matter."
  },
  {
    "id": "emp_006",
    "name": "Siti Nur Azman",
    "role": "Operations Lead",
    "department": "Operations",
    "level": "Senior",
    "joinDate": "2018-02-12",
    "salary": "Band 4",
    "promotionLastDate": "2021-08-01",
    "riskScore": 86,
    "riskLevel": "High",
    "riskDrivers": [
      {
        "label": "Process escalations up 30%",
        "detail": "Cross-functional escalations have landed with her by default."
      },
      {
        "label": "Promotion delayed 20 months",
        "detail": "Leadership scope has grown without updated level review."
      },
      {
        "label": "Backup coverage missing",
        "detail": "No named delegate for vendor and compliance workflows."
      }
    ],
    "trajectory": "At risk of burnout within the next quarter if operational escalation paths do not change.",
    "suggestedActions": [
      "Name a deputy for weekly escalations",
      "Begin principal operations calibration",
      "Create vendor coverage rotation"
    ],
    "activeProjects": 6,
    "completionRate": 92,
    "recognitionCount": 5,
    "managerComment": "Siti is the person everyone trusts when things are messy, which is exactly the problem. She needs structural support before reliability becomes exhaustion."
  }
]

export default employees2

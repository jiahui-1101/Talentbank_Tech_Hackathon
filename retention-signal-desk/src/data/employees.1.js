const employees1 = [
  {
    "id": "emp_001",
    "name": "Aina Rahman",
    "role": "Frontend Engineer",
    "department": "Engineering",
    "level": "Senior",
    "joinDate": "2020-03-16",
    "salary": "Band 4",
    "promotionLastDate": "2022-11-01",
    "riskScore": 91,
    "riskLevel": "High",
    "riskDrivers": [
      {
        "label": "Promotion delayed 16 months",
        "detail": "Scope has grown beyond current title without a clear review date."
      },
      {
        "label": "Carrying 2 additional project loads",
        "detail": "Supporting mobile web and design system delivery in parallel."
      },
      {
        "label": "Recognition dropped 45% last quarter",
        "detail": "Peer feedback volume fell despite high delivery impact."
      }
    ],
    "trajectory": "Likely to begin external job search within 60 days if workload continues without advancement clarity.",
    "suggestedActions": [
      "Schedule promotion calibration this month",
      "Remove one secondary project from her queue",
      "Arrange skip-level career conversation"
    ],
    "activeProjects": 5,
    "completionRate": 88,
    "recognitionCount": 2,
    "managerComment": "Aina is still delivering excellent work, but her energy has changed in planning meetings. She needs a credible path forward and visible relief on workload."
  },
  {
    "id": "emp_002",
    "name": "Lim Wei Jie",
    "role": "Backend Engineer",
    "department": "Engineering",
    "level": "Mid",
    "joinDate": "2021-07-05",
    "salary": "Band 3",
    "promotionLastDate": "2023-01-15",
    "riskScore": 82,
    "riskLevel": "High",
    "riskDrivers": [
      {
        "label": "On-call load increased 35%",
        "detail": "Incident ownership has concentrated on him for two quarters."
      },
      {
        "label": "No skip-level conversation in 9 months",
        "detail": "Career concerns have not been surfaced beyond direct manager."
      },
      {
        "label": "Compensation band unchanged",
        "detail": "Current responsibilities now resemble senior backend ownership."
      }
    ],
    "trajectory": "At risk of quiet disengagement over the next quarter if incident load is not redistributed.",
    "suggestedActions": [
      "Rotate incident ownership across the backend team",
      "Discuss senior engineer readiness criteria",
      "Offer recovery time after release freeze"
    ],
    "activeProjects": 4,
    "completionRate": 84,
    "recognitionCount": 3,
    "managerComment": "Wei Jie has been dependable under pressure, but he is starting to sound tired rather than challenged. I want to keep him close before frustration becomes resignation."
  },
  {
    "id": "emp_003",
    "name": "Priya Nair",
    "role": "Product Manager",
    "department": "Product",
    "level": "Senior",
    "joinDate": "2019-09-23",
    "salary": "Band 5",
    "promotionLastDate": "2021-12-01",
    "riskScore": 88,
    "riskLevel": "High",
    "riskDrivers": [
      {
        "label": "Promotion delayed 18 months",
        "detail": "Expanded portfolio has not been matched with role progression."
      },
      {
        "label": "Decision fatigue reported",
        "detail": "Owns roadmap trade-offs across three stakeholder groups."
      },
      {
        "label": "Recognition dropped 40% last quarter",
        "detail": "Recent launches were attributed broadly without naming her leadership."
      }
    ],
    "trajectory": "Likely to explore director-track roles externally if portfolio ownership remains ambiguous.",
    "suggestedActions": [
      "Clarify product leadership path",
      "Assign one portfolio deputy",
      "Publicly recognize recent launch leadership"
    ],
    "activeProjects": 6,
    "completionRate": 90,
    "recognitionCount": 4,
    "managerComment": "Priya is highly respected but increasingly direct about the limits of her current role. She needs senior sponsorship and a cleaner mandate."
  }
]

export default employees1

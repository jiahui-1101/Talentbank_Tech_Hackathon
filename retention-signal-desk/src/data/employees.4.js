const employees4 = [
  {
    "id": "emp_010",
    "name": "Goh Jun Hao",
    "role": "DevOps Engineer",
    "department": "Engineering",
    "level": "Senior",
    "joinDate": "2020-10-12",
    "salary": "Band 4",
    "promotionLastDate": "2022-08-15",
    "riskScore": 71,
    "riskLevel": "Medium",
    "riskDrivers": [
      {
        "label": "Incident follow-ups stacking",
        "detail": "Postmortem actions remain assigned to him across multiple services."
      },
      {
        "label": "Training budget unused",
        "detail": "Cloud certification plan has been deferred twice."
      },
      {
        "label": "Weekend maintenance frequency high",
        "detail": "Recent infrastructure windows have affected personal time."
      }
    ],
    "trajectory": "Could drift into burnout if maintenance ownership is not planned more predictably.",
    "suggestedActions": [
      "Create shared postmortem action roster",
      "Approve cloud certification time",
      "Plan maintenance windows one quarter ahead"
    ],
    "activeProjects": 4,
    "completionRate": 85,
    "recognitionCount": 5,
    "managerComment": "Jun Hao remains engaged when solving hard problems, but he is tired of being the default fixer. Predictability would help him feel more in control."
  },
  {
    "id": "emp_011",
    "name": "Nadia Ismail",
    "role": "Associate Product Manager",
    "department": "Product",
    "level": "Junior",
    "joinDate": "2023-04-03",
    "salary": "Band 2",
    "promotionLastDate": "2023-04-03",
    "riskScore": 58,
    "riskLevel": "Medium",
    "riskDrivers": [
      {
        "label": "Ambiguous ownership",
        "detail": "She supports two roadmaps but does not own a clear product area."
      },
      {
        "label": "Feedback cycles inconsistent",
        "detail": "Written feedback has been delayed for three sprints."
      },
      {
        "label": "Stakeholder exposure limited",
        "detail": "Most executive updates are handled by senior PMs."
      }
    ],
    "trajectory": "At risk of plateauing if she does not receive a defined ownership lane this quarter.",
    "suggestedActions": [
      "Assign one measurable product area",
      "Set biweekly written feedback rhythm",
      "Invite her to next stakeholder review"
    ],
    "activeProjects": 2,
    "completionRate": 78,
    "recognitionCount": 3,
    "managerComment": "Nadia is capable and eager, but she needs clearer lanes to build confidence. With structure, I expect her engagement to rise quickly."
  },
  {
    "id": "emp_012",
    "name": "Kavitha Subramaniam",
    "role": "Product Operations Specialist",
    "department": "Product",
    "level": "Mid",
    "joinDate": "2021-08-16",
    "salary": "Band 3",
    "promotionLastDate": "2022-12-01",
    "riskScore": 64,
    "riskLevel": "Medium",
    "riskDrivers": [
      {
        "label": "Tool migration workload high",
        "detail": "Owns migration support while maintaining normal reporting cycles."
      },
      {
        "label": "Low strategic visibility",
        "detail": "Operational improvements are not regularly tied to product outcomes."
      },
      {
        "label": "Cross-team requests rising",
        "detail": "Ad hoc reporting requests increased over the last month."
      }
    ],
    "trajectory": "May disengage from improvement work if her role remains treated as support only.",
    "suggestedActions": [
      "Prioritize migration work against ad hoc reporting",
      "Showcase operational metrics in product forum",
      "Discuss senior specialist path"
    ],
    "activeProjects": 4,
    "completionRate": 82,
    "recognitionCount": 4,
    "managerComment": "Kavitha is steady and helpful, but that helpfulness is creating overload. She needs permission to say no to lower-value requests."
  }
]

export default employees4

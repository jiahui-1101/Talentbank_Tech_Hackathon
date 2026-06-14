const employees6 = [
  {
    "id": "emp_016",
    "name": "Melissa Wong",
    "role": "People Operations Partner",
    "department": "Operations",
    "level": "Mid",
    "joinDate": "2021-12-13",
    "salary": "Band 3",
    "promotionLastDate": "2022-12-15",
    "riskScore": 55,
    "riskLevel": "Medium",
    "riskDrivers": [
      {
        "label": "Case volume up 25%",
        "detail": "Employee relations and onboarding requests have both increased."
      },
      {
        "label": "Emotional labor high",
        "detail": "Recent cases required sustained sensitive support."
      },
      {
        "label": "Limited recovery time",
        "detail": "Back-to-back onboarding cycles left little space for planning."
      }
    ],
    "trajectory": "At risk of fatigue if people support work remains intense without planned decompression.",
    "suggestedActions": [
      "Create case triage support rotation",
      "Block planning time after onboarding cycles",
      "Offer external coaching supervision"
    ],
    "activeProjects": 3,
    "completionRate": 86,
    "recognitionCount": 5,
    "managerComment": "Melissa is empathetic and trusted, but the work has been emotionally heavy. She needs practical support, not just thanks."
  },
  {
    "id": "emp_017",
    "name": "Syafiq Hamdan",
    "role": "Business Operations Analyst",
    "department": "Operations",
    "level": "Junior",
    "joinDate": "2023-01-09",
    "salary": "Band 2",
    "promotionLastDate": "2023-01-09",
    "riskScore": 43,
    "riskLevel": "Low",
    "riskDrivers": [
      {
        "label": "Role scope shifting",
        "detail": "Now supports finance, sales, and operations dashboards."
      },
      {
        "label": "Manager time limited",
        "detail": "Several 1:1s were shortened during quarter close."
      },
      {
        "label": "Learning goals undefined",
        "detail": "No formal analytics growth plan is documented."
      }
    ],
    "trajectory": "Likely to stay engaged if his learning path is made more deliberate this quarter.",
    "suggestedActions": [
      "Define analytics skill roadmap",
      "Protect weekly 1:1 time",
      "Prioritize dashboard backlog by business value"
    ],
    "activeProjects": 3,
    "completionRate": 76,
    "recognitionCount": 2,
    "managerComment": "Syafiq is promising and asks good questions. He needs more structure so the broad exposure feels developmental rather than scattered."
  },
  {
    "id": "emp_018",
    "name": "Vikram Menon",
    "role": "Solutions Engineer",
    "department": "Engineering",
    "level": "Senior",
    "joinDate": "2019-11-18",
    "salary": "Band 4",
    "promotionLastDate": "2022-03-01",
    "riskScore": 73,
    "riskLevel": "Medium",
    "riskDrivers": [
      {
        "label": "Customer escalations concentrated",
        "detail": "Complex integrations are repeatedly assigned to him."
      },
      {
        "label": "Travel fatigue noted",
        "detail": "Recent regional customer visits compressed delivery time."
      },
      {
        "label": "Technical growth unclear",
        "detail": "He wants deeper architecture work beyond presales support."
      }
    ],
    "trajectory": "At risk of seeking platform engineering roles if technical growth remains secondary to escalations.",
    "suggestedActions": [
      "Create escalation rotation",
      "Assign architecture RFC ownership",
      "Reduce travel load next month"
    ],
    "activeProjects": 5,
    "completionRate": 87,
    "recognitionCount": 6,
    "managerComment": "Vikram is excellent with customers, but that strength is boxing him in. He needs a visible technical path inside the company."
  }
]

export default employees6

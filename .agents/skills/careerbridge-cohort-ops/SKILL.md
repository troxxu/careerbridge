---
name: careerbridge-cohort-ops
description: >-
  Specialized skill for managing the 4-week Career Bridge cohort lifecycle, session scheduling, mentor-mentee interaction protocols, attendance verification, post-session feedback rubrics, and the 90-Day Career Action Plan workflow. Use this skill when building scheduling features, attendance systems, notification triggers, or cohort management tools.
---

# Career Bridge Cohort Operations & Delivery Skill

This skill outlines the operational logic, milestone requirements, and session management protocols for running the 4-week **Career Bridge** cohort.

---

## 1. 4-Week Cohort Curriculum & Milestone Roadmap

Every cohort follows an intensive 4-week structure designed to turn abstract career anxiety into concrete professional readiness:

| Week | Theme | Core Activity | Mandatory Student Deliverable | Operational Gate |
| :--- | :--- | :--- | :--- | :--- |
| **Week 1** | **Career Diagnostic & Goal Setting** | Onboarding session, baseline diagnostic assessment, personal goal statement. | Baseline CRS Score & Career Goal Form | 100% Pre-test completed |
| **Week 2** | **Industry Pathway & Skill Gap** | Industry insight panel, competency mapping, gap analysis vs target job description. | Target Role Matrix & Skill-Gap Roadmap | Mentee small groups confirmed |
| **Week 3** | **Strategic Career Preparation** | ATS CV workshop, LinkedIn profile optimization, STAR method interview practice. | Revised ATS CV & Polished LinkedIn URL | Mentor review assigned |
| **Week 4** | **Small-Group Mentoring & Action Plan** | 60-min group coaching with assigned mentor (4-5 students), mock review, feedback. | Signed 90-Day Action Plan & Post-Test CRS | Completion Certificate issued if attendance $\ge 80\%$ |

---

## 2. Scheduling & Notification Workflow

To prevent high cancellation and no-show rates (operational feasibility risk identified in the Business Plan):

1. **Automated Reminder Triggers**:
   - **H-3 (72 hours prior)**: Calendar invite confirmation & preparation brief to mentor and mentees.
   - **H-1 (24 hours prior)**: Reminder email & WhatsApp link with agenda and review materials (mentee CV link).
   - **H-3h (3 hours prior)**: Direct meeting link (Google Meet / Zoom) sent via email/push.
2. **Reschedule Window**:
   - Mentors can request rescheduling up to **H-24** without penalty.
   - If mentor cancels under H-24, automatic routing triggers the *Backup Mentor Protocol* from the available mentor pool.
3. **Attendance Verification**:
   - Students must check in via the portal or mentor marks attendance at the start of the session.
   - Minimum attendance threshold for certificate: **$\ge 80\%$**.

---

## 3. Post-Session Feedback & Quality Rubric

Immediately after each small-group mentoring session in Week 4, both sides complete a 2-minute structured evaluation:

### Mentor Rubric (Mentee Evaluation):
- **Preparation & Punctuality** (Scale 1-5)
- **Clarity of Career Objective** (Scale 1-5)
- **Quality of Draft CV / Questions** (Scale 1-5)
- **Constructive Qualitative Feedback** (Text: 1 strength, 1 critical improvement area)

### Mentee Rubric (Mentor & Session Rating):
- **Session Relevance to Target Industry** (Scale 1-5, target $\ge 85\%$ rating)
- **Actionability of Advice Given** (Scale 1-5)
- **Mentor Willingness to Support** (Scale 1-5)

---

## 4. 90-Day Career Action Plan Schema

The final tangible outcome of the cohort is the **90-Day Career Action Plan**. It is split into 3 actionable horizons:

```typescript
export interface NinetyDayActionPlan {
  studentId: string;
  cohortId: string;
  mentorId: string;
  milestoneDay30: {
    target: string; // e.g., 'Selesaikan 1 sertifikasi teknis PLC & finalisasi CV ATS'
    actionItems: string[];
    isCompleted: boolean;
  };
  milestoneDay60: {
    target: string; // e.g., 'Bangun 15 koneksi alumni di industri energi & ikuti 1 project competition'
    actionItems: string[];
    isCompleted: boolean;
  };
  milestoneDay90: {
    target: string; // e.g., 'Kirim aplikasi magang terkurasi ke 5 target company dengan portfolio terlampir'
    actionItems: string[];
    isCompleted: boolean;
  };
  mentorSignoffNotes?: string;
  status: 'draft' | 'submitted' | 'approved_by_mentor';
}
```

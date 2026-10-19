---
name: careerbridge-matching-engine
description: >-
  Specialized skill for implementing, tuning, and testing the Career Bridge rule-based professional matching algorithm (M = 0.30I + 0.25F + 0.20G + 0.15A + 0.10P) and small-group cohort allocation (4-5 students per mentor). Use this skill whenever building or refining matching logic, grouping algorithms, or match quality metrics.
---

# Career Bridge Matching Engine Skill

This skill defines the proprietary rule-based matching mechanism used by Career Bridge to pair students with compatible industry mentors and assemble balanced cohort small-groups.

---

## 1. Mathematical Formulation

The matching compatibility score ($M$) between a Student ($S$) and a Mentor ($P$) is bounded between $0.00$ and $1.00$:

$$M = 0.30 \cdot I + 0.25 \cdot F + 0.20 \cdot G + 0.15 \cdot A + 0.10 \cdot P$$

### Parameter Definitions & Scoring Rules:

| Symbol | Parameter | Weight | Description & Scoring Logic |
| :--- | :--- | :--- | :--- |
| **$I$** | **Industry Alignment** | **30% (0.30)** | `1.0` if exact domain match (e.g., both Oil & Gas / Energy transition); `0.6` if adjacent engineering domain (e.g., EPC, Electrical Power); `0.2` if broad tech/general industry. |
| **$F$** | **Job Function Match** | **25% (0.25)** | `1.0` if identical target function (e.g., Electrical Engineer to Electrical Engineer); `0.5` if cross-functional technical role (e.g., Instrumentation to Automation); `0.1` otherwise. |
| **$G$** | **Career Goal Stage** | **20% (0.20)** | `1.0` if mentor's experience matches student's immediate milestone (e.g., Intern/Junior role transition vs graduate study vs MT program); `0.5` partial overlap. |
| **$A$** | **Time Availability** | **15% (0.15)** | `1.0` if student and mentor share 2+ matching availability slots (e.g., Saturday Morning & Sunday Evening); `0.5` if 1 slot matches; `0.0` if no overlap. |
| **$P$** | **Format Preference** | **10% (0.10)** | `1.0` if student's preferred coaching mode (e.g., structured technical review vs roadmap discussion) aligns with mentor's preferred mentoring style; `0.5` neutral. |

---

## 2. Reference Implementation (TypeScript)

Use this reference implementation when constructing `src/lib/matching.ts`:

```typescript
export interface StudentProfile {
  id: string;
  name: string;
  targetIndustry: string;
  targetFunction: string;
  careerGoal: string; // 'internship' | 'fresh_grad' | 'management_trainee'
  availabilitySlots: string[]; // e.g. ['sat_morning', 'sun_evening']
  formatPreference: 'technical_review' | 'career_roadmap' | 'balanced';
}

export interface MentorProfile {
  id: string;
  name: string;
  industryDomain: string;
  jobFunction: string;
  mentoringFocus: string[];
  availabilitySlots: string[];
  coachingStyle: 'technical_review' | 'career_roadmap' | 'balanced';
  maxCapacity: number; // default 5
}

export interface MatchResult {
  studentId: string;
  mentorId: string;
  totalScore: number;
  breakdown: {
    industryScore: number;
    functionScore: number;
    goalScore: number;
    availabilityScore: number;
    preferenceScore: number;
  };
}

export function calculateMatchScore(
  student: StudentProfile,
  mentor: MentorProfile
): MatchResult {
  // 1. Industry Alignment (0.30)
  let I = 0.2;
  if (student.targetIndustry.toLowerCase() === mentor.industryDomain.toLowerCase()) {
    I = 1.0;
  } else if (isAdjacentIndustry(student.targetIndustry, mentor.industryDomain)) {
    I = 0.6;
  }

  // 2. Job Function (0.25)
  let F = 0.1;
  if (student.targetFunction.toLowerCase() === mentor.jobFunction.toLowerCase()) {
    F = 1.0;
  } else if (isAdjacentFunction(student.targetFunction, mentor.jobFunction)) {
    F = 0.5;
  }

  // 3. Career Goal Stage (0.20)
  const G = mentor.mentoringFocus.includes(student.careerGoal) ? 1.0 : 0.4;

  // 4. Availability Slot (0.15)
  const overlapSlots = student.availabilitySlots.filter((slot) =>
    mentor.availabilitySlots.includes(slot)
  );
  const A = overlapSlots.length >= 2 ? 1.0 : overlapSlots.length === 1 ? 0.6 : 0.0;

  // 5. Format Preference (0.10)
  const P =
    student.formatPreference === mentor.coachingStyle ||
    mentor.coachingStyle === 'balanced'
      ? 1.0
      : 0.5;

  const totalScore = Number(
    (0.3 * I + 0.25 * F + 0.2 * G + 0.15 * A + 0.1 * P).toFixed(3)
  );

  return {
    studentId: student.id,
    mentorId: mentor.id,
    totalScore,
    breakdown: {
      industryScore: I,
      functionScore: F,
      goalScore: G,
      availabilityScore: A,
      preferenceScore: P,
    },
  };
}

function isAdjacentIndustry(ind1: string, ind2: string): boolean {
  const energyCluster = ['oil & gas', 'renewable energy', 'power generation', 'epc', 'electrical'];
  const s1 = ind1.toLowerCase();
  const s2 = ind2.toLowerCase();
  return energyCluster.includes(s1) && energyCluster.includes(s2);
}

function isAdjacentFunction(f1: string, f2: string): boolean {
  const engineeringCluster = ['electrical engineer', 'instrumentation', 'automation', 'power systems', 'project engineer'];
  const s1 = f1.toLowerCase();
  const s2 = f2.toLowerCase();
  return engineeringCluster.includes(s1) && engineeringCluster.includes(s2);
}
```

---

## 3. Cohort Grouping Heuristic (4-5 Mentees per Mentor)

When assigning a batch of 30-50 students to 5-8 mentors:
1. Generate candidate scores for all Student $\times$ Mentor pairs.
2. Sort pairs descending by `totalScore`.
3. Greedily assign students to their highest-scoring mentor until that mentor hits `maxCapacity` (usually 5).
4. If a mentor's availability slot conflicts completely ($A = 0.0$), skip to the next highest mentor to guarantee session attendance.
5. Provide manual admin override capability in `src/app/dashboard/b2b/` or `admin/` for exceptional cases.

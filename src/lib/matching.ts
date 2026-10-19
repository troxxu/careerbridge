import {
  StudentProfile,
  MentorProfile,
  MatchResult,
  CohortGroupAllocation,
} from '@/types';

/**
 * Calculates rule-based match score M between Student and Mentor:
 * M = 0.30*I + 0.25*F + 0.20*G + 0.15*A + 0.10*P
 */
export function calculateMatchScore(
  student: StudentProfile,
  mentor: MentorProfile
): MatchResult {
  // 1. Industry Alignment (30% / 0.30)
  let I = 0.2;
  const sInd = student.targetIndustry.toLowerCase().trim();
  const mInd = mentor.industryDomain.toLowerCase().trim();

  if (sInd === mInd) {
    I = 1.0;
  } else if (isAdjacentIndustry(sInd, mInd)) {
    I = 0.65;
  }

  // 2. Job Function Match (25% / 0.25)
  let F = 0.1;
  const sFunc = student.targetFunction.toLowerCase().trim();
  const mFunc = mentor.jobFunction.toLowerCase().trim();

  if (sFunc === mFunc) {
    F = 1.0;
  } else if (isAdjacentFunction(sFunc, mFunc)) {
    F = 0.55;
  }

  // 3. Career Goal Stage (20% / 0.20)
  const isGoalSupported = mentor.mentoringFocus.some(
    (focus) => focus.toLowerCase() === student.careerGoal.toLowerCase()
  );
  const G = isGoalSupported ? 1.0 : 0.4;

  // 4. Availability Slot (15% / 0.15)
  const overlapSlots = student.availabilitySlots.filter((slot) =>
    mentor.availabilitySlots.includes(slot)
  );
  let A = 0.0;
  if (overlapSlots.length >= 2) {
    A = 1.0;
  } else if (overlapSlots.length === 1) {
    A = 0.6;
  }

  // 5. Format Preference (10% / 0.10)
  let P = 0.5;
  if (
    student.formatPreference === mentor.coachingStyle ||
    mentor.coachingStyle === 'balanced'
  ) {
    P = 1.0;
  }

  const totalScore = Number(
    (0.30 * I + 0.25 * F + 0.20 * G + 0.15 * A + 0.10 * P).toFixed(3)
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
  const energyCluster = [
    'oil & gas',
    'minyak & gas',
    'renewable energy',
    'energi terbarukan',
    'power generation',
    'ketenagalistrikan',
    'epc',
    'heavy industry',
    'manufaktur & otomasi',
  ];

  const inCluster1 = energyCluster.some((c) => ind1.includes(c) || c.includes(ind1));
  const inCluster2 = energyCluster.some((c) => ind2.includes(c) || c.includes(ind2));

  return inCluster1 && inCluster2;
}

function isAdjacentFunction(f1: string, f2: string): boolean {
  const engineeringCluster = [
    'electrical engineer',
    'power systems',
    'sistem tenaga listrik',
    'instrumentation',
    'instrumentasi',
    'automation',
    'otomasi industri',
    'control engineer',
    'project engineer',
    'renewable energy engineer',
  ];

  const inCluster1 = engineeringCluster.some((c) => f1.includes(c) || c.includes(f1));
  const inCluster2 = engineeringCluster.some((c) => f2.includes(c) || c.includes(f2));

  return inCluster1 && inCluster2;
}

/**
 * Heuristic small-group cohort allocation (4-5 students per mentor)
 */
export function allocateCohortGroups(
  students: StudentProfile[],
  mentors: MentorProfile[]
): CohortGroupAllocation[] {
  // Compute all pairwise scores
  interface Pair {
    student: StudentProfile;
    mentor: MentorProfile;
    match: MatchResult;
  }

  const allPairs: Pair[] = [];
  students.forEach((student) => {
    mentors.forEach((mentor) => {
      const match = calculateMatchScore(student, mentor);
      allPairs.push({ student, mentor, match });
    });
  });

  // Sort pairs descending by total score
  allPairs.sort((a, b) => b.match.totalScore - a.match.totalScore);

  const assignedStudentIds = new Set<string>();
  const mentorGroups = new Map<
    string,
    {
      mentor: MentorProfile;
      students: Array<StudentProfile & { matchScore: number }>;
    }
  >();

  mentors.forEach((m) => {
    mentorGroups.set(m.id, {
      mentor: m,
      students: [],
    });
  });

  // 1st Pass: Greedily assign students to their best available mentor
  for (const pair of allPairs) {
    if (assignedStudentIds.has(pair.student.id)) continue;

    const group = mentorGroups.get(pair.mentor.id);
    if (!group) continue;

    // Respect max capacity (e.g. 5)
    if (group.students.length < (pair.mentor.maxCapacity || 5)) {
      group.students.push({
        ...pair.student,
        matchScore: pair.match.totalScore,
      });
      assignedStudentIds.add(pair.student.id);
    }
  }

  // 2nd Pass: Handle any leftover students by placing into lowest filled group
  const unassigned = students.filter((s) => !assignedStudentIds.has(s.id));
  for (const student of unassigned) {
    let bestMentorId = '';
    let highestScore = -1;

    for (const mentor of mentors) {
      const group = mentorGroups.get(mentor.id);
      if (group && group.students.length < (mentor.maxCapacity || 5) + 1) {
        const score = calculateMatchScore(student, mentor).totalScore;
        if (score > highestScore) {
          highestScore = score;
          bestMentorId = mentor.id;
        }
      }
    }

    if (bestMentorId) {
      const group = mentorGroups.get(bestMentorId)!;
      group.students.push({
        ...student,
        matchScore: highestScore,
      });
      assignedStudentIds.add(student.id);
    }
  }

  const sampleTimes = [
    'Sabtu, 10:00 - 11:30 WIB',
    'Sabtu, 14:00 - 15:30 WIB',
    'Minggu, 09:30 - 11:00 WIB',
    'Minggu, 19:30 - 21:00 WIB',
  ];

  return Array.from(mentorGroups.values())
    .filter((g) => g.students.length > 0)
    .map((g, index) => {
      const totalScore = g.students.reduce((acc, s) => acc + s.matchScore, 0);
      const avg = g.students.length > 0 ? totalScore / g.students.length : 0;
      return {
        mentor: g.mentor,
        students: g.students,
        averageMatchScore: Number(avg.toFixed(3)),
        scheduledTime: sampleTimes[index % sampleTimes.length],
        meetLink: `https://meet.google.com/crb-w4grp-${g.mentor.id.slice(0, 4)}`,
      };
    });
}

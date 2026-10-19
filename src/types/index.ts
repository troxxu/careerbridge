// Unified TypeScript types for Career Bridge Platform

export type UserRole = 'student' | 'mentor' | 'institution' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  department?: string;
  nrp?: string;
  university?: string;
  targetIndustry?: string;
  crsScore?: number;
  crsTier?: string;
  authProvider?: 'google' | 'credentials';
}

export interface StoredUserAccount extends AuthUser {
  password: string;
  createdAt: string;
  resetToken?: string;
}

export type PillarKey = 'clarity' | 'competency' | 'branding' | 'interview' | 'networking';

export interface DiagnosticQuestion {
  id: string;
  pillar: PillarKey;
  pillarLabel: string;
  questionText: string;
  helpText?: string;
}

export interface DiagnosticAnswer {
  questionId: string;
  pillar: PillarKey;
  score: number; // 1 to 5
}

export interface PillarScore {
  pillar: string;
  label: string;
  rawScore: number;
  normalizedScore: number; // 0 - 100
  weight: number;
}

export interface CRSAssessmentResult {
  overallScore: number; // 0 - 100
  tier: 'Exploration Needed' | 'Emerging Readiness' | 'Industry Ready';
  tierColor: string;
  pillars: Record<string, PillarScore>;
  radarChartData: Array<{ subject: string; score: number; fullMark: number }>;
  recommendations: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  nrp?: string;
  email: string;
  university: string;
  department: string;
  semester: number;
  targetIndustry: string;
  targetFunction: string;
  careerGoal: 'internship' | 'fresh_grad' | 'management_trainee';
  availabilitySlots: string[]; // e.g. ['sat_morning', 'sun_evening']
  formatPreference: 'technical_review' | 'career_roadmap' | 'balanced';
  crsScore?: number;
  linkedinUrl?: string;
  cvUrl?: string;
  cvStatus?: 'not_uploaded' | 'under_review' | 'reviewed';
}

export interface MentorProfile {
  id: string;
  name: string;
  currentTitle: string;
  companyName: string;
  industryDomain: string;
  jobFunction: string;
  yearsOfExperience: number;
  mentoringFocus: string[];
  availabilitySlots: string[];
  coachingStyle: 'technical_review' | 'career_roadmap' | 'balanced';
  maxCapacity: number; // default 5
  avatarUrl: string;
  linkedinUrl?: string;
  bio: string;
}

export interface MatchBreakdown {
  industryScore: number;
  functionScore: number;
  goalScore: number;
  availabilityScore: number;
  preferenceScore: number;
}

export interface MatchResult {
  studentId: string;
  mentorId: string;
  totalScore: number;
  breakdown: MatchBreakdown;
}

export interface CohortGroupAllocation {
  mentor: MentorProfile;
  students: Array<StudentProfile & { matchScore: number }>;
  averageMatchScore: number;
  scheduledTime: string;
  meetLink: string;
}

export interface ActionPlanMilestone {
  horizon: 'Day 30' | 'Day 60' | 'Day 90';
  target: string;
  actionItems: string[];
  isCompleted: boolean;
}

export interface NinetyDayActionPlan {
  studentId: string;
  cohortId: string;
  mentorId: string;
  milestoneDay30: ActionPlanMilestone;
  milestoneDay60: ActionPlanMilestone;
  milestoneDay90: ActionPlanMilestone;
  mentorSignoffNotes?: string;
  status: 'draft' | 'submitted' | 'approved_by_mentor';
}

export interface MentorEvaluationRubric {
  menteeId: string;
  mentorId: string;
  preparationRating: number; // 1-5
  clarityRating: number; // 1-5
  cvQualityRating: number; // 1-5
  positiveFeedback: string;
  improvementArea: string;
  submittedAt: string;
}

export interface B2BInstitutionalMetrics {
  cohortName: string;
  department: string;
  totalEnrolled: number;
  preTestAverageCRS: number;
  postTestAverageCRS: number;
  deltaPercentage: number;
  completionRate: number;
  satisfactionRate: number;
  lowestPillars: Array<{ pillar: string; avgScore: number }>;
}

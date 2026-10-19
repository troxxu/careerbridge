import { NextRequest, NextResponse } from 'next/server';
import { calculateMatchScore, allocateCohortGroups } from '@/lib/matching';
import { MOCK_MENTORS, MOCK_STUDENTS } from '@/lib/mock-data';
import { StudentProfile } from '@/types';

export async function GET() {
  try {
    const allocations = allocateCohortGroups(MOCK_STUDENTS, MOCK_MENTORS);
    return NextResponse.json({
      success: true,
      data: {
        totalStudents: MOCK_STUDENTS.length,
        totalMentors: MOCK_MENTORS.length,
        allocations,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to simulate cohort allocation' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const student: StudentProfile = body.student;

    if (!student || !student.targetIndustry) {
      return NextResponse.json(
        { success: false, error: 'Invalid student profile submitted' },
        { status: 400 }
      );
    }

    const matches = MOCK_MENTORS.map((mentor) => {
      const match = calculateMatchScore(student, mentor);
      return {
        mentor,
        matchScore: match.totalScore,
        breakdown: match.breakdown,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      data: {
        studentId: student.id,
        matches,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate match score' },
      { status: 500 }
    );
  }
}

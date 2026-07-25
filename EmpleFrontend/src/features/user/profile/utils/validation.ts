import { UserProfile } from '../types';

export interface ValidationResult {
  isValid: boolean;
  missingSections: string[];
  missingFieldsMap: Record<string, string[]>;
  completionPercentage: number;
}

export function validateProfile(profile: Partial<UserProfile>): ValidationResult {
  const missingSections: string[] = [];
  const missingFieldsMap: Record<string, string[]> = {};
  
  let score = 0;

  // 1. Personal Info
  const personalMissing = [];
  if (!profile.personalInfo?.fullName?.trim()) personalMissing.push('fullName');
  if (!profile.username?.trim()) personalMissing.push('username');
  if (!profile.personalInfo?.headline?.trim()) personalMissing.push('headline');
  if (!profile.personalInfo?.email?.trim()) personalMissing.push('email');
  if (!profile.personalInfo?.phone?.trim()) personalMissing.push('phone');
  if (!profile.personalInfo?.location?.trim()) personalMissing.push('location');
  
  if (personalMissing.length > 0) {
    missingSections.push('personal');
    missingFieldsMap['personal'] = personalMissing;
  } else {
    score += 10;
  }

  // 2. About
  const aboutMissing = [];
  if (!profile.about?.bio || profile.about.bio.trim().length < 50) {
    aboutMissing.push('bio');
  }
  if (aboutMissing.length > 0) {
    missingSections.push('about');
    missingFieldsMap['about'] = aboutMissing;
  } else {
    score += 10;
  }

  // 3. Education
  const hasValidEducation = profile.education?.some(
    (e) => e.institution?.trim() && e.degree?.trim() && e.branch?.trim() && e.startYear?.trim() && e.endYear?.trim()
  );
  if (!hasValidEducation) {
    missingSections.push('education');
    missingFieldsMap['education'] = ['education_list'];
  } else {
    score += 10;
  }

  // 4. Experience (Optional for publish, but gives score)
  if (profile.experience && profile.experience.length > 0) {
    score += 10;
  }

  // 5. Projects
  if (profile.projects && profile.projects.length > 0) {
    score += 10;
  } else {
    missingSections.push('projects');
    missingFieldsMap['projects'] = ['projects_list'];
  }

  // 6. Skills
  const hasSkills = profile.skills && Object.values(profile.skills).some((arr: any) => arr?.length > 0);
  if (!hasSkills) {
    missingSections.push('skills');
    missingFieldsMap['skills'] = ['skills_list'];
  } else {
    score += 10;
  }

  // 7. Certifications (Optional)
  if (profile.certifications && profile.certifications.length > 0) {
    score += 10;
  }

  // 8. Social Links
  const hasSocial = profile.socialLinks?.github?.trim() || profile.socialLinks?.linkedin?.trim();
  if (!hasSocial) {
    missingSections.push('social');
    missingFieldsMap['social'] = ['github_or_linkedin'];
  } else {
    score += 10;
  }

  // 9. Resume & Media
  if (!profile.resumeUrl && !profile.profilePhoto) {
    // Original calculation said profilePhoto or resumeUrl gives score
    score += 0;
  } else {
    score += 10;
  }
  
  if (!profile.resumeUrl) {
    missingSections.push('resume');
    missingFieldsMap['resume'] = ['resumeUrl'];
  }

  // 10. Template
  if (profile.template) {
    score += 10;
  }

  return {
    isValid: missingSections.length === 0,
    missingSections,
    missingFieldsMap,
    completionPercentage: Math.min(100, score)
  };
}

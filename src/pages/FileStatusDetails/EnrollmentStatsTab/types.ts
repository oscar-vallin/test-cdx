import { EnrollmentStat, Maybe, PlanInsuredStat } from 'src/data/services/graphql';

type EnrollmentStatType = {
  planCode: string;
  activeSubscribers: number;
  endedSubscribers: number;
  activeDependents: number;
  endedDependents: number;
};

const mapPlanInsuredStat = (planInsuredStat: PlanInsuredStat): EnrollmentStatType => ({
  planCode: planInsuredStat.planCode ?? '',
  activeSubscribers: planInsuredStat.subscribers?.active?.value || 0,
  endedSubscribers: planInsuredStat.subscribers?.ended?.value || 0,
  activeDependents: planInsuredStat.dependents?.active?.value || 0,
  endedDependents: planInsuredStat.dependents?.active?.value || 0,
});

const mapIncludedStats = (enrollmentStat?: EnrollmentStat | null): EnrollmentStatType[] => {
  if (enrollmentStat) {
    const stats: EnrollmentStatType[] = [];
    const insuredStat = enrollmentStat?.insuredStat;
    if (insuredStat) {
      stats.push({
        planCode: 'Any Plan',
        activeSubscribers: insuredStat.subscribers?.active?.value || 0,
        endedSubscribers: insuredStat.subscribers?.ended?.value || 0,
        activeDependents: insuredStat.dependents?.active?.value || 0,
        endedDependents: insuredStat.dependents?.active?.value || 0,
      });
    }
    const planInsuredStats = enrollmentStat.planInsuredStat;
    planInsuredStats?.forEach((planInsuredStat) => {
      if (planInsuredStat) {
        stats.push(mapPlanInsuredStat(planInsuredStat));
      }
    });
    return stats;
  }
  return [];
};

const mapExcludedStats = (enrollmentStat?: EnrollmentStat | null): EnrollmentStatType[] => {
  if (enrollmentStat) {
    const stats: EnrollmentStatType[] = [];
    const excludedInsuredStat = enrollmentStat?.excludedInsuredStat;
    if (excludedInsuredStat) {
      stats.push({
        planCode: 'All Plans',
        activeSubscribers: excludedInsuredStat.subscribers?.active?.value || 0,
        endedSubscribers: excludedInsuredStat.subscribers?.ended?.value || 0,
        activeDependents: excludedInsuredStat.dependents?.active?.value || 0,
        endedDependents: excludedInsuredStat.dependents?.active?.value || 0,
      });
    }
    enrollmentStat?.excludedPlanInsuredStat?.forEach((planInsuredStat) => {
      if (planInsuredStat) {
        stats.push(mapPlanInsuredStat(planInsuredStat));
      }
    });
    return stats;
  }
  return [];
};

const mapPlanInsuredStats = (planInsuredStats?: Maybe<PlanInsuredStat>[] | null): EnrollmentStatType[] => {
  if (planInsuredStats) {
    const stats: EnrollmentStatType[] = [];
    planInsuredStats.forEach((planInsuredStat) => {
      if (planInsuredStat) {
        stats.push(mapPlanInsuredStat(planInsuredStat));
      }
    });
    return stats;
  }
  return [];
};

export { mapIncludedStats, mapExcludedStats, mapPlanInsuredStats };
export type { EnrollmentStatType };

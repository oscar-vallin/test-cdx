import { ReactElement } from 'react';
import { Pivot, PivotItem, Stack } from '@fluentui/react';
import { WorkPacketStatusDetails } from 'src/data/services/graphql';
import { EmptyState } from 'src/containers/states';
import { mapExcludedStats, mapIncludedStats } from 'src/pages/FileStatusDetails/EnrollmentStatsTab/types';
import { PlanInsuredStatsTable } from 'src/pages/FileStatusDetails/EnrollmentStatsTab/PlanInsuredStatsTable';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';

type EnrollmentStatsTabProps = {
  packet?: WorkPacketStatusDetails;
};

const EnrollmentStatsTab = ({ packet }: EnrollmentStatsTabProps): ReactElement => {
  const includedStats = mapIncludedStats(packet?.enrollmentStats);
  const excludedPlanInsuredStat = mapExcludedStats(packet?.enrollmentStats);
  const summaryOnly = !packet?.enrollmentStats?.excludedInsuredStat && !packet?.enrollmentStats?.excludedPlanInsuredStat;
  const outboundEnrollmentStats = mapIncludedStats(packet?.outboundEnrollmentStats);
  const inboundEnrollmentStats = mapIncludedStats(packet?.inboundEnrollmentStats);

  if (includedStats.length > 0 || excludedPlanInsuredStat.length > 0) {
    return (
      <FormRow>
        <Column>
          <Pivot linkFormat="tabs">
            <PivotItem headerText="Summary">
              <Stack wrap horizontal verticalAlign="start" tokens={{ childrenGap: 15 }}>
                {includedStats.length > 0 && (
                  <Stack.Item>
                    <PlanInsuredStatsTable
                      header="Included Subscribers / Enrollments"
                      caption="Counts for the enrollments that were included in the outbound vendor file."
                      planInsuredStats={includedStats}
                    />
                  </Stack.Item>
                )}
                {excludedPlanInsuredStat?.length > 0 && (
                  <Stack.Item>
                    <PlanInsuredStatsTable
                      header="Excluded Subscribers / Enrollments"
                      caption="Counts for enrollments that were on the inbound file but were not included in the outbound vendor file."
                      planInsuredStats={excludedPlanInsuredStat}
                    />
                  </Stack.Item>
                )}
              </Stack>
            </PivotItem>
            {!summaryOnly && outboundEnrollmentStats.length > 0 && (
              <PivotItem headerText="Outbound">
                <PlanInsuredStatsTable
                  header="Outbound Subscribers / Enrollments"
                  caption="Counts for the enrollments that were included in the outbound vendor file."
                  planInsuredStats={outboundEnrollmentStats}
                />
              </PivotItem>
            )}
            {!summaryOnly && inboundEnrollmentStats?.length > 0 && (
              <PivotItem headerText="Inbound">
                <PlanInsuredStatsTable
                  header="Inbound Subscribers / Enrollments"
                  caption="Counts for the enrollments that were on the inbound file."
                  planInsuredStats={inboundEnrollmentStats}
                />
              </PivotItem>
            )}
          </Pivot>
        </Column>
      </FormRow>
    );
  }

  return <EmptyState title="No Enrollment Stats for this exchange" />;
};

export default EnrollmentStatsTab;

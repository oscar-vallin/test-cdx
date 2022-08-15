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
  const summaryOnly =
    !packet?.enrollmentStats?.excludedInsuredStat && !packet?.enrollmentStats?.excludedPlanInsuredStat;
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
                      caption="These are the numbers of Subscribers and Dependents sent in the inbound file for each Plan"
                      planInsuredStats={includedStats}
                    />
                  </Stack.Item>
                )}
                {excludedPlanInsuredStat?.length > 0 && (
                  <Stack.Item>
                    <PlanInsuredStatsTable
                      header="Excluded Subscribers / Enrollments"
                      caption="These are the numbers of Subscribers and Dependents included on the inbound file, but NOT included on the outbound file"
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
                  caption="These are the numbers of Subscribers and Dependents included on the outbound file for each Plan"
                  planInsuredStats={outboundEnrollmentStats}
                />
              </PivotItem>
            )}
            {!summaryOnly && inboundEnrollmentStats?.length > 0 && (
              <PivotItem headerText="Inbound">
                <PlanInsuredStatsTable
                  header="Inbound Subscribers / Enrollments"
                  caption="These are the numbers of Subscribers and Dependents sent in the inbound file for each Plan"
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

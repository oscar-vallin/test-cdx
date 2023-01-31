import React from 'react';
import { useHistory } from 'react-router-dom';
import { DirectionalHint, TooltipHost } from '@fluentui/react';
import { format } from 'date-fns';
import { XchangeActivity } from 'src/data/services/graphql';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { ButtonLink } from 'src/components/buttons';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { ActivityBubble } from './ActivityBubbles.styles';

type ActivityBubblesType = {
  total: boolean;
  orgSid?: string | null;
  uat: XchangeActivity;
  test: XchangeActivity;
  prod: XchangeActivity;
};

export const ActivityBubbles = ({
  total,
  orgSid,
  uat,
  test,
  prod,
}: ActivityBubblesType) => {
  const ActiveDomain = useActiveDomainUseCase();
  const history = useHistory();

  const tooltipHostContent = (
    lastActivity: Date,
    activityType: 'UAT' | 'TEST' | 'PROD',
    filesProcessed: number,
  ) => {
    const fromDate = new Date(lastActivity);
    let currentColor: string;
    if (activityType === 'UAT') {
      currentColor = 'purple';
    } else if (activityType === 'PROD') {
      currentColor = 'blue';
    } else {
      currentColor = 'orange';
    }

    const currentDate = format(fromDate, 'E MMM dd yyyy hh:mma');
    const endDate = yyyyMMdd(fromDate);
    const endFormatted = new Date(endDate);
    endFormatted.setDate(endFormatted.getDate() - 29);
    const startDate = yyyyMMdd(endFormatted);
    return (
      <>
        <span style={{ color: currentColor, fontWeight: 'bold' }}> {filesProcessed} </span>
        {activityType} files processed in the last 30 days <br />
        <span style={{ marginLeft: '20px' }}>Last Run: {currentDate}</span> <br /> <br />
        <ButtonLink
          style={{ marginLeft: '70px' }}
          onClick={() => {
            if (orgSid) {
              ActiveDomain.setCurrentOrg(orgSid);
              history.push(`/file-status?endDate=${endDate}&orgSid=${orgSid}&startDate=${startDate}`);
            }
          }}
        >
          {' '}
          Click for details
        </ButtonLink>
      </>
    );
  };

  if (total) {
    return (
      <>
        { uat.filesProcessed > 0 ? (
          <ActivityBubble large={true} color="purple" className="uat">{uat.filesProcessed}</ActivityBubble>
        ) : (
          <ActivityBubble large={true} color="gray" className="uat">0</ActivityBubble>
        )}
        { test.filesProcessed > 0 ? (
          <ActivityBubble large={true} color="orange" className="test">{test.filesProcessed}</ActivityBubble>
        ) : (
          <ActivityBubble large={true} color="gray" className="test">0</ActivityBubble>
        )}
        { prod.filesProcessed > 0 ? (
          <ActivityBubble large={true} color="blue" className="prod">{prod.filesProcessed}</ActivityBubble>
        ) : (
          <ActivityBubble large={true} color="gray" className="prod">0</ActivityBubble>
        )}
      </>
    );
  }

  return (
    <>
      {uat.filesProcessed > 0 ? (
        <TooltipHost
          content={
            tooltipHostContent(
              uat.lastActivity,
              'UAT',
              uat.filesProcessed,
            )
          }
          directionalHint={DirectionalHint.topRightEdge}
          closeDelay={2000}
        >
          <ActivityBubble large={false} color="purple" className="uat">{uat.filesProcessed}</ActivityBubble>
        </TooltipHost>
      ) : (
        <ActivityBubble large={false} color="gray" className="uat">0</ActivityBubble>
      )}
      {test.filesProcessed > 0 ? (
        <TooltipHost
          content={
            tooltipHostContent(
              test.lastActivity,
              'TEST',
              test.filesProcessed,
            )
          }
          directionalHint={DirectionalHint.topRightEdge}
          closeDelay={2000}
        >
          <ActivityBubble large={false} color="orange" className="test">{test.filesProcessed}</ActivityBubble>
        </TooltipHost>
      ) : (
        <ActivityBubble large={false} color="gray" className="test">0</ActivityBubble>
      )}
      {prod.filesProcessed > 0 ? (
        <TooltipHost
          content={
            tooltipHostContent(
              prod.lastActivity,
              'PROD',
              prod.filesProcessed,
            )
          }
          directionalHint={DirectionalHint.topRightEdge}
          closeDelay={2000}
        >
          <ActivityBubble large={false} color="blue" className="prod">{prod.filesProcessed}</ActivityBubble>
        </TooltipHost>
      ) : (
        <ActivityBubble large={false} color="gray" className="prod">0</ActivityBubble>
      )}
    </>
  );
}

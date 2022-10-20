import { useState, useEffect } from 'react';
import {
  MonthCount,
  useWpTransmissionCountBySponsorLazyQuery,
  Organization,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTES } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useOrgSid } from 'src/hooks/useOrgSid';
import { endOfMonth } from 'date-fns';
import {
  LineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
} from 'recharts';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  Spinner,
  SpinnerSize,
  Stack,
  Text,
} from '@fluentui/react';
import { PageBody } from 'src/components/layouts/Column';
import { ButtonLink } from 'src/components/buttons';
import { theme } from 'src/styles/themes/theme';
import { StyledCheckbox, StyledTooltip } from './Visualizations.style';
import { VisualizationPanel } from './visualizationPanel';

export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const INITIAL_COUNT_TOTAL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const colors = ['blue', 'green'];
const CURRENT_MONTH = new Date().getMonth();

type DataSubClientProps = {
  name?: string;
  data?: MonthCount[];
  organization?: Organization,
};

const styles = {
  marginLeft: '50px',
  paddingLeft: '20px',
};

const VisualizationsPage = () => {
  const { orgSid } = useOrgSid();
  const [subClients, setSubClients] = useState<DataSubClientProps[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [countMonth, setCountMonth] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [countTotal, setCountTotal] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [subClientsCheckBox, setSubClientsCheckBox] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectNone, setSelectNone] = useState(false);
  const [isOpenPanel, setIsopenPanel] = useState(false);
  const [orgIdOrg, setOrgIdOrg] = useState('');
  const [currentOrg, setCurrentOrg] = useState();
  const [totalTransByMonth, setTotalTransByMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({
    y: 0,
    x: 0,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const end = endOfMonth(new Date('2022-11-30T06:00:00.000Z'));
  const [
    transmissioncountBySponsor,
    { data: transmissionCountData, loading: isLoadingTransmissionCount },
  ] = useWpTransmissionCountBySponsorLazyQuery();

  const fetchData = () => {
    let s = new Date();
    s = new Date(s.getFullYear(), 0);
    transmissioncountBySponsor({
      variables: {
        orgSid,
        dateRange: {
          rangeStart: s,
          rangeEnd: end,
        },
      },
    });
  };

  const handleSubClientOfCheckbox = (currentState: boolean) => {
    if (currentState) {
      subClients.forEach(({ name }) => setSubClientsCheckBox((prevState) => ({ ...prevState, [name ?? '']: true })));
      return;
    }

    subClients.forEach(({ name }) => setSubClientsCheckBox({ [name ?? '']: false }));
  };

  useEffect(() => {
    fetchData()
  }, []);

  const getSubClientsData = (subC) => {
    if (subC.length > 0) {
      for (let subClient = 0; subClient < subC.length; subClient++) {
        const diff = subClient > 0 ? 10 : 0;
        const currentSubClients: DataSubClientProps = {};
        currentSubClients['name'] = subC[subClient]['organization']['name'];
        currentSubClients['organization'] = subC[subClient]['organization'];
        setSubClientsCheckBox((prevState) => ({
          ...prevState,
          [subC[subClient]['organization']['name']]: true,
        }));
        const monthCounts = subC[subClient].monthCounts ?? [];
        const data: MonthCount[] = [];
        for (let dataSClient = 0; dataSClient < monthCounts.length; dataSClient++) {
          const currentSubClient:MonthCount = { month: 0, count: 0, year: 0 };
          currentSubClient['month'] = monthCounts[dataSClient].month;
          currentSubClient['count'] = monthCounts[dataSClient].count + diff;
          currentSubClient['year'] = monthCounts[dataSClient].year;
          data.push(currentSubClient)
        }
        currentSubClients['data'] = data;
        setSubClients((prevState) => prevState.concat(currentSubClients));
      }
    }
  };

  const monthList = () => {
    const m: string[] = [];
    let i = CURRENT_MONTH + 1;
    while (m.length < 11) {
      m.push(shortMonths[i]);
      i++;
      if (i === 11) {
        m.push(shortMonths[i]);
        i = 0;
      }
    }
    m.push(shortMonths[CURRENT_MONTH]);
    setMonths(m);
    return m;
  };

  const sumTotalTransmissions = (sdata) => {
    const aux = 11 - CURRENT_MONTH;
    const total = countMonth;
    for (let data = 0; data < sdata.length; data++) {
      total[aux + data] += sdata[data].count;
    }
    setCountTotal(total);
    setCountMonth(total);
  };

  const currentTotalTransmissions = (s: DataSubClientProps, checked?: boolean) => {
    const aux = 11 - CURRENT_MONTH;
    const total = countMonth;
    const length = s.data?.length ?? 0
    for (let data = 0; data < length; data++) {
      if (checked) {
        total[aux + data] += s['data'] ? s['data'][data].count : 0;
      } else {
        total[aux + data] -= s['data'] ? s['data'][data].count : 0;
      }
    }
    setCountMonth(total);
  };

  const customMouseOver = (e, payload, s) => {
    const { count, month } = payload.payload;
    setTotalTransByMonth(count);
    setCurrentMonth(month);
    setTooltipPosition({
      x: payload.cx,
      y: payload.cy,
    });
    const { orgId } = s.organization;
    const { name } = s;
    setOrgIdOrg(orgId);
    setCurrentOrg(name);
    setShowTooltip(true);
  };

  const renderLine = (s: DataSubClientProps, sIndex) => {
    const name = s.name ?? '';
    if (selectAll || (subClientsCheckBox[name] && !selectNone)) {
      return (
        <Line
          activeDot={{
            onMouseOver(e, payload) { customMouseOver(e, payload, s) },
            r: 6,
          }}
          isAnimationActive={false}
          dataKey="count"
          data={s.data}
          name={s.name}
          dot={false}
          key={s.name}
          stroke={colors[sIndex]}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    if (!isLoadingTransmissionCount && transmissionCountData) {
      const { wpTransmissionCountBySponsor } = transmissionCountData;
      if (wpTransmissionCountBySponsor && wpTransmissionCountBySponsor.length > 0) {
        getSubClientsData(wpTransmissionCountBySponsor);
        wpTransmissionCountBySponsor.forEach((organization) => {
          sumTotalTransmissions(organization?.monthCounts);
        });
      }
      monthList();
    }
  }, [transmissionCountData, isLoadingTransmissionCount]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Custooltip = () => {
    if (showTooltip) {
      const year = new Date().getFullYear();
      return (
        <StyledTooltip>
          <Stack>
            <Text variant="small">
              <Text style={{ fontWeight: 'bold' }} variant="small">{totalTransByMonth} </Text>
              Transmissions in {shortMonths[currentMonth - 1]} { year}{' '}
              {' '} {currentOrg}
            </Text>
            <ButtonLink
              onClick={() => {
                setIsopenPanel(true);
              }}
            >
              details
            </ButtonLink>
          </Stack>
        </StyledTooltip>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (isLoadingTransmissionCount) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading visualization page" />
        </Spacing>
      );
    }

    return (
      <Spacing margin={{ left: 'normal' }}>
        <LineChart
          width={1100}
          height={400}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <XAxis dataKey="month" allowDuplicatedCategory={false} tick={false} />
          <YAxis dataKey="count" domain={[10, 'auto']} />
          <Tooltip
            cursor={false}
            content={<Custooltip />}
            position={{ x: tooltipPosition.x - 98, y: tooltipPosition.y - 88 }}
            wrapperStyle={{ pointeEvents: 'auto' }}
          />
          {subClients.map((s, sIndex) => renderLine(s, sIndex))}
        </LineChart>
      </Spacing>
    )
  };

  return (
    <LayoutDashboard id="PageVisualizations" menuOptionSelected={ROUTES.ROUTE_VISUALIZATIONS.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Visualizations" title="Validations" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>
            {renderChart()}
          </Row>
          <Row>
            <Stack horizontal={true} horizontalAlign="space-between" style={{ width: '90%' }}>
              {months.map((month, monthIndex) => (
                <div key={monthIndex}>
                  {months.length - 1 === monthIndex ? (
                    <Text
                      style={{
                        marginLeft: '43px',
                        paddingLeft: '15px',
                        color: theme.colors.themePrimary,
                        fontWeight: 600,
                      }}
                    >
                      {month}
                    </Text>

                  ) : (
                    <Text
                      style={{
                        marginLeft: '43px',
                        paddingLeft: '15px',
                        fontWeight: 500,
                      }}
                    >
                      {month}
                    </Text>
                  )}
                </div>
              ))}
            </Stack>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Stack horizontal={true} horizontalAlign="space-between" style={{ width: '90%', backgroundColor: '#f3f2f1' }}>
                <span style={{ position: 'absolute' }}>Total</span>
                {countMonth.map((count, countIndex) => (
                  <Text style={styles} key={countIndex}>{count}</Text>
                ))}
              </Stack>
            </Spacing>
          </Row>
          <Row>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Stack horizontal={true}>
                {subClients.map((subC, subCIndex) => (
                  <StyledCheckbox
                    key={`${subC.name}-${subCIndex + 1}`}
                    label={subC.name}
                    checked={subClientsCheckBox[subC.name ?? '']}
                    onChange={(event, isChecked) => {
                      setSubClientsCheckBox({
                        ...subClientsCheckBox,
                        [subC.name ?? '']: isChecked,
                      });
                      setSelectNone(false);
                      setSelectAll(false);
                      currentTotalTransmissions(subC, isChecked);
                    }}
                    color={colors[subCIndex]}
                  />
                ))}
              </Stack>
            </Spacing>
          </Row>
          <Row>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Stack horizontal={true} style={{ width: '80%' }}>
                <ButtonLink
                  underline
                  style={styles}
                  onClick={() => {
                    handleSubClientOfCheckbox(true);
                    setCountMonth(countTotal);
                    setSelectNone(false);
                    setSelectAll(true);
                  }}
                >
                  Select all
                </ButtonLink>
                <ButtonLink
                  underline
                  style={styles}
                  onClick={() => {
                    handleSubClientOfCheckbox(false);
                    setCountMonth(new Array(...INITIAL_COUNT_TOTAL));
                    setSelectAll(false);
                    setSelectNone(true);
                  }}
                >
                  Select none
                </ButtonLink>
              </Stack>
            </Spacing>
          </Row>
        </Container>
      </PageBody>
      <VisualizationPanel
        isPanelOpen={isOpenPanel}
        closePanel={setIsopenPanel}
        orgName={currentOrg}
        orgId={orgIdOrg}
        currentMonth={currentMonth}
      />
    </LayoutDashboard>
  );
};

export { VisualizationsPage };

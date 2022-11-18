import React, { useState, useEffect, ReactElement } from 'react';
import {
  LineChart,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { Spacing } from 'src/components/spacings/Spacing';
import {
  Spinner,
  SpinnerSize,
  Stack,
  IDropdownOption, Icon,
} from '@fluentui/react';
import {
  useWpTransmissionCountBySponsorLazyQuery,
  useWpTransmissionCountByVendorLazyQuery,
  Organization,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { Text, PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTES } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useOrgSid } from 'src/hooks/useOrgSid';
import { toUTC } from 'src/hooks/useTableFilters';
import { endOfMonth, format } from 'date-fns';
import { PageBody } from 'src/components/layouts/Column';
import { ButtonLink } from 'src/components/buttons';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import {
  CurrentMonth,
  PriorYearMonth,
  StyledCheckbox,
  StyledTooltip,
  StyledTotal,
  StyledTransmissionsType,
} from './Visualizations.style';
import { VisualizationPanel } from './visualizationPanel';

export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const INITIAL_COUNT_TOTAL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const COLORS = [
  '#fd7f6f',
  '#7eb0d5',
  '#b2e061',
  '#bd7ebe',
  '#ffb55a',
  '#ffee65',
  '#beb9db',
  '#fdcce5',
  '#8bd3c7',
];
const CURRENT_MONTH = new Date().getMonth();

type DataProps = {
  month: string;
  year: number;
  count: number;
}

type DataSubClientProps = {
  name?: string;
  data?: DataProps[];
  organization?: Organization,
};

const styles = {
  marginLeft: '43px',
  paddingLeft: '15px',
};

const VisualizationsPage = () => {
  const { orgSid } = useOrgSid();
  const [subClients, setSubClients] = useState<DataSubClientProps[]>([]);
  const [typeOfTransmissions, setTypeOfTransmissions] = useState<IDropdownOption | undefined>({ key: 'sponsor', text: 'Transmissions by vendor per month' });
  const [graphicType, setGraphicType] = useState<IDropdownOption>();
  const [subClientBarChart, setSubClientsBarChart] = useState<any[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [monthInCurrent, setMonthInCurrent] = useState(0);
  const [countMonth, setCountMonth] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [countTotal, setCountTotal] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [subClientsCheckBox, setSubClientsCheckBox]: any = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectNone, setSelectNone] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [orgIdOrg, setOrgIdOrg] = useState('');
  const [currentYear, setCurrentYear] = useState(0);
  const [currentOrg, setCurrentOrg] = useState();
  const [totalTransByMonth, setTotalTransByMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({
    y: 0,
    x: 0,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentSubOrg, setCurrentSubOrg] = useState('');

  const endRange = endOfMonth(new Date());
  const startRange = (): Date => {
    const s = new Date();
    s.setMonth(s.getMonth() - 11);
    s.setDate(1);
    s.setHours(0, 0, 0, 0);
    return s;
  };

  const [
    transmissionCountBySponsor,
    { data: transmissionSponsorData, loading: isLoadingTransmissionSponsor },
  ] = useWpTransmissionCountBySponsorLazyQuery();

  const [
    transmissionCountByVendor,
    { data: transmissionVendorData, loading: isLoadingTransmissionVendor },
  ] = useWpTransmissionCountByVendorLazyQuery();

  const fetchData = () => {
    if (typeOfTransmissions?.key === 'vendor') {
      transmissionCountByVendor({
        variables: {
          orgSid,
          dateRange: {
            rangeStart: startRange(),
            rangeEnd: endRange,
          },
        },
      })
      return;
    }
    transmissionCountBySponsor({
      variables: {
        orgSid,
        dateRange: {
          rangeStart: startRange(),
          rangeEnd: endRange,
        },
      },
    });
  };

  const handleSubClientOfCheckbox = (currentState: boolean) => {
    if (currentState) {
      subClients.forEach(({ organization }) => setSubClientsCheckBox((prevState) => ({ ...prevState, [organization?.name ?? '']: true })));
      return;
    }

    subClients.forEach(({ organization }) => {
      setSubClientsCheckBox((prevState) => ({ ...prevState, [organization?.name ?? '']: false }));
    });
  };

  useEffect(() => {
    fetchData();
  }, [typeOfTransmissions]);

  const monthList = () => {
    const m: string[] = [];
    let i = CURRENT_MONTH + 1;
    while (m.length < 11) {
      m.push(shortMonths[i]);
      if (i === 11) {
        i = 0;
        m.push(shortMonths[i]);
      }
      i++;
    }
    m.push(shortMonths[CURRENT_MONTH]);
    setMonths(m);
    return m;
  };

  const getSubClientsData = (subC) => {
    setSubClients([]);
    if (subC.length > 0) {
      for (let subClient = 0; subClient < subC.length; subClient++) {
        setSubClientsCheckBox((prevState) => ({
          ...prevState,
          [subC[subClient]['organization']['name']]: true,
        }));
        const aux = subC[subClient].monthCounts.shift();
        subC[subClient].monthCounts.push(aux);
        setSubClients(subC);
      }
    }
  };

  const getDataBarChart = (subC) => {
    const orderedMonth = monthList();
    setSubClientsBarChart([]);
    const subClientdata: any[] = [];
    let data = {};
    for (let month = 0; month < orderedMonth.length; month++) {
      data = {};
      data['month'] = orderedMonth[month];
      subClientdata.push(data);
    }

    for (let subClient = 0; subClient < subC.length; subClient++) {
      const monthCounts = subC[subClient].monthCounts ?? [];
      for (let m = 0; m < monthCounts.length; m++) {
        const index = subClientdata.map((object) => object.month)
          .indexOf(shortMonths[monthCounts[m].month - 1]);
        subClientdata[index][subC[subClient]['organization']['name']] = monthCounts[m].count;
        subClientdata[index]['year'] = monthCounts[m].year;
      }
    }
    setSubClientsBarChart(subClientdata);
  };

  const sumTotalTransmissions = (sdata) => {
    const total = countMonth;
    for (let data = 0; data < sdata.length; data++) {
      total[data] += sdata[data].count;
    }
    setCountTotal(total);
    setCountMonth(total);
  };

  const currentTotalTransmissions = (s, checked?: boolean) => {
    const total = countMonth;
    const length = s.monthCounts?.length ?? 0
    for (let data = 0; data < length; data++) {
      if (checked) {
        total[data] += s['monthCounts'] ? s['monthCounts'][data].count : 0;
      } else {
        total[data] -= s['monthCounts'] ? s['monthCounts'][data].count : 0;
      }
    }
    setCountMonth(total);
  };

  const customMouseOver = (e, payload, s) => {
    const { count, month, year } = payload.payload;
    setTotalTransByMonth(count);
    setCurrentYear(year);
    setCurrentMonth(shortMonths[month - 1]);
    setTooltipPosition({
      x: payload.cx,
      y: payload.cy,
    });
    const { orgId } = s.organization;
    const { name } = s.organization;
    setOrgIdOrg(orgId);
    setCurrentOrg(name);
    setShowTooltip(true);
  };

  const customMouseOverBarchart = (data, org, orgName) => {
    setTotalTransByMonth(data[orgName])
    setCurrentMonth(data.month);
    setCurrentYear(data.year);
    setTooltipPosition({
      x: data.x,
      y: data.y,
    });
    const { orgId } = org.organization;
    setOrgIdOrg(orgId);
    setCurrentOrg(orgName);
    setShowTooltip(true);
  };

  const renderLine = (s, sIndex) => {
    const name = s.organization?.name ?? '';
    if (selectAll || (subClientsCheckBox[name] && !selectNone)) {
      return (
        <Line
          activeDot={{
            onMouseOver(e, payload) { customMouseOver(e, payload, s) },
            r: s.organization.name === currentSubOrg ? 6 : null,
          }}
          isAnimationActive={false}
          onMouseOver={(e) => setCurrentSubOrg(e.name)}
          dataKey="count"
          data={s.monthCounts}
          name={s.organization?.name}
          dot={false}
          key={s.organization?.name}
          stroke={COLORS[sIndex]}
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    if (!isLoadingTransmissionSponsor && transmissionSponsorData) {
      const { wpTransmissionCountBySponsor } = transmissionSponsorData;
      if (wpTransmissionCountBySponsor && wpTransmissionCountBySponsor.length > 0) {
        getSubClientsData(wpTransmissionCountBySponsor);
        getDataBarChart(wpTransmissionCountBySponsor);
        wpTransmissionCountBySponsor.forEach((organization) => {
          sumTotalTransmissions(organization?.monthCounts);
        });
      }
      monthList();
    }
  }, [transmissionSponsorData, isLoadingTransmissionSponsor]);

  useEffect(() => {
    if (!isLoadingTransmissionVendor && transmissionVendorData) {
      const { wpTransmissionCountByVendor } = transmissionVendorData;
      if (wpTransmissionCountByVendor && wpTransmissionCountByVendor.length > 0) {
        getSubClientsData(wpTransmissionCountByVendor);
        getDataBarChart(wpTransmissionCountByVendor);
        wpTransmissionCountByVendor.forEach((organization) => {
          sumTotalTransmissions(organization?.monthCounts);
        });
      }
      monthList();
    }
  }, [transmissionVendorData, isLoadingTransmissionVendor]);

  const customTooltip = () => {
    if (showTooltip) {
      return (
        <StyledTooltip>
          <Stack>
            <Text size="small">
              <Text variant="bold" size="small">{totalTransByMonth}&nbsp; </Text>
              Transmissions in {currentMonth} { currentYear}{' '}
              {' '} {currentOrg}
            </Text>
            <ButtonLink
              onClick={() => {
                setShowTooltip(false);
                setIsOpenPanel(true);
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
    if (isLoadingTransmissionSponsor) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading visualization page" />
        </Spacing>
      );
    }

    if (graphicType?.key === 'barchart') {
      return (
        <Spacing margin={{ left: 'normal', top: 'double' }}>
          <ResponsiveContainer width="95%" height={400}>
            <BarChart
              width={1070}
              height={400}
              data={subClientBarChart}
              barCategoryGap={55}
            >
              <XAxis dataKey="month" tick={false} />
              <YAxis />
              <Tooltip
                cursor={false}
                content={customTooltip}
                position={{ x: tooltipPosition.x - 115, y: tooltipPosition.y - 50 }}
                wrapperStyle={{ pointeEvents: 'auto' }}
              />
              {subClients.map((s, i) => subClientsCheckBox[s.organization?.name ?? '']
                // eslint-disable-next-line no-return-assign
                && (
                  <Bar
                    key={`${s.organization?.orgId}-${i}`}
                    dataKey={s.organization?.name}
                    stackId="a"
                    fill={COLORS[i]}
                    onMouseOver={(data) => {
                      customMouseOverBarchart(data, subClients[i], s.organization?.name)
                    }}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        </Spacing>
      )
    }

    return (
      <Spacing margin={{ left: 'double', top: 'double' }}>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart
            width={600}
            height={400}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <XAxis
              dataKey="month"
              allowDuplicatedCategory={false}
              tick={false}
              padding={{ left: 37, right: 40 }}
            />
            <YAxis
              dataKey="count"
              padding={{ top: 40, bottom: 0 }}
            />
            <Tooltip
              cursor={false}
              content={customTooltip}
              position={{ x: tooltipPosition.x - 98, y: tooltipPosition.y - 88 }}
              wrapperStyle={{ pointeEvents: 'auto' }}
            />
            {subClients.map((s, sIndex) => renderLine(s, sIndex))}
          </LineChart>
        </ResponsiveContainer>
      </Spacing>
    );
  };

  const renderDownloadLink = (totalRecords: number): ReactElement => {
    const dateFormat = "yyyy-MM-dd'T'HH:mm:ss";
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (totalRecords > 0) {
      let url = `${serverUrl}excel/`;
      if (typeOfTransmissions?.key === 'vendor') {
        url += 'transmissionCountByVendor'
      } else {
        url += 'transmissionCountBySponsor'
      }
      const rangeStart = format(toUTC(startRange()), dateFormat);
      const rangeEnd = format(toUTC(endRange), dateFormat);

      url += `?orgSid=${orgSid}&rangeStart=${rangeStart}&rangeEnd=${rangeEnd}`
      if (graphicType?.key === 'barchart') {
        url += '&chartType=bar'
      } else {
        url += '&chartType=line'
      }
      return (
        <DownloadLink
          target="_new"
          href={url}
          title="Download chart as Excel"
        >
          <Icon iconName="ExcelDocument" /> Download
        </DownloadLink>
      );
    }

    return <span />;
  };

  const typeTransmissions = [
    { key: 'vendor', text: 'Transmissions by vendor per month' },
    { key: 'sponsor', text: 'Transmissions by sponsor per month' },
  ];

  const graphicOptions = [
    { key: 'linechart', text: 'Line chart' },
    { key: 'barchart', text: 'Stacked bar chart' },
  ]

  return (
    <LayoutDashboard id="PageVisualizations" menuOptionSelected={ROUTES.ROUTE_VISUALIZATIONS.API_ID}>
      <PageHeader>
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__Page__Title_Visualizations" title="Visualizations" />
            </Column>
            <Column sm="6" right>
              <Text size="large">
                { renderDownloadLink(countTotal.length) }
              </Text>
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <StyledTransmissionsType
                dropdownWidth="auto"
                label=""
                selectedKey={typeOfTransmissions ? typeOfTransmissions.key : undefined}
                options={typeTransmissions}
                onChange={(e, _newValue) => {
                  if (_newValue?.key !== typeOfTransmissions?.key) {
                    setCountTotal(new Array(...INITIAL_COUNT_TOTAL));
                    setCountMonth(new Array(...INITIAL_COUNT_TOTAL));
                    setTypeOfTransmissions(_newValue);
                  }
                }}
              />
            </Column>
            <Column lg="6" right>
              <StyledTransmissionsType
                label=""
                defaultSelectedKey="linechart"
                selectedKey={graphicType ? graphicType.key : undefined}
                options={graphicOptions}
                onChange={(e, _newValue) => {
                  if (_newValue?.key !== graphicType?.key) {
                    setGraphicType(_newValue);
                  }
                }}
              />
            </Column>
          </Row>
          <Row>
            {renderChart()}
          </Row>
          <Row>
            <Spacing margin={{ left: 'normal' }}>
              <StyledTotal
                lineChart={graphicType?.key !== 'barchart'}
              >
                {months.map((month, monthIndex) => (
                  <Spacing padding={{ left: 'double' }} key={monthIndex}>
                    {months.length - 1 === monthIndex ? (
                      <CurrentMonth>
                        {month}
                      </CurrentMonth>
                    ) : (
                      <div>
                        {monthIndex > monthInCurrent ? (
                          <Text variant="bold">
                            {month}
                          </Text>

                        ) : (
                          <PriorYearMonth>
                            {month}
                          </PriorYearMonth>
                        )}
                      </div>
                    )}
                  </Spacing>
                ))}
              </StyledTotal>
            </Spacing>
          </Row>
          <Row>
            <Spacing margin={{ top: 'normal', bottom: 'normal', left: 'normal' }}>
              <StyledTotal
                background={true}
                lineChart={graphicType?.key !== 'barchart'}
              >
                <span style={{ position: 'absolute', left: '70px', fontWeight: 500 }}>Totals</span>
                {countMonth.map((count, countIndex) => (
                  <Spacing padding={{ left: 'double' }} key={countIndex}>
                    <Text>
                      {count}
                    </Text>
                  </Spacing>
                ))}
              </StyledTotal>
            </Spacing>
          </Row>
          <Row>
            <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
              <Stack horizontal={true}>
                {subClients.length > 1 && subClients.map((subC, subCIndex) => (
                  <div key={subCIndex}>
                    <StyledCheckbox
                      key={`${subC?.organization?.name}-${subCIndex + 1}`}
                      label={subC?.organization?.name ?? ''}
                      checked={subClientsCheckBox[subC.organization?.name ?? '']}
                      onChange={(event, isChecked) => {
                        setSubClientsCheckBox({
                          ...subClientsCheckBox,
                          [subC?.organization?.name ?? '']: isChecked,
                        });
                        setSelectNone(false);
                        setSelectAll(false);
                        currentTotalTransmissions(subC, isChecked);
                      }}
                      color={COLORS[subCIndex]}
                    />
                  </div>
                ))}
              </Stack>
            </Spacing>
          </Row>
          <Row>
            {subClients.length > 1 && (
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
            )}
          </Row>
        </Container>
      </PageBody>
      {isOpenPanel && (
        <VisualizationPanel
          isPanelOpen={isOpenPanel}
          closePanel={setIsOpenPanel}
          orgName={currentOrg}
          orgId={orgIdOrg}
          currentMonth={shortMonths.indexOf(currentMonth)}
          typeTransmissions={typeOfTransmissions?.key}
        />
      )}
    </LayoutDashboard>
  );
};

export { VisualizationsPage };

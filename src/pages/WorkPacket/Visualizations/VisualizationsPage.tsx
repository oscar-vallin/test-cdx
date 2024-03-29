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
  Icon,
} from '@fluentui/react';
import {
  Organization,
  useWpTransmissionCountBySponsorLazyQuery,
  useWpTransmissionCountByVendorLazyQuery,
  WpTransmissionSummary,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { Text, PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTES } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useThemeStore } from 'src/store/ThemeStore';
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

const styles = {
  marginLeft: '43px',
  paddingLeft: '15px',
};

const VisualizationsPage = () => {
  const monthInCurrent = 0;
  const ThemeStore = useThemeStore();
  const { orgSid } = useOrgSid();
  const [series, setSeries] = useState<WpTransmissionSummary[]>([]);
  const [barChartSeries, setBarChartSeries] = useState<any[]>([]);
  const [typeOfTransmissions, setTypeOfTransmissions] = useState<string | undefined>('sponsor');
  const [graphicType, setGraphicType] = useState<string | undefined>('linechart');
  const [countMonth, setCountMonth] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [countTotal, setCountTotal] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [orgsSelected, setOrgsSelected]: any = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectNone, setSelectNone] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [selectedOrgSid, setSelectedOrgSid] = useState<string | undefined | null>();
  const [selectedOrg, setSelectedOrg] = useState<Organization | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState(0);
  const [totalTransByMonth, setTotalTransByMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({
    y: 0,
    x: 0,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeLine, setActiveLine] = useState('');

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
    if (typeOfTransmissions === 'vendor') {
      transmissionCountByVendor({
        variables: {
          orgSid,
          filter: {
            dateRange: {
              rangeStart: startRange(),
              rangeEnd: endRange,
            },
          },
        },
      })
      return;
    }
    transmissionCountBySponsor({
      variables: {
        orgSid,
        filter: {
          dateRange: {
            rangeStart: startRange(),
            rangeEnd: endRange,
          },
        },
      },
    });
  };

  const handleSubClientOfCheckbox = (currentState: boolean) => {
    if (currentState) {
      series.forEach(({ organization }) => setOrgsSelected((prevState) => ({ ...prevState, [organization?.orgId ?? '']: true })));
      return;
    }

    series.forEach(({ organization }) => {
      setOrgsSelected((prevState) => ({ ...prevState, [organization?.orgId ?? '']: false }));
    });
  };

  useEffect(() => {
    fetchData();
  }, [typeOfTransmissions]);

  const monthList = () => {
    const m: string[] = [];
    let i = CURRENT_MONTH + 1;
    while (m.length < 11) {
      if (i > 11) {
        i = 0;
      }
      m.push(shortMonths[i]);
      i++;
    }
    m.push(shortMonths[CURRENT_MONTH]);
    return m;
  };

  const months = monthList();

  const setLineChartData = (data: WpTransmissionSummary[]) => {
    setSeries([]);
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const orgId = data[i].organization?.orgId ?? '';
        setOrgsSelected((prevState) => ({
          ...prevState,
          [orgId]: true,
        }));
      }
      setSeries(data);
    }
  };

  const setBarChartData = (data: WpTransmissionSummary[]) => {
    const orderedMonths = months;
    setBarChartSeries([]);
    const chartData: any[] = [];
    let _data = {};
    for (let month = 0; month < orderedMonths.length; month++) {
      _data = {};
      _data['month'] = orderedMonths[month];
      chartData.push(_data);
    }

    for (let i = 0; i < data.length; i++) {
      const monthCounts = data[i].monthCounts ?? [];
      for (let m = 0; m < monthCounts.length; m++) {
        const index = chartData.map((object) => object.month)
          .indexOf(shortMonths[monthCounts[m].month - 1]);
        chartData[index][data[i].organization?.orgId] = monthCounts[m].count;
        chartData[index]['year'] = monthCounts[m].year;
      }
    }
    setBarChartSeries(chartData);
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

  const customMouseOver = (e, payload, s: WpTransmissionSummary) => {
    const { count, month, year } = payload.payload;
    setTotalTransByMonth(count);
    setCurrentYear(year);
    setCurrentMonth(shortMonths[month - 1]);
    setTooltipPosition({
      x: payload.cx,
      y: payload.cy,
    });
    setSelectedOrg(s.organization);
    if (typeOfTransmissions === 'vendor') {
      setSelectedOrgSid(orgSid);
    } else {
      setSelectedOrgSid(s.organization.sid);
    }
    setShowTooltip(true);
  };

  const customMouseOverBarchart = (data, org: Organization) => {
    setTotalTransByMonth(data[org?.orgId])
    setCurrentMonth(data.month);
    setCurrentYear(data.year);
    setTooltipPosition({
      x: data.x,
      y: data.y,
    });
    setSelectedOrg(org);
    if (typeOfTransmissions === 'vendor') {
      setSelectedOrgSid(orgSid);
    } else {
      setSelectedOrgSid(org.sid);
    }
    setShowTooltip(true);
  };

  const renderLine = (s: WpTransmissionSummary, sIndex: number) => {
    const orgId = s.organization?.orgId ?? '';
    if (selectAll || (orgsSelected[orgId] && !selectNone)) {
      return (
        <Line
          activeDot={{
            onMouseOver(e, payload) { customMouseOver(e, payload, s) },
            r: s.organization.name === activeLine ? 6 : null,
          }}
          isAnimationActive={false}
          onMouseOver={(e) => setActiveLine(e.name)}
          dataKey="count"
          data={s.monthCounts}
          name={s.organization?.name}
          dot={false}
          key={orgId}
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
        setLineChartData(wpTransmissionCountBySponsor);
        setBarChartData(wpTransmissionCountBySponsor);
        wpTransmissionCountBySponsor.forEach((organization) => {
          sumTotalTransmissions(organization?.monthCounts);
        });
      }
    }
  }, [transmissionSponsorData, isLoadingTransmissionSponsor]);

  useEffect(() => {
    if (!isLoadingTransmissionVendor && transmissionVendorData) {
      const { wpTransmissionCountByVendor } = transmissionVendorData;
      if (wpTransmissionCountByVendor && wpTransmissionCountByVendor.length > 0) {
        setLineChartData(wpTransmissionCountByVendor);
        setBarChartData(wpTransmissionCountByVendor);
        wpTransmissionCountByVendor.forEach((organization) => {
          sumTotalTransmissions(organization?.monthCounts);
        });
      }
    }
  }, [transmissionVendorData, isLoadingTransmissionVendor]);

  const customTooltip = () => {
    const showDetailsLink = totalTransByMonth > 0;
    if (showTooltip) {
      return (
        <StyledTooltip>
          <Stack>
            <Text size="small" center="true">
              <Text variant="bold" size="small">{totalTransByMonth}&nbsp; </Text>
              Transmissions in {currentMonth} { currentYear}{' '}
              {' for '} {selectedOrg?.name}
            </Text>
            {showDetailsLink && (
              <ButtonLink
                onClick={() => {
                  setShowTooltip(false);
                  setIsOpenPanel(true);
                }}
                style={{
                  fontSize: ThemeStore.userTheme.fontSizes.small,
                }}
              >
                details
              </ButtonLink>
            )}
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

    if (graphicType === 'barchart') {
      return (
        <Spacing margin={{ left: 'normal', top: 'double' }}>
          <ResponsiveContainer width="95%" height={400}>
            <BarChart
              width={1070}
              height={400}
              data={barChartSeries}
              barCategoryGap={55}
            >
              <XAxis dataKey="month" tick={false} />
              <YAxis />
              <Tooltip
                cursor={false}
                content={customTooltip}
                position={{ x: tooltipPosition.x - 115, y: tooltipPosition.y - 50 }}
                wrapperStyle={{ pointeEvents: 'auto' }}
                isAnimationActive={false}
              />
              {series.map((s, i) => orgsSelected[s.organization?.orgId ?? '']
                && (
                  <Bar
                    key={`${s.organization?.orgId}-${i}`}
                    dataKey={s.organization?.orgId}
                    stackId="a"
                    fill={COLORS[i]}
                    onMouseOver={(data) => {
                      customMouseOverBarchart(data, series[i].organization)
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
              isAnimationActive={false}
            />
            {series.map((s, sIndex) => renderLine(s, sIndex))}
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
      if (typeOfTransmissions === 'vendor') {
        url += 'transmissionCountByVendor'
      } else {
        url += 'transmissionCountBySponsor'
      }
      const rangeStart = format(toUTC(startRange()), dateFormat);
      const rangeEnd = format(toUTC(endRange), dateFormat);

      url += `?orgSid=${orgSid}&rangeStart=${rangeStart}&rangeEnd=${rangeEnd}`
      if (graphicType === 'barchart') {
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
                selectedKey={typeOfTransmissions}
                options={typeTransmissions}
                onChange={(e, _newValue) => {
                  if (_newValue?.key !== typeOfTransmissions) {
                    setCountTotal(new Array(...INITIAL_COUNT_TOTAL));
                    setCountMonth(new Array(...INITIAL_COUNT_TOTAL));
                    setTypeOfTransmissions(_newValue?.key?.toString());
                  }
                }}
              />
            </Column>
            <Column lg="6" right>
              <StyledTransmissionsType
                label=""
                selectedKey={graphicType}
                options={graphicOptions}
                onChange={(e, _newValue) => {
                  if (_newValue?.key !== graphicType) {
                    setGraphicType(_newValue?.key?.toString());
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
                lineChart={graphicType !== 'barchart'}
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
                lineChart={graphicType !== 'barchart'}
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
                {series.length > 1 && series.map((subC, subCIndex) => (
                  <div key={subCIndex}>
                    <StyledCheckbox
                      key={`${subC?.organization?.orgId}-${subCIndex + 1}`}
                      label={subC?.organization?.name ?? ''}
                      checked={orgsSelected[subC.organization?.orgId ?? '']}
                      onChange={(event, isChecked) => {
                        setOrgsSelected({
                          ...orgsSelected,
                          [subC?.organization?.orgId ?? '']: isChecked,
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
            {series.length > 1 && (
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
          parentOrgSid={orgSid}
          orgSid={selectedOrgSid ?? ''}
          orgName={selectedOrg?.name ?? ''}
          orgId={typeOfTransmissions === 'sponsor' ? selectedOrg?.orgId : undefined}
          vendorId={typeOfTransmissions === 'vendor' ? selectedOrg?.orgId : undefined}
          currentMonth={shortMonths.indexOf(currentMonth)}
          currentYear={currentYear}
          typeTransmissions={typeOfTransmissions}
        />
      )}
    </LayoutDashboard>
  );
};

export { VisualizationsPage };

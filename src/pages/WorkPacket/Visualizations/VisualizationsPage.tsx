import { useState, useEffect } from 'react';
import {
  LineChart,
  BarChart,
  Bar,
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
  IDropdownOption,
} from '@fluentui/react';
import {
  useWpTransmissionCountBySponsorLazyQuery,
  useWpTransmissionCountByVendorLazyQuery,
  Organization,
} from 'src/data/services/graphql';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTES } from 'src/data/constants/RouteConstants'
import { LayoutDashboard } from 'src/layouts/LayoutDashboard'
import { useOrgSid } from 'src/hooks/useOrgSid';
import { endOfMonth } from 'date-fns';
import { PageBody } from 'src/components/layouts/Column';
import { ButtonLink } from 'src/components/buttons';
import { ThemeStore } from 'src/store/ThemeStore';
import { theme } from 'src/styles/themes/theme';
import {
  StyledCheckbox,
  StyledTooltip,
  StyledTotal,
  StyledTransnmissionsType,
} from './Visualizations.style';
import { VisualizationPanel } from './visualizationPanel';

export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const INITIAL_COUNT_TOTAL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const colors = ['transparent', 'blue', 'green', 'yellow', 'gray', 'pink'];
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
  const [typeOfTransmissions, setTypeOfTransmissions] = useState<IDropdownOption>();
  const [graphicType, setGraphicType] = useState<IDropdownOption>();
  const [subClientBarChart, setSubClientsBarChart] = useState<any[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [monthIncurrent, setMonthInCurrent] = useState(0);
  const [countMonth, setCountMonth] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [countTotal, setCountTotal] = useState(new Array(...INITIAL_COUNT_TOTAL));
  const [yAxisValue, setYAxisValue] = useState(0);
  const [subClientsCheckBox, setSubClientsCheckBox] = useState({
    default: true,
  });
  const [selectAll, setSelectAll] = useState(false);
  const [selectNone, setSelectNone] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [orgIdOrg, setOrgIdOrg] = useState('');
  const [currentOrg, setCurrentOrg] = useState();
  const [totalTransByMonth, setTotalTransByMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({
    y: 0,
    x: 0,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const end = endOfMonth(new Date('2022-11-30T06:00:00.000Z'));
  const [
    transmissioncountBySponsor,
    { data: transmissionSponsorData, loading: isLoadingTransmissionSponsor },
  ] = useWpTransmissionCountBySponsorLazyQuery();

  const [
    transmissioncountByVendor,
    { data: transmissionVendorData, loading: isLoadingTransmissionVendor },
  ] = useWpTransmissionCountByVendorLazyQuery();

  const fetchData = () => {
    let s = new Date();
    s = new Date(s.getFullYear(), 0);
    if (typeOfTransmissions?.key === 'vendor') {
      transmissioncountByVendor({
        variables: {
          orgSid,
          dateRange: {
            rangeStart: s,
            rangeEnd: end,
          },
        },
      })
      return;
    }
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

    subClients.forEach(({ name }, index) => {
      if (index > 0) {
        setSubClientsCheckBox((prevState) => ({ ...prevState, [name ?? '']: false }));
      }
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

  const defaultXValues = () => {
    const orderedMonth = monthList();
    const DefaultSubClient = {
      name: 'default',
      data: [
        { month: orderedMonth[0], count: 0, year: 0 },
        { month: orderedMonth[1], count: 0, year: 0 },
        { month: orderedMonth[2], count: 0, year: 0 },
        { month: orderedMonth[3], count: 0, year: 0 },
        { month: orderedMonth[4], count: 0, year: 0 },
        { month: orderedMonth[5], count: 0, year: 0 },
        { month: orderedMonth[6], count: 0, year: 0 },
        { month: orderedMonth[7], count: 0, year: 0 },
        { month: orderedMonth[8], count: 0, year: 0 },
        { month: orderedMonth[9], count: 0, year: 0 },
        { month: orderedMonth[10], count: 0, year: 0 },
        { month: orderedMonth[11], count: 0, year: 0 }],
    };
    setSubClients((prevState) => prevState.concat(DefaultSubClient));
  };

  const getSubClientsData = (subC) => {
    setSubClients([]);
    setSubClientsCheckBox({
      default: true,
    });
    let highestNumber = subC[0].monthCounts[0].count;
    if (subC.length > 0) {
      defaultXValues();
      for (let subClient = 0; subClient < subC.length; subClient++) {
        const currentSubClients: DataSubClientProps = {};
        currentSubClients['name'] = subC[subClient]['organization']['name'];
        currentSubClients['organization'] = subC[subClient]['organization'];
        setSubClientsCheckBox((prevState) => ({
          ...prevState,
          [subC[subClient]['organization']['name']]: true,
        }));
        const monthCounts = subC[subClient].monthCounts ?? [];
        const data: DataProps[] = [];
        if (subC[subClient].monthCounts[0].month > monthIncurrent) {
          setMonthInCurrent(subC[subClient].monthCounts[0].month);
        }
        for (let dataSClient = 0; dataSClient < monthCounts.length; dataSClient++) {
          const currentSubClient:DataProps = { month: '', count: 0, year: 0 };
          currentSubClient['month'] = shortMonths[monthCounts[dataSClient].month - 1];
          currentSubClient['count'] = monthCounts[dataSClient].count;
          if (monthCounts[dataSClient].count > highestNumber) {
            highestNumber = monthCounts[dataSClient].count;
          }
          currentSubClient['year'] = monthCounts[dataSClient].year;
          data.push(currentSubClient)
        }
        currentSubClients['data'] = data;
        setSubClients((prevState) => prevState.concat(currentSubClients));
      }
      setYAxisValue(highestNumber + 5)
    }
  };

  const getdataBarChart = (subC) => {
    const orderedMonth = monthList();
    setSubClientsBarChart([]);
    let highestNumber = subC[0].monthCounts[0].count
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
        if (monthCounts[m].count > highestNumber) {
          highestNumber = monthCounts[m].count;
        }
      }
    }
    setSubClientsBarChart(subClientdata);
  };

  const sumTotalTransmissions = (sdata) => {
    const firstMonth = sdata[0].month
    const aux = 11 - CURRENT_MONTH + firstMonth - 1;
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

  const customMouseOverBarchart = (data, org, orgName) => {
    setTotalTransByMonth(data[orgName])
    setCurrentMonth(data.month);
    setTooltipPosition({
      x: data.x,
      y: data.y,
    });
    const { orgId } = org.organization;
    setOrgIdOrg(orgId);
    setCurrentOrg(orgName);
    setShowTooltip(true);
  };

  const renderLine = (s: DataSubClientProps, sIndex) => {
    const name = s.name ?? '';
    if (selectAll || (subClientsCheckBox[name] && !selectNone)) {
      return (
        <Line
          activeDot={{
            onMouseOver(e, payload) { customMouseOver(e, payload, s) },
            r: sIndex === 0 ? 0 : 6,
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
    if (!isLoadingTransmissionSponsor && transmissionSponsorData) {
      const { wpTransmissionCountBySponsor } = transmissionSponsorData;
      if (wpTransmissionCountBySponsor && wpTransmissionCountBySponsor.length > 0) {
        getSubClientsData(wpTransmissionCountBySponsor);
        getdataBarChart(wpTransmissionCountBySponsor);
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
        getdataBarChart(wpTransmissionCountByVendor);
        wpTransmissionCountByVendor.forEach((organization) => {
          sumTotalTransmissions(organization?.monthCounts);
        });
      }
      monthList();
    }
  }, [transmissionVendorData, isLoadingTransmissionVendor]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Custooltip = () => {
    if (showTooltip) {
      const year = new Date().getFullYear();
      return (
        <StyledTooltip>
          <Stack>
            <Text variant="small">
              <Text style={{ fontWeight: 'bold' }} variant="small">{totalTransByMonth} </Text>
              Transmissions in {currentMonth} { year}{' '}
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
      const sc = Object.keys(subClientsCheckBox);
      return (
        <Spacing margin={{ left: 'normal', top: 'double' }}>
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
              content={<Custooltip />}
              position={{ x: tooltipPosition.x - 115, y: tooltipPosition.y - 50 }}
              wrapperStyle={{ pointeEvents: 'auto' }}
            />
            {sc.map((s, i) => subClientsCheckBox[s]
              // eslint-disable-next-line no-return-assign
              && (
                <Bar
                  key={`${s}-${i}`}
                  dataKey={s}
                  stackId="a"
                  fill={colors[i]}
                  onMouseOver={(data) => {
                    customMouseOverBarchart(data, subClients[i], s)
                  }}
                />
              ))}
          </BarChart>
        </Spacing>
      )
    }

    return (
      <Spacing margin={{ left: 'normal', top: 'double' }}>
        <LineChart
          width={1070}
          height={400}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <XAxis
            dataKey="month"
            allowDuplicatedCategory={false}
            tick={false}
          />
          <YAxis
            dataKey="count"
            domain={
              [
                0,
                yAxisValue,
              ]
            }
          />
          <Tooltip
            cursor={false}
            content={<Custooltip />}
            position={{ x: tooltipPosition.x - 98, y: tooltipPosition.y - 88 }}
            wrapperStyle={{ pointeEvents: 'auto' }}
          />
          {subClients.map((s, sIndex) => renderLine(s, sIndex))}
        </LineChart>
      </Spacing>
    );
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
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Visualizations" title="Visualizations" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <StyledTransnmissionsType
                dropdownWidth="auto"
                label=""
                defaultSelectedKey="sponsor"
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
              <StyledTransnmissionsType
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
                horizontal={true}
                horizontalAlign="center"
                linechart={graphicType?.key !== 'barchart'}
              >
                {months.map((month, monthIndex) => (
                  <Spacing padding={{ left: 'double' }} key={monthIndex}>
                    {months.length - 1 === monthIndex ? (
                      <Text
                        style={{ color: ThemeStore.userTheme.colors.themePrimary, fontWeight: 500 }}
                      >
                        {month}
                      </Text>
                    ) : (
                      <div>
                        {monthIndex > monthIncurrent ? (
                          <Text
                            style={{ color: theme.colors.neutralPrimary, fontWeight: 500 }}
                          >
                            {month}
                          </Text>

                        ) : (
                          <Text
                            style={{ color: theme.colors.neutralTertiary, fontWeight: 500 }}
                          >
                            {month}
                          </Text>
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
                horizontal={true}
                horizontalAlign="center"
                backGround={true}
                linechart={graphicType?.key !== 'barchart'}
              >
                <span style={{ position: 'absolute', left: '35px', fontWeight: 500 }}>Totals</span>
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
                {subClients.map((subC, subCIndex) => (
                  <div key={subCIndex}>
                    {subCIndex > 0 && (
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
                    )}
                  </div>
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

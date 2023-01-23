import React, { useEffect, useState, useRef } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  DirectionalHint,
  FontIcon,
  IColumn,
  IconButton,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  TooltipHost,
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { ROUTE_FULL_SPEC_LIBRARY } from 'src/data/constants/RouteConstants';
import {
  CdxWebCommandType,
  useVendorSpecsLazyQuery,
  useDeleteVendorSpecMutation,
  useUpdateGeneralVendorSpecCommentsMutation,
  VendorSpecSummary,
  WebCommand,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useHistory } from 'react-router-dom';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Save20Filled } from '@fluentui/react-icons';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import { useThemeStore } from 'src/store/ThemeStore';
import { ButtonLink } from 'src/components/buttons';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useNotification } from 'src/hooks/useNotification';
import { SpecPanel } from './SpecPanel';
import { CardStyled, CircleStyled, ContainerInput } from '../Xchanges/XchangePage.styles';

const defaultDialogProps: DialogYesNoProps = {
  id: '__SpecLibrary_Dlg',
  open: false,
  title: '',
  message: '',
  labelYes: 'Yes',
  labelNo: 'No',
  highlightNo: true,
  highlightYes: false,
};

const FullSpecLibraryPage = () => {
  const { orgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const history = useHistory();
  const Toast = useNotification();
  const ActiveDomain = useActiveDomainUseCase();
  const [vendors, setVendors] = useState<VendorSpecSummary[] | null>();
  const refItems = useRef(vendors);
  const [searchFullSpec, setSearchFullSpec] = useState<string>('');
  const [filterFullSpec, setFilterFullSpec] = useState<VendorSpecSummary[]>([]);
  const [name, setName] = useState('');
  const [deleteDeactivate, setDeleteDeactivate] = useState<boolean>();
  const [sid, setSid] = useState('');
  const [comments, setComments] = useState('');
  const [editComments, setEditComments] = useState(false);
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [refreshPage, setRefreshPage] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isSorted, setIsSorted] = useState(0);
  const [sortedDescending, setSortedDescending] = useState(false);
  const [increaseDelay, setIncreasedelay] = useState(1500);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [fullVendorsSpecs,
    {
      data: vendorsSpecsData,
      loading: isLoadingvendorsSpecs,
    },
  ] = useVendorSpecsLazyQuery();
  const [deleteVendorSpec,
    {
      data: deleteVendorData,
      loading: isLoadingDeleteVendor,
    },
  ] = useQueryHandler(useDeleteVendorSpecMutation);
  const [updateComments,
    {
      data: updateCommentsData,
      loading: isLoadingUpdateComments,
    },
  ] = useQueryHandler(useUpdateGeneralVendorSpecCommentsMutation);

  const fetchData = () => {
    fullVendorsSpecs({
      variables: {
        orgSid,
      },
    });
  };

  const updateItems = (newItems) => {
    refItems.current = newItems;
    setVendors(newItems);
  }

  useEffect(() => {
    setRefreshPage(false);
    fetchData();
  }, [refreshPage]);

  const filterFullSpecData = () => {
    setFilterFullSpec([]);
    const search = new RegExp(searchFullSpec, 'i');
    vendors?.forEach((vendor: VendorSpecSummary) => {
      const currentName = vendor.name ?? '';
      if (currentName) {
        if (search.test(currentName)) {
          setFilterFullSpec((currentVendors) => currentVendors.concat(vendor));
        }
      }
    });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (vendors && vendors?.length > 0) {
      const timer = setTimeout(() => filterFullSpecData(), 300);
      return () => clearTimeout(timer);
    }
  }, [searchFullSpec]);

  useEffect(() => {
    if (!isLoadingvendorsSpecs && vendorsSpecsData) {
      const { vendorSpecs } = vendorsSpecsData;
      setVendors(vendorSpecs?.nodes);
      setComments(vendorSpecs?.comments ?? '');
      updateItems(vendorSpecs?.nodes);
      if (vendorSpecs?.listPageInfo?.pageCommands) {
        const pageCommands = vendorSpecs?.listPageInfo.pageCommands;
        const _createCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Create);
        setCreateCmd(_createCmd);
        const _deleteCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Delete);
        setDeleteCmd(_deleteCmd);
        const _updateCmd = pageCommands.find((cmd) => cmd.commandType === CdxWebCommandType.Update);
        setUpdateCmd(_updateCmd);
      }
    }
  }, [vendorsSpecsData, isLoadingvendorsSpecs]);

  useEffect(() => {
    if (!isLoadingDeleteVendor && deleteVendorData) {
      setRefreshPage(true);
      Toast.success({ text: `${name} has been ${deleteDeactivate ? 'deleted' : 'deactivated'}` });
    }
  }, [deleteVendorData, isLoadingDeleteVendor]);

  useEffect(() => {
    if (!isLoadingUpdateComments && updateCommentsData) {
      setRefreshPage(true);
      setEditComments(false);
      Toast.success({ text: 'Comments saved' });
    }
  }, [updateCommentsData, isLoadingUpdateComments]);

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showDeeletDeactivateDialog = (
    implementations: number,
    currentSid: string,
  ) => {
    const updatedDialog = { ...defaultDialogProps };
    let title = 'Delete Vendor Spec?';
    let message = 'Are you sure want to delete this Vendor Spec?';
    setDeleteDeactivate(true)
    if (implementations > 0) {
      setDeleteDeactivate(false);
      title = 'Deactivate Vendor Spec?';
      message = 'This Vendor Spec has usage and can only be deactivated. Are you sure to deactivate this Vendor Spec No future xchanges can be configured to use this spec'
    }

    updatedDialog.title = title;
    updatedDialog.message = message;

    updatedDialog.onYes = () => {
      hideDialog();
      deleteVendorSpec({
        variables: {
          sid: currentSid,
        },
      });
    }
    updatedDialog.onNo = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  }

  const updateDateFormat = (date: Date) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toDateString();
    let hour = currentDate.getHours();
    let minutes: string = currentDate.getMinutes().toString();
    const format = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    hour = hour || 12;
    minutes = minutes.length < 2 ? `0${minutes}` : minutes;
    return `${formattedDate} ${hour}:${minutes}${format}`;
  };

  const tooltipHostContent = (
    lastActivity: Date,
    activityType?: string,
    currentSid?: string,
    filesProcessed?: number,
  ) => {
    const error = activityType?.trim() !== '';
    const fromDate = new Date(lastActivity);
    let currentColor: string;
    if (activityType === 'UAT') {
      currentColor = 'purple';
    } else if (activityType === 'PROD') {
      currentColor = 'blue';
    } else {
      currentColor = 'orange';
    }

    const currentDate = updateDateFormat(lastActivity);
    const endDate = yyyyMMdd(fromDate);
    const endFormatted = new Date(endDate);
    endFormatted.setDate(endFormatted.getDate() - 29);
    const startDate = yyyyMMdd(endFormatted);
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {error && (
          <>
            <span style={{ color: currentColor, fontWeight: 'bold' }}> {filesProcessed} </span>
            {activityType} files have been processed in the last 30 days <br />
            <span style={{ marginLeft: '20px' }}>Last Run: {currentDate}</span> <br /> <br />
            <ButtonLink
              style={{ marginLeft: '70px' }}
              onClick={() => {
                ActiveDomain.setCurrentOrg(currentSid);
                history.push(`/file-status?endDate=${endDate}&orgSid=6&startDate=${startDate}`);
              }}
            >
              {' '}
              Click for details
            </ButtonLink>
          </>
        )}
      </>
    );
  };

  const onRenderItemColum = (item:VendorSpecSummary, itemIndex?: number, column?: IColumn) => {
    if (item && column?.key === 'name') {
      const value = item[column.key];
      return (
        <ButtonLink
          onClick={() => {
            setSid(item.sid ?? '');
            setIsOpenPanel(true);
          }}
        >{value}
        </ButtonLink>
      );
    }

    const uatFilesProcessed = item?.uatActivity.filesProcessed;
    const testFilesProcessed = item?.testActivity.filesProcessed;
    const prodFilesProcessed = item?.prodActivity.filesProcessed;

    return (
      <Stack
        horizontal
        horizontalAlign="start"
        tokens={{
          childrenGap: 5.5,
          padding: '0px 0px 0px 10px',
        }}
      >
        {column?.key === 'integratedClients' && (
        <ButtonLink>{item.integratedClients.length}</ButtonLink>
        )}
        {column?.key === 'active' && (
          <>
            {uatFilesProcessed && uatFilesProcessed > 0 ? (
              <TooltipHost
                content={item.sid ? tooltipHostContent(
                  item?.uatActivity?.lastActivity,
                  'UAT',
                  item?.sid ?? '',
                  uatFilesProcessed,
                ) : undefined}
                directionalHint={DirectionalHint.topRightEdge}
                closeDelay={increaseDelay}
                onMouseOver={() => setIncreasedelay(2000)}
                onMouseLeave={() => setIncreasedelay(0)}
              >
                <CircleStyled total={!item.sid} color="purple">{uatFilesProcessed}</CircleStyled>
              </TooltipHost>
            ) : (
              <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
            )}
            {testFilesProcessed && testFilesProcessed > 0 ? (
              <TooltipHost
                content={item.sid ? tooltipHostContent(
                  item?.testActivity?.lastActivity,
                  'TEST',
                  item?.sid ?? '',
                  testFilesProcessed,
                ) : undefined}
                directionalHint={DirectionalHint.topRightEdge}
                closeDelay={increaseDelay}
                onMouseOver={() => setIncreasedelay(2000)}
                onMouseLeave={() => setIncreasedelay(0)}
              >
                <CircleStyled total={!item.sid} color="orange">{testFilesProcessed}</CircleStyled>
              </TooltipHost>
            ) : (
              <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
            )}
            {prodFilesProcessed && prodFilesProcessed > 0 ? (
              <TooltipHost
                content={item.sid ? tooltipHostContent(
                  item?.prodActivity?.lastActivity,
                  'PROD',
                  item?.sid ?? '',
                  prodFilesProcessed,
                ) : undefined}
                directionalHint={DirectionalHint.topRightEdge}
                closeDelay={increaseDelay}
                onMouseOver={() => setIncreasedelay(2000)}
                onMouseLeave={() => setIncreasedelay(0)}
              >
                <CircleStyled total={!item.sid} color="blue">{prodFilesProcessed}</CircleStyled>
              </TooltipHost>
            ) : (
              <CircleStyled total={!item?.sid} color="gray">0</CircleStyled>
            )}
          </>
        )}
      </Stack>
    )
  }

  const onRenderAction = (item: VendorSpecSummary) => {
    const styles = {
      cursor: 'pointer',
      color: ThemeStore.userTheme.colors.themePrimary,
    };
    let active = 'Inactive';
    const implementations = item.integratedClients && item.integratedClients.length;
    if (item.active) {
      active = implementations > 0 ? 'Deactivate' : 'Delete';
    }
    if (deleteCmd) {
      return (
        <TooltipHost content={active} directionalHint={DirectionalHint.rightCenter}>
          <FontIcon
            iconName="Trash"
            style={styles}
            onClick={() => {
              setName(item.name ?? '');
              showDeeletDeactivateDialog(implementations, item.sid ?? '');
            }}
          />
        </TooltipHost>
      )
    }
    return null;
  };

  function copyAndSort <T>(items:T[], columnKey?: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    const itemsSorted = items.slice(0)
      .sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    return itemsSorted;
  }

  const columnClick = (event, column: IColumn) => {
    let { isSortedDescending } = column;
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }
    const _vendors: VendorSpecSummary[] = copyAndSort(refItems.current ?? [], column.fieldName ?? '', isSortedDescending);
    setVendors(_vendors);
    setIsSorted((prevState) => prevState + 1);
    setSortedDescending(true);
  };

  useEffect(() => {
    if (isSorted === 2) {
      setVendors(refItems.current);
      setIsSorted(0);
      setSortedDescending(false);
    }
  }, [isSorted]);

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      minWidth: 150,
      maxWidth: 400,
      isSorted: true,
      onColumnClick: columnClick,
      isSortedDescending: sortedDescending,
    },
    {
      name: '# Implementations',
      key: 'integratedClients',
      fieldName: 'integratedClients',
      data: 'string',
      isPadded: true,
      styles: {
        cellTitle: {
          paddingRight: '100px',
        },
      },
      minWidth: 250,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Activity',
      key: 'active',
      fieldName: 'active',
      data: 'string',
      isPadded: true,
      styles: {
        cellTitle: {
          paddingLeft: '30px',
        },
      },
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      onRender: onRenderAction,
    },
  ];

  const readonlyComments = () => {
    if (updateCmd && editComments) {
      return false;
    }
    return true;
  }

  const cardBox = () => (
    <Spacing margin={{ top: 'double' }}>
      <CardStyled>
        <ContainerInput>
          <Row>
            <Column lg="6">
              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Text variant="semiBold">Comments</Text>
              </Spacing>
            </Column>
            {updateCmd && (
            <Column lg="6" right>
              {!editComments ? (
                <IconButton
                  iconProps={{ iconName: !editComments ? 'EditSolid12' : 'disk' }}
                  style={{ marginTop: '10px' }}
                  onClick={() => {
                    setEditComments(true);
                  }}
                />
              ) : (
                <Save20Filled
                  style={{
                    color: ThemeStore.userTheme.colors.themePrimary,
                    marginTop: '14px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    updateComments({
                      variables: {
                        orgSid,
                        comments,
                      },
                    });
                  }}
                />
              )}
            </Column>
            )}
          </Row>
          <TextField
            multiline
            borderless={true}
            value={comments}
            resizable={false}
            readOnly={readonlyComments()}
            rows={7}
            onChange={(event, _newValue) => setComments(_newValue ?? '')}
          />
        </ContainerInput>
      </CardStyled>
    </Spacing>
  );

  const renderBody = () => {
    if (isLoadingvendorsSpecs) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading Specification Page" />
        </Spacing>
      );
    }

    if (filterFullSpec.length || searchFullSpec.trim() !== '') {
      return (
        <DetailsList
          items={filterFullSpec ?? []}
          columns={columns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColum}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      )
    }

    return (
      <DetailsList
        items={vendors ?? []}
        columns={columns}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={onRenderItemColum}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
      />
    );
  };

  return (
    <LayoutDashboard id="FullSpecLibraryPage" menuOptionSelected={ROUTE_FULL_SPEC_LIBRARY.API_ID}>
      <PageHeader id="__FullSpecLibraryHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page__Title_Spec_Library" title="Specification Library" />
            </Column>
            <Column lg="6" right>
              {createCmd && (
                <PrimaryButton
                  id="__CreateNewSpec"
                  iconProps={{ iconName: 'Add' }}
                  onClick={() => {
                    setSid('');
                    setIsOpenPanel(true);
                  }}
                >
                  Create new spec
                </PrimaryButton>
              )}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__FullSpecLibraryBody">
        <Spacing margin={{ top: 'double' }}>
          <Container>
            <Row>
              <Spacing margin={{ bottom: 'normal' }}>
                <Column lg="7">
                  <Text variant="semiBold">Core Specs</Text>
                </Column>
              </Spacing>
            </Row>
            <Row>
              <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
                <Column lg="9">
                  <SearchBox
                    id="FullSpec_Input-Search"
                    disabled={false}
                    styles={{ root: { width: '100%' } }}
                    value={searchFullSpec}
                    onChange={(event, newValue) => setSearchFullSpec(newValue ?? '')}
                    placeholder="Search"
                  />
                </Column>
              </Stack>
            </Row>
            <Row>
              <Column lg="9">{renderBody()}</Column>
              <Column lg="3">{cardBox()}</Column>
            </Row>
          </Container>
        </Spacing>
      </PageBody>
      <SpecPanel
        closePanel={setIsOpenPanel}
        refreshPage={setRefreshPage}
        isOpen={isOpenPanel}
        sid={sid}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  )
};

export { FullSpecLibraryPage };

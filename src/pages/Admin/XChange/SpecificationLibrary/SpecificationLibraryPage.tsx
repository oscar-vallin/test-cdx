import React, { useEffect, useRef, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  DirectionalHint,
  FontIcon,
  IColumn,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { ROUTE_VENDOR_SPEC_LIBRARY } from 'src/data/constants/RouteConstants';
import {
  CdxWebCommandType,
  useDeleteVendorSpecMutation,
  useUpdateGeneralVendorSpecCommentsMutation,
  useVendorSpecsLazyQuery,
  VendorSpecSummary,
  WebCommand,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import { useThemeStore } from 'src/store/ThemeStore';
import { ButtonLink } from 'src/components/buttons';
import { ActivityBubbles } from 'src/components/badges/Activity';
import { CardColumn, CommentCard } from 'src/components/cards';
import { DialogYesNo, DialogYesNoProps } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { SpecPanel } from '../FullSpecLibrary/SpecPanel';

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

const SpecificationLibraryPage = () => {
  const { orgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const Toast = useNotification();
  const handleError = ErrorHandler();
  const [vendors, setVendors] = useState<VendorSpecSummary[] | null>();
  const refItems = useRef(vendors);
  const [searchFullSpec, setSearchFullSpec] = useState<string>('');
  const [filterFullSpec, setFilterFullSpec] = useState<VendorSpecSummary[]>([]);
  const [specName, setSpecName] = useState('');
  const [deleteDeactivate, setDeleteDeactivate] = useState<boolean>();
  const [sid, setSid] = useState('');
  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();
  const [updateCmd, setUpdateCmd] = useState<WebCommand | null>();
  const [refreshPage, setRefreshPage] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isSorted, setIsSorted] = useState(0);
  const [sortedDescending, setSortedDescending] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogYesNoProps>(defaultDialogProps);

  const [fullVendorsSpecs,
    {
      data: vendorsSpecsData,
      loading: isLoadingVendorsSpecs,
      error: errorVendorSpecs,
    },
  ] = useVendorSpecsLazyQuery();
  const [deleteVendorSpec,
    {
      data: deleteVendorData,
      loading: isLoadingDeleteVendor,
      error: errorDeleteSpecs,
    },
  ] = useDeleteVendorSpecMutation();
  const [updateComments,
    {
      data: updateCommentsData,
      loading: isLoadingUpdateComments,
      error: errorUpdateComments,
    },
  ] = useUpdateGeneralVendorSpecCommentsMutation();

  useEffect(() => {
    handleError(errorVendorSpecs);
  }, [errorVendorSpecs]);
  useEffect(() => {
    handleError(errorDeleteSpecs);
  }, [errorDeleteSpecs]);
  useEffect(() => {
    handleError(errorUpdateComments);
  }, [errorUpdateComments]);

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
    if (!isLoadingVendorsSpecs && vendorsSpecsData) {
      const { vendorSpecs } = vendorsSpecsData;
      setVendors(vendorSpecs?.nodes);
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
  }, [vendorsSpecsData, isLoadingVendorsSpecs]);

  useEffect(() => {
    if (!isLoadingDeleteVendor && deleteVendorData) {
      setRefreshPage(true);
      Toast.success({ text: `${specName} has been ${deleteDeactivate ? 'deleted' : 'deactivated'}` });
    }
  }, [deleteVendorData, isLoadingDeleteVendor]);

  useEffect(() => {
    if (!isLoadingUpdateComments && updateCommentsData) {
      setRefreshPage(true);
      Toast.success({ text: 'Comments saved' });
    }
  }, [updateCommentsData, isLoadingUpdateComments]);

  const hideDialog = () => {
    setShowDialog(false);
  };

  const showDeleteDeactivateDialog = (
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
      }).then();
    }
    updatedDialog.onNo = () => {
      hideDialog();
    };
    setDialogProps(updatedDialog);
    setShowDialog(true);
  };

  const tooltipHostVendors = (integratedClients: string[]) => {
    if (integratedClients.length === 0) {
      return (
        <Text size="small">
          No clients are currently associated with this vendor
        </Text>
      )
    }

    return (
      <Stack>
        {integratedClients
          && integratedClients.map((vendor, vendorIndex) => (
            <span key={vendorIndex}>{vendor}</span>
          ))}
      </Stack>
    );
  };

  const onRenderItemColum = (item:VendorSpecSummary, itemIndex?: number, column?: IColumn) => {
    if (item && column?.key === 'name') {
      const value = item[column.key];
      return (
        <ButtonLink
          style={!item.active ? { color: ThemeStore.userTheme.colors.neutralQuaternary } : { color: '' }}
          onClick={() => {
            setSid(item.sid ?? '');
            setIsOpenPanel(true);
          }}
        >{value}
        </ButtonLink>
      );
    }

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
          <TooltipHost
            content={tooltipHostVendors(item?.integratedClients)}
            directionalHint={DirectionalHint.rightCenter}
          >
            <ButtonLink
              style={!item.active ? { color: ThemeStore.userTheme.colors.neutralQuaternary } : { color: '' }}
            >
              {item.integratedClients.length}
            </ButtonLink>
          </TooltipHost>
        )}
        {column?.key === 'active' && (
          <ActivityBubbles
            orgSid={orgSid}
            uat={item.uatActivity}
            test={item.testActivity}
            prod={item.prodActivity}
            total={!item.sid}
          />
        )}
      </Stack>
    )
  };

  const onRenderDeleteAction = (item: VendorSpecSummary) => {
    const styles = {
      cursor: 'pointer',
      color: ThemeStore.userTheme.colors.themePrimary,
    };
    let active = 'Inactive';
    const implementations = item.integratedClients && item.integratedClients.length;
    if (item.active) {
      active = implementations > 0 ? 'Deactivate' : 'Delete';
    }
    if (deleteCmd && item.active) {
      return (
        <TooltipHost content={active} directionalHint={DirectionalHint.rightCenter}>
          <FontIcon
            id="__specLibrary_Delete_Deactivate"
            iconName="Trash"
            style={styles}
            onClick={() => {
              setSpecName(item.name ?? '');
              showDeleteDeactivateDialog(implementations, item.sid ?? '');
            }}
          />
        </TooltipHost>
      )
    }
    if (!item.active) {
      return (
        <TooltipHost content={active} directionalHint={DirectionalHint.rightCenter}>
          <FontIcon
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: ThemeStore.userTheme.colors.neutralQuaternary,
            }}
            iconName="StatusCircleBlock"
          />
        </TooltipHost>
      );
    }
    return null;
  };

  function copyAndSort <T>(items:T[], columnKey?: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0)
      .sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
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
      onRender: onRenderDeleteAction,
    },
  ];

  const saveComment = (comment?: string | null) => {
    updateComments({
      variables: {
        orgSid,
        comments: comment,
      },
    }).then();
  };

  const renderBody = () => {
    if (isLoadingVendorsSpecs) {
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
    <LayoutDashboard id="SpecificationLibraryPage" menuOptionSelected={ROUTE_VENDOR_SPEC_LIBRARY.API_ID}>
      <PageHeader id="__SpecificationLibraryHeader">
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
                  Create Spec
                </PrimaryButton>
              )}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__SpecLibraryBody">
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
                    id="Spec_Input-Search"
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
              <Column lg="3">
                <CardColumn>
                  <CommentCard
                    id="__Comments"
                    readOnly={!updateCmd}
                    value={vendorsSpecsData?.vendorSpecs?.comments}
                    onSave={saveComment}
                  />
                </CardColumn>
              </Column>
            </Row>
          </Container>
        </Spacing>
      </PageBody>
      <SpecPanel
        closePanel={setIsOpenPanel}
        refreshPage={setRefreshPage}
        isOpen={isOpenPanel}
        sid={sid}
        orgSid={orgSid}
      />
      <DialogYesNo {...dialogProps} open={showDialog} />
    </LayoutDashboard>
  )
};

export { SpecificationLibraryPage };

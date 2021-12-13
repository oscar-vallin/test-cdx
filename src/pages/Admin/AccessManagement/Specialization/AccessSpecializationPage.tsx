/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib-commonjs/Dialog';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { EmptyState } from 'src/containers/states';
import { SpinnerSize } from '@fluentui/react';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography';
import { CreateAccessSpecializationPanel } from './CreateSpecialization';
import { Link } from '../../../../components/buttons/Link';

import {
  useAccessSpecializationsForOrgLazyQuery,
  useDeleteAccessSpecializationMutation,
} from '../../../../data/services/graphql';

import { StyledColumn, StyledCommandButton } from '../AccessManagement.styles';
import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';

const generateColumns = () => {
  const createColumn = ({ name, key }) => ({
    name,
    key,
    fieldName: key,
    data: 'string',
    isPadded: true,
    minWidth: 225,
  });

  return [createColumn({ name: 'Name', key: 'name' }), createColumn({ name: '', key: 'actions' })];
};

const _AccessManagementSpecializationPage = () => {
  const { orgSid } = useOrgSid();
  const Toast = useNotification();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedAccessId, setSelectedAccessId] = useState(0);

  const [specializations, setSpecializations] = useState<any[]>([]);
  const [accessSpecializationForOrg, { data, loading }] = useQueryHandler(useAccessSpecializationsForOrgLazyQuery);
  const [removeSpecialization, { data: removeResponse, loading: isRemovingSpecialization }] = useQueryHandler(
    useDeleteAccessSpecializationMutation
  );

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedAccessId(0);
  };

  const onRenderItemColumn = (item, index, column) => {
    switch (column.key) {
      case 'name':
        return (
          <Link
            id={`__AccessSpecialization__Name_Field_${index + 1}`}
            onClick={() => {
              setSelectedAccessId(item.sid);
              setIsPanelOpen(true);
            }}
          >
            {item.name}
          </Link>
        );
      case 'actions':
        return (
          <>
            &nbsp;
            <StyledCommandButton
              id={`DeleteBtn__${index + 1}`}
              iconProps={{ iconName: 'Delete' }}
              onClick={() => {
                setSelectedAccessId(item.sid);
                setIsConfirmationHidden(false);
              }}
            />
          </>
        );
      default:
        return item[column.key];
    }
  };

  useEffect(() => {
    accessSpecializationForOrg({
      variables: {
        orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!isRemovingSpecialization && removeResponse) {
      const name = specializations.find(({ sid }) => selectedAccessId === sid)?.name || '';

      Toast.success({ text: `Access specialization "${name}" deleted successfully` });

      setSpecializations(specializations.filter(({ sid }) => sid !== selectedAccessId));
      setSelectedAccessId(0);
    }
  }, [isRemovingSpecialization, removeResponse]);

  useEffect(() => {
    if (data) {
      setSpecializations(data.accessSpecializationsForOrg.nodes);
    }
  }, [data]);

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_SPECIALIZATION">
      <>
        <Spacing margin="double">
          {specializations.length > 0 && (
            <Row center>
              <Column lg="6">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold" id="__Page-Title">
                    Access Specializations
                  </Text>
                </Spacing>
              </Column>

              <Column lg="6" right>
                <Button
                  id="create-access-specialization"
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                    return null;
                  }}
                >
                  Create specialization
                </Button>
              </Column>
            </Row>
          )}

          {specializations.length > 0 && (
            <Row>
              <Column lg="12">
                <Spacing margin={{ top: 'normal' }}>
                  <Separator />
                </Spacing>
              </Column>
            </Row>
          )}

          <Row>
            <StyledColumn lg="12">
              {loading ? (
                <Spacing margin={{ top: 'double' }}>
                  <Spinner size={SpinnerSize.large} label="Loading access specializations" />
                </Spacing>
              ) : !specializations.length ? (
                <EmptyState
                  title="No access specializations found"
                  description="You haven't created an access specialization yet. Click the button below to create a new specialization."
                  actions={
                    <Button
                      id="create-access-specialization"
                      variant="primary"
                      onClick={() => {
                        setIsPanelOpen(true);
                        return null;
                      }}
                    >
                      Create specialization
                    </Button>
                  }
                />
              ) : (
                <DetailsList
                  items={specializations}
                  selectionMode={SelectionMode.none}
                  columns={columns}
                  layoutMode={DetailsListLayoutMode.justified}
                  onRenderItemColumn={onRenderItemColumn}
                  isHeaderVisible
                />
              )}
            </StyledColumn>
          </Row>
        </Spacing>

        <CreateAccessSpecializationPanel
          isOpen={isPanelOpen}
          onCreateSpecialization={({ name, sid }) => {
            setSpecializations([
              ...specializations,
              {
                name: name?.value || '',
                sid: sid || null,
              },
            ]);
          }}
          onUpdateSpecialization={(updatedSpecialization) => {
            setSpecializations(
              specializations.map((specialization) => {
                if (specialization.sid !== updatedSpecialization.sid) {
                  return specialization;
                }

                return {
                  name: updatedSpecialization?.name?.value || '',
                  sid: updatedSpecialization?.sid || null,
                };
              })
            );
          }}
          onDismiss={() => {
            setIsPanelOpen(false);
            setSelectedAccessId(0);
          }}
          selectedAccessId={selectedAccessId}
        />

        <Dialog
          hidden={isConfirmationHidden}
          onDismiss={hideConfirmation}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Remove policy',
            subText: `Do you really want to remove "${
              specializations.find(({ sid }) => selectedAccessId === sid)?.name || ''
            }"?`,
          }}
          modalProps={{ isBlocking: true }}
        >
          <DialogFooter>
            <PrimaryButton
              id="ConfirmationBtn"
              onClick={() => {
                removeSpecialization({
                  variables: {
                    specializationSid: selectedAccessId,
                  },
                });

                setIsConfirmationHidden(true);
              }}
              text="Remove"
            />
            <DefaultButton onClick={hideConfirmation} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </>
    </LayoutAdmin>
  );
};

const AccessManagementSpecializationPage = memo(_AccessManagementSpecializationPage);

export { AccessManagementSpecializationPage };

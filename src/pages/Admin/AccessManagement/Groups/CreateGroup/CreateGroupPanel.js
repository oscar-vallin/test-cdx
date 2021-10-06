/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { IconButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import { Spacing } from '../../../../../components/spacings/Spacing';
import { Card } from '../../../../../components/cards';
import { Button } from '../../../../../components/buttons';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography';
import { InputText } from '../../../../../components/inputs/InputText';

import { StyledCommandButton, StyledColumn } from './CreateGroupPanel.styles';

import {
  useAccessPolicyFormQuery,
  useCreateAccessPolicyMutation,
  useUpdateAccessPolicyMutation,
  useAccessPolicyLazyQuery,
} from '../../../../../data/services/graphql';
import { useOrgSid } from '../../../../../hooks/useOrgSid';

const INITIAL_STATE = {
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  serviceType: '',
  permissions: [],
};

const INITIAL_OPTIONS = {
  permissionServices: [],
  predicates: [],
  templateServices: [],
};

const parseToComboBoxOption = ({ name, value }) => ({ key: value, text: name });
const generateColumns = () => {
  const createColumn = (name) => ({
    name,
    key: name.toLowerCase(),
    fieldName: name.toLowerCase(),
    data: 'string',
    isPadded: true,
    minWidth: 225,
  });

  return [createColumn('Service'), createColumn('Facet'), createColumn('Verb'), createColumn('Actions')];
};

const CreateGroupPanel = ({ isOpen, onDismiss, onCreatePolicy, selectedPolicyId }) => {
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [options, setOptions] = useState({ ...INITIAL_OPTIONS });

  // const [apiUseAccessPolicyForm, { data }] = useAccessPolicyFormQuery();
  const [createPolicy, { data: createdPolicy, loading: isCreatingPolicy }] = useCreateAccessPolicyMutation();
  const [fetchPolicy, { data: policy }] = useAccessPolicyLazyQuery();
  const [updatePolicy] = useUpdateAccessPolicyMutation();

  useEffect(() => {
    if (isOpen && selectedPolicyId) {
      fetchPolicy({
        variables: {
          orgSid,
          policySid: selectedPolicyId,
        },
      });
    }
  }, [selectedPolicyId, isOpen]);

  useEffect(() => {
    if (policy) {
      const { amPolicy } = policy;

      setState({
        ...state,
        policySid: amPolicy.id,
        policyName: amPolicy.name,
        isTemplate: amPolicy.tmpl,
        usedAsIs: amPolicy.tmplUseAsIs,
        serviceType: amPolicy.tmplServiceType,
        permissions: (amPolicy.permissions || []).map((permission) => ({
          policySid: amPolicy.id,
          effect: permission.effect,
          predicateName: permission.predicate,
          parameterVariable: permission.predVar1,
          parameterValue: permission.predParam1,
          actions: (permission.actions || []).map((action) => ({
            facet: { key: action.facet },
            service: { key: action.service },
            verb: { key: action.verb },
            permissionSid: permission.id,
          })),
        })),
      });
    }
  }, [policy]);

  useEffect(() => {
    if (createdPolicy) {
      onCreatePolicy(createdPolicy.createAccessPolicy);
      onDismiss();
    }
  }, [createdPolicy]);

  const handleAsyncOptionChange = (attr, permissionIndex) => (option, item) => {
    setState({
      ...state,
      permissions: state.permissions.map((permission, permissionsIndex) => {
        if (permissionsIndex !== permissionIndex) {
          return permission;
        }

        return {
          ...permission,
          actions: permission.actions.map((action, actionsIndex) => {
            if (permission.actions.indexOf(item) !== actionsIndex) {
              return action;
            }

            return { ...action, [attr]: option };
          }),
        };
      }),
    });
  };

  const onRenderItemColumn =
    ({ itemColumndata, services, onServiceChange, permissionIndex }) =>
    (item, index, column) => {
      switch (column.key) {
        case 'service':
          return (
            <ComboBox
              autoComplete="off"
              selectedKey={item.service.key}
              options={services.map(parseToComboBoxOption)}
              onChange={(event, option) => onServiceChange(option, item, itemColumndata)}
              style={{ width: '100%' }}
            />
          );
        case 'actions':
          return (
            <div>
              <IconButton
                iconProps={{ iconName: 'delete' }}
                onClick={() => {
                  setState({
                    ...state,
                    permissions: state.permissions.map((permissionsItem, currIndex) => {
                      if (currIndex !== permissionIndex) {
                        return permissionsItem;
                      }

                      return {
                        ...permissionsItem,
                        actions: permissionsItem.actions.filter((action, actionIndex) => actionIndex !== index),
                      };
                    }),
                  });
                }}
              />
            </div>
          );

        default:
          break;
      }
      return <></>;
    };

  const columns = generateColumns();

  // useEffect(() => {
  //   if (isOpen) {
  //     apiUseAccessPolicyForm({ variables: { orgSid } });
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //   if (isOpen && data) {
  //     setOptions(data.accessPolicyForm);
  //   }
  // }, [data, isOpen]);

  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText={!state.policySid ? 'New Access Policy Group' : 'Update policy'}
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });
        setOptions({ ...INITIAL_OPTIONS });

        onDismiss();
      }}
    >
      <>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    required
                    label="Name"
                    placeholder="Please enter a Unifique Name"
                    value={state.policyName}
                    onChange={({ target }) => setState({ ...state, policyName: target.value })}
                  />
                </Column>
              </Row>

              {options.showTemplateSection && (
                <Row center>
                  <Column lg="12">
                    <Spacing margin={{ top: 'normal', bottom: 'small' }}>
                      <Checkbox
                        label="Is a template"
                        checked={state.isTemplate}
                        onChange={(event, isTemplate) => setState({ ...state, isTemplate })}
                      />
                    </Spacing>

                    {state.isTemplate && (
                      <Checkbox
                        label="Template can be used as is"
                        checked={state.usedAsIs}
                        onChange={(event, usedAsIs) => setState({ ...state, usedAsIs })}
                      />
                    )}
                  </Column>
                </Row>
              )}
              {options.showTemplateSection && state.usedAsIs && (
                <Row>
                  <Column lg="3">
                    <Spacing margin={{ top: 'small' }}>
                      <ComboBox
                        selectedKey={state.serviceType}
                        label="Service type"
                        autoComplete="off"
                        options={options.templateServices.map(parseToComboBoxOption)}
                        onChange={(event, { key }) => setState({ ...state, serviceType: key })}
                        style={{ width: '100%' }}
                      />
                    </Spacing>
                  </Column>
                </Row>
              )}

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              <Row>
                <Column lg="12">
                  <Button
                    variant="primary"
                    disabled={isCreatingPolicy}
                    onClick={() => console.log('saving')}
                  >
                    Save
                  </Button>
                </Column>
              </Row>
            </Spacing>
          </Column>
        </Row>
      </>
    </Panel>
  );
};

export default CreateGroupPanel;

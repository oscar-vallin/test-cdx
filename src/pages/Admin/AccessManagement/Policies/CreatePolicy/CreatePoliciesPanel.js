import React, { useState, useEffect, Fragment } from 'react';

import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { IconButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import { Spacing } from '../../../../../components/spacings/Spacing';
import { Card } from '../../../../../components/cards/Card';
import { Button } from '../../../../../components/buttons/Button';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography/Text';
import { InputText } from '../../../../../components/inputs/InputText';
import FacetCombobox from '../../../../../components/comboboxes/FacetCombobox/FacetCombobox';
import VerbCombobox from '../../../../../components/comboboxes/VerbCombobox/VerbCombobox';

import { StyledCommandButton, StyledColumn } from './CreatePoliciesPanel.styles';

import { useAmPolicyPageLazyQuery, useCreateAmPolicyMutation } from '../../../../../data/services/graphql';
import { useAuthContext } from '../../../../../contexts/AuthContext';

const INITIAL_STATE = {
  editIndex: null,
  policyName: '',
  isTemplate: false,
  usedAsIs: false,
  serviceType: '',
  permissions: [],
}

const INITIAL_OPTIONS = {
  permissionServices: [],
  predicates: [],
  templateServices: [],
}

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

const CreatePoliciesPanel = ({
  isOpen,
  onDismiss,
}) => {
  const { token } = useAuthContext();
  const { id, orgId } = JSON.parse(token.AUTH_DATA); 
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [options, setOptions] = useState({ ...INITIAL_OPTIONS });

  const [useAmPolicyPage, { data, loading }] = useAmPolicyPageLazyQuery();
  const [createPolicy, { loading: isCreatingPolicy, error }] = useCreateAmPolicyMutation();

  const handleAsyncOptionChange = (attr, permissionIndex) => (option, item, data) => {
    setState({
      ...state,
      permissions: state.permissions.map((permission, index) => {
        if (index !== permissionIndex) {
          return permission;
        }

        return {
          ...permission,
          actions: permission.actions.map((action, index) => {
            if (permission.actions.indexOf(item) !== index) {
              return action;
            }

            return { ...action, [attr]: option };
          }),
        };
      }),
    });
  };

  const onRenderItemColumn = ({ data, services, onServiceChange, onFacetChange, onVerbChange, permissionIndex }) => (
    item,
    index,
    column
  ) => {
    switch (column.key) {
      case 'service':
        return (
          <ComboBox
            autoComplete="off"
            selectedKey={item.service.key}
            options={services.map(parseToComboBoxOption)}
            onChange={(event, option) => onServiceChange(option, item, data)}
            style={{ width: '100%' }}
          />
        );
      case 'facet':
        return (
          <FacetCombobox service={item.service.key} onChange={(event, option) => onFacetChange(option, item, data)} />
        );
      case 'verb':
        return (
          <VerbCombobox
            service={item.service.key}
            facet={item.facet.key}
            onChange={(event, option) => onVerbChange(option, item, data)}
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
                  permissions: state.permissions.map((item, currIndex) => {
                    if (currIndex !== permissionIndex) {
                      return item;
                    }

                    return {
                      ...item,
                      actions: item.actions.filter((action, actionIndex) => actionIndex !== index),
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
  };

  const columns = generateColumns(options);

  useEffect(() => {
    if (isOpen) {
      useAmPolicyPage({ variables: { orgSid: orgId } });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && data) {
      setOptions(data.amPolicyPage);
    }
  }, [data, isOpen]);
  
  return (
    <Panel
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      headerText="New Policy"
      isOpen={isOpen}
      onDismiss={() => {
        setState({ ...INITIAL_STATE });
        setOptions({ ...INITIAL_OPTIONS });

        onDismiss();
      }}
    >
      <Fragment>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Row bottom>
                <Column lg="12">
                  <InputText
                    label="Policy Name"
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
                        onChange={(event, isTemplate) => setState({ ...state, isTemplate })}
                      />
                    </Spacing>

                    {state.isTemplate && (
                      <Checkbox
                        label="Template can be used as is"
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

              <Spacing margin={{ bottom: 'normal' }}>
                <Row>
                  <Column lg="4">
                    <Spacing margin={{ top: 'small' }}>
                      <Text variant="bold">Permissions</Text>
                    </Spacing>
                  </Column>

                  <Column lg="8" right>
                    <StyledCommandButton
                      iconProps={{ iconName: 'Add' }}
                      onClick={() =>
                        setState({
                          ...state,
                          permissions: [
                            ...state.permissions,
                            {
                              effect: '',
                              predicateName: '',
                              parameterVariable: '',
                              parameterValue: '',
                              actions: [],
                            },
                          ],
                        })
                      }
                    >
                      Add permission
                    </StyledCommandButton>
                  </Column>
                </Row>
              </Spacing>

              {state.permissions.length === 0 ? (
                <MessageBar>No permissions added for this policy</MessageBar>
              ) : (
                state.permissions.map((permission, permissionIndex) => {
                  return (
                    <Spacing margin={{ top: 'normal' }} key={permissionIndex}>
                      <Card>
                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Row bottom>
                            <Column lg="3">
                              <ComboBox
                                selectedKey={permission.effect}
                                label="Effect"
                                autoComplete="off"
                                options={options.permissionEffectNVPs.map(parseToComboBoxOption)}
                                onChange={(event, { key }) =>
                                  setState({
                                    ...state,
                                    permissions: state.permissions.map((item, index) => {
                                      if (index !== permissionIndex) {
                                        return item;
                                      }

                                      return { ...permission, effect: key };
                                    }),
                                  })
                                }
                                style={{ width: '100%' }}
                              />
                            </Column>

                            <Column lg="3">
                              <ComboBox
                                selectedKey={permission.predicateName}
                                label="Predicate name"
                                autoComplete="off"
                                options={options.predicates.map(parseToComboBoxOption)}
                                onChange={(event, { key }) =>
                                  setState({
                                    ...state,
                                    permissions: state.permissions.map((item, index) => {
                                      if (index !== permissionIndex) {
                                        return item;
                                      }

                                      return { ...permission, predicateName: key };
                                    }),
                                  })
                                }
                                style={{ width: '100%' }}
                              />
                            </Column>

                            <Column lg="3">
                              <InputText
                                label="Parameter variable"
                                value={permission.parameterVariable}
                                onChange={({ target }) =>
                                  setState({
                                    ...state,
                                    permissions: state.permissions.map((item, index) => {
                                      if (index !== permissionIndex) {
                                        return item;
                                      }

                                      return { ...permission, parameterVariable: target.value };
                                    }),
                                  })
                                }
                              />
                            </Column>

                            <Column lg="3">
                              <InputText
                                label="Parameter value"
                                value={permission.parameterValue}
                                onChange={({ target }) =>
                                  setState({
                                    ...state,
                                    permissions: state.permissions.map((item, index) => {
                                      if (index !== permissionIndex) {
                                        return item;
                                      }

                                      return { ...permission, parameterValue: target.value };
                                    }),
                                  })
                                }
                              />
                            </Column>
                          </Row>
                        </Spacing>

                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Separator />
                        </Spacing>

                        <Row>
                          <Column lg="4" center>
                            <Spacing margin={{ top: 'small' }}>
                              <Text>Actions</Text>
                            </Spacing>
                          </Column>

                          <Column lg="8" right>
                            <StyledCommandButton
                              iconProps={{ iconName: 'Add' }}
                              onClick={() =>
                                setState({
                                  ...state,
                                  permissions: state.permissions.map((item, index) => {
                                    if (index !== permissionIndex) {
                                      return item;
                                    }

                                    return {
                                      ...permission,
                                      actions: [
                                        ...permission.actions,
                                        {
                                          service: '',
                                          facet: '',
                                          verb: '',
                                        },
                                      ],
                                    };
                                  }),
                                })
                              }
                            >
                              Add action
                            </StyledCommandButton>
                          </Column>
                        </Row>

                        <Spacing>
                          <Row>
                            <StyledColumn lg="12">
                              {permission.actions.length > 0 ? (
                                <DetailsList
                                  items={permission.actions}
                                  selectionMode={SelectionMode.none}
                                  columns={columns}
                                  onRenderItemColumn={onRenderItemColumn({
                                    permissionIndex,
                                    data: permission.actions,
                                    services: options.permissionServices,
                                    onServiceChange: handleAsyncOptionChange('service', permissionIndex),
                                    onFacetChange: handleAsyncOptionChange('facet', permissionIndex),
                                    onVerbChange: handleAsyncOptionChange('verb', permissionIndex),
                                  })}
                                  isHeaderVisible
                                />
                              ) : (
                                <MessageBar>No actions added for this permission</MessageBar>
                              )}
                            </StyledColumn>
                          </Row>
                        </Spacing>

                        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                          <Separator />
                        </Spacing>

                        <Row>
                          <Column lg="12" right>
                            <StyledCommandButton
                              iconProps={{ iconName: 'delete' }}
                              onClick={() => {
                                setState({
                                  ...state,
                                  permissions: state.permissions.filter((item, index) => index !== permissionIndex),
                                });
                              }}
                            >
                              Remove
                            </StyledCommandButton>
                          </Column>
                        </Row>
                      </Card>
                    </Spacing>
                  );
                })
              )}

              <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                <Separator />
              </Spacing>

              <Row>
                <Column lg="12">
                  <Button
                    variant="primary"
                    disabled={isCreatingPolicy}
                    onClick={() => {
                      createPolicy({
                        variables: {
                          policyInfo: {
                            name: state.policyName,
                            orgOwnerId: 1,
                            permissions: state.permissions.map(permission => ({
                              policySid: state.policySid,
                              effect: permission.effect,
                              actions: permission.actions.map(action => ({
                                permissionSid: permission.permissionSid,
                                service: action.service.key,
                                facet: action.facet.key,
                                verb: action.verb.key,
                              })),
                              predicate: permission.predicate,
                              predVar1: permission.parameterVariable,
                              predParam1: permission.parameterValue, 
                            })),
                            tmpl: state.isTemplate,
                            tmplUseAsIs: state.usedAsIs,
                            tmplServiceType: state.serviceType,
                          }
                        }
                      })
                    }}
                  >
                    Create policy
                  </Button>
                </Column>
              </Row>
            </Spacing>
          </Column>
        </Row>
      </Fragment>
    </Panel>
  )
}

export default CreatePoliciesPanel;

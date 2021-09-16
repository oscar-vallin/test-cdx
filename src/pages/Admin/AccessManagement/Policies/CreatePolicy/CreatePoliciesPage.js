/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import { LayoutAdmin } from '../../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../../components/spacings/Spacing';
import { Button } from '../../../../../components/buttons/Button';
import { Row, Column } from '../../../../../components/layouts';
import { Separator } from '../../../../../components/separators/Separator';
import { Text } from '../../../../../components/typography/Text';
import { InputText } from '../../../../../components/inputs/InputText';

import { useAmPolicyPageQuery } from '../../../../../data/services/graphql';
import { ADMIN_NAV } from '../../../../../data/constants/AdminConstants';
import { useOrgSid } from '../../../../../hooks/useOrgSid';

const COLUMNS = [
  {
    key: 'service',
    name: 'Service',
    fieldName: 'service',
    onColumnClick: () => {
      return null;
    },
    data: 'string',
    isPadded: true,
  },
  {
    key: 'facet',
    name: 'Facet',
    fieldName: 'facet',
    onColumnClick: () => {
      return null;
    },
    data: 'string',
    isPadded: true,
  },
  {
    key: 'verb',
    name: 'Verb',
    fieldName: 'verb',
    onColumnClick: () => {
      return null;
    },
    data: 'string',
    isPadded: true,
  },
];

const OPTIONS = {
  permissionServices: [
    {
      name: 'CDX',
      value: 'CDX',
    },
    {
      name: 'Integration',
      value: 'INTEGRATION',
    },
    {
      name: 'Access Management',
      value: 'ACCESS_MANAGEMENT',
    },
  ],
  predicates: [
    {
      name: 'StringEqualsIgnoreCase',
      value: 'STRING_EQUALS_IGNORE_CASE',
    },
    {
      name: 'StringNotEqualsIgnoreCase',
      value: 'STRING_NOT_EQUALS_IGNORE_CASE',
    },
    {
      name: 'NotKNTUEnv',
      value: 'NOT_KNTU_ENV',
    },
  ],
  showTemplateSection: true,
  templateServices: [
    {
      name: 'CDX',
      value: 'CDX',
    },
    {
      name: 'Integration',
      value: 'INTEGRATION',
    },
  ],
};

const parseToComboBoxOption = ({ name, value }) => ({ key: value, text: name });

const _CreatePoliciesPage = () => {
  const { orgSid } = useOrgSid();
  const [state, setState] = useState({
    editIndex: null,
    policyName: '',
    isTemplate: false,
    usedAsIs: false,
    serviceType: '',
    form: {
      effect: '',
      predicateName: '',
      parameterVariable: '',
      parameterValue: '',
    },
    items: [],
  });

  const [, setOptions] = useState({
    permissionServices: [],
    predicates: [],
    templateServices: [],
  });

  const { data, loading } = useAmPolicyPageQuery({ variables: { orgSid } });

  useEffect(() => {
    if (!loading && data) {
      setOptions(data.amPolicyPage);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_POLICIES">
      <Spacing margin="double">
        <Row bottom>
          <Column lg="3">
            <InputText
              label="Policy Name 321"
              value={state.policyName}
              onChange={({ target }) => setState({ ...state, policyName: target.value })}
            />
          </Column>
        </Row>

        <Row center>
          <Column lg="12">
            <Spacing margin={{ top: 'normal', bottom: 'small' }}>
              <Checkbox label="Is a template" onChange={(event, isTemplate) => setState({ ...state, isTemplate })} />
            </Spacing>

            {state.isTemplate && (
              <Checkbox
                label="Template can be used as is"
                onChange={(event, usedAsIs) => setState({ ...state, usedAsIs })}
              />
            )}
          </Column>
        </Row>

        {state.usedAsIs && (
          <Row>
            <Column lg="3">
              <Spacing margin={{ top: 'small' }}>
                <ComboBox
                  selectedKey={state.serviceType}
                  label="Service type"
                  autoComplete="off"
                  options={OPTIONS.templateServices.map(parseToComboBoxOption)}
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

        <Row>
          <Column lg="12">
            <Text>Permissions</Text>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Row bottom>
            <Column lg="2">
              <ComboBox
                selectedKey={state.form.effect}
                label="Effect"
                autoComplete="off"
                options={OPTIONS.permissionServices.map(parseToComboBoxOption)}
                onChange={(event, { key }) => setState({ ...state, form: { ...state.form, effect: key } })}
                style={{ width: '100%' }}
              />
            </Column>

            <Column lg="2">
              <ComboBox
                selectedKey={state.form.predicateName}
                label="Predicate name"
                autoComplete="off"
                options={OPTIONS.predicates.map(parseToComboBoxOption)}
                onChange={(event, { key }) => setState({ ...state, form: { ...state.form, predicateName: key } })}
                style={{ width: '100%' }}
              />
            </Column>

            <Column lg="2">
              <InputText
                label="Parameter variable"
                value={state.form.parameterVariable}
                onChange={({ target }) => {
                  setState({ ...state, form: { ...state.form, parameterVariable: target.value } });
                }}
              />
            </Column>

            <Column lg="2">
              <InputText
                label="Parameter value"
                value={state.form.parameterValue}
                onChange={({ target }) => setState({ ...state, form: { ...state.form, parameterValue: target.value } })}
              />
            </Column>

            <Column lg="2">
              <Button
                variant="primary"
                onClick={() => {
                  setState({
                    ...state,
                    items: [
                      ...state.items,
                      {
                        service: OPTIONS.templateServices.find((option) => option.value === state.serviceType).name,
                        facet: '#Query',
                        verb: '#Query',
                      },
                    ],
                  });
                }}
              >
                Add
              </Button>
            </Column>
          </Row>
        </Spacing>

        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Text>Actions</Text>
            </Spacing>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Row>
            <Column lg="12">
              <DetailsList
                items={state.items}
                selectionMode={SelectionMode.none}
                compact
                columns={COLUMNS}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible
              />
            </Column>
          </Row>
        </Spacing>
      </Spacing>
    </LayoutAdmin>
  );
};

const CreatePoliciesPage = memo(_CreatePoliciesPage);

export { CreatePoliciesPage };

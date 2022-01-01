/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Label, SpinnerSize } from '@fluentui/react';
import { Card } from '../../../components/cards';
import { Button } from '../../../components/buttons';
import { useQueryHandler } from '../../../hooks/useQueryHandler';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';
import { Row, Column } from '../../../components/layouts';
import { Text } from '../../../components/typography';
import { Separator } from '../../../components/separators/Separator';
import { LayoutAdmin } from '../../../layouts/LayoutAdmin';
import { Spacing } from '../../../components/spacings/Spacing';

import { StyledColumn, StyledDiv } from './PasswordRulesPage.styles';
import { usePasswordRulesFormLazyQuery, useUpdatePasswordRulesMutation } from '../../../data/services/graphql';

const _PasswordRulesPage = () => {
  // const history = useHistory();
  const ActiveDomainStore = useActiveDomainStore();
  const [fetchPageForm, { data: form, loading: isLoadingForm }] = useQueryHandler(usePasswordRulesFormLazyQuery);
  const [updatePasswordRules, { data: updatedRules, loading: isUpdatingRules, error: updateError }] =
    useQueryHandler(useUpdatePasswordRulesMutation);

  useEffect(() => {
    fetchPageForm({
      variables: {
        orgSid: ActiveDomainStore.domainOrg.current.orgSid,
      },
    });
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

  return (
    <LayoutAdmin id="PageAdmin">
      <Spacing margin="double">
        <Row>
          <Column lg="4">
            <Spacing margin={{ top: 'small' }}>
              <Text id="__Page-Title" variant="bold">
                Password Rules
              </Text>
            </Spacing>
          </Column>
        </Row>

        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>
          </Column>
        </Row>

        <Row>
          <StyledColumn lg="6">
            <Spacing margin={{ top: 'double' }}>
              {isLoadingForm ? (
                <Spinner size={SpinnerSize.large} label="Loading password rules" />
              ) : (
                <div id="__PasswordRules-Form">
                  <Row>
                    <Column>
                      <Text variant="bold">Must always be met</Text>
                    </Column>
                  </Row>

                  <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                    <Row>
                      <Column lg="6">
                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must not contain whitespaces</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must be between X and Y characters long</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must contain at least X UPPERCASE letter</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must contain at least X lowercase letter</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must contain at least X digit</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must contain at least X special character</Label>
                        </StyledDiv>
                      </Column>
                      <Column lg="6">
                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must not contain a sequence of numbers</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must not repeat the same character more than X times</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Must not re-use the same X passwords</Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>
                            Must not <i>exactly</i> match a word in the dictionary
                          </Label>
                        </StyledDiv>

                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>
                            Must not <i>partially</i> match a word in the dictionary
                          </Label>
                        </StyledDiv>
                      </Column>
                    </Row>
                  </Spacing>

                  <Spacing margin={{ bottom: 'normal' }}>
                    <Row>
                      <Column>
                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>
                            <strong>Must be a password of</strong> X <strong>complexity OR Match</strong> X{' '}
                            <strong>of the following rules</strong>
                          </Label>
                        </StyledDiv>
                      </Column>
                    </Row>

                    <Row>
                      <Column>
                        <Card elevation="none">
                          <Row>
                            <Column lg="6">
                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must not contain whitespaces</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must be between X and Y characters long</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must contain at least X UPPERCASE letter</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must contain at least X lowercase letter</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must contain at least X digit</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must contain at least X special character</Label>
                              </StyledDiv>
                            </Column>
                            <Column lg="6">
                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must not contain a sequence of numbers</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must not repeat the same character more than X times</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>Must not re-use the same X passwords</Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>
                                  Must not <i>exactly</i> match a word in the dictionary
                                </Label>
                              </StyledDiv>

                              <StyledDiv>
                                <Checkbox
                                  id="__checkBoxPoliciesApplies"
                                  onChange={(event, _stepWise) => console.log(_stepWise)}
                                />

                                <Label>
                                  Must not <i>partially</i> match a word in the dictionary
                                </Label>
                              </StyledDiv>
                            </Column>
                          </Row>
                        </Card>
                      </Column>
                    </Row>
                  </Spacing>

                  <Spacing margin={{ bottom: 'double' }}>
                    <Row>
                      <Column>
                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Automatically Lock Accounts after X unsuccessful login attempts</Label>
                        </StyledDiv>
                      </Column>
                    </Row>

                    <Row>
                      <Column>
                        <StyledDiv>
                          <Checkbox
                            id="__checkBoxPoliciesApplies"
                            onChange={(event, _stepWise) => console.log(_stepWise)}
                          />

                          <Label>Automatically Unlock Accounts after X minutes</Label>
                        </StyledDiv>
                      </Column>
                    </Row>
                  </Spacing>

                  <Row>
                    <Column lg="12">
                      <Button
                        id="__PasswordRules-Save"
                        variant="primary"
                        disabled={isUpdatingRules}
                        onClick={() => {
                          updatePasswordRules({
                            variables: {
                              passwordRulesInput: {
                                orgSid: ActiveDomainStore.domainOrg.current.orgSid,
                                autoLockAccount: { value: form.passwordRulesForm.autoLockAccount.value },
                                autoLockAfterFailedAttempts: {
                                  value: form.passwordRulesForm.autoLockAfterFailedAttempts.value,
                                },
                                autoUnlockAccount: { value: form.passwordRulesForm.autoUnlockAccount.value },
                                autoUnlockAccountDelayMinutes: {
                                  value: form.passwordRulesForm.autoUnlockAccountDelayMinutes.value,
                                },
                                mustAlwaysBeMet: { value: form.passwordRulesForm.mustAlwaysBeMet },
                                someMustBeMe: { value: form.passwordRulesForm.someMustBeMe },
                              },
                            },
                          });

                          return null;
                        }}
                      >
                        Save
                      </Button>
                    </Column>
                  </Row>
                </div>
              )}
            </Spacing>
          </StyledColumn>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const PasswordRulesPage = memo(_PasswordRulesPage);

export { PasswordRulesPage };
export default PasswordRulesPage;

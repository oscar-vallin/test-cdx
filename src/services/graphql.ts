import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  beginLogin?: Maybe<LoginStep>;
  changeOwnPasswordPage?: Maybe<PasswordPage>;
  changeOwnPasswordPage2?: Maybe<PasswordPage2>;
  fileList?: Maybe<Array<Maybe<File>>>;
  fileGet?: Maybe<File>;
};

export type QueryBeginLoginArgs = {
  userId: Scalars['String'];
};

export type QueryFileGetArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<TokenUser>;
  fileUpdate?: Maybe<File>;
};

export type MutationPasswordLoginArgs = {
  userId: Scalars['String'];
  password: Scalars['String'];
};

export type MutationFileUpdateArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type LoginStep = {
  __typename?: 'LoginStep';
  userId: Scalars['String'];
  step: Scalars['Int'];
  redirectPath?: Maybe<Scalars['String']>;
  allowLostPassword?: Maybe<Scalars['Boolean']>;
};

export type PasswordPage = {
  __typename?: 'PasswordPage';
  strengthLevel?: Maybe<Scalars['Int']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  minCharUpper?: Maybe<Scalars['Int']>;
  minCharLower?: Maybe<Scalars['Int']>;
  minCharDigit?: Maybe<Scalars['Int']>;
  minCharSpecial?: Maybe<Scalars['Int']>;
  strengthConjunction?: Maybe<Conjunction>;
};

export type PasswordPage2 = {
  __typename?: 'PasswordPage2';
  ruleGroup: PasswordRuleGroup;
};

export type PasswordRuleGroup = {
  __typename?: 'PasswordRuleGroup';
  /**
   * number of rule predicates that must be true for the group to pass
   * if numberOfCharacteristics is omitted all rules are required
   */
  numberOfCharacteristics?: Maybe<Scalars['Int']>;
  /** list of rules or rule sub groups */
  rules?: Maybe<Array<Maybe<PasswordRule>>>;
};

export type PasswordLengthRule = {
  __typename?: 'PasswordLengthRule';
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
};

export type PasswordWhitespaceRule = {
  __typename?: 'PasswordWhitespaceRule';
  allowedWhitespace?: Maybe<WhitespaceRuleType>;
};

export type PasswordCharacterRule = {
  __typename?: 'PasswordCharacterRule';
  characterType?: Maybe<PasswordCharacterType>;
  numberOfCharacters?: Maybe<Scalars['Int']>;
};

export type PasswordStrengthRule = {
  __typename?: 'PasswordStrengthRule';
  requiredStrengthLevel: Scalars['Int'];
};

export type TokenUser = {
  __typename?: 'TokenUser';
  token?: Maybe<Scalars['String']>;
  session?: Maybe<UserSession>;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  userId: Scalars['String'];
  defaultAuthorities?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum Conjunction {
  Or = 'OR',
  And = 'AND',
}

export enum WhitespaceRuleType {
  None = 'NONE',
}

export enum PasswordCharacterType {
  UpperCase = 'UPPER_CASE',
  LowerCase = 'LOWER_CASE',
  Digit = 'DIGIT',
  Special = 'SPECIAL',
}

export type PasswordRule =
  | PasswordLengthRule
  | PasswordWhitespaceRule
  | PasswordCharacterRule
  | PasswordStrengthRule
  | PasswordRuleGroup;

export enum FileStatus {
  Incomplete = 'Incomplete',
  Complete = 'Complete',
  Approved = 'Approved',
}

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  updateStatus?: Maybe<File>;
};

export type LoginStepQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type LoginStepQuery = { __typename?: 'Query' } & {
  beginLogin?: Maybe<
    { __typename?: 'LoginStep' } & Pick<LoginStep, 'userId' | 'step' | 'redirectPath' | 'allowLostPassword'>
  >;
};

export type PasswordPage2QueryVariables = Exact<{ [key: string]: never }>;

export type PasswordPage2Query = { __typename?: 'Query' } & {
  changeOwnPasswordPage2?: Maybe<
    { __typename?: 'PasswordPage2' } & {
      ruleGroup: { __typename?: 'PasswordRuleGroup' } & Pick<PasswordRuleGroup, 'numberOfCharacteristics'> & {
          rules?: Maybe<
            Array<
              Maybe<
                | ({ __typename: 'PasswordLengthRule' } & Pick<PasswordLengthRule, 'minLength' | 'maxLength'>)
                | ({ __typename: 'PasswordWhitespaceRule' } & Pick<PasswordWhitespaceRule, 'allowedWhitespace'>)
                | ({ __typename: 'PasswordCharacterRule' } & Pick<
                    PasswordCharacterRule,
                    'characterType' | 'numberOfCharacters'
                  >)
                | ({ __typename: 'PasswordStrengthRule' } & Pick<PasswordStrengthRule, 'requiredStrengthLevel'>)
                | ({ __typename: 'PasswordRuleGroup' } & Pick<PasswordRuleGroup, 'numberOfCharacteristics'> & {
                      rules?: Maybe<
                        Array<
                          Maybe<
                            | ({ __typename: 'PasswordLengthRule' } & Pick<
                                PasswordLengthRule,
                                'minLength' | 'maxLength'
                              >)
                            | ({ __typename: 'PasswordWhitespaceRule' } & Pick<
                                PasswordWhitespaceRule,
                                'allowedWhitespace'
                              >)
                            | ({ __typename: 'PasswordCharacterRule' } & Pick<
                                PasswordCharacterRule,
                                'characterType' | 'numberOfCharacters'
                              >)
                            | ({ __typename: 'PasswordStrengthRule' } & Pick<
                                PasswordStrengthRule,
                                'requiredStrengthLevel'
                              >)
                            | ({ __typename: 'PasswordRuleGroup' } & Pick<
                                PasswordRuleGroup,
                                'numberOfCharacteristics'
                              > & {
                                  rules?: Maybe<
                                    Array<
                                      Maybe<
                                        | ({ __typename: 'PasswordLengthRule' } & Pick<
                                            PasswordLengthRule,
                                            'minLength' | 'maxLength'
                                          >)
                                        | ({ __typename: 'PasswordWhitespaceRule' } & Pick<
                                            PasswordWhitespaceRule,
                                            'allowedWhitespace'
                                          >)
                                        | ({ __typename: 'PasswordCharacterRule' } & Pick<
                                            PasswordCharacterRule,
                                            'characterType' | 'numberOfCharacters'
                                          >)
                                        | ({ __typename: 'PasswordStrengthRule' } & Pick<
                                            PasswordStrengthRule,
                                            'requiredStrengthLevel'
                                          >)
                                        | ({ __typename: 'PasswordRuleGroup' } & Pick<
                                            PasswordRuleGroup,
                                            'numberOfCharacteristics'
                                          >)
                                      >
                                    >
                                  >;
                                })
                          >
                        >
                      >;
                    })
              >
            >
          >;
        };
    }
  >;
};

export type UserTokenMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;

export type UserTokenMutation = { __typename?: 'Mutation' } & {
  passwordLogin?: Maybe<
    { __typename?: 'TokenUser' } & Pick<TokenUser, 'token'> & {
        session?: Maybe<{ __typename?: 'UserSession' } & Pick<UserSession, 'id' | 'userId' | 'defaultAuthorities'>>;
      }
  >;
};

export type FileUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
}>;

export type FileUpdateMutation = { __typename?: 'Mutation' } & {
  fileUpdate?: Maybe<{ __typename?: 'File' } & Pick<File, 'id' | 'name' | 'status'>>;
};

export type FileHookSubscriptionVariables = Exact<{ [key: string]: never }>;

export type FileHookSubscription = { __typename?: 'Subscription' } & {
  updateStatus?: Maybe<{ __typename?: 'File' } & Pick<File, 'id' | 'name' | 'status'>>;
};

export type FileGetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FileGetQuery = { __typename?: 'Query' } & {
  fileGet?: Maybe<{ __typename?: 'File' } & Pick<File, 'id' | 'name' | 'status'>>;
};

export const LoginStepDocument = gql`
  query LoginStep($userId: String!) {
    beginLogin(userId: $userId) {
      userId
      step
      redirectPath
      allowLostPassword
    }
  }
`;

/**
 * __useLoginStepQuery__
 *
 * To run a query within a React component, call `useLoginStepQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginStepQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginStepQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLoginStepQuery(baseOptions?: Apollo.QueryHookOptions<LoginStepQuery, LoginStepQueryVariables>) {
  return Apollo.useQuery<LoginStepQuery, LoginStepQueryVariables>(LoginStepDocument, baseOptions);
}
export function useLoginStepLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginStepQuery, LoginStepQueryVariables>,
) {
  return Apollo.useLazyQuery<LoginStepQuery, LoginStepQueryVariables>(LoginStepDocument, baseOptions);
}
export type LoginStepQueryHookResult = ReturnType<typeof useLoginStepQuery>;
export type LoginStepLazyQueryHookResult = ReturnType<typeof useLoginStepLazyQuery>;
export type LoginStepQueryResult = Apollo.QueryResult<LoginStepQuery, LoginStepQueryVariables>;
export const PasswordPage2Document = gql`
  query PasswordPage2 {
    changeOwnPasswordPage2 {
      ruleGroup {
        numberOfCharacteristics
        rules {
          __typename
          ... on PasswordLengthRule {
            minLength
            maxLength
          }
          ... on PasswordStrengthRule {
            requiredStrengthLevel
          }
          ... on PasswordCharacterRule {
            characterType
            numberOfCharacters
          }
          ... on PasswordWhitespaceRule {
            allowedWhitespace
          }
          ... on PasswordRuleGroup {
            numberOfCharacteristics
            rules {
              __typename
              ... on PasswordLengthRule {
                minLength
                maxLength
              }
              ... on PasswordStrengthRule {
                requiredStrengthLevel
              }
              ... on PasswordCharacterRule {
                characterType
                numberOfCharacters
              }
              ... on PasswordWhitespaceRule {
                allowedWhitespace
              }
              ... on PasswordRuleGroup {
                numberOfCharacteristics
                rules {
                  __typename
                  ... on PasswordLengthRule {
                    minLength
                    maxLength
                  }
                  ... on PasswordStrengthRule {
                    requiredStrengthLevel
                  }
                  ... on PasswordCharacterRule {
                    characterType
                    numberOfCharacters
                  }
                  ... on PasswordWhitespaceRule {
                    allowedWhitespace
                  }
                  ... on PasswordRuleGroup {
                    numberOfCharacteristics
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __usePasswordPage2Query__
 *
 * To run a query within a React component, call `usePasswordPage2Query` and pass it any options that fit your needs.
 * When your component renders, `usePasswordPage2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePasswordPage2Query({
 *   variables: {
 *   },
 * });
 */
export function usePasswordPage2Query(
  baseOptions?: Apollo.QueryHookOptions<PasswordPage2Query, PasswordPage2QueryVariables>,
) {
  return Apollo.useQuery<PasswordPage2Query, PasswordPage2QueryVariables>(PasswordPage2Document, baseOptions);
}
export function usePasswordPage2LazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PasswordPage2Query, PasswordPage2QueryVariables>,
) {
  return Apollo.useLazyQuery<PasswordPage2Query, PasswordPage2QueryVariables>(PasswordPage2Document, baseOptions);
}
export type PasswordPage2QueryHookResult = ReturnType<typeof usePasswordPage2Query>;
export type PasswordPage2LazyQueryHookResult = ReturnType<typeof usePasswordPage2LazyQuery>;
export type PasswordPage2QueryResult = Apollo.QueryResult<PasswordPage2Query, PasswordPage2QueryVariables>;
export const UserTokenDocument = gql`
  mutation UserToken($userId: String!, $password: String!) {
    passwordLogin(userId: $userId, password: $password) {
      token
      session {
        id
        userId
        defaultAuthorities
      }
    }
  }
`;
export type UserTokenMutationFn = Apollo.MutationFunction<UserTokenMutation, UserTokenMutationVariables>;

/**
 * __useUserTokenMutation__
 *
 * To run a mutation, you first call `useUserTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTokenMutation, { data, loading, error }] = useUserTokenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<UserTokenMutation, UserTokenMutationVariables>,
) {
  return Apollo.useMutation<UserTokenMutation, UserTokenMutationVariables>(UserTokenDocument, baseOptions);
}
export type UserTokenMutationHookResult = ReturnType<typeof useUserTokenMutation>;
export type UserTokenMutationResult = Apollo.MutationResult<UserTokenMutation>;
export type UserTokenMutationOptions = Apollo.BaseMutationOptions<UserTokenMutation, UserTokenMutationVariables>;
export const FileUpdateDocument = gql`
  mutation FileUpdate($id: ID!, $name: String, $status: String) {
    fileUpdate(id: $id, name: $name, status: $status) {
      id
      name
      status
    }
  }
`;
export type FileUpdateMutationFn = Apollo.MutationFunction<FileUpdateMutation, FileUpdateMutationVariables>;

/**
 * __useFileUpdateMutation__
 *
 * To run a mutation, you first call `useFileUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileUpdateMutation, { data, loading, error }] = useFileUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useFileUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<FileUpdateMutation, FileUpdateMutationVariables>,
) {
  return Apollo.useMutation<FileUpdateMutation, FileUpdateMutationVariables>(FileUpdateDocument, baseOptions);
}
export type FileUpdateMutationHookResult = ReturnType<typeof useFileUpdateMutation>;
export type FileUpdateMutationResult = Apollo.MutationResult<FileUpdateMutation>;
export type FileUpdateMutationOptions = Apollo.BaseMutationOptions<FileUpdateMutation, FileUpdateMutationVariables>;
export const FileHookDocument = gql`
  subscription FileHook {
    updateStatus {
      id
      name
      status
    }
  }
`;

/**
 * __useFileHookSubscription__
 *
 * To run a query within a React component, call `useFileHookSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFileHookSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileHookSubscription({
 *   variables: {
 *   },
 * });
 */
export function useFileHookSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<FileHookSubscription, FileHookSubscriptionVariables>,
) {
  return Apollo.useSubscription<FileHookSubscription, FileHookSubscriptionVariables>(FileHookDocument, baseOptions);
}
export type FileHookSubscriptionHookResult = ReturnType<typeof useFileHookSubscription>;
export type FileHookSubscriptionResult = Apollo.SubscriptionResult<FileHookSubscription>;
export const FileGetDocument = gql`
  query FileGet($id: ID!) {
    fileGet(id: $id) {
      id
      name
      status
    }
  }
`;

/**
 * __useFileGetQuery__
 *
 * To run a query within a React component, call `useFileGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileGetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFileGetQuery(baseOptions?: Apollo.QueryHookOptions<FileGetQuery, FileGetQueryVariables>) {
  return Apollo.useQuery<FileGetQuery, FileGetQueryVariables>(FileGetDocument, baseOptions);
}
export function useFileGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FileGetQuery, FileGetQueryVariables>) {
  return Apollo.useLazyQuery<FileGetQuery, FileGetQueryVariables>(FileGetDocument, baseOptions);
}
export type FileGetQueryHookResult = ReturnType<typeof useFileGetQuery>;
export type FileGetLazyQueryHookResult = ReturnType<typeof useFileGetLazyQuery>;
export type FileGetQueryResult = Apollo.QueryResult<FileGetQuery, FileGetQueryVariables>;

import { Maybe, Organization } from 'src/data/services/graphql';
import { ITag } from '@fluentui/react';
import { ApolloClient, gql } from '@apollo/client';

const parseToPickerOpts = (arr?: Maybe<Organization>[] | null): ITag[] => {
  if (!arr) {
    return [];
  }
  return arr.map((org) => ({ name: org?.name ?? '', key: org?.sid ?? '' }));
};

// We can't use the useLazyQuery or any of the generated code from Apollo
// What we need is an asynchronous method to return a promise.
// So as a result, we have to write our own here.

async function orgQuickSearch(
  client: ApolloClient<object>,
  handleError: (error?: any) => void,
  searchText: string,
  orgOwnerSid: string
): Promise<ITag[]> {
  let orgs: ITag[] = [];
  await client
    .query({
      errorPolicy: 'all',
      variables: {
        orgOwnerSid: orgOwnerSid,
        searchText: searchText,
      },
      query: gql`
        query OrganizationQuickSearch($orgOwnerSid: ID!, $searchText: String!) {
          organizationQuickSearch(orgOwnerSid: $orgOwnerSid, searchText: $searchText) {
            sid
            name
            orgId
            orgType
          }
        }
      `,
    })
    .then((result) => {
      handleError(result.error);
      orgs = parseToPickerOpts(result.data.organizationQuickSearch);
    });

  return orgs;
}

async function vendorQuickSearch(
  client: ApolloClient<object>,
  handleError: (error?: any) => void,
  searchText: string,
  orgOwnerSid: string
): Promise<ITag[]> {
  let orgs: ITag[] = [];
  await client
    .query({
      errorPolicy: 'all',
      variables: {
        orgOwnerSid: orgOwnerSid,
        searchText: searchText,
      },
      query: gql`
        query VendorQuickSearch($orgOwnerSid: ID!, $searchText: String!) {
          vendorQuickSearch(orgOwnerSid: $orgOwnerSid, searchText: $searchText) {
            sid
            name
            orgId
            orgType
          }
        }
      `,
    })
    .then((result) => {
      handleError(result.error);
      orgs = parseToPickerOpts(result.data.vendorQuickSearch);
    });

  return orgs;
}

export { orgQuickSearch, vendorQuickSearch };

import React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, Link, SelectionMode } from "@fluentui/react";
import { UserItem } from "src/data/services/graphql";

type UsersTableType = {
  users: UserItem[],
  onClickUser: (userSid: string) => any
}

export const UsersTable = ({users, onClickUser}: UsersTableType) => {
  const userColumns: IColumn[] = [
    {
      name: 'First Name',
      key: 'firstNm',
      fieldName: 'person.firstNm',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true
    },
    {
      name: 'Last Name',
      key: 'lastNm',
      fieldName: 'person.lastNm',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true
    },
    {
      name: 'Email',
      key: 'email',
      fieldName: 'email',
      minWidth: 255,
      isPadded: true
    }
  ];

  const onRenderItemColumn = (node?: UserItem, itemIndex?: number, column?: IColumn) => {

    let columnVal: string | undefined;
    if (column?.key === 'email') {
      columnVal = node?.item?.email;
    } else if (column) {
      let personProp;
      const person = node?.item?.person;
      if (person) {
        personProp = person[column?.key];
      }
      columnVal = node?.item[column?.key] || personProp;
    } else {
      columnVal = '';
    }

    return (
      <>
        <Link
          id={`__ActiveUsersPage__${column?.key}_${(itemIndex ?? 0) + 1}`}
          onClick={() => {
            if (node) {
              onClickUser(node?.item?.sid);
            }
          }}>
          {columnVal}
        </Link>
      </>
    );
  };


  return (
    <DetailsList
      items={users}
      columns={userColumns}
      layoutMode={DetailsListLayoutMode.justified}
      onRenderItemColumn={onRenderItemColumn}
      selectionMode={SelectionMode.none}
      isHeaderVisible
    />
  );
}
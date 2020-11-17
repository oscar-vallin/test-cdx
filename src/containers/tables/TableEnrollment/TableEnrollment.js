import React from 'react';
import PropTypes from 'prop-types';
import { TABLE_NAMES, getTableStructure } from '../../../data/constants/TableConstants';
import { Table } from '../../../components/tables/Table';
import { Box } from './TableEnrollment.styles';

const FakeData = [
  {
    subscribers: {
      active: {
        value: 47,
      },
      ended: {
        value: 0,
      },
    },
    dependents: {
      active: {
        value: 7,
      },
      ended: {
        value: 6,
      },
    },
    planCode: 'CIGNA HSA Plan',
  },
  {
    subscribers: {
      active: {
        value: 102,
      },
      ended: {
        value: 3,
      },
    },
    dependents: {
      active: {
        value: 14,
      },
      ended: {
        value: 31,
      },
    },
    planCode: 'CIGNA OAP Choice Plan',
  },
];

const TableEnrollment = ({ id = 'TableEnrollmentStats' }) => {
  const data = FakeData.map(({ planCode, subscribers, dependents }) => {
    return {
      key: planCode,
      planCode,
      subscribersActive: subscribers.active.value,
      subscribersEnded: subscribers.ended.value,
      dependentsActive: dependents.active.value,
      dependentsEnded: dependents.ended.value,
    };
  });

  console.log(data);

  return (
    <Box>
      <Table
        items={data}
        structure={getTableStructure(TABLE_NAMES.FILE_STATUS_DETAIL_ENROLLMENT)}
        loading={false}
        onOption={() => console.log('Table click')}
      />
      ;
    </Box>
  );
};

TableEnrollment.propTypes = {
  id: PropTypes.string,
};

export { TableEnrollment };

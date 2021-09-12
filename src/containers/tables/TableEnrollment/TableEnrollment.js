import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { Box, BoxCaption, Text, BoxHeader } from './TableEnrollment.styles';
import { useTable } from './TableEnrollment.service';

const ORG_SID = 1;
const WORK_ORDER_ID = '2';

const TableEnrollment = ({ id = 'TableEnrollmentStats' }) => {
  const { tableProps, tableItems, tableGroups, excludedCounter, error } = useTable(ORG_SID, WORK_ORDER_ID);

  return (
    <Box id={id}>
      <BoxCaption>
        <Text>{error}</Text>
      </BoxCaption>
      <BoxHeader>
        <Table onOption={() => null} structure={tableProps.structure} items={tableItems ? tableItems[0] : []} />
      </BoxHeader>
      <BoxCaption>
        <Text>Counts for the enrollments that were included in the outbound vendor file.</Text>
      </BoxCaption>
      <Table
        onOption={() => null}
        {...tableProps}
        items={tableItems ? tableItems[1] : []}
        groups={tableGroups ? tableGroups[0] : []}
      />
      {excludedCounter > 0 && (
        <>
          <BoxCaption>
            <Text>
              Counts for the enrollments that were on the inbound file but were not included in the outbound vendor
              file.
            </Text>
          </BoxCaption>
          <Table
            onOption={() => null}
            {...tableProps}
            items={tableItems ? tableItems[2] : []}
            groups={tableGroups ? tableGroups[1] : []}
          />
        </>
      )}
    </Box>
  );
};

TableEnrollment.propTypes = {
  id: PropTypes.string,
};

export { TableEnrollment };

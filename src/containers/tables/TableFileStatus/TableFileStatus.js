import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row } from './TableFileStatus.styles';
import { useTable } from './TableFileStatus.service';
import { FileProgress } from '../../bars/FileProgress';
import { STEP_STATUS } from '../../../data/constants/FileStatusConstants';

const TableFileStatus = ({ id = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const { tableProps, error } = useTable(orgSid, dateRange, filter);

  console.log({ tableProps, error });

  return (
    <>
      <Row id={`${id}-temp`}>
        {STEP_STATUS.map((item) => (
          <FileProgress data={{ stepStatus: item.stepStatus, colors: item.colors }} />
        ))}
      </Row>
      <Box id={`${id}`}>
        <Table id={`${id}`} onOption={() => console.log('Table click')} {...tableProps} />
      </Box>
    </>
  );
};

TableFileStatus.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableFileStatus };

import { memo, useState } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ROUTES } from '../../data/constants/RouteConstants';
import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography/Text';
import { PageHeader } from '../../containers/headers/PageHeader';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableArchive } from '../../containers/tables/TableArchive';

const _ArchivePage = () => {
  const [tableMeta, setTableMeta] = useState({ count: null, loading: null });

  return (
    <LayoutDashboard id="PageArchive" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column lg="6" direction="row">
                <FontIcon iconName="FilterSolid" />

                <Text id="__Text_Archives" variant="bold">
                  Archives
                </Text>
                <Text id="__Text_Advanced-search">&nbsp; — Advanced search</Text>
              </Column>
              <Column lg="6" right>
                <Text right>
                  {!tableMeta.loading && tableMeta.count !== null && (
                    <Text>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results were found'}</Text>
                  )}
                </Text>
              </Column>
            </Row>
          </Spacing>
        </Container>
      </PageHeader>

      <TableArchive onItemsListChange={setTableMeta} />
    </LayoutDashboard>
  );
};

const ArchivePage = memo(_ArchivePage);

export { ArchivePage };

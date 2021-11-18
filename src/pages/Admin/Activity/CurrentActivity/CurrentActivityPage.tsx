import { ReactElement } from 'react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography';
import { TablesCurrentActivity } from '../../../../containers/tables/TableCurrentActivity';
// import { NAV_ITEMS } from '../../SideMenu';

const defaultProps = {
  id: '',
};

type CurrentActivityPageProps = {
  id?: string;
} & typeof defaultProps;

export const CurrentActivityPage = ({ id }: CurrentActivityPageProps): ReactElement => {
  return (
    <LayoutAdmin id={id} sidebarOptionSelected="ORG_ACTIVITY">
      <Spacing margin="double">
        <Row>
          <Column lg="4">
            <Spacing margin={{ top: 'small' }}>
              <Text id="__Current_Activity_Text" variant="bold">
                Current Activity
              </Text>
            </Spacing>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>
        <TablesCurrentActivity id="TableCurrentActivity" />
      </Spacing>
    </LayoutAdmin>
  );
};

CurrentActivityPage.defaultProps = defaultProps;

export default CurrentActivityPage;

import { ReactNode, useState } from 'react';
import { StyledLogMessageDiv } from './LogMessageItem.styles';
import { IconButton, TextField,Stack} from '@fluentui/react';
import { Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Badge } from 'src/components/badges/Badge';
import { LabelValue } from 'src/components/labels/LabelValue';
import { Text } from 'src/components/typography';
import { LogLevel } from 'src/data/services/graphql';
import { yyyyMMdda } from 'src/utils/CDXUtils';


type LogMessageItemProps = {
  logMessage: any;
};

export const LogMessageItem = ({ logMessage }: LogMessageItemProps): ReactNode | any => {

  const [showDetails, setShowDetails] = useState(false);
 
  const getBadgeVariant = (severity): string => {
    if (!severity) {
      return 'info';
    }
    switch (severity) {
      case LogLevel.Debug:
        return 'info';
      case LogLevel.Error:
        return 'error';
      case LogLevel.Fatal:
        return 'error';
      case LogLevel.Info:
        return 'info';
      case LogLevel.Trace:
        return 'info';
      case LogLevel.Warn:
        return 'warning';
      default:
        return 'info';
    }
  }

  return (
    
      <StyledLogMessageDiv>     
        <Stack horizontal={true} wrap={true} tokens={{ childrenGap: 10 }}>
          <Stack.Item align="center" disableShrink>
            <IconButton
              iconProps={{ iconName: showDetails ? 'ChevronUp' : 'ChevronDown' }}
              onClick={() => setShowDetails(!showDetails)}
            />
          </Stack.Item>
          <Stack.Item align="center" disableShrink>
            <Text variant="muted"> {yyyyMMdda(new Date(logMessage.timeStamp))}</Text> 
          </Stack.Item>
          <Stack.Item align="center" disableShrink>
            <Badge variant={getBadgeVariant(logMessage.severity)} label={logMessage.severity ? logMessage.severity : 'INFO'} pill />
          </Stack.Item>
          <Stack.Item align="center" disableShrink>
            <Text variant="muted">{logMessage.name ? logMessage.name : ''}</Text> 
          </Stack.Item>
        </Stack>
        {showDetails && 
          <Container>
            <Row>    
              <Spacing margin={{ bottom: 'normal' }}> 
                {logMessage.body && (
                  <TextField
                    id="clientProfileSnippet"              
                    multiline
                    disabled
                    value={logMessage.body}
                    rows={5}
                  />)}           
              </Spacing>
              {logMessage.attributes?.length && ( 
                logMessage.attributes.map((attribute, attributeIndex)=>
                  <Spacing margin={{ bottom: 'normal' }} key={attributeIndex}>    
                    <LabelValue label={attribute.name} value={attribute.strValue} />
                  </Spacing>
                )
              )}
            </Row>
          </Container>
        }
      </StyledLogMessageDiv>
    
  );
};

export default LogMessageItem;

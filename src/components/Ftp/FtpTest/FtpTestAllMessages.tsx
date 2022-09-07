import { LogMessageItem } from 'src/components/collapses/LogMessageItem';

const FtpTestAllMessages = ({ allMessages }) => (
  <div>
    {allMessages
        && allMessages.map((logMessageItem, logMessageItemIndex) => (
          <LogMessageItem key={logMessageItemIndex} logMessage={logMessageItem} />
        ))}
  </div>
);

export { FtpTestAllMessages };

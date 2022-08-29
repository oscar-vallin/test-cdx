/* eslint-disable no-restricted-syntax */
import { FontIcon, Stack } from '@fluentui/react';
import { ButtonLink } from 'src/components/buttons';
import { yyyyMMdda } from 'src/utils/CDXUtils';

function ConvertToCSVBinding(needsQuote: (str: string) => boolean, quoteField: (field: string) => string) {
  return (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    const baseColumns = ['Timestamp', 'Severity', 'Name', 'Body'];
    let str = '';
    let maxAttributes = 0;
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (index != '__typename') {
          if (line != '') line += ',';
          if (typeof array[i][index] !== 'object') {
            if (index === 'timeStamp') {
              line += yyyyMMdda(new Date(array[i][index])).toString();
            } else {
              line += needsQuote(array[i][index]) ? quoteField(array[i][index]) : array[i][index];
            }
          } else if (array[i][index] && array[i][index].length) {
            const attributes = array[i][index];
            maxAttributes = Math.max(maxAttributes, attributes.length);
            for (let j = 0; j < attributes.length; j++) {
              for (const index in attributes[j]) {
                if (index != '__typename')
                  line += `${
                    needsQuote(attributes[j][index]) ? quoteField(attributes[j][index]) : attributes[j][index]
                  },`;
              }
            }
          }
        }
      }

      str += `${line}\r\n`;
    }
    let columnHeadersStr = `${baseColumns.join(',')},`;
    for (let i = 0; i < maxAttributes; i++) {
      columnHeadersStr += `Attribute ${i + 1} Name,Attribute ${i + 1} Value,`;
    }
    str = `${columnHeadersStr}\r\n${str}`;
    return str;
  };
}

function quoteFieldBinding() {
  return (field: string) => {
    field = `"${field.replace(/"/g, '""')}"`;
    return field;
  };
}

function needsQuoteBinding() {
  return (str: string) => {
    const DEFAULT_FIELD_DELIMITER = ',';
    return str.includes(DEFAULT_FIELD_DELIMITER) || str.includes('\r') || str.includes('\n') || str.includes('"');
  };
}

const FtpTestConvertCSV = ({ allMessages }) => {
  const quoteField = quoteFieldBinding();

  const needsQuote = needsQuoteBinding();

  const ConvertToCSV = ConvertToCSVBinding(needsQuote, quoteField);

  const downloadLogsAsCsv = () => {
    if (allMessages?.length) {
      const jsonObject = JSON.stringify(allMessages);
      const str = ConvertToCSV(jsonObject);
      const downloadLink = document.createElement('a');
      const blob = new Blob(['\ufeff', str]);
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'ftp-test-logs.csv';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <Stack.Item align="center" disableShrink>
      <FontIcon
        onClick={downloadLogsAsCsv}
        iconName="DownloadDocument"
        style={{ paddingRight: '.5em', cursor: 'pointer' }}
      />
      <ButtonLink id="__download_logs" target="_new" onClick={downloadLogsAsCsv} title="Download Logs">
        Download Logs
      </ButtonLink>
    </Stack.Item>
  );
};

export { FtpTestConvertCSV, ConvertToCSVBinding, quoteFieldBinding, needsQuoteBinding };

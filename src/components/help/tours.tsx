import { DirectionalHint } from '@fluentui/react';

export type TourStep = {
  target: string;
  title: string;
  calloutDirection: DirectionalHint;
  content: JSX.Element | string;
};

export const topNavTour: TourStep[] = [
  {
    target: '#__AdminNavBtn',
    title: 'Main Navigation',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: (
      <>
        <div>This shows the current Organization you are working in.</div>
        <div>This is also the main navigation button.</div>
        <div>Clicking this button will show and hide the left hand menu</div>
      </>
    ),
  },
  {
    target: '#__ProfileMenu_Home_button',
    title: 'Home Button',
    calloutDirection: DirectionalHint.bottomCenter,
    content:
      'This button brings you back to your Home page.  Your Home page is the first page you land on when you logged in.',
  },
  {
    target: '#__DASHBOARD_Tab',
    title: 'Client Dashboard',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows a quick summary of transmissions and errors by vendor.',
  },
  {
    target: '#__FILE_STATUS_Tab',
    title: 'File Status',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows the current status of Files processing in CDX.',
  },
  {
    target: '#__ARCHIVES_Tab',
    title: 'Archives',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows physical files sent into CDX and file sent out of CDX.',
  },
  {
    target: '#__SCHEDULE_Tab',
    title: 'Schedule',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows the current status of Files processed in CDX plotted on a Calendar view.',
  },
  {
    target: '#__TRANSMISSIONS_Tab',
    title: 'Transmissions',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows files which have been successfully processed and transmitted.',
  },
  {
    target: '#__ERRORS_Tab',
    title: 'Errors',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows files which have errored during processing.',
  },
  {
    target: '#__VISUALIZATIONS_Tab',
    title: 'Visualizations',
    calloutDirection: DirectionalHint.bottomCenter,
    content: 'This shows a chart of transmissions over the last 12 months.',
  },
  {
    target: '#__ProfileMenu_Font_Buttons',
    title: 'Font sizes',
    calloutDirection: DirectionalHint.bottomRightEdge,
    content: 'This menu is used to change the font size of the CDX Dashboard. This change only affects you.',
  },
  {
    target: '#__ProfileMenu',
    title: 'Profile Menu',
    calloutDirection: DirectionalHint.bottomRightEdge,
    content: (
      <>
        <div>This is the Profile Menu</div>
        <div>
          Here you can change your password, change your personal CDX theme, or logout of CDX.
        </div>
      </>
    ),
  },
];

export const fileStatusDetailsTour: TourStep[] = [
  {
    target: '#__Badge_Status',
    title: 'Xchange Status',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This is the current status of this Xchange.',
  },
  {
    target: '#__Badge_BillingUnits',
    title: 'Billing Units',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This is the number of billable subscribers in this file.',
  },
  {
    target: '#__DeliveredFileInfo',
    title: 'Delivered File',
    calloutDirection: DirectionalHint.leftCenter,
    content: 'This shows information about the file delivered to the vendor.',
  },
  {
    target: '#__FTP_Info',
    title: 'File Transport',
    calloutDirection: DirectionalHint.leftCenter,
    content: 'This is information about the file transport configuration used to deliver the file to the vendor.',
  },
  {
    target: '#__Enrollment_Stats',
    title: 'Enrollment Stats',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This shows a summary of the inbound and outbound files per plan. This is useful to ensure that the correct file and spec were used in this Xchange.',
  },
  {
    target: '#__Vendor_Count_Stats',
    title: 'Vendor Count Stats',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This shows a high level counts of the records in the file sent to the Vendor.',
  },
  {
    target: '#__Work_Steps',
    title: 'Work Steps',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This shows the individual steps taken during the processing of the file in this Xchange.',
  },
  {
    target: '#__Quality_Checks',
    title: 'Quality Checks',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This shows any data quality issues detected in the inbound file which has affected processing of the file.',
  },
  {
    target: '#__Archives',
    title: 'Archives',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This shows the various files at each point during the processing of this Xchange.',
  },
  {
    target: '#__Audit_Log',
    title: 'Audit Log',
    calloutDirection: DirectionalHint.bottomLeftEdge,
    content: 'This shows a log of operations users have performed on this Xchange which includes file access and any actions taken such as reprocessing the file.',
  },
];

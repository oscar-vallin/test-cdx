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
        <div>Here you can change your password, change your personal CDX theme, or logout of CDX.</div>
      </>
    ),
  },
];

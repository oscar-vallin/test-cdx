import { AdminNavPanel, SubNav } from './LeftNav.styles';
import { useHistory } from 'react-router';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { getRouteByApiId } from 'src/data/constants/RouteConstants';

type LeftNavProps = {
  menuOptionSelected?: string;
  isOpen: boolean;
  onMenuClick: () => void;
};

export const LeftNav = ({menuOptionSelected, isOpen, onMenuClick}: LeftNavProps) => {
  const history = useHistory();
  const { orgSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();

  type mapProps = {
    type?: string;
    label?: string;
    destination?: string;
    subNavItems?: { type: string }[] | any;
  };

  const parseLinks = (links = [], sidebarOpt: string) => {
    return links.map(({label, destination, subNavItems}: mapProps) => ({
      name: label,
      ...(subNavItems
        ? {
          isExpanded: subNavItems.find((item) => item.destination === sidebarOpt),
          links: parseLinks(subNavItems, ''),
        }
        : {}),
      ...(destination
        ? {
          url: getRouteByApiId(destination)?.URL,
          key: destination,
          // params: page.parameters,
          // commands: page.commands,
        }
        : {}),
    }));
  }


  return (
    <>
      <style>
        div[name='Return to my organization'] button span &#123;
        border-top: 1px solid lightgray;
        &#125;
      </style>
      <AdminNavPanel id="__AdminNav" open={isOpen} data-e2e="AdminNav">
        {ActiveDomainStore?.domainOrg?.current?.subNavItems?.length > 1 && (
          <SubNav
            highlight
            groups={[
              {
                links: [
                  {
                    name: 'Navigate To...',
                    isExpanded: false,
                    url: '',
                    links:
                      ActiveDomainStore.domainOrg.current.subNavItems?.length > 1
                        ? [
                          ...ActiveDomainStore.domainOrg.current.subNavItems.map((item) => ({
                            name: item.label,
                            title: item.label,
                            ariaLabel: item.label,
                            ...item,
                          })),
                          {

                            automationId: '__ReturnToOrg',
                            name: 'Return to my organization',
                            ariaLabel: 'Return to my organization',
                            home: true,
                          },
                        ]
                        : [],
                  },
                ],
              },
            ]}
            onLinkClick={(evt: any, route: any) => {
              evt.preventDefault();
              ActiveDomainStore.setCurrentOrg(route.home ? ActiveDomainStore.domainOrg.origin : route);
              onMenuClick();
            }}
          />
        )}

        <SubNav
          className="AppHeader__MobileNav"
          selectedKey={menuOptionSelected?.replace('-', '_')?.toUpperCase()}
          groups={[{ links: parseLinks(ActiveDomainStore.nav.dashboard, menuOptionSelected ?? '') }]}
          onLinkClick={(evt: any, route: { links: string; url: string }) => {
            evt.preventDefault();
            if (!route.links) {
              history.push(`${route.url}?orgSid=${orgSid}`);
            }
            onMenuClick();
          }}
        />

        <SubNav
          selectedKey={menuOptionSelected}
          groups={[{ links: parseLinks(ActiveDomainStore.nav.admin, menuOptionSelected ?? '') }]}
          onLinkClick={(evt: any, route: { links: string; url: string }) => {
            evt.preventDefault();
            if (!route.links) {
              history.push(`${route.url}?orgSid=${orgSid}`);
            }
            onMenuClick();
          }}
        />
      </AdminNavPanel>
    </>
  );
}
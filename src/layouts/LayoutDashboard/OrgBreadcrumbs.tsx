import { IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { SmallBreadcrumbs } from './LayoutDashboard.styles';

export const OrgBreadcrumbs = () => {
  const { orgSid } = useOrgSid();
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();

  const items = ActiveDomainStore?.domainOrg?.current?.subNavItems ?? [];
  if (items.length > 1) {
    const breadCrumbItems: IBreadcrumbItem[] = items
      .map((item) => {
        const isCurrentItem = item.orgSid == orgSid;
        return {
          id: `__OrgBreadCrumb_${item.orgSid}`,
          key: item.orgSid,
          text: item.label,
          isCurrentItem,
          onClick: isCurrentItem ? undefined : () => ActiveDomain.setCurrentOrg(item.orgSid),
        };
      })
      .reverse();

    return (
      <SmallBreadcrumbs
        id="__OrgBreadcrumbs"
        items={breadCrumbItems}
        ariaLabel="Organization bread crumbs"
        overflowAriaLabel="More..."
      />
    );
  }

  return null;
};

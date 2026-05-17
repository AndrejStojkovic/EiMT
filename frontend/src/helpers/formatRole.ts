export const formatRole = (role?: string): string => {
  if (!role) {
    return 'User';
  }

  const normalizedRole = role.replace(/^ROLE_/, '').toUpperCase();

  const roleLabels: Record<string, string> = {
    ADMINISTRATOR: 'Admin',
    USER: 'Member',
  };

  if (roleLabels[normalizedRole]) {
    return roleLabels[normalizedRole];
  }

  return normalizedRole
    .toLowerCase()
    .split('_')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
};

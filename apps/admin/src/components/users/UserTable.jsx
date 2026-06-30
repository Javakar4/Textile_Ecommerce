import React, { useMemo } from 'react';
import GlobalTable from '../common/GlobalTable';
import { getUserColumns } from '../common/columns';

export default function UserTable({ users, onStatusToggle, onRoleChange, onNavigateDetails }) {
  const columns = useMemo(() => getUserColumns({
    onStatusToggle,
    onRoleChange,
    onNavigateDetails
  }), [onStatusToggle, onRoleChange, onNavigateDetails]);

  return <GlobalTable data={users} columns={columns} />;
}

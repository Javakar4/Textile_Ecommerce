import React, { useMemo } from 'react';
import GlobalTable from '../common/GlobalTable';
import { getUserOrdersColumns } from '../common/columns';

export default function UserOrdersTable({ orders, onViewOrder }) {
  const columns = useMemo(() => getUserOrdersColumns({
    onViewOrder
  }), [onViewOrder]);

  return <GlobalTable data={orders} columns={columns} />;
}

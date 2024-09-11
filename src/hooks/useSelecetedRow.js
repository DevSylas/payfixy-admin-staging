import { useState, useCallback, useMemo } from "react";

export const selectAllRows = (rows) => {
  const selectedRowIds = new Map();
  rows.forEach((row) => {
    selectedRowIds.set(row.id, row);
  });
  return selectedRowIds;
};

const useSelectedRows = (initialData = []) => {
  const [selectedRowIds, setSelectedRowIds] = useState(new Map());

  const toggleRowSelection = useCallback((row) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      const newSelectedRowIds = new Map(prevSelectedRowIds);
      if (newSelectedRowIds.has(row.id)) {
        newSelectedRowIds.delete(row.id);
      } else {
        newSelectedRowIds.set(row.id, row);
      }
      return newSelectedRowIds;
    });
  }, []);

  const toggleSelectAll = useCallback((rows, allSelected) => {
    setSelectedRowIds(allSelected ? new Map() : selectAllRows(rows));
  }, []);

  const selectedRows = useMemo(
    () => Array.from(selectedRowIds.values()),
    [selectedRowIds]
  );

  return {
    selectedRows,
    toggleRowSelection,
    toggleSelectAll,
    allSelected: selectedRowIds.size === initialData.length,
  };
};

export default useSelectedRows;

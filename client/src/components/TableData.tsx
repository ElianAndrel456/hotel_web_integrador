import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

interface ITableProps<T> {
  ariaLabel: string
  topContent?: React.ReactNode
  columns: {
    key: string
    label: string
  }[]
  emptyContent?: string

  items: T[]
  renderCell: (item: T, columnKey: React.Key) => React.ReactNode
}

export const TableData = <T extends { id: string }>({
  ariaLabel,
  topContent,
  columns,
  emptyContent,
  items,
  renderCell,
}: ITableProps<T>) => {
  return (
    <Table
      selectionMode='single'
      aria-label={ariaLabel}
      topContent={topContent}
      bottomContentPlacement='outside'
      removeWrapper
      isCompact
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent ?? ''}
        items={items}
      >
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}
